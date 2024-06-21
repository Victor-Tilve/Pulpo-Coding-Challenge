import { IMonetaryAidLast5Years } from '../../domain/useCases/IATIDatastoreApi/monetaryAidLast5Years-interface'
import { MissingFormalParameter, WrongCountryCode } from '../../errors/client-error'
import { badRequest, serverError, success } from '../../helpers/http-helper'
import { IsoAlpha2 } from '../../helpers/ISO3166Alpha2-helper'
import { Controller } from '../../interfaces/controller-interface'
import { HttpRequest, HttpResponse } from '../../interfaces/http-interface'

/* It takes a country code as a parameter, checks if it's a valid country code, and if it is, it calls
the dataIATIDatastoreApi to get the monetary aid data for that country */
export class MonetaryAidLast5YearsController implements Controller {
  constructor (private readonly dataIATIDatastoreApi: IMonetaryAidLast5Years) {
    this.dataIATIDatastoreApi = dataIATIDatastoreApi
  }

  /**
   * It takes a country code as a parameter, checks if it's a valid country code, and if it is, it
   * calls the dataIATIDatastoreApi to get the monetary aid data for that country
   * @param {HttpRequest} httpRequest - HttpRequest
   * @returns A promise of an HttpResponse
   */
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredProperties = ['countryCode']
    for (const prop of requiredProperties) {
      if (httpRequest.params[prop] === undefined) {
        return badRequest(new MissingFormalParameter(prop))
      }
    }
    const { countryCode } = httpRequest.params

    if (IsoAlpha2[countryCode] !== undefined) {
      try {
        const monetaryAidResponse = await this.dataIATIDatastoreApi.getMonetaryAidLast5Years(countryCode)
        return success(monetaryAidResponse)
      } catch (error) {
        return serverError(error)
      }
    } else {
      return badRequest(new WrongCountryCode(countryCode))
    }
  }
}
