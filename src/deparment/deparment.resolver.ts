import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Department } from './models/deparment.model';
import { DepartmentsService } from './deparment.service';
import { CreateDepartmentDto } from './dto/create-deparment.dto';
import { UpdateDeparmentDto } from './dto/update-deparment.dto';
import { CreateDepartmentInput } from './dto/create-deparment.input';
import { UpdateDepartmentInput } from './dto/update-deparment.input';

@Resolver(() => Department)
export class DepartmentsResolver {
  constructor(private readonly service: DepartmentsService) {}

  @Mutation(() => Department)
  createDepartment(@Args('input') input: CreateDepartmentInput) {
    return this.service.create(input);
  }

  @Query(() => [Department], { name: 'departments' })
  findAll() {
    return this.service.findAll();
  }

  @Query(() => Department, { name: 'department' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.service.findOne(id);
  }

  @Mutation(() => Department)
  updateDepartment(@Args('input') input: UpdateDepartmentInput) {
    return this.service.update(input.id, input);
  }

  @Mutation(() => Boolean)
  removeDepartment(@Args('id', { type: () => Int }) id: number) {
    return this.service.remove(id).then(() => true);
  }
}
