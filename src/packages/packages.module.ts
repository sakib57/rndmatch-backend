import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PackageController } from './controllers/package.controller';
import { PackagesSchema } from './schemas';
import { PackageService } from './services/package.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Package', schema: PackagesSchema }]),
  ],
  providers: [PackageService],
  controllers: [PackageController],
})
export class PackagesModule {}
