import express from 'express';
import { globalErrorHandler } from './middleware/globalErrorHandler';
import { config } from 'dotenv';
import connectRedis from 'connect-redis';
import session from 'express-session';
import Redis from 'ioredis';
import cors from 'cors';
import typeTestRouter from './routes/typeTestRoute';
import { COOKIE_NAME, __prod__ } from './utils/constants';
config({ path: '../.env' });
const PORT = process.env.PORT || 8080;

const main = async () => {
  // const RedisStore = connectRedis(session);
  // const redis = new Redis();

  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(
    cors({
      origin: 'blah blah', //wherever are front end is,
      credentials: true,
    })
  );

  //SESSIONS ROUTE
  // app.use(
  //   session({
  //     name: COOKIE_NAME,
  //     store: new RedisStore({
  //       client: redis,
  //       disableTouch: true,
  //     }),
  //     saveUninitialized: false,
  //     resave: false,
  //     secret: process.env.SESSION_SECRET ?? '',
  //     cookie: {
  //       maxAge: 1000 * 60 * 60 * 24,
  //       httpOnly: true,
  //       sameSite: 'lax',
  //       secure: __prod__,
  //     },
  //   })
  // );

  app.use('/typeTest', typeTestRouter);

  app.use((_, res) => res.status(404).send('page not found'));
  app.use(globalErrorHandler);

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT} in ${process.env.NODE_ENV} mode`);
  });
};

main().catch((err) => console.log(err));
