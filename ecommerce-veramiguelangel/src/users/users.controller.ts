import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  getUsers(@Query('page') page?: string, @Query('limit') limit?: string) {
    const pageNum = Number(page);
    const limitNum = Number(limit);

    const validPage = !isNaN(pageNum) && pageNum > 0 ? pageNum : 1;
    const validLimit = !isNaN(limitNum) && limitNum > 0 ? limitNum : 5;

    return this.usersService.getUsers(validPage, validLimit);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getUser(@Param('id') id: string) {
    return this.usersService.getuser(id);
  }

  @Post()
  addUser(@Body() user: { email?: string; name?: string; password?: string }) {
    if (!user.email) return 'Email es requerido';
    if (!user.name) return 'Name es requerido';
    if (!user.password) return 'Password es requerido';
    return this.usersService.addUser(user);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateUser(@Param('id') id: string, @Body() user: any) {
    return this.usersService.updateuser(id, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
