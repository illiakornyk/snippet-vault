import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { QuerySnippetDto } from './dto/query-snippet.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';
import { Snippet, SnippetDocument } from './schemas/snippet.schema';

@Injectable()
export class SnippetsService {
  constructor(
    @InjectModel(Snippet.name) private snippetModel: Model<SnippetDocument>,
  ) {}

  async create(createSnippetDto: CreateSnippetDto): Promise<Snippet> {
    const newSnippet = new this.snippetModel(createSnippetDto);
    return newSnippet.save();
  }

  async findAll(queryDto: QuerySnippetDto): Promise<{
    data: Snippet[];
    meta: { total: number; page: number; limit: number; totalPages: number; hasNextPage: boolean; hasPreviousPage: boolean; }
  }> {
    const { q, tag, page = 1, limit = 9 } = queryDto;
    const skip = (page - 1) * limit;

    const filter: Record<string, any> = {};

    if (q) {
      filter.$text = { $search: q };
    }

    if (tag) {
      filter.tags = tag;
    }

    const [data, total] = await Promise.all([
      this.snippetModel.find(filter).skip(skip).limit(limit).exec(),
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
        hasPreviousPage: page > 1
      }
    };
  }

  async findOne(id: string): Promise<Snippet> {
    const snippet = await this.snippetModel.findById(id).exec();
    if (!snippet) {
      throw new NotFoundException(`Snippet with ID ${id} not found`);
    }
    return snippet;
  }

  async update(id: string, updateSnippetDto: UpdateSnippetDto): Promise<Snippet> {
    const existingSnippet = await this.snippetModel
      .findByIdAndUpdate(id, updateSnippetDto, { new: true })
      .exec();

    if (!existingSnippet) {
      throw new NotFoundException(`Snippet with ID ${id} not found`);
    }
    return existingSnippet;
  }

  async remove(id: string): Promise<Snippet> {
    const deletedSnippet = await this.snippetModel.findByIdAndDelete(id).exec();
    if (!deletedSnippet) {
      throw new NotFoundException(`Snippet with ID ${id} not found`);
    }
    return deletedSnippet;
  }
}
