import { ApiProperty } from '@nestjs/swagger';

export class PreferenceDTO implements Readonly<PreferenceDTO> {
  @ApiProperty()
  salaryExpectation: number;

  @ApiProperty()
  currency: string;

  @ApiProperty()
  seniorityLevel: string[];

  @ApiProperty()
  workLocation: string[];

  @ApiProperty()
  workType: string[];

  @ApiProperty()
  workingTimezone: string[];

  @ApiProperty()
  employmentType: string[];

  @ApiProperty()
  preferredSkills: string[];

  @ApiProperty()
  industries: string[];

  @ApiProperty()
  positions: string[];

  @ApiProperty()
  disciplines: string[];

  @ApiProperty()
  fields: string[];

  @ApiProperty()
  companySize: string[];

  @ApiProperty()
  isDeleted: boolean;
}
