import { Injectable } from '@nestjs/common';
import { compareSync, hashSync } from 'bcrypt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { AuthDto } from './dto/auth.dto';

const SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOneByUsername(username);

    if (user && compareSync(password, user.encryptedPassword)) {
      return user;
    }

    return null;
  }

  signUp({ username, password }: AuthDto) {
    const encryptedPassword = hashSync(password, SALT_ROUNDS);

    return this.usersService.create({ username, encryptedPassword });
  }
}
