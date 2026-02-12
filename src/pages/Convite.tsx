import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Convite } from '@/types/convite';
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Gift, Calendar, Clock, Share2, Download, QrCode, Heart, CalendarPlus, CheckSquare, Music, Volume2, VolumeX, CreditCard, Copy, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { QRCodeSVG } from 'qrcode.react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { InvitationPDF } from '@/components/InvitationPDF';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from '@/lib/utils';
import Countdown from '@/components/Countdown';
import RSVPForm from '@/components/RSVPForm';
import { showSuccess } from '@/utils/toast';

const ConvitePage = () => {
  const { slug } = useParams();
  const [convite, setConvite] = useState<Convite | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const copyPix = () => {
    if (convite?.pix_key) {
      navigator.clipboard.writeText(convite.pix_key);
      showSuccess("Chave Pix copiada!");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  if (!convite) return <div className="min-h-screen flex items-center justify-center">Convite não encontrado.</div>;

  const primaryColor = convite.cor || '#7c3aed';
  const isModern = convite.tema === 'modern';
  const isRomantic = convite.tema === 'romantic';

  // Helper to extract Google Maps Embed URL or use a placeholder
  const getMapEmbedUrl = (url: string) => {
    if (!url) return null;
    if (url.includes('google.com/maps/embed')) return url;
    // Simple heuristic to try and convert a regular link to embed (limited)
    return null; 
  };

  return (
    <div className={cn(
      "min-h-screen font-sans text-slate-800 pb-20",
      isModern ? "bg-slate-50" : "bg-white"
    )}>
      {/* Music Player */}
      {convite.musica_url && (
        <>
          <audio ref={audioRef} src={convite.musica_url} loop />
          <Button 
            onClick={toggleMusic}
            className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 shadow-2xl animate-bounce"
            style={{ backgroundColor: primaryColor }}
          >
            {isPlaying ? <Volume2 /> : <Music />}
          </Button>
        </>
      )}

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

      <div className="max-w-lg mx-auto px-6 -mt-10 relative z-20">
        <div className={cn(
          "bg-white p-8 space-y-8",
          isModern ? "rounded-none shadow-none border" : "rounded-3xl shadow-2xl"
        )}>
          <Countdown targetDate={convite.data_evento} color={primaryColor} />

          <div className="space-y-6">
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
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className={cn("p-3", isModern ? "bg-slate-100" : "rounded-2xl bg-slate-50")} style={{ color: primaryColor }}>
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Local</p>
                    <p className="text-lg font-medium">{convite.endereco}</p>
                  </div>
                </div>
                
                {convite.link_maps && (
                  <div className="rounded-2xl overflow-hidden border border-slate-100 h-48 bg-slate-50 relative group">
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/5 group-hover:bg-slate-900/10 transition-colors cursor-pointer" onClick={() => window.open(convite.link_maps, '_blank')}>
                      <div className="bg-white p-3 rounded-full shadow-lg flex items-center gap-2 text-sm font-bold">
                        <ExternalLink size={16} /> Ver no Google Maps
                      </div>
                    </div>
                    <img 
                      src={`https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(convite.endereco)}&zoom=15&size=600x300&key=YOUR_API_KEY_HERE`} 
                      alt="Mapa"
                      className="w-full h-full object-cover opacity-50"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=600";
                      }}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                className={cn("h-16 text-lg font-semibold shadow-lg", isModern ? "rounded-none" : "rounded-2xl")}
                style={{ backgroundColor: primaryColor }}
              >
                <CheckSquare className="mr-2 h-5 w-5" /> Confirmar
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-2xl font-serif text-center">Confirmar Presença</DialogTitle>
              </DialogHeader>
              <RSVPForm conviteId={convite.id!} primaryColor={primaryColor} />
            </DialogContent>
          </Dialog>
          
          <Button 
            variant="outline"
            className={cn("h-16 text-lg font-semibold border-2 shadow-lg", isModern ? "rounded-none" : "rounded-2xl")}
            style={{ borderColor: primaryColor, color: primaryColor }}
            onClick={() => window.open(convite.link_maps, '_blank')}
          >
            <MapPin className="mr-2 h-5 w-5" /> Localização
          </Button>

          {convite.pix_key && (
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="secondary"
                  className={cn("h-16 text-lg font-semibold col-span-2 shadow-md", isModern ? "rounded-none" : "rounded-2xl")}
                >
                  <CreditCard className="mr-2 h-5 w-5" /> Presentear com Pix
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md text-center">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-serif">Presente em Pix</DialogTitle>
                </DialogHeader>
                <div className="py-6 space-y-4">
                  <p className="text-slate-500">Sua presença é nosso maior presente, mas se desejar nos agraciar:</p>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-dashed border-slate-200 font-mono text-sm break-all">
                    {convite.pix_key}
                  </div>
                  <Button onClick={copyPix} className="w-full gap-2 h-12 rounded-xl">
                    <Copy size={18} /> Copiar Chave Pix
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

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