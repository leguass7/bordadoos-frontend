import nc from 'next-connect'

import { authProtect } from '~/serverSide/auth/auth-protect.middleware'
import { ncConfig } from '~/serverSide/ErrorApi'
import { factoryPriceRuleController } from '~/serverSide/priceRules/priceRule.controller'
import { priceRuleService } from '~/serverSide/priceRules/priceRule.service'
import { filterPriceRuleSchema } from '~/serverSide/priceRules/priceRule.validation'

const controller = factoryPriceRuleController(priceRuleService)

const handler = nc(ncConfig).use(authProtect).delete(filterPriceRuleSchema, controller.deletePriceRule)

export default handler
