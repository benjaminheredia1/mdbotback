import {Module} from '@nestjs/common';
import {FelicitacionService} from "./felicitacion.service";
import {FelicitacionController} from "./felicitacion.controller";
@Module({
  providers: [FelicitacionService],
  controllers: [FelicitacionController],
  exports: [FelicitacionService],
})
export class FelicitacionModule {}