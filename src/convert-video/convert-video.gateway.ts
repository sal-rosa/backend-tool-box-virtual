import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  path: '/api/tool-box-virtual/ws',
})
export class ConvertVideoGateWay {
  private logger: Logger = new Logger('ConvertVideoGateWay');
  @WebSocketServer() server: Server;

  handleConvertProgress(socketId: string, percentage: any) {
    this.server.to(socketId).emit('percentage', percentage);
  }

  handleConverted(socketId: string) {
    this.server.to(socketId).emit('converted', 'OK');
  }

  handlePreparingFile(socketId: string, status: string) {
    this.server.to(socketId).emit('preparing-file', status);
  }

  handleConvertedVideo(socketId: string, video: any) {
    this.server.to(socketId).emit('converted-video', video);
  }

  handleErrorInConversion(socketId: string, error: any) {
    this.server.to(socketId).emit('error-in-conversion', error);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
   }

  handleConnection(client: Socket) {
    this.server.to(client.id).emit('user-id', client.id);
    this.logger.log(`Client connected: ${client.id}`);
  }
}
