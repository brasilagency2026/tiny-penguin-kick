import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { Heart, Sparkles, ShoppingBag, ArrowRight, Baby, GraduationCap, PartyPopper, Church, Wand2, Share2, Play, Cross, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const ML_UNIQUE_LINK = "#"; // Link único para o produto no Mercado Livre

  const categories = [
    { icon: <Baby className="text-blue-400" />, title: "Nascimento / Chá" },
    { icon: <Church className="text-amber-600" />, title: "Batizado" },
    { icon: <PartyPopper className="text-yellow-500" />, title: "Aniversário" },
    { icon: <GraduationCap className="text-slate-700" />, title: "Formatura" },
    { icon: <Heart className="text-rose-500" />, title: "Casamento" },
    { icon: <Sparkles className="text-primary" />, title: "Outro Evento" },
    { icon: <Cross className="text-slate-400" />, title: "Homenagem" }
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="text-2xl font-serif font-bold text-primary">ConvitePro</div>
        <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
          <a href="#estilos" className="hover:text-primary transition-colors">Estilos de Fontes</a>
          <a href="#como-funciona" className="hover:text-primary transition-colors">Como Funciona</a>
        </div>
        <div className="flex gap-4">
          <Button variant="ghost" className="rounded-full font-bold text-primary" onClick={() => navigate('/criar?token=demo')}>
            <Play size={16} className="mr-2 fill-current" /> Testar Criador
          </Button>
          <Button 
            className="rounded-full px-8 font-bold shadow-lg shadow-primary/20"
            onClick={() => window.open(ML_UNIQUE_LINK, '_blank')}
          >
            Comprar Acesso
          </Button>
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
              <Sparkles size={16} /> Acesso vitalício para qualquer evento
            </div>
            <h1 className="text-6xl md:text-8xl font-serif leading-tight mb-8">
              Um convite, <span className="text-primary italic">infinitas</span> possibilidades.
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-lg leading-relaxed">
              Crie convites profissionais para nascimentos, casamentos ou formaturas com uma única ferramenta intuitiva.
            </p>
            <div className="flex flex-col sm:row gap-4">
              <Button 
                size="lg" 
                className="rounded-full h-16 px-12 text-xl font-bold shadow-2xl shadow-primary/30"
                onClick={() => window.open(ML_UNIQUE_LINK, '_blank')}
              >
                <ShoppingBag className="mr-2" /> Adquirir Acesso Único
              </Button>
              <Button size="lg" variant="ghost" className="rounded-full h-16 px-10 text-lg font-semibold gap-2" onClick={() => navigate('/criar?token=demo')}>
                Testar agora <ArrowRight size={20} />
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

      {/* Categories Grid - Simplified */}
      <section className="py-24 bg-slate-50 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4">Para todos os seus momentos</h2>
            <p className="text-slate-500">Sua licença permite criar convites para qualquer uma destas categorias:</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat, i) => (
              <div key={i} className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3">
                <div className="text-xl">{cat.icon}</div>
                <span className="font-bold text-slate-700">{cat.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Font Styles Section */}
      <section id="estilos" className="py-24 bg-white px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-serif mb-4">Tipografia & Personalidade</h2>
            <p className="text-slate-500">Escolha a fonte que melhor comunica a alma do seu evento.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { id: "classic", title: "Serifada (Playfair)", desc: "Elegância clássica e autoridade. Ideal para casamentos e eventos formais.", fontClass: "font-serif" },
              { id: "modern", title: "Sans-Serif (Inter)", desc: "Minimalismo moderno e clareza. Perfeito para aniversários e eventos corporativos.", fontClass: "font-sans" },
              { id: "romantic", title: "Cursiva (Dancing)", desc: "Delicadeza e toque pessoal. Excelente para chás de bebê e homenagens.", fontClass: "italic" }
            ].map((demo, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100 flex flex-col h-full"
              >
                <div className={`text-4xl mb-6 text-primary ${demo.fontClass}`}>
                  Abc 123
                </div>
                <h3 className="text-2xl font-bold mb-3">{demo.title}</h3>
                <p className="text-slate-500 text-sm mb-8 leading-relaxed flex-grow">{demo.desc}</p>
                <Button 
                  variant="outline" 
                  className="w-full rounded-xl font-bold"
                  onClick={() => navigate(`/demo/${demo.id}`)}
                >
                  Ver Demonstração
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="como-funciona" className="py-24 bg-slate-50 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-serif mb-4">Simples e Rápido</h2>
            <p className="text-slate-500">O processo do pagamento à criação leva menos de 5 minutos.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <ShoppingBag className="h-10 w-10" />, title: "1. Acesso Único", desc: "Compre sua licença no Mercado Livre e receba o token instantaneamente." },
              { icon: <Wand2 className="h-10 w-10" />, title: "2. Personalize", desc: "Escolha sua fonte, cores, música e preencha os dados do evento." },
              { icon: <Share2 className="h-10 w-10" />, title: "3. Compartilhe", desc: "Envie o link interativo para seus convidados e gerencie as presenças." }
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="bg-primary/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 text-primary">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-serif mb-4">{step.title}</h3>
                <p className="text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 bg-primary text-white text-center px-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-6xl font-serif">Pronto para começar?</h2>
          <p className="text-xl opacity-80">Junte-se a milhares de pessoas que já criaram convites inesquecíveis.</p>
          <Button 
            size="lg" 
            variant="secondary" 
            className="rounded-full h-16 px-12 text-xl font-bold"
            onClick={() => window.open(ML_UNIQUE_LINK, '_blank')}
          >
            Comprar Agora no Mercado Livre
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;