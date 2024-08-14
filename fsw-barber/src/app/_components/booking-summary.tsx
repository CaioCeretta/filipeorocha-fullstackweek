import { format } from "date-fns";
import { Card, CardContent } from "./ui/card";
import { Barbershop, BarbershopService } from "@prisma/client";

interface BookingSummaryProps {
  service: Pick<BarbershopService, 'name' | 'price'>
  barbershop: Pick<Barbershop, 'name'>
  selectedDate: Date
}

const BookingSummary = ({ service, barbershop, selectedDate }: BookingSummaryProps) => {
  //TODO

  return (
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
            {format(selectedDate, "MMMM dd")}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <h2 className="font-bold text-gray-400 text-sm">Scheduled time</h2>
          <p className="font-bold text-gray-400 text-sm">
            {format(selectedDate, 'HH:mm')}
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
  );
}
 
export default BookingSummary;