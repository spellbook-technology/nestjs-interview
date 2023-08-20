import { Controller, Get, Patch } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Current User')
@ApiBearerAuth()
@Controller('current_user')
export class CurrentUserController {
  constructor(private readonly usersService: UsersService) {}

  /*
   * TODO: Return current user
   */

  @Get()
  show() {
    return 'Add your implementation here.';
  }

  /*
   * TODO: Update current user
   */

  @Patch()
  update() {
    return 'Add your implementation here.';
  }
}
