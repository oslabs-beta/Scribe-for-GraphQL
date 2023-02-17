import express from 'express'
import { globalErrorHandler } from './middleware/globalErrorHandler';
import {config} from 'dotenv';
config({path: '../.env'});
const PORT = process.env.PORT || 8080;



const main = async() => {
  const app = express();

  app.use((_, res)=> res.status(404).send('page not found'))

  app.use(globalErrorHandler);

  app.listen(PORT, ()=> {
    console.log(`Listening on port ${PORT} in ${process.env.NODE_ENV} mode`)
  });
}

main().catch((err) => console.log(err));