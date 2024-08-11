
'use client'

import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { quickSearchOptions } from "../_constants/search";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
// import { signIn, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from '@/app/_components/ui/avatar';
import { signIn, signOut, useSession } from "next-auth/react";


const SidebarSheet = () => {

  const { data: session } = useSession()

  const handleLoginWithGoogleClick = async () => {
    await signIn("google")
  }

  const handleLogOutClick = async () => {
    await signOut()
  }

  return (


    <SheetContent className='overflow-y-auto'>
      <SheetHeader>
        <SheetTitle className='text-left'>Menu</SheetTitle>
      </SheetHeader>


      <div className="flex items-center justify-between gap-3 border-b border-solid py-5">

        {session?.user ? (
          <>

            <Avatar>
              <AvatarImage src={session.user.image!} />
            </Avatar>

            <div>
              <p className="font-bold">{session.user.name}</p>
              <p className="text-xs">{session.user.email}</p>
            </div>

          </>

        ) : (
          <>
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

                <Button onClick={handleLoginWithGoogleClick} className="gap-1 font-bold w-[90%]" variant={'outline'}>
                  <Image src="/google.svg" alt="log in with google" width={18} height={18} />
                  Google
                </Button>

              </DialogContent>
            </Dialog>
          </>
        )}


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
          <SheetClose key={option.title} asChild>
            <Button className="justify-start gap-2" variant={'ghost'} asChild>
              <Link href={`/barbershops?service=${option.title}`}>
                <Image src={option.imageUrl} height={18} width={18} alt='option' />
                {option.title}
              </Link>
            </Button>
          </SheetClose>
        ))}

      </div>

      <div className='flex flex-col gap-2 py-5'>
        <Button variant={'ghost'} className='justify-start gap-2'
          onClick={handleLogOutClick}>
          <LogOutIcon />
          Sign Out
        </Button>
      </div>
    </SheetContent>
  );
}

export default SidebarSheet;