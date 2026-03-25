// In this file you can configure migrate-mongo
require('dotenv').config();

const url = process.env.MONGODB_URI;
const databaseName = process.env.MONGODB_DB_NAME;

const config = {
  mongodb: {
    url: url,
    databaseName: databaseName,
    options: {
      // connectTimeoutMS: 3600000,
      // socketTimeoutMS: 3600000,
    }
  },
  migrationsDir: "migrations",
  changelogCollectionName: "changelog",
  lockCollectionName: "changelog_lock",
  lockTtl: 0,
  migrationFileExtension: ".ts",
  useFileHash: false,
  moduleSystem: 'commonjs',
};

module.exports = config;
