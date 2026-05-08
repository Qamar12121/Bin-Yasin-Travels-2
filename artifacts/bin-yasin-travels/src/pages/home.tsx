import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/App";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Moon, Sun, MapPin, Phone, Mail, Clock, ChevronRight, CheckCircle2, Plane, Globe, Shield, HeartHandshake, Map, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Brand Logo component
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

export default function Home() {
  const { theme, setTheme } = useContext(ThemeContext);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      
      {/* Navbar */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-md border-b border-border shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <a href="#" className="z-10">
            <Logo />
          </a>
          
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: 'About Our Story', id: 'about-our-story' },
              { label: 'Gallery', id: 'gallery' },
              { label: 'Packages', id: 'packages' },
              { label: 'Services', id: 'services' },
              { label: 'Contact Us', id: 'contact-us' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors tracking-wide"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full hover:bg-muted transition-colors text-foreground"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <Button onClick={() => scrollTo('contact-us')} className="hidden md:flex bg-primary text-primary-foreground hover:bg-primary/90">
              Book Now
            </Button>
          </div>
        </div>
      </header>

      {/* WhatsApp FAB */}
      <a 
        href="https://wa.me/923001234567" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-green-600 transition-transform hover:scale-110 animate-pulse"
      >
        <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
      </a>

      {/* Hero Section */}
      <section className="relative h-[100dvh] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/50 z-10" /> {/* Overlay */}
          <img 
            src="/images/hero-kaaba.png" 
            alt="Kaaba at night" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        <div className="container relative z-20 px-4 text-center mt-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-primary font-semibold tracking-[0.2em] uppercase mb-4 text-sm md:text-base">
              Bin Yasin Travels
            </p>
            <h1 className="font-arabic text-5xl md:text-7xl lg:text-8xl text-white mb-6 font-bold leading-tight drop-shadow-lg">
              رحلتك... أمانة في يدينا
            </h1>
            <p className="font-serif text-2xl md:text-3xl text-white/90 mb-10 max-w-2xl mx-auto drop-shadow-md">
              "Your Journey, Our Promise — Elevating Every Mile"
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" onClick={() => scrollTo('packages')} className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 h-14 rounded-none w-full sm:w-auto">
                Explore Packages
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollTo('contact-us')} className="bg-transparent border-white text-white hover:bg-white/10 text-lg px-8 h-14 rounded-none w-full sm:w-auto">
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1">
        
        {/* Services */}
        <section id="services" className="py-24 bg-card">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Our Premium Services</h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
              <p className="text-muted-foreground max-w-2xl mx-auto">Experience the highest standard of travel facilitation, tailored for your peace of mind.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                  className="p-8 border border-border bg-background hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-all duration-300 group rounded-lg"
                >
                  <div className="group-hover:text-primary transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-sm opacity-80 leading-relaxed">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About / CEO Section */}
        <section id="about-our-story" className="py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="w-full lg:w-1/2">
                <div className="relative">
                  <div className="absolute -inset-4 border-2 border-primary/30 rounded-lg transform translate-x-4 translate-y-4"></div>
                  <img src="/images/ceo-portrait.png" alt="Ghulam Yasin, CEO" className="relative z-10 w-full aspect-[3/4] object-cover rounded-lg shadow-2xl" />
                </div>
              </div>
              <div className="w-full lg:w-1/2 space-y-6">
                <p className="font-arabic text-3xl text-primary mb-6">وَجَعَلْنَا مِنَ الْمَاءِ كُلَّ شَيْءٍ حَيٍّ</p>
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">A Legacy of Trust</h2>
                <div className="w-16 h-1 bg-primary mb-6"></div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  "With over 15 years of experience in the travel industry, I founded Bin Yasin Travels with a single mission — to make every journey, especially sacred ones, as seamless, dignified, and spiritually uplifting as possible. Under our leadership, Bin Yasin Travels has proudly served thousands of pilgrims and travelers across Pakistan, elevating every mile they travel."
                </p>
                <div className="pt-6">
                  <h4 className="font-serif text-2xl font-bold text-foreground">Ghulam Yasin</h4>
                  <p className="text-primary font-medium tracking-wide uppercase text-sm mt-1">CEO & Founder, Bin Yasin Travels</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Packages */}
        <section id="packages" className="py-24 bg-secondary text-secondary-foreground">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-white">Exclusive Umrah Packages</h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
              <p className="text-white/70 max-w-2xl mx-auto">Sacred journeys designed with uncompromising comfort and deep spiritual reverence.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  name: "Silver Package", 
                  price: "PKR 1,85,000", 
                  features: ["Economy flights", "3-star hotel accommodation", "10 nights stay", "Guided Ziyarat"]
                },
                { 
                  name: "Gold Package", 
                  price: "PKR 2,65,000", 
                  features: ["Business class option", "4-star hotel", "14 nights stay", "Full Ziyarat", "Dedicated group guide"],
                  featured: true
                },
                { 
                  name: "Platinum VIP", 
                  price: "PKR 3,90,000", 
                  features: ["Business class included", "5-star hotel Makkah & Madinah", "21 nights stay", "Private guide", "Airport VIP lounge access"]
                }
              ].map((pkg, i) => (
                <div key={i} className={`relative p-8 flex flex-col bg-card text-card-foreground rounded-lg border ${pkg.featured ? 'border-primary shadow-xl shadow-primary/20 scale-105 z-10' : 'border-border'}`}>
                  {pkg.featured && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 text-sm font-bold uppercase tracking-wider rounded-full">Most Popular</div>}
                  <h3 className="font-serif text-2xl font-bold mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-primary mb-6">{pkg.price} <span className="text-sm text-muted-foreground font-normal">/ person</span></div>
                  <div className="w-full h-px bg-border mb-6"></div>
                  <ul className="space-y-4 mb-8 flex-1">
                    {pkg.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button onClick={() => scrollTo('contact-us')} className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-none h-12">
                    Inquire Now
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Visas */}
        <section id="services" className="py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Visit Visa Services</h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "UAE Visit Visa", desc: "30 / 60 / 90 days", price: "PKR 25,000", img: "/images/dest-dubai.png" },
                { name: "UK Visit Visa", desc: "6 months duration", price: "PKR 35,000", img: "/images/dest-london.png" },
                { name: "Schengen Visa", desc: "90 days validity", price: "PKR 40,000", img: "/images/dest-paris.png" },
                { name: "Saudi Arabia Visa", desc: "Multiple Entry", price: "PKR 20,000", img: "/images/dest-makkah.png" }
              ].map((visa, i) => (
                <div key={i} className="group relative overflow-hidden rounded-lg aspect-[3/4]">
                  <img src={visa.img} alt={visa.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                    <h3 className="font-serif text-2xl font-bold mb-1">{visa.name}</h3>
                    <p className="text-white/80 mb-2">{visa.desc}</p>
                    <p className="text-primary font-bold text-xl">{visa.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Destinations */}
        <section className="py-24 bg-card">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Popular Destinations</h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { city: "Makkah", img: "/images/dest-makkah.png", ar: "مكة المكرمة", en: "The Holy City" },
                { city: "Madinah", img: "/images/dest-madinah.png", ar: "المدينة المنورة", en: "The Radiant City" },
                { city: "Dubai", img: "/images/dest-dubai.png", ar: "دبي", en: "City of Gold" },
                { city: "London", img: "/images/dest-london.png", ar: "لندن", en: "Historic Elegance" },
                { city: "Istanbul", img: "/images/dest-istanbul.png", ar: "إسطنبول", en: "Where Continents Meet" },
                { city: "Paris", img: "/images/dest-paris.png", ar: "باريس", en: "City of Lights" },
              ].map((dest, i) => (
                <div key={i} className="group relative overflow-hidden bg-background rounded-lg shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={dest.img} alt={dest.city} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="font-serif text-2xl font-bold text-foreground mb-1">{dest.city}</h3>
                    <p className="font-arabic text-xl text-primary mb-2">{dest.ar}</p>
                    <p className="text-sm text-muted-foreground">{dest.en}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quotes Section */}
        <section className="py-24 bg-background border-y border-border">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { ar: "سَافِرْ تَجِدْ عِوَضًا عَمَّن تَفَارَقُهُ", en: "Travel, and you will find a replacement for those you left behind" },
                { ar: "وَفِي الأَرْضِ مَنَازِلُ يَخْلُو بِهَا الفَتَى", en: "In the land are resting places where the traveler finds solitude" },
                { ar: "الرِّحْلَةُ تُكَوِّنُ الإِنْسَان", en: "Travel shapes the human soul" }
              ].map((quote, i) => (
                <div key={i} className="text-center p-8 border border-border rounded-lg bg-card shadow-sm hover:border-primary transition-colors">
                  <p className="font-arabic text-3xl text-primary mb-6 leading-relaxed">{quote.ar}</p>
                  <p className="font-serif text-lg text-muted-foreground italic">"{quote.en}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section id="gallery" className="py-24 bg-card">
          <div className="container mx-auto px-4 md:px-6">
             <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Gallery</h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
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
        <section id="contact-us" className="py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              
              {/* Contact Form */}
              <div className="bg-card p-8 md:p-10 rounded-lg border border-border shadow-lg">
                <h3 className="font-serif text-3xl font-bold mb-8">Begin Your Journey</h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Full Name</label>
                      <Input placeholder="John Doe" className="h-12 bg-background border-border rounded-none focus-visible:ring-primary" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Email</label>
                      <Input type="email" placeholder="john@example.com" className="h-12 bg-background border-border rounded-none focus-visible:ring-primary" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Phone Number</label>
                      <Input placeholder="+92 300 1234567" className="h-12 bg-background border-border rounded-none focus-visible:ring-primary" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Service of Interest</label>
                      <select className="w-full h-12 px-3 bg-background border border-border rounded-none focus-visible:ring-primary focus-visible:outline-none">
                        <option value="">Select a service...</option>
                        <option value="umrah">Umrah Packages</option>
                        <option value="hajj">Hajj Services</option>
                        <option value="ticketing">Worldwide Ticketing</option>
                        <option value="visa">Visit Visa</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Message</label>
                    <Textarea placeholder="How can we help you plan your journey?" className="min-h-[120px] bg-background border-border rounded-none focus-visible:ring-primary resize-none" />
                  </div>

                  <Button className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground text-lg rounded-none mt-4">
                    Send Message <Send className="ml-2 w-5 h-5" />
                  </Button>
                </form>
              </div>

              {/* Info & Map */}
              <div className="space-y-10">
                <div>
                  <h3 className="font-serif text-3xl font-bold mb-8">Contact Information</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground mb-1">Our Office</h4>
                        <p className="text-muted-foreground">Shop No. 12, Al-Noor Plaza,<br/>Main GT Road, Gujranwala, Pakistan</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground mb-1">Phone</h4>
                        <p className="text-muted-foreground">+92 300 1234567</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground mb-1">Email</h4>
                        <p className="text-muted-foreground">info@binyasintravels.com</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                        <Clock className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground mb-1">Office Hours</h4>
                        <p className="text-muted-foreground">Mon–Sat: 9:00 AM – 8:00 PM<br/>Fri: 2:00 PM – 8:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-[250px] bg-muted rounded-lg overflow-hidden relative border border-border">
                  <div className="absolute inset-0 bg-background/50 flex flex-col items-center justify-center">
                    <Map className="w-10 h-10 text-primary mb-2 opacity-50" />
                    <span className="text-muted-foreground font-medium">Interactive Map Integration</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground pt-20 pb-10 border-t-4 border-primary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-white">
                <Logo />
              </div>
              <p className="font-arabic text-2xl text-primary mt-4">رحلتك... أمانة في يدينا</p>
              <p className="text-white/70">Your Journey, Our Promise — Elevating Every Mile.</p>
            </div>
            
            <div>
              <h4 className="font-serif text-xl font-bold mb-6 text-white">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { label: 'About Our Story', id: 'about-our-story' },
                  { label: 'Gallery', id: 'gallery' },
                  { label: 'Packages', id: 'packages' },
                  { label: 'Services', id: 'services' },
                  { label: 'Contact Us', id: 'contact-us' },
                ].map((item) => (
                  <li key={item.id}>
                    <button onClick={() => scrollTo(item.id)} className="text-white/70 hover:text-primary transition-colors flex items-center gap-2">
                      <ChevronRight className="w-4 h-4" /> {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-serif text-xl font-bold mb-6 text-white">Services</h4>
              <ul className="space-y-3">
                <li className="text-white/70 flex items-center gap-2"><ChevronRight className="w-4 h-4" /> Umrah Packages</li>
                <li className="text-white/70 flex items-center gap-2"><ChevronRight className="w-4 h-4" /> Hajj Services</li>
                <li className="text-white/70 flex items-center gap-2"><ChevronRight className="w-4 h-4" /> Worldwide Ticketing</li>
                <li className="text-white/70 flex items-center gap-2"><ChevronRight className="w-4 h-4" /> Visit Visas</li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-xl font-bold mb-6 text-white">Connect</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 text-center space-y-4">
            <p className="font-arabic text-2xl text-white/50">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</p>
            <p className="text-sm text-white/50">&copy; 2025 Bin Yasin Travels. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}