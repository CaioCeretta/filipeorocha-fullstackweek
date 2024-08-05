"use client"

import { Button } from "./_components/ui/button";

//The use client makes a component PARTIALLY rendered on the server, while the server is fully

export default function Home() {
  return (
    <Button>Test</Button>
  );
}
