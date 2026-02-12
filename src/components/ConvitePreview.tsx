import React from 'react';
import { MapPin, Phone, Gift, Calendar, Clock, Heart, Sparkles, Flower2, Star } from 'lucide-react';
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

  return (
    <div className={cn(
      "min-h-full font-sans text-slate-800 pb-10 transition-all duration-500",
      isModern ? "bg-slate-50" : "bg-white",
      isRomantic ? "bg-rose-50/30" : ""
    )}>
      {/* Header Image/Color Area */}
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
        {/* Theme Specific Background Decorations */}
        {isRomantic && (
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <Flower2 className="absolute top-4 left-4 text-rose-300 rotate-12" size={60} />
            <Flower2 className="absolute bottom-10 right-4 text-rose-300 -rotate-12" size={80} />
            <Heart className="absolute top-20 right-10 text-rose-200" size={30} />
          </div>
        )}

        {isClassic && (
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute inset-0 border-[20px] border-double m-4" style={{ borderColor: primaryColor }}></div>
          </div>
        )}

        <div className="z-10 space-y-6">
          {isRomantic && (
            <div className="flex justify-center gap-2">
              <Heart className="animate-pulse" style={{ color: primaryColor }} size={28} />
            </div>
          )}
          
          <h1 className={cn(
            "leading-tight transition-all duration-500",
            isModern ? "text-6xl font-black tracking-tighter uppercase italic" : "text-4xl font-serif",
            isRomantic ? "text-rose-600 font-cursive" : ""
          )} style={{ color: isModern || isRomantic ? undefined : primaryColor }}>
            {data.nome_evento || "Nome do Evento"}
          </h1>

          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-8 bg-slate-200"></div>
            <p className="text-sm italic text-slate-500 max-w-[240px] leading-relaxed">
              {data.frase ? `"${data.frase}"` : "Sua frase especial aparecerá aqui..."}
            </p>
            <div className="h-[1px] w-8 bg-slate-200"></div>
          </div>
        </div>
      </div>

      {/* Content Card */}
      <div className="px-4 -mt-12 relative z-20">
        <div className={cn(
          "bg-white p-8 space-y-8 transition-all duration-500",
          isModern ? "rounded-none shadow-none border-x-4 border-b-4" : "rounded-[2.5rem] shadow-2xl shadow-slate-200",
          isModern ? "" : "border border-slate-50"
        )} style={{ borderColor: isModern ? primaryColor : undefined }}>
          
          {data.data_evento ? (
            <div className="space-y-8">
              <Countdown targetDate={data.data_evento} color={primaryColor} />
              
              <div className="space-y-6 pt-2">
                <div className="flex items-center space-x-5">
                  <div className={cn(
                    "p-3 transition-all",
                    isModern ? "bg-slate-900 text-white" : "rounded-2xl bg-slate-50"
                  )} style={{ color: isModern ? undefined : primaryColor }}>
                    <Calendar size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-[0.2em]">Data do Evento</p>
                    <p className="text-base font-bold">
                      {format(new Date(data.data_evento), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                    </p>
                  </div>
                </div>

                {data.horario && (
                  <div className="flex items-center space-x-5">
                    <div className={cn(
                      "p-3 transition-all",
                      isModern ? "bg-slate-900 text-white" : "rounded-2xl bg-slate-50"
                    )} style={{ color: isModern ? undefined : primaryColor }}>
                      <Clock size={22} />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-[0.2em]">Horário</p>
                      <p className="text-base font-bold">{data.horario}</p>
                    </div>
                  </div>
                )}

                {data.endereco && (
                  <div className="flex items-center space-x-5">
                    <div className={cn(
                      "p-3 transition-all",
                      isModern ? "bg-slate-900 text-white" : "rounded-2xl bg-slate-50"
                    )} style={{ color: isModern ? undefined : primaryColor }}>
                      <MapPin size={22} />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-[0.2em]">Localização</p>
                      <p className="text-base font-bold leading-snug">{data.endereco}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="py-16 text-center space-y-4">
              <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-200">
                <Calendar size={24} />
              </div>
              <p className="text-slate-300 italic text-sm">
                Selecione uma data para ver os detalhes
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer Preview */}
      <div className="mt-12 px-6 text-center">
        <div className="inline-flex items-center gap-3 text-[10px] text-slate-300 font-bold uppercase tracking-[0.3em]">
          <div className="w-8 h-[1px] bg-slate-100"></div>
          ConvitePro
          <div className="w-8 h-[1px] bg-slate-100"></div>
        </div>
      </div>
    </div>
  );
};

export default ConvitePreview;