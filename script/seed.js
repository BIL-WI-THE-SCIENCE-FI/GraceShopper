'use strict'

const {
  db,
  models: { User, Product, Order }
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
//* Add random order history (PREFORMANCE HEAVY)
const addOrderHistory = true
//* All users share the same password
const samePassword = true
//* What should that password be
const userPassword = 'password'

async function seed() {
  //* Clear DB and matche models to tables
  await db.sync({ force: true })

  //* Products to use for fake data
  const products = []

  console.log(`\nPreparing to load ${totalProducts} products.`)
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
    const productInstance = await Product.create(product)
    //* If need fake order history
    if (addOrderHistory) await products.push(productInstance)
    //* For friendly updates
    if (i % (totalProducts / 10) === 0)
      console.log(`Loaded ${(i / totalProducts) * 100}% products!`)
  }

  const userNames = {}
  const emails = {}

  console.log(`\nPreparing to load ${totalUsers} users. Order History: ${addOrderHistory}`)
  //* Create all of our users
  for (let i = 0; i < totalUsers; i++) {
    //* User contents
    const user = {
      username: faker.internet.userName(),
      password: samePassword ? userPassword : faker.internet.password(),
      firstName: faker.name.firstName(),
      userType: 'standard',
      lastName: faker.name.lastName(),
      phone: faker.phone.phoneNumber(),
      email: faker.internet.email()
    }

    //* username must be unique
    while (userNames[user.username]) {
      user.username = faker.internet.userName()
    }

    //* email must be unique
    while (emails[user.email]) {
      user.username = faker.internet.email()
    }

    userNames[user.username] = true
    emails[user.email] = true

    //* Create the user
    const userInstance = await User.create(user)

    //* If we should add random order history
    if (addOrderHistory) {
      const orderInstance = await Order.create()
      await userInstance.addOrder(orderInstance)

      //* Add random order details
      for (let i = 0; i < getRandomNumber(false, totalProducts - 1); i++) {
        const product = await products[i]
        const quantity = getRandomNumber(false, 100) + 1
        const price = (await product.price) * quantity
        //* add the product to the order details
        await orderInstance.addProduct(product, { through: { quantity: quantity, price: price } })
      }
    }

    //* For friendly updates
    if (i % (totalUsers / 10) === 0) console.log(`Loaded ${(i / totalUsers) * 100}% users!`)
  }

  //* Add the admin user
  if (addAdmin) {
    //* User contents
    const user = {
      username: 'admin',
      password: 'admin',
      userType: 'admin'
    }
    //* Create the admin user
    const userInstance = await User.create(user)
    //* If we should add random order history
    if (addOrderHistory) {
      const orderInstance = await Order.create()
      await userInstance.addOrder(orderInstance)

      //* Add random order details
      for (let i = 0; i < getRandomNumber(false, totalProducts - 1); i++) {
        const product = await products[i]
        const quantity = getRandomNumber(false, 100) + 1
        const price = (await product.price) * quantity
        //* add the product to the order details
        await orderInstance.addProduct(product, { through: { quantity: quantity, price: price } })
      }
    }
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
