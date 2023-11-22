import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateUserRequest } from '../requests/create-user-request';
import { UsersService } from '../providers/user.service';
import { SearchUserRequest } from '../requests/search-user-request';
import { UpdateUserRequest } from '../requests/update-user-request';
import { Roles } from 'src/auth/decorators/auth.decorator';
import { UserRole } from '../enums/user-role.enum';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async index(@Query() searchRequest: SearchUserRequest) {
    return await this.usersService.search(
      searchRequest.keyword,
      searchRequest.page,
      searchRequest.limit,
    );
  }

  @Post()
  @HttpCode(201)
  @Roles(UserRole.ADMIN)
  async create(@Body() requestBody: CreateUserRequest) {
    await this.usersService.create(requestBody);
  }

  @Get('/:id')
  async show(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.find(id);
  }

  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() requestBody: UpdateUserRequest,
  ) {
    return await this.usersService.update(id, requestBody);
  }

  @Delete('/:id')
  @HttpCode(204)
  async destroy(@Param('id', ParseIntPipe) id: number) {
    await this.usersService.delete(id);
  }
}
