import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: params.id },
      include: { profile: true }
    });

    if (!user) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const formattedProfile = {
      id: user.id,
      name: user.fullName || "Tether User",
      age: user.profile?.age || 21,
      location: user.profile?.location || "Nigeria",
      gender: user.profile?.gender || "not specified",
      image: user.profile?.image || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500",
      bio: user.profile?.bio || "No bio yet.",
      isVerified: user.profile?.isVerified || false
    };

    return NextResponse.json(formattedProfile);
  } catch (error) {
    console.error("Fetch profile error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
