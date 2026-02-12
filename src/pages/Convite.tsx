import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Convite } from '@/types/convite';
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Gift, Calendar, Clock, Share2, Download, QrCode, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { QRCodeSVG } from 'qrcode.react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { InvitationPDF } from '@/components/InvitationPDF';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from '@/lib/utils';

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
        await supabase.rpc('increment_views', { row_id: data.id });
      }
      setLoading(false);
    };

    fetchConvite();
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  if (!convite) return <div className="min-h-screen flex items-center justify-center">Convite não encontrado.</div>;

  const primaryColor = convite.cor || '#7c3aed';
  const isModern = convite.tema === 'modern';
  const isRomantic = convite.tema === 'romantic';

  return (
    <div className={cn(
      "min-h-screen font-sans text-slate-800 pb-20",
      isModern ? "bg-slate-50" : "bg-white"
    )}>
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "relative h-[50vh] flex items-center justify-center text-center px-6 overflow-hidden",
          isModern ? "bg-white border-b" : ""
        )}
        style={{ backgroundColor: !isModern ? `${primaryColor}10` : undefined }}
      >
        <div className="z-10">
          {isRomantic && <Heart className="mx-auto mb-4 animate-pulse" style={{ color: primaryColor }} />}
          <h1 className={cn(
            "text-5xl md:text-7xl mb-4",
            isModern ? "font-sans font-black tracking-tighter uppercase" : "font-serif"
          )} style={{ color: primaryColor }}>
            {convite.nome_evento}
          </h1>
          <p className="text-xl italic text-slate-600 max-w-md mx-auto">
            "{convite.frase}"
          </p>
        </div>
      </motion.div>

      {/* Details Section */}
      <div className="max-w-lg mx-auto px-6 -mt-10 relative z-20">
        <div className={cn(
          "bg-white p-8 space-y-8",
          isModern ? "rounded-none shadow-none border" : "rounded-3xl shadow-2xl"
        )}>
          <div className="flex items-center space-x-4">
            <div className={cn("p-3", isModern ? "bg-slate-100" : "rounded-2xl bg-slate-50")} style={{ color: primaryColor }}>
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
              <div className={cn("p-3", isModern ? "bg-slate-100" : "rounded-2xl bg-slate-50")} style={{ color: primaryColor }}>
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
              <div className={cn("p-3", isModern ? "bg-slate-100" : "rounded-2xl bg-slate-50")} style={{ color: primaryColor }}>
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
            className={cn("h-16 text-lg font-semibold shadow-lg", isModern ? "rounded-none" : "rounded-2xl")}
            style={{ backgroundColor: primaryColor }}
            onClick={() => window.open(`https://wa.me/${convite.contato}?text=Olá! Confirmo minha presença no evento: ${convite.nome_evento}`, '_blank')}
          >
            <Phone className="mr-2 h-5 w-5" /> Confirmar
          </Button>
          
          <Button 
            variant="outline"
            className={cn("h-16 text-lg font-semibold border-2 shadow-lg", isModern ? "rounded-none" : "rounded-2xl")}
            style={{ borderColor: primaryColor, color: primaryColor }}
            onClick={() => window.open(convite.link_maps, '_blank')}
          >
            <MapPin className="mr-2 h-5 w-5" /> Localização
          </Button>

          {convite.link_presentes && (
            <Button 
              variant="secondary"
              className={cn("h-16 text-lg font-semibold col-span-2 shadow-md", isModern ? "rounded-none" : "rounded-2xl")}
              onClick={() => window.open(convite.link_presentes, '_blank')}
            >
              <Gift className="mr-2 h-5 w-5" /> Lista de Presentes
            </Button>
          )}
        </div>

        {/* Share & Download */}
        <div className="mt-12 flex justify-center space-x-6">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="flex flex-col h-auto py-4 space-y-2">
                <QrCode size={24} />
                <span className="text-xs">QR Code</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md flex flex-col items-center">
              <DialogHeader>
                <DialogTitle>QR Code do Convite</DialogTitle>
              </DialogHeader>
              <div className="p-4 bg-white rounded-xl">
                <QRCodeSVG value={window.location.href} size={200} />
              </div>
            </DialogContent>
          </Dialog>

          <PDFDownloadLink document={<InvitationPDF convite={convite} />} fileName={`convite-${convite.slug}.pdf`}>
            {({ loading }) => (
              <Button variant="ghost" className="flex flex-col h-auto py-4 space-y-2" disabled={loading}>
                <Download size={24} />
                <span className="text-xs">{loading ? 'Gerando...' : 'Baixar PDF'}</span>
              </Button>
            )}
          </PDFDownloadLink>

          <Button variant="ghost" className="flex flex-col h-auto py-4 space-y-2" onClick={() => navigator.share({ title: convite.nome_evento, url: window.location.href })}>
            <Share2 size={24} />
            <span className="text-xs">Partilhar</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConvitePage;