'use strict'

const {
  db,
  models: { User, Product }
} = require('../server/db')
const faker = require('faker')

//* EDIT THE FOLLOWING PARAMETERS TO CHANGE HOW THE DATABASE IS POPULATED
//*
//* How many products do you want to create
const totalProducts = 50
//* How many users do you want to create
const totalUsers = 10
//* Add admin user with (user: admin) (pass: admin)
const addAdmin = true

async function seed() {
  //* Clear DB and matche models to tables
  await db.sync({ force: true })

  //* Add the admin user
  if (addAdmin) {
    //* User contents
    const user = {
      username: 'admin',
      password: 'admin',
      userType: 'admin'
    }
    //* Create the user
    await User.create(user)
  }

  console.log('\nPreparing to load products.')
  //* Create all of our products
  for (let i = 0; i < totalProducts; i++) {
    //* Product contents
    const product = {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price() * 100,
      rating: getRandomNumber(true, 5),
      stock: getRandomNumber(false, 100),
      imageUrl: faker.image.image()
    }
    //* Create the product
    await Product.create(product)
    //* For friendly updates
    if (i % (totalProducts / 10) === 0)
      console.log(`Loaded ${(i / totalProducts) * 100}% products!`)
  }

  console.log('\nPreparing to load users.')
  //* Create all of our users
  for (let i = 0; i < totalUsers; i++) {
    //* User contents
    const user = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
      firstName: faker.name.firstName(),
      userType: 'saved',
      lastName: faker.name.lastName(),
      phone: faker.phone.phoneNumber(),
      email: faker.internet.email()
    }
    //* Create the user
    await User.create(user)
    //* For friendly updates
    if (i % (totalUsers / 10) === 0) console.log(`Loaded ${(i / totalUsers) * 100}% users!`)
  }
  return
}

//* Used to get a random number for the stock/count & rating
function getRandomNumber(decimal, max) {
  let random = Math.floor(Math.random() * max)
  if (decimal && Math.random() < 0.5) random += 0.5
  return random
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
