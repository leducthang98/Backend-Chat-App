import cors from 'cors';

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, 
};

export const corsMiddleware = cors(corsOptions);
