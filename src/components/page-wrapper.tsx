'use client';

import React, { useState } from 'react';
import { Sidebar } from './sidebar';
import { AIAssistantPanel } from './ai-assistant-panel';
import { useStateManager } from '@/hooks/use-local-storage';
import { BRAND } from '@/lib/branding';
import { ThemeToggle } from '@/components/theme-toggle';

interface PageWrapperProps {
  children: React.ReactNode;
  title?: string;
}

export function PageWrapper({ children, title }: PageWrapperProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [aiToolsOpen, setAiToolsOpen] = useState(false);
  const { sidebarCollapsed } = useStateManager();

  return (
    <div style={styles.layout}>
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onOpenAITools={() => setAiToolsOpen(true)}
      />
      <main style={{ ...styles.main, marginLeft: sidebarCollapsed ? 72 : 260 }}>
        {title && (
          <div style={styles.header}>
            <button
              style={styles.menuBtn}
              onClick={() => setSidebarOpen(true)}
              aria-label="Menu"
            >
              ☰
            </button>
            <h1 style={styles.title}>{title}</h1>
            <div style={styles.headerRight}>
              <ThemeToggle />
            </div>
          </div>
        )}
        <div style={styles.content}>{children}</div>
      </main>

      {/* AI Assistant Panel */}
      <AIAssistantPanel
        isOpen={aiToolsOpen}
        onClose={() => setAiToolsOpen(false)}
      />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  layout: {
    display: 'flex',
    minHeight: '100vh',
    background: 'var(--surface-secondary)',
    fontFamily: "'DM Sans', -apple-system, sans-serif",
  },
  main: {
    flex: 1,
    transition: 'margin-left 0.3s ease',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    padding: '16px 24px',
    background: 'var(--surface-primary)',
    borderBottom: '1px solid var(--border-primary)',
  },
  menuBtn: {
    background: 'none',
    border: 'none',
    fontSize: 24,
    cursor: 'pointer',
    color: 'var(--text-primary)',
    padding: '4px 8px',
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    color: 'var(--text-primary)',
    margin: 0,
    flex: 1,
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 24,
  },
};
