import React from 'react';
import { MapPin, Phone, Gift, Calendar, Clock, Heart } from 'lucide-react';
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
      "min-h-full font-sans text-slate-800 pb-10",
      isModern ? "bg-slate-50" : "bg-white"
    )}>
      <div 
        className={cn(
          "relative h-[300px] flex items-center justify-center text-center px-4 overflow-hidden",
          isModern ? "bg-white border-b" : ""
        )}
        style={{ backgroundColor: !isModern ? `${primaryColor}10` : undefined }}
      >
        <div className="z-10">
          {isRomantic && <Heart className="mx-auto mb-2" style={{ color: primaryColor }} />}
          <h1 className={cn(
            "text-3xl mb-2",
            isModern ? "font-sans font-black tracking-tighter uppercase" : "font-serif"
          )} style={{ color: primaryColor }}>
            {data.nome_evento || "Nome do Evento"}
          </h1>
          <p className="text-sm italic text-slate-600 max-w-[250px] mx-auto">
            "{data.frase || "Sua frase especial aqui..."}"
          </p>
        </div>
      </div>

      <div className="px-4 -mt-6 relative z-20">
        <div className={cn(
          "bg-white p-6 space-y-6",
          isModern ? "rounded-none shadow-none border" : "rounded-2xl shadow-xl"
        )}>
          {data.data_evento && (
            <div className="space-y-4">
              <Countdown targetDate={data.data_evento} color={primaryColor} />
              <div className="flex items-center space-x-3">
                <Calendar size={20} style={{ color: primaryColor }} />
                <p className="text-sm font-medium">
                  {format(new Date(data.data_evento), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                </p>
              </div>
            </div>
          )}

          {data.horario && (
            <div className="flex items-center space-x-3">
              <Clock size={20} style={{ color: primaryColor }} />
              <p className="text-sm font-medium">{data.horario}</p>
            </div>
          )}

          {data.endereco && (
            <div className="flex items-center space-x-3">
              <MapPin size={20} style={{ color: primaryColor }} />
              <p className="text-sm font-medium">{data.endereco}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConvitePreview;