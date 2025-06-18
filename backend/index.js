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
    image:
      'https://images.unsplash.com/photo-1508737027454-e6454ef45afd?q=80&w=986&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ingredients: ['Pain', 'Steak de bœuf', 'Salade', 'Tomate', 'Fromage cheddar', 'Sauce burger'],
  },
  {
    id: 2,
    name: 'Bacon Burger',
    description: 'Beef patty, bacon, cheese',
    price: 9.99,
    image:
      'https://burgeraddict.fr/wp-content/uploads/2024/09/MSG-Smash-Burger-FT-RECIPE0124-d9682401f3554ef683e24311abdf342b.jpg',
    ingredients: [
      'Pain',
      'Steak de bœuf',
      'Bacon croustillant',
      'Fromage cheddar',
      'Sauce barbecue',
    ],
  },
  {
    id: 3,
    name: 'Mushroom Burger',
    description: 'Beef patty, mushrooms, cheese',
    price: 10.49,
    image:
      'https://plus.unsplash.com/premium_photo-1664472724753-0a4700e4137b?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ingredients: [
      'Pain',
      'Steak de bœuf',
      'Champignons sautés',
      'Fromage suisse',
      'Sauce crémeuse aux champignons',
    ],
  },
  {
    id: 4,
    name: 'BBQ Burger',
    description: 'Beef patty, BBQ sauce, onion strings',
    price: 11.29,
    image:
      'https://burgeraddict.fr/wp-content/uploads/2024/09/MSG-Smash-Burger-FT-RECIPE0124-d9682401f3554ef683e24311abdf342b.jpg',
    ingredients: [
      'Pain',
      'Steak de bœuf',
      'Sauce BBQ',
      'Oignons frits',
      'Cornichons',
      'Fromage cheddar',
    ],
  },
  {
    id: 5,
    name: "Chick'n Burger",
    description: 'Chicken patty, lettuce, tomato, cheese',
    price: 10.99,
    image:
      'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ingredients: ['Pain', 'Poulet pané', 'Laitue', 'Tomate', 'Fromage cheddar', 'Sauce burger'],
  },
  {
    id: 6,
    name: 'Veggie Burger',
    description: 'Veggie patty, lettuce, tomato, cheese',
    price: 9.49,
    image:
      'https://images.unsplash.com/photo-1549611016-3a70d82b5040?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ingredients: [
      'Pain',
      'Patty végétarien',
      'Laitue',
      'Tomate',
      'Fromage cheddar',
      'Sauce burger',
    ],
  },
  {
    id: 7,
    name: 'Fish Burger',
    description: 'Fish patty, lettuce, tomato, cheese',
    price: 12.99,
    image:
      'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ingredients: ['Pain', 'Poisson pané', 'Laitue', 'Tomate', 'Fromage cheddar', 'Sauce burger'],
  },
  {
    id: 8,
    name: 'Mozzarella Burger',
    description: 'Beef patty, mozzarella, tomato, basil',
    price: 12.49,
    image:
      'https://images.unsplash.com/photo-1520072959219-c595dc870360?q=80&w=2490&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ingredients: ['Pain', 'Steak de bœuf', 'Mozzarella', 'Tomate', 'Basilic', 'Sauce burger'],
  },
  {
    id: 9,
    name: 'Cheesy Burger',
    description: 'Beef patty, mozzarella, cheddar, parmesan',
    price: 13.99,
    image:
      'https://images.unsplash.com/photo-1512152272829-e3139592d56f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ingredients: ['Pain', 'Steak de bœuf', 'Mozzarella', 'Cheddar', 'Parmesan', 'Sauce burger'],
  },
  {
    id: 10,
    name: 'Onion Burger',
    description: 'Beef patty, onion strings, cheddar',
    price: 11.99,
    image:
      'https://images.unsplash.com/photo-1534790566855-4cb788d389ec?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ingredients: ['Pain', 'Steak de bœuf', 'Oignons frits', 'Cheddar', 'Sauce burger'],
  },
  {
    id: 11,
    name: 'Bacon Burger',
    description: 'Beef patty, bacon, cheddar',
    price: 12.99,
    image:
      'https://plus.unsplash.com/premium_photo-1683655058728-415f4f2674bf?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ingredients: ['Pain', 'Steak de bœuf', 'Bacon croustillant', 'Cheddar', 'Sauce burger'],
  },
]


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
