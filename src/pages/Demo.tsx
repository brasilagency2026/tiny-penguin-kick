import React, { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import ConvitePreview from '@/components/ConvitePreview';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, Smartphone, Monitor, Sparkles, Music, Volume2, 
  CheckSquare, MapPin, CreditCard, Copy, CalendarPlus, 
  MessageCircle, Heart, Download, VolumeX
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import RSVPForm from '@/components/RSVPForm';
import { QRCodeSVG } from 'qrcode.react';
import { showSuccess, showError } from '@/utils/toast';
import { motion, AnimatePresence } from 'framer-motion';

const DEMO_DATA: Record<string, any> = {
  classic: {
    nome_evento: "Helena & Gabriel",
    frase: "O amor é a única coisa que cresce quando se reparte.",
    data_evento: "2025-12-20",
    horario: "19:00",
    endereco: "Catedral Metropolitana, Praça da Sé, São Paulo",
    tema: "classic",
    cor: "#7c3aed",
    pix_key: "helenaegabriel@email.com",
    musica_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    timeline: [
      { time: '19:00', title: 'Cerimônia Religiosa', icon: 'church' },
      { time: '20:30', title: 'Recepção e Jantar', icon: 'utensils' },
      { time: '22:30', title: 'Abertura da Pista', icon: 'music' }
    ],
    messages: [
      { nome: "Tia Maria", mensagem: "Que alegria ver vocês unindo suas vidas! Estaremos lá com certeza." },
      { nome: "Carlos & Ana", mensagem: "Contando os dias para essa festa maravilhosa!" }
    ]
  },
  modern: {
    nome_evento: "MARCOS & JULIA",
    frase: "WE DECIDED ON FOREVER.",
    data_evento: "2025-11-15",
    horario: "17:30",
    endereco: "Espaço Contemporâneo, Av. Europa, 1200",
    tema: "modern",
    cor: "#0f172a",
    pix_key: "000.000.000-00",
    musica_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    timeline: [
      { time: '17:30', title: 'Welcome Drinks', icon: 'glass' },
      { time: '18:30', title: 'Troca de Votos', icon: 'heart' },
      { time: '20:00', title: 'Party Time', icon: 'music' }
    ],
    messages: [
      { nome: "Bruno", mensagem: "Essa festa vai ser épica! Já preparei o traje." }
    ]
  },
  romantic: {
    nome_evento: "Sophia & Lucas",
    frase: "Para todo o sempre, o nosso amor.",
    data_evento: "2025-10-10",
    horario: "16:00",
    endereco: "Fazenda das Flores, Estrada das Rosas, KM 12",
    tema: "romantic",
    cor: "#db2777",
    foto_url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800",
    pix_key: "sophiaelucas@love.com",
    musica_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    timeline: [
      { time: '16:00', title: 'Cerimônia no Jardim', icon: 'heart' },
      { time: '18:00', title: 'Coquetel ao Pôr do Sol', icon: 'glass' },
      { time: '19:30', title: 'Jantar à Luz de Velas', icon: 'utensils' }
    ],
    messages: [
      { nome: "Mãe da Sophia", mensagem: "Minha pequena vai casar! Todo amor do mundo para vocês." }
    ]
  }
};

const Demo = () => {
  const { theme } = useParams();
  const data = DEMO_DATA[theme || 'classic'] || DEMO_DATA.classic;
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(err => {
            console.error("Erro ao tocar áudio:", err);
            showError("Clique novamente para ativar o som.");
          });
      }
    }
  };

  const copyPix = () => {
    navigator.clipboard.writeText(data.pix_key);
    showSuccess("Chave Pix copiada!");
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white border-b px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <div>
            <h1 className="text-sm font-bold uppercase tracking-widest text-slate-400">Demonstração</h1>
            <p className="text-lg font-serif font-bold text-primary">Tema {theme?.charAt(0).toUpperCase()}{theme?.slice(1)}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/criar?token=demo">
            <Button className="rounded-xl font-bold">Criar o Meu</Button>
          </Link>
        </div>
      </header>

      <main className="max-w-md mx-auto py-8 px-4 pb-32">
        <div className="relative border-[12px] border-slate-900 rounded-[3.5rem] overflow-hidden shadow-2xl bg-white min-h-[800px]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-50"></div>
          
          {/* Music Player */}
          <audio 
            ref={audioRef} 
            src={data.musica_url} 
            loop 
            preload="auto"
            crossOrigin="anonymous"
          />
          
          <div className="absolute bottom-6 left-6 z-40 flex flex-col items-center gap-2">
            <motion.div
              animate={!isPlaying ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Button 
                onClick={toggleMusic}
                className="rounded-full w-14 h-14 shadow-2xl border-4 border-white"
                style={{ backgroundColor: data.cor }}
              >
                {isPlaying ? <Volume2 size={24} /> : <Music size={24} />}
              </Button>
            </motion.div>
            <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tighter shadow-sm border border-slate-100">
              {isPlaying ? "Tocando" : "Clique p/ ouvir"}
            </span>
          </div>

          <ConvitePreview data={data} />

          {/* Interactive Demo Elements */}
          <div className="px-8 pb-12 space-y-8 bg-white">
            {/* Wall of Messages Mock */}
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Mural de Recados</h3>
                <div className="h-1 w-12 bg-slate-100 mx-auto mt-2"></div>
              </div>
              <div className="space-y-4">
                {data.messages.map((msg: any, i: number) => (
                  <div key={i} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 relative">
                    <MessageCircle className="absolute top-3 right-3 text-slate-200 h-5 w-5" />
                    <p className="text-sm text-slate-600 italic mb-2">"{msg.mensagem}"</p>
                    <p className="text-xs font-bold text-slate-800">— {msg.nome}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons Mock */}
            <div className="grid grid-cols-2 gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="h-14 rounded-2xl font-bold" style={{ backgroundColor: data.cor }}>
                    <CheckSquare className="mr-2 h-4 w-4" /> Confirmar
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader><DialogTitle className="text-center font-serif">Confirmar Presença</DialogTitle></DialogHeader>
                  <RSVPForm conviteId="demo" primaryColor={data.cor} />
                </DialogContent>
              </Dialog>

              <Button 
                variant="outline" 
                className="h-14 rounded-2xl font-bold border-2" 
                style={{ borderColor: data.cor, color: data.cor }}
                onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.endereco)}`, '_blank')}
              >
                <MapPin className="mr-2 h-4 w-4" /> Mapa
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary" className="h-14 rounded-2xl font-bold col-span-2">
                    <CreditCard className="mr-2 h-4 w-4" /> Presentear com Pix
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md text-center">
                  <DialogHeader><DialogTitle className="font-serif">Presente em Pix</DialogTitle></DialogHeader>
                  <div className="py-4 space-y-4 flex flex-col items-center">
                    <div className="p-3 bg-white rounded-2xl border-2 border-slate-100">
                      <QRCodeSVG value={data.pix_key} size={150} />
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-dashed border-slate-200 font-mono text-xs break-all w-full">
                      {data.pix_key}
                    </div>
                    <Button onClick={copyPix} className="w-full gap-2 h-12 rounded-xl">
                      <Copy size={16} /> Copiar Chave
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Button variant="ghost" className="col-span-2 text-slate-400 text-xs gap-2">
                <Download size={14} /> Baixar Versão em PDF
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center space-y-4">
          <p className="text-slate-400 text-sm font-medium">
            Esta é uma demonstração completa. Seus convidados poderão confirmar presença, ver o mapa e até enviar presentes via Pix.
          </p>
          <div className="flex justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Funcionalidades Ativas</span>
          </div>
        </div>
      </main>

      {/* Floating RSVP for Demo */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-3rem)] max-w-xs md:hidden">
        <Button className="w-full h-14 rounded-full text-lg font-bold shadow-2xl" style={{ backgroundColor: data.cor }}>
          <CheckSquare className="mr-2 h-5 w-5" /> Confirmar Agora
        </Button>
      </div>
    </div>
  );
};

export default Demo;