const Sequelize = require('sequelize')
const db = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Order = require('./Order')

const SALT_ROUNDS = 5
//* process.env.JWT
const TOKEN = 'st1nkyp3t3'

const User = db.define(
  'user',
  {
    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING
    },
    //* Type of user browsing "standard", "admin"
    userType: {
      type: Sequelize.STRING,
      defaultValue: 'standard'
    },
    //* first Name
    firstName: {
      type: Sequelize.STRING
    },
    //* last Name
    lastName: {
      type: Sequelize.STRING
    },
    //* Phone number
    phone: {
      type: Sequelize.STRING
    },
    //* Profile Image
    imageUrl: {
      type: Sequelize.STRING,
      defaultValue: 'http://placeimg.com/640/480/a',
      allowNull: false
    },
    //* Email must be email
    email: {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        isEmail: true
      },
      unique: true
    }
  },
  {
    defaultScope: {
      include: [{ model: Order }]
    }
  }
)

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password)
}

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, TOKEN)
}

/**
 * classMethods
 */
User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({ where: { username } })
  if (!user || !(await user.correctPassword(password))) {
    const error = Error('Incorrect username/password')
    error.status = 401
    throw error
  }
  return user.generateToken()
}

User.findByToken = async function (token) {
  try {
    const { id } = await jwt.verify(token, TOKEN)

    const user = await User.findByPk(id)
    if (!user) {
      throw 'nooo'
    }
    return user
  } catch (ex) {
    const error = Error('bad token')
    error.status = 401
    throw error
  }
}

/**
 * hooks
 */
const hashPassword = async user => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS)
  }
}

User.beforeCreate(hashPassword)
User.beforeUpdate(hashPassword)
User.beforeBulkCreate(users => Promise.all(users.map(hashPassword)))
