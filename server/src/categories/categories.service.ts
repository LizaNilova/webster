import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './categories.model';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category) private categoryRepository: typeof Category) {}

  async createCategory(dto: CreateCategoryDto) {
    const category = await this.categoryRepository.create(dto);
    return category;
  }

  async getCategoryByValue(value: string) {
    const category = await this.categoryRepository.findOne({ where: { value } });
    if (!category) {
      throw new NotFoundException('Category undefined');
    }
    return category;
  }

  async getCategoryById(id: number) {
    const category = await this.categoryRepository.findByPk(id);
    if (!category) {
      throw new NotFoundException('Category undefined');
    }
    return category;
  }

  async getAllCategories() {
    const category = await this.categoryRepository.findAll({ include: { all: true } });
    return category;
  }

  async updateCategory(id: number, dto: CreateCategoryDto) {
    const category = await this.categoryRepository.findByPk(id);
    if (!category) {
      throw new HttpException(`Category with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }
    await category.update(dto);
    return category;
  }

  async deleteCategory(id: number) {
    const category = await this.categoryRepository.findByPk(id);
    if (!category) {
        throw new HttpException(`Category with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }
    await category.destroy();
    return "Category was deleted";
  }
}
