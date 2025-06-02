import { SetMetadata } from '@nestjs/common';
import { ROLES } from 'src/constants';

export const Roles = (...roles: string[]) => SetMetadata(ROLES, roles);
