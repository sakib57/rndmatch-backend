import { Module } from '@nestjs/common';
import { HideService } from './services/hide.service';
import { HideController } from './controllers/hide.controller';
import { HideSchema } from './schemas/hide.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Hide', schema: HideSchema }])],
  providers: [HideService],
  controllers: [HideController],
})
export class HideModule {}
