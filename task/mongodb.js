const { MongoClient, ObjectID} = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true}, (error, client) => {
  if (error) {
    return console.log('Unable to connect to database')
  }
  const db = client.db(databaseName);

  // db.collection('users').findOne({ _id: new ObjectID("5e4f9b492781df12bae0317f")}, (error, user) => {
  //   if (error) {
  //     return console.log('Unable to fetch user')
  //   }
  //   console.log(user)
  // })

  // db.collection('users').insertOne({
  //   name: 'Minace',
  //   city: 'Los Vegas',
  //   number: 0769692554
  // })
  db.collection('task').insertMany([
    {
      description: 'Exercise',
      complete: true
    },
    {
      description: 'Watch pro sports',
      complete: false
    }
  ], (error, result) => {
    if (error) {
      return console.log('UNable to insert task')
    }
    console.log(result)
  })
})