import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { IsString, IsInt, IsDateString, IsNumber } from 'class-validator';

@InputType()
export class CreateCampaignInput {
  @Field(() => Int)
  @IsInt()
  client_id: number;

  @Field()
  @IsString()
  name: string;

  @Field()
  @IsDateString()
  start_date: Date;

  @Field()
  @IsDateString()
  end_date: Date;

  @Field(() => Float)
  @IsNumber()
  budget: number;

  @Field(() => Int)
  @IsInt()
  status_id: number;
}
