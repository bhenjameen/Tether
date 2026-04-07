import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { profile: true }
    });

    if (!user) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    // Calculate age from birthday
    const calculateAge = (birthday: Date | null) => {
      if (!birthday) return 21;
      const ageDifMs = Date.now() - birthday.getTime();
      const ageDate = new Date(ageDifMs);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    const formattedProfile = {
      id: user.id,
      name: user.fullName || "Tether User",
      age: calculateAge(user.profile?.birthday || null),
      location: user.profile?.location || "Nigeria",
      gender: user.profile?.gender || "not specified",
      image: user.profile?.images?.[0] || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500",
      bio: user.profile?.bio || "No bio yet.",
      isVerified: false
    };

    return NextResponse.json(formattedProfile);
  } catch (error) {
    console.error("Fetch profile error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
