import React from 'react';
import { MapPin, Phone, Gift, Calendar, Clock, Heart, Sparkles } from 'lucide-react';
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

  return (
    <div className={cn(
      "min-h-full font-sans text-slate-800 pb-10 transition-colors duration-500",
      isModern ? "bg-slate-50" : "bg-white"
    )}>
      {/* Header Image/Color Area */}
      <div 
        className={cn(
          "relative h-[320px] flex items-center justify-center text-center px-4 overflow-hidden transition-all duration-500",
          isModern ? "bg-white border-b" : ""
        )}
        style={{ backgroundColor: !isModern ? `${primaryColor}15` : undefined }}
      >
        <div className="z-10 space-y-4">
          {isRomantic && (
            <div className="flex justify-center gap-2">
              <Heart className="animate-pulse" style={{ color: primaryColor }} size={24} />
              <Sparkles className="animate-bounce delay-100" style={{ color: primaryColor }} size={20} />
            </div>
          )}
          <h1 className={cn(
            "text-4xl leading-tight",
            isModern ? "font-sans font-black tracking-tighter uppercase" : "font-serif"
          )} style={{ color: primaryColor }}>
            {data.nome_evento || "Nome do Evento"}
          </h1>
          <div className="w-12 h-1 mx-auto rounded-full" style={{ backgroundColor: primaryColor }}></div>
          <p className="text-sm italic text-slate-500 max-w-[280px] mx-auto leading-relaxed">
            {data.frase ? `"${data.frase}"` : "Sua frase especial aparecerá aqui..."}
          </p>
        </div>
        
        {/* Decorative elements for Romantic theme */}
        {isRomantic && (
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-4 left-4 rotate-12"><Heart size={40} /></div>
            <div className="absolute bottom-4 right-4 -rotate-12"><Heart size={40} /></div>
          </div>
        )}
      </div>

      {/* Content Card */}
      <div className="px-4 -mt-8 relative z-20">
        <div className={cn(
          "bg-white p-6 space-y-6 transition-all duration-500",
          isModern ? "rounded-none shadow-none border border-slate-200" : "rounded-3xl shadow-2xl shadow-slate-200"
        )}>
          {data.data_evento ? (
            <div className="space-y-6">
              <Countdown targetDate={data.data_evento} color={primaryColor} />
              
              <div className="space-y-4 pt-2">
                <div className="flex items-center space-x-4">
                  <div className="p-2.5 rounded-xl bg-slate-50" style={{ color: primaryColor }}>
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Data</p>
                    <p className="text-sm font-semibold">
                      {format(new Date(data.data_evento), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                    </p>
                  </div>
                </div>

                {data.horario && (
                  <div className="flex items-center space-x-4">
                    <div className="p-2.5 rounded-xl bg-slate-50" style={{ color: primaryColor }}>
                      <Clock size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Horário</p>
                      <p className="text-sm font-semibold">{data.horario}</p>
                    </div>
                  </div>
                )}

                {data.endereco && (
                  <div className="flex items-center space-x-4">
                    <div className="p-2.5 rounded-xl bg-slate-50" style={{ color: primaryColor }}>
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Local</p>
                      <p className="text-sm font-semibold leading-snug">{data.endereco}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="py-10 text-center text-slate-300 italic text-sm">
              Selecione uma data para ver os detalhes
            </div>
          )}
        </div>
      </div>
      
      {/* Footer Preview */}
      <div className="mt-8 px-6 text-center">
        <div className="inline-flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
          <div className="w-4 h-[1px] bg-slate-200"></div>
          ConvitePro
          <div className="w-4 h-[1px] bg-slate-200"></div>
        </div>
      </div>
    </div>
  );
};

export default ConvitePreview;