import {
  IsString,
  MaxLength,
  MinLength,
  Matches,
  IsArray,
  ValidateNested,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { MediaDTO, MobileDTO, SocialDTO } from '../../../common/dto';
import { Media, Mobile } from '../../../common/schemas';
import { LocationDTO } from '../../../common/dto';
import { Location } from '../../../common/schemas';
import { Social } from '../../../common/schemas';
import { EducationDTO } from './education.dto';
import { Education } from '../../schemas/education.schema';
import { CertificateDTO } from './certificate.dto';
import { Certificate } from '../../schemas/certificate.schema';
import { ExperienceDTO } from './experience.dto';
import { Experience } from '../../schemas/experience.schema';
import { PublicationDTO } from './publication.dto';
import { Publication } from '../../schemas/publication.schema';
import { ProjectDTO } from './project.dto';
import { Project } from '../../schemas/project.schema';
import { LanguageDTO } from './language.dto';
import { Language } from '../../schemas/language.schema';
import { ExtDTO } from './ext.dto';
import { Ext } from '../../schemas/ext.schema';
import { PreferenceDTO } from './preference.dto';
import { Preference } from '../../schemas/preference.schema';
import { Diversity, Ethnicity } from '../../../common/mock/constant.mock';
import { Presentation } from '../../schemas/presentation.schema';
import { PresentationDTO } from './presentation.dto';

export class UpdateUserProfileDTO implements Readonly<UpdateUserProfileDTO> {
  @ApiProperty({
    example: 'John',
  })
  @MaxLength(30)
  @MinLength(3)
  @Matches(/^[a-zA-Z ]+$/)
  @IsString()
  firstName: string;

  @ApiProperty({
    example: 'Howard',
  })
  @MaxLength(30)
  @MinLength(3)
  @Matches(/^[a-zA-Z ]+$/)
  @IsString()
  @IsOptional()
  middleName: string;

  @ApiProperty({
    example: 'Smith',
  })
  @MaxLength(30)
  @MinLength(3)
  @Matches(/^[a-zA-Z ]+$/)
  @IsString()
  lastName: string;

  @ApiProperty({
    example: 'Software Engineer',
  })
  @MaxLength(150)
  @MinLength(3)
  @IsString()
  headline: string;

  @ApiProperty({
    example:
      'I can explore the possibility of a new era in the field of information technology.',
  })
  @MaxLength(5000)
  @IsString()
  summary: string;

  @ApiProperty({
    example: 851277600000,
  })
  dob: number;

  @ApiProperty({
    example: 'MALE',
  })
  gender: string;

  @ApiProperty({
    enum: Ethnicity,
  })
  ethnicity: Ethnicity;

  @ApiProperty({
    enum: Diversity,
  })
  diversity: Diversity;

  @ApiProperty()
 
  yearsOfExperience: number;

  @ApiProperty()
 
  yearsAtThisOrg: number;

  @ApiProperty()
  @IsString()
  lifeAtThisOrg: string;

  @ApiProperty({
    type: MobileDTO,
  })
  @ValidateNested({ each: true })
  @Type(() => MobileDTO)
  mobile: Mobile;

  @ApiProperty({
    type: LocationDTO,
  })
  @Type(() => LocationDTO)
  location: Location;

  @ApiProperty()
  @IsArray()
  skills: [string];

  @ApiProperty({
    type: [EducationDTO],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EducationDTO)
  educations: [Education];

  @ApiProperty({
    type: [CertificateDTO],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CertificateDTO)
  certificates: [Certificate];

  @ApiProperty({
    type: [ExperienceDTO],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExperienceDTO)
  experiences: [Experience];

  @ApiProperty({
    type: [PublicationDTO],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PublicationDTO)
  publications: [Publication];

  @ApiProperty({
    type: [PresentationDTO],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PresentationDTO)
  presentations: [Presentation];

  @ApiProperty({
    type: [ProjectDTO],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectDTO)
  projects: [Project];

  @ApiProperty({
    type: [LanguageDTO],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LanguageDTO)
  languages: [Language];

  @ApiProperty({
    type: [SocialDTO],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SocialDTO)
  socials: [Social];

  @ApiProperty({
    type: ExtDTO,
  })
  @Type(() => ExtDTO)
  ext: Ext;

  @ApiProperty({
    type: PreferenceDTO,
  })
  @Type(() => PreferenceDTO)
  preference: Preference;

  @ApiProperty({
    type: MediaDTO,
  })
  @Type(() => MediaDTO)
  profilePic: Media;

  @ApiProperty({
    type: MediaDTO,
  })
  @Type(() => MediaDTO)
  coverPic: Media;

  @ApiProperty({ default: true })
  isPublicProfile: boolean;

  @ApiProperty({ default: true })
  isProfileCreated: boolean;

  @ApiProperty({ default: 0 })
  viewCount: number;

  @ApiProperty({ default: 0 })
  followerCount: number;

  @ApiProperty({ default: 0 })
  followingCount: number;

  @ApiProperty({ default: 0 })
  profilePercentage: number;

  @ApiProperty({ default: true })
  isOpenForOpportunities: boolean;

  @ApiProperty({ default: true })
  isOpenForHiring: boolean;

  @ApiProperty({ default: true })
  isActive: boolean;

  @ApiProperty({ default: true })
  isPublic: boolean;

  @ApiProperty({ default: false })
  isVerified: boolean;

  @ApiProperty({ default: false })
  isDeleted: boolean;

  @ApiProperty()
  timezone: string;
}
