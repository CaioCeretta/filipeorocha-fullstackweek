'use client'

import { Barbershop, BarbershopService, Booking } from "@prisma/client";
import Image from "next/image";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Card, CardContent } from "./ui/card";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "./ui/sheet";

import { isPast, isToday, set } from "date-fns";
import { enUS } from 'date-fns/locale';
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { createBooking } from "../_actions/create-booking";
import { getBookings } from "../_actions/get-bookings";
import BookingSummary from "./booking-summary";
import SignInDialog from "./sign-in-dialog";
import { Dialog, DialogContent } from "./ui/dialog";
import { useRouter } from "next/navigation";

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

  const router = useRouter()

  const [signInDialogIsOpen, setSignInDialogIsOpen] = useState<boolean>(false)
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)

  const [dayBookings, setDayBookings] = useState<Booking[]>([])
  const [bookingSheetsIsOpen, setBookingSheetsIsOpen] = useState<boolean>(false)

  useEffect(() => {
    const fetch = async () => {
      if (!selectedDay) return
      const bookings = await getBookings({
        date: selectedDay,
        serviceId: service.id,
      })
      setDayBookings(bookings)
    }
    fetch()
  }, [selectedDay, service.id])

  const selectedDate = useMemo(() => {
    if(!selectedDay || !selectedTime) return
    
    const [hoursStr, minutesStr] = selectedTime.split(':')
    const hours = Number(hoursStr)
    const minutes = Number(minutesStr)

    return set(selectedDay, {
      hours,
      minutes
  })
          
  }, [selectedDay, selectedTime])


  const handleBookingClick = () => {
    if (session?.user) {
      return setBookingSheetsIsOpen(true)
    }
    setSignInDialogIsOpen(true)

  }

  const handleBookingSheetOpenChange = () => {
    setSelectedDay(undefined)
    setSelectedTime(undefined)
    setDayBookings([])
    setBookingSheetsIsOpen(false)
  }

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
      if (!selectedDate) return


      await createBooking(
        {
          serviceId: service.id,
          userId: (session?.user as any).id,
          date: selectedDate
        }
      )

      setBookingSheetsIsOpen(false)

      toast.success('Reservation successfully created', {
        action: {
          label: 'See Bookings',
          onClick: () => router.push('/bookings')
        }
      })
    } catch (error) {
      console.log(error)

      setBookingSheetsIsOpen(false)

      toast.error('Error while creating reservation')
    }

  }

  interface GetTimeListProps {
    bookings: Booking[],
    selectedDay: Date
  }

  const getTimeList = ({ bookings, selectedDay }: GetTimeListProps) => {

    //TODO, do not show times in the past
    return TIME_LIST.filter(time => {
      const hour = Number(time.split(":")[0])
      const minutes = Number(time.split(":")[1])

      const timeIsOnThePast = isPast(set(new Date(), { hours: hour, minutes: minutes }))

      if (timeIsOnThePast && isToday(selectedDay)) {
        return false
      }

      //Verifies if there is any reservation on that period of time
      const hasBookingOnCurrentTime = (bookings.some(
        booking =>
          booking.date.getHours() === hour &&
          booking.date.getMinutes() === minutes
      )
      )

      if (hasBookingOnCurrentTime) {
        return false
      }

      return true
    })
  }

  const timeList = useMemo(() => {

    if (!selectedDay) return []

    return getTimeList({
      bookings: dayBookings,
      selectedDay
    })
  }, [selectedDay, dayBookings])


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

              <Sheet open={bookingSheetsIsOpen} onOpenChange={handleBookingSheetOpenChange}>
                <Button
                  onClick={handleBookingClick}
                  variant="secondary" size={'sm'}>Book
                </Button>
                <SheetContent className="px-0">
                  <SheetHeader>
                    <SheetTitle className="text-center">Make Reservation</SheetTitle>
                  </SheetHeader>

                  <div className="border-b relative border-solid py-5 w-full">
                    <Calendar
                      mode="single"
                      fromDate={new Date()}
                      locale={enUS}
                      selected={selectedDay}
                      onSelect={handleDateSelect}
                      className={'rounded-md shadow w-full ml-12'}
                    />
                  </div>

                  {selectedDay && (
                    <div className="px-5 flex border-b border-solid overflow-x-auto p-5 gap-3 [&::-webkit-scrollbar]:hidden">
                      {timeList.length > 0 ?
                        timeList.map(time => (
                          <Button
                            onClick={() => handleTimeSelect(time)}
                            key={time}
                            variant={selectedTime === time ? "default" : "outline"}
                            className="rounded-full border-solid border-primary">
                            {time}
                          </Button>
                        ))
                        :
                        <p className="text-xs">No available hours to book</p>
                      }
                    </div>
                  )}

                  {selectedDate && (
                    <div className="py-5 px-5">
                      <BookingSummary
                        service={service}
                        barbershop={barbershop}
                        selectedDate={selectedDate}
                      />
                    </div>
                  )}
                  <SheetFooter className="px-5 mt-5">
                    <SheetClose asChild>
                      <Button className="w-full" onClick={() => handleCreateBooking()}
                        type="submit" variant={'default'} disabled={!selectedDay || !selectedTime}>Save Changes</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={signInDialogIsOpen} onOpenChange={(open) => setSignInDialogIsOpen(open)}>
        <DialogContent className="w-[90%]">
          <SignInDialog />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ServiceItem;