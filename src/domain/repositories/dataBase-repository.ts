import { pool } from '../../infra/db/postgreslq/postgresql-connect'
import { IDatabaseRepository } from '../../interfaces/database-interface'
import { HttpResponse } from '../../interfaces/http-interface'
import { IBaseUserInput, IUser } from '../../interfaces/user-interface'

/* It takes a user object, and inserts it into the database */
export class DatabaseRepository implements IDatabaseRepository {
/**
 * It takes a user object, and inserts it into the database
 * @param {IBaseUserInput} newUser - IBaseUserInput
 * @returns an object with a statusCode and a body.
 */
  async createUser (newUser: IBaseUserInput): Promise<HttpResponse> {
    const { userName, hashPassword, email } = newUser
    try {
      await pool.query('INSERT INTO users(userName, password, email) VALUES ($1,$2,$3);', [userName, hashPassword, email])
    } catch (error) {
      console.log('DatabaseRepository::createUser::queryResponse::Error: ' + JSON.stringify(Error))
      return {
        statusCode: 404,
        body: 'There was an error' // FIXME: what tipe of error base on the error
      }
    }
    return {
      statusCode: 201,
      body: `User ${newUser.userName} was created`
    }
  }

  /**
 * It takes an email address as a string, and returns a user object if the email address exists in the
 * database, or undefined if it doesn't
 * @param {string} email - string - The email of the user you want to get
 * @returns The user object
 */
  async getUserByEmail (email: string): Promise<IUser | undefined> {
    let response: any
    try {
      // eslint-disable-next-line no-multi-str, @typescript-eslint/no-unused-vars
      response = await pool.query('\
      SELECT * FROM users\
      WHERE email=$1;\
      ', [email])
    } catch (error) {
      console.log('DatabaseRepository::createUser::queryResponse::Error: ' + JSON.stringify(Error))
      return undefined
    }
    return response.rows[0]
  }
}
