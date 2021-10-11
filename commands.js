#!/usr/bin/env node

const program = require('commander');
const { addCustomer, findCustomer, updateCustomer, removeCustomer, listCustomers} = require('./index');
const { prompt } = require('inquirer');

const questions = [
    {
        type: 'input',
        name: 'firstName',
        message: 'customer first name: '
    },
    {
        type: 'input',
        name: 'lastName',
        message: 'customer last name: '
    },
    {
        type: 'input',
        name: 'phone',
        message: 'customer phone number: '
    },
    {
        type: 'input',
        name: 'email',
        message: 'customer email: '
    }
]

program
    .version('1.1.2')
    .description('customer management system');    

// program
//     .command('add <firstName> <lastName> <phone> <email>')
//     .alias('a')
//     .description('adding a customer')
//     .action((firstName, lastName, phone, email) =>{
//         addCustomer({firstName, lastName, phone, email});
//     });


// adding customer

program
    .command('add')
    .alias('a')
    .description('adding a customer')
    .action(() =>{
        prompt(questions).then(answers => addCustomer(answers));
    });


// find customer

program
    .command('find <name>')
    .alias('f')
    .description('finding a customer')
    .action((name) =>{
        findCustomer(name);
    });


// update customer

program
    .command('update <_id>')
    .alias('u')
    .description('updating a customer')
    .action((_id) =>{
        prompt(questions).then(answers => updateCustomer(_id, answers));
    });

    
// remove customer    

program
    .command('remove <_id>')
    .alias('r')
    .description('removing a customer')
    .action((_id) =>{
        removeCustomer(_id);
    })


// list customers

program
    .command('list')
    .alias('l')
    .description('return list of customers')
    .action(() =>{
        listCustomers();
    })    



program.parse(process.argv);

