import { Module } from '@nestjs/common';
import { OutputService } from '@output/output.service';

@Module({
  imports: [],
  providers: [OutputService],
})
export class OutputModule {}
