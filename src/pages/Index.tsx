import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { Heart, Sparkles, Smartphone, Send, Check, HelpCircle, ShoppingBag, Wand2, Share2, MapPin, Music, CreditCard, Download, QrCode, ArrowRight } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Index = () => {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="text-2xl font-serif font-bold text-primary">ConvitePro</div>
        <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
          <a href="#como-funciona" className="hover:text-primary transition-colors">Como Funciona</a>
          <a href="#funcionalidades" className="hover:text-primary transition-colors">Funcionalidades</a>
          <a href="#demo" className="hover:text-primary transition-colors">Demonstração</a>
        </div>
        <Button variant="outline" className="rounded-full px-6" onClick={() => window.location.href = '/dashboard'}>Painel Admin</Button>
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
              <Sparkles size={16} /> O Convite Digital #1 do Brasil
            </div>
            <h1 className="text-6xl md:text-8xl font-serif leading-tight mb-8">
              Convites <span className="text-primary italic">Digitais</span> que encantam.
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-lg leading-relaxed">
              Transforme seu evento em uma expérience inesquecível desde o primeiro clique. Prático, elegante e totalmente interativo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full h-14 px-10 text-lg font-semibold shadow-xl shadow-primary/20">
                Comprar no Mercado Livre
              </Button>
              <Button size="lg" variant="ghost" className="rounded-full h-14 px-10 text-lg font-semibold gap-2" onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}>
                Ver Demonstração <ArrowRight size={20} />
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
            <div className="absolute -top-10 -right-10 bg-white p-6 rounded-3xl shadow-xl z-20 animate-bounce">
              <Heart className="text-red-400 h-8 w-8" />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-xl z-20">
              <Sparkles className="text-yellow-400 h-8 w-8" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section id="demo" className="py-24 bg-slate-50 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-serif mb-4">Escolha seu Estilo</h2>
            <p className="text-slate-500">Três temas exclusivos para combinar com a personalidade do seu evento.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Clássico", desc: "Elegância atemporal com fontes serifadas e detalhes dourados.", img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=400", color: "bg-amber-50" },
              { title: "Moderno", desc: "Minimalismo contemporâneo com tipografia bold e cores sólidas.", img: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=400", color: "bg-slate-900 text-white" },
              { title: "Romântico", desc: "Delicadeza floral com tons pastéis e animações suaves.", img: "https://images.unsplash.com/photo-1522673607200-1648832cee98?auto=format&fit=crop&q=80&w=400", color: "bg-rose-50" }
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
                  <Button variant="outline" className="w-full rounded-xl">Ver Exemplo</Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="funcionalidades" className="py-24 bg-white px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-serif mb-4">Tudo o que você precisa</h2>
            <p className="text-slate-500">Funcionalidades pensadas para facilitar a vida dos noivos e convidados.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <MapPin />, title: "Localização", desc: "Link direto para o Google Maps." },
              { icon: <Music />, title: "Música", desc: "Sua trilha sonora favorita ao fundo." },
              { icon: <CreditCard />, title: "Pix Presente", desc: "Receba presentes direto na sua conta." },
              { icon: <Smartphone />, title: "RSVP Digital", desc: "Confirmação de presença em tempo real." },
              { icon: <Download />, title: "Download PDF", desc: "Versão para impressão inclusa." },
              { icon: <QrCode />, title: "QR Code", desc: "Acesso rápido via câmera do celular." },
              { icon: <Send />, title: "WhatsApp", desc: "Compartilhamento fácil e rápido." },
              { icon: <Heart />, title: "Temas", desc: "Estilos que combinam com seu evento." }
            ].map((feat, i) => (
              <div key={i} className="p-6 rounded-3xl border border-slate-100 hover:border-primary/20 hover:bg-primary/5 transition-all group">
                <div className="text-primary mb-4 group-hover:scale-110 transition-transform">{feat.icon}</div>
                <h3 className="font-bold mb-2">{feat.title}</h3>
                <p className="text-sm text-slate-500">{feat.desc}</p>
              </div>
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
              { icon: <ShoppingBag className="h-10 w-10" />, title: "1. Compre", desc: "Adquira seu acesso exclusivo através do Mercado Livre com segurança total." },
              { icon: <Wand2 className="h-10 w-10" />, title: "2. Personalize", desc: "Receba seu link e preencha os dados do seu evento em nossa plataforma intuitiva." },
              { icon: <Share2 className="h-10 w-10" />, title: "3. Compartilhe", desc: "Gere seu link exclusivo e envie para todos os seus convidados via WhatsApp." }
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

      {/* FAQ */}
      <section id="faq" className="py-24 bg-slate-50 px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <HelpCircle className="mx-auto h-12 w-12 text-primary mb-4" />
            <h2 className="text-4xl font-serif mb-4">Dúvidas Frequentes</h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Como recebo meu convite?</AccordionTrigger>
              <AccordionContent>
                Após a compra no Mercado Livre, você receberá automaticamente um link via chat para criar seu convite em nossa plataforma.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Posso alterar os dados depois de pronto?</AccordionTrigger>
              <AccordionContent>
                Sim! O link de criação permite que você edite as informações sempre que precisar.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>O convite expira?</AccordionTrigger>
              <AccordionContent>
                Não. Seu convite ficará online por tempo indeterminado, servindo como uma recordação digital do seu grande dia.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
};

export default Index;