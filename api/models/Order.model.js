const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, 'User ID is required'],
    },
    description: [
        {
            productId: {
                type: String,

            },
            quantity: {
                type: Number,
                default: 1,
            }
        }
    ],
    amount: {
        type: Number,
        required: [true, 'Amount is required'],
    },
    address: {
        type: Object,
        required: [true, 'Address is required'],
        status: {
            type: String,
            default: 'Pending',
        }
    }
    
},{timestamps: true});

module.exports = mongoose.model('Order', OrderSchema);