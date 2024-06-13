import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role, RoleType, Status } from '../../../common/mock/constant.mock';

export class UpdateMemberDTO implements Readonly<UpdateMemberDTO> {
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
  isOwner: boolean;

  @ApiProperty()
  isAdmin: boolean;

  @ApiProperty()
  isPaid: boolean;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  isDeleted: boolean;

  @ApiProperty()
  timezone: string;
}
