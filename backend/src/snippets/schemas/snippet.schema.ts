import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SnippetType } from '../enums/snippet-type.enum';
import {
  MAX_CONTENT_LENGTH,
  MAX_TITLE_LENGTH,
} from '../constants/snippet.constants';

export type SnippetDocument = HydratedDocument<Snippet>;

@Schema({ timestamps: true })
export class Snippet {
  @Prop({ required: true, maxlength: MAX_TITLE_LENGTH, trim: true })
  readonly title: string;

  @Prop({ required: true, maxlength: MAX_CONTENT_LENGTH })
  readonly content: string;

  @Prop({ type: [String], default: [], index: true })
  readonly tags: string[];

  @Prop({ required: true, enum: SnippetType })
  readonly type: SnippetType;
}

export const SnippetSchema = SchemaFactory.createForClass(Snippet);

SnippetSchema.index(
  { title: 'text', content: 'text' },
  { weights: { title: 5, content: 1 } },
);
SnippetSchema.index({ tags: 1, createdAt: -1 });
SnippetSchema.index({ createdAt: -1 });
