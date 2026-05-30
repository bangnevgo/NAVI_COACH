'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTemplate } from '@/components/template-provider';
import { getAITools, getQuickChips, type AIToolConfig } from '@/lib/ai-tools-config';
import type { Client as ClientType } from '@/lib/types';
import { X, Send, Wand2, User, ChevronRight, Sparkles, MessageSquare, Loader2, Copy, Check, Bot } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  tool?: string;
}

interface AIAssistantPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AIAssistantPanel({ isOpen, onClose }: AIAssistantPanelProps) {
  const template = useTemplate();
  const t = template.terminology;
  const aiTools = getAITools(template);

  const [clients, setClients] = useState<ClientType[]>([]);
  const [selectedClient, setSelectedClient] = useState<ClientType | null>(null);
  const [selectedTool, setSelectedTool] = useState<AIToolConfig | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showClientPicker, setShowClientPicker] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      fetch('/api/clients?status=active')
        .then((r) => r.json())
        .then((data) => setClients(Array.isArray(data) ? data : []))
        .catch(console.error);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && selectedClient) {
      inputRef.current?.focus();
    }
  }, [isOpen, selectedClient]);

  const handleSelectClient = useCallback((client: ClientType) => {
    setSelectedClient(client);
    setShowClientPicker(false);
    setMessages([]);
    setSelectedTool(null);
  }, []);

  const runAnalysis = useCallback(async (toolId: string, userQuery?: string) => {
    if (!selectedClient) return;

    const tool = aiTools.find((t) => t.title === toolId) || aiTools.find((t) => t.id === toolId);
    if (!tool && toolId !== 'followup' && toolId !== 'broadcast') return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userQuery || `Jalankan ${tool?.title || toolId}`,
      timestamp: new Date(),
      tool: toolId,
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const res = await fetch(`/api/clients/${selectedClient.id}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tool: toolId,
          context: userQuery || undefined,
          provider: 'openrouter',
        }),
      });

      const data = await res.json();

      if (data.error) {
        if (data.code === 'MISSING_API_KEY') {
          const errorMsg: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: `API key belum dikonfigurasi. Silakan atur OpenRouter API Key di halaman **Pengaturan** terlebih dahulu.\n\nAnda bisa mendapatkan API key gratis di [openrouter.ai](https://openrouter.ai)`,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, errorMsg]);
        } else {
          const errorMsg: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: `Terjadi kesalahan: ${data.error}`,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, errorMsg]);
        }
      } else {
        const assistantMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.analysis || data.result || 'Tidak ada hasil.',
          timestamp: new Date(),
          tool: toolId,
        };
        setMessages((prev) => [...prev, assistantMsg]);
      }
    } catch (err) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Gagal terhubung ke server: ${err instanceof Error ? err.message : 'Unknown error'}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  }, [selectedClient, aiTools]);

  const handleSend = useCallback(() => {
    if (!inputText.trim() || isLoading) return;

    const currentTool = selectedTool?.id || aiTools[0]?.id || 'intake';
    runAnalysis(currentTool, inputText.trim());
    setInputText('');
  }, [inputText, isLoading, selectedTool, aiTools, runAnalysis]);

  const handleQuickChip = useCallback((query: string) => {
    const currentTool = selectedTool?.id || aiTools[0]?.id || 'intake';
    runAnalysis(currentTool, query);
  }, [selectedTool, aiTools, runAnalysis]);

  const handleCopy = useCallback((text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  const handleBack = useCallback(() => {
    if (!showClientPicker) {
      setShowClientPicker(true);
    }
  }, [showClientPicker]);

  if (!isOpen) return null;

  const quickChips = selectedTool ? getQuickChips(template, selectedTool.id || selectedTool.title) : [];

  return (
    <>
      {/* Overlay */}
      <div style={styles.overlay} onClick={onClose} />

      {/* Panel */}
      <div style={styles.panel}>
        {/* Header */}
        <div style={styles.panelHeader}>
          <div style={styles.headerLeft}>
            <div style={styles.headerIcon}>
              <Wand2 size={18} />
            </div>
            <div>
              <div style={styles.headerTitle}>AI Assistant</div>
              <div style={styles.headerSubtitle}>
                {selectedClient ? selectedClient.name : 'Pilih klien terlebih dahulu'}
              </div>
            </div>
          </div>
          <button style={styles.closeBtn} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div style={styles.panelBody}>
          {showClientPicker ? (
            /* Client Picker */
            <div style={styles.clientPicker}>
              <div style={styles.pickerHeader}>
                <User size={16} />
                <span>Pilih {t.client}</span>
              </div>
              <div style={styles.clientSearch}>
                <input
                  type="text"
                  placeholder={`Cari ${t.client.toLowerCase()}...`}
                  style={styles.clientSearchInput}
                />
              </div>
              <div style={styles.clientList}>
                {clients.length === 0 ? (
                  <div style={styles.emptyClients}>
                    <User size={32} strokeWidth={1} />
                    <p>Belum ada {t.client.toLowerCase()} aktif</p>
                  </div>
                ) : (
                  clients.map((client) => {
                    const phase = template.phases.find(
                      (p) => p.id === client.phase || p.name === client.phase
                    );
                    return (
                      <button
                        key={client.id}
                        style={styles.clientItem}
                        onClick={() => handleSelectClient(client)}
                      >
                        <div
                          style={{
                            ...styles.clientAvatar,
                            background: phase?.color || '#5B9FFF',
                          }}
                        >
                          {client.name.charAt(0).toUpperCase()}
                        </div>
                        <div style={styles.clientInfo}>
                          <div style={styles.clientName}>{client.name}</div>
                          <div style={styles.clientGoal}>
                            {client.goal || 'No goal set'}
                          </div>
                        </div>
                        <ChevronRight size={16} color="var(--text-tertiary)" />
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          ) : (
            /* Chat Area */
            <>
              {/* Client Bar */}
              <div style={styles.clientBar}>
                <button style={styles.backBtn} onClick={handleBack}>
                  <ChevronRight size={14} style={{ transform: 'rotate(180deg)' }} />
                  <span>Ganti</span>
                </button>
                <div style={styles.clientBarInfo}>
                  {selectedClient && (
                    <>
                      <div
                        style={{
                          ...styles.clientBarAvatar,
                          background:
                            template.phases.find(
                              (p) =>
                                p.id === selectedClient.phase ||
                                p.name === selectedClient.phase
                            )?.color || '#5B9FFF',
                        }}
                      >
                        {selectedClient.name.charAt(0).toUpperCase()}
                      </div>
                      <span style={styles.clientBarName}>{selectedClient.name}</span>
                      {selectedClient.phase && (
                        <span style={styles.clientBarPhase}>{selectedClient.phase}</span>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Tool Selector */}
              <div style={styles.toolSelector}>
                <div style={styles.toolChips}>
                  {aiTools.map((tool) => (
                    <button
                      key={tool.id || tool.title}
                      style={{
                        ...styles.toolChip,
                        background:
                          selectedTool?.id === tool.id || selectedTool?.title === tool.title
                            ? 'linear-gradient(135deg, var(--fluent-blue), var(--fluent-purple))'
                            : 'var(--card-bg)',
                        color:
                          selectedTool?.id === tool.id || selectedTool?.title === tool.title
                            ? '#fff'
                            : 'var(--text-secondary)',
                      }}
                      onClick={() => {
                        setSelectedTool(tool);
                        setMessages([]);
                      }}
                    >
                      <Sparkles size={12} />
                      <span>{tool.title}</span>
                    </button>
                  ))}
                  <button
                    style={{
                      ...styles.toolChip,
                      background:
                        selectedTool?.id === 'followup'
                          ? 'linear-gradient(135deg, var(--fluent-blue), var(--fluent-purple))'
                          : 'var(--card-bg)',
                      color:
                        selectedTool?.id === 'followup' ? '#fff' : 'var(--text-secondary)',
                    }}
                    onClick={() => {
                      setSelectedTool({ id: 'followup', title: 'Follow-up WA', icon: 'MessageSquare', description: 'Buat pesan follow-up WhatsApp', prompt: () => '' });
                      setMessages([]);
                    }}
                  >
                    <MessageSquare size={12} />
                    <span>Follow-up WA</span>
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div style={styles.messagesArea}>
                {messages.length === 0 && (
                  <div style={styles.welcomeArea}>
                    <div style={styles.welcomeIcon}>
                      <Bot size={32} strokeWidth={1.5} />
                    </div>
                    <h3 style={styles.welcomeTitle}>
                      {selectedTool?.title || 'AI Assistant'}
                    </h3>
                    <p style={styles.welcomeDesc}>
                      {selectedTool?.description || 'Pilih tool dan mulai analisis klien Anda'}
                    </p>
                    {quickChips.length > 0 && (
                      <div style={styles.quickChips}>
                        {quickChips.map((chip, i) => (
                          <button
                            key={i}
                            style={styles.quickChip}
                            onClick={() => handleQuickChip(chip.query)}
                            disabled={isLoading}
                          >
                            {chip.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    style={{
                      ...styles.messageRow,
                      justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    }}
                  >
                    {msg.role === 'assistant' && (
                      <div style={styles.msgAvatar}>
                        <Wand2 size={14} />
                      </div>
                    )}
                    <div
                      style={{
                        ...styles.messageBubble,
                        background:
                          msg.role === 'user'
                            ? 'linear-gradient(135deg, var(--fluent-blue), var(--fluent-purple))'
                            : 'var(--card-bg)',
                        color: msg.role === 'user' ? '#fff' : 'var(--text-primary)',
                        border:
                          msg.role === 'assistant' ? '1px solid var(--card-stroke)' : 'none',
                      }}
                    >
                      <div
                        className="nevgo-markdown"
                        style={styles.msgContent}
                        dangerouslySetInnerHTML={{
                          __html: formatMarkdown(msg.content),
                        }}
                      />
                      {msg.role === 'assistant' && (
                        <button
                          style={styles.copyBtn}
                          onClick={() => handleCopy(msg.content, msg.id)}
                        >
                          {copiedId === msg.id ? (
                            <Check size={12} />
                          ) : (
                            <Copy size={12} />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div style={{ ...styles.messageRow, justifyContent: 'flex-start' }}>
                    <div style={styles.msgAvatar}>
                      <Wand2 size={14} />
                    </div>
                    <div style={styles.loadingBubble}>
                      <Loader2 size={16} className="animate-spin" />
                      <span>AI sedang menganalisis...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Chips (when messages exist) */}
              {messages.length > 0 && quickChips.length > 0 && !isLoading && (
                <div style={styles.bottomChips}>
                  {quickChips.map((chip, i) => (
                    <button
                      key={i}
                      style={styles.bottomChip}
                      onClick={() => handleQuickChip(chip.query)}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div style={styles.inputArea}>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder={
                    selectedClient
                      ? `Tanyakan sesuatu tentang ${selectedClient.name}...`
                      : 'Ketik pesan...'
                  }
                  style={styles.chatInput}
                  disabled={isLoading}
                />
                <button
                  style={{
                    ...styles.sendBtn,
                    opacity: inputText.trim() && !isLoading ? 1 : 0.5,
                  }}
                  onClick={handleSend}
                  disabled={!inputText.trim() || isLoading}
                >
                  <Send size={16} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

/* Simple markdown to HTML converter */
function formatMarkdown(text: string): string {
  let html = text
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Headers
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Unordered lists
    .replace(/^[•\-\*] (.+)$/gm, '<li>$1</li>')
    // Ordered lists
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    // Horizontal rule
    .replace(/^---$/gm, '<hr/>')
    // Line breaks
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br/>');

  // Wrap consecutive <li> items in <ul>
  html = html.replace(/((?:<li>.*?<\/li>(?:<br\/?>)?)+)/g, (match) => {
    return '<ul>' + match.replace(/<br\/?>/g, '') + '</ul>';
  });

  // Wrap in paragraph if not starting with a block element
  if (!html.startsWith('<h') && !html.startsWith('<ul') && !html.startsWith('<p')) {
    html = '<p>' + html + '</p>';
  }

  // Links
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" style="color:var(--fluent-blue);text-decoration:underline">$1</a>'
  );

  return html;
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'var(--overlay-bg)',
    zIndex: 200,
    backdropFilter: 'blur(4px)',
    animation: 'fadeIn 0.2s ease',
  },
  panel: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    width: 460,
    maxWidth: '100vw',
    background: 'var(--surface-primary)',
    borderLeft: '1px solid var(--border-primary)',
    zIndex: 201,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '-8px 0 30px rgba(0,0,0,0.15)',
    animation: 'slideInRight 0.3s cubic-bezier(0.8, 0, 0.2, 1)',
  },
  panelHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 20px',
    borderBottom: '1px solid var(--border-primary)',
    background: 'var(--surface-primary)',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  headerIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    background: 'linear-gradient(135deg, var(--fluent-blue), var(--fluent-purple))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: 'var(--text-primary)',
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'var(--text-tertiary)',
    maxWidth: 200,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    border: 'none',
    background: 'var(--card-bg)',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.15s',
  },
  panelBody: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },

  // Client Picker
  clientPicker: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: 16,
  },
  pickerHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 14,
    fontWeight: 600,
    color: 'var(--text-primary)',
    marginBottom: 12,
  },
  clientSearch: {
    marginBottom: 12,
  },
  clientSearchInput: {
    width: '100%',
    padding: '10px 14px',
    border: '1px solid var(--border-secondary)',
    borderRadius: 10,
    fontSize: 13,
    outline: 'none',
    background: 'var(--input-bg)',
    color: 'var(--text-primary)',
    fontFamily: 'inherit',
  },
  clientList: {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  emptyClients: {
    textAlign: 'center' as const,
    padding: '40px 16px',
    color: 'var(--text-tertiary)',
  },
  clientItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '10px 12px',
    borderRadius: 10,
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    textAlign: 'left' as const,
    width: '100%',
    fontFamily: 'inherit',
    transition: 'background 0.15s',
    color: 'var(--text-primary)',
  },
  clientAvatar: {
    width: 36,
    height: 36,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: 14,
    fontWeight: 700,
    flexShrink: 0,
  },
  clientInfo: {
    flex: 1,
    minWidth: 0,
  },
  clientName: {
    fontSize: 14,
    fontWeight: 600,
    color: 'var(--text-primary)',
  },
  clientGoal: {
    fontSize: 12,
    color: 'var(--text-tertiary)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
  },

  // Client Bar
  clientBar: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 16px',
    borderBottom: '1px solid var(--border-subtle)',
    background: 'var(--surface-tertiary)',
  },
  backBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    fontSize: 12,
    fontWeight: 500,
    color: 'var(--fluent-blue)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'inherit',
    padding: '4px 8px',
    borderRadius: 6,
  },
  clientBarInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  clientBarAvatar: {
    width: 24,
    height: 24,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: 11,
    fontWeight: 700,
  },
  clientBarName: {
    fontSize: 13,
    fontWeight: 600,
    color: 'var(--text-primary)',
  },
  clientBarPhase: {
    fontSize: 11,
    color: 'var(--text-tertiary)',
    background: 'var(--card-bg)',
    padding: '2px 8px',
    borderRadius: 6,
  },

  // Tool Selector
  toolSelector: {
    padding: '10px 16px',
    borderBottom: '1px solid var(--border-subtle)',
  },
  toolChips: {
    display: 'flex',
    gap: 6,
    overflowX: 'auto' as const,
    paddingBottom: 2,
  },
  toolChip: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    padding: '6px 12px',
    borderRadius: 8,
    border: '1px solid var(--card-stroke)',
    fontSize: 12,
    fontWeight: 600,
    cursor: 'pointer',
    whiteSpace: 'nowrap' as const,
    transition: 'all 0.15s',
    fontFamily: 'inherit',
  },

  // Messages
  messagesArea: {
    flex: 1,
    overflowY: 'auto',
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  welcomeArea: {
    textAlign: 'center' as const,
    padding: '40px 20px',
  },
  welcomeIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    background: 'linear-gradient(135deg, rgba(91,159,255,0.15), rgba(180,154,243,0.15))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px',
    color: 'var(--fluent-blue)',
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: 'var(--text-primary)',
    margin: '0 0 8px 0',
  },
  welcomeDesc: {
    fontSize: 13,
    color: 'var(--text-secondary)',
    margin: '0 0 20px 0',
    lineHeight: 1.5,
  },
  quickChips: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    justifyContent: 'center',
    gap: 8,
  },
  quickChip: {
    padding: '8px 16px',
    borderRadius: 8,
    border: '1px solid var(--border-primary)',
    background: 'var(--card-bg)',
    color: 'var(--text-primary)',
    fontSize: 12,
    fontWeight: 500,
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'all 0.15s',
  },
  messageRow: {
    display: 'flex',
    gap: 8,
    alignItems: 'flex-end',
  },
  msgAvatar: {
    width: 28,
    height: 28,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, var(--fluent-blue), var(--fluent-purple))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    flexShrink: 0,
  },
  messageBubble: {
    maxWidth: '85%',
    borderRadius: 12,
    padding: '10px 14px',
    position: 'relative' as const,
  },
  msgContent: {
    fontSize: 13,
    lineHeight: 1.6,
    wordBreak: 'break-word' as const,
  },
  copyBtn: {
    position: 'absolute' as const,
    top: 6,
    right: 6,
    width: 24,
    height: 24,
    borderRadius: 4,
    border: 'none',
    background: 'var(--card-stroke)',
    color: 'var(--text-tertiary)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity 0.15s',
  },
  loadingBubble: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '10px 14px',
    borderRadius: 12,
    background: 'var(--card-bg)',
    border: '1px solid var(--card-stroke)',
    color: 'var(--text-secondary)',
    fontSize: 13,
  },

  // Bottom Chips
  bottomChips: {
    display: 'flex',
    gap: 6,
    padding: '8px 16px',
    overflowX: 'auto' as const,
    borderTop: '1px solid var(--border-subtle)',
  },
  bottomChip: {
    padding: '6px 12px',
    borderRadius: 8,
    border: '1px solid var(--border-primary)',
    background: 'var(--card-bg)',
    color: 'var(--text-primary)',
    fontSize: 11,
    fontWeight: 500,
    cursor: 'pointer',
    whiteSpace: 'nowrap' as const,
    fontFamily: 'inherit',
  },

  // Input
  inputArea: {
    display: 'flex',
    gap: 8,
    padding: '12px 16px',
    borderTop: '1px solid var(--border-primary)',
    background: 'var(--surface-primary)',
  },
  chatInput: {
    flex: 1,
    padding: '10px 14px',
    border: '1px solid var(--border-secondary)',
    borderRadius: 10,
    fontSize: 13,
    outline: 'none',
    background: 'var(--input-bg)',
    color: 'var(--text-primary)',
    fontFamily: 'inherit',
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    border: 'none',
    background: 'linear-gradient(135deg, var(--fluent-blue), var(--fluent-purple))',
    color: '#fff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.15s',
  },
};
