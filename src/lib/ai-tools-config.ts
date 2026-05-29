import { NicheTemplate } from '@/templates/types';

export interface AIToolConfig {
  icon: string;
  title: string;
  description: string;
  prompt: (client: {
    name: string;
    email?: string;
    whatsapp?: string;
    goal?: string;
    bio?: string;
    company?: string;
    jobTitle?: string;
    phase?: string;
    goalFocusArea?: string;
    totalSessions?: number;
    progress?: number;
  }) => string;
}

export function getAITools(template: NicheTemplate): AIToolConfig[] {
  return template.aiTools.map((tool) => ({
    icon: tool.icon,
    title: tool.name,
    description: tool.description,
    prompt: (client) => {
      let prompt = tool.systemPrompt;
      prompt = prompt.replace(/{{clientName}}/g, client.name || '-');
      prompt = prompt.replace(/{{clientEmail}}/g, client.email || '-');
      prompt = prompt.replace(/{{clientWhatsapp}}/g, client.whatsapp || '-');
      prompt = prompt.replace(/{{clientGoal}}/g, client.goal || '-');
      prompt = prompt.replace(/{{clientBio}}/g, client.bio || '-');
      prompt = prompt.replace(/{{clientCompany}}/g, client.company || '-');
      prompt = prompt.replace(/{{clientJobTitle}}/g, client.jobTitle || '-');
      prompt = prompt.replace(/{{currentPhase}}/g, client.phase || '-');
      prompt = prompt.replace(/{{goalFocusArea}}/g, client.goalFocusArea || '-');
      prompt = prompt.replace(/{{totalSessions}}/g, String(client.totalSessions || 0));
      prompt = prompt.replace(/{{progressPercent}}/g, String(client.progress || 0));
      return prompt;
    },
  }));
}

export function getQuickChips(template: NicheTemplate, toolId: string) {
  const tool = template.aiTools.find((t) => t.id === toolId);
  return tool?.quickChips || [];
}

export default getAITools;
