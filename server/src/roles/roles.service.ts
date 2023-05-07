import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async createRole(dto: CreateRoleDto) {
    const isTruth = await this.isExistRole(dto.value);
    if (isTruth) {
      throw new BadRequestException('Role is exist');
    }
    const role = await this.roleRepository.create(dto);
    return role;
  }

  async getRoleByValue(value: string) {
    const role = await this.roleRepository.findOne({ where: { value } });
    if (!role) {
      throw new NotFoundException('Role undefined');
    }
    return role;
  }

  async isExistRole(value: string): Promise<boolean> {
    const role = await this.roleRepository.findOne({ where: { value } });
    return Boolean(role);
  }
}
