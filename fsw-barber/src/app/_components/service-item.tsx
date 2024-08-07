import { BarbershopService } from "@prisma/client";
import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface ServiceItemProps {
  service: BarbershopService
}

const ServiceItem = ({ service }: ServiceItemProps) => {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-3">
        {/* Left */}
        <div className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]">
          <Image src={service.imageUrl} className="object-cover rounded-lg" fill alt={service.name} />
        </div>
        {/* Right */}
        <div className="flex flex-col space-y-2">
          <h3 className="font-semibold text-sm">{service.name}</h3>
          <p className="font-semibold text-smk">{service.description}</p>
          {/* Price and button */}
          <div className="flex items-center justify-between">
            <p className="font-bold text-sm text-primary">{Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
            }).format(Number(service.price))}</p>
            <Button variant="secondary" size={'sm'}>Book</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ServiceItem;