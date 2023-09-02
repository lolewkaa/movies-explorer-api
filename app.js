require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
//const cors = require('cors');
const { errors } = require('celebrate');
const helmet = require('helmet');
const rateLimiter = require('./middlewares/rateLimiter');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT, MONGO_DB } = require('./utils/constant');

const router = require('./routes');

const app = express();
//app.use(cors());

// анализирует входящие запросы JSON и помещает проанализированные данные в файлы req.body
app.use(express.json());
app.use(requestLogger);

mongoose.connect(MONGO_DB);

app.use(helmet());
app.use(rateLimiter);
app.use(router);
app.use(errorLogger);
app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
