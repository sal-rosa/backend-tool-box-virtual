import {
  OnQueueProgress,
  OnQueueCompleted,
  OnQueueFailed,
  InjectQueue,
} from '@nestjs/bull';

import { Processor, Process } from '@nestjs/bull';
import { Job, Queue } from 'bull';
import * as fs from 'fs';
import { ConvertVideoGateWay } from './convert-video.gateway';

import * as ffmpeg from 'fluent-ffmpeg';

import UploadToS3 from '../utils/upload-to-S3';

ffmpeg.setFfmpegPath('/usr/bin/ffmpeg');
ffmpeg.setFfprobePath('/usr/bin/ffprobe');

@Processor('convert-video')
export class ConvertVideoProcessor {
  constructor(
    @InjectQueue('convert-video')
    private convertVideoQueue: Queue,
    private convertVideoGateWay: ConvertVideoGateWay,
  ) { }

  @Process()
  async OnQueueProcess(job: Job, cb: any) {
    const newFileName = job.data.video.filename
      .split('.')
      .slice(0, -1)
      .join('.');

    ffmpeg(`uploads/${job.data.video.filename}`)
      .videoCodec('libx264')
      .addOption('-crf', '28')
      .audioCodec('libmp3lame')
      .on('progress', function (progress) {
        job.progress(progress.percent);
      })
      .on('error', function (err) {
        cb(new Error('An error occurred while converting.'));
      })
      .on('end', function () {
        cb(null, 'Done');
      })
      .save(`${newFileName}.${job.data.formatOutput}`);
  }

  @OnQueueProgress()
  async OnQueueProgess(job: Job, result: any) {
    this.convertVideoGateWay.handleConvertProgress(job.data.socketId, result);
  }

  @OnQueueCompleted()
  async OnQueueCompleted(job: Job) {
    const newFileName = job.data.video.filename
      .split('.')
      .slice(0, -1)
      .join('.');
    this.convertVideoGateWay.handleConverted(job.data.socketId);
    this.convertVideoGateWay.handlePreparingFile(job.data.socketId, '...');
    const convertVideoGateWay = this.convertVideoGateWay;
    fs.unlinkSync(`uploads/${job.data.video.filename}`);

    UploadToS3(`${newFileName}.${job.data.formatOutput}`).then(function (
      video: any,
    ) {
      convertVideoGateWay.handlePreparingFile(job.data.socketId, 'OK');
      convertVideoGateWay.handleConvertedVideo(job.data.socketId, video);
    });
  }

  @OnQueueFailed()
  async OnQueueFailed(job: Job, err: Error) {
    fs.unlinkSync(`uploads/${job.data.video.filename}`);
    this.convertVideoGateWay.handleErrorInConversion(job.data.socketId, err.message);
  }
}
