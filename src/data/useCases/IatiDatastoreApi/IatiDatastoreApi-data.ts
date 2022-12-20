import { IIatiDatastoreApiData } from '../../../domain/useCases/IATIDatastoreApi/IatiDatastoreApi-interface'
import { IIatiDatastoreApiRepository, IQueryParams, MonetaryAidResponse } from '../../../interfaces/transaction-interface'
// import { IQueryParams, MonetaryAidResponse } from '../../../interfaces/transaction-interface'
import { IatiDatastoreApiService } from '../../../services/IATIDatastoreApi-service'

export class IatiDatastoreApiData implements IIatiDatastoreApiData {
  iatiDatastoreApiService: IatiDatastoreApiService
  constructor (iatiDatastoreApiRepository: IIatiDatastoreApiRepository) {
    this.iatiDatastoreApiService = new IatiDatastoreApiService(iatiDatastoreApiRepository)
  }

  async getMonetaryAid (countryCode: string): Promise<MonetaryAidResponse> {
    const yearsAgo = 5
    const now = new Date().toISOString()
    const dateYearsAgo = new Date(new Date().setFullYear(new Date().getFullYear() - yearsAgo)).toISOString()

    const numOfRows: number = 100000
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const params: IQueryParams = {
      collection: 'transaction',
      q: `recipient_country_code:${countryCode}`,
      df: 'recipient_country_code',
      start: '0',
      rows: String(numOfRows),
      fq: `transaction_value_value_date:[${dateYearsAgo} TO ${now}]`,
      fl: 'transaction_value,transaction_value_currency,transaction_value_value_date,transaction_provider_org_narrative'
    }
    const dataResponse = await this.iatiDatastoreApiService.getData(params)

    return dataResponse
  }
}
