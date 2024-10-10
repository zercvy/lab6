import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js'; // Убедитесь, что экспорт по умолчанию есть

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use('/api/users', userRoutes);

mongoose.connect('mongodb://localhost:27017/service', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Connection error', err);
});
