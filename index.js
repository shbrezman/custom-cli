const express = require("express");
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 8080;
const db = mongoose.connect('mongodb://localhost:27017/customercli');
const Customer = require('./models/customer');

//// avoiding warning //////////
mongoose.Promise = global.Promise;
////////////////////////////////


const addCustomer = (customer) => {
    Customer.create(customer).then(customer => {
        console.log('new customer added');
        mongoose.connection.close();
    })
}

const findCustomer = (name) => {
    const search = new RegExp(name, 'i');
    Customer.find({ $or: [{ firstName: search }, { lastName: search }] }).then(customers => {
        console.log(customers);
        console.log(`${customers.length} matches`);
        mongoose.connection.close();
    })
}

const updateCustomer = (_id, customer) => {
    Customer.updateOne({ _id }, customer).then(customer => {
        console.log(`customer id: ${_id} updated`)
        mongoose.connection.close();
    })
}

const removeCustomer = (_id) => {
    Customer.deleteOne({ _id }).then(customer => {
        console.log(`customer id: ${_id} removed`)
        mongoose.connection.close();
    })
}

const listCustomers = () =>{
    Customer.find().then(customers =>{
        console.log(customers);
        console.log(`number of customers ======>>>>>>>> ${customers.length}`);
        mongoose.connection.close();
    })
}

module.exports = {
    addCustomer,
    findCustomer,
    updateCustomer,
    removeCustomer,
    listCustomers
}