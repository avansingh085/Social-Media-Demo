import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @UseGuards(JwtAuthGuard)
    @Post(':id/follow-request')
    async sendFollowRequest(@Req() req, @Param('id') targetUserId: string) {
        return this.usersService.sendFollowRequest(req.user.userId, targetUserId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/profile')
    getProfile(@Req() req) {
        return req.user;
    }

    @UseGuards(JwtAuthGuard)
    @Get('/suggestions')
    async getFollowSuggestions(@Req() req) {
        return this.usersService.getFollowSuggestions(req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/following')
    async getFollowing(@Req() req) {
        return this.usersService.getFollowing(req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/follow-requests')
    async getMyFollowRequests(@Req() req) {
        return this.usersService.getMyFollowRequests(req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/follow-request/:id/accept')
    async acceptFollowRequest(@Req() req, @Param('id') requesterId: string) {
        return this.usersService.acceptFollowRequest(req.user.userId, requesterId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/:id/unfollow')
    async unfollow(@Req() req, @Param('id') targetUserId: string) {
        return this.usersService.unfollow(req.user.userId, targetUserId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/follow-request/:id/reject')
    async rejectFollowRequest(@Req() req, @Param('id') requesterId: string) {
        return this.usersService.rejectFollowRequest(req.user.userId, requesterId);
    }
}
