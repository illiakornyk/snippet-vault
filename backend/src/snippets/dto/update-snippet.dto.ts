import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateSnippetDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsEnum(['link', 'note', 'command'])
  @IsOptional()
  type?: string;
}
