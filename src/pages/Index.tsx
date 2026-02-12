import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { Heart, Sparkles, Smartphone, Send, Check, HelpCircle, ShoppingBag, Wand2, Share2 } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Index = () => {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="text-2xl font-serif font-bold text-primary">ConvitePro</div>
        <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
          <a href="#como-funciona" className="hover:text-primary transition-colors">Como Funciona</a>
          <a href="#precos" className="hover:text-primary transition-colors">Preços</a>
          <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
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
            <div className="absolute -top-10 -right-10 bg-white p-6 rounded-3xl shadow-xl z-20 animate-bounce">
              <Heart className="text-red-400 h-8 w-8" />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-xl z-20">
              <Sparkles className="text-yellow-400 h-8 w-8" />
            </div>
          </motion.div>
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

      {/* Pricing */}
      <section id="precos" className="py-24 bg-white px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-serif mb-4">Preço Único e Justo</h2>
            <p className="text-slate-500">Tudo o que você precisa para o seu evento.</p>
          </div>
          <div className="max-w-md mx-auto bg-slate-50 rounded-[3rem] p-12 border-2 border-primary/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-white px-6 py-2 rounded-bl-3xl text-sm font-bold">
              OFERTA
            </div>
            <div className="text-center mb-8">
              <span className="text-slate-500 line-through text-lg">R$ 49,90</span>
              <div className="text-5xl font-bold text-primary mt-2">R$ 29,90</div>
              <p className="text-slate-400 mt-2">Pagamento único</p>
            </div>
            <ul className="space-y-4 mb-10">
              {[
                "Link exclusivo e vitalício",
                "Confirmação via WhatsApp",
                "Localização Google Maps",
                "Lista de Presentes",
                "Contagem Regressiva",
                "Download em PDF",
                "QR Code incluso"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-600">
                  <Check className="text-green-500 h-5 w-5" /> {item}
                </li>
              ))}
            </ul>
            <Button className="w-full h-14 rounded-full text-lg font-bold">Comprar Agora</Button>
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