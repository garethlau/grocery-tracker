const mongoose = require('mongoose');
const {Schema} = mongoose;

const PurchaseSchema = new Schema({
    date: {
        type: String,
        unique: false,
        required: true,
    },
    total: {
        type: Number,
        unique: false,
        required: false,
    },
    items: {
        type: Object,
        unique: false,
        required: true,
    },
    store: {
        type: String,
        unique: false,
        required: false
    },
    createdBy: {
        type: String,
        unique: false,
        required: true
    }
});
PurchaseSchema.methods.calculateTotal = (items) => {
    let total = 0;
    items.forEach(item => {
        total += item.price;
    });
    return total;
}
const Purchase = mongoose.model('Purchase', PurchaseSchema);
module.exports = Purchase;