import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './auth.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign_in')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  signIn(@Body() _authDto: AuthDto, @CurrentUser() user) {
    return user;
  }

  @Post('sign_up')
  signUp(@Body() authDto: AuthDto) {
    return this.authService.signUp(authDto);
  }
}
