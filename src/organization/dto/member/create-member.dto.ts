import { IsMongoId, IsEnum, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role, Status } from '../../../common/mock/constant.mock';

export class CreateMemberDTO implements Readonly<CreateMemberDTO> {
  @ApiProperty({
    example: 'user1@mail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '631f31fd36ff99ec4ee796e6',
  })
  @IsMongoId()
  user: string;

  @ApiProperty({
    example: '631f31fd36ff99ec4ee796e6',
  })
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
  isPaid: boolean;

  @ApiProperty()
  timezone: string;
}
