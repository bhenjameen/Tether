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

    // helper to calculate age
    const calculateAge = (birthday: Date | null) => {
      if (!birthday) return 21;
      const ageDifMs = Date.now() - birthday.getTime();
      const ageDate = new Date(ageDifMs);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    // Map to the format the UI expects
    const formattedProfiles = profiles.map((user: any) => ({
      id: user.id,
      name: user.fullName || "Tether User",
      age: calculateAge(user.profile?.birthday || null),
      location: user.profile?.location || "Nigeria",
      gender: user.profile?.gender || "not specified",
      image: user.profile?.images?.[0] || "https://via.placeholder.com/500",
      bio: user.profile?.bio || "No bio yet.",
      isVerified: false,
      hasPhoto: !!(user.profile?.images?.length > 0)
    }));

    return NextResponse.json(formattedProfiles);
  } catch (error) {
    console.error("Fetch profiles error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
