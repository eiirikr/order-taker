const dotenv = require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const http = require('http');
const { Server } = require("socket.io");
const bodyParser = require('body-parser');

// Routes
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderedProductRoutes = require('./routes/orderedProductRoutes');
const waitListRoutes = require('./routes/waitListRoutes');
const awsRoutes = require('./routes/awsRoutes');

// Controllers
const productControllers = require('./controllers/productControllers');
const cartControllers = require('./controllers/cartControllers');
const orderedProductControllers = require('./controllers/orderedProductControllers');
const waitListControllers = require('./controllers/waitListControllers');

const app = express();

app.use(function(req, res, next) {
  if (req.get('x-amz-sns-message-type')) {
      req.headers['content-type'] = 'application/json';
  }
  next();
});
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let db = mongoose.connection;

db.on('error', console.error.bind(console, "MongoDB Connection Error"));
db.on('open', () => console.log("Connected to MongoDB"));

app.use(express.json());
app.use(cors({
    origin: '*'
}));

// Create HTTP server
const server = http.createServer(app);

// Create Socket.IO instance
const io = new Server(server, {
  cors: {
    origin: process.env.SERVER_URL+':'+process.env.SOCKET_PORT,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Set the socket instance in the controller
productControllers.setSocketIO(io);
cartControllers.setSocketIO(io);
orderedProductControllers.setSocketIO(io);
waitListControllers.setSocketIO(io);

// WebSocket event handling
io.on('connection', (socket) => {
  console.log('A client connected');

  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });

  socket.on('addProduct', (product) => {
    io.emit('newProduct', product);
  });

  socket.on('updatedProduct', (product) => {
    io.emit('updatedProduct', product);
  });

  socket.on('waitlistUpdated', (product) => {
    io.emit('waitlistUpdated', product);
  });

  socket.on('deleteProduct', (product) => {
    io.emit('deleteProduct', product);
  });
});

const productRouter = productRoutes();
const cartRouter = cartRoutes();
const orderedProductRouter = orderedProductRoutes();
const waitListRouter = waitListRoutes();
const awsRouter = awsRoutes();

app.use('/products', productRouter);
app.use('/carts', cartRouter);
app.use('/orderedProducts', orderedProductRouter);
app.use('/waitlist', waitListRouter);
app.use('/sns', awsRouter);

server.listen(process.env.PORT, () => console.log(`Express API running at ${process.env.PORT}`));
