import { Body, Controller, Get, Param, Post, Delete, Patch, UseGuards, BadRequestException, UnauthorizedException, ForbiddenException, UsePipes, NotFoundException } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiBadRequestResponse, ApiConsumes, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesAuthGuard } from '../auth/roles-auth.guard';
import { ValidationPipe } from '../pipes/validation.pipe';

@ApiTags('Categories')
@Controller('api/categories')
export class CategoriesController {
  constructor(private categoryService: CategoriesService) { }

  @ApiOperation({ summary: 'Create category (only admin)' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.', schema: {
      example: {
        "category": {
          "id": 2,
          "value": "Cat",
          "description": "Its very cute animal :)",
          "updatedAt": "2023-05-09T12:01:08.771Z",
          "createdAt": "2023-05-09T12:01:08.771Z"
        },
        "message": "Create category"
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'Bad request', schema: {
      example: {
        "value": {
          "value": "undefined",
          "constraints": [
            "Should be a string"
          ]
        },
        "description": {
          "value": "undefined",
          "constraints": [
            "Should be a string"
          ]
        }
      }
    }
  })
  @ApiUnauthorizedResponse({
    description: 'User unauthorized',
    schema: {
      example: new UnauthorizedException('User unauthorized')
    }
  })
  @ApiForbiddenResponse({
    description: 'Forbidden.', schema: {
      example: new ForbiddenException('User role no Admin')
    }
  })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesAuthGuard)
  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() dto: CreateCategoryDto) {
    return {
      category: await this.categoryService.createCategory(dto),
      message: 'Create category'
    };
  }

  @ApiOperation({ summary: 'get all category' })
  @ApiOkResponse({
    description: 'All categories', schema: {
      example: {
        "categories": [
          {
            "id": 1,
            "value": "scenery",
            "description": "about...",
            "createdAt": "2023-05-06T11:32:27.206Z",
            "updatedAt": "2023-05-06T11:32:27.206Z",
            "posts": [
              {
                "id": 2,
                "title": "Govna webster1",
                "content": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores velit voluptates assumenda vero minus similique accusantium voluptas provident sed ea, pariatur dolorem dolor, incidunt ratione tempore praesentium fuga consequuntur deleni",
                "image": "75293e0c-d171-4651-a4bd-f7c998da6936.jpg",
                "userId": 6,
                "createdAt": "2023-05-06T14:14:26.757Z",
                "updatedAt": "2023-05-06T14:14:26.757Z",
                "PostCategory": {
                  "postId": 2,
                  "categoryId": 1
                }
              },
              {
                "id": 3,
                "title": "Govna websterq12",
                "content": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores velit voluptates assumenda vero minus similique accusantium voluptas provident sed ea, pariatur dolorem dolor, incidunt ratione tempore praesentium fuga consequuntur deleni",
                "image": "8591d6ea-7389-4a68-9602-ef9edb2c697e.jpg",
                "userId": 3,
                "createdAt": "2023-05-07T16:51:42.416Z",
                "updatedAt": "2023-05-07T16:51:42.416Z",
                "PostCategory": {
                  "postId": 3,
                  "categoryId": 1
                }
              }
            ]
          },
          {
            "id": 2,
            "value": "Cat",
            "description": "Its very cute animal :)",
            "createdAt": "2023-05-09T12:01:08.771Z",
            "updatedAt": "2023-05-09T12:01:08.771Z",
            "posts": []
          }
        ],
        "message": "Success"
      }
    }
  })
  @Get()
  async getAll() {
    return {
      categories: await this.categoryService.getAllCategories(),
      message: 'Success'
    };
  }

  @ApiOperation({ summary: 'get category by value' })
  @ApiOkResponse({
    description: 'Find by value category', schema: {
      example: {
        "category": {
          "id": 2,
          "value": "Cat",
          "description": "Its very cute animal :)",
          "createdAt": "2023-05-09T12:01:08.771Z",
          "updatedAt": "2023-05-09T12:01:08.771Z"
        },
        "message": "Success"
      }
    }
  })
  @ApiNotFoundResponse({
    description: 'Not found category',
    schema: {
      example: new NotFoundException('Undefined category')
    }
  })
  @Get('value/:value')
  async getByValue(@Param('value') value: string) {
    return {
      category: await this.categoryService.getCategoryByValue(value),
      message: 'Success'
    };
  }

  @ApiOperation({ summary: 'get category by id' })
  @ApiOkResponse({
    description: 'Find by id category', schema: {
      example: {
        "category": {
          "id": 2,
          "value": "Cat",
          "description": "Its very cute animal :)",
          "createdAt": "2023-05-09T12:01:08.771Z",
          "updatedAt": "2023-05-09T12:01:08.771Z"
        },
        "message": "Success"
      }
    }
  })
  @ApiNotFoundResponse({
    description: 'Not found category',
    schema: {
      example: new NotFoundException('Undefined category')
    }
  })
  @Get(':id')
  async getById(@Param('id') id: number) {
    return {
      category: await this.categoryService.getCategoryById(id),
      message: 'Success'
    };
  }

  @ApiOperation({ summary: 'update category by id (only admin)' })
  @ApiOkResponse({
    description: 'The record has been successfully created.', schema: {
      example: {
        "category": {
          "id": 2,
          "value": "Cat",
          "description": "Its very cute animal",
          "createdAt": "2023-05-09T12:01:08.771Z",
          "updatedAt": "2023-05-09T12:13:14.736Z"
        },
        "message": "Update category"
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'Bad request', schema: {
      example: {
        "value": {
          "value": "undefined",
          "constraints": [
            "Should be a string"
          ]
        },
        "description": {
          "value": "undefined",
          "constraints": [
            "Should be a string"
          ]
        }
      }
    }
  })
  @ApiUnauthorizedResponse({
    description: 'User unauthorized',
    schema: {
      example: new UnauthorizedException('User unauthorized')
    }
  })
  @ApiForbiddenResponse({
    description: 'Forbidden.', schema: {
      example: new ForbiddenException('User role no Admin')
    }
  })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesAuthGuard)
  @UsePipes(ValidationPipe)
  @Patch(':id')
  async updateById(@Param('id') id: number, @Body() dto: CreateCategoryDto) {
    return {
      category: await this.categoryService.updateCategory(id, dto),
      message: 'Update category'
    };
  }

  @ApiOperation({ summary: 'delete category by id (only admin)' })
  @ApiOkResponse({
    description: 'Find by id category', schema: {
      example: {
        "message": "Category was deleted"
      }
    }
  })
  @ApiNotFoundResponse({
    description: 'Not found category',
    schema: {
      example: new NotFoundException('Category with ID "id" not found')
    }
  })
  @ApiUnauthorizedResponse({
    description: 'User unauthorized',
    schema: {
      example: new UnauthorizedException('User unauthorized')
    }
  })
  @ApiForbiddenResponse({
    description: 'Forbidden.', schema: {
      example: new ForbiddenException('User role no Admin')
    }
  })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesAuthGuard)
  @Delete(':id')
  async deleteById(@Param('id') id: number) {
    return {
      message: await this.categoryService.deleteCategory(id)
    };
  }

}
