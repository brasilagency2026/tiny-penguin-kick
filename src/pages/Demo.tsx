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
    musica_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
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
          
          <ConvitePreview data={data} />
        </div>
        
        <div className="mt-8 text-center space-y-4">
          <p className="text-slate-400 text-sm font-medium">
            Esta é uma demonstração completa. Seus convidados poderão confirmar presença e ver o mapa do evento.
          </p>
          <div className="flex justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Funcionalidades Ativas</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Demo;