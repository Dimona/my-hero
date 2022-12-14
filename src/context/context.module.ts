import { Global, Module } from '@nestjs/common';
import { Context } from '@context/context';
import { ContextService } from '@context/context.service';

@Global()
@Module({
  providers: [Context, ContextService],
  exports: [Context],
})
export class ContextModule {}
