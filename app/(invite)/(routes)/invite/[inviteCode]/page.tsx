import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface InviteCodePageProps {
  params: Promise<{
    inviteCode: string;
  }>;
}

const InviteCodePage = async ({ params }: InviteCodePageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return <RedirectToSignIn />;
  }

  const { inviteCode } = await params;

  if (!inviteCode) {
    return redirect("/");
  }

  // Check if already a member
  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`);
  }

  // Find the server by invite code
  const serverToJoin = await db.server.findFirst({
    where: {
      inviteCode: inviteCode,
    },
  });

  if (!serverToJoin) {
    return redirect("/"); // Invalid invite code
  }

  // Add member to server
  try {
    const server = await db.server.update({
      where: {
        id: serverToJoin.id, // Must use id for MongoDB
      },
      data: {
        members: {
          create: {
            profileId: profile.id,
          },
        },
      },
    });

    return redirect(`/servers/${server.id}`);
  } catch (error) {
    console.error("[INVITE_CODE_ERROR]", error);
    return redirect("/");
  }
};

export default InviteCodePage;
