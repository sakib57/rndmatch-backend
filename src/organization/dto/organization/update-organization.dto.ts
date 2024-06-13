import {
  IsString,
  MaxLength,
  MinLength,
  Matches,
  IsNotEmpty,
  IsArray,
  IsEmail,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  LocationDTO,
  MediaDTO,
  MobileDTO,
  SocialDTO,
} from '../../../common/dto';
import { Type } from 'class-transformer';
import { Location, Media, Mobile, Social } from '../../../common/schemas';
import { TestimonialDTO } from './testimonial.dto';
import { Testimonial } from '../../schemas/testimonial.schema';
import { FaqDTO } from './faq.dto';
import { Faqs } from '../../schemas/faq.schema';

export class UpdateOrganizationDTO implements Readonly<UpdateOrganizationDTO> {
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
  tagline: string;

  @ApiProperty({
    type: MediaDTO,
  })
  @Type(() => MediaDTO)
  logo: Media;

  @ApiProperty({
    type: MediaDTO,
  })
  @Type(() => MediaDTO)
  banner: Media;

  @ApiProperty({
    type: [MediaDTO],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MediaDTO)
  videos: [Media];

  @ApiProperty({
    type: [MediaDTO],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MediaDTO)
  pictures: [Media];

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

  @ApiProperty({
    type: [FaqDTO],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FaqDTO)
  faqs: [Faqs];

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  isVerified: boolean;

  @ApiProperty()
  isDeleted: boolean;

  @ApiProperty()
  timezone: string;
}
