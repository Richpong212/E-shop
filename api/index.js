const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.route');
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const orderRoutes = require('./routes/order.routes');
const cartRoutes = require('./routes/cart.routes');
const stripeRoute = require('./routes/stripe')
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());

const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT 

app.use(express.json());


app.listen(port, () => {
     try {
        console.log(`Server is running on port ${port}`)
        mongoose.connect(process.env.MONGODB )
        .then(() => console.log('Connected to MongoDB...'))
        .catch(err => console.error('Could not connect to MongoDB...'));
     } catch (error) {
        console.log({
            message: 'Server is not running',
        });
     }
});

//Api Routes

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/checkout', stripeRoute)
