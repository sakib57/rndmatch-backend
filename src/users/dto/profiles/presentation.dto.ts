import { ApiProperty } from '@nestjs/swagger';
import { Presentation } from "../../schemas/presentation.schema";

export class PresentationDTO implements Readonly<PresentationDTO> {
  @ApiProperty()
  title: string;

  @ApiProperty()
  presentedAt: string;

  @ApiProperty()
  presentationDate: number;

  @ApiProperty()
  url: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  presenters: string[];

  @ApiProperty()
  isDeleted: boolean;
}
