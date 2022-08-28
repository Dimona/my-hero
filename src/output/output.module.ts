import { Module } from '@nestjs/common';
import { OutputService } from '@output/services/output.service';

@Module({
  imports: [],
  providers: [OutputService],
})
export class OutputModule {}
