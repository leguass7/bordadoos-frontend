import { PriceRuleModality, PriceRuleType } from '@prisma/client'
import { celebrate, Joi } from 'celebrate'

export const filterPriceRuleSchema = celebrate({
  query: {
    label: Joi.string().allow(''),
    id: Joi.number().allow('')
  }
})

export const bulkCreatePriceRuleSchema = celebrate({
  body: Joi.array().items({
    label: Joi.string().required(),
    modality: Joi.valid(...Object.values(PriceRuleModality)),
    type: Joi.valid(...Object.values(PriceRuleType)),
    value: Joi.number(),
    id: Joi.number().allow('')
  })
})
