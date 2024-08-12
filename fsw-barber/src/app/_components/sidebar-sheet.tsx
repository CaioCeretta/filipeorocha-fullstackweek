
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
import SignInDialog from "./sign-in-dialog";


const SidebarSheet = () => {

  const { data: session } = useSession()


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
                <SignInDialog />
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
        <Button className='justify-start gap-2' variant={'ghost'} asChild>
          <Link href="/bookings">
            <CalendarIcon size={18} />
            Bookings
          </Link>
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

      {session &&
        <div className='flex flex-col gap-2 py-5'>
          <Button variant={'ghost'} className='justify-start gap-2'
            onClick={handleLogOutClick}>
            <LogOutIcon />
            Sign Out
          </Button>
        </div>
      }
    </SheetContent>
  );
}

export default SidebarSheet;