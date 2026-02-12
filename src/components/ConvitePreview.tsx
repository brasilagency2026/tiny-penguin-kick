import React from 'react';
import { MapPin, Phone, Gift, Calendar, Clock, Heart, Sparkles, Flower2, Star, Utensils, Music, Camera, Church, GlassWater } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import Countdown from './Countdown';
import { motion } from 'framer-motion';

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
  const primaryColor = data.cor || '#7c3aed';
  const isModern = data.tema === 'modern';
  const isRomantic = data.tema === 'romantic';
  const isClassic = data.tema === 'classic' || !data.tema;

  const timeline = data.timeline || [];

  return (
    <div className={cn(
      "min-h-full font-sans text-slate-800 pb-10 transition-all duration-500 relative overflow-hidden",
      isModern ? "bg-slate-50" : "bg-white",
      isRomantic ? "bg-rose-50/30" : ""
    )}>
      {/* Decorative Elements for Romantic Theme */}
      {isRomantic && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 100 }}
              animate={{ 
                opacity: [0, 0.5, 0], 
                y: -200,
                x: Math.sin(i) * 50 
              }}
              transition={{ 
                duration: 5 + i, 
                repeat: Infinity, 
                delay: i * 2 
              }}
              className="absolute text-rose-200"
              style={{ 
                left: `${15 + i * 15}%`, 
                bottom: '-10%' 
              }}
            >
              <Heart size={24 + i * 4} fill="currentColor" />
            </motion.div>
          ))}
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
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
          </div>
        )}

        <div className="z-10 space-y-6">
          {isRomantic && (
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
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

      {/* Main Photo (Romantic Style) */}
      {isRomantic && data.foto_url && (
        <div className="px-8 -mt-20 relative z-30 mb-10">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="aspect-[4/5] rounded-[4rem] overflow-hidden border-8 border-white shadow-2xl rotate-2"
          >
            <img src={data.foto_url} className="w-full h-full object-cover" alt="Casal" />
          </motion.div>
        </div>
      )}

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
                  <div className={cn(
                    "p-4 transition-all",
                    isModern ? "bg-slate-900 text-white" : "rounded-2xl bg-slate-50"
                  )} style={{ color: isModern ? undefined : primaryColor }}>
                    <Calendar size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-[0.2em]">Data do Evento</p>
                    <p className="text-lg font-bold">{format(new Date(data.data_evento), "dd 'de' MMMM", { locale: ptBR })}</p>
                  </div>
                </div>
                {data.horario && (
                  <div className="flex items-center space-x-5">
                    <div className={cn(
                      "p-4 transition-all",
                      isModern ? "bg-slate-900 text-white" : "rounded-2xl bg-slate-50"
                    )} style={{ color: isModern ? undefined : primaryColor }}>
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
            <h3 className={cn(
              "text-xs font-bold uppercase tracking-[0.3em]",
              isModern ? "text-slate-900" : "text-slate-400"
            )}>Cronograma</h3>
            <div className="h-1 w-16 bg-slate-100 mx-auto mt-3 rounded-full" style={{ backgroundColor: isModern ? primaryColor : undefined }}></div>
          </div>
          
          <div className="space-y-10 relative before:absolute before:left-[23px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
            {timeline.map((item: any, i: number) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative pl-16"
              >
                <div 
                  className="absolute left-0 top-0 w-12 h-12 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center z-10 shadow-sm" 
                  style={{ color: primaryColor, borderColor: isModern ? primaryColor : undefined }}
                >
                  {ICON_MAP[item.icon] || <Star size={20} />}
                </div>
                <div className="pt-1">
                  <p className="text-xs font-bold text-slate-400 font-mono">{item.time}</p>
                  <p className={cn(
                    "text-xl font-bold",
                    isModern ? "uppercase tracking-tight" : ""
                  )}>{item.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConvitePreview;