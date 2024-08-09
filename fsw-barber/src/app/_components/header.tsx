import { MenuIcon } from 'lucide-react'
import Image from 'next/image'
import SidebarSheet from './sidebar-sheet'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Sheet, SheetTrigger } from './ui/sheet'

const Header = () => {
  return (
    <div>
      <Card>
        <CardContent className="flex flex-row items-center justify-between p-5">
          <Image src="/logo.png" height={18} width={120} alt="logo barbearia" />

          <Sheet>
            <SheetTrigger asChild>
              <Button size={'icon'} variant={'outline'}>
                <MenuIcon className="h-8 w-8" />
              </Button>
            </SheetTrigger>
            <SidebarSheet />
          </Sheet>
        </CardContent>
      </Card>
    </div>
  )
}

export default Header
