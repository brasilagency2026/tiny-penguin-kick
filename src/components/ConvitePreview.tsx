import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Phone, Gift, Calendar, Clock, Heart, Sparkles, Flower2, Star, Utensils, Music, Camera, Church, GlassWater, Volume2, VolumeX, CheckSquare, CreditCard, Download, MessageCircle, Copy } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import Countdown from './Countdown';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { QRCodeSVG } from 'qrcode.react';
import RSVPForm from './RSVPForm';
import { showSuccess } from '@/utils/toast';

interface Props {
  data: any;
}

const ICON_MAP: Record<string, any> = {
  heart: <Heart size={20} />,
  church: <Church size={20} />,
  utensils: <Utensils size={20} />,
  music: <Music size={20} />,
  star: <Star size={20} />,
  camera: <Camera size={20} />,
  glass: <GlassWater size={20} />,
};

const ConvitePreview = ({ data }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const primaryColor = data.cor || '#7c3aed';
  const isModern = data.tema === 'modern';
  const isRomantic = data.tema === 'romantic';
  const isClassic = data.tema === 'classic' || !data.tema;

  const timeline = data.timeline || [];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      audioRef.current.load();
    }
  }, [data.musica_url]);

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error("Erro ao tocar:", err));
    }
  };

  const copyPix = () => {
    if (data.pix_key) {
      navigator.clipboard.writeText(data.pix_key);
      showSuccess("Chave Pix copiada!");
    }
  };

  return (
    <div className={cn(
      "min-h-full font-sans text-slate-800 pb-20 transition-all duration-500 relative overflow-hidden",
      isModern ? "bg-slate-50" : "bg-white",
      isRomantic ? "bg-rose-50/30" : ""
    )}>
      {/* Audio Player for Preview */}
      {data.musica_url && (
        <div className="absolute bottom-6 left-6 z-50 flex flex-col items-center gap-2">
          <audio ref={audioRef} src={data.musica_url} loop />
          <motion.div
            animate={!isPlaying ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Button 
              onClick={toggleMusic}
              className="rounded-full w-12 h-12 shadow-xl border-2 border-white"
              style={{ backgroundColor: primaryColor }}
              size="icon"
            >
              {isPlaying ? <Volume2 size={20} /> : <Music size={20} />}
            </Button>
          </motion.div>
          <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[8px] font-bold uppercase tracking-tighter shadow-sm border border-slate-100">
            {isPlaying ? "Tocando" : "Testar Som"}
          </span>
        </div>
      )}

      {/* Header / Photo Section */}
      <div 
        className={cn(
          "relative h-[420px] flex items-center justify-center text-center px-6 overflow-hidden transition-all duration-500",
          isModern ? "bg-white border-b-8" : "",
          isRomantic ? "rounded-b-[5rem]" : "",
          isClassic ? "border-b-4 border-double" : ""
        )}
        style={{ 
          backgroundColor: !isModern ? `${primaryColor}15` : undefined,
          borderColor: isModern || isClassic ? primaryColor : undefined
        }}
      >
        {data.foto_url && (
          <div className="absolute inset-0 z-0">
            <img 
              src={data.foto_url} 
              alt="Capa" 
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
          </div>
        )}

        <div className="z-10 space-y-6">
          {isRomantic && (
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <Heart className="mx-auto text-rose-400" size={32} fill="currentColor" />
            </motion.div>
          )}
          <h1 className={cn(
            "leading-tight transition-all duration-500 drop-shadow-sm",
            isModern ? "text-7xl font-black tracking-tighter uppercase italic" : "text-5xl font-serif",
            isRomantic ? "text-rose-600 font-cursive italic" : "",
            isClassic ? "tracking-widest uppercase" : ""
          )} style={{ color: isModern || isRomantic ? undefined : primaryColor }}>
            {data.nome_evento || "Nome do Evento"}
          </h1>
          <p className={cn(
            "text-sm italic max-w-[240px] mx-auto font-medium",
            isModern ? "font-mono uppercase tracking-widest text-slate-400" : "text-slate-600"
          )}>
            {data.frase ? `"${data.frase}"` : "Sua frase especial aparecerá aqui..."}
          </p>
        </div>
      </div>

      {/* Main Info Card */}
      <div className="px-4 -mt-16 relative z-20">
        <div className={cn(
          "bg-white p-8 space-y-8 transition-all duration-500",
          isModern ? "rounded-none shadow-none border-x-8 border-b-8" : "rounded-[3rem] shadow-2xl shadow-slate-200"
        )} style={{ borderColor: isModern ? primaryColor : undefined }}>
          
          {data.data_evento && (
            <>
              <Countdown targetDate={data.data_evento} color={primaryColor} />
              <div className="space-y-6 pt-4">
                <div className="flex items-center space-x-5">
                  <div className={cn("p-4", isModern ? "bg-slate-900 text-white" : "rounded-2xl bg-slate-50")} style={{ color: isModern ? undefined : primaryColor }}>
                    <Calendar size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-[0.2em]">Data do Evento</p>
                    <p className="text-lg font-bold">{format(new Date(data.data_evento), "dd 'de' MMMM", { locale: ptBR })}</p>
                  </div>
                </div>
                {data.horario && (
                  <div className="flex items-center space-x-5">
                    <div className={cn("p-4", isModern ? "bg-slate-900 text-white" : "rounded-2xl bg-slate-50")} style={{ color: isModern ? undefined : primaryColor }}>
                      <Clock size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-[0.2em]">Horário</p>
                      <p className="text-lg font-bold">{data.horario}</p>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Timeline Section */}
      {timeline.length > 0 && (
        <div className="mt-16 px-8 space-y-10">
          <div className="text-center">
            <h3 className={cn("text-xs font-bold uppercase tracking-[0.3em]", isModern ? "text-slate-900" : "text-slate-400")}>Cronograma</h3>
            <div className="h-1 w-16 bg-slate-100 mx-auto mt-3 rounded-full" style={{ backgroundColor: isModern ? primaryColor : undefined }}></div>
          </div>
          <div className="space-y-10 relative before:absolute before:left-[23px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
            {timeline.map((item: any, i: number) => (
              <div key={i} className="relative pl-16">
                <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center z-10 shadow-sm" style={{ color: primaryColor, borderColor: isModern ? primaryColor : undefined }}>
                  {ICON_MAP[item.icon] || <Star size={20} />}
                </div>
                <div className="pt-1">
                  <p className="text-xs font-bold text-slate-400 font-mono">{item.time}</p>
                  <p className={cn("text-xl font-bold", isModern ? "uppercase tracking-tight" : "")}>{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mural de Recados (Preview) */}
      <div className="mt-16 px-8 space-y-8">
        <div className="text-center">
          <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">Mural de Recados</h3>
          <div className="h-1 w-16 bg-slate-100 mx-auto mt-3 rounded-full"></div>
        </div>
        <div className="bg-slate-50 p-6 rounded-3xl border border-dashed border-slate-200 relative">
          <MessageCircle className="absolute top-4 right-4 text-slate-200 h-6 w-6" />
          <p className="text-slate-400 italic text-sm">"As mensagens carinhosas dos seus convidados aparecerão aqui..."</p>
          <p className="text-xs font-bold text-slate-300 mt-4">— Exemplo de Convidado</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-12 px-8 grid grid-cols-2 gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button className={cn("h-14 text-base font-bold shadow-lg", isModern ? "rounded-none" : "rounded-2xl")} style={{ backgroundColor: primaryColor }}>
              <CheckSquare className="mr-2 h-5 w-5" /> Confirmar
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader><DialogTitle className="text-center font-serif">Confirmar Presença</DialogTitle></DialogHeader>
            <RSVPForm conviteId="preview" primaryColor={primaryColor} />
          </DialogContent>
        </Dialog>
        
        <Button 
          variant="outline" 
          className={cn("h-14 text-base font-bold border-2 shadow-lg", isModern ? "rounded-none" : "rounded-2xl")} 
          style={{ borderColor: primaryColor, color: primaryColor }}
          onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.endereco || 'Local do Evento')}`, '_blank')}
        >
          <MapPin className="mr-2 h-5 w-5" /> Mapa
        </Button>

        {data.pix_key && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary" className={cn("h-14 text-base font-bold col-span-2 shadow-md", isModern ? "rounded-none" : "rounded-2xl")}>
                <CreditCard className="mr-2 h-5 w-5" /> Presentear com Pix
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md text-center">
              <DialogHeader><DialogTitle className="font-serif">Presente em Pix</DialogTitle></DialogHeader>
              <div className="py-6 space-y-4 flex flex-col items-center">
                <div className="p-4 bg-white rounded-2xl border-2 border-slate-100">
                  <QRCodeSVG value={data.pix_key} size={180} />
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-dashed border-slate-200 font-mono text-sm break-all w-full">
                  {data.pix_key}
                </div>
                <Button onClick={copyPix} className="w-full gap-2 h-12 rounded-xl">
                  <Copy size={18} /> Copiar Chave Pix
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}

        <div className="col-span-2 pt-4">
          <Button variant="ghost" className="w-full gap-2 text-slate-400 hover:text-primary">
            <Download size={18} /> Baixar Versão em PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConvitePreview;