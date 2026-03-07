import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { QuerySnippetDto } from './dto/query-snippet.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';
import { SnippetsService } from './snippets.service';

@ApiTags('snippets')
@Controller('snippets')
export class SnippetsController {
  constructor(private readonly snippetsService: SnippetsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new snippet' })
  @ApiResponse({ status: 201, description: 'The snippet has been successfully created.' })
  create(@Body(new ValidationPipe({ transform: true })) createSnippetDto: CreateSnippetDto) {
    return this.snippetsService.create(createSnippetDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all snippets with pagination, search and filtering' })
  @ApiResponse({ status: 200, description: 'Return all matching snippets.' })
  findAll(@Query(new ValidationPipe({ transform: true })) queryDto: QuerySnippetDto) {
    return this.snippetsService.findAll(queryDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a snippet by id' })
  @ApiResponse({ status: 200, description: 'Return the requested snippet.' })
  findOne(@Param('id') id: string) {
    return this.snippetsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a snippet by id' })
  @ApiResponse({ status: 200, description: 'The snippet has been successfully updated.' })
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe({ transform: true })) updateSnippetDto: UpdateSnippetDto,
  ) {
    return this.snippetsService.update(id, updateSnippetDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a snippet by id' })
  @ApiResponse({ status: 200, description: 'The snippet has been successfully deleted.' })
  remove(@Param('id') id: string) {
    return this.snippetsService.remove(id);
  }
}
