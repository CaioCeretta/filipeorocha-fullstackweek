## Example 1

If we have, for example, a div which contains 3 elements, a h3, a p and a button, if the parent div is a flex of many of
these elements, it will try to keep them all at the same height, but if one of the child has a taller p than the others
it's going to make all the divs a little bit bigger for it to accomplish, but it will make the smaller one buttons to
not be on the same row, one thing we can do for this not to happen is to limit to one line the title of the barbershop,
by doing something like, if it exceeds one line, to put 3 dots onto it, by doing something like

<h3 className="font-semibold overflow-hidden text-nowrap text-ellipsis">{barbershop.name}</h3>, this will make the overflow
of the text to be hidden and the line to not wrap, making it occupy one line, and the text-ellipsis will create the 3 dots
for us, tailwind has a class which do these 3 things automatically, the truncate class


##Example 2

One thing other thing to know is that if the parent has, for example, 1000px width and the child has the outer div of its
component of 200px, if 10 elements inside that div render, it will cause the parent div to overflow

## Example 3

In cases where we need to utilize on the same file something we need to use async await and also a user interaction we
need to separate where we need the interaction to another client component.

So in next we have this design, where we have a server component but we also need user interaction, so we create a component
with the useClient, handle all the interactions on it, and call that component on a server side component


## Example 4

When we need to utilize the any auth with prisma, we need to install a @auth/prisma-adapter library to work together
with it.

e.g: 
import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from "@/app/_lib/prisma";
import { Adapter } from "next-auth/adapters";

const handler = NextAuth({
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,

    })
  ]
})

export { handler as GET, handler as POST }

