import { Purchase } from '@prisma/client'
import { Segments, celebrate, Joi } from 'celebrate'

export const listPurchasesSchema = celebrate({
  [Segments.QUERY]: {
    search: Joi.string()
  }
})

export const createPurchasesSchema = celebrate<Purchase, Purchase, Purchase, Purchase>({
  [Segments.BODY]: {
    actived: Joi.boolean(),
    done: Joi.boolean(),
    paid: Joi.boolean(),
    categoryId: Joi.number().required(),
    typeId: Joi.number().required(),
    clientId: Joi.number().required(),
    qtd: Joi.number(),
    value: Joi.number(),
    deliveryDate: Joi.date().required()
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
    deliveryDate: Joi.date()
  }
})

export const deletePurchasesSchema = celebrate({
  [Segments.QUERY]: {
    purchaseId: Joi.number().required()
  }
})
