'use client'

import { Barbershop, BarbershopService } from "@prisma/client";
import Image from "next/image";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Card, CardContent } from "./ui/card";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

import { format, set, setHours, setMinutes } from "date-fns";
import { enUS } from 'date-fns/locale';
import { useState } from "react";
import { createBooking } from "../_actions/create-booking";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface ServiceItemProps {
  service: BarbershopService,
  barbershop: Pick<Barbershop, "name">
}

const TIME_LIST = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
]

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {

  const { data: session } = useSession()

  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDay(date)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleCreateBooking = async () => {
    // 1. Do not show booked hours
    // 2.Save the booking to the logged user
    // 3. Don't let user book if he's not logged in

    try {
    if (!selectedDay || !selectedTime) return

    const hour = Number(selectedTime?.split(":")[0])
    const minutes = Number(selectedTime?.split(":")[1])
      const newDate = set(selectedDay,
        {
          minutes: minutes,
          hours: hour
        }
      )

      console.log(minutes, hour, newDate)

      await createBooking(
        {
          serviceId: service.id,
          userId: (session?.user as any).id,
          date: newDate
        }
      )
      toast.success('Reservation successfully created')  
    } catch(error) {
      console.log(error)
      toast.error('Error while creating reservation')
    }
    }

    return (
      <>
        <Card>
          <CardContent className="flex items-center justify-between gap-3 p-3">
            {/* Left | Image */}
            <div className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]">
              <Image src={service.imageUrl} className="object-cover rounded-lg" fill alt={service.name} />
            </div>
            {/* Right */}
            <div className="space-y-2 ">
              <h3 className="font-semibold text-sm">{service.name}</h3>
              <p className="font-semibold text-sm max-w-[250px]">{service.description}</p>
              {/* Price and button */}
              <div className="flex items-center justify-between">
                <p className="font-bold text-sm text-primary">{Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD'
                }).format(Number(service.price))}</p>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="secondary" size={'sm'}>Book</Button>
                  </SheetTrigger>
                  <SheetContent className="px-0">
                    <SheetHeader>
                      <SheetTitle>Make Reservation</SheetTitle>
                    </SheetHeader>

                    <div className="border-b border-solid py-5 w-full">
                      <Calendar
                        mode="single"
                        locale={enUS}
                        selected={selectedDay}
                        onSelect={handleDateSelect}
                        className={'rounded-md shadow w-full'}
                      />
                    </div>

                    {selectedDay && (
                      <div className="px-5 flex border-b border-solid overflow-x-auto p-5 gap-3 [&::-webkit-scrollbar]:hidden">
                        {TIME_LIST.map(time => (
                          <Button
                            onClick={() => handleTimeSelect(time)}
                            key={time}
                            variant={selectedTime === time ? "default" : "outline"}
                            className="rounded-full border-solid border-primary">
                            {time}
                          </Button>
                        ))}
                      </div>
                    )}

                    {selectedTime && selectedDay && (
                      <div className="py-5">
                        <Card>
                          <CardContent className="p-3 space-y-3">
                            <div className="flex justify-between items-center">
                              <h2 className="font-bold">{service.name}</h2>
                              <p className="font-bold text-sm">{Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD'
                              }).format(Number(service.price))}</p>
                            </div>


                            <div className="flex justify-between items-center">
                              <h2 className="font-bold text-gray-400 text-sm">Date</h2>
                              <p className="font-bold text-gray-400 text-sm">
                                {format(selectedDay, "MMMM dd")}
                              </p>
                            </div>

                            <div className="flex justify-between items-center">
                              <h2 className="font-bold text-gray-400 text-sm">Scheduled time</h2>
                              <p className="font-bold text-gray-400 text-sm">
                                {selectedTime}
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
                      </div>
                    )}
                    <SheetFooter className="px-5 mt-5">
                      <SheetClose asChild>
                        <Button className="w-full" onClick={() => handleCreateBooking()} 
                        type="submit" variant={'default'} disabled={!selectedDay || !selectedTime }>Save Changes</Button>
                      </SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </CardContent>
        </Card>
      </>
    );
  }

  export default ServiceItem;