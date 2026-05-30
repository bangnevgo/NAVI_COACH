'use client';

import React from 'react';
import { TemplateSelector } from '@/components/template-selector';
import { BRAND } from '@/lib/branding';

export default function OnboardingPage() {
  return (
    <div style={styles.page}>
      <div style={styles.logo}>
        <div style={styles.logoIcon}>{BRAND.icon}</div>
        <div style={styles.logoText}>
          <span style={styles.logoName}>{BRAND.fullName}</span>
          <span style={styles.logoVersion}>v{BRAND.version}</span>
        </div>
      </div>
      <TemplateSelector />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, var(--surface-secondary) 0%, var(--mica-alt) 100%)',
    fontFamily: "'DM Sans', -apple-system, sans-serif",
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingTop: 32,
    paddingBottom: 8,
  },
  logoIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    background: 'linear-gradient(135deg, #4C8DFF, #5B9FFF)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: 700,
  },
  logoText: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 8,
  },
  logoName: {
    fontSize: 18,
    fontWeight: 700,
    color: 'var(--text-primary)',
  },
  logoVersion: {
    fontSize: 12,
    color: 'var(--text-tertiary)',
    fontWeight: 500,
  },
};
