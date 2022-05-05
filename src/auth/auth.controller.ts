import { Controller, Post, Body } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post()
        async login(@Body() user: User) {
            return this.authService.login(user.email, user.password);
  }
}
