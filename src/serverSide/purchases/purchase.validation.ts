import { PriceRuleModality, PriceRuleType } from '@prisma/client'
import { Segments, celebrate, Joi } from 'celebrate'
// categoryId43
// clientId32
// deliveryDate"2022-11-30T20:34:30.000Z"
// description"Descrição de teste"
export const createPurchasesSchema = celebrate({
  [Segments.BODY]: {
    actived: Joi.boolean(),
    done: Joi.boolean(),
    paid: Joi.boolean(),
    categoryId: Joi.number().allow(''),
    typeId: Joi.number().allow(''),
    clientId: Joi.number().required(),
    qtd: Joi.number().required(),
    value: Joi.number().allow(''),
    deliveryDate: Joi.date(),
    label: Joi.string().allow(''),
    description: Joi.string().allow(''),
    points: Joi.number().allow(''),
    entryDate: Joi.date(),
    rules: Joi.array().items(Joi.number())
  }
})

export const updatePurchasesSchema = celebrate({
  [Segments.QUERY]: {
    purchaseId: Joi.number().required()
  },
  [Segments.BODY]: {
    actived: Joi.boolean(),
    done: Joi.boolean(),
    paid: Joi.boolean(),
    categoryId: Joi.number(),
    typeId: Joi.number(),
    clientId: Joi.number(),
    qtd: Joi.number(),
    value: Joi.number(),
    deliveryDate: Joi.date(),
    label: Joi.string().allow(''),
    description: Joi.string().allow(''),
    points: Joi.number().allow(''),
    entryDate: Joi.date()
  }
})

export const findPurchasesSchema = celebrate({
  [Segments.QUERY]: {
    purchaseId: Joi.number().required()
  }
})

export const listPurchasesSchema = celebrate({
  [Segments.QUERY]: {
    search: Joi.string(),
    startDate: Joi.date(),
    endDate: Joi.date(),
    size: Joi.number(),
    page: Joi.number(),
    paid: Joi.number(),
    clientId: Joi.number(),
    done: Joi.number()
  }
})
