import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SkillsController } from './controllers';
import { SkillsSchema } from './schemas';
import { SkillsService } from './services';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Skill', schema: SkillsSchema }]),
  ],
  providers: [SkillsService],
  controllers: [SkillsController],
})
export class SkillsModule {}
