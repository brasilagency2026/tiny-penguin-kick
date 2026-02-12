import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { Heart, Sparkles, Smartphone, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="text-2xl font-serif font-bold text-primary">ConvitePro</div>
        <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
          <a href="#como-funciona" className="hover:text-primary transition-colors">Como Funciona</a>
          <a href="#modelos" className="hover:text-primary transition-colors">Modelos</a>
          <a href="#precos" className="hover:text-primary transition-colors">Preços</a>
        </div>
        <Button variant="outline" className="rounded-full px-6">Entrar</Button>
      </nav>

      {/* Hero */}
      <section className="relative pt-20 pb-32 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-serif leading-tight mb-8">
              Convites <span className="text-primary italic">Digitais</span> que encantam.
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-lg leading-relaxed">
              Transforme seu evento em uma experiência inesquecível desde o primeiro clique. Prático, elegante e totalmente interativo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full h-14 px-10 text-lg font-semibold shadow-xl shadow-primary/20">
                Comprar no Mercado Livre
              </Button>
              <Button size="lg" variant="ghost" className="rounded-full h-14 px-10 text-lg font-semibold">
                Ver Demonstração
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative z-10 bg-slate-100 rounded-[3rem] p-4 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800" 
                alt="Convite Digital" 
                className="rounded-[2.5rem] w-full h-[600px] object-cover"
              />
            </div>
            {/* Floating elements */}
            <div className="absolute -top-10 -right-10 bg-white p-6 rounded-3xl shadow-xl z-20 animate-bounce">
              <Heart className="text-red-400 h-8 w-8" />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-xl z-20">
              <Sparkles className="text-yellow-400 h-8 w-8" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="como-funciona" className="py-24 bg-slate-50 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-serif mb-4">Simples, Rápido e Automático</h2>
            <p className="text-slate-500">O fluxo perfeito para o seu grande dia.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <Send />, title: "Compre no ML", desc: "Adquira seu convite através do Mercado Livre com total segurança." },
              { icon: <Smartphone />, title: "Receba o Link", desc: "Após a aprovação, você recebe um link automático para criar seu convite." },
              { icon: <Sparkles />, title: "Personalize", desc: "Escolha cores, fotos e informações. Seu convite fica pronto na hora!" }
            ].map((item, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center text-primary mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;