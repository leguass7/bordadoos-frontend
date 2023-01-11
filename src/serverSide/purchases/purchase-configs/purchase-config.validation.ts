import { celebrate, Joi } from 'celebrate'

export const filterPurchaseConfigSchema = celebrate({
  query: {
    purchaseId: Joi.number().integer().allow('')
  }
})
