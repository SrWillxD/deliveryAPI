import express from 'express';
const app = express();
import routes from './routes.js';

const port = 3333;
app.use(express.json());
app.use(routes);

app.listen(3333, () => console.log(`⚡🚪 Backend started at http://localhost:${port}`));