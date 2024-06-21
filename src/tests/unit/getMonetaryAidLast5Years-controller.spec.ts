import httpMocks from 'node-mocks-http'
import { requestCountryCode } from '../mock-data/countryCode'
import { MonetaryAidLast5Years } from '../../data/useCases/IatiDatastoreApi/monetaryAidLast5Years-data'
import { last5YearTransactionFormattedResponseCO } from '../mock-data/last5YearsTransaction.FormattedResponse'
import { makeGetMonetaryAidController } from '../../main/factories/monetaryAidLast5Years-factory'
import { serverError, success } from '../../helpers/http-helper'
jest.mock('../../data/useCases/IatiDatastoreApi/IatiDatastoreApi-data')
const mockIatiDatastoreApiData = jest.mocked(MonetaryAidLast5Years)

let httpRequest = httpMocks.createRequest()

beforeEach(() => {
  httpRequest = httpMocks.createRequest()
  mockIatiDatastoreApiData.mockClear()
})

describe('IatiDatastoreGetMonetaryAidLast5YearsController class', () => {
  test('Should handle the Last 5 years transaction request', async () => {
    httpRequest.params = requestCountryCode
    const iATIDatastoreGetMonetaryAid = makeGetMonetaryAidController()

    const mockIatiDatastoreApiDataInstance = mockIatiDatastoreApiData.mock.instances[0]
    const mockGetMonetaryAidLast5Years = mockIatiDatastoreApiDataInstance.getMonetaryAidLast5Years as jest.Mock
    mockGetMonetaryAidLast5Years.mockReturnValueOnce(Promise.resolve(last5YearTransactionFormattedResponseCO))

    const HttpResponse = await iATIDatastoreGetMonetaryAid.handle(httpRequest)
    expect(HttpResponse).toEqual(success(last5YearTransactionFormattedResponseCO))
  })
  test('Should not handle the Last 5 years transaction request', async () => {
    httpRequest.params = requestCountryCode
    const iATIDatastoreGetMonetaryAid = makeGetMonetaryAidController()

    const mockIatiDatastoreApiDataInstance = mockIatiDatastoreApiData.mock.instances[0]
    const mockGetMonetaryAidLast5Years = mockIatiDatastoreApiDataInstance.getMonetaryAidLast5Years as jest.Mock
    mockGetMonetaryAidLast5Years.mockReturnValueOnce(Promise.reject(new Error('There was an error trying to create this user')))

    const HttpResponse = await iATIDatastoreGetMonetaryAid.handle(httpRequest)
    expect(HttpResponse).toEqual(serverError(new Error('There was an error trying to create this user')))
  })
})
