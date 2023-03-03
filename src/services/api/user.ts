import { getDefault } from '.'

export async function getUserForPurchase(userId: number) {
  const response = await getDefault(`/users/purchase/${userId}`)
  return response
}
