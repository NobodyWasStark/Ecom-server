import app from './app';
import { env } from './config/env';

const startServer = async () => {
  try {
    // Database connection will go here later
    // await prisma.$connect();
    // console.log('Database connected successfully');

    app.listen(env.PORT, () => {
      console.log(`Server running on http://localhost:${env.PORT}`);
      console.log(`Environment: ${env.NODE_ENV}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer();