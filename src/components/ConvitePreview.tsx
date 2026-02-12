import React from 'react';
import { MapPin, Phone, Gift, Calendar, Clock, Heart, Sparkles, Flower2, Star, Utensils, Music, Camera } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import Countdown from './Countdown';

interface Props {
  data: any;
}

const ConvitePreview = ({ data }: Props) => {
  const primaryColor = data.cor || '#7c3aed';
  const isModern = data.tema === 'modern';
  const isRomantic = data.tema === 'romantic';
  const isClassic = data.tema === 'classic' || !data.tema;

  const timeline = data.timeline || [
    { time: '19:00', title: 'Cerimônia' },
    { time: '20:30', title: 'Jantar' },
    { time: '22:00', title: 'Festa' }
  ];

  return (
    <div className={cn(
      "min-h-full font-sans text-slate-800 pb-10 transition-all duration-500",
      isModern ? "bg-slate-50" : "bg-white",
      isRomantic ? "bg-rose-50/30" : ""
    )}>
      {/* Header */}
      <div 
        className={cn(
          "relative h-[360px] flex items-center justify-center text-center px-6 overflow-hidden transition-all duration-500",
          isModern ? "bg-white border-b-4" : "",
          isRomantic ? "rounded-b-[4rem]" : ""
        )}
        style={{ 
          backgroundColor: !isModern ? `${primaryColor}15` : undefined,
          borderColor: isModern ? primaryColor : undefined
        }}
      >
        <div className="z-10 space-y-6">
          {isRomantic && <Heart className="mx-auto animate-pulse text-rose-400" size={28} />}
          <h1 className={cn(
            "leading-tight transition-all duration-500",
            isModern ? "text-6xl font-black tracking-tighter uppercase italic" : "text-4xl font-serif",
            isRomantic ? "text-rose-600 font-cursive" : ""
          )} style={{ color: isModern || isRomantic ? undefined : primaryColor }}>
            {data.nome_evento || "Nome do Evento"}
          </h1>
          <p className="text-sm italic text-slate-500 max-w-[240px] mx-auto">
            {data.frase ? `"${data.frase}"` : "Sua frase especial aparecerá aqui..."}
          </p>
        </div>
      </div>

      {/* Main Info */}
      <div className="px-4 -mt-12 relative z-20">
        <div className={cn(
          "bg-white p-8 space-y-8 transition-all duration-500",
          isModern ? "rounded-none shadow-none border-x-4 border-b-4" : "rounded-[2.5rem] shadow-2xl shadow-slate-200"
        )} style={{ borderColor: isModern ? primaryColor : undefined }}>
          
          {data.data_evento && (
            <>
              <Countdown targetDate={data.data_evento} color={primaryColor} />
              <div className="space-y-6 pt-2">
                <div className="flex items-center space-x-5">
                  <div className={cn("p-3", isModern ? "bg-slate-900 text-white" : "rounded-2xl bg-slate-50")} style={{ color: isModern ? undefined : primaryColor }}>
                    <Calendar size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-[0.2em]">Data</p>
                    <p className="text-base font-bold">{format(new Date(data.data_evento), "dd 'de' MMMM", { locale: ptBR })}</p>
                  </div>
                </div>
                {data.horario && (
                  <div className="flex items-center space-x-5">
                    <div className={cn("p-3", isModern ? "bg-slate-900 text-white" : "rounded-2xl bg-slate-50")} style={{ color: isModern ? undefined : primaryColor }}>
                      <Clock size={22} />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-[0.2em]">Horário</p>
                      <p className="text-base font-bold">{data.horario}</p>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Timeline Section */}
      <div className="mt-12 px-8 space-y-8">
        <div className="text-center">
          <h3 className="text-lg font-bold uppercase tracking-widest text-slate-400">Cronograma</h3>
          <div className="h-1 w-12 bg-slate-100 mx-auto mt-2"></div>
        </div>
        
        <div className="space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
          {timeline.map((item: any, i: number) => (
            <div key={i} className="relative pl-12">
              <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center z-10" style={{ color: primaryColor }}>
                {i === 0 ? <Heart size={16} /> : i === timeline.length - 1 ? <Music size={16} /> : <Star size={16} />}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400">{item.time}</p>
                <p className="text-base font-bold">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConvitePreview;