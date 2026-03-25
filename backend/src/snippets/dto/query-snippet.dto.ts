import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QuerySnippetDto {
  @ApiPropertyOptional({
    description: 'Text search query for title and content',
  })
  @IsString()
  @IsOptional()
  readonly q?: string;

  @ApiPropertyOptional({ description: 'Filter snippets by a specific tag' })
  @IsString()
  @IsOptional()
  readonly tag?: string;

  @ApiPropertyOptional({
    description: 'Page number for pagination',
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number;

  @ApiPropertyOptional({ description: 'Number of items per page', default: 10 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly limit?: number;
}
