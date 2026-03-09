import {
  ArrayMaxSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SnippetType } from '../enums/snippet-type.enum';
import {
  MAX_CONTENT_LENGTH,
  MAX_TAG_LENGTH,
  MAX_TAGS_COUNT,
  MAX_TITLE_LENGTH,
} from '../constants/snippet.constants';

export class CreateSnippetDto {
  @ApiProperty({
    example: 'My snippets',
    description: 'The title of the snippet',
    maxLength: MAX_TITLE_LENGTH,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(MAX_TITLE_LENGTH)
  title: string;

  @ApiProperty({
    example: 'Some text content',
    description: 'The content of the snippet',
    maxLength: MAX_CONTENT_LENGTH,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(MAX_CONTENT_LENGTH)
  content: string;

  @ApiPropertyOptional({
    example: ['typescript', 'nestjs'],
    description: `List of tags (max ${MAX_TAGS_COUNT}, each up to ${MAX_TAG_LENGTH} chars)`,
  })
  @IsArray()
  @ArrayMaxSize(MAX_TAGS_COUNT)
  @IsString({ each: true })
  @MaxLength(MAX_TAG_LENGTH, { each: true })
  @IsOptional()
  tags?: string[];

  @ApiProperty({
    enum: SnippetType,
    example: SnippetType.NOTE,
    description: 'Type of the snippet',
  })
  @IsEnum(SnippetType)
  @IsNotEmpty()
  type: SnippetType;
}
