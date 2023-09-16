// Import necessary packages
const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB using the URI from the .env file
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define a schema for the Person model
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

// Create the Person model based on the schema
const Person = mongoose.model('Person', personSchema);

// Create and Save a Record of a Model
const newPerson = new Person({
  name: 'John',
  age: 30,
  favoriteFoods: ['Pizza', 'Burger']
});

newPerson.save(function(err, data) {
  if (err) return console.error(err);
  console.log('New person saved:', data);
});

// Create Many Records with model.create()
const arrayOfPeople = [
  { name: 'Alice', age: 25, favoriteFoods: ['Sushi', 'Pasta'] },
  { name: 'Bob', age: 35, favoriteFoods: ['Steak', 'Chicken'] },
  { name: 'Carol', age: 40, favoriteFoods: ['Salad', 'Fish'] }
];

Person.create(arrayOfPeople, function(err, people) {
  if (err) return console.error(err);
  console.log('Multiple people created:', people);
});

// Use model.find() to Search Your Database
Person.find({ name: 'John' }, function(err, people) {
  if (err) return console.error(err);
  console.log('People with the name John:', people);
});

// Use model.findOne() to Return a Single Matching Document
Person.findOne({ favoriteFoods: 'Pizza' }, function(err, person) {
  if (err) return console.error(err);
  console.log('One person who likes Pizza:', person);
});

// Use model.findById() to Search Your Database By _id
const personId = 'your-person-id-here'; // Replace with an actual _id
Person.findById(personId, function(err, person) {
  if (err) return console.error(err);
  console.log('Person with the specified _id:', person);
});

// Perform Classic Updates by Running Find, Edit, then Save
const personIdToUpdate = 'your-person-id-here'; // Replace with an actual _id
Person.findById(personIdToUpdate, function(err, person) {
  if (err) return console.error(err);
  
  // Add "hamburger" to favoriteFoods
  person.favoriteFoods.push('Hamburger');
  
  // Save the updated Person
  person.save(function(err, updatedPerson) {
    if (err) return console.error(err);
    console.log('Updated person:', updatedPerson);
  });
});

// Perform New Updates on a Document Using model.findOneAndUpdate()
const personNameToUpdate = 'John'; // Replace with a name to search for
Person.findOneAndUpdate(
  { name: personNameToUpdate },
  { age: 20 },
  { new: true },
  function(err, updatedPerson) {
    if (err) return console.error(err);
    console.log('Updated person by name:', updatedPerson);
  }
);

// Delete One Document Using model.findByIdAndRemove
Person.findByIdAndRemove(personIdToUpdate, function(err, removedPerson) {
  if (err) return console.error(err);
  console.log('Removed person:', removedPerson);
});

// Delete Many Documents with model.remove()
Person.remove({ name: 'Mary' }, function(err, result) {
  if (err) return console.error(err);
  console.log('Removed people named Mary:', result);
});

// Chain Search Query Helpers to Narrow Search Results
Person.find({ favoriteFoods: 'Burritos' })
  .sort({ name: 1 })
  .limit(2)
  .select({ age: 0 })
  .exec(function(err, people) {
    if (err) return console.error(err);
    console.log('People who like Burritos:', people);
  });
