
import Header from './_components/header'
// The use client makes a component PARTIALLY rendered on the server, while the server is fully

import { Button } from './_components/ui/button'

import { EyeIcon, FootprintsIcon, SearchIcon } from 'lucide-react'
import Image from 'next/image'
import BarberShopItem from './_components/barbershop-item'
import { Avatar, AvatarImage } from './_components/ui/avatar'
import { Badge } from './_components/ui/badge'
import { Card, CardContent } from './_components/ui/card'
import { Input } from './_components/ui/input'
import { db } from './_lib/prisma'

export default async function Home() {

  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: 'desc'
    }
  })

  console.log({ barbershops })

  return (
    <div>
      {/* Header */}
      <Header />

      <div className="p-5">
        {/* Text */}
        <h2 className="text-xl">Hello, Caio</h2>
        <p>Monday, August 5th. 2024</p>
        {/* Search */}
        <div className="mt-6 flex items-center gap-2 ">
          <Input placeholder="Search"></Input>
          <Button>
            <SearchIcon />
          </Button>
        </div>

        {/* Quick Search */}
        <div className="mt-6 flex items-center gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          <Button className='gap-2' variant={'secondary'}>
            <Image src="/cabelo.svg" width={16} height={16} alt='Hair' />
            Hair
            </Button>

          <Button className='gap-2' variant={'secondary'}>
            <Image src="/barba.svg" width={16} height={16} alt='Beard' />
            Beard
          </Button>

          <Button className='gap-2' variant={'secondary'}>
            <Image src="/acabamento.svg" width={16} height={16} alt='Finish' />
            Finishing
          </Button>

          <Button className='gap-2' variant={'secondary'}>
            <FootprintsIcon className="w-4 h-4"  />
            Outline
          </Button>

          <Button className='gap-2' variant={'secondary'}>
            <EyeIcon className="w-4 h-4"/>
            Eyebrows
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

      {/* Footer */}
      <footer>
        <Card>
          <CardContent className='px-5 py-6'>
            <p className="text-sm font-bold text-gray-400"> &copy; 2024 Copyright <span className="font-bold">FSW Barber</span></p>
          </CardContent>
        </Card>
      </footer>

    </div>

  )
}
