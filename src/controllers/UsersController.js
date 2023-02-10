const AppError = require('../utils/AppError')
const sqliteConnection = require('../database/sqlite')
const { hash } = require('bcryptjs')

class UsersController {
  async create(request, reponse) {
    const { name, email, password } = request.body

    const database = await sqliteConnection()

    const checkUserExist = await database.get(
      'SELECT * FROM users WHERE email = (?)',
      [email]
    )

    if (checkUserExist) {
      throw new AppError('Este e-mail já está em uso.')
    }

    const hashedPassword = await hash(password, 8)

    await database.run(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    )

    return reponse.status(201).json()
  }
}

module.exports = UsersController
