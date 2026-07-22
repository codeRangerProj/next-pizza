import {redirect} from "next/navigation";
import {getUserSession} from "@/shared/lib/getUserSession";
import {prisma} from "@/prisma/prisma-client";
import {ProfileForm} from "@/shared/components";

export default async function ProfilePage() {
  const session = await getUserSession()

  if (!session) {
    return redirect('/notAuth')
  }

  const user = await prisma.user.findFirst({
    where: {
      id: Number(session?.id),
    }
  })

  if (!user) {
    return redirect('/notAuth')
  }

  return <ProfileForm data={user}/>
}