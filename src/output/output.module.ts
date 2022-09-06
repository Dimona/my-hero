import { Module } from '@nestjs/common';
import { OutputService } from '@output/output.service';

@Module({
  providers: [OutputService],
})
export class OutputModule {}
