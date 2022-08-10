import { Module, forwardRef } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    forwardRef(() => UsersModule),
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.register({  
      secret: process.env.PRIVATE_KEY ||'SECRET',
      signOptions: {
        expiresIn: '30m'
      }}
    )
  ],
  exports: [AuthService]
})
export class AuthModule {}
