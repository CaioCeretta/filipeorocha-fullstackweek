import ServiceItem from "@/app/_components/service-item";
import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


const BarbershopPage = async ({ params }: { params: { id: 'string' } }) => {

  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id
    },
    include: {
      services: true
    }
  })
  
  /* One other options to not use that barbershop ? ( ...
  
  would be to check if it is inexistent before and just return a notFound from next, it would also work
  */

  return (
    <div>
      {barbershop ? (
        <div>
          {/*Image*/}
          <div className="relative w-full h-[250px]">
            <Image src={barbershop.imageUrl} alt={barbershop.name} fill className="object-cover" />

            <Button size={'icon'} variant={'secondary'} className="absolute top-4 left-4" asChild>
              <Link href={'/'}>
                <ChevronLeftIcon />
              </Link>
            </Button>

            <Button size={'icon'} variant={'secondary'} className="absolute top-4 right-4">
              <MenuIcon />
            </Button>

          </div>

          <div className="p-5 border-b border-solid">
            <h1 className="font-bold text-xl mb-3">{barbershop.name}</h1>
            <div className="mb-2 flex items-center gap-2">
              <MapPinIcon className="text-primary" size={18} />
              <p>{barbershop.address}</p>
            </div>
            <div className="flex items-center gap-2">
              <StarIcon className="fill-primary text-primary" size={18} />
              <p>5,0</p>
            </div>
          </div>

          {/* Description */}
          <div className="p-5 border-b border-solid space-y-3">
            <h2 className="font-bold uppercase text-gray-400 text-xs">About Us</h2>
            <p className="justify">{barbershop.description}</p>

          </div>

          {/*Description*/}
          <div className="p-5">
            <h2 className="text-xs font-bold uppercase text-gray-400">About us</h2>
            <p>{barbershop.description}</p>
          </div>
          <div className="p-5 space-y-3">
            <h2 className="text-xs font-bold uppercase text-gray-400">Services</h2>
            <div className="space-y-3">
              {barbershop.services.map(service => (
                <ServiceItem key={service.id} service={service} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default BarbershopPage;