const config = require('config.json');
const jwt = require('jsonwebtoken');
const path = require('path');
const {
  parsed: { USER, PASSWORD, ROLE },
} = require('dotenv').config({ path: path.resolve('.env') });

// users hardcoded for simplicity, store in a db for production applications
const users = [
  {
    username: USER,
    password: PASSWORD,
    firstName: 'Test',
    lastName: 'User',
    role: ROLE,
  },
];

const authenticate = async ({ username, password }) => {
  const user = await users.find(user => user.username === username && user.password === password);
  if (user) {
    const token = jwt.sign({ sub: user.id }, config.secret);
    const { password, ...userWithoutPassword } = user;
    return {
      ...userWithoutPassword,
      token,
    };
  }
};

const getAll = async () => {
  return await users.map(user => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });
};

module.exports = {
  authenticate,
  getAll,
};
