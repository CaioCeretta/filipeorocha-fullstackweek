
import Header from './_components/header'
// The use client makes a component PARTIALLY rendered on the server, while the server is fully

import { Button } from './_components/ui/button'

import React from 'react'
import { Input } from './_components/ui/input'
import { SearchIcon } from 'lucide-react'
import Image from 'next/image'
import { Card, CardContent } from './_components/ui/card'
import { Badge } from './_components/ui/badge'
import { Avatar, AvatarImage } from './_components/ui/avatar'
import { db } from './_lib/prisma'
import BarberShopItem from './_components/barbershop-item'

export default async function Home() {

  const barbershops = await db.barbershop.findMany({})

  console.log({barbershops})

  return (
    <div>
      {/* Header */}
      <Header />

      <div className="p-5">
        {/* Text */}
        <h2 className="text-xl">Hello, Caio</h2>
        <p>Monday, August 5th. 2024</p>
        {/* Search */}
        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Search"></Input>
          <Button>
            <SearchIcon />
          </Button>
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
        <h2 className='mb-3 mt-6 text-xs font-bold uppercase text-gray-400k'>Bookins</h2>
        <Card className="max-w-full min-w-full">
          <CardContent className="flex justify-between p-0">
            {/* Left */}
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge className="w-fit">Confirmed</Badge>
              <h3 className="font-bold">Haircut</h3>

              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
                </Avatar>
                <p className="text-sm">FSW Barber Shop</p>
              </div>
            </div>
            {/* Right */}
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm">August</p>
              <p className="text-2xl font-bold">05</p>
              <p className="text-sm">21:00</p>
            </div>
          </CardContent>
        </Card>

        <h2 className='mb-3 mt-6 text-xs font-bold uppercase text-gray-400'>Recommended</h2>
        <div className='flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden'>
          {barbershops.map(barbershop => (
            <BarberShopItem key={barbershop.id} barbershop={barbershop}/>
          ))}
        </div>
      </div>
    </div>
  )
}
