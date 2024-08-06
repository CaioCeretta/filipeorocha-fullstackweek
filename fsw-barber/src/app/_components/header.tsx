import Image from 'next/image'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { MenuIcon } from 'lucide-react'

const Header = () => {
  return (
    <div>
      <Card>
        <CardContent className="flex flex-row items-center justify-between">
          <Image src="/logo.png" height={18} width={120} alt="logo barbearia" />
          <Button size={'icon'} variant={'outline'}>
            <MenuIcon className="h-8 w-8" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default Header
