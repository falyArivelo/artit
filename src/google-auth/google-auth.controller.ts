import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('google-auth')
export class GoogleAuthController {
    @Get('google')
    @UseGuards(AuthGuard('google'))
    googleLogin() {
        // Initiates the Google OAuth2 login flow
    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    googleLoginCallback(@Req() req : any) {
        // Handles the Google OAuth2 callback
        // Here you can return the user information or a JWT
        return req.user;
    }
}
