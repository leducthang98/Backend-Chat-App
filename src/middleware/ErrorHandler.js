import { error } from '../constant/Error';
import { logger } from '../util/Logger';

export const controllerHandler = f => async (req, res, next) => {
  try {
    await f(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const errorHandler = (error, req, res, next) => {
  if (typeof error === 'string') {

    const errorObject = findErrorObject(error)
    
    res.status(errorObject.status || 500).json({
      code: errorObject.code,
      message: errorObject.message
    });

    logger.error(error);
  } else {
    const errorObject = findErrorObject(error.message)

    res.status(errorObject.status || 500).send({
      code: errorObject.code,
      message: errorObject.message
    });

    logger.error(error.message);
  }
};

const findErrorObject = (errorMessage) => {
  for (const e in error) {
    if (error[e].message === errorMessage) {
      return error[e]
    }
  }
  return error.UNKNOWN_ERROR
}