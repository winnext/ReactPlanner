import { CacheModule, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlanModule } from './plan/plan.module';
import { SpaceModule } from './space/space.module';
import { AssetModule } from './asset/asset.module';
import { TodoModule } from './todo/todo.module';
import { ModelModule } from './model/model.module';
import { ComponentModule } from './component/component.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HttpCacheInterceptor } from 'ifmcommon';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ttl: configService.get('CACHE_TTL'), //time to keep in cache in seconds
        store: redisStore,
        host: configService.get('CACHE_HOST'),
        port: +configService.get('CACHE_PORT'),
        isGlobal: true,
        max: +configService.get('CACHE_MAX'), // maximum number of items in cache
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        uri: config.get('MONGODB_URI'),
        dbName: config.get('DB_NAME'),
        user: config.get('DB_USER'),
        pass: config.get('DB_PASSWORD'),
      }),
      inject: [ConfigService],
    }),
    PlanModule,
    SpaceModule,
    AssetModule,
    ComponentModule,
    TodoModule,
    ModelModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpCacheInterceptor,
    },
  ],
})
export class AppModule {}
