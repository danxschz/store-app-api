#! /usr/bin/env node

console.log('This script populates the database. Specify database as argument - e.g.: npx ts-node populatedb.ts mongodb+srv://<DB_URL>');

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

import Case from '../src/models/case';
import cases from './cases';

import mongoose from 'mongoose';
const mongoDB = userArgs[0];
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const caseArray = []

const caseCreate = async (id: string, name: string, price: number, img: string) => {
  const caseDetail = { id, name, price, img }
  const document = new Case(caseDetail);
  await document.save();
  console.log(`New case: ${document}`);
  caseArray.push(document);
}

const populatedb = async () => {
  // Populate cases
  for (const item of cases) {
    await caseCreate(item.id, item.name, item.price, item.img)
  }
  
  // Disconnect from database
  mongoose.connection.close();
}

populatedb();
