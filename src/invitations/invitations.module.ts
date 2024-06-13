import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../users/schemas';
import { InvitationsController } from './controllers';
import { InvitationSchema } from './schemas/invitations.schema';
import { InvitationsService } from './services/invitations.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Invitation', schema: InvitationSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  providers: [InvitationsService],
  controllers: [InvitationsController],
})
export class InvitationsModule {}
