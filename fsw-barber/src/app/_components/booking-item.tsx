'use client'

import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import { Prisma } from "@prisma/client";
import { DialogClose, Title } from "@radix-ui/react-dialog";
import { format, isFuture } from "date-fns";
import Image from "next/image";
import PhoneItem from "./phone-item";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from "./ui/dialog";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { deleteBooking } from "../_actions/delete-booking";
import { toast } from "sonner";
import { useState } from "react";

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

  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false)

  const handleSheetOpenChange = (isOpen: boolean) => {
    setIsSheetOpen(true)
  }


  const { service: { barbershop } } = booking

  const isConfirmed = isFuture(booking.date)

  const handleCancelBookingClick = async () => {
    try {
      await deleteBooking(booking.id)
      setIsSheetOpen(false)
      toast.success('Booking successfully canceled')
    } catch(error) {
      console.log(error)
      toast.error('Error cancelling booking, try again!')
    }
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger className="w-full min-w-full">
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


        <SheetFooter className="mt-6 flex items-center">
          <SheetClose asChild>
            <Button variant="outline" className="flex-1">
              Return
            </Button>
          </SheetClose>
          {isConfirmed && (
            <Dialog>
              <DialogTrigger className="w-full" asChild>
                <Button variant="destructive" className="flex-1">
                  Cancel Reservation
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[100%]">
                <DialogHeader>
                  <Title>Are you sure you want to cancel this reservation?</Title>
                  <DialogDescription>
                    This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter className="w-[full] flex flex-row">
                  <DialogClose asChild>
                    <Button variant='secondary'>
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button variant={"destructive"} onClick={handleCancelBookingClick}>
                    Continue
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default BookingItem;