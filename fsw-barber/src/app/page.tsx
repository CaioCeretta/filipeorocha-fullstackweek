
import Header from './_components/header'
// The use client makes a component PARTIALLY rendered on the server, while the server is fully

import { Button } from './_components/ui/button'

import { SearchIcon } from 'lucide-react'
import Image from 'next/image'
import BarberShopItem from './_components/barbershop-item'
import BookingItem from './_components/booking-item'
import { Input } from './_components/ui/input'
import { quickSearchOptions } from './_constants/search'
import { db } from './_lib/prisma'
import Search from './_components/search'


export default async function Home() {

  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: 'desc'
    }
  })


  return (
    <div>
      {/* Header */}
      <Header />

      <div className="p-5">
        {/* Text */}
        <h2 className="text-xl">Hello, Caio</h2>
        <p>Monday, August 5th. 2024</p>
        {/* Search */}
        <Search />
        {/* Quick Search */}
        <div className="mt-6 flex items-center gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map(option => (
            <Button className='gap-2' variant={'secondary'}>
              <Image src={option.imageUrl} width={16} height={16} alt={option.title} />
              {option.title}
            </Button>
          ))}


        </div>


        {/* Image */}
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            alt="Book with the best barbers in the region"
            src="/banner-01.png"
            fill
            className="rounded-xl bg-center object-cover"
          />
        </div>

        {/* Bookings */}
        <BookingItem />

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
