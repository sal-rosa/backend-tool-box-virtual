import { PartialType } from '@nestjs/mapped-types';

import { CreateConvertVideoDto } from './create-convert-video.dto';

export class UpdateConvertVideoDto extends PartialType(CreateConvertVideoDto) {}
