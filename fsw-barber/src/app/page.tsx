'use client'

import Header from './_components/header'
// The use client makes a component PARTIALLY rendered on the server, while the server is fully

import { Button } from './_components/ui/button'

import React from 'react'
import { Input } from './_components/ui/input'
import { SearchIcon } from 'lucide-react'
import Image from 'next/image'

export default function Home() {
  return (
    <div>
      {/* Header */}
      <Header />
      <div className="p-5">
        <h2 className="text-xl">Hello, Caio</h2>
        <p>Monday, August 5th. 2024</p>
        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Search"></Input>
          <Button>
            <SearchIcon />
          </Button>
        </div>
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            alt="Book with the best barbers in the region"
            src="/banner-01.png"
            fill
            className="rounded-xl bg-center object-cover"
          />
        </div>
        k
      </div>
    </div>
  )
}
