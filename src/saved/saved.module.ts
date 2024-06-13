import { Module } from '@nestjs/common';
import { SavedService } from './services/saved.service';
import { SavedController } from './controllers/saved.controller';
import { SavedSchema } from './schemas/seved.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Saved', schema: SavedSchema }]),
  ],
  providers: [SavedService],
  controllers: [SavedController],
})
export class SavedModule {}
