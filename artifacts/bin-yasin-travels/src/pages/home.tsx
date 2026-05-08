import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/App";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Moon, Sun, MapPin, Phone, Mail, Clock, ChevronRight, CheckCircle2, Plane, Globe, Shield, HeartHandshake, Send, X, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const WHATSAPP_NUMBER = "923018780888";

const Logo = () => (
  <div className="flex items-center gap-2">
    <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 10C27.9086 10 10 27.9086 10 50C10 72.0914 27.9086 90 50 90C67.6596 90 82.6517 78.5529 88.0827 62.5C85.5492 63.313 82.8252 63.75 80 63.75C60.67 63.75 45 48.08 45 28.75C45 20.0076 48.188 12.0088 53.4079 5.86435C52.2872 5.72266 51.1494 5.64917 50 5.64917V10Z" fill="currentColor" className="text-primary" />
      <path d="M60 40 L90 20 L95 25 L75 50 L85 80 L75 85 L60 60 L40 60 L20 80 L15 75 L35 45 L25 20 L30 15 L50 35 L60 40Z" fill="hsl(var(--secondary))" opacity="0.9" />
    </svg>
    <div className="flex flex-col">
      <span className="font-serif font-bold text-xl leading-none tracking-wide text-foreground">Bin Yasin</span>
      <span className="text-[0.65rem] tracking-[0.2em] uppercase text-primary font-semibold">Travels</span>
    </div>
  </div>
);

interface BookingModalProps {
  packageName: string;
  onClose: () => void;
}

function BookingModal({ packageName, onClose }: BookingModalProps) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    persons: "1",
    travelDate: "",
    message: "",
    selectedPackage: packageName,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = [
      `*New Booking Request — Bin Yasin Travels*`,
      ``,
      `*Package:* ${form.selectedPackage}`,
      `*Full Name:* ${form.name}`,
      `*Phone:* ${form.phone}`,
      `*Email:* ${form.email}`,
      `*Number of Persons:* ${form.persons}`,
      `*Travel Date:* ${form.travelDate}`,
      `*Message:* ${form.message || "No additional message"}`,
    ].join("\n");
    const encoded = encodeURIComponent(text);
    window.open(`https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${encoded}`, "_blank");
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-card text-card-foreground rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-primary/30"
        >
          <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between z-10">
            <div>
              <h3 className="font-serif text-2xl font-bold text-foreground">Book Your Journey</h3>
              <p className="text-primary text-sm font-medium mt-0.5">{form.selectedPackage}</p>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-muted transition-colors">
              <X className="w-5 h-5 text-foreground" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Package</label>
              <select
                name="selectedPackage"
                value={form.selectedPackage}
                onChange={handleChange}
                className="w-full h-11 px-3 bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              >
                <option value="Silver Package">Silver Package — PKR 1,85,000</option>
                <option value="Gold Package">Gold Package — PKR 2,65,000</option>
                <option value="Platinum VIP">Platinum VIP — PKR 3,90,000</option>
                <option value="Hajj Services">Hajj Services</option>
                <option value="Worldwide Ticketing">Worldwide Ticketing</option>
                <option value="Visit Visa">Visit Visa</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Full Name *</label>
                <Input
                  name="name"
                  required
                  placeholder="Ghulam Ahmed"
                  value={form.name}
                  onChange={handleChange}
                  className="h-11 bg-background border-border focus-visible:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Phone Number *</label>
                <Input
                  name="phone"
                  required
                  placeholder="+92 300 0000000"
                  value={form.phone}
                  onChange={handleChange}
                  className="h-11 bg-background border-border focus-visible:ring-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Email</label>
                <Input
                  name="email"
                  type="email"
                  placeholder="you@email.com"
                  value={form.email}
                  onChange={handleChange}
                  className="h-11 bg-background border-border focus-visible:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Number of Persons *</label>
                <Input
                  name="persons"
                  required
                  type="number"
                  min="1"
                  placeholder="1"
                  value={form.persons}
                  onChange={handleChange}
                  className="h-11 bg-background border-border focus-visible:ring-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Preferred Travel Date *</label>
              <Input
                name="travelDate"
                required
                type="date"
                value={form.travelDate}
                onChange={handleChange}
                className="h-11 bg-background border-border focus-visible:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Special Requests / Message</label>
              <Textarea
                name="message"
                placeholder="Any special requirements or questions..."
                value={form.message}
                onChange={handleChange}
                className="min-h-[90px] bg-background border-border focus-visible:ring-primary resize-none"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-13 bg-green-500 hover:bg-green-600 text-white text-base font-bold rounded-lg mt-2 flex items-center justify-center gap-3"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Complete Booking via WhatsApp
            </Button>
            <p className="text-xs text-center text-muted-foreground">Your details will be sent directly to our team on WhatsApp for instant confirmation.</p>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Home() {
  const { theme, setTheme } = useContext(ThemeContext);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingModal, setBookingModal] = useState<{ open: boolean; packageName: string }>({ open: false, packageName: "" });
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  };

  const openBooking = (packageName: string) => {
    setBookingModal({ open: true, packageName });
  };

  const navLinks = [
    { label: "About Our Story", id: "about-our-story" },
    { label: "Gallery", id: "gallery" },
    { label: "Packages", id: "packages" },
    { label: "Services", id: "services" },
    { label: "Contact Us", id: "contact-us" },
  ];

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const text = [
      `*General Inquiry — Bin Yasin Travels*`,
      ``,
      `*Name:* ${fd.get("name") || "N/A"}`,
      `*Phone:* ${fd.get("phone") || "N/A"}`,
      `*Email:* ${fd.get("email") || "N/A"}`,
      `*Service:* ${fd.get("service") || "N/A"}`,
      `*Message:* ${fd.get("message") || "N/A"}`,
    ].join("\n");
    const encoded = encodeURIComponent(text);
    window.open(`https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${encoded}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative">

      {/* Booking Modal */}
      {bookingModal.open && (
        <BookingModal
          packageName={bookingModal.packageName}
          onClose={() => setBookingModal({ open: false, packageName: "" })}
        />
      )}

      {/* Navbar */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-background/90 backdrop-blur-md border-b border-border shadow-sm py-3" : "bg-transparent py-5"}`}>
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="z-10">
            <Logo />
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors tracking-wide"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-muted transition-colors text-foreground"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <Button onClick={() => openBooking("General Booking")} className="hidden md:flex bg-primary text-primary-foreground hover:bg-primary/90">
              Book Now
            </Button>
            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-muted transition-colors text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background flex flex-col pt-24 px-8 pb-8 md:hidden"
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-left text-2xl font-serif font-bold text-foreground hover:text-primary transition-colors border-b border-border pb-4"
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="mt-8 flex flex-col gap-4">
              <Button onClick={() => { openBooking("General Booking"); setMobileMenuOpen(false); }} className="w-full h-14 bg-primary text-primary-foreground text-lg">
                Book Now
              </Button>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-14 bg-green-500 text-white rounded-md flex items-center justify-center gap-3 text-lg font-semibold hover:bg-green-600 transition-colors"
              >
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp FAB */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-xl hover:bg-green-600 transition-transform hover:scale-110 animate-pulse"
        aria-label="WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>

      {/* Hero Section */}
      <section className="relative h-[100dvh] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/55 z-10" />
          <img src="/images/hero-kaaba.png" alt="Kaaba at night" className="w-full h-full object-cover" />
        </motion.div>
        <div className="container relative z-20 px-4 text-center mt-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <p className="text-primary font-semibold tracking-[0.2em] uppercase mb-4 text-sm md:text-base">Bin Yasin Travels</p>
            <h1 className="font-arabic text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-6 font-bold leading-tight drop-shadow-lg">
              رحلتك... أمانة في يدينا
            </h1>
            <p className="font-serif text-xl sm:text-2xl md:text-3xl text-white/90 mb-10 max-w-2xl mx-auto drop-shadow-md">
              "Your Journey, Our Promise — Elevating Every Mile"
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" onClick={() => scrollTo("packages")} className="bg-primary hover:bg-primary/90 text-primary-foreground text-base sm:text-lg px-8 h-13 rounded-none w-full sm:w-auto">
                Explore Packages
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollTo("contact-us")} className="bg-transparent border-white text-white hover:bg-white/10 text-base sm:text-lg px-8 h-13 rounded-none w-full sm:w-auto">
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <main className="flex-1">

        {/* Services */}
        <section id="services" className="py-20 bg-card">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-14">
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">Our Premium Services</h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
              <p className="text-muted-foreground max-w-2xl mx-auto">Experience the highest standard of travel facilitation, tailored for your peace of mind.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Umrah Packages", desc: "Spiritual journeys to the Holy Land, all-inclusive luxury.", icon: <HeartHandshake className="w-10 h-10 mb-4 text-primary" /> },
                { title: "Hajj Services", desc: "Complete Hajj facilitation with guided, dedicated support.", icon: <Shield className="w-10 h-10 mb-4 text-primary" /> },
                { title: "Worldwide Ticketing", desc: "Premium air tickets to 190+ destinations globally.", icon: <Plane className="w-10 h-10 mb-4 text-primary" /> },
                { title: "Visa Processing", desc: "Hassle-free visa services for UAE, UK, Schengen, and USA.", icon: <Globe className="w-10 h-10 mb-4 text-primary" /> }
              ].map((service, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-7 border border-border bg-background hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-all duration-300 group rounded-lg cursor-pointer"
                  onClick={() => openBooking(service.title)}
                >
                  <div className="group-hover:text-primary transition-colors">{service.icon}</div>
                  <h3 className="font-serif text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-sm opacity-80 leading-relaxed">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About / CEO Section */}
        <section id="about-our-story" className="py-20 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              <div className="w-full lg:w-1/2">
                <div className="relative max-w-sm mx-auto lg:max-w-none">
                  <div className="absolute -inset-4 border-2 border-primary/30 rounded-lg transform translate-x-4 translate-y-4"></div>
                  <img src="/images/ceo-portrait.png" alt="Ghulam Yasin, CEO" className="relative z-10 w-full aspect-[3/4] object-cover rounded-lg shadow-2xl" />
                </div>
              </div>
              <div className="w-full lg:w-1/2 space-y-5">
                <p className="font-arabic text-2xl md:text-3xl text-primary">وَجَعَلْنَا مِنَ الْمَاءِ كُلَّ شَيْءٍ حَيٍّ</p>
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground">A Legacy of Trust</h2>
                <div className="w-16 h-1 bg-primary"></div>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  "With over 15 years of experience in the travel industry, I founded Bin Yasin Travels with a single mission — to make every journey, especially sacred ones, as seamless, dignified, and spiritually uplifting as possible. Under our leadership, Bin Yasin Travels has proudly served thousands of pilgrims and travelers across Pakistan, elevating every mile they travel."
                </p>
                <div className="pt-4">
                  <h4 className="font-serif text-2xl font-bold text-foreground">Ghulam Yasin</h4>
                  <p className="text-primary font-medium tracking-wide uppercase text-sm mt-1">CEO & Founder, Bin Yasin Travels</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Packages */}
        <section id="packages" className="py-20 bg-secondary text-secondary-foreground">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-14">
              <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4 text-white">Exclusive Umrah Packages</h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
              <p className="text-white/70 max-w-2xl mx-auto">Sacred journeys designed with uncompromising comfort and deep spiritual reverence.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Silver Package", price: "PKR 1,85,000", features: ["Economy flights", "3-star hotel accommodation", "10 nights stay", "Guided Ziyarat"] },
                { name: "Gold Package", price: "PKR 2,65,000", features: ["Business class option", "4-star hotel", "14 nights stay", "Full Ziyarat", "Dedicated group guide"], featured: true },
                { name: "Platinum VIP", price: "PKR 3,90,000", features: ["Business class included", "5-star hotel Makkah & Madinah", "21 nights stay", "Private guide", "Airport VIP lounge access"] }
              ].map((pkg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative p-8 flex flex-col bg-card text-card-foreground rounded-lg border ${pkg.featured ? "border-primary shadow-xl shadow-primary/20 md:scale-105 z-10" : "border-border"}`}
                >
                  {pkg.featured && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 text-sm font-bold uppercase tracking-wider rounded-full">
                      Most Popular
                    </div>
                  )}
                  <h3 className="font-serif text-2xl font-bold mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-primary mb-6">{pkg.price} <span className="text-sm text-muted-foreground font-normal">/ person</span></div>
                  <div className="w-full h-px bg-border mb-6"></div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {pkg.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => openBooking(pkg.name)}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-md h-12 text-base"
                  >
                    Book Now
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Visit Visa */}
        <section id="visit-visa" className="py-20 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-14">
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">Visit Visa Services</h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "UAE Visit Visa", desc: "30 / 60 / 90 days", price: "PKR 25,000", img: "/images/dest-dubai.png" },
                { name: "UK Visit Visa", desc: "6 months duration", price: "PKR 35,000", img: "/images/dest-london.png" },
                { name: "Schengen Visa", desc: "90 days validity", price: "PKR 40,000", img: "/images/dest-paris.png" },
                { name: "Saudi Arabia Visa", desc: "Multiple Entry", price: "PKR 20,000", img: "/images/dest-makkah.png" }
              ].map((visa, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative overflow-hidden rounded-lg cursor-pointer"
                  style={{ aspectRatio: "3/4" }}
                  onClick={() => openBooking(visa.name)}
                >
                  <img src={visa.img} alt={visa.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full p-5 text-white">
                    <h3 className="font-serif text-xl font-bold mb-1">{visa.name}</h3>
                    <p className="text-white/80 text-sm mb-2">{visa.desc}</p>
                    <p className="text-primary font-bold text-lg">{visa.price}</p>
                    <span className="mt-2 inline-block text-xs bg-primary/80 text-white px-3 py-1 rounded-full font-medium">Tap to Book</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Destinations */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-14">
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">Popular Destinations</h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { city: "Makkah", img: "/images/dest-makkah.png", ar: "مكة المكرمة", en: "The Holy City" },
                { city: "Madinah", img: "/images/dest-madinah.png", ar: "المدينة المنورة", en: "The Radiant City" },
                { city: "Dubai", img: "/images/dest-dubai.png", ar: "دبي", en: "City of Gold" },
                { city: "London", img: "/images/dest-london.png", ar: "لندن", en: "Historic Elegance" },
                { city: "Istanbul", img: "/images/dest-istanbul.png", ar: "إسطنبول", en: "Where Continents Meet" },
                { city: "Paris", img: "/images/dest-paris.png", ar: "باريس", en: "City of Lights" },
              ].map((dest, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative overflow-hidden bg-background rounded-lg shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={dest.img} alt={dest.city} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="font-serif text-xl font-bold text-foreground mb-1">{dest.city}</h3>
                    <p className="font-arabic text-lg text-primary mb-1">{dest.ar}</p>
                    <p className="text-sm text-muted-foreground">{dest.en}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Arabic Quotes */}
        <section className="py-20 bg-background border-y border-border">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { ar: "سَافِرْ تَجِدْ عِوَضًا عَمَّن تَفَارَقُهُ", en: "Travel, and you will find a replacement for those you left behind" },
                { ar: "وَفِي الأَرْضِ مَنَازِلُ يَخْلُو بِهَا الفَتَى", en: "In the land are resting places where the traveler finds solitude" },
                { ar: "الرِّحْلَةُ تُكَوِّنُ الإِنْسَان", en: "Travel shapes the human soul" }
              ].map((quote, i) => (
                <div key={i} className="text-center p-7 border border-border rounded-lg bg-card shadow-sm hover:border-primary transition-colors">
                  <p className="font-arabic text-2xl md:text-3xl text-primary mb-5 leading-relaxed">{quote.ar}</p>
                  <p className="font-serif text-base md:text-lg text-muted-foreground italic">"{quote.en}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section id="gallery" className="py-20 bg-card">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-14">
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">Gallery</h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4" style={{ gridAutoRows: "180px" }}>
              <div className="col-span-2 row-span-2 rounded-lg overflow-hidden relative">
                <img src="/images/dest-makkah.png" alt="Gallery" className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="rounded-lg overflow-hidden relative">
                <img src="/images/gallery-1.png" alt="Gallery" className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="rounded-lg overflow-hidden relative">
                <img src="/images/dest-dubai.png" alt="Gallery" className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="col-span-2 rounded-lg overflow-hidden relative">
                <img src="/images/gallery-2.png" alt="Gallery" className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
          </div>
        </section>

        {/* Contact & Map */}
        <section id="contact-us" className="py-20 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-14">
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">Get In Touch</h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

              {/* Contact Form */}
              <div className="bg-card p-6 md:p-10 rounded-xl border border-border shadow-lg">
                <h3 className="font-serif text-2xl md:text-3xl font-bold mb-6">Begin Your Journey</h3>
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Full Name *</label>
                      <Input name="name" required placeholder="Your full name" className="h-12 bg-background border-border focus-visible:ring-primary" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Phone Number *</label>
                      <Input name="phone" required placeholder="+92 300 0000000" className="h-12 bg-background border-border focus-visible:ring-primary" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Email</label>
                      <Input name="email" type="email" placeholder="you@email.com" className="h-12 bg-background border-border focus-visible:ring-primary" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Service of Interest</label>
                      <select name="service" className="w-full h-12 px-3 bg-background border border-border rounded-md text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                        <option value="">Select a service...</option>
                        <option>Umrah Packages</option>
                        <option>Hajj Services</option>
                        <option>Worldwide Ticketing</option>
                        <option>Visit Visa</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Message</label>
                    <Textarea name="message" placeholder="How can we help you plan your journey?" className="min-h-[110px] bg-background border-border focus-visible:ring-primary resize-none" />
                  </div>
                  <Button type="submit" className="w-full h-13 bg-green-500 hover:bg-green-600 text-white text-base font-bold rounded-lg flex items-center justify-center gap-3">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Send via WhatsApp
                  </Button>
                </form>
              </div>

              {/* Info & Map */}
              <div className="space-y-8">
                <h3 className="font-serif text-2xl md:text-3xl font-bold">Contact Information</h3>
                <div className="space-y-5">
                  {[
                    { icon: <MapPin className="w-6 h-6 text-primary" />, title: "Our Office", text: "Shop No. 12, Al-Noor Plaza,\nMain GT Road, Gujranwala, Pakistan" },
                    { icon: <Phone className="w-6 h-6 text-primary" />, title: "Phone", text: "+92 301 8780888" },
                    { icon: <Mail className="w-6 h-6 text-primary" />, title: "Email", text: "info@binyasintravels.com" },
                    { icon: <Clock className="w-6 h-6 text-primary" />, title: "Office Hours", text: "Mon–Sat: 9:00 AM – 8:00 PM\nFri: 2:00 PM – 8:00 PM" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground mb-1">{item.title}</h4>
                        <p className="text-muted-foreground text-sm whitespace-pre-line">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Google Maps Embed */}
                <div className="rounded-xl overflow-hidden border border-border shadow-md">
                  <iframe
                    title="Bin Yasin Travels Location"
                    src="https://maps.google.com/maps?q=GT+Road+Gujranwala+Pakistan&output=embed&z=15"
                    width="100%"
                    height="260"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <a
                    href="https://share.google/1bDszEeWiQF9xl61b"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 bg-primary/10 hover:bg-primary/20 transition-colors text-primary font-semibold text-sm"
                  >
                    <MapPin className="w-4 h-4" />
                    Open in Google Maps
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground pt-16 pb-8 border-t-4 border-primary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
            <div className="space-y-5">
              <div className="text-white"><Logo /></div>
              <p className="font-arabic text-2xl text-primary mt-4">رحلتك... أمانة في يدينا</p>
              <p className="text-white/70 text-sm">Your Journey, Our Promise — Elevating Every Mile.</p>
            </div>
            <div>
              <h4 className="font-serif text-xl font-bold mb-5 text-white">Quick Links</h4>
              <ul className="space-y-3">
                {navLinks.map((item) => (
                  <li key={item.id}>
                    <button onClick={() => scrollTo(item.id)} className="text-white/70 hover:text-primary transition-colors flex items-center gap-2 text-sm">
                      <ChevronRight className="w-4 h-4" /> {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-xl font-bold mb-5 text-white">Services</h4>
              <ul className="space-y-3 text-sm text-white/70">
                {["Umrah Packages", "Hajj Services", "Worldwide Ticketing", "Visit Visas"].map((s) => (
                  <li key={s} className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-primary" /> {s}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-xl font-bold mb-5 text-white">Connect</h4>
              <div className="flex gap-3 mb-5">
                {[
                  { icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />, href: "#" },
                  { icon: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></>, href: "#" },
                ].map((social, i) => (
                  <a key={i} href={social.href} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors">
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">{social.icon}</svg>
                  </a>
                ))}
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white hover:bg-green-500 transition-colors">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
              </div>
              <p className="text-white/70 text-sm">+92 301 8780888</p>
              <p className="text-white/70 text-sm mt-1">info@binyasintravels.com</p>
            </div>
          </div>
          <div className="pt-6 border-t border-white/10 text-center space-y-3">
            <p className="font-arabic text-xl text-white/40">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</p>
            <p className="text-xs text-white/40">&copy; 2025 Bin Yasin Travels. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
