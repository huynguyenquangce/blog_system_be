import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export abstract class BaseCommon {
  createAt: string;
  updateAt: string;
  deleteAt: string;
}
