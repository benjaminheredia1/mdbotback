import { Module } from '@nestjs/common';
import { QuejasService } from './quejas.service';
import { QuejasController } from './quejas.controller';
@Module({
    controllers: [QuejasController],
    providers: [QuejasService],
    exports: [QuejasService],
})
export class QuejasModule {}
