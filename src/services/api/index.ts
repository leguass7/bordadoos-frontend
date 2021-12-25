import axios from 'axios'

import { host } from '~/config'

export const api = axios.create({
  baseURL: `${host}/api`
})
