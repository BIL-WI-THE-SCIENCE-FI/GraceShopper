'use strict'

const {
  db,
  models: { User, Product, Cart }
} = require('../server/db')
const faker = require('faker')
const Order = require('../server/db/models/Order')
const OrderDetails = require('../server/db/models/OrderDetails')

//* EDIT THE FOLLOWING PARAMETERS TO CHANGE HOW THE DATABASE IS POPULATED
//*
//* How many products do you want to create
const totalProducts = 5
//* How many users do you want to create
const totalUsers = 5
//* Add admin user with (user: admin) (pass: admin)
const addAdmin = true
//* Add random orders?
const createOrders = true

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

  //! Remove
  const products = []
  //! Remove

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
    const productInstance = await Product.create(product)
    //! Remove
    await products.push(productInstance)
    //! Remove
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
    const userInstance = await User.create(user)

    //! Remove
    // //* If we need to give the user a cart
    // TODO: IGNORE ALL OF THIS UNTIL I COMPLETE ~ BRYNN
    if (createOrders) {
      const orderInstance = await Order.create()
      await userInstance.addOrder(orderInstance)
      //   for (let product of products) {
      //     //
      //     const orderDetails = await orderInstance.addProduct(product, {
      //       through: { quantity: 10, price: product.price * 10 }
      //     })
      //     await orderInstance.addProduct(product, {
      //       through: { quantity: 1, price: 1 }
      //     })
    }
    //   //! Remove

    //   //* Set the cart
    //   // await userInstance
    // }
    //* For friendly updates
    if (i % (totalUsers / 10) === 0) console.log(`Loaded ${(i / totalUsers) * 100}% users!`)
  }
  return
}

// //* Function used to populate the cart data
// function getCartItems() {
//   const cart = {}
//   //* Add a random number of products to the cart with a random quantity
//   for (let i = 1; i < getRandomNumber(false, totalProducts - 1); i++)
//     cart[i] = getRandomNumber(false, 100)
//   //* Return the cart Json
//   return JSON.stringify(cart)
// }

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
