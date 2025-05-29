import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EmployeesService } from './employees.service';
import { Employee } from './models/employee.model';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { UpdateEmployeeInput } from './dto/update-employee.input';

@Resolver(() => Employee)
export class EmployeesResolver {
  constructor(private readonly employeesService: EmployeesService) {}

  @Mutation(() => Employee)
  createEmployee(@Args('input') input: CreateEmployeeInput): Promise<Employee> {
    return this.employeesService.create(input);
  }

  @Query(() => [Employee], { name: 'employees' })
  findAll(): Promise<Employee[]> {
    return this.employeesService.findAll();
  }

  @Query(() => Employee, { name: 'employee' })
  findOne(
    @Args('user_id', { type: () => Int }) user_id: number,
  ): Promise<Employee> {
    return this.employeesService.findOne(user_id);
  }

  @Mutation(() => Employee)
  updateEmployee(@Args('input') input: UpdateEmployeeInput): Promise<Employee> {
    return this.employeesService.update(input.user_id, input);
  }

  @Mutation(() => Boolean)
  removeEmployee(
    @Args('user_id', { type: () => Int }) user_id: number,
  ): Promise<boolean> {
    return this.employeesService.remove(user_id).then(() => true);
  }
}
