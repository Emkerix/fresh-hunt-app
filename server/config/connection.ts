import { dataSource } from './app-data-source';

const initializeDatabaseConnection = async () => {
  try {
    await dataSource.initialize();
    console.log('Data Source has been initialized!');
    return dataSource;
  } catch (err) {
    console.error('Error during Data Source initialization', err);
  }
};

export const databaseConnection = initializeDatabaseConnection();
