import { Profile, Server, Member } from "./prisma/generated/prisma/client";

export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { profile: Profile })[];
};
