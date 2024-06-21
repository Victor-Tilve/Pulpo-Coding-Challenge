import { MonetaryAidLast5YearsController } from '../../controllers/IatiDatastoreApi/monetaryAidLast5Years-controller'
import { MonetaryAidLast5Years } from '../../data/useCases/IatiDatastoreApi/monetaryAidLast5Years-data'
import { IatiDatastoreApiRepository } from '../../domain/repositories/IatiDatastoreApi-repository'

/**
 * It creates a new instance of the MonetaryAidLast5YearsController class, which is a
 * controller class that is responsible for handling the request and response of the
 * getMonetaryAidLast5Years endpoint
 * @returns A function that returns an instance of MonetaryAidLast5YearsController
 */
export const makeGetMonetaryAidController = (): MonetaryAidLast5YearsController => {
  const iatiDatastoreApiRepository = new IatiDatastoreApiRepository()
  const iatiDatastoreApiData = new MonetaryAidLast5Years(iatiDatastoreApiRepository)
  const iATIDatastoreGetMonetaryAid = new MonetaryAidLast5YearsController(iatiDatastoreApiData)

  return iATIDatastoreGetMonetaryAid
}
