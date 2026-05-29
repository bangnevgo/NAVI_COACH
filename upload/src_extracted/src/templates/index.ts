import { NicheTemplate, TemplateId } from './types';
import manifestasi from './manifestasi';
import business from './business';
import health from './health';
import career from './career';
import relationship from './relationship';
import creative from './creative';
import custom from './custom';

export const TEMPLATES: Record<TemplateId, NicheTemplate> = {
  manifestasi,
  business,
  health,
  career,
  relationship,
  creative,
  custom,
} as const;

const DEFAULT_TEMPLATE: TemplateId = 'manifestasi';

export function getTemplate(id?: string | null): NicheTemplate {
  if (id && id in TEMPLATES) {
    return TEMPLATES[id as TemplateId];
  }
  return TEMPLATES[DEFAULT_TEMPLATE];
}

export function getTemplateList(): NicheTemplate[] {
  return Object.values(TEMPLATES).filter((t) => t.id !== 'custom');
}

export function getAllTemplates(): NicheTemplate[] {
  return Object.values(TEMPLATES);
}

export type { NicheTemplate, TemplateId };
export default TEMPLATES;
