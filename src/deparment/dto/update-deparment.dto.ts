import { PartialType } from '@nestjs/swagger';
import { CreateDepartmentDto } from './create-deparment.dto';

export class UpdateDeparmentDto extends PartialType(CreateDepartmentDto) {}
