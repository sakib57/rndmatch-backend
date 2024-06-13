import {
  IsString,
  MaxLength,
  MinLength,
  Matches,
  IsNotEmpty,
  IsEmail,
  ValidateNested,
  IsMongoId,
  IsNumber,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LocationDTO, MobileDTO, SocialDTO } from '../../../common/dto';
import { Type } from 'class-transformer';
import { Location, Mobile, Social } from '../../../common/schemas';
import { TestimonialDTO } from './testimonial.dto';
import { Testimonial } from 'src/organization/schemas/testimonial.schema';

export class CreateOrganizationDTO implements Readonly<CreateOrganizationDTO> {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  description: string;

  @ApiProperty({
    type: LocationDTO,
  })
  @Type(() => LocationDTO)
  location: Location;

  @ApiProperty()
  @IsNumber()
  yearFounded: number;

  @ApiProperty()
  @IsString()
  orgSize: string;

  @ApiProperty()
  @MaxLength(30)
  @MinLength(2)
  @Matches(/^[a-zA-Z ]+$/)
  @IsString()
  industryType: string;

  @ApiProperty()
  @IsArray()
  fieldsOfWork: string[];

  @ApiProperty()
  @IsString()
  website: string;

  @ApiProperty({
    type: MobileDTO,
  })
  @ValidateNested({ each: true })
  @Type(() => MobileDTO)
  mobile: Mobile;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  tagline: string;

  @ApiProperty({
    type: [SocialDTO],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SocialDTO)
  socials: [Social];

  @ApiProperty({
    type: [TestimonialDTO],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TestimonialDTO)
  testimonials: [Testimonial];

  @ApiProperty()
  @IsMongoId()
  parentOrg: string;

  @ApiProperty()
  @IsString()
  timezone: string;
}
