import { ApiProperty } from '@nestjs/swagger';

export class ProjectDTO implements Readonly<ProjectDTO> {
  @ApiProperty()
  title: string;

  @ApiProperty()
  startDate: number;

  @ApiProperty()
  endDate: number;

  @ApiProperty()
  url: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  contributors: string[];

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  isDeleted: boolean;
}
