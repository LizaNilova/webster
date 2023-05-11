import { Body, Controller, Post, Request, UploadedFile, UseGuards, Delete, Patch, Get, Param, UseInterceptors, Query, UnauthorizedException, ForbiddenException, BadRequestException, ParseFilePipe, NotFoundException } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConsumes, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto'
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ValidationPipe } from '../pipes/validation.pipe';
import { RequestDto } from '../auth/dto/request.dto';
@ApiTags('Posts')
@Controller('api/posts')
export class PostsController {

  constructor(private postServer: PostsService) { }

  @ApiOperation({ summary: 'Create post' })
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse({
    description: 'The record has been successfully created.', schema: {
      example: {
        "post": {
          "id": 5,
          "title": "Govna webster123",
          "content": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores velit voluptates assumenda vero minus similique accusantium voluptas provident sed ea, pariatur dolorem dolor, incidunt ratione tempore praesentium fuga consequuntur deleni",
          "image": "045670ca-e35c-47c1-8ae6-1ef04d72c32b.jpg",
          "userId": 3,
          "createdAt": "2023-05-08T13:58:34.767Z",
          "updatedAt": "2023-05-08T13:58:34.767Z",
          "author": {
            "id": 3,
            "login": "admin",
            "email": "admin@gmail.com"
          },
          "categories": [
            {
              "id": 1,
              "value": "scenery",
              "description": "about...",
              "createdAt": "2023-05-06T11:32:27.206Z",
              "updatedAt": "2023-05-06T11:32:27.206Z",
              "PostCategory": {
                "postId": 5,
                "categoryId": 1
              }
            }
          ],
          "comments": [],
          "likes": []
        },
        "message": "Create post"
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'Bad request', schema: {
      example: {
        "Invalid data request": {
          "title": {
            "value": "undefined",
            "constraints": [
              "Should be a string"
            ]
          },
          "content": {
            "value": "undefined",
            "constraints": [
              "Should be a string"
            ]
          },
          "value": {
            "value": "undefined",
            "constraints": [
              "Should be a string"
            ]
          }
        },
        "Post exist": new BadRequestException('Post already exists'),
        "File is required": {
          "statusCode": 400,
          "message": "File is required",
          "error": "Bad Request"
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
  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async createPost(@Body(ValidationPipe) dto: CreatePostDto,
    @Request() req: RequestDto,
    @UploadedFile(new ParseFilePipe()) image: Express.Multer.File) {
    return {
      post: await this.postServer.create({ ...dto, userId: req.user.id, image }),
      message: 'Create post'
    };
  }

  @ApiOperation({ summary: 'All posts' })
  @ApiOkResponse({
    description: 'Get all posts', schema: {
      example: {
        "posts": [
          {
            "id": 6,
            "title": "Govna webste",
            "content": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores velit voluptates assumenda vero minus similique accusantium voluptas provident sed ea, pariatur dolorem dolor, incidunt ratione tempore praesentium fuga consequuntur deleni",
            "image": "fa95486b-f3da-4219-91fa-7f501677eace.jpg",
            "userId": 3,
            "createdAt": "2023-05-08T22:30:55.095Z",
            "updatedAt": "2023-05-08T22:30:55.095Z",
            "categories": [
              {
                "id": 1,
                "value": "scenery",
                "description": "about...",
                "PostCategory": {
                  "postId": 6,
                  "categoryId": 1
                }
              }
            ],
            "author": {
              "id": 3,
              "login": "admin",
              "email": "admin@gmail.com"
            },
            "comments": [],
            "likes": []
          },
          {
            "id": 5,
            "title": "Govna webster123",
            "content": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores velit voluptates assumenda vero minus similique accusantium voluptas provident sed ea, pariatur dolorem dolor, incidunt ratione tempore praesentium fuga consequuntur deleni",
            "image": "045670ca-e35c-47c1-8ae6-1ef04d72c32b.jpg",
            "userId": 3,
            "createdAt": "2023-05-08T13:58:34.767Z",
            "updatedAt": "2023-05-08T13:58:34.767Z",
            "categories": [
              {
                "id": 1,
                "value": "scenery",
                "description": "about...",
                "PostCategory": {
                  "postId": 5,
                  "categoryId": 1
                }
              }
            ],
            "author": {
              "id": 3,
              "login": "admin",
              "email": "admin@gmail.com"
            },
            "comments": [],
            "likes": []
          },
          {
            "id": 4,
            "title": "Govna webster",
            "content": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores velit voluptates assumenda vero minus similique accusantium voluptas provident sed ea, pariatur dolorem dolor, incidunt ratione tempore praesentium fuga consequuntur deleni",
            "image": "3f50f387-0fcc-47cd-b4ac-faa71f20763e.jpg",
            "userId": 3,
            "createdAt": "2023-05-08T13:28:13.436Z",
            "updatedAt": "2023-05-08T13:28:13.436Z",
            "categories": [
              {
                "id": 1,
                "value": "scenery",
                "description": "about...",
                "PostCategory": {
                  "postId": 4,
                  "categoryId": 1
                }
              }
            ],
            "author": {
              "id": 3,
              "login": "admin",
              "email": "admin@gmail.com"
            },
            "comments": [],
            "likes": []
          }
        ],
        "message": "Success"
      }
    }
  })
  @Get()
  async getAll(@Query('sort') sort: 'dateCreated' | 'byCategories', @Query('filter') filter: string[], @Query('search') search: string) {
    return {
      posts: await this.postServer.getAll(sort, filter, search),
      message: 'Success'
    };
  }

  @ApiOperation({ summary: 'Find post' })
  @ApiOkResponse({
    description: 'Find by id post', schema: {
      example: {
        "post": [
          {
            "id": 6,
            "title": "Govna webste",
            "content": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores velit voluptates assumenda vero minus similique accusantium voluptas provident sed ea, pariatur dolorem dolor, incidunt ratione tempore praesentium fuga consequuntur deleni",
            "image": "fa95486b-f3da-4219-91fa-7f501677eace.jpg",
            "userId": 3,
            "createdAt": "2023-05-08T22:30:55.095Z",
            "updatedAt": "2023-05-08T22:30:55.095Z",
            "categories": [
              {
                "id": 1,
                "value": "scenery",
                "description": "about...",
                "PostCategory": {
                  "postId": 6,
                  "categoryId": 1
                }
              }
            ],
            "author": {
              "id": 3,
              "login": "admin",
              "email": "admin@gmail.com"
            },
            "comments": [],
            "likes": []
          }
        ],
        "message": "Success"
      }
    }
  })
  @ApiNotFoundResponse({
    description: 'Not found post',
    schema: {
      example: new NotFoundException('Undefined post')
    }
  })
  @Get(':id')
  async getById(@Param('id') id: number) {
    return {
      post: await this.postServer.getById(id),
      message: 'Success'
    };
  }

  @ApiOperation({ summary: 'Update post' })
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({
    description: 'Find by id post', schema: {
      example: {
        "post": {
          "id": 1,
          "title": "Govna webster2",
          "content": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores velit voluptates assumenda vero minus similique accusantium voluptas provident sed ea, pariatur dolorem dolor, incidunt ratione tempore praesentium fuga consequuntur deleni",
          "image": "af3d5f35-453f-44b1-a788-24a048f96404.jpg",
          "userId": 3,
          "createdAt": "2023-05-06T11:37:59.708Z",
          "updatedAt": "2023-05-06T11:37:59.708Z",
          "categories": [
            {
              "id": 1,
              "value": "scenery",
              "description": "about...",
              "PostCategory": {
                "postId": 1,
                "categoryId": 1
              }
            }
          ],
          "author": {
            "id": 3,
            "login": "admin",
            "email": "admin@gmail.com"
          },
          "comments": [],
          "likes": [
            {
              "id": 1,
              "postId": 1,
              "userId": 6
            }
          ]
        },
        "message": "Success"
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'Bad request', schema: {
      example: {
        "Invalid data request": {
          "title": {
            "value": "undefined",
            "constraints": [
              "Should be a string"
            ]
          },
          "content": {
            "value": "undefined",
            "constraints": [
              "Should be a string"
            ]
          },
          "value": {
            "value": "undefined",
            "constraints": [
              "Should be a string"
            ]
          }
        },
        "Post exist": new BadRequestException('Post already exists'),
        "File is required": {
          "statusCode": 400,
          "message": "File is required",
          "error": "Bad Request"
        }
      }
    }
  })
  @ApiNotFoundResponse({
    description: 'Not found post',
    schema: {
      example: new NotFoundException('Undefined post')
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
      example: new ForbiddenException('User no create this post')
    }
  })
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async editPost(@Param('id') id: number,
    @Body(ValidationPipe) dto: CreatePostDto,
    @Request() req: RequestDto ,
    @UploadedFile(new ParseFilePipe()) image: Express.Multer.File) {
    return {
      post: await this.postServer.editPost(dto, req.user.id, id, image),
      message: 'Update post'
    };
  }

  @ApiOperation({ summary: 'Delete post' })
  @ApiOkResponse({
    description: 'Detele post by id', schema: {
      example: {
        "message": "Post was deleted"
    }
    }
  })
  @ApiNotFoundResponse({
    description: 'Not found post',
    schema: {
      example: new NotFoundException('Undefined post')
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
      example: new ForbiddenException('User no create this post')
    }
  })
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deletePost(@Param('id') id: number, @Request() req: RequestDto) {
    return {
      message: await this.postServer.deletePost(id, req.user.id,)
    };
  }

}
