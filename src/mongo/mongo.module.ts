import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: async (configServices: ConfigService) => ({
            uri: configServices.get<string>('MONGO_URI'),
            connectionErrorFactory: (error: any) => new Error(`Error connecting to the database: ${error.message}`),
        }),
        inject: [ConfigService],
    })],
})
export class MongoModule { }
