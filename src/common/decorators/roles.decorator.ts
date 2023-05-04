import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
import { Role } from '../constants';

export const AllowRoles = (roles: Role[]) => SetMetadata(ROLES_KEY, roles);
