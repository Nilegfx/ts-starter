import 'reflect-metadata';
import { logger } from './modules/logger';
import { createConnection } from 'typeorm';
import { User } from './entity/User';

createConnection()
  .then(async (connection) => {
    logger.info('Inserting a new user into the database...');
    const user = new User();
    user.firstName = 'Timber';
    user.lastName = 'Saw';
    user.age = 25;
    await connection.manager.save(user);
    logger.info('Saved a new user with id: ' + user.id);

    logger.info('Loading users from the database...');
    const users = await connection.manager.find(User);
    logger.info('Loaded users: ', users);

    logger.info('Here you can setup and run express/koa/any other framework.');
  })
  .catch((error) => logger.error(error.message));
