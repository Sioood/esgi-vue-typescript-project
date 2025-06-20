const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

app.use('/static', express.static('public'));

const products = [
  {
    id: 1,
    name: 'Cheeseburger',
    description: "Du pain, du steak, du fromage... Simple. Efficace. Ton estomac va t’applaudir.",
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1508737027454-e6454ef45afd?q=80&w=986&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ingredients: ['Pain', 'Steak', 'Salade', 'Tomate', 'Fromage']
  },
  {
    id: 2,
    name: 'Bacon Burger',
    description: "Pour les vrais kiffeurs de bacon. Ici, le cochon est en full overtime.",
    price: 9.99,
    image: 'https://burgeraddict.fr/wp-content/uploads/2024/09/MSG-Smash-Burger-FT-RECIPE0124-d9682401f3554ef683e24311abdf342b.jpg',
    ingredients: ['Pain', 'Steak', 'Bacon', 'Fromage']
  },
  {
    id: 3,
    name: 'Mushroom Burger',
    description: "Des champis dans ton burger. Mais légal hein. Quoique... tellement bon que c'est louche.",
    price: 10.49,
    image: 'https://plus.unsplash.com/premium_photo-1664472724753-0a4700e4137b?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ingredients: ['Pain', 'Steak', 'Champignons', 'Fromage']
  },
  {
    id: 4,
    name: 'BBQ Burger',
    description: "Le goût du barbecue sans enfumer tes voisins. L'été dans un pain.",
    price: 11.29,
    image: 'https://burgeraddict.fr/wp-content/uploads/2024/09/MSG-Smash-Burger-FT-RECIPE0124-d9682401f3554ef683e24311abdf342b.jpg',
    ingredients: ['Pain', 'Steak', 'Oignon', 'Fromage']
  },
  {
    id: 5,
    name: "Chick'n Burger",
    description: "Le poulet a pris sa retraite. Il finit sa carrière dans ton assiette. Avec honneur.",
    price: 10.99,
    image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ingredients: ['Pain', 'Fromage', 'Salade', 'Tomate']
  },
  {
    id: 6,
    name: 'Veggie Burger',
    description: "Zéro viande. Mais quand même du goût. Oui, c’est possible, on l’a fait.",
    price: 9.49,
    image: 'https://images.unsplash.com/photo-1549611016-3a70d82b5040?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ingredients: ['Pain', 'Salade', 'Tomate', 'Fromage']
  },
  {
    id: 7,
    name: 'Fish Burger',
    description: "Le burger qui nageait tranquille... avant de finir star du menu.",
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ingredients: ['Pain', 'Fromage', 'Salade', 'Tomate']
  },
  {
    id: 8,
    name: 'Mozzarella Burger',
    description: "Tellement de mozza que même les pizzas nous jalousent.",
    price: 12.49,
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?q=80&w=2490&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ingredients: ['Pain', 'Steak', 'Fromage', 'Tomate']
  },
  {
    id: 9,
    name: 'Cheesy Burger',
    description: "Le fromage a pris le contrôle. C’est lui le patron ici.",
    price: 13.99,
    image: 'https://images.unsplash.com/photo-1512152272829-e3139592d56f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ingredients: ['Pain', 'Steak', 'Fromage']
  },
  {
    id: 10,
    name: 'Onion Burger',
    description: "L’oignon dans tous ses états. Prépare les mouchoirs (de joie).",
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1534790566855-4cb788d389ec?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ingredients: ['Pain', 'Steak', 'Oignon', 'Fromage']
  },
  {
    id: 11,
    name: 'Bacon Big Burger',
    description: "Ici, le bacon a tout donné. Il mérite une standing ovation.",
    price: 12.99,
    image: 'https://plus.unsplash.com/premium_photo-1683655058728-415f4f2674bf?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ingredients: ['Pain', 'Steak', 'Bacon', 'Fromage']
  }
]




// Stockage temporaire des commandes (en mémoire)
const orders = [];
const users = [];

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
