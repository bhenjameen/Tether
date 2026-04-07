import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Fetch all profiles except the current user's
    const profiles = await prisma.user.findMany({
      where: {
        id: { not: session.user.id },
        profile: { isNot: null }
      },
      include: {
        profile: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    // Map to the format the UI expects
    const formattedProfiles = profiles.map((user: any) => ({
      id: user.id,
      name: user.fullName || "Tether User",
      age: user.profile?.age || 21,
      location: user.profile?.location || "Nigeria",
      gender: user.profile?.gender || "not specified",
      image: user.profile?.image || "https://via.placeholder.com/500",
      bio: user.profile?.bio || "No bio yet.",
      isVerified: user.profile?.isVerified || false,
      hasPhoto: !!user.profile?.image
    }));

    return NextResponse.json(formattedProfiles);
  } catch (error) {
    console.error("Fetch profiles error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
