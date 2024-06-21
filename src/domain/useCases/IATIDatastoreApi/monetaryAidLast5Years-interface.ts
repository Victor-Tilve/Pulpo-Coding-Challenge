import { MonetaryAidResponse } from '../../../interfaces/IatiDatastoreApi-interface'

/* Defining the interface for the data layer. */
export interface IMonetaryAidLast5Years {
  getMonetaryAidLast5Years: (countryCode: string) => Promise<MonetaryAidResponse>
}
