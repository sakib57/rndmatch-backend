import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DisciplineController,
  FieldController,
  PositionController,
} from './controllers';
import { DisciplineSchema, FieldSchema, PositionSchema } from './schemas';
import { PositionService, FieldService, DisciplineService } from './services';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Position', schema: PositionSchema },
      { name: 'Field', schema: FieldSchema },
      { name: 'Discipline', schema: DisciplineSchema },
    ]),
  ],
  providers: [PositionService, FieldService, DisciplineService],
  controllers: [PositionController, FieldController, DisciplineController],
})
export class PositionsModule {}
