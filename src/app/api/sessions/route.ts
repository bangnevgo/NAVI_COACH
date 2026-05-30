import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const sessions = await db.session.findMany({
      include: { client: { select: { name: true } } },
      orderBy: { date: 'asc' },
    });

    const formatted = sessions.map((s) => ({
      id: s.id,
      clientId: s.clientId,
      clientName: s.client.name,
      type: s.type,
      title: s.title,
      date: s.date,
      duration: s.duration,
      mood: s.mood,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    return NextResponse.json(
      { error: `Gagal memuat sessions: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { clientId, type, title, date, duration } = body;

    if (!clientId || !title || !date) {
      return NextResponse.json(
        { error: 'clientId, title, dan date wajib diisi' },
        { status: 400 }
      );
    }

    const session = await db.session.create({
      data: {
        clientId,
        type: type || 'coaching',
        title,
        date,
        duration: duration || 60,
      },
      include: { client: { select: { name: true } } },
    });

    // Update client's totalSessions and nextSession
    const client = await db.client.findUnique({ where: { id: clientId } });
    if (client) {
      await db.client.update({
        where: { id: clientId },
        data: {
          totalSessions: { increment: 1 },
          nextSession: date,
        },
      });
    }

    return NextResponse.json({
      id: session.id,
      clientId: session.clientId,
      clientName: session.client.name,
      type: session.type,
      title: session.title,
      date: session.date,
      duration: session.duration,
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: `Gagal membuat session: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
}
