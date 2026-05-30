'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home, Users, CalendarDays, Wand2,
  BarChart3, BookOpen, Settings, Archive,
} from 'lucide-react';
import { useTemplate } from '@/components/template-provider';
import { BRAND } from '@/lib/branding';
import { ThemeToggle } from '@/components/theme-toggle';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAITools: () => void;
}

export function Sidebar({ isOpen, onClose, onOpenAITools }: SidebarProps) {
  const pathname = usePathname();
  const template = useTemplate();
  const t = template.terminology;

  const navSections = [
    {
      title: 'Main',
      items: [
        { icon: Home, label: 'Beranda', href: '/' },
        { icon: Home, label: 'Dashboard', href: '/dashboard' },
        { icon: Users, label: t.clientPlural, href: '/klien' },
        { icon: Archive, label: t.clientInactive, href: '/klien-tidak-aktif' },
        { icon: CalendarDays, label: 'Jadwal', href: '/jadwal' },
      ],
    },
    {
      title: 'AI Tools',
      items: [
        { icon: Wand2, label: 'AI Assistant', href: null, isAI: true },
        { icon: BarChart3, label: 'Analytics', href: '/analytics' },
        { icon: BookOpen, label: 'Templates', href: '/templates' },
      ],
    },
    {
      title: 'Settings',
      items: [
        { icon: Settings, label: 'Pengaturan', href: '/pengaturan' },
      ],
    },
  ];

  const handleNavClick = (item: { isAI?: boolean; href?: string | null }) => {
    if (item.isAI) {
      onOpenAITools();
      onClose();
      return;
    }
    onClose();
  };

  const isActive = (href: string | null) => {
    if (!href) return false;
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  };

  return (
    <>
      {isOpen && (
        <div className="nevgo-sidebar-overlay" onClick={onClose} />
      )}
      <aside className={`nevgo-sidebar${isOpen ? ' open' : ''}`}>
        <div className="nevgo-sidebar-header">
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div className="nevgo-brand">
              <div className="nevgo-brand-icon">{BRAND.icon}</div>
              <div className="nevgo-brand-text">
                <div className="nevgo-brand-name">{BRAND.name}</div>
                <div className="nevgo-brand-tagline">{BRAND.tagline}</div>
              </div>
            </div>
          </Link>
        </div>

        <nav className="nevgo-nav">
          {navSections.map((section) => (
            <div key={section.title} className="nevgo-nav-section">
              <div className="nevgo-nav-section-title">{section.title}</div>
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href ?? null);

                if (item.isAI) {
                  return (
                    <button
                      key={item.label}
                      className={`nevgo-nav-item${active ? ' active' : ''}`}
                      onClick={() => handleNavClick(item)}
                    >
                      <span className="nevgo-nav-icon"><Icon size={18} /></span>
                      <span>{item.label}</span>
                    </button>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href!}
                    onClick={() => onClose()}
                    className={`nevgo-nav-item${active ? ' active' : ''}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <span className="nevgo-nav-icon"><Icon size={18} /></span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="nevgo-sidebar-footer">
          <ThemeToggle />
        </div>
      </aside>
    </>
  );
}
