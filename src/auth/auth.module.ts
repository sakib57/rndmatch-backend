import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategies';
import { UserSchema } from '../users/schemas';
import { AuthController } from './controllers';
import { AuthService } from './services';
import { GoogleOauthStrategy } from './strategies/google-oauth.strategy';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secret: process.env.SECRET_KEY_JWT,
      signOptions: {
        expiresIn: 7 * 24 * 60 * 60 * 1000, // 7 days,
      },
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, GoogleOauthStrategy],
})
export class AuthModule {}
