import { IsMongoId, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role, Status } from '../../../common/mock/constant.mock';

export class MemberDTO implements Readonly<MemberDTO> {
  @ApiProperty()
  @IsMongoId()
  user: string;

  @ApiProperty()
  @IsMongoId()
  organization: string;

  @ApiProperty({
    enum: Role,
    default: Role.MEMBER,
  })
  @IsEnum(Role)
  role: Role;

  @ApiProperty({
    enum: Status,
    default: Status.INVITED,
  })
  @IsEnum(Status)
  status: Status;

  @ApiProperty()
  isAdmin: boolean;

  @ApiProperty()
  isOwner: boolean;

  @ApiProperty()
  isPaid: boolean;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  isDeleted: boolean;

  @ApiProperty()
  cTime: number;

  @ApiProperty()
  cBy: string;

  @ApiProperty()
  uTime: number;

  @ApiProperty()
  uBy: string;

  @ApiProperty()
  dTime: number;

  @ApiProperty()
  dBy: string;

  @ApiProperty()
  timezone: string;
}
