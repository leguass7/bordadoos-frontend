import { celebrate, Joi } from 'celebrate'

import type { IConfigRetailPurchaseRules, IConfigWholesalePurchaseRules } from './config.dto'

const purchaseRuleSchema = {
  retail: Joi.object<IConfigRetailPurchaseRules>({
    maxQtd: Joi.number().integer(),
    priceBelowJokerPoints: Joi.number(),
    pricePerThousandPoints: Joi.number()
  }).optional(),
  wholesale: Joi.object<IConfigWholesalePurchaseRules>({
    pricePerThousandPoints: Joi.number()
  }).optional()
}

export const getConfigSchema = celebrate({
  params: {
    key: Joi.string().required()
  }
})

export const saveConfigSchema = celebrate(
  {
    query: {
      key: Joi.string().required()
    },
    body: purchaseRuleSchema
  },
  { abortEarly: false, stripUnknown: true }
)
