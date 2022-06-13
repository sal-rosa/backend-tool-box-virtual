import 'dotenv/config';

import * as fs from 'fs';
import * as aws from 'aws-sdk';

aws.config.update({
  accessKeyId: process.env.ACESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACESS_KEY,
  region: process.env.REGION,
});

const s3 = new aws.S3();

export default async function (newFileName: string) {
  const fileContent = fs.readFileSync(newFileName);

  const params = {
    Bucket: process.env.BUCKET,
    Key: newFileName,
    Body: fileContent,
    //ContentType: mimeType
  };

  const data = await s3.upload(params).promise();
  fs.unlinkSync(newFileName);
  return data.Location;
}
