import express, { Express } from 'express';
import startUpRoutes from '../backend/src/startUp/startRoute';

// Initialize express app
const app: Express = express();

// Forward routes to startup routes
startUpRoutes(app);

// Start listening to the server on the configured port
app.listen(7690, () => {
  console.log(`Listening server on port 7690`);
});
