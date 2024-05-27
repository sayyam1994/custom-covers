import { db } from '@/db'
import { stripe } from '@/lib/stripe'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { Resend } from 'resend'
import OrderReceivedEmail from '@/components/emails/orderReceivedEmail'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const signature = headers().get('Stripe-Signature')

    if (!signature) {
      return new Response('Invalid signature', { status: 400 })
    }

    const event = await stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )

    if (event.type === 'checkout.session.completed') {
      if (!event.data.object.customer_details?.email) {
        throw new Error('Customer email not found')
      }

      const session = event.data.object as Stripe.Checkout.Session

      const { userId, orderId } = session.metadata || {
        userId: null,
        orderId: null
      }

      if (!userId || !orderId) {
        throw new Error('Invalid request metadata')
      }

      const billingAddress = session.customer_details?.address
      const shippingAddress = session.shipping_details?.address

      const updatedOrder = await db.order.update({
        where: { id: orderId },
        data: {
          isPaid: true,
          shippingAddress: {
            create: {
              name: session.customer_details?.name!,
              city: shippingAddress?.city!,
              country: shippingAddress?.country!,
              street: shippingAddress?.line1!,
              postalCode: shippingAddress?.postal_code!,
              state: shippingAddress?.state!
            }
          }
        }
      })

      await db.order.update({
        where: { id: orderId },
        data: {
          isPaid: true,
          billingAddress: {
            create: {
              name: session.customer_details?.name!,
              city: billingAddress?.city!,
              country: billingAddress?.country!,
              street: billingAddress?.line1!,
              postalCode: billingAddress?.postal_code!,
              state: billingAddress?.state!
            }
          }
        }
      })

      await resend.emails.send({
        from: 'CustomCovers <hello@mehrasayyam@gmail.com>',
        to: [event.data.object.customer_details.email],
        subject: 'Thank you for your order!',
        react: OrderReceivedEmail({
          orderId,
          orderDate: updatedOrder.createdAt.toLocaleDateString(),
          // @ts-ignore
          shippingAddress: {
            name: session.customer_details?.name!,
            city: billingAddress?.city!,
            country: billingAddress?.country!,
            street: billingAddress?.line1!,
            postalCode: billingAddress?.postal_code!,
            state: billingAddress?.state!
          }
        })
      })

      return NextResponse.json({ result: event, ok: true })
    }
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Something went wrong', ok: false },
      {
        status: 500
      }
    )
  }
}
