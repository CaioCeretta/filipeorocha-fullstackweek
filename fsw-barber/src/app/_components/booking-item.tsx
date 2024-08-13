import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";
import { Prisma } from "@prisma/client";
import { format, isFuture } from "date-fns";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import PhoneItem from "./phone-item";

//TODO receive booking as a prop

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    }
  }>
}
const BookingItem = ({ booking }: BookingItemProps) => {

  const { service: { barbershop } } = booking

  const isConfirmed = isFuture(booking.date)

  return (
    <Sheet>
      <SheetTrigger className="w-full">
        <Card className="min-w-[90%]">
          <CardContent className="flex justify-between p-0">
            {/* Left */}
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge className="w-fit" variant={isConfirmed ? "default" : "secondary"}>{isConfirmed ? 'Confirmed' : 'Finished'}</Badge>
              <h3 className="font-bold">{booking.service.name}</h3>

              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={booking.service.barbershop.imageUrl} />
                </Avatar>
                <p className="text-sm">{booking.service.barbershop.name}</p>
              </div>
            </div>
            {/* Right */}
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm capitalize">{format(booking.date, "MMMM")}</p>
              <p className="text-2xl font-bold">{format(booking.date, "dd")}</p>
              <p className="text-sm">{format(booking.date, "HH:mm")}</p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="w-[90%]">
        <SheetHeader>
          <SheetTitle className="text-left ">Booking Informations</SheetTitle>
        </SheetHeader>

        <div className="relative h-[180px] flex w-full items-end mt-6">
          <Image alt="barbershop-map" src="/map.png" fill className="object-cover rounded-xl" />

          <Card className="z-50 w-full mx-5 mb-3 rounded-xl">
            <CardContent className="flex items-center gap-3 px-5 py-3 w-full">
              <Avatar>
                <AvatarImage src={barbershop.imageUrl}></AvatarImage>
              </Avatar>
              <div>
                <h3 className="font-bold">{barbershop.name}</h3>
                <p className="text-xs">{barbershop.address}</p>
              </div>

              
            </CardContent>

          </Card>
        </div>

        <div className="mt-6">
          <Badge
            className="w-fit"
            variant={isConfirmed ? "default" : "secondary"}
          >
            {isConfirmed ? "Confirmed" : "Finished"}
          </Badge>

        </div>

        <Card className="mt-3 mb-6">
             <CardContent className="p-3 space-y-3">
               <div className="flex justify-between items-center">
                 <h2 className="font-bold">{booking.service.name}</h2>
                 <p className="font-bold text-sm">{Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD'
                }).format(Number(booking.service.price))}</p>
              </div>


              <div className="flex justify-between items-center">
                <h2 className="font-bold text-gray-400 text-sm">Date</h2>
                <p className="font-bold text-gray-400 text-sm">
                  {format(booking.date, "MMMM dd")}
                </p>
              </div>

              <div className="flex justify-between items-center">
                <h2 className="font-bold text-gray-400 text-sm">Scheduled time</h2>
                <p className="font-bold text-gray-400 text-sm">
                  {format(booking.date, "HH:mm")}
                </p>
              </div>

              <div className="flex justify-between items-center">
                <h2 className="font-bold text-sm text-gray-400">Barbershop</h2>
                <p className="font-bold text-gray-400 text-sm">
                  {barbershop.name}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            
            {barbershop.phones.map((phone, index) => (
              <PhoneItem phone={phone} key={index} />
            ))}

          </div>

      </SheetContent>
    </Sheet>
  );
}

export default BookingItem;