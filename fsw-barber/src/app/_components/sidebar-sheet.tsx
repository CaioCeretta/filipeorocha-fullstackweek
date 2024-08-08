
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react";
import Image from "next/image";
import { quickSearchOptions } from "../_constants/search";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";


const SidebarSheet = () => {
  return (

    <SheetContent className='overflow-y-auto'>
      <SheetHeader>
        <SheetTitle className='text-left'>Menu</SheetTitle>
      </SheetHeader>

      <div className="flex items-center justify-between gap-3 border-b border-solid">
        <h2 className="font-bold">Welcome! Log in</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button size={'icon'}>
              <LogInIcon />
            </Button>
          </DialogTrigger>

          <DialogContent className="flex w-[90%] items-center flex-col">
            <DialogHeader>
              <DialogTitle>Log In into the Plataform</DialogTitle>

              <DialogDescription>
                Connect via your google account
              </DialogDescription>
            </DialogHeader>

            <Button className="gap-1 font-bold w-[90%]" variant={'outline'}>
              <Image src="/google.svg" alt="log in with google" width={18} height={18} />
              Google
            </Button>

          </DialogContent>
        </Dialog>


        {/* <Avatar>
            <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
          </Avatar>

          <div>
            <p className="font-bold">Caio Ceretta</p>
            <p className="text-xs">caioceretta@gmail.com</p>
          </div> */}
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
  );
}

export default SidebarSheet;