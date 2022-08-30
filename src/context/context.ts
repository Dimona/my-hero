import { ContextAbstract } from '@context/context.abstract';
import { ContextStorage } from '@context/context.types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Context extends ContextAbstract<ContextStorage> {}
