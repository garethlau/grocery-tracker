const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Purchase = mongoose.model('Purchase');

router.post('/', (req, res) => {
    // create a new purchase
    console.log(req.body);
    let {date, total, items, store} = req.body;
    
    let newPurchase = new Purchase();
    newPurchase.createdBy = req.user._id;
    newPurchase.date = date;
    newPurchase.items = items;
    newPurchase.store = store;
    newPurchase.total = total || newPurchase.calculateTotal(items);
    newPurchase.save().then(savedPurchase => {
        console.log("Saved purchase");
        console.log(savedPurchase)
        return res.send("received")
    }).catch(err => {
        console.error(err);
        return res.send(err);
    });
});

router.get('/', (req, res) => {
    let purchaseId = req.query.id
    console.log(req.user);
    console.log(purchaseId);
    if (!req.user) {
        // no user logged in
        return res.send({message: "Invalid permission"});
    }
    Purchase.findById(purchaseId, (err, purchase) => {
        console.log(purchase);
        if (err) {
            console.error(err);
            return res.send({message: "Error"})
        }
        if (!purchase) {
            return res.send({message: "Purchase not found"});

        }
        if (purchase.createdBy != req.user._id) {
            return res.send({message: "Invalid permission"})
        }
        else {
            return res.send(purchase);
        }
    });
});

router.get('/recent', (req, res) => {
    if (!req.user) {
        return res.send({message: "Invalid permission"});
    }
    console.log("USER ID ", req.user._id);
    Purchase.find({createdBy: req.user._id}, null, {sort: 'date'}, (err, purchases) => {
        if (err) res.send({message: "Error"});
        return res.send({purchases: purchases});
    });
})

router.put('/', (req, res) => {
    // update a purchase
    let purchaseId = req.body.purchaseId;
    let {date, total, items, store} = req.body.update;
    Purchase.findById(purchaseId, (err, purchase) => {
        if (err) return res.send({message: "Error"});
        if (!purchase) {
            return res.send({message: "Purchase not found"});
        }
        if (purchase.createdBy != req.user._id) {
            return res.send({message: "Invalid permission"});
        }
        purchase.date = date || purchase.date;
        purchase.total = total || purchase.total;
        purchase.items = items || purchase.items;
        purchase.store = store || purchase.store;
        purchase.total = purchase.calculateTotal(purchase.items);
        purchase.save().then(updatedPurchase => {
            console.log("Purchase updated");
            console.log(updatedPurchase);
            return res.send({message: "Purchase updated"});
        }).catch(err => {
            console.error(err);
            return res.send({message: "Error updating purchase"});
        });
    });   
});

router.delete('/', (req, res) => {
    // delete a purchase
    let purchaseId = req.query.purchaseId;
    Purchase.findByIdAndDelete(purchaseId, (err, deleted) => {
        if (err) return res.send({message: "Error deleting"});
        return res.send({message: "Deleted"});
    })
});

module.exports = router;