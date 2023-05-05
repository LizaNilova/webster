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
  constructor(private categoryService: CategoriesService) {}

  // create category 
  // http://localhost:5000/categories
  @ApiOperation({ summary: 'Create category (only admin)' })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesAuthGuard)
  @Post()
  create(@Body() dto: CreateCategoryDto) {
    return this.categoryService.createCategory(dto);
  }

  // get category by value 
  // http://localhost:8080/categories/value/:value
  @ApiOperation({ summary: 'get category by value' })
  @Get('value/:value')
  getByValue(@Param('value') value: string) {
    return this.categoryService.getCategoryByValue(value);
  }

  // get category by id
  // http://localhost:8080/categories/:id
  @ApiOperation({ summary: 'get category by id' })
  @Get(':id')
  getById(@Param('id') id: number) {
    return this.categoryService.getCategoryById(id);
  }

  // update category 
  // http://localhost:8080/categories/:id
  @ApiOperation({ summary: 'update category by id (only admin)' })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesAuthGuard)
  @Patch(':id')
  updateById(@Param('id') id: number, @Body() dto: CreateCategoryDto) {
    return this.categoryService.updateCategory(id, dto);
  }

  // delete category
  // http://localhost:8080/categories/:id
  @ApiOperation({ summary: 'delete category by id (only admin)' })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesAuthGuard)
  @Delete(':id')
  deleteById(@Param('id') id: number) {
    return this.categoryService.deleteCategory(id);
  }

  // get all categories
  // http://localhost:8080/categories
  @ApiOperation({ summary: 'get all category' })
  @Get()
  getAll() {
    return this.categoryService.getAllCategories();
  }
}
