import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { QuerySnippetDto } from './dto/query-snippet.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';
import { Snippet, SnippetDocument } from './schemas/snippet.schema';
import { PaginatedResult } from './interfaces/paginated-result.interface';

@Injectable()
export class SnippetsService {
  constructor(
    @InjectModel(Snippet.name) private readonly snippetModel: Model<SnippetDocument>,
  ) {}

  async create(createSnippetDto: CreateSnippetDto): Promise<Snippet> {
    if (createSnippetDto.tags) {
      createSnippetDto.tags = [...new Set(createSnippetDto.tags)];
    }
    const newSnippet = new this.snippetModel(createSnippetDto);
    return newSnippet.save();
  }

  async findAll(queryDto: QuerySnippetDto): Promise<PaginatedResult<Snippet>> {
    const { q, tag, page = 1, limit = 9 } = queryDto;
    const skip = (page - 1) * limit;

    const filter: Record<string, any> = {};

    if (q) {
      const regex = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      filter.$or = [{ title: regex }, { content: regex }];
    }

    if (tag) {
      filter.tags = tag;
    }

    const [data, total] = await Promise.all([
      this.snippetModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).exec(),
      this.snippetModel.countDocuments(filter).exec(),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  }


  async findOne(id: string): Promise<Snippet> {
    this.validateObjectId(id);
    const snippet = await this.snippetModel.findById(id).exec();
    if (!snippet) {
      throw new NotFoundException(`Snippet with ID ${id} not found`);
    }
    return snippet;
  }

  async update(id: string, updateSnippetDto: UpdateSnippetDto): Promise<Snippet> {
    this.validateObjectId(id);
    if (updateSnippetDto.tags) {
      updateSnippetDto.tags = [...new Set(updateSnippetDto.tags)];
    }
    const existingSnippet = await this.snippetModel
      .findByIdAndUpdate(id, updateSnippetDto, { returnDocument: 'after', runValidators: true })
      .exec();

    if (!existingSnippet) {
      throw new NotFoundException(`Snippet with ID ${id} not found`);
    }
    return existingSnippet;
  }

  async remove(id: string): Promise<Snippet> {
    this.validateObjectId(id);
    const deletedSnippet = await this.snippetModel.findByIdAndDelete(id).exec();
    if (!deletedSnippet) {
      throw new NotFoundException(`Snippet with ID ${id} not found`);
    }
    return deletedSnippet;
  }

  private validateObjectId(id: string): void {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid ID format: ${id}`);
    }
  }

}
