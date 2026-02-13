import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { Heart, Sparkles, ShoppingBag, ArrowRight, Baby, GraduationCap, PartyPopper, Church, Wand2, Share2, Play, Cross } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const categories = [
    { 
      icon: <Heart className="text-rose-500" />, 
      title: "Casamento", 
      desc: "Elegância e romantismo para o seu grande dia.",
      mlLink: "#", 
      color: "bg-rose-50"
    },
    { 
      icon: <Baby className="text-blue-400" />, 
      title: "Chá de Bebê", 
      desc: "Anuncie a chegada do seu pequeno tesouro.",
      mlLink: "#", 
      color: "bg-blue-50"
    },
    { 
      icon: <GraduationCap className="text-slate-700" />, 
      title: "Formatura", 
      desc: "Celebre a sua conquista acadêmica.",
      mlLink: "#", 
      color: "bg-slate-50"
    },
    { 
      icon: <PartyPopper className="text-yellow-500" />, 
      title: "Aniversário", 
      desc: "Uma festa inesquecível para todas as idades.",
      mlLink: "#", 
      color: "bg-yellow-50"
    },
    { 
      icon: <Church className="text-amber-600" />, 
      title: "Batizado", 
      desc: "Um momento sagrado compartilhado com quem você ama.",
      mlLink: "#", 
      color: "bg-amber-50"
    },
    { 
      icon: <Cross className="text-slate-400" />, 
      title: "Avis de décès", 
      desc: "Uma homenagem digna e respeitosa para quem partiu.",
      mlLink: "#", 
      color: "bg-slate-100"
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="text-2xl font-serif font-bold text-primary">ConvitePro</div>
        <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
          <a href="#categories" className="hover:text-primary transition-colors">Categorias</a>
          <a href="#como-funciona" className="hover:text-primary transition-colors">Como Funciona</a>
          <a href="#demo" className="hover:text-primary transition-colors">Demos</a>
        </div>
        <div className="flex gap-4">
          <Button variant="ghost" className="rounded-full font-bold text-primary" onClick={() => navigate('/criar?token=demo')}>
            <Play size={16} className="mr-2 fill-current" /> Testar Criador
          </Button>
          <Button variant="outline" className="rounded-full px-6" onClick={() => navigate('/dashboard')}>Admin</Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-20 pb-32 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/5 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6">
              <Sparkles size={16} /> A plataforma nº1 de convites digitais
            </div>
            <h1 className="text-6xl md:text-8xl font-serif leading-tight mb-8">
              Convites <span className="text-primary italic">mágicos</span> para cada momento.
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-lg leading-relaxed">
              Escolha o seu tipo de evento abaixo e receba seu acesso instantaneamente após a compra.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="rounded-full h-14 px-10 text-lg font-semibold shadow-xl shadow-primary/20"
                onClick={() => navigate('/criar?token=demo')}
              >
                Criar meu convite agora
              </Button>
              <Button size="lg" variant="ghost" className="rounded-full h-14 px-10 text-lg font-semibold gap-2" onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}>
                Ver demonstrações <ArrowRight size={20} />
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
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section id="categories" className="py-24 bg-slate-50 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-serif mb-4">Selecione seu Evento</h2>
            <p className="text-slate-500">Cada convite é otimizado para o seu tipo de celebração.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col h-full"
              >
                <div className={`w-16 h-16 ${cat.color} rounded-2xl flex items-center justify-center mb-6 text-2xl`}>
                  {cat.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{cat.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">{cat.desc}</p>
                
                <Button 
                  className="w-full rounded-2xl h-12 font-bold gap-2"
                  onClick={() => window.open(cat.mlLink, '_blank')}
                >
                  <ShoppingBag size={18} /> Comprar no Mercado Livre
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section id="demo" className="py-24 bg-white px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-serif mb-4">Escolha seu Estilo Visual</h2>
            <p className="text-slate-500">Três temas exclusivos que se adaptam a todos os seus eventos.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { id: "classic", title: "Clássico", desc: "Elegância atemporal com fontes serifadas.", img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=400" },
              { id: "modern", title: "Moderno", desc: "Minimalismo contemporâneo e tipografia marcante.", img: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=400" },
              { id: "romantic", title: "Romântico", desc: "Delicadeza floral e animações suaves.", img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800" }
            ].map((demo, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100"
              >
                <img src={demo.img} alt={demo.title} className="w-full h-64 object-cover" />
                <div className="p-8">
                  <h3 className="text-2xl font-serif mb-3">{demo.title}</h3>
                  <p className="text-slate-500 text-sm mb-6 leading-relaxed">{demo.desc}</p>
                  <Button 
                    variant="outline" 
                    className="w-full rounded-xl"
                    onClick={() => navigate(`/demo/${demo.id}`)}
                  >
                    Ver exemplo
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="como-funciona" className="py-24 bg-slate-50 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-serif mb-4">Como Funciona?</h2>
            <p className="text-slate-500">Três passos simples para o seu convite perfeito.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <ShoppingBag className="h-10 w-10" />, title: "1. Compre", desc: "Adquira seu acesso exclusivo via Mercado Livre com total segurança." },
              { icon: <Wand2 className="h-10 w-10" />, title: "2. Personalize", desc: "Preencha os detalhes do seu evento em nossa plateforme intuitiva." },
              { icon: <Share2 className="h-10 w-10" />, title: "3. Compartilhe", desc: "Gere seu link exclusivo e envie para seus convidados via WhatsApp." }
            ].map((step, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 text-center"
              >
                <div className="bg-primary/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 text-primary">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-serif mb-4">{step.title}</h3>
                <p className="text-slate-500 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;