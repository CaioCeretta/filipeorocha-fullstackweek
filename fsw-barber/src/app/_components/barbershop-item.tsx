import { Barbershop } from "@prisma/client";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { Star, StarIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import Link from "next/link";


interface BarbershopItemProps {
  barbershop: Barbershop
}

const BarberShopItem = ({ barbershop }: BarbershopItemProps) => {


  return (
    <Card className="min-w-[167pxpx]">
      <CardContent className="p-0 px-1 pt-1">
        {/* Image*/}
        <div className="relative h-[159px] w-full ">
          <Image
            fill
            alt={'barbersshop-image'}
            className="object-cover"
            src={barbershop.imageUrl}
          />
          <Badge className="absolute top-2 left-2 space-x-1" variant={'secondary'}>
              <StarIcon size={12}  className="text-primary fill-primary"/>
              <p className="text-xs font-semibold">5.0</p>
          </Badge>
        </div>

        <div className="py-3 px-1">
          <h3 className="font-semibold truncate">{barbershop.name}</h3>
          <p className="text-sm text-gray-400 truncate">{barbershop.address}</p>
          <Button variant="secondary" className=" w-full mt-3">
            <Link href={`barbershops/${barbershop.id}`}>Book</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default BarberShopItem;