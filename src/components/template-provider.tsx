'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { NicheTemplate } from '@/templates/types';
import { getTemplate } from '@/templates';

const STORAGE_KEY = 'coachflo_active_template';

interface TemplateContextValue {
  template: NicheTemplate;
  templateId: string;
  setTemplateId: (id: string) => void;
}

const TemplateContext = createContext<TemplateContextValue | null>(null);

export function TemplateProvider({ children }: { children: React.ReactNode }) {
  const [templateId, setTemplateIdState] = useState<string>('manifestasi');
  const [template, setTemplate] = useState<NicheTemplate>(() => getTemplate('manifestasi'));

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setTemplateIdState(stored);
      setTemplate(getTemplate(stored));
    }
  }, []);

  const setTemplateId = useCallback((id: string) => {
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, id);
    setTemplateIdState(id);
    setTemplate(getTemplate(id));
  }, []);

  return (
    <TemplateContext.Provider value={{ template, templateId, setTemplateId }}>
      {children}
    </TemplateContext.Provider>
  );
}

export function useTemplate(): NicheTemplate {
  const ctx = useContext(TemplateContext);
  if (!ctx) return getTemplate('manifestasi');
  return ctx.template;
}

export function useTemplateId(): string {
  const ctx = useContext(TemplateContext);
  return ctx?.templateId ?? 'manifestasi';
}

export function useSetTemplate(): (id: string) => void {
  const ctx = useContext(TemplateContext);
  return ctx?.setTemplateId ?? (() => {});
}

export default TemplateContext;
