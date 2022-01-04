import axios from 'axios'

import { imageBase } from '~/config'

export const api = axios.create({
  baseURL: `${imageBase}/api`
})
