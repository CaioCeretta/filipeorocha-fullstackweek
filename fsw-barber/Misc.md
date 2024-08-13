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


## Example 4 (Next Auth)

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

then, we need to populate those clientId and clientSecret, what we need to do is to enter the google developer console, inside of it create our project, generate our oAuthKeys, and then, utilize them as those credentials, we will now be able to use the google authorization, and an example of one function which would call google to get the user login and password is:   const handleLoginWithGoogleClick = async () => {
    await signIn("google")
  }

  and utilize that function as a button onClick, simple as that

## Full height of the cildren with footer and header on screen

for it we would add on the layout, for example, this

<body className={inter.className} >
        <AuthProvider>
          <div className="flex flex-col h-full">
            <div className='flex-1'>{children}</div>
            <Footer />
          </div>
        </AuthProvider>
        <Toaster />

      </body>

Then on the globals.css, on the @layer base;

apply the classes h-full for the body and the html


## Example 5 - server actions explanation

Let's use the service item component as an example, in this service i have a  button where i can submit a form as a post
 which will lead to that booking being stored, but one thing we can notice is that to next, whenever we make an api call
 such as the createBooking, next internally will create for us an http route, we can see that when we click on the submit
 it will call a route, that will always be a post at the url action wer're on, that is an example of a server action that 
 next translates it into an http route. 
So basically a server action is an abstraction of a http call that next do for us, and that's why we are able to access server
resources from a client component

## Example 6 - Adding the user id to the next auth default object

To do it, we need to on the /api/auth/[...nextauth]/route.ts file, here we are going to create a callbacks object with
an async function named session and pass to it as arguments an object containing the session and the user, that function is
called whenever we call the useSession(), so we need to say that the session.user is everything we have on the session.user
name, email, etc, and that user of the parameter is the user from our db, that we configured when we sat up the next auth
database tables in our schemas, that user has an id, so we pass to that session.user everything we have on the session.user
PLUS the user.id. like this

 callbacks: {
    async session({session, user}) {
      session.user = {
        ...session.user,
        id: user.id
      }

      return session
    }
  }


## Next auth

If we would like to use the auth user inside a server component, we are unable to uitlize the useSession, we should use
the getServerSession() function and pass to it the authorization options, so, for it, we must create a file, with whichever
name we want, inside the lib, for example, and create a constant named authOptions and use the code we used inside the
NextAuth function, now, on the api we call the authOptions we just created and use it on other places we need the same
authorization.

One thing we did, was to get the userId from our auth session, we tweaked a little the function when we created the session
by adding this to the authOptions

  callbacks: {
    async session({ session, user }) {
      session.user = {
        ...session.user,
        id: user.id
      } as any

      return session
    }

  we are spreading everything from the session we get when we create and add the id of the user in the database as
  the key id

  ## Pass encapsulated properties to child component


  For instance, if we want to render a service name obtained from a Prisma query that includes a relation, and we pass that booking object to a component, let's assume that the interface only receives the booking without the joined tables, we need to inform the child component that the booking not only contains the booking properties but also the service object. To ensure that Prisma includes the service data in the booking (which only has the service ID), we use the following syntax:

  interface BookingItemProps {
    booking: Prisma.BookingGetPayload<{
      include: {service: true}
    }>
  } 

  that BookingGetPayload is type generated by prisma, it represents the shape of the Booking model, plus the related BookingService data, this ensures typescript knows exactly what fields are abailable in the booking object

  so basically we are saying that the bookings MUST have its service include

  and this

    const bookings = await db.booking.findMany({
    where: {
      userId: session.user.id
    },
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    }
  })

  interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    }
  }>
}

  is telling prisma we want the booking and also the service of that booking, but the booking also has a barbershop
  related to that service, so it also includes the barbershop from the service related to that booking

  this will tell typescript, that when a service is booked, the booking must have its service and its barbershop included

  ## Create interface for function parameters

  The instructor created interfaces for function where we receive more than one parameter, then it's a single object as
  a parameter, it will ensure type safety and improve legibility 