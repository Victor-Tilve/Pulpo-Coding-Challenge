import { Router } from 'express'
import { validateToken } from '../../helpers/token-helper'
import { AdapterRoute } from '../adapters/express-adapter'
import { makeGetMonetaryAidController } from '../factories/monetaryAidLast5Years-factory'

/* A function that is being exported to set and endpoint. */
export default (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.get('/monetary-aid/:countryCode', validateToken, AdapterRoute(makeGetMonetaryAidController()))
}
