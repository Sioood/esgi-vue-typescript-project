const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

app.use('/static', express.static('public'));

// Données en mémoire (mock)
const products = [
  {
    id: 1,
    name: 'Cheeseburger',
    description: 'Beef patty, lettuce, tomato, cheese',
    price: 8.99,
    image: 'https://burgeraddict.fr/wp-content/uploads/2024/09/MSG-Smash-Burger-FT-RECIPE0124-d9682401f3554ef683e24311abdf342b.jpg',
    ingredients: ['Pain', 'Steak de bœuf', 'Salade', 'Tomate', 'Fromage cheddar', 'Sauce burger']
  },
  {
    id: 2,
    name: 'Bacon Burger',
    description: 'Beef patty, bacon, cheese',
    price: 9.99,
    image: 'https://burgeraddict.fr/wp-content/uploads/2024/09/MSG-Smash-Burger-FT-RECIPE0124-d9682401f3554ef683e24311abdf342b.jpg',
    ingredients: ['Pain', 'Steak de bœuf', 'Bacon croustillant', 'Fromage cheddar', 'Sauce barbecue']
  },
  {
    id: 3,
    name: 'Mushroom Burger',
    description: 'Beef patty, mushrooms, cheese',
    price: 10.49,
    image: 'https://burgeraddict.fr/wp-content/uploads/2024/09/MSG-Smash-Burger-FT-RECIPE0124-d9682401f3554ef683e24311abdf342b.jpg',
    ingredients: ['Pain', 'Steak de bœuf', 'Champignons sautés', 'Fromage suisse', 'Sauce crémeuse aux champignons']
  },
  {
    id: 4,
    name: 'BBQ Burger',
    description: 'Beef patty, BBQ sauce, onion strings',
    price: 11.29,
    image: 'https://burgeraddict.fr/wp-content/uploads/2024/09/MSG-Smash-Burger-FT-RECIPE0124-d9682401f3554ef683e24311abdf342b.jpg',
    ingredients: ['Pain', 'Steak de bœuf', 'Sauce BBQ', 'Oignons frits', 'Cornichons', 'Fromage cheddar']
  }
];


// Stockage temporaire des commandes (en mémoire)
const orders = [];

// Routes

// API Hello
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

// Récupérer tous les produits
app.get('/api/products', (req, res) => {
  console.log(products);
  res.json(products);
});

// Récupérer tous les produits
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

// Passer une commande
app.post('/api/orders', (req, res) => {
  const { items, customer } = req.body;

  console.log(req.body);

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Aucun article dans la commande' });
  }

  const newOrder = {
    id: orders.length + 1,
    items,
    customer,
    date: new Date()
  };

  orders.push(newOrder);
  res.status(201).json({ message: 'Commande enregistrée', order: newOrder });
});


// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
