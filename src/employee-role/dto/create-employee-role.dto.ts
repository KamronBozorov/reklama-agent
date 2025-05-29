import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateEmployeeRoleDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  employee_id: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  role_id: number;
}
