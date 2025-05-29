import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreatePerformanceMetricInput {
  @Field(() => Int) ad_id: number;
  @Field(() => Int) impressions: number;
  @Field(() => Int) clicks: number;
  @Field(() => Int) conversions: number;
  @Field() date: Date;
}
