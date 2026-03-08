import { ArrayMaxSize, IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SnippetType } from '../enums/snippet-type.enum';

export class CreateSnippetDto {
  @ApiProperty({ example: 'My snippets', description: 'The title of the snippet', maxLength: 200 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;

  @ApiProperty({ example: 'Some text content', description: 'The content of the snippet', maxLength: 50000 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50000)
  content: string;

  @ApiPropertyOptional({ example: ['typescript', 'nestjs'], description: 'List of tags (max 20, each up to 50 chars)' })
  @IsArray()
  @ArrayMaxSize(20)
  @IsString({ each: true })
  @MaxLength(50, { each: true })
  @IsOptional()
  tags?: string[];

  @ApiProperty({ enum: SnippetType, example: SnippetType.NOTE, description: 'Type of the snippet' })
  @IsEnum(SnippetType)
  @IsNotEmpty()
  type: SnippetType;
}
