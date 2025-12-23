import {Module} from '@nestjs/common';
import { FinalizandoService } from './finalizado.service';
import { FinalizadoController } from './finalizado.controller';
@Module({
  controllers: [FinalizadoController],
  providers: [FinalizandoService],
})
export class FinalizadoModule {}