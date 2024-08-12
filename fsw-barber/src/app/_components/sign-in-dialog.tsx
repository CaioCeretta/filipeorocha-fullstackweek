import { DialogContent, DialogTitle, DialogDescription } from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/button";
import { DialogHeader } from "./ui/dialog";
import Image from "next/image";
import { signIn } from "next-auth/react";

const handleLoginWithGoogleClick = async () => {
  await signIn("google")
}

const SignInDialog = () => {
  return (
    <>
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
    </>
  );
}
 
export default SignInDialog;