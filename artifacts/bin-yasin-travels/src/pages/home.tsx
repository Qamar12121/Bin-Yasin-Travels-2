import React, { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "@/App";
import {
  motion, useScroll, useTransform, AnimatePresence,
  useMotionValue, useSpring, useInView
} from "framer-motion";
import {
  Moon, Sun, MapPin, Phone, Mail, Clock, ChevronRight,
  CheckCircle2, Plane, Globe, Shield, HeartHandshake, X, Menu, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const WHATSAPP_NUMBER = "923018780888";
const WA_SVG = (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

/* ── Animated Counter ── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 20);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── 3D Tilt Card ── */
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current!.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Floating Orb ── */
function Orb({ style }: { style: React.CSSProperties }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      animate={{ y: [0, -30, 0], opacity: [0.15, 0.3, 0.15] }}
      transition={{ duration: 6 + Math.random() * 4, repeat: Infinity, ease: "easeInOut" }}
      style={style}
    />
  );
}

/* ── Logo ── */
const Logo = () => (
  <div className="flex items-center gap-2">
    <svg width="40" height="40" viewBox="0 0 100 100" fill="none">
      <path d="M50 10C27.9086 10 10 27.9086 10 50C10 72.0914 27.9086 90 50 90C67.6596 90 82.6517 78.5529 88.0827 62.5C85.5492 63.313 82.8252 63.75 80 63.75C60.67 63.75 45 48.08 45 28.75C45 20.0076 48.188 12.0088 53.4079 5.86435C52.2872 5.72266 51.1494 5.64917 50 5.64917V10Z" fill="currentColor" className="text-primary" />
      <path d="M60 40 L90 20 L95 25 L75 50 L85 80 L75 85 L60 60 L40 60 L20 80 L15 75 L35 45 L25 20 L30 15 L50 35 L60 40Z" fill="hsl(var(--secondary))" opacity="0.9" />
    </svg>
    <div className="flex flex-col">
      <span className="font-serif font-bold text-xl leading-none tracking-wide text-foreground">Bin Yasin</span>
      <span className="text-[0.65rem] tracking-[0.2em] uppercase text-primary font-semibold">Travels</span>
    </div>
  </div>
);

/* ── Booking Modal ── */
const ALL_SERVICES = [
  { label: "Silver Package — PKR 1,85,000", value: "Silver Package" },
  { label: "Gold Package — PKR 2,65,000", value: "Gold Package" },
  { label: "Platinum VIP — PKR 3,90,000", value: "Platinum VIP" },
  { label: "Hajj Services", value: "Hajj Services" },
  { label: "Worldwide Ticketing", value: "Worldwide Ticketing" },
  { label: "UAE Visit Visa", value: "UAE Visit Visa" },
  { label: "UK Visit Visa", value: "UK Visit Visa" },
  { label: "Schengen Visa", value: "Schengen Visa" },
  { label: "Saudi Arabia Visa", value: "Saudi Arabia Visa" },
  { label: "General Inquiry", value: "General Inquiry" },
];

function BookingModal({ packageName, onClose }: { packageName: string; onClose: () => void }) {
  const [form, setForm] = useState({
    name: "", phone: "", email: "", persons: "1",
    travelDate: "", message: "", selectedPackage: packageName,
  });
  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      "*✈️ New Booking Request — Bin Yasin Travels*", "",
      `*📦 Service:* ${form.selectedPackage}`,
      `*👤 Name:* ${form.name}`,
      `*📞 Phone:* ${form.phone}`,
      `*📧 Email:* ${form.email || "N/A"}`,
      `*👥 Persons:* ${form.persons}`,
      `*📅 Travel Date:* ${form.travelDate}`,
      `*💬 Message:* ${form.message || "None"}`,
    ].join("\n");
    window.open(`https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(lines)}`, "_blank");
    onClose();
  };

  const serviceInfo = ALL_SERVICES.find(s => s.value === form.selectedPackage);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 40 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-card text-card-foreground rounded-2xl shadow-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto border border-primary/40"
        style={{ boxShadow: "0 0 60px rgba(201,168,76,0.15), 0 25px 50px rgba(0,0,0,0.4)" }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border px-6 py-4 flex items-start justify-between z-10 rounded-t-2xl">
          <div className="flex-1">
            <h3 className="font-serif text-2xl font-bold text-foreground">Book Your Journey</h3>
            {serviceInfo && (
              <div className="mt-2 inline-flex items-center gap-2 bg-primary/15 border border-primary/30 rounded-full px-3 py-1">
                <Star className="w-3.5 h-3.5 text-primary fill-primary" />
                <span className="text-primary text-xs font-bold">{serviceInfo.label}</span>
              </div>
            )}
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-muted transition-colors ml-2 shrink-0">
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        <form onSubmit={submit} className="p-6 space-y-4">
          {/* Auto-detected service selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Service / Package</label>
            <select
              name="selectedPackage" value={form.selectedPackage} onChange={change}
              className="w-full h-11 px-3 bg-background border border-primary/40 rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium"
            >
              {ALL_SERVICES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
            <p className="text-[11px] text-primary font-medium">✓ Auto-filled based on your selection</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Full Name *</label>
              <Input name="name" required placeholder="Your full name" value={form.name} onChange={change}
                className="h-11 bg-background border-border focus-visible:ring-primary rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Phone *</label>
              <Input name="phone" required placeholder="+92 300 0000000" value={form.phone} onChange={change}
                className="h-11 bg-background border-border focus-visible:ring-primary rounded-xl" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Email</label>
              <Input name="email" type="email" placeholder="you@email.com" value={form.email} onChange={change}
                className="h-11 bg-background border-border focus-visible:ring-primary rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Persons *</label>
              <Input name="persons" required type="number" min="1" placeholder="1" value={form.persons} onChange={change}
                className="h-11 bg-background border-border focus-visible:ring-primary rounded-xl" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Travel Date *</label>
            <Input name="travelDate" required type="date" value={form.travelDate} onChange={change}
              className="h-11 bg-background border-border focus-visible:ring-primary rounded-xl" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Special Requests</label>
            <Textarea name="message" placeholder="Any special requirements..." value={form.message} onChange={change}
              className="min-h-[80px] bg-background border-border focus-visible:ring-primary resize-none rounded-xl" />
          </div>
          <button type="submit"
            className="w-full h-14 bg-green-500 hover:bg-green-600 active:scale-95 text-white font-bold rounded-xl text-base flex items-center justify-center gap-3 transition-all shadow-lg shadow-green-500/30"
          >
            {WA_SVG} Complete Booking via WhatsApp
          </button>
          <p className="text-[11px] text-center text-muted-foreground">
            Your details will be sent directly to our team for instant confirmation.
          </p>
        </form>
      </motion.div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════ MAIN PAGE ══ */
export default function Home() {
  const { theme, setTheme } = useContext(ThemeContext);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [booking, setBooking] = useState<{ open: boolean; pkg: string }>({ open: false, pkg: "" });
  const { scrollYProgress } = useScroll();
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 180]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const open = (pkg: string) => setBooking({ open: true, pkg });
  const close = () => setBooking({ open: false, pkg: "" });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  };

  const navLinks = [
    { label: "About", id: "about-our-story" },
    { label: "Gallery", id: "gallery" },
    { label: "Packages", id: "packages" },
    { label: "Services", id: "services" },
    { label: "Contact", id: "contact-us" },
  ];

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const lines = [
      "*📩 General Inquiry — Bin Yasin Travels*", "",
      `*Name:* ${fd.get("name") || "N/A"}`,
      `*Phone:* ${fd.get("phone") || "N/A"}`,
      `*Email:* ${fd.get("email") || "N/A"}`,
      `*Service:* ${fd.get("service") || "N/A"}`,
      `*Message:* ${fd.get("message") || "N/A"}`,
    ].join("\n");
    window.open(`https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(lines)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-x-hidden">

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-primary via-yellow-400 to-primary z-[60] origin-left"
        style={{ width: progressWidth }}
      />

      {/* Booking Modal */}
      <AnimatePresence>
        {booking.open && <BookingModal packageName={booking.pkg} onClose={close} />}
      </AnimatePresence>

      {/* ── NAVBAR ── */}
      <header className={`fixed top-[3px] w-full z-50 transition-all duration-500 ${scrolled
        ? "bg-background/80 backdrop-blur-xl border-b border-primary/10 shadow-lg shadow-black/10 py-3"
        : "bg-transparent py-5"}`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><Logo /></button>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(item => (
              <button key={item.id} onClick={() => scrollTo(item.id)}
                className="relative text-sm font-medium text-foreground/80 hover:text-primary transition-colors group tracking-wide"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 rounded-full hover:bg-muted/80 transition-colors text-foreground"
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => open("General Inquiry")}
              className="hidden md:flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full font-semibold text-sm shadow-lg shadow-primary/30 hover:bg-primary/90 transition-colors"
            >
              Book Now
            </motion.button>
            <button className="md:hidden p-2 rounded-md hover:bg-muted transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }} transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col pt-24 px-8 pb-8 md:hidden"
          >
            <nav className="flex flex-col gap-5">
              {navLinks.map((item, i) => (
                <motion.button key={item.id} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => scrollTo(item.id)}
                  className="text-left text-2xl font-serif font-bold text-foreground hover:text-primary transition-colors border-b border-border/50 pb-5"
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>
            <div className="mt-8 flex flex-col gap-3">
              <Button onClick={() => { open("General Inquiry"); setMobileOpen(false); }}
                className="w-full h-14 bg-primary text-primary-foreground text-lg rounded-xl">Book Now</Button>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"
                className="w-full h-14 bg-green-500 text-white rounded-xl flex items-center justify-center gap-3 text-lg font-semibold hover:bg-green-600 transition-colors">
                {WA_SVG} WhatsApp Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp FAB */}
      <motion.a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"
        whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-xl shadow-green-500/40"
        style={{ boxShadow: "0 0 0 0 rgba(34,197,94,0.5)" }}
        animate={{ boxShadow: ["0 0 0 0 rgba(34,197,94,0.5)", "0 0 0 14px rgba(34,197,94,0)", "0 0 0 0 rgba(34,197,94,0)"] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        {WA_SVG}
      </motion.a>

      {/* ── HERO ── */}
      <section className="relative h-[100dvh] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10" />
          <img src="/images/hero-kaaba.png" alt="Kaaba" className="w-full h-full object-cover scale-110" />
        </motion.div>

        {/* Floating orbs */}
        <Orb style={{ width: 300, height: 300, top: "10%", left: "5%", background: "radial-gradient(circle, rgba(201,168,76,0.2) 0%, transparent 70%)" }} />
        <Orb style={{ width: 200, height: 200, bottom: "15%", right: "8%", background: "radial-gradient(circle, rgba(20,83,45,0.3) 0%, transparent 70%)" }} />
        <Orb style={{ width: 150, height: 150, top: "40%", right: "20%", background: "radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)" }} />

        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full pointer-events-none"
            animate={{ y: [0, -80, 0], opacity: [0, 0.8, 0], x: [0, (i % 2 === 0 ? 20 : -20), 0] }}
            transition={{ duration: 4 + (i % 4), repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
            style={{ left: `${5 + (i * 4.8) % 90}%`, top: `${20 + (i * 7) % 60}%` }}
          />
        ))}

        <div className="container relative z-20 px-4 text-center mt-16">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-primary font-semibold tracking-[0.3em] uppercase mb-5 text-sm"
            >
              ✦ Bin Yasin Travels ✦
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}
              className="font-arabic text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-white mb-6 font-bold leading-tight"
              style={{ textShadow: "0 0 40px rgba(201,168,76,0.4), 0 4px 20px rgba(0,0,0,0.5)" }}
            >
              رحلتك... أمانة في يدينا
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
              className="font-serif text-xl sm:text-2xl text-white/90 mb-12 max-w-2xl mx-auto italic"
            >
              "Your Journey, Our Promise — Elevating Every Mile"
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Button size="lg" onClick={() => scrollTo("packages")}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground text-base sm:text-lg px-10 h-14 rounded-full font-bold shadow-xl shadow-primary/40 w-full sm:w-auto"
                >
                  Explore Packages
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Button size="lg" variant="outline" onClick={() => open("General Inquiry")}
                  className="bg-white/10 backdrop-blur-sm border-white/50 text-white hover:bg-white/20 text-base sm:text-lg px-10 h-14 rounded-full font-bold w-full sm:w-auto"
                >
                  Book Now
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-1">
            <motion.div animate={{ y: [0, 14, 0] }} transition={{ repeat: Infinity, duration: 2 }}
              className="w-1.5 h-1.5 bg-primary rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="py-10 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 30% 50%, hsl(var(--primary)) 0%, transparent 50%)" }}
        />
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            {[
              { n: 15, s: "+", label: "Years Experience" },
              { n: 10000, s: "+", label: "Happy Pilgrims" },
              { n: 50, s: "+", label: "Destinations" },
              { n: 99, s: "%", label: "Client Satisfaction" },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="space-y-1"
              >
                <div className="text-4xl md:text-5xl font-bold text-primary font-serif">
                  <Counter target={stat.n} suffix={stat.s} />
                </div>
                <p className="text-white/70 text-sm font-medium tracking-wide">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <main className="flex-1">

        {/* ── SERVICES ── */}
        <section id="services" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background to-muted/50" />
          <div className="container mx-auto px-4 md:px-6 relative">
            <motion.div className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            >
              <p className="text-primary font-semibold tracking-[0.2em] uppercase text-sm mb-3">What We Offer</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Our Premium Services</h2>
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-px w-16 bg-primary/40" />
                <div className="w-2 h-2 bg-primary rounded-full" />
                <div className="h-px w-16 bg-primary/40" />
              </div>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Umrah Packages", desc: "Spiritual journeys to the Holy Land, all-inclusive luxury.", icon: <HeartHandshake className="w-10 h-10 text-primary" />, color: "from-amber-500/10 to-yellow-500/5" },
                { title: "Hajj Services", desc: "Complete Hajj facilitation with guided, dedicated support.", icon: <Shield className="w-10 h-10 text-primary" />, color: "from-emerald-500/10 to-green-500/5" },
                { title: "Worldwide Ticketing", desc: "Premium air tickets to 190+ destinations globally.", icon: <Plane className="w-10 h-10 text-primary" />, color: "from-blue-500/10 to-sky-500/5" },
                { title: "Visa Processing", desc: "Hassle-free visa services for UAE, UK, Schengen, and USA.", icon: <Globe className="w-10 h-10 text-primary" />, color: "from-purple-500/10 to-violet-500/5" }
              ].map((service, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                >
                  <TiltCard className="h-full">
                    <div
                      onClick={() => open(service.title)}
                      className={`h-full p-8 border border-border/60 bg-gradient-to-br ${service.color} backdrop-blur-sm rounded-2xl cursor-pointer group hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300`}
                    >
                      <motion.div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors"
                        whileHover={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 0.4 }}
                      >
                        {service.icon}
                      </motion.div>
                      <h3 className="font-serif text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">{service.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
                      <div className="mt-5 flex items-center gap-2 text-primary text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                        Book Now <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT / CEO ── */}
        <section id="about-our-story" className="py-24 bg-secondary relative overflow-hidden">
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: "radial-gradient(ellipse at 80% 50%, hsl(var(--primary)) 0%, transparent 60%)" }}
          />
          <div className="container mx-auto px-4 md:px-6 relative">
            <div className="flex flex-col lg:flex-row items-center gap-14">
              <motion.div className="w-full lg:w-1/2"
                initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7 }}
              >
                <TiltCard>
                  <div className="relative max-w-sm mx-auto lg:max-w-none">
                    <div className="absolute -inset-3 bg-gradient-to-br from-primary/30 to-transparent rounded-2xl blur-xl" />
                    <div className="absolute -inset-1 border border-primary/40 rounded-2xl" />
                    <img src="/images/ceo-portrait.png" alt="Ghulam Yasin, CEO"
                      className="relative z-10 w-full aspect-[3/4] object-cover rounded-2xl shadow-2xl"
                    />
                    <div className="absolute bottom-6 left-6 right-6 z-20 bg-black/60 backdrop-blur-md rounded-xl p-4 border border-white/10">
                      <h4 className="font-serif text-xl font-bold text-white">Ghulam Yasin</h4>
                      <p className="text-primary text-xs font-semibold tracking-wider uppercase mt-0.5">CEO & Founder</p>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
              <motion.div className="w-full lg:w-1/2 space-y-6 text-white"
                initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7 }}
              >
                <p className="font-arabic text-3xl text-primary">وَجَعَلْنَا مِنَ الْمَاءِ كُلَّ شَيْءٍ حَيٍّ</p>
                <h2 className="font-serif text-4xl md:text-5xl font-bold">A Legacy of Trust</h2>
                <div className="flex items-center gap-3">
                  <div className="h-px w-12 bg-primary" />
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <div className="h-px w-32 bg-primary/30" />
                </div>
                <p className="text-white/75 leading-relaxed text-lg">
                  "With over 15 years of experience in the travel industry, I founded Bin Yasin Travels with a single mission — to make every journey, especially sacred ones, as seamless, dignified, and spiritually uplifting as possible. We have proudly served thousands of pilgrims and travelers across Pakistan."
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  {["15+ Years Experience", "10,000+ Pilgrims Served", "Licensed & Trusted"].map(badge => (
                    <span key={badge} className="inline-flex items-center gap-1.5 bg-primary/20 border border-primary/30 text-primary rounded-full px-4 py-1.5 text-xs font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {badge}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── PACKAGES ── */}
        <section id="packages" className="py-24 bg-background relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "repeating-linear-gradient(0deg, hsl(var(--primary)) 0px, hsl(var(--primary)) 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, hsl(var(--primary)) 0px, hsl(var(--primary)) 1px, transparent 1px, transparent 60px)" }}
          />
          <div className="container mx-auto px-4 md:px-6 relative">
            <motion.div className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            >
              <p className="text-primary font-semibold tracking-[0.2em] uppercase text-sm mb-3">Sacred Journeys</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Exclusive Umrah Packages</h2>
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-px w-16 bg-primary/40" />
                <div className="w-2 h-2 bg-primary rounded-full" />
                <div className="h-px w-16 bg-primary/40" />
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">Sacred journeys designed with uncompromising comfort and deep spiritual reverence.</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              {[
                { name: "Silver Package", price: "PKR 1,85,000", features: ["Economy flights", "3-star hotel", "10 nights stay", "Guided Ziyarat"], color: "from-slate-400 to-slate-500" },
                { name: "Gold Package", price: "PKR 2,65,000", features: ["Business class option", "4-star hotel", "14 nights stay", "Full Ziyarat", "Dedicated guide"], featured: true, color: "from-yellow-400 to-amber-500" },
                { name: "Platinum VIP", price: "PKR 3,90,000", features: ["Business class included", "5-star hotel", "21 nights stay", "Private guide", "VIP lounge access"], color: "from-violet-400 to-purple-500" }
              ].map((pkg, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                >
                  <TiltCard className={`relative ${pkg.featured ? "md:-mt-4 md:mb-4" : ""}`}>
                    <div className={`relative overflow-hidden bg-card rounded-2xl border ${pkg.featured ? "border-primary shadow-2xl shadow-primary/20" : "border-border shadow-lg"} flex flex-col`}>
                      {pkg.featured && (
                        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />
                      )}
                      <div className={`h-2 w-full bg-gradient-to-r ${pkg.color}`} />
                      {pkg.featured && (
                        <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                          ⭐ Most Popular
                        </div>
                      )}
                      <div className="p-8 flex flex-col flex-1">
                        <h3 className="font-serif text-2xl font-bold text-foreground mb-2">{pkg.name}</h3>
                        <div className="flex items-end gap-1 mb-6">
                          <span className="text-3xl font-black text-primary">{pkg.price}</span>
                          <span className="text-muted-foreground text-sm mb-1">/ person</span>
                        </div>
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-6" />
                        <ul className="space-y-3 mb-8 flex-1">
                          {pkg.features.map((f, j) => (
                            <li key={j} className="flex items-center gap-3">
                              <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                              </div>
                              <span className="text-sm text-muted-foreground">{f}</span>
                            </li>
                          ))}
                        </ul>
                        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                          onClick={() => open(pkg.name)}
                          className={`w-full py-3.5 rounded-xl font-bold text-base transition-all ${pkg.featured
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90"
                            : "bg-foreground/10 text-foreground hover:bg-primary hover:text-primary-foreground border border-border hover:border-primary"}`}
                        >
                          Book Now ✈️
                        </motion.button>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── VISIT VISA ── */}
        <section id="visit-visa" className="py-24 bg-muted/30 relative">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            >
              <p className="text-primary font-semibold tracking-[0.2em] uppercase text-sm mb-3">Travel Documents</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Visit Visa Services</h2>
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-16 bg-primary/40" />
                <div className="w-2 h-2 bg-primary rounded-full" />
                <div className="h-px w-16 bg-primary/40" />
              </div>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "UAE Visit Visa", desc: "30 / 60 / 90 days", price: "PKR 25,000", img: "/images/dest-dubai.png" },
                { name: "UK Visit Visa", desc: "6 months duration", price: "PKR 35,000", img: "/images/dest-london.png" },
                { name: "Schengen Visa", desc: "90 days validity", price: "PKR 40,000", img: "/images/dest-paris.png" },
                { name: "Saudi Arabia Visa", desc: "Multiple Entry", price: "PKR 20,000", img: "/images/dest-makkah.png" }
              ].map((visa, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-lg"
                  style={{ aspectRatio: "3/4" }}
                  onClick={() => open(visa.name)}
                  whileHover={{ y: -6 }}
                >
                  <img src={visa.img} alt={visa.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <h3 className="font-serif text-xl font-bold mb-1">{visa.name}</h3>
                    <p className="text-white/75 text-sm mb-2">{visa.desc}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-primary font-black text-lg">{visa.price}</p>
                      <span className="text-xs bg-primary text-white px-3 py-1 rounded-full font-bold opacity-0 group-hover:opacity-100 transition-opacity">Book Now</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DESTINATIONS ── */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            >
              <p className="text-primary font-semibold tracking-[0.2em] uppercase text-sm mb-3">Explore The World</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Popular Destinations</h2>
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-16 bg-primary/40" />
                <div className="w-2 h-2 bg-primary rounded-full" />
                <div className="h-px w-16 bg-primary/40" />
              </div>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { city: "Makkah", img: "/images/dest-makkah.png", ar: "مكة المكرمة", en: "The Holy City" },
                { city: "Madinah", img: "/images/dest-madinah.png", ar: "المدينة المنورة", en: "The Radiant City" },
                { city: "Dubai", img: "/images/dest-dubai.png", ar: "دبي", en: "City of Gold" },
                { city: "London", img: "/images/dest-london.png", ar: "لندن", en: "Historic Elegance" },
                { city: "Istanbul", img: "/images/dest-istanbul.png", ar: "إسطنبول", en: "Where Continents Meet" },
                { city: "Paris", img: "/images/dest-paris.png", ar: "باريس", en: "City of Lights" },
              ].map((dest, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="group relative overflow-hidden bg-card rounded-2xl shadow-md hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 border border-border/50 cursor-pointer"
                  onClick={() => open(`${dest.city} Package`)}
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img src={dest.img} alt={dest.city}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-5 text-center relative">
                    <h3 className="font-serif text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{dest.city}</h3>
                    <p className="font-arabic text-lg text-primary mb-1">{dest.ar}</p>
                    <p className="text-xs text-muted-foreground">{dest.en}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ARABIC QUOTES ── */}
        <section className="py-20 bg-secondary relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(circle at 50% 50%, hsl(var(--primary)) 0%, transparent 60%)" }}
          />
          <div className="container mx-auto px-4 md:px-6 relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { ar: "سَافِرْ تَجِدْ عِوَضًا عَمَّن تَفَارَقُهُ", en: "Travel, and you will find a replacement for those you left behind" },
                { ar: "وَفِي الأَرْضِ مَنَازِلُ يَخْلُو بِهَا الفَتَى", en: "In the land are resting places where the traveler finds solitude" },
                { ar: "الرِّحْلَةُ تُكَوِّنُ الإِنْسَان", en: "Travel shapes the human soul" }
              ].map((quote, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                >
                  <TiltCard>
                    <div className="text-center p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm hover:border-primary/40 transition-colors hover:bg-white/8">
                      <div className="text-primary text-4xl mb-4">"</div>
                      <p className="font-arabic text-2xl text-primary mb-5 leading-relaxed">{quote.ar}</p>
                      <p className="font-serif text-base text-white/70 italic">"{quote.en}"</p>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── GALLERY ── */}
        <section id="gallery" className="py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            >
              <p className="text-primary font-semibold tracking-[0.2em] uppercase text-sm mb-3">Visual Journey</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Gallery</h2>
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-16 bg-primary/40" />
                <div className="w-2 h-2 bg-primary rounded-full" />
                <div className="h-px w-16 bg-primary/40" />
              </div>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3" style={{ gridAutoRows: "180px" }}>
              {[
                { src: "/images/dest-makkah.png", span: "col-span-2 row-span-2" },
                { src: "/images/gallery-1.png", span: "" },
                { src: "/images/dest-dubai.png", span: "" },
                { src: "/images/gallery-2.png", span: "col-span-2" },
              ].map((img, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className={`${img.span} rounded-2xl overflow-hidden relative group`}
                >
                  <img src={img.src} alt="Gallery"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact-us" className="py-24 bg-muted/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <div className="container mx-auto px-4 md:px-6 relative">
            <motion.div className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            >
              <p className="text-primary font-semibold tracking-[0.2em] uppercase text-sm mb-3">Let's Talk</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Get In Touch</h2>
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-16 bg-primary/40" />
                <div className="w-2 h-2 bg-primary rounded-full" />
                <div className="h-px w-16 bg-primary/40" />
              </div>
            </motion.div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

              {/* Contact Form */}
              <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6 }}
              >
                <div className="bg-card p-8 md:p-10 rounded-2xl border border-border shadow-xl">
                  <h3 className="font-serif text-2xl md:text-3xl font-bold mb-7 text-foreground">Begin Your Journey</h3>
                  <form onSubmit={handleContactSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Full Name *</label>
                        <Input name="name" required placeholder="Your name" className="h-12 bg-background rounded-xl border-border focus-visible:ring-primary" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Phone *</label>
                        <Input name="phone" required placeholder="+92 300 0000000" className="h-12 bg-background rounded-xl border-border focus-visible:ring-primary" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Email</label>
                        <Input name="email" type="email" placeholder="you@email.com" className="h-12 bg-background rounded-xl border-border focus-visible:ring-primary" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Service</label>
                        <select name="service" className="w-full h-12 px-3 bg-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                          <option value="">Select a service...</option>
                          {ALL_SERVICES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Message</label>
                      <Textarea name="message" placeholder="How can we help you plan your journey?" className="min-h-[110px] bg-background rounded-xl border-border focus-visible:ring-primary resize-none" />
                    </div>
                    <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      className="w-full h-14 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl text-base flex items-center justify-center gap-3 shadow-lg shadow-green-500/30 transition-colors"
                    >
                      {WA_SVG} Send via WhatsApp
                    </motion.button>
                  </form>
                </div>
              </motion.div>

              {/* Info & Map */}
              <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground">Contact Information</h3>
                <div className="space-y-4">
                  {[
                    { icon: <MapPin className="w-5 h-5 text-primary" />, title: "Our Office", text: "Shop #19x, X-Block, Near Passport Office,\nMadni Chowk, New Multan, Pakistan" },
                    { icon: <Phone className="w-5 h-5 text-primary" />, title: "Phone Numbers", text: "+92 301 8780888\n+92 300 6369313\n+92 305 1633313" },
                    { icon: <Mail className="w-5 h-5 text-primary" />, title: "Email", text: "info@binyasintravels.com" },
                    { icon: <Clock className="w-5 h-5 text-primary" />, title: "Office Hours", text: "Mon–Sat: 9:00 AM – 8:00 PM\nFri: 2:00 PM – 8:00 PM" },
                  ].map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border/60 hover:border-primary/40 transition-colors"
                    >
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">{item.icon}</div>
                      <div>
                        <h4 className="font-bold text-foreground text-sm mb-0.5">{item.title}</h4>
                        <p className="text-muted-foreground text-sm whitespace-pre-line leading-relaxed">{item.text}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="rounded-2xl overflow-hidden border border-border shadow-lg">
                  <iframe
                    title="Bin Yasin Travels Location"
                    src="https://maps.google.com/maps?q=Madni+Chowk+New+Multan+Pakistan&output=embed&z=15"
                    width="100%" height="240" style={{ border: 0 }}
                    allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                  />
                  <a href="https://share.google/1bDszEeWiQF9xl61b" target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 bg-primary/10 hover:bg-primary/20 transition-colors text-primary font-semibold text-sm"
                  >
                    <MapPin className="w-4 h-4" /> Open in Google Maps
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-secondary text-white pt-16 pb-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(ellipse at 20% 50%, hsl(var(--primary)) 0%, transparent 50%)" }}
        />
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div className="space-y-4">
              <Logo />
              <p className="font-arabic text-2xl text-primary mt-3">رحلتك... أمانة في يدينا</p>
              <p className="text-white/60 text-sm leading-relaxed">Your Journey, Our Promise — Elevating Every Mile.</p>
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold mb-5 text-white">Quick Links</h4>
              <ul className="space-y-3">
                {navLinks.map(item => (
                  <li key={item.id}>
                    <button onClick={() => scrollTo(item.id)}
                      className="text-white/60 hover:text-primary transition-colors flex items-center gap-2 text-sm"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-primary" /> {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold mb-5 text-white">Services</h4>
              <ul className="space-y-3 text-sm">
                {["Umrah Packages", "Hajj Services", "Worldwide Ticketing", "Visit Visas"].map(s => (
                  <li key={s} className="flex items-center gap-2 text-white/60">
                    <ChevronRight className="w-3.5 h-3.5 text-primary shrink-0" /> {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold mb-5 text-white">Connect</h4>
              <div className="flex gap-3 mb-5">
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                </a>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors">
                  {WA_SVG}
                </a>
              </div>
              <div className="space-y-1.5">
                {["+92 301 8780888", "+92 300 6369313", "+92 305 1633313"].map(n => (
                  <a key={n} href={`tel:${n.replace(/\s/g, "")}`}
                    className="block text-white/60 hover:text-primary transition-colors text-sm"
                  >{n}</a>
                ))}
                <p className="text-white/60 text-sm pt-1">info@binyasintravels.com</p>
              </div>
            </div>
          </div>
          <div className="pt-6 border-t border-white/10 text-center space-y-2">
            <p className="font-arabic text-xl text-white/30">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</p>
            <p className="text-xs text-white/30">&copy; 2025 Bin Yasin Travels. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
