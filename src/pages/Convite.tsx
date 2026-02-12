import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Convite } from '@/types/convite';
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Gift, Calendar, Clock, Share2, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const ConvitePage = () => {
  const { slug } = useParams();
  const [convite, setConvite] = useState<Convite | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConvite = async () => {
      const { data, error } = await supabase
        .from('convites')
        .select('*')
        .eq('slug', slug)
        .single();

      if (data) {
        setConvite(data);
        // Increment views
        await supabase.rpc('increment_views', { row_id: data.id });
      }
      setLoading(false);
    };

    fetchConvite();
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  if (!convite) return <div className="min-h-screen flex items-center justify-center">Convite não encontrado.</div>;

  const primaryColor = convite.cor || '#7c3aed';

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 pb-20">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-[60vh] flex items-center justify-center text-center px-6 overflow-hidden"
        style={{ backgroundColor: `${primaryColor}10` }}
      >
        <div className="z-10">
          <h1 className="text-5xl md:text-7xl font-serif mb-4" style={{ color: primaryColor }}>
            {convite.nome_evento}
          </h1>
          <p className="text-xl italic text-slate-600 max-w-md mx-auto">
            "{convite.frase}"
          </p>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full border-4 border-current" style={{ color: primaryColor }} />
          <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full border-2 border-current" style={{ color: primaryColor }} />
        </div>
      </motion.div>

      {/* Details Section */}
      <div className="max-w-lg mx-auto px-6 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-8">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-2xl bg-slate-50" style={{ color: primaryColor }}>
              <Calendar size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Data</p>
              <p className="text-lg font-medium">
                {format(new Date(convite.data_evento), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </p>
            </div>
          </div>

          {convite.horario && (
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-2xl bg-slate-50" style={{ color: primaryColor }}>
                <Clock size={24} />
              </div>
              <div>
                <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Horário</p>
                <p className="text-lg font-medium">{convite.horario}</p>
              </div>
            </div>
          )}

          {convite.endereco && (
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-2xl bg-slate-50" style={{ color: primaryColor }}>
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Local</p>
                <p className="text-lg font-medium">{convite.endereco}</p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <Button 
            className="h-16 rounded-2xl text-lg font-semibold shadow-lg"
            style={{ backgroundColor: primaryColor }}
            onClick={() => window.open(`https://wa.me/${convite.contato}?text=Olá! Confirmo minha presença no evento: ${convite.nome_evento}`, '_blank')}
          >
            <Phone className="mr-2 h-5 w-5" /> Confirmar
          </Button>
          
          <Button 
            variant="outline"
            className="h-16 rounded-2xl text-lg font-semibold border-2 shadow-lg"
            style={{ borderColor: primaryColor, color: primaryColor }}
            onClick={() => window.open(convite.link_maps, '_blank')}
          >
            <MapPin className="mr-2 h-5 w-5" /> Localização
          </Button>

          {convite.link_presentes && (
            <Button 
              variant="secondary"
              className="h-16 rounded-2xl text-lg font-semibold col-span-2 shadow-md"
              onClick={() => window.open(convite.link_presentes, '_blank')}
            >
              <Gift className="mr-2 h-5 w-5" /> Lista de Presentes
            </Button>
          )}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-400 text-sm mb-4">Compartilhe este convite</p>
          <div className="flex justify-center space-x-4">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => navigator.share({ title: convite.nome_evento, url: window.location.href })}>
              <Share2 size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Download size={20} />
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20 text-center text-slate-300 text-xs">
        Criado com ConvitePro
      </div>
    </div>
  );
};

export default ConvitePage;