
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());


const items = [
  { id: 1, category: 'animal', name: 'Dog', infoUrl: 'https://th.wikipedia.org/wiki/%E0%B8%AB%E0%B8%A1%E0%B8%B2', age: 5, adopted: true, dateAdded: '2023-06-15', imageUrl: "/image/dog.jpg", description : 'I Love Dog'},
  { id: 2, category: 'food', name: 'Pizza', infoUrl: 'https://th.wikipedia.org/wiki/%E0%B8%9E%E0%B8%B4%E0%B8%8B%E0%B8%8B%E0%B8%B2', calories: 285, isVegetarian: false, dateAdded: '2023-06-10', imageUrl: '/image/pizza.jpg', description : 'I Love pizza' },
  { id: 3, category: 'sport', name: 'Football', infoUrl: 'https://th.wikipedia.org/wiki/%E0%B9%82%E0%B8%A3%E0%B8%99%E0%B8%B1%E0%B8%A5%E0%B9%82%E0%B8%94', players: 11, isTeamSport: true, dateAdded: '2023-06-12', imageUrl: '/image/r9.jpg', description : 'I Am R9' },
  { id: 4, category: 'tech', name: 'Smartphone', infoUrl: 'https://th.wikipedia.org/wiki/%E0%B9%82%E0%B8%99%E0%B9%80%E0%B8%81%E0%B8%B5%E0%B8%A2_3310', price: 999, inStock: true, dateAdded: '2023-06-20', imageUrl: '/image/3310.jpg', description : 'I Have Nokia 3310' },
  { id: 5, category: 'book', name: 'Harry Potter', infoUrl: 'https://th.wikipedia.org/wiki/%E0%B9%81%E0%B8%AE%E0%B8%A3%E0%B9%8C%E0%B8%A3%E0%B8%B5%E0%B9%88_%E0%B8%9E%E0%B8%AD%E0%B8%95%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B9%8C', pages: 450, isFiction: true, dateAdded: '2023-06-18', imageUrl: '/image/harry.jpg' , description : 'I Like Harry Potter'}
];


app.get('/api/items', (req, res) => {
  res.json(items);
});


app.get('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  item ? res.json(item) : res.status(404).json({ error: 'Item not found' });
});


app.get('/api/items/category/:category', (req, res) => {
  const filteredItems = items.filter(i => i.category.toLowerCase() === req.params.category.toLowerCase());
  res.json(filteredItems);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));