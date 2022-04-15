import { Segments, celebrate, Joi } from 'celebrate'

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
    deliveryDate: Joi.date()
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
    done: Joi.number()
  }
})
