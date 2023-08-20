import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({ example: 'username' })
  username: string;

  @ApiProperty({ example: 'password' })
  password: string;
}
