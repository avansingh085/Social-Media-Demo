import { Body, Controller, Post,Get, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() body: { username: string; password: string }) {
        return this.authService.register(body.username, body.password);
    }

    @Post('login')
    async login(@Body() body: { username: string; password: string }) {
       
        const user = await this.authService.validateUser(
            body.username,
            body.password,
        );
        return this.authService.login(user);
    }
}
