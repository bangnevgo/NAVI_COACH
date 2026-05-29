import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const clients = await db.client.findMany({
      include: { sessions: true },
    });

    const total = clients.length;
    const active = clients.filter((c) => c.status === 'active').length;
    const onProgress = clients.filter((c) => c.status === 'on_progress').length;
    const completed = clients.filter((c) => c.status === 'completed').length;
    const inactive = clients.filter((c) => c.status === 'inactive').length;

    const totalSessions = clients.reduce((sum, c) => sum + (c.totalSessions || 0), 0);
    const avgProgress = total > 0
      ? Math.round(clients.reduce((sum, c) => sum + (c.progress || 0), 0) / total)
      : 0;

    const phaseMap = new Map<string, number>();
    clients.forEach((c) => {
      if (c.phase) {
        phaseMap.set(c.phase, (phaseMap.get(c.phase) || 0) + 1);
      }
    });

    const phaseDist = Array.from(phaseMap.entries()).map(([name, value]) => ({
      name,
      value,
    }));

    return NextResponse.json({
      stats: { total, active, onProgress, completed, inactive, totalSessions, avgProgress },
      phaseDist,
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Gagal memuat analytics: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
}
