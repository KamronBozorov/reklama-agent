import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PerformanceMetricsService } from './performance-metrics.service';
import { PerformanceMetric } from './models/performance-metric.model';
import { CreatePerformanceMetricInput } from './dto/create-performance-metric.input';
import { UpdatePerformanceMetricInput } from './dto/update-performance-metric.input';

@Resolver(() => PerformanceMetric)
export class PerformanceMetricsResolver {
  constructor(private readonly service: PerformanceMetricsService) {}

  @Query(() => [PerformanceMetric], { name: 'performanceMetrics' })
  findAll() {
    return this.service.findAll();
  }

  @Query(() => PerformanceMetric, { name: 'performanceMetric' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.service.findOne(id);
  }

  @Mutation(() => PerformanceMetric)
  create(@Args('input') input: CreatePerformanceMetricInput) {
    return this.service.create(input);
  }

  @Mutation(() => PerformanceMetric)
  update(@Args('input') input: UpdatePerformanceMetricInput) {
    return this.service.update(input.id, input);
  }

  @Mutation(() => Boolean)
  remove(@Args('id', { type: () => Int }) id: number) {
    return this.service.remove(id).then(() => true);
  }
}
