import { CalendarIcon, HomeIcon, LogOutIcon, MenuIcon } from 'lucide-react'
import Image from 'next/image'
import { quickSearchOptions } from '../_constants/search'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { Avatar } from './ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'

const Header = () => {
  return (
    <div>
      <Card>
        <CardContent className="flex flex-row items-center justify-between">
          <Image src="/logo.png" height={18} width={120} alt="logo barbearia" />

          <Sheet>
            <SheetTrigger asChild>
              <Button size={'icon'} variant={'outline'}>
                <MenuIcon className="h-8 w-8" />
              </Button>
            </SheetTrigger>
            <SheetContent className='overflow-y-auto'>
              <SheetHeader>
                <SheetTitle className='text-left'>Menu</SheetTitle>
              </SheetHeader>

              <div className="flex gap-3 items-center border-b border-solid py-5">
                <Avatar>
                  <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                </Avatar>

                <div>
                  <p className="font-bold">Caio Ceretta</p>
                  <p className="text-xs">caioceretta@gmail.com</p>
                </div>
              </div>


              <div className='py-5 flex flex-col gap-4 border-b border-solid'>
                <Button className='justify-start gap-2' variant={'ghost'} >
                  <HomeIcon size={18} />
                  Start
                </Button>
                <Button className='justify-start gap-2' variant={'ghost'}>
                  <CalendarIcon size={18} />
                  Bookings
                </Button>

              </div>

              <div className='py-5 flex flex-col gap-4 border-b border-solid'>
                {quickSearchOptions.map(option => (
                  <Button key={option.title} className="justify-start gap-2" variant={'ghost'}>
                    <Image src={option.imageUrl} height={18} width={18} alt='option' />
                    {option.title}
                  </Button>
                ))}

              </div>

              <div className='flex flex-col gap-2 py-5'>
                <Button variant={'ghost'} className='justify-start gap-2'>
                  <LogOutIcon />
                  Sign Out
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </CardContent>
      </Card>
    </div>
  )
}

export default Header
