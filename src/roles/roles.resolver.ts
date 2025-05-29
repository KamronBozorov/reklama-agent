import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RolesService } from './roles.service';
import { Role } from './models/role.model';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';

@Resolver(() => Role)
export class RolesResolver {
  constructor(private readonly rolesService: RolesService) {}

  @Mutation(() => Role)
  createRole(@Args('input') input: CreateRoleInput) {
    return this.rolesService.create(input);
  }

  @Query(() => [Role], { name: 'roles' })
  findAll() {
    return this.rolesService.findAll();
  }

  @Query(() => Role, { name: 'role' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.rolesService.findOne(id);
  }

  @Mutation(() => Role)
  updateRole(@Args('input') input: UpdateRoleInput) {
    return this.rolesService.update(input.id, input);
  }

  @Mutation(() => Boolean)
  removeRole(@Args('id', { type: () => Int }) id: number) {
    return this.rolesService.remove(id).then(() => true);
  }
}
