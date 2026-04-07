import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { pusherServer } from "@/lib/pusher";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const conversations = await prisma.conversation.findMany({
      where: {
        participants: {
          some: { id: session.user.id }
        }
      },
      include: {
        participants: true,
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1
        }
      },
      orderBy: { updatedAt: "desc" }
    });

    return NextResponse.json(conversations);
  } catch (error) {
    console.error("Fetch conversations error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { conversationId, text, receiverId, image } = await request.json();

    // Create message in DB
    const message = await prisma.message.create({
      data: {
        conversationId,
        senderId: session.user.id,
        receiverId,
        text,
        image
      }
    });

    // Update conversation timestamp
    await prisma.conversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() }
    });

    // Trigger Realtime update via Pusher
    await pusherServer.trigger(
      `conversation-${conversationId}`,
      "new-message",
      message
    );

    // Trigger Realtime notification for recipient
    await pusherServer.trigger(
      `user-${receiverId}`,
      "notification",
      {
        type: "message",
        message: `${session.user.name || "Someone"} sent you a message`
      }
    );

    return NextResponse.json(message);
  } catch (error) {
    console.error("Post message error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
