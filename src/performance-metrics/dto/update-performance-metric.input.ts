import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreatePerformanceMetricInput } from './create-performance-metric.input';

@InputType()
export class UpdatePerformanceMetricInput extends PartialType(
  CreatePerformanceMetricInput,
) {
  @Field(() => Int)
  id: number;
}
