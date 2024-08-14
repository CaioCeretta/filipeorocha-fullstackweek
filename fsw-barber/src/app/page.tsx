
import Header from './_components/header'
// The use client makes a component PARTIALLY rendered on the server, while the server is fully

import { Button } from './_components/ui/button'

import Image from 'next/image'
import Link from 'next/link'
import BarberShopItem from './_components/barbershop-item'
import BookingItem from './_components/booking-item'
import Search from './_components/search'
import { quickSearchOptions } from './_constants/search'
import { db } from './_lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from './_lib/auth'
import { format } from 'date-fns'


export default async function Home() {

  const session = await getServerSession(authOptions)

  const barbershops = await db.barbershop.findMany({
    include: {
      services: true
    }
  })
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: 'desc'
    },
    include: {
      services: true
    }
  })

  // const serializedBarbershops = barbershops.map(barbershop => ({
  //   ...barbershop,
  //   services: barbershop.services.map((service) => ({
  //     ...service,
  //     price: service.price.toString()
  //   }))
  // }))

  // const serializedPopularBarbershops = popularBarbershops.map(barbershop => ({
  //   ...barbershop,
  //   services: barbershop.services.map((service) => ({
  //     ...service,
  //     price: service.price.toString()
  //   }))
  // }))

  const bookings = session?.user ? await db.booking.findMany({
    where: {
      userId: session.user.id
    },
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    }
  }) : []


  return (
    <div>
      {/* Header */}
      <Header />

      <div className="p-5">
        {/* Text */}
        <h2 className="text-xl my-2"> {session?.user ? `Hello ${session?.user.name}` : 'Welcome'}</h2>
        <p className='text-xl my-2'>{format(new Date(), 'eeee, MMMM d, yyyy')}</p>
        {/* Search */}
        <Search />

        {/* Quick Search */}
        <div className="mt-6 flex items-center gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button
              key={option.title}
              className='gap-2'
              variant={'secondary'}
              asChild
            >
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  src={option.imageUrl}
                  width={16}
                  height={16}
                  alt={option.title}
                />
                {option.title}
              </Link>
            </Button>
          ))}
        </div>


        {/* Image */}
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            alt="Book with the best barbers in the region"
            src="/banner-01.png"
            fill
            className="rounded-xl w-100 object-cover"
          />
        </div>


        {/* Bookings */}
        <h2 className='mb-3 mt-6 text-xs font-bold uppercase text-gray-400'>Bookings</h2>
        <div className='flex overflow-x-auto gap-3 [&::-webkit-scrollbar]:hidden'>
          {bookings.map(booking => (
             /* By doing JSON.parse(JSON.stringify(booking)), we are transforming the object booking into a string and passing
             the parsed json to the comoonent, this will resolve the error of only plain objects can be passed to
             client components */
            <BookingItem key={booking.id} booking={JSON.parse(JSON.stringify(booking))} />
          ))}
        </div>



        {/* Barbershops */}
        <h2 className='mb-3 mt-6 text-xs font-bold uppercase text-gray-400'>Recommended</h2>
        <div className='flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden'>
          {barbershops.map(barbershop => (
            <BarberShopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        <h2 className='mb-3 mt-6 text-xs font-bold uppercase text-gray-400'>Popular Barbershops</h2>
        <div className='flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden'>
          {popularBarbershops.map(barbershop => (
            <BarberShopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>


      </div>



    </div>

  )
}
