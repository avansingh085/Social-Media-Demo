import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = new this.userModel({ username, password: hashedPassword });
    return createdUser.save();
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async findById(userId: string): Promise<User | null> {
  return this.userModel.findById(userId).exec();
}

  async sendFollowRequest(userId: string, targetUserId: string) {
    if (userId === targetUserId) {
      throw new BadRequestException('Cannot follow yourself');
    }

    const userObjectId = new Types.ObjectId(userId);
    const targetObjectId = new Types.ObjectId(targetUserId);

    const targetUser = await this.userModel.findById(targetObjectId);
    if (!targetUser) {
      throw new NotFoundException('Target user not found');
    }

    // Check if already following
    if (targetUser.followers.includes(userObjectId)) {
      throw new BadRequestException('Already following this user');
    }

    // Check if request already sent
    if (targetUser.followRequests.includes(userObjectId)) {
      throw new BadRequestException('Follow request already sent');
    }

    targetUser.followRequests.push(userObjectId);
    await targetUser.save();

    return { message: 'Follow request sent' };
  }

  async getMyFollowRequests(userId: string) {
    const user = await this.userModel
      .findById(userId)
      .populate('followRequests', 'username');

    if (!user) throw new NotFoundException('User not found');

    return { followRequests: user.followRequests };
  }


  async getFollowing(currentUserId: string) {
    const user = await this.userModel
      .findById(currentUserId)
      .populate('following', 'username'); 
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user.following;
  }

  async acceptFollowRequest(userId: string, requesterId: string) {
    const user = await this.userModel.findById(userId);
    const requester = await this.userModel.findById(requesterId);

    if (!user || !requester) {
      throw new NotFoundException('User or requester not found');
    }

    const requesterObjectId = new Types.ObjectId(requesterId);
    const userObjectId = new Types.ObjectId(userId);

    if (!user.followRequests.includes(requesterObjectId)) {
      throw new BadRequestException('No such follow request');
    }

    // Remove from followRequests
    user.followRequests = user.followRequests.filter(
      id => !id.equals(requesterObjectId),
    );

    // Add to followers
    user.followers.push(requesterObjectId);

    // Add to requester following
    requester.following.push(userObjectId);

    await user.save();
    await requester.save();

    return { message: 'Follow request accepted' };
  }

  async rejectFollowRequest(userId: string, requesterId: string) {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const requesterObjectId = new Types.ObjectId(requesterId);

    if (!user.followRequests.includes(requesterObjectId)) {
      throw new BadRequestException('No such follow request');
    }

    // Remove from followRequests
    user.followRequests = user.followRequests.filter(
      id => !id.equals(requesterObjectId),
    );

    await user.save();

    return { message: 'Follow request rejected' };
  }


  async unfollow(currentUserId: string, targetUserId: string) {
    const currentUser = await this.userModel.findById(currentUserId);
    const targetUser = await this.userModel.findById(targetUserId);

    if (!currentUser || !targetUser) {
      throw new NotFoundException('User not found');
    }

    // Remove target from current user's following
    currentUser.following = currentUser.following.filter(
      (id) => !(id as Types.ObjectId).equals(new Types.ObjectId(targetUserId)),
    );

    // Remove current user from target's followers
    targetUser.followers = targetUser.followers.filter(
      (id) => !(id as Types.ObjectId).equals(new Types.ObjectId(currentUserId)),
    );

    await currentUser.save();
    await targetUser.save();

    return { message: 'Successfully unfollowed' };
  }




  async getFollowSuggestions(currentUserId: string) {
  const currentUser = await this.userModel.findById(currentUserId);

  if (!currentUser) {
    throw new NotFoundException('User not found');
  }

  // Combine the IDs you want to exclude: yourself + already following + optionally pending requests
  const excludeIds = [
    new Types.ObjectId(currentUserId),
    ...currentUser.following,
  ];

//   // OPTIONAL: If you want to exclude pending requests too
//   if (currentUser.followRequests?.length > 0) {
//     excludeIds.push(...currentUser.followRequests);
//   }

  const suggestions = await this.userModel.find(
    { _id: { $nin: excludeIds } },
    'username' // Only return _id and username for suggestions
  );

  return suggestions;
}

}




