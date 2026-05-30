'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import {
  Users, Brain, BarChart3, CalendarDays, BookOpen, Wand2,
  Target, TrendingUp, Shield, Zap, ChevronRight, ArrowRight,
  CheckCircle, Star, Menu, X, Moon, Sun, Sparkles, Layers,
  Clock, Heart, Lightbulb, Rocket, Eye, MessageCircle,
  PlayCircle, Award, Globe, Lock
} from 'lucide-react';
import { BRAND } from '@/lib/branding';
import { ThemeToggle } from '@/components/theme-toggle';

/* ─── Animated Counter Hook ─── */
function useCountUp(end: number, duration = 2000, start = 0) {
  const [count, setCount] = useState(start);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, end, duration, start]);

  return { count, ref };
}

/* ─── Section Visibility Hook ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

export default function LandingPage() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { value: 7, suffix: '+', label: 'Template Niche', icon: BookOpen },
    { value: 10, suffix: '+', label: 'AI Tools', icon: Wand2 },
    { value: 100, suffix: '%', label: 'Kustomisasi', icon: Layers },
    { value: 24, suffix: '/7', label: 'Akses Dimana Saja', icon: Globe },
  ];

  const features = [
    {
      icon: Users,
      title: 'Manajemen Klien',
      description: 'Kelola seluruh klien coaching dalam satu dashboard yang intuitif. Lacak progress, catat sesi, dan pantau perkembangan masing-masing klien secara real-time dengan visualisasi yang mudah dipahami.',
      color: '#5B9FFF',
      bg: 'rgba(91, 159, 255, 0.12)',
    },
    {
      icon: Wand2,
      title: 'AI Assistant',
      description: 'Dapatkan insight cerdas dari AI yang terlatih khusus untuk coaching. Dari analisis kepribadian klien hingga rekomendasi strategi sesi, AI assistant siap membantu Anda memberikan hasil terbaik.',
      color: '#B49AF3',
      bg: 'rgba(180, 154, 243, 0.12)',
    },
    {
      icon: BarChart3,
      title: 'Analytics Mendalam',
      description: 'Visualisasi data coaching yang komprehensif dengan chart interaktif. Pahami tren, identifikasi pola, dan buat keputusan berbasis data untuk meningkatkan efektivitas coaching Anda.',
      color: '#4CAF82',
      bg: 'rgba(76, 175, 130, 0.12)',
    },
    {
      icon: CalendarDays,
      title: 'Penjadwalan Cerdas',
      description: 'Atur jadwal sesi coaching dengan kalender visual yang terintegrasi. Tidak perlu lagi switching antar aplikasi, semua jadwal dan reminder ada dalam satu tempat yang praktis.',
      color: '#E8935D',
      bg: 'rgba(232, 147, 93, 0.12)',
    },
    {
      icon: BookOpen,
      title: '7 Template Niche',
      description: 'Pilih dari 7 template khusus: Manifestasi, Bisnis, Kesehatan, Karir, Relasi, Kreatif, atau Custom. Setiap template punya terminologi, fase, dan tools AI yang disesuaikan untuk niche Anda.',
      color: '#4DBCC9',
      bg: 'rgba(77, 188, 201, 0.12)',
    },
    {
      icon: Target,
      title: 'Goal Tracking',
      description: 'Tetapkan dan lacak goals klien dengan sistem tracking visual. Pantau milestone, ukur pencapaian, dan rayakan setiap kemajuan yang dicapai oleh klien coaching Anda.',
      color: '#F17F7F',
      bg: 'rgba(241, 127, 127, 0.12)',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Pilih Template Niche Anda',
      description: 'Mulai dengan memilih template yang paling sesuai dengan spesialisasi coaching Anda. Setiap template sudah dilengkapi dengan terminologi, fase coaching, dan AI tools yang dirancang khusus.',
      icon: BookOpen,
      color: '#5B9FFF',
    },
    {
      number: '02',
      title: 'Tambahkan Klien',
      description: 'Masukkan data klien dan tentukan fase coaching mereka. Sistem akan otomatis menyesuaikan tampilan dan tools yang tersedia berdasarkan template yang Anda pilih sebelumnya.',
      icon: Users,
      color: '#B49AF3',
    },
    {
      number: '03',
      title: 'Gunakan AI Assistant',
      description: 'Manfaatkan AI assistant untuk mendapatkan insight dan rekomendasi. AI akan menganalisis data klien dan memberikan saran yang personal untuk meningkatkan kualitas sesi coaching Anda.',
      icon: Wand2,
      color: '#4CAF82',
    },
    {
      number: '04',
      title: 'Pantau & Tingkatkan',
      description: 'Lacak progress klien melalui dashboard dan analytics. Identifikasi area yang perlu perhatian lebih, rayakan pencapaian, dan terus tingkatkan kualitas coaching Anda berdasarkan data.',
      icon: TrendingUp,
      color: '#E8935D',
    },
  ];

  const benefits = [
    {
      icon: Clock,
      title: 'Hemat Waktu 50%',
      text: 'Otomatisasi tugas administratif membebaskan waktu Anda untuk fokus pada coaching yang sesungguhnya, bukan mengurus spreadsheet dan catatan manual.',
    },
    {
      icon: Lightbulb,
      title: 'Insight Berbasis AI',
      text: 'Dapatkan analisis mendalam dan rekomendasi yang dipersonalisasi untuk setiap klien. AI membantu Anda melihat pola yang mungkin terlewat dalam observasi manual.',
    },
    {
      icon: Heart,
      title: 'Pengalaman Klien Premium',
      text: 'Berikan pengalaman coaching yang lebih terstruktur dan profesional. Klien akan merasa lebih terlayani dengan progress yang terlacak dan milestone yang jelas.',
    },
    {
      icon: Shield,
      title: 'Data Aman & Terorganisir',
      text: 'Semua catatan coaching, progress klien, dan data sensitif tersimpan aman dan terorganisir rapi. Tidak perlu lagi mencari-cari catatan di berbagai tempat.',
    },
  ];

  const advantages = [
    {
      icon: Zap,
      title: 'Dibangun Khusus untuk Coach',
      text: 'Bukan tools generik yang dipaksa untuk coaching. COACHFLO dirancang dari nol dengan memahami workflow dan kebutuhan unik seorang coach profesional.',
    },
    {
      icon: Layers,
      title: 'Template yang Beradaptasi',
      text: '7 template niche yang bukan sekadar label, tapi benar-benar mengubah keseluruhan pengalaman — terminologi, fase, tools AI, dan area fokus semuanya menyesuaikan.',
    },
    {
      icon: Sparkles,
      title: 'AI yang Kontekstual',
      text: 'AI assistant yang memahami konteks coaching, bukan chatbot generik. Setiap rekomendasi disesuaikan dengan niche dan fase coaching klien Anda.',
    },
    {
      icon: Award,
      title: 'Skalabel tanpa Batas',
      text: 'Dari 5 klien hingga 500 klien, COACHFLO tetap responsif dan terorganisir. Tumbuh bersama bisnis coaching Anda tanpa perlu pindah platform.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah K.',
      role: 'Life Coach',
      text: 'COACHFLO benar-benar mengubah cara saya mengelola klien. Dulu pakai spreadsheet, sekarang semuanya otomatis dan AI-nya sangat membantu!',
      rating: 5,
    },
    {
      name: 'Andi P.',
      role: 'Business Coach',
      text: 'Template bisnisnya very comprehensive. Saya bisa langsung pakai tanpa perlu kustomisasi banyak. Analytics-nya juga insightful banget.',
      rating: 5,
    },
    {
      name: 'Maya R.',
      role: 'Health & Wellness Coach',
      text: 'AI Assistant-nya game changer! Saya bisa dapat insight tentang klien bahkan sebelum sesi dimulai. Klien juga merasa lebih diperhatikan.',
      rating: 5,
    },
  ];

  return (
    <div style={styles.page}>
      {/* ─── Navbar ─── */}
      <nav style={{
        ...styles.navbar,
        background: scrolled ? 'var(--surface-primary)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--border-primary)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(30px)' : 'none',
        boxShadow: scrolled ? 'var(--shadow-04)' : 'none',
      }}>
        <div style={styles.navContent}>
          <div style={styles.navBrand}>
            <div style={styles.navLogo}>{BRAND.icon}</div>
            <span style={styles.navName}>{BRAND.name}</span>
          </div>
          <div style={{ ...styles.navLinks, ...(mobileMenu ? styles.navLinksMobile : {}) }}>
            <a href="#fitur" style={styles.navLink} onClick={() => setMobileMenu(false)}>Fitur</a>
            <a href="#cara-kerja" style={styles.navLink} onClick={() => setMobileMenu(false)}>Cara Kerja</a>
            <a href="#benefit" style={styles.navLink} onClick={() => setMobileMenu(false)}>Benefit</a>
            <a href="#keunggulan" style={styles.navLink} onClick={() => setMobileMenu(false)}>Keunggulan</a>
            <a href="#testimoni" style={styles.navLink} onClick={() => setMobileMenu(false)}>Testimoni</a>
          </div>
          <div style={styles.navActions}>
            <ThemeToggle />
            <Link href="/dashboard" style={styles.demoBtn}>
              <PlayCircle size={16} />
              Coba Demo
            </Link>
            <button
              style={styles.mobileMenuBtn}
              onClick={() => setMobileMenu(!mobileMenu)}
              aria-label="Toggle menu"
            >
              {mobileMenu ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {/* Mobile menu dropdown */}
        {mobileMenu && (
          <div style={styles.mobileDropdown}>
            <a href="#fitur" style={styles.mobileLink} onClick={() => setMobileMenu(false)}>Fitur</a>
            <a href="#cara-kerja" style={styles.mobileLink} onClick={() => setMobileMenu(false)}>Cara Kerja</a>
            <a href="#benefit" style={styles.mobileLink} onClick={() => setMobileMenu(false)}>Benefit</a>
            <a href="#keunggulan" style={styles.mobileLink} onClick={() => setMobileMenu(false)}>Keunggulan</a>
            <a href="#testimoni" style={styles.mobileLink} onClick={() => setMobileMenu(false)}>Testimoni</a>
            <Link href="/dashboard" style={{ ...styles.demoBtn, width: '100%', justifyContent: 'center', marginTop: 8 }} onClick={() => setMobileMenu(false)}>
              <PlayCircle size={16} />
              Coba Demo Sekarang
            </Link>
          </div>
        )}
      </nav>

      {/* ─── Hero Section ─── */}
      <section style={styles.hero}>
        <div style={styles.heroBgOrb1} />
        <div style={styles.heroBgOrb2} />
        <div style={styles.heroBgOrb3} />
        <div style={styles.heroContent}>
          <div style={styles.heroBadge}>
            <Sparkles size={14} />
            <span>Platform Coaching #1 di Indonesia</span>
          </div>
          <h1 style={styles.heroTitle}>
            Kelola Coaching Anda
            <br />
            <span style={styles.heroGradient}> dengan Lebih Cerdas</span>
          </h1>
          <p style={styles.heroSubtitle}>
            {BRAND.fullName} menggabungkan manajemen klien, AI assistant, dan analytics dalam satu platform yang dirancang khusus untuk coach profesional. Hemat waktu, tingkatkan hasil.
          </p>
          <div style={styles.heroButtons}>
            <Link href="/dashboard" style={styles.heroPrimaryBtn}>
              <PlayCircle size={18} />
              Coba Demo Gratis
              <ChevronRight size={16} style={{ marginLeft: 4 }} />
            </Link>
            <a href="#fitur" style={styles.heroSecondaryBtn}>
              Lihat Fitur
              <ArrowRight size={16} />
            </a>
          </div>

          {/* Stats row */}
          <div style={styles.heroStats}>
            {stats.map((stat) => (
              <HeroStatItem key={stat.label} stat={stat} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features Section ─── */}
      <section id="fitur" style={styles.section}>
        <FeatureSectionWrapper>
          <div style={styles.sectionHeader}>
            <div style={styles.sectionBadge}>
              <Layers size={14} />
              <span>Fitur Unggulan</span>
            </div>
            <h2 style={styles.sectionTitle}>Semua yang Anda Butuhkan <br /><span style={styles.gradientText}>dalam Satu Platform</span></h2>
            <p style={styles.sectionSubtitle}>COACHFLO menyediakan tools lengkap yang dirancang khusus untuk memenuhi kebutuhan coaching profesional modern.</p>
          </div>
          <div style={styles.featuresGrid}>
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <FeatureCard key={i} icon={Icon} title={f.title} description={f.description} color={f.color} bg={f.bg} delay={i * 0.1} />
              );
            })}
          </div>
        </FeatureSectionWrapper>
      </section>

      {/* ─── How It Works Section ─── */}
      <section id="cara-kerja" style={styles.sectionAlt}>
        <SectionWrapper>
          <div style={styles.sectionHeader}>
            <div style={{ ...styles.sectionBadge, background: 'rgba(232, 147, 93, 0.12)', color: '#E8935D', borderColor: 'rgba(232, 147, 93, 0.25)' }}>
              <Rocket size={14} />
              <span>Cara Kerja</span>
            </div>
            <h2 style={styles.sectionTitle}>Mulai dalam <span style={styles.gradientText}>4 Langkah Mudah</span></h2>
            <p style={styles.sectionSubtitle}>Tidak perlu setup rumit. Dari registrasi hingga sesi coaching pertama, semuanya bisa selesai dalam hitungan menit.</p>
          </div>
          <div style={styles.stepsGrid}>
            {steps.map((step, i) => (
              <StepCard key={i} step={step} index={i} isLast={i === steps.length - 1} />
            ))}
          </div>
        </SectionWrapper>
      </section>

      {/* ─── Benefits Section ─── */}
      <section id="benefit" style={styles.section}>
        <SectionWrapper>
          <div style={styles.sectionHeader}>
            <div style={{ ...styles.sectionBadge, background: 'rgba(76, 175, 130, 0.12)', color: '#4CAF82', borderColor: 'rgba(76, 175, 130, 0.25)' }}>
              <CheckCircle size={14} />
              <span>Benefit</span>
            </div>
            <h2 style={styles.sectionTitle}>Mengapa Coach Memilih <span style={styles.gradientText}>COACHFLO?</span></h2>
            <p style={styles.sectionSubtitle}>Setiap fitur dirancang untuk memberikan dampak nyata pada produktivitas dan kualitas coaching Anda.</p>
          </div>
          <div style={styles.benefitsGrid}>
            {benefits.map((b, i) => (
              <BenefitCard key={i} benefit={b} />
            ))}
          </div>
        </SectionWrapper>
      </section>

      {/* ─── Advantages Section ─── */}
      <section id="keunggulan" style={styles.sectionAlt}>
        <SectionWrapper>
          <div style={styles.sectionHeader}>
            <div style={{ ...styles.sectionBadge, background: 'rgba(180, 154, 243, 0.12)', color: '#B49AF3', borderColor: 'rgba(180, 154, 243, 0.25)' }}>
              <Award size={14} />
              <span>Keunggulan</span>
            </div>
            <h2 style={styles.sectionTitle}>Yang Membedakan COACHFLO <span style={styles.gradientText}>dari Yang Lain</span></h2>
            <p style={styles.sectionSubtitle}>Bukan sekadar tools manajemen. Ini adalah ekosistem coaching yang dirancang untuk mengerti kebutuhan Anda.</p>
          </div>
          <div style={styles.advantagesGrid}>
            {advantages.map((a, i) => (
              <AdvantageCard key={i} advantage={a} />
            ))}
          </div>
        </SectionWrapper>
      </section>

      {/* ─── Curiosity / Teaser Section ─── */}
      <section style={styles.curiositySection}>
        <div style={styles.curiosityBg} />
        <SectionWrapper>
          <div style={styles.curiosityContent}>
            <div style={styles.curiosityIcon}>
              <Eye size={32} />
            </div>
            <h2 style={styles.curiosityTitle}>Ingin Tahu Seperti Apa Coaching dengan AI?</h2>
            <p style={styles.curiosityText}>
              Bayangkan punya asisten yang bisa menganalisis kepribadian klien, merekomendasikan strategi sesi, dan melacak progress secara otomatis. Itu bukan impian — itu COACHFLO. Jangan biarkan kompetitor Anda lebih dulu menggunakannya.
            </p>
            <div style={styles.curiosityFeatures}>
              <div style={styles.curiosityFeature}>
                <Lock size={16} />
                <span>Analisis Kepribadian AI</span>
              </div>
              <div style={styles.curiosityFeature}>
                <Sparkles size={16} />
                <span>Rekomendasi Strategi Sesi</span>
              </div>
              <div style={styles.curiosityFeature}>
                <Brain size={16} />
                <span>Smart Goal Tracking</span>
              </div>
              <div style={styles.curiosityFeature}>
                <MessageCircle size={16} />
                <span>Chat AI Kontekstual</span>
              </div>
            </div>
            <Link href="/dashboard" style={styles.curiosityBtn}>
              <Rocket size={18} />
              Buka Demo Sekarang — Gratis!
              <ChevronRight size={16} />
            </Link>
            <p style={styles.curiosityNote}>Tanpa kartu kredit. Tanpa install. Langsung coba di browser.</p>
          </div>
        </SectionWrapper>
      </section>

      {/* ─── Testimonials ─── */}
      <section id="testimoni" style={styles.section}>
        <SectionWrapper>
          <div style={styles.sectionHeader}>
            <div style={{ ...styles.sectionBadge, background: 'rgba(241, 127, 127, 0.12)', color: '#F17F7F', borderColor: 'rgba(241, 127, 127, 0.25)' }}>
              <Star size={14} />
              <span>Testimoni</span>
            </div>
            <h2 style={styles.sectionTitle}>Dipercaya oleh Coach <span style={styles.gradientText}>di Seluruh Indonesia</span></h2>
          </div>
          <div style={styles.testimonialsGrid}>
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} testimonial={t} />
            ))}
          </div>
        </SectionWrapper>
      </section>

      {/* ─── Final CTA ─── */}
      <section style={styles.finalCta}>
        <div style={styles.finalCtaBg} />
        <SectionWrapper>
          <div style={styles.finalCtaContent}>
            <h2 style={styles.finalCtaTitle}>Siap Mengubah Cara Anda Coaching?</h2>
            <p style={styles.finalCtaText}>Bergabung dengan ratusan coach yang sudah meningkatkan produktivitas mereka dengan COACHFLO. Mulai sekarang, gratis.</p>
            <div style={styles.finalCtaButtons}>
              <Link href="/dashboard" style={styles.finalCtaPrimaryBtn}>
                <PlayCircle size={18} />
                Mulai Demo Gratis
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </SectionWrapper>
      </section>

      {/* ─── Footer ─── */}
      <footer style={styles.footer}>
        <SectionWrapper>
          <div style={styles.footerContent}>
            <div style={styles.footerBrand}>
              <div style={styles.footerLogo}>{BRAND.icon}</div>
              <div>
                <div style={styles.footerName}>{BRAND.name}</div>
                <div style={styles.footerTagline}>{BRAND.tagline}</div>
              </div>
            </div>
            <div style={styles.footerLinks}>
              <a href="#fitur" style={styles.footerLink}>Fitur</a>
              <a href="#cara-kerja" style={styles.footerLink}>Cara Kerja</a>
              <a href="#benefit" style={styles.footerLink}>Benefit</a>
              <a href="#keunggulan" style={styles.footerLink}>Keunggulan</a>
            </div>
            <div style={styles.footerCopy}>
              &copy; 2025 {BRAND.name}. All rights reserved.
            </div>
          </div>
        </SectionWrapper>
      </footer>
    </div>
  );
}

/* ─── Hero Stat Item (uses useCountUp hook) ─── */
function HeroStatItem({ stat }: { stat: { value: number; suffix: string; label: string; icon: React.ElementType } }) {
  const { count, ref } = useCountUp(stat.value);
  const Icon = stat.icon;
  return (
    <div ref={ref} style={styles.heroStatItem}>
      <Icon size={20} style={{ color: 'var(--fluent-blue)', marginBottom: 6 }} />
      <div style={styles.heroStatValue}>{count}{stat.suffix}</div>
      <div style={styles.heroStatLabel}>{stat.label}</div>
    </div>
  );
}

/* ─── Step Card (uses useInView hook) ─── */
function StepCard({ step, index, isLast }: { step: { number: string; title: string; description: string; icon: React.ElementType; color: string }; index: number; isLast: boolean }) {
  const Icon = step.icon;
  const { ref, visible } = useInView(0.2);
  return (
    <div
      ref={ref}
      style={{
        ...styles.stepCard,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `all 0.6s cubic-bezier(0.8, 0, 0.2, 1) ${index * 0.15}s`,
      }}
    >
      <div style={{ ...styles.stepNumber, color: step.color, borderColor: step.color + '30', background: step.color + '12' }}>
        {step.number}
      </div>
      <div style={{ ...styles.stepIcon, color: step.color }}>
        <Icon size={28} />
      </div>
      <h3 style={styles.stepTitle}>{step.title}</h3>
      <p style={styles.stepDesc}>{step.description}</p>
      {!isLast && (
        <div style={styles.stepConnector}>
          <ChevronRight size={20} style={{ color: step.color }} />
        </div>
      )}
    </div>
  );
}

/* ─── Benefit Card (uses useInView hook) ─── */
function BenefitCard({ benefit: b }: { benefit: { icon: React.ElementType; title: string; text: string } }) {
  const Icon = b.icon;
  const { ref, visible } = useInView(0.2);
  return (
    <div
      ref={ref}
      style={{
        ...styles.benefitCard,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `all 0.6s cubic-bezier(0.8, 0, 0.2, 1)`,
      }}
    >
      <div style={styles.benefitIcon}>
        <Icon size={24} />
      </div>
      <div>
        <h3 style={styles.benefitTitle}>{b.title}</h3>
        <p style={styles.benefitText}>{b.text}</p>
      </div>
    </div>
  );
}

/* ─── Advantage Card (uses useInView hook) ─── */
function AdvantageCard({ advantage: a }: { advantage: { icon: React.ElementType; title: string; text: string } }) {
  const Icon = a.icon;
  const { ref, visible } = useInView(0.2);
  return (
    <div
      ref={ref}
      style={{
        ...styles.advantageCard,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
        transition: `all 0.6s cubic-bezier(0.8, 0, 0.2, 1)`,
      }}
    >
      <div style={styles.advantageIconWrap}>
        <Icon size={24} />
      </div>
      <h3 style={styles.advantageTitle}>{a.title}</h3>
      <p style={styles.advantageText}>{a.text}</p>
    </div>
  );
}

/* ─── Testimonial Card (uses useInView hook) ─── */
function TestimonialCard({ testimonial: t }: { testimonial: { name: string; role: string; text: string; rating: number } }) {
  const { ref, visible } = useInView(0.2);
  return (
    <div
      ref={ref}
      style={{
        ...styles.testimonialCard,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `all 0.6s cubic-bezier(0.8, 0, 0.2, 1)`,
      }}
    >
      <div style={styles.testimonialStars}>
        {Array(t.rating).fill(0).map((_, j) => (
          <Star key={j} size={16} fill="#FBBF24" color="#FBBF24" />
        ))}
      </div>
      <p style={styles.testimonialText}>&ldquo;{t.text}&rdquo;</p>
      <div style={styles.testimonialAuthor}>
        <div style={styles.testimonialAvatar}>{t.name.charAt(0)}</div>
        <div>
          <div style={styles.testimonialName}>{t.name}</div>
          <div style={styles.testimonialRole}>{t.role}</div>
        </div>
      </div>
    </div>
  );
}

/* ─── Feature Card Component ─── */
function FeatureCard({ icon: Icon, title, description, color, bg, delay }: {
  icon: React.ElementType; title: string; description: string; color: string; bg: string; delay: number;
}) {
  const { ref, visible } = useInView(0.15);
  return (
    <div
      ref={ref}
      style={{
        ...styles.featureCard,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `all 0.6s cubic-bezier(0.8, 0, 0.2, 1) ${delay}s`,
      }}
    >
      <div style={{ ...styles.featureIcon, background: bg, color }}>
        <Icon size={26} />
      </div>
      <h3 style={styles.featureTitle}>{title}</h3>
      <p style={styles.featureDesc}>{description}</p>
    </div>
  );
}

/* ─── Layout Helpers ─── */
function SectionWrapper({ children }: { children: React.ReactNode }) {
  return <div style={styles.sectionInner}>{children}</div>;
}

function FeatureSectionWrapper({ children }: { children: React.ReactNode }) {
  return <div style={styles.sectionInner}>{children}</div>;
}

/* ─── Styles ─── */
const styles: Record<string, React.CSSProperties> = {
  page: {
    fontFamily: "'DM Sans', -apple-system, sans-serif",
    background: 'var(--surface-secondary)',
    color: 'var(--text-primary)',
    overflowX: 'hidden',
    minHeight: '100vh',
  },

  /* Navbar */
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    padding: '0 24px',
    transition: 'all 0.3s cubic-bezier(0.8, 0, 0.2, 1)',
  },
  navContent: {
    maxWidth: 1200,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 64,
  },
  navBrand: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  navLogo: {
    width: 36,
    height: 36,
    borderRadius: 10,
    background: 'linear-gradient(135deg, var(--fluent-blue), var(--fluent-purple))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontWeight: 800,
    fontSize: 18,
    boxShadow: '0 2px 8px rgba(76, 141, 255, 0.3)',
  },
  navName: {
    fontSize: 20,
    fontWeight: 800,
    color: 'var(--text-primary)',
    letterSpacing: '-0.5px',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: 28,
  },
  navLinksMobile: {},
  navLink: {
    fontSize: 14,
    fontWeight: 600,
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    transition: 'color 0.15s',
  },
  navActions: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  demoBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 18px',
    background: 'linear-gradient(135deg, var(--fluent-blue), var(--fluent-purple))',
    color: '#fff',
    fontSize: 14,
    fontWeight: 600,
    borderRadius: 10,
    textDecoration: 'none',
    transition: 'all 0.2s',
    boxShadow: '0 2px 8px rgba(76, 141, 255, 0.3)',
  },
  mobileMenuBtn: {
    display: 'none',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'var(--text-primary)',
    padding: 8,
  },
  mobileDropdown: {
    display: 'none',
    flexDirection: 'column',
    gap: 4,
    padding: '12px 16px',
    background: 'var(--surface-primary)',
    borderBottom: '1px solid var(--border-primary)',
  },
  mobileLink: {
    padding: '10px 12px',
    fontSize: 14,
    fontWeight: 600,
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    borderRadius: 8,
  },

  /* Hero */
  hero: {
    position: 'relative',
    paddingTop: 120,
    paddingBottom: 80,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '90vh',
  },
  heroBgOrb1: {
    position: 'absolute',
    top: '-20%',
    left: '-10%',
    width: 600,
    height: 600,
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(91, 159, 255, 0.15) 0%, transparent 70%)',
    pointerEvents: 'none',
    animation: 'float 8s ease-in-out infinite',
  },
  heroBgOrb2: {
    position: 'absolute',
    bottom: '-15%',
    right: '-5%',
    width: 500,
    height: 500,
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(180, 154, 243, 0.12) 0%, transparent 70%)',
    pointerEvents: 'none',
    animation: 'float 10s ease-in-out infinite reverse',
  },
  heroBgOrb3: {
    position: 'absolute',
    top: '30%',
    right: '20%',
    width: 300,
    height: 300,
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(77, 188, 201, 0.1) 0%, transparent 70%)',
    pointerEvents: 'none',
    animation: 'float 12s ease-in-out infinite',
  },
  heroContent: {
    position: 'relative',
    zIndex: 1,
    maxWidth: 800,
    textAlign: 'center',
    padding: '0 24px',
    margin: '0 auto',
  },
  heroBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '6px 16px',
    background: 'rgba(91, 159, 255, 0.1)',
    border: '1px solid rgba(91, 159, 255, 0.2)',
    borderRadius: 9999,
    color: 'var(--fluent-blue)',
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 24,
    animation: 'slideUp 0.6s cubic-bezier(0.8, 0, 0.2, 1)',
  },
  heroTitle: {
    fontSize: 'clamp(36px, 6vw, 64px)',
    fontWeight: 800,
    lineHeight: 1.1,
    color: 'var(--text-primary)',
    margin: '0 0 20px 0',
    letterSpacing: '-1px',
    animation: 'slideUp 0.6s cubic-bezier(0.8, 0, 0.2, 1) 0.1s backwards',
  },
  heroGradient: {
    background: 'linear-gradient(135deg, var(--fluent-blue), var(--fluent-purple))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  heroSubtitle: {
    fontSize: 'clamp(16px, 2vw, 20px)',
    color: 'var(--text-secondary)',
    lineHeight: 1.6,
    maxWidth: 600,
    margin: '0 auto 36px auto',
    animation: 'slideUp 0.6s cubic-bezier(0.8, 0, 0.2, 1) 0.2s backwards',
  },
  heroButtons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    flexWrap: 'wrap',
    animation: 'slideUp 0.6s cubic-bezier(0.8, 0, 0.2, 1) 0.3s backwards',
  },
  heroPrimaryBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '14px 28px',
    background: 'linear-gradient(135deg, var(--fluent-blue), var(--fluent-purple))',
    color: '#fff',
    fontSize: 16,
    fontWeight: 700,
    borderRadius: 14,
    textDecoration: 'none',
    transition: 'all 0.2s',
    boxShadow: '0 4px 16px rgba(76, 141, 255, 0.3)',
  },
  heroSecondaryBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '14px 28px',
    background: 'var(--surface-primary)',
    color: 'var(--text-primary)',
    fontSize: 16,
    fontWeight: 700,
    borderRadius: 14,
    textDecoration: 'none',
    border: '1px solid var(--border-primary)',
    transition: 'all 0.2s',
    boxShadow: 'var(--shadow-04)',
  },
  heroStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 24,
    marginTop: 64,
    padding: '28px 32px',
    background: 'var(--surface-primary)',
    border: '1px solid var(--border-primary)',
    borderRadius: 20,
    boxShadow: 'var(--shadow-08)',
    animation: 'slideUp 0.6s cubic-bezier(0.8, 0, 0.2, 1) 0.4s backwards',
  },
  heroStatItem: {
    textAlign: 'center',
  },
  heroStatValue: {
    fontSize: 28,
    fontWeight: 800,
    background: 'linear-gradient(135deg, var(--fluent-blue), var(--fluent-purple))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    lineHeight: 1.2,
  },
  heroStatLabel: {
    fontSize: 12,
    color: 'var(--text-secondary)',
    fontWeight: 600,
    marginTop: 4,
  },

  /* Sections */
  section: {
    padding: '80px 24px',
    position: 'relative',
  },
  sectionAlt: {
    padding: '80px 24px',
    background: 'var(--surface-primary)',
    position: 'relative',
  },
  sectionInner: {
    maxWidth: 1200,
    margin: '0 auto',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: 56,
  },
  sectionBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '6px 14px',
    background: 'rgba(91, 159, 255, 0.1)',
    border: '1px solid rgba(91, 159, 255, 0.2)',
    borderRadius: 9999,
    color: 'var(--fluent-blue)',
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 'clamp(28px, 4vw, 42px)',
    fontWeight: 800,
    color: 'var(--text-primary)',
    letterSpacing: '-0.5px',
    lineHeight: 1.2,
    marginBottom: 16,
  },
  gradientText: {
    background: 'linear-gradient(135deg, var(--fluent-blue), var(--fluent-purple))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  sectionSubtitle: {
    fontSize: 17,
    color: 'var(--text-secondary)',
    maxWidth: 600,
    margin: '0 auto',
    lineHeight: 1.6,
  },

  /* Features Grid */
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 24,
  },
  featureCard: {
    background: 'var(--surface-primary)',
    border: '1px solid var(--border-primary)',
    borderRadius: 20,
    padding: 32,
    transition: 'all 0.3s cubic-bezier(0.8, 0, 0.2, 1)',
    cursor: 'default',
  },
  featureIcon: {
    width: 56,
    height: 56,
    borderRadius: 14,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: 10,
  },
  featureDesc: {
    fontSize: 14,
    color: 'var(--text-secondary)',
    lineHeight: 1.65,
  },

  /* Steps */
  stepsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 24,
    position: 'relative',
  },
  stepCard: {
    background: 'var(--surface-secondary)',
    border: '1px solid var(--border-primary)',
    borderRadius: 20,
    padding: 28,
    textAlign: 'center',
    position: 'relative',
  },
  stepNumber: {
    fontSize: 12,
    fontWeight: 800,
    padding: '4px 12px',
    borderRadius: 9999,
    border: '1px solid',
    display: 'inline-block',
    marginBottom: 16,
  },
  stepIcon: {
    marginBottom: 16,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: 10,
  },
  stepDesc: {
    fontSize: 13,
    color: 'var(--text-secondary)',
    lineHeight: 1.6,
  },
  stepConnector: {
    position: 'absolute',
    right: -16,
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 2,
  },

  /* Benefits */
  benefitsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 24,
  },
  benefitCard: {
    background: 'var(--surface-primary)',
    border: '1px solid var(--border-primary)',
    borderRadius: 20,
    padding: 32,
    display: 'flex',
    gap: 20,
    alignItems: 'flex-start',
  },
  benefitIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    background: 'linear-gradient(135deg, rgba(76, 175, 130, 0.12), rgba(91, 159, 255, 0.12))',
    color: 'var(--fluent-green)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  benefitTitle: {
    fontSize: 17,
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: 8,
  },
  benefitText: {
    fontSize: 14,
    color: 'var(--text-secondary)',
    lineHeight: 1.65,
  },

  /* Advantages */
  advantagesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 24,
  },
  advantageCard: {
    background: 'var(--surface-secondary)',
    border: '1px solid var(--border-primary)',
    borderRadius: 20,
    padding: 32,
    textAlign: 'center',
  },
  advantageIconWrap: {
    width: 60,
    height: 60,
    borderRadius: 16,
    background: 'linear-gradient(135deg, rgba(180, 154, 243, 0.12), rgba(91, 159, 255, 0.12))',
    color: 'var(--fluent-purple)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px auto',
  },
  advantageTitle: {
    fontSize: 17,
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: 10,
  },
  advantageText: {
    fontSize: 14,
    color: 'var(--text-secondary)',
    lineHeight: 1.65,
  },

  /* Curiosity / Teaser */
  curiositySection: {
    position: 'relative',
    padding: '80px 24px',
    overflow: 'hidden',
  },
  curiosityBg: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(135deg, rgba(91, 159, 255, 0.08), rgba(180, 154, 243, 0.08))',
    pointerEvents: 'none',
  },
  curiosityContent: {
    position: 'relative',
    zIndex: 1,
    maxWidth: 700,
    textAlign: 'center',
    margin: '0 auto',
  },
  curiosityIcon: {
    width: 72,
    height: 72,
    borderRadius: 20,
    background: 'linear-gradient(135deg, var(--fluent-blue), var(--fluent-purple))',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 24px auto',
    boxShadow: '0 8px 32px rgba(76, 141, 255, 0.3)',
  },
  curiosityTitle: {
    fontSize: 'clamp(24px, 4vw, 36px)',
    fontWeight: 800,
    color: 'var(--text-primary)',
    marginBottom: 16,
    letterSpacing: '-0.5px',
  },
  curiosityText: {
    fontSize: 17,
    color: 'var(--text-secondary)',
    lineHeight: 1.7,
    marginBottom: 32,
  },
  curiosityFeatures: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 12,
    marginBottom: 36,
    maxWidth: 500,
    margin: '0 auto 36px auto',
  },
  curiosityFeature: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '10px 16px',
    background: 'var(--surface-primary)',
    border: '1px solid var(--border-primary)',
    borderRadius: 12,
    fontSize: 13,
    fontWeight: 600,
    color: 'var(--text-primary)',
  },
  curiosityBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '16px 32px',
    background: 'linear-gradient(135deg, var(--fluent-blue), var(--fluent-purple))',
    color: '#fff',
    fontSize: 17,
    fontWeight: 700,
    borderRadius: 16,
    textDecoration: 'none',
    transition: 'all 0.2s',
    boxShadow: '0 4px 20px rgba(76, 141, 255, 0.35)',
  },
  curiosityNote: {
    fontSize: 13,
    color: 'var(--text-tertiary)',
    marginTop: 16,
    fontWeight: 500,
  },

  /* Testimonials */
  testimonialsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 24,
  },
  testimonialCard: {
    background: 'var(--surface-primary)',
    border: '1px solid var(--border-primary)',
    borderRadius: 20,
    padding: 28,
  },
  testimonialStars: {
    display: 'flex',
    gap: 4,
    marginBottom: 16,
  },
  testimonialText: {
    fontSize: 15,
    color: 'var(--text-secondary)',
    lineHeight: 1.7,
    marginBottom: 20,
    fontStyle: 'italic',
  },
  testimonialAuthor: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  testimonialAvatar: {
    width: 40,
    height: 40,
    borderRadius: 12,
    background: 'linear-gradient(135deg, var(--fluent-blue), var(--fluent-purple))',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: 16,
  },
  testimonialName: {
    fontSize: 14,
    fontWeight: 700,
    color: 'var(--text-primary)',
  },
  testimonialRole: {
    fontSize: 12,
    color: 'var(--text-tertiary)',
    fontWeight: 600,
  },

  /* Final CTA */
  finalCta: {
    position: 'relative',
    padding: '80px 24px',
    overflow: 'hidden',
  },
  finalCtaBg: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(135deg, rgba(76, 141, 255, 0.06), rgba(157, 126, 232, 0.06))',
    pointerEvents: 'none',
  },
  finalCtaContent: {
    position: 'relative',
    zIndex: 1,
    textAlign: 'center',
    maxWidth: 600,
    margin: '0 auto',
  },
  finalCtaTitle: {
    fontSize: 'clamp(28px, 4vw, 40px)',
    fontWeight: 800,
    color: 'var(--text-primary)',
    marginBottom: 16,
    letterSpacing: '-0.5px',
  },
  finalCtaText: {
    fontSize: 17,
    color: 'var(--text-secondary)',
    lineHeight: 1.6,
    marginBottom: 36,
  },
  finalCtaButtons: {
    display: 'flex',
    justifyContent: 'center',
  },
  finalCtaPrimaryBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '16px 32px',
    background: 'linear-gradient(135deg, var(--fluent-blue), var(--fluent-purple))',
    color: '#fff',
    fontSize: 17,
    fontWeight: 700,
    borderRadius: 16,
    textDecoration: 'none',
    transition: 'all 0.2s',
    boxShadow: '0 4px 20px rgba(76, 141, 255, 0.35)',
  },

  /* Footer */
  footer: {
    padding: '40px 24px',
    borderTop: '1px solid var(--border-primary)',
    background: 'var(--surface-primary)',
  },
  footerContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 24,
  },
  footerBrand: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  footerLogo: {
    width: 32,
    height: 32,
    borderRadius: 8,
    background: 'linear-gradient(135deg, var(--fluent-blue), var(--fluent-purple))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontWeight: 800,
    fontSize: 16,
  },
  footerName: {
    fontSize: 18,
    fontWeight: 800,
    color: 'var(--text-primary)',
  },
  footerTagline: {
    fontSize: 12,
    color: 'var(--text-tertiary)',
    fontWeight: 600,
  },
  footerLinks: {
    display: 'flex',
    gap: 24,
  },
  footerLink: {
    fontSize: 14,
    fontWeight: 600,
    color: 'var(--text-secondary)',
    textDecoration: 'none',
  },
  footerCopy: {
    fontSize: 13,
    color: 'var(--text-tertiary)',
    fontWeight: 500,
  },
};
