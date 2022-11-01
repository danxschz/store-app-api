#! /usr/bin/env node

console.log('This script populates the database. Specify database as argument - e.g.: npx ts-node populatedb.ts mongodb+srv://<DB_URL>');

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

import Collection from '../src/models/collection';
import Case from '../src/models/case';
import Accessory from '../src/models/accessory';
import collections from './collections';
import cases from './cases';
import accessories from './accessories';

import mongoose from 'mongoose';
const mongoDB = userArgs[0];
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

interface CollectionObj {
  [key: string]: {}
}

const collectionObj: CollectionObj = {}

const collectionCreate = async (id: string, name: string, slug: string, img: string) => {
  const collectionDetail = { id, name, slug, img }
  const document = new Collection(collectionDetail);
  await document.save();
  console.log(`New collection: ${document}`);
  collectionObj[id] = document;
}

const caseCreate = async (id: string, name: string, price: number, img: string, collection_obj: any) => {
  const caseDetail = { id, name, price, img, collection_obj }
  const document = new Case(caseDetail);
  await document.save();
  console.log(`New case: ${document}`);
}

const accessoryCreate = async (id: string, name: string, price: number, img: string, collection_obj: any) => {
  const accessoryDetail = { id, name, price, img, collection_obj }
  const document = new Accessory(accessoryDetail);
  await document.save();
  console.log(`New accessory: ${document}`);
}

const populatedb = async () => {
  // Populate collections
  for (const i of collections) {
    await collectionCreate(i.id, i.name, i.slug, i.img);
  }

  // Populate cases
  for (const i of cases) {
    await caseCreate(i.id, i.name, i.price, i.img, collectionObj[i.collection]);
  }

  // Populate accessories
  for (const i of accessories) {
    await accessoryCreate(i.id, i.name, i.price, i.img, collectionObj[i.collection]);
  }
  
  // Disconnect from database
  mongoose.connection.close();
}

populatedb();
