import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { 
  Heart, Sparkles, ShoppingBag, ArrowRight, Baby, GraduationCap, 
  PartyPopper, Church, Wand2, Share2, Play, Cross, CheckCircle2,
  Music, MapPin, LayoutDashboard, Download, MessageSquare, Smartphone,
  Users, ShieldCheck, Zap, Timer, Key, HelpCircle, ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Index = () => {
  const navigate = useNavigate();
  // Link real do seu anúncio conforme o print
  const ML_UNIQUE_LINK = "https://produto.mercadolivre.com.br/MLB-6254023008-convite-digital-interativo-gesto-de-convidados-e-rsvp-JM";

  const steps = [
    {
      icon: <ShoppingBag />,
      title: "1. Compra no Mercado Livre",
      desc: "Adquira seu acesso único através do nosso anúncio oficial com toda a segurança do Mercado Pago."
    },
    {
      icon: <Key />,
      title: "2. Receba seu Token",
      desc: "Após a confirmação, você receberá instantaneamente via mensagem um link exclusivo com seu Token de acesso."
    },
    {
      icon: <Wand2 />,
      title: "3. Crie a Mágica",
      desc: "Use nossa plataforma intuitiva para escolher fotos, músicas, cores e preencher os dados do seu evento."
    },
    {
      icon: <Share2 />,
      title: "4. Envie e Encante",
      desc: "Compartilhe o link personalizado ou o PDF interativo com seus convidados via WhatsApp ou Redes Sociais."
    },
    {
      icon: <LayoutDashboard />,
      title: "5. Gerencie Tudo",
      desc: "Acesse seu painel exclusivo para ver quem confirmou presença e ler as mensagens carinhosas recebidas."
    }
  ];

  const features = [
    {
      icon: <Timer className="text-orange-500" />,
      title: "Contagem Regressiva",
      desc: "Aumente a expectativa dos seus convidados com um contador em tempo real para o grande dia."
    },
    {
      icon: <Music className="text-purple-500" />,
      title: "Trilha Sonora",
      desc: "Adicione uma música de fundo emocionante ou seu próprio áudio personalizado."
    },
    {
      icon: <Users className="text-blue-500" />,
      title: "Gestão de Convidados",
      desc: "Painel exclusivo para ver quem confirmou presença, número de adultos e crianças."
    },
    {
      icon: <MapPin className="text-red-500" />,
      title: "Mapa Inteligente",
      desc: "Botão direto para Google Maps e Waze, facilitando a chegada dos convidados."
    },
    {
      icon: <Download className="text-green-500" />,
      title: "PDF Interativo",
      desc: "Gere um arquivo PDF elegante que mantém os botões clicáveis para enviar por e-mail."
    },
    {
      icon: <MessageSquare className="text-amber-500" />,
      title: "Mural de Recados",
      desc: "Um espaço carinhoso onde seus convidados podem deixar mensagens especiais."
    }
  ];

  const faqs = [
    {
      q: "Quanto tempo o convite fica no ar?",
      a: "Seu convite permanece ativo e disponível até 30 dias após a data do evento, garantindo que todos possam acessar as informações e você possa baixar sua lista de convidados."
    },
    {
      q: "Posso alterar os dados depois de criar?",
      a: "Sim! Com o seu link de gestão, você pode editar qualquer informação (horário, local, foto, música) a qualquer momento, e o convite dos seus convidados é atualizado instantaneamente."
    },
    {
      q: "Como recebo o acesso após comprar no Mercado Livre?",
      a: "O envio é automático. Assim que o Mercado Livre confirma o pagamento, nosso sistema envia uma mensagem privada para você com o link de criação e seu token único."
    },
    {
      q: "Os convidados precisam baixar algum aplicativo?",
      a: "Não. O convite abre diretamente no navegador de qualquer celular ou computador, como um site moderno e leve."
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="text-2xl font-serif font-bold text-primary flex items-center gap-2">
          <Sparkles className="text-primary" /> ConvitePro
        </div>
        <div className="hidden md:flex space-x-8 text-sm font-bold text-slate-500 uppercase tracking-widest">
          <a href="#recursos" className="hover:text-primary transition-colors">Recursos</a>
          <a href="#como-funciona" className="hover:text-primary transition-colors">Como Funciona</a>
          <a href="#faq" className="hover:text-primary transition-colors">Dúvidas</a>
        </div>
        <div className="flex gap-4">
          <Button variant="ghost" className="rounded-full font-bold text-primary hidden sm:flex" onClick={() => navigate('/demo-gestao')}>
            <LayoutDashboard size={16} className="mr-2" /> Ver Painel Demo
          </Button>
          <Button 
            className="rounded-full px-8 font-bold shadow-lg shadow-primary/20"
            onClick={() => window.open(ML_UNIQUE_LINK, '_blank')}
          >
            Comprar Acesso
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/5 text-primary px-4 py-2 rounded-full text-sm font-bold mb-8">
              <Zap size={16} /> O convite digital mais completo do mercado
            </div>
            <h1 className="text-6xl md:text-8xl font-serif leading-[1.1] mb-8">
              Transforme seu evento em uma <span className="text-primary italic">experiência.</span>
            </h1>
            <p className="text-xl text-slate-500 mb-12 max-w-lg leading-relaxed">
              Muito mais que um convite: uma plataforma completa com música, contagem regressiva e painel de gestão para o seu grande dia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="rounded-full h-16 px-12 text-xl font-bold shadow-2xl shadow-primary/30"
                onClick={() => window.open(ML_UNIQUE_LINK, '_blank')}
              >
                <ShoppingBag className="mr-2" /> Adquirir Acesso Único
              </Button>
              <Button size="lg" variant="ghost" className="rounded-full h-16 px-10 text-lg font-semibold gap-2" onClick={() => navigate('/demo/classic')}>
                Ver Demonstração <ArrowRight size={20} />
              </Button>
            </div>
            <div className="mt-12 flex items-center gap-6 text-slate-400">
              <div className="flex items-center gap-2"><ShieldCheck size={18} /> Pagamento Seguro</div>
              <div className="flex items-center gap-2"><CheckCircle2 size={18} /> Acesso Vitalício</div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative z-10 bg-slate-900 rounded-[4rem] p-4 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] rotate-2 hover:rotate-0 transition-transform duration-700">
              <img 
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800" 
                alt="Convite Digital" 
                className="rounded-[3.5rem] w-full h-[650px] object-cover"
              />
              <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 hidden md:block">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <Users size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">Confirmados</p>
                    <p className="text-xl font-bold text-slate-800">124 Pessoas</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="como-funciona" className="py-32 bg-white px-8 border-y border-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Como funciona?</h2>
            <p className="text-lg text-slate-500">Um processo simples, rápido e totalmente automatizado para você não perder tempo.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
            {/* Connecting Line for Desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] bg-slate-100 -translate-y-1/2 z-0"></div>
            
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                <div className="w-20 h-20 bg-white border-4 border-slate-50 rounded-full flex items-center justify-center mb-6 text-primary shadow-xl group-hover:border-primary/20 transition-colors">
                  {React.cloneElement(step.icon as React.ReactElement, { size: 32 })}
                </div>
                <h3 className="text-lg font-bold mb-3">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Features */}
      <section id="recursos" className="py-32 bg-slate-50 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Interatividade que encanta</h2>
            <p className="text-lg text-slate-500">Seus convidados não apenas recebem uma imagem, eles interagem com o seu sonho.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {features.map((f, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100"
              >
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 text-2xl">
                  {f.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 bg-white px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
              <HelpCircle size={14} /> FAQ
            </div>
            <h2 className="text-4xl font-serif">Dúvidas Frequentes</h2>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border rounded-3xl px-6 bg-slate-50/50">
                <AccordionTrigger className="text-left font-bold text-lg hover:no-underline py-6">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-500 text-base pb-6 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-white text-center px-8">
        <div className="max-w-3xl mx-auto space-y-10">
          <div className="inline-block p-4 bg-primary/5 rounded-3xl mb-4">
            <Heart className="text-primary h-12 w-12 animate-pulse" />
          </div>
          <h2 className="text-5xl md:text-7xl font-serif">Pronto para criar algo inesquecível?</h2>
          <p className="text-xl text-slate-500">Adquira sua licença única e comece a criar agora mesmo. Sem mensalidades, sem complicações.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              className="rounded-full h-16 px-12 text-xl font-bold shadow-2xl shadow-primary/30"
              onClick={() => window.open(ML_UNIQUE_LINK, '_blank')}
            >
              Comprar no Mercado Livre
            </Button>
          </div>
          <p className="text-sm text-slate-400 font-medium">Acesso enviado instantaneamente após a confirmação do pagamento.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-serif font-bold text-slate-400">ConvitePro</div>
          <p className="text-slate-400 text-sm">© 2024 ConvitePro. Todos os direitos reservados.</p>
          <div className="flex gap-6 text-slate-400">
            <a href="#" className="hover:text-primary transition-colors">Termos</a>
            <a href="#" className="hover:text-primary transition-colors">Privacidade</a>
            <a href="#" className="hover:text-primary transition-colors">Suporte</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;