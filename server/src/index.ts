import {config} from 'dotenv-safe';

config();
import Server from './server';

process.on('uncaughtException', (error) => {
  console.error(error);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  console.error(error);
  process.exit(1);
});


new Server().init();
