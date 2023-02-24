// Importer Mongoose et configurer dotenv
const mongoose=require('mongoose');
require('dotenv').config();


// Se connecter à la base de données MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB Atlas réussie !'))
  .catch(() => console.log('Connexion à MongoDB Atlas échouée !'));


// Créer un schéma pour la collection "people"
const personSchema = new mongoose.Schema({
    name: { 
              type: String, 
              required: true 
          },
    age: Number,
    favoriteFoods: [String]
  });


// Créer un modèle pour la collection "people"
const Person = mongoose.model("Person", personSchema);


// Créer et sauvegarder un document "Person"
const person = new Person({
  name: "Mame Ndiaye savon",
  age: 35,
  favoriteFoods: ['Thiep','Mafé']
});

person.save(function(err, data) {
  if (err) return console.error(err);
  console.log(`${data.name} a été enregistré dans la base de données.`);
});


// Créer plusieurs documents "Person"
const arrayOfPeople = [
    { name: "Aubrey GMC", age: 15, favoriteFoods: ["Tiep Dien", "Tiep yapp"] },
    { name: "Diarra GMC", age: 20, favoriteFoods: ["Cbon", "Mbaxal"] },
    { name: "Mama Ndiaye", age: 21, favoriteFoods: ["Mafé", "Soup"] }
  ];
  
  Person.create(arrayOfPeople, function(err, people) {
    if (err) return console.error(err);
    console.log(`${people.length} personnes ont été enregistrées dans la base de données.`);
  });

 
// Rechercher toutes les personnes ayant un nom donné
Person.find({ name: "Mama Ndiaye" }, function(err, people) {
    if (err) return console.error(err);
    console.log(people);
  });

  
// Rechercher une personne ayant un aliment préféré donné
  Person.findOne({ favoriteFoods: "Tiep Dien" }, function(err, person) {
    if (err) return console.error(err);
    console.log(person);
  });


    
// // Rechercher une personne par son ID
const personId = "63f917daa38e7a0ce876d4d6";

Person.findById(personId, function(err, person) {
  if (err) return console.error(err);
  console.log(person);
});


// Modifier une personne et sauvegarder les modifications
Person.findById(personId, function(err, person) {
  if (err) return console.error(err);
  person.favoriteFoods.push("hamburger");
  person.save(function(err, updatedPerson) {
    if (err) return console.error(err);
    console.log(updatedPerson);
  });
});



// Mettre à jour une personne et retourner le document mis à jour
const personName = "Diarra GMC";
Person.findOneAndUpdate({ name: personName }, { age: 15 }, { new: true }, function(err, person) {
  if (err) return console.error(err);
  console.log(person);
});



// Supprimer une personne par son ID
Person.findByIdAndRemove(personId, function(err, person) {
  if (err) return console.error(err);
  console.log(`${person.name} a été supprimé de la base de données.`);
});


// Supprimer toutes les personnes ayant un nom donné
Person.remove({ name: "Mary" }, function(err, result) {
  if (err) return console.error(err);
     console.log(data);
});



// Rechercher les personnes qui aiment le Tiep Dien, triées par nom, limiter les résultats à 2 documents et masquer leur âge
Person
  .find({ favoriteFoods: "Tiep Dien" })
  .sort('name')
  .limit(2)
  .select('-age')
  .exec((err, data) => {
    if (err) return console.error(err);
    console.log(data);
  });


