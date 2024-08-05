"use client"

//The use client makes a component PARTIALLY rendered on the server, while the server is fully

import { Button } from "./_components/ui/button";

import React from 'react'


export default function Home() {
  return (
    <Button className="text-red-500 flex m-5">Test</Button>
  );
}
