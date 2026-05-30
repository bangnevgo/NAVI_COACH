import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RouteContext = any;

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const client = await db.client.findUnique({
      where: { id },
      include: {
        sessions: { orderBy: { date: 'desc' } },
        notes: { orderBy: { createdAt: 'desc' } },
        goals: { orderBy: { createdAt: 'desc' } },
        files: { orderBy: { uploadedAt: 'desc' } },
      },
    });

    if (!client) {
      return NextResponse.json({ error: 'Klien tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({
      ...client,
      tags: JSON.parse(client.tags || '[]'),
      templateData: JSON.parse(client.templateData || '{}'),
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Gagal memuat klien: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const updateData: Record<string, unknown> = {};
    const fields = ['name', 'email', 'whatsapp', 'phone', 'company', 'jobTitle', 'avatar',
      'status', 'phase', 'goal', 'bio', 'goalFocusArea', 'progress', 'totalSessions',
      'nextSession', 'lastSessionAt'];

    fields.forEach((field) => {
      if (body[field] !== undefined) updateData[field] = body[field];
    });

    if (body.tags) updateData.tags = JSON.stringify(body.tags);
    if (body.templateData) updateData.templateData = JSON.stringify(body.templateData);

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'Tidak ada data untuk diupdate' }, { status: 400 });
    }

    const client = await db.client.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      ...client,
      tags: JSON.parse(client.tags || '[]'),
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Gagal update klien: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const updateData: Record<string, unknown> = {};
    const fields = ['name', 'email', 'whatsapp', 'phone', 'company', 'jobTitle', 'avatar',
      'status', 'phase', 'goal', 'bio', 'goalFocusArea', 'progress', 'totalSessions',
      'nextSession', 'lastSessionAt'];

    fields.forEach((field) => {
      if (body[field] !== undefined) updateData[field] = body[field];
    });

    if (body.tags) updateData.tags = JSON.stringify(body.tags);
    if (body.templateData) updateData.templateData = JSON.stringify(body.templateData);

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'Tidak ada data untuk diupdate' }, { status: 400 });
    }

    const client = await db.client.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      ...client,
      tags: JSON.parse(client.tags || '[]'),
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Gagal update klien: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    await db.client.delete({ where: { id } });
    return NextResponse.json({ message: 'Klien berhasil dihapus' });
  } catch (error) {
    return NextResponse.json(
      { error: `Gagal menghapus klien: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
}
