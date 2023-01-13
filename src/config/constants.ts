import { IConfigPurchaseRules } from '~/serverSide/config/config.dto'

export const defaultPurchaseRules: IConfigPurchaseRules = {
  retail: {
    maxQtd: 24,
    priceBelowJokerPoints: 10,
    pricePerThousandPoints: 1
  },
  wholesale: {
    pricePerThousandPoints: 0.47
  }
}
