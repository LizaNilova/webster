import { Body, Controller, Get, Param, Post, Delete, Patch, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesAuthGuard } from '../auth/roles-auth.guard';

@ApiTags('Categories')
@Controller('api/categories')
export class CategoriesController {
  constructor(private categoryService: CategoriesService) { }

  // create category 
  // http://localhost:8080/api/categories
  @ApiOperation({ summary: 'Create category (only admin)' })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesAuthGuard)
  @Post()
  async create(@Body() dto: CreateCategoryDto) {
    return {
    category: await this.categoryService.createCategory(dto),
    message: 'Create category'
  };
  }

  // get category by value 
  // http://localhost:8080/api/categories/value/:value
  @ApiOperation({ summary: 'get category by value' })
  @Get('value/:value')
  async getByValue(@Param('value') value: string) {
    return {
      category: await this.categoryService.getCategoryByValue(value),
      message: 'Success'
    };
  }

  // get category by id
  // http://localhost:8080/api/categories/:id
  @ApiOperation({ summary: 'get category by id' })
  @Get(':id')
  async getById(@Param('id') id: number) {
    return {
      category: await this.categoryService.getCategoryById(id),
      message: 'Success'
    };
  }

  // update category 
  // http://localhost:8080/api/categories/:id
  @ApiOperation({ summary: 'update category by id (only admin)' })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesAuthGuard)
  @Patch(':id')
  async updateById(@Param('id') id: number, @Body() dto: CreateCategoryDto) {
    return {
      category: await this.categoryService.updateCategory(id, dto),
      message: 'Update category'
    };
  }

  // delete category
  // http://localhost:8080/api/categories/:id
  @ApiOperation({ summary: 'delete category by id (only admin)' })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesAuthGuard)
  @Delete(':id')
  async deleteById(@Param('id') id: number) {
    return {
      message: await this.categoryService.deleteCategory(id)
    };
  }

  // get all categories
  // http://localhost:8080/api/categories
  @ApiOperation({ summary: 'get all category' })
  @Get()
  async getAll() {
    return {
      categories: await this.categoryService.getAllCategories(),
      message: 'Success'
    };
  }
}
