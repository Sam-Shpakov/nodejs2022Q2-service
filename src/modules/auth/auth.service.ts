import {
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { hash, compare } from 'bcrypt';
import { UsersService } from '../users/users.service';
import { AuthDto } from './dto';
import { JwtPayload, Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  private hash(data: string) {
    return hash(data, +this.configService.get('CRYPT_SALT'));
  }

  async signup(input: AuthDto): Promise<Tokens> {
    const hash = await this.hash(input.password);
    const newUser = await this.usersService.create({
      login: input.login,
      password: hash,
    });

    const tokens = await this.getTokens(newUser.id, newUser.login);
    await this.updateRtHash(newUser.id, tokens.refreshToken);

    return tokens;
  }

  async signin(input: AuthDto): Promise<Tokens> {
    const user = await this.usersService.getByLogin(input.login);

    if (!user) throw new ForbiddenException('Access Denied');
    const rest = await this.hash(input.password);
    const isCompare = await compare(input.password, rest);
    if (!isCompare) {
      throw new ForbiddenException('password is wrong');
    }

    const tokens = await this.getTokens(user.id, user.login);
    await this.updateRtHash(user.id, tokens.refreshToken);

    return tokens;
  }

  async refreshTokens(userId: string, rt: string): Promise<Tokens> {
    const user = await this.usersService.getById(userId);

    if (!user || !user.hashRt) {
      throw new ForbiddenException('Access Denied');
    }

    const isCompare = await compare(rt, user.hashRt);
    if (!isCompare) {
      throw new ForbiddenException('refreshToken is wrong');
    }

    const tokens = await this.getTokens(user.id, user.login);
    await this.updateRtHash(user.id, tokens.refreshToken);

    return tokens;
  }

  async updateRtHash(userId: string, rt: string): Promise<void> {
    const hashRt = await this.hash(rt);
    await this.usersService.updateHashRt(userId, hashRt);
  }

  async getTokens(userId: string, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
