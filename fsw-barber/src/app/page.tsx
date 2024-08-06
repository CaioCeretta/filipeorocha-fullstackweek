'use client'

// The use client makes a component PARTIALLY rendered on the server, while the server is fully

import { Button } from './_components/ui/button'

import React from 'react'

const name = 'test'



export default function Home() {
  return <Button className="mb-5 mt-10 flex text-red-500">Test</Button>
}
