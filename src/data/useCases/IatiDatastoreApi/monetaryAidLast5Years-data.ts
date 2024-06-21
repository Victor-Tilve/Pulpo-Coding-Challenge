import { IMonetaryAidLast5Years } from '../../../domain/useCases/IATIDatastoreApi/monetaryAidLast5Years-interface'
import { IIatiDatastoreApiRepository, IQueryParams, MonetaryAidResponse } from '../../../interfaces/IatiDatastoreApi-interface'
// import { IQueryParams, MonetaryAidResponse } from '../../../interfaces/transaction-interface'
import { IatiDatastoreApiService } from '../../../services/IATIDatastoreApi-service'

/* It's a class that uses the IatiDatastoreApiService to get data from the IATI Datastore API */
export class MonetaryAidLast5Years implements IMonetaryAidLast5Years {
  iatiDatastoreApiService: IatiDatastoreApiService
  constructor (iatiDatastoreApiRepository: IIatiDatastoreApiRepository) {
    this.iatiDatastoreApiService = new IatiDatastoreApiService(iatiDatastoreApiRepository)
  }

  /**
 * It gets the last 5 years of monetary aid data for a given country
 * @param {string} countryCode - The country code of the country you want to get the data for.
 * @returns MonetaryAidResponse
 */
  async getMonetaryAidLast5Years (countryCode: string): Promise<MonetaryAidResponse> {
    const numOfRows: number = 100000
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const params: IQueryParams = {
      q: `recipient_country_code:${countryCode}`,
      start: '0',
      rows: String(numOfRows)
    }
    const dataResponse = await this.iatiDatastoreApiService.getData(params)

    return dataResponse
  }
}
