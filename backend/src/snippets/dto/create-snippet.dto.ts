import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSnippetDto {
  @ApiProperty({ example: 'My snippets', description: 'The title of the snippet' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Some markdown content', description: 'The content of the snippet' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiPropertyOptional({ example: ['typescript', 'nestjs'], description: 'List of tags' })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @ApiProperty({ enum: ['link', 'note', 'command'], example: 'note', description: 'Type of the snippet' })
  @IsEnum(['link', 'note', 'command'])
  @IsNotEmpty()
  type: string;
}
