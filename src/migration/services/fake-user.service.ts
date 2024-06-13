import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../../users/services';
import { CreateUserDTO } from '../../users/dto';
import { userPreference } from '../../common/mock/constant.mock';
import { FakeDTO } from '../dto/fake.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser, IUserProfile } from '../../users/interfaces';
import { randomEnumValue } from '../../common/utils/helper';

@Injectable()
export class FakeUserService {
  /**
   * Constructor
   * @param {service<UserService>} userService
   */
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<IUser>,
    @InjectModel('UserProfile')
    private readonly userProfileModel: Model<IUserProfile>,
    private readonly userService: UsersService,
  ) {}

  async create(fakeDTO: FakeDTO) {
    const rawPassword = 'rndmatch@2022';
    for (let i = 0; i < fakeDTO.quantity; i++) {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const email = faker.internet.email(firstName, lastName);
      const password = bcrypt.hashSync(rawPassword, 8);

      const createUserDTO = new CreateUserDTO();
      createUserDTO.firstName = firstName;
      createUserDTO.lastName = lastName;
      createUserDTO.email = email;
      createUserDTO.password = password;
      createUserDTO.userPreference = randomEnumValue(userPreference);
      createUserDTO.isFake = true;
      try {
        await this.userService.register(createUserDTO);
      } catch (err) {
        throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
      }
    }
  }

  async delete() {
    try {
      const users: IUser[] = await this.userModel
        .find({ isFake: true })
        .select('_id');
      await this.userModel
        .deleteMany({ _id: { $in: users } })
        .then(async () => {
          await this.userProfileModel.deleteMany({ user: { $in: users } });
        });
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
}
