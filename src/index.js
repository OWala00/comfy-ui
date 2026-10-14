import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Comfy UI Server Running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
