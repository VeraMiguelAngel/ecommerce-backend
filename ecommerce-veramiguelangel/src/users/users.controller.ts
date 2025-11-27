import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UpdateUserDto } from './dto/user.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/auth/enums/roles.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import JwtUser from 'src/interfaces/Jwt.Inteface';

export interface AuthenticatedRequest extends Request {
  user: JwtUser;
}

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(200)
  @ApiBearerAuth()
  @Get()
  @Roles(Role.Admin)
  @ApiQuery({
    name: 'page',
    required: false,
    type: String,
    description: 'Número de página',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: String,
    description: 'Cantidad de elementos por página página',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Obtiene una lista paginada de usuarios' })
  getUsers(@Query('page') page?: string, @Query('limit') limit?: string) {
    const pageNum = Number(page);
    const limitNum = Number(limit);

    const validPage = !isNaN(pageNum) && pageNum > 0 ? pageNum : 1;
    const validLimit = !isNaN(limitNum) && limitNum > 0 ? limitNum : 5;

    return this.usersService.getUsers(validPage, validLimit);
  }

  @HttpCode(200)
  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Obtiene un usuario por su ID' })
  getUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getuser(id);
  }

  // @Post()
  // addUser(@Body() user: CreateUserDto) {
  //   return this.usersService.addUser(user);
  // }

  @ApiBearerAuth()
  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Actualiza un usuario por su ID' })
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: UpdateUserDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const currentUser: JwtUser = req.user;

    if (currentUser.id !== id && !currentUser.roles.includes(Role.Admin)) {
      throw new UnauthorizedException(
        'No puedes modificar los datos de otro usuario',
      );
    }
    return this.usersService.updateUser(id, user);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Elimina un usuario por su ID' })
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.deleteUser(id);
  }
}
