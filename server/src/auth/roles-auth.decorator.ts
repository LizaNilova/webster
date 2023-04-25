import { SetMetadata } from '@nestjs/common';

export const ROLEY_KEY = 'roles';

export const Roles = (...roles: string[]) => SetMetadata(ROLEY_KEY, roles);
