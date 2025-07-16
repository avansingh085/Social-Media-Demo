import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { Model, Types } from 'mongoose';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post.name) private postModel: Model<PostDocument>,
        private readonly usersService: UsersService,
    ) { }

    async create(authorId: string, title: string, description: string) {
        const post = new this.postModel({ author: authorId, title, description });
        return post.save();
    }


    async getTimeline(userId: string) {
        const user = await this.usersService.findById(userId);
        if (!user) {
            return [];
        }

        const ids = [
            ...user.following.map(id => new Types.ObjectId(id)),
            new Types.ObjectId(user._id as string),
        ];

        return await this.postModel
            .find({ author: { $in: ids } })
            .sort({ createdAt: -1 })
            .exec();
    }

}
