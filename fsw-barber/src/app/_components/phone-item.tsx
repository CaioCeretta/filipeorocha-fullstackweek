'use client'

import { SmartphoneIcon } from "lucide-react"
import { Button } from "./ui/button"
import { toast } from "sonner"

interface PhoneItemProps {
  phone: string
}

const handleCopyPhoneClick = (phone: string) => {
  navigator.clipboard.writeText(phone)
  toast.success('Telephone successfully copied')
} 

const PhoneItem = ({ phone }: PhoneItemProps) => {

  return (

    <div className="flex justify-between" key={phone}>
      {/* Left */}
      <div className="flex items-center gap-2">
        <SmartphoneIcon size={14} />
        <p className="text-sm">{phone}</p>
      </div>
      {/* Right */}
      <Button variant={'outline'} size={'sm'} onClick={() => handleCopyPhoneClick(phone)}>Copy</Button>

    </div>
  )
}

export default PhoneItem;