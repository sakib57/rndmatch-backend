import { Module } from '@nestjs/common';
import { StreamsController } from './controllers/streams.controller';
import { StreamsService } from './services/streams.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StreamsSchema } from './schemas/streams.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Stream', schema: StreamsSchema }]),
  ],
  controllers: [StreamsController],
  providers: [StreamsService],
})
export class StreamsModule {}
