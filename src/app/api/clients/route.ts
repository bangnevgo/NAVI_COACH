import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const status = searchParams.get('status');
    const phase = searchParams.get('phase');

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (phase) where.phase = phase;
    if (query) {
      where.OR = [
        { name: { contains: query } },
        { email: { contains: query } },
        { goal: { contains: query } },
      ];
    }

    const clients = await db.client.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    const result = clients.map((c) => ({
      ...c,
      tags: JSON.parse(c.tags || '[]'),
    }));

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: `Gagal memuat klien: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const client = await db.client.create({
      data: {
        orgId: body.orgId || 'default',
        coachId: body.coachId || 'default',
        name: body.name,
        email: body.email || null,
        whatsapp: body.whatsapp || null,
        phone: body.phone || null,
        company: body.company || null,
        jobTitle: body.jobTitle || null,
        avatar: body.avatar || null,
        status: body.status || 'active',
        phase: body.phase || '',
        goal: body.goal || null,
        bio: body.bio || null,
        goalFocusArea: body.goalFocusArea || null,
        tags: JSON.stringify(body.tags || []),
        templateData: JSON.stringify(body.templateData || {}),
      },
    });

    return NextResponse.json({
      ...client,
      tags: JSON.parse(client.tags || '[]'),
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: `Gagal membuat klien: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
}
