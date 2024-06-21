import * as dotenv from 'dotenv'
import request from 'supertest'
import app from '../../../main/config/app'
import { createUser } from '../../mock-data/createUser'
dotenv.config({ path: 'tools/.env.test' })

const endpointUrlSingUp = '/api/createUser'
describe('getMonetaryAidLast5Years-controller', () => {
  it('should create User', async () => {
    const response = await request(app)
      .post(endpointUrlSingUp)
      .send(createUser)
    expect(response.body.statusCode).toBe(201)
  })
})
