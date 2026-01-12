import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
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
      return new NextResponse("Server ID missing", { status: 400 });
    }

    const existingServer = await db.server.findUnique({
      where: { id: serverId },
    });

    if (!existingServer) {
      return new NextResponse("Server not found", { status: 400 });
    }

    if (existingServer.profileId !== profile.id) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const server = await db.server.delete({
      where: {
        id: serverId,
      },
    });

    return NextResponse.json(server);
  } catch (err) {
    console.error("[SERVER_ID_DELETE]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ serverId: string }> }
) {
  try {
    const profile = await currentProfile();
    const { name, imageUrl } = await req.json();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { serverId } = await params;

    if (!serverId) {
      return new NextResponse("Server ID missing", { status: 400 });
    }

    const existingServer = await db.server.findUnique({
      where: { id: serverId },
    });

    if (!existingServer) {
      return new NextResponse("Server not found", { status: 400 });
    }

    if (existingServer.profileId !== profile.id) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
      },
      data: {
        name,
        imageUrl,
      },
    });

    return NextResponse.json(server);
  } catch (err) {
    console.error("[SERVER_ID_PATCH]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
