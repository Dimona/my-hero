import { ContextAbstract } from '@context/core/context';
import { ContextStorage } from '@context/types/context.types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Context extends ContextAbstract<ContextStorage> {}
