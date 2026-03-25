import { Db, MongoClient } from 'mongodb';

export const up = async (db: Db, client: MongoClient) => {
  await db.command({
    collMod: 'snippets',
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['title', 'content', 'type'],
        properties: {
          title: {
            bsonType: 'string',
            description: 'Title is required and must be a string',
          },
          content: {
            bsonType: 'string',
            description: 'Content is required and must be a string',
          },
          type: {
            enum: ['link', 'note', 'command'],
            description: 'Type must be one of the allowed values',
          },
          tags: {
            bsonType: 'array',
            items: { bsonType: 'string' },
          },
        },
      },
    },
    validationLevel: 'strict',
    validationAction: 'error',
  });
};

export const down = async (db: Db, client: MongoClient) => {
  await db.command({
    collMod: 'snippets',
    validator: {},
  });
};
