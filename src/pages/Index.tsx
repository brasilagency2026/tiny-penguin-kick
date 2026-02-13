import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { 
  Heart, Sparkles, ShoppingBag, ArrowRight, Baby, GraduationCap, 
  PartyPopper, Church, Wand2, Share2, Play, Cross, CheckCircle2,
  Music, MapPin, LayoutDashboard, Download, MessageSquare, Smartphone,
  Users, ShieldCheck, Zap, Timer
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const ML_UNIQUE_LINK = "#"; // Link único para o produto no Mercado Livre

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

  const backgrounds = [
    { name: "Casamento", url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=400" },
    { name: "Nascimento", url: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=400" },
    { name: "Festas", url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=400" },
    { name: "Formatura", url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=400" },
    { name: "Homenagens", url: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=400" }
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
          <a href="#galeria" className="hover:text-primary transition-colors">Inspiração</a>
          <a href="#gestao" className="hover:text-primary transition-colors">Gestão</a>
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

      {/* Background Gallery */}
      <section id="galeria" className="py-32 bg-white px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-serif mb-6">Fundos Profissionais</h2>
              <p className="text-lg text-slate-500">Escolha entre nossa curadoria de imagens de alta resolution ou use sua própria foto especial.</p>
            </div>
            <Button variant="outline" className="rounded-full h-12 px-8 font-bold" onClick={() => navigate('/demo/classic')}>
              Ver todos os fundos
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {backgrounds.map((bg, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.05 }}
                className="relative group cursor-pointer overflow-hidden rounded-3xl h-80"
              >
                <img src={bg.url} alt={bg.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <p className="text-white font-bold text-lg">{bg.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Section */}
      <section id="gestao" className="py-32 bg-slate-900 text-white px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-[100px]"></div>
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" 
              alt="Dashboard" 
              className="relative z-10 rounded-[2.5rem] shadow-2xl border border-white/10"
            />
          </div>
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-serif leading-tight">Controle total na palma da sua mão.</h2>
            <p className="text-xl text-slate-400 leading-relaxed">
              Esqueça as planilhas manuais. Nosso painel de gestão organiza tudo para você:
            </p>
            <ul className="space-y-6">
              {[
                "Lista de convidados exportável para Excel/CSV",
                "Contagem automática de adultos e crianças",
                "Visualização de mensagens deixadas no mural",
                "Gráficos de visualizações do seu convite"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-lg">
                  <div className="bg-primary/20 p-1 rounded-full text-primary">
                    <CheckCircle2 size={20} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <Button 
              size="lg" 
              className="rounded-full h-16 px-12 text-xl font-bold bg-white text-slate-900 hover:bg-slate-100"
              onClick={() => navigate('/demo-gestao')}
            >
              Ver Painel de Gestão Demo
            </Button>
          </div>
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