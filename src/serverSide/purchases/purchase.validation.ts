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
    unityValue: Joi.number().allow(''),
    entryDate: Joi.date(),
    rules: Joi.array().items(Joi.number()),
    colors: Joi.array().items(
      Joi.object({
        id: Joi.number(),
        label: Joi.string(),
        colors: Joi.array().items(Joi.string().allow(''))
      })
    ),
    employeeObs: Joi.string().allow(''),
    clientObs: Joi.string().allow(''),
    name: Joi.string(),
    developmentPrice: Joi.number().allow(''),
    lock: Joi.bool(),
    duplicated: Joi.number().integer().allow('')
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
    categoryId: Joi.number().allow(''),
    typeId: Joi.number().allow(''),
    clientId: Joi.number(),
    qtd: Joi.number(),
    value: Joi.number(),
    deliveryDate: Joi.date(),
    label: Joi.string().allow(''),
    description: Joi.string().allow(''),
    points: Joi.number().allow(''),
    unityValue: Joi.number().allow(''),
    entryDate: Joi.date(),
    rules: Joi.array().items(Joi.number()),
    colors: Joi.array().items(
      Joi.object({
        id: Joi.number().allow(''),
        label: Joi.string().allow(''),
        colors: Joi.array().items(Joi.string().allow(''))
      })
    ),
    employeeObs: Joi.string().allow(''),
    clientObs: Joi.string().allow(''),
    name: Joi.string().allow(''),
    developmentPrice: Joi.number().allow(''),
    lock: Joi.bool(),
    duplicated: Joi.number().integer().allow('')
  }
})

export const findPurchasesSchema = celebrate({
  [Segments.QUERY]: {
    purchaseId: Joi.number().required()
  }
})

export const listPurchasesSchema = celebrate({
  [Segments.QUERY]: {
    search: Joi.string().allow(''),
    startDate: Joi.date(),
    endDate: Joi.date(),
    size: Joi.number(),
    phone: Joi.string().allow(''),
    page: Joi.number(),
    paid: Joi.number(),
    clientId: Joi.number(),
    done: Joi.number()
  }
})
