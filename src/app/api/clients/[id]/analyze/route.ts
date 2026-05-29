import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getTemplate } from '@/templates';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RouteContext = any;

const FOLLOWUP_PROMPT = `Kamu adalah asisten coaching profesional. Buat pesan WhatsApp follow-up untuk klien coaching dengan detail berikut:

KLIEN: {{clientName}}
PHASE: {{currentPhase}}
GOAL: {{clientGoal}}
PROGRESS: {{progressPercent}}%
TOTAL SESI: {{totalSessions}}

TEMPLATE DESCRIPTIONS:
- session_reminder: Pesan pengingat menjelang sesi coaching. Ramah dan profesional.
- post_session: Follow-up setelah sesi selesai. Apresiasi dan action items.
- weekly_checkin: Pesan motivasi mingguan. Hangat dan menyemangati.
- milestone: Ucapan selamat mencapai pencapaian. Merayakan sukses klien.
- dormant: Re-engagement untuk klien yang sudah lama tidak aktif. Empati dan invite kembali.

Tulis pesan dalam Bahasa Indonesia yang natural, hangat, dan personal. Maksimal 200 karakter. Jangan pakai emoji berlebihan.`;

async function buildContext(clientId: string): Promise<string> {
  const client = await db.client.findUnique({ where: { id: clientId } });
  if (!client) return 'Data klien tidak tersedia.';
  const [sessions, notes, goals, files] = await Promise.all([
    db.session.findMany({ where: { clientId }, orderBy: { date: 'desc' }, take: 5 }),
    db.clientNote.findMany({ where: { clientId, isPinned: true } }),
    db.clientGoal.findMany({ where: { clientId } }),
    db.clientFile.findMany({ where: { clientId } }),
  ]);
  const tags = JSON.parse(client.tags || '[]');
  let ctx = `KLIEN: ${client.name} | ${client.phase} | ${client.status}\nGoal: ${client.goal}\n`;
  if (client.company) ctx += `Perusahaan: ${client.company} - ${client.jobTitle}\n`;
  if (tags.length) ctx += `Tags: ${tags.join(', ')}\n`;
  ctx += `Progress: ${client.progress}% | Sesi: ${client.totalSessions}\n`;
  if (client.bio) ctx += `Bio: ${client.bio}\n`;
  if (client.goalFocusArea) ctx += `Area Fokus: ${client.goalFocusArea}\n`;
  if (goals.length) {
    ctx += `\nTUJUAN:\n`;
    goals.forEach(g => {
      const ms = JSON.parse(g.milestones || '[]');
      ctx += `- ${g.title} (${g.status}, ${g.progress}%): ${g.description}\n`;
      ms.forEach((m: {title: string; completed: boolean}) => ctx += `  ${m.completed ? 'DONE' : 'TODO'}: ${m.title}\n`);
    });
  }
  if (sessions.length) {
    ctx += `\nSESI TERAKHIR:\n`;
    sessions.forEach(s => {
      const ai = JSON.parse(s.actionItems || '[]');
      const ins = JSON.parse(s.insights || '[]');
      ctx += `- ${s.title} (${s.date}, ${s.type}, ${s.duration}min)\n  ${s.notes.substring(0, 300)}\n`;
      if (ai.length) ctx += `  Action items: ${ai.join('; ')}\n`;
      if (ins.length) ctx += `  Insights: ${ins.join('; ')}\n`;
    });
  }
  if (notes.length) {
    ctx += `\nCATATAN PENTING:\n`;
    notes.forEach(n => ctx += `- [${n.type}] ${n.content.substring(0, 200)}\n`);
  }
  if (files.length) {
    ctx += `\nFILE:\n`;
    files.forEach(f => {
      ctx += `- ${f.name} (${f.category})\n`;
      if (f.content) ctx += `  ${f.content.substring(0, 500)}\n`;
    });
  }
  return ctx;
}

function resolvePromptVars(prompt: string, client: { name: string; goal?: string | null; phase?: string; progress?: number; totalSessions?: number; goalFocusArea?: string | null }): string {
  let p = prompt;
  p = p.replace(/{{clientName}}/g, client.name);
  p = p.replace(/{{clientGoal}}/g, client.goal || '-');
  p = p.replace(/{{currentPhase}}/g, client.phase || '-');
  p = p.replace(/{{progressPercent}}/g, String(client.progress || 0));
  p = p.replace(/{{totalSessions}}/g, String(client.totalSessions || 0));
  p = p.replace(/{{goalFocusArea}}/g, client.goalFocusArea || '-');
  return p;
}

export async function POST(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const clientRecord = await db.client.findUnique({ where: { id } });
  if (!clientRecord) return NextResponse.json({ error: 'Klien tidak ditemukan' }, { status: 404 });

  try {
    const body = await request.json();
    const { tool, context: userCtx, provider, apiKey, model, ollamaUrl } = body;

    const org = await db.organization.findUnique({ where: { id: clientRecord.orgId } });
    const template = getTemplate(org?.templateId || undefined);

    let systemPrompt: string;
    if (tool === 'followup') {
      systemPrompt = resolvePromptVars(FOLLOWUP_PROMPT, clientRecord);
    } else if (tool === 'broadcast') {
      systemPrompt = `Buat pesan broadcast coaching untuk klien. Pesan harus: profesional dalam Bahasa Indonesia, maksimal 300 karakter, hangat dan menyemangati. Gunakan teknik persuasi dan motivasi yang sesuai.`;
    } else {
      const templateTool = template.aiTools.find((t) => t.id === tool);
      systemPrompt = templateTool?.systemPrompt || template.aiTools[0]?.systemPrompt || 'Kamu adalah AI coaching assistant.';
    }

    systemPrompt = resolvePromptVars(systemPrompt, clientRecord);
    const clientContext = await buildContext(id);
    const userPrompt = userCtx ? `${clientContext}\n\nPertanyaan coach: ${userCtx}` : `${clientContext}\n\nBuat analisis ${tool}.`;

    let analysisText: string;
    if (provider === 'ollama') {
      const base = (ollamaUrl || process.env.OLLAMA_URL || 'http://localhost:11434').replace(/\/$/, '');
      const res = await fetch(`${base}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: model || 'llama3',
          messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: userPrompt }],
          stream: false,
        }),
      });
      if (!res.ok) throw new Error(`Ollama error ${res.status}`);
      const data = await res.json();
      analysisText = data.message?.content || 'Gagal mendapat respons.';
    } else {
      const orApiKey = apiKey || process.env.OPENROUTER_API_KEY || '';
      if (!orApiKey) return NextResponse.json({ error: 'API key belum dikonfigurasi.', code: 'MISSING_API_KEY' }, { status: 400 });
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${orApiKey}`,
          'HTTP-Referer': 'https://coachflo.app',
          'X-Title': 'COACHFLO',
        },
        body: JSON.stringify({
          model: model || 'anthropic/claude-haiku-4-5',
          messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: userPrompt }],
          max_tokens: 2000,
          temperature: 0.7,
        }),
      });
      if (!res.ok) throw new Error(`OpenRouter ${res.status}: ${await res.text()}`);
      const data = await res.json();
      analysisText = data.choices?.[0]?.message?.content || 'Gagal menghasilkan analisis.';
    }
    return NextResponse.json({ analysis: analysisText, result: analysisText, tool });
  } catch (error) {
    return NextResponse.json({ error: `Gagal: ${error instanceof Error ? error.message : String(error)}` }, { status: 500 });
  }
}
