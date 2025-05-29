import { InputType, Field, Int } from '@nestjs/graphql';
import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateEmployeeInput {
  @Field(() => Int)
  @IsInt()
  user_id: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  department_id?: number;

  @Field()
  @IsDateString()
  hire_date: Date;

  @Field()
  @IsString()
  experience: string;
}
