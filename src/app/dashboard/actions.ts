'use server'

import { db } from '@/db'
import { OrderStatus } from '@prisma/client'

export const changeOrderStatus = async ({
  id,
  orderStatus
}: {
  id: string
  orderStatus: OrderStatus
}) => {
  await db.order.update({
    where: { id },
    data: {
      status: orderStatus
    }
  })
}
