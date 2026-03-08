import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
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
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The snippet has been successfully created.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data.' })
  create(@Body() createSnippetDto: CreateSnippetDto) {
    return this.snippetsService.create(createSnippetDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all snippets with pagination, search and filtering' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return all matching snippets.' })
  findAll(@Query() queryDto: QuerySnippetDto) {
    return this.snippetsService.findAll(queryDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a snippet by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return the requested snippet.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Snippet not found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid ID format.' })
  findOne(@Param('id') id: string) {
    return this.snippetsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a snippet by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The snippet has been successfully updated.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Snippet not found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid ID format or input data.' })
  update(
    @Param('id') id: string,
    @Body() updateSnippetDto: UpdateSnippetDto,
  ) {
    return this.snippetsService.update(id, updateSnippetDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a snippet by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The snippet has been successfully deleted.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Snippet not found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid ID format.' })
  remove(@Param('id') id: string) {
    return this.snippetsService.remove(id);
  }
}
