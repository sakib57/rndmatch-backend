import { ApiProperty } from '@nestjs/swagger';

export class PublicationDTO implements Readonly<PublicationDTO> {
  @ApiProperty()
  title: string;

  @ApiProperty()
  publisher: string;

  @ApiProperty()
  publishingDate: number;

  @ApiProperty()
  url: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  authors: string[];

  @ApiProperty()
  isDeleted: boolean;
}
