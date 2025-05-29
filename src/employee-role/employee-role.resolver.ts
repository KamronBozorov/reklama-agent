import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { EmployeeRoleService } from './employee-role.service';
import { CreateEmployeeRoleInput } from './dto/create-employee-role.input';

@Resolver()
export class EmployeeRoleResolver {
  constructor(private readonly service: EmployeeRoleService) {}

  @Mutation(() => Boolean)
  async assignRoleToEmployee(@Args('input') input: CreateEmployeeRoleInput) {
    await this.service.assignRole(input);
    return true;
  }

  @Mutation(() => Boolean)
  async removeRoleFromEmployee(
    @Args('employee_id', { type: () => Int }) employee_id: number,
    @Args('role_id', { type: () => Int }) role_id: number,
  ) {
    await this.service.removeRole(employee_id, role_id);
    return true;
  }
}
