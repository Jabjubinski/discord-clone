import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { nanoid } from "nanoid";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ serverId: string }> }
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { serverId } = await params;

    if (!serverId) {
      return new NextResponse("Server ID Missing", { status: 400 });
    }

    // Verify ownership first (MongoDB requirement)
    const existingServer = await db.server.findUnique({
      where: { id: serverId },
    });

    if (!existingServer || existingServer.profileId !== profile.id) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    // Now update with just the id
    const server = await db.server.update({
      where: {
        id: serverId,
      },
      data: {
        inviteCode: nanoid(10),
      },
    });

    return NextResponse.json(server);
  } catch (err) {
    console.log("[SERVER_ID]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
