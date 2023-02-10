const AppError = require('../utils/AppError')
const sqliteConnection = require('../database/sqlite')

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

    return reponse.status(201).json()
  }
}

module.exports = UsersController
