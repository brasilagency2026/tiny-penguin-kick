import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Convite } from '@/types/convite';
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Gift, Calendar, Clock, Share2, Download, QrCode, Heart, CalendarPlus, CheckSquare, Music, Volume2, VolumeX, CreditCard, Copy, ExternalLink, Shirt, Star, Church, Utensils, Camera, GlassWater, MessageCircle, Navigation } from 'lucide-react';
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

const ICON_MAP: Record<string, any> = {
  heart: <Heart size={16} />,
  church: <Church size={16} />,
  utensils: <Utensils size={16} />,
  music: <Music size={16} />,
  star: <Star size={16} />,
  camera: <Camera size={16} />,
  glass: <GlassWater size={16} />,
};

const ConvitePage = () => {
  const { slug } = useParams();
  const [convite, setConvite] = useState<any | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showFloatingRSVP, setShowFloatingRSVP] = useState(false);
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
        
        const { data: msgData } = await supabase
          .from('presencas')
          .select('nome, mensagem, created_at')
          .eq('convite_id', data.id)
          .not('mensagem', 'is', null)
          .order('created_at', { ascending: false });
        
        if (msgData) setMessages(msgData);
      }
      setLoading(false);
    };

    fetchConvite();

    const handleScroll = () => {
      setShowFloatingRSVP(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  const addToCalendar = () => {
    const eventDate = new Date(convite.data_evento);
    const title = encodeURIComponent(convite.nome_evento);
    const details = encodeURIComponent(convite.frase || '');
    const location = encodeURIComponent(convite.endereco || '');
    const startDate = eventDate.toISOString().replace(/-|:|\.\d+/g, '');
    const endDate = new Date(eventDate.getTime() + 4 * 60 * 60 * 1000).toISOString().replace(/-|:|\.\d+/g, '');
    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
    window.open(googleUrl, '_blank');
  };

  const openMap = (type: 'google' | 'waze') => {
    const address = encodeURIComponent(convite.endereco || '');
    const url = type === 'google' 
      ? (convite.link_maps || `https://www.google.com/maps/search/?api=1&query=${address}`)
      : `https://waze.com/ul?q=${address}`;
    window.open(url, '_blank');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  if (!convite) return <div className="min-h-screen flex items-center justify-center">Convite não encontrado.</div>;

  const primaryColor = convite.cor || '#7c3aed';
  const isModern = convite.tema === 'modern';
  const isRomantic = convite.tema === 'romantic';
  const timeline = convite.timeline || [];

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
            className="fixed bottom-6 left-6 z-50 rounded-full w-14 h-14 shadow-2xl"
            style={{ backgroundColor: primaryColor }}
          >
            {isPlaying ? <Volume2 /> : <Music />}
          </Button>
        </>
      )}

      {/* Floating RSVP Button for Mobile */}
      <AnimatePresence>
        {showFloatingRSVP && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-3rem)] max-w-xs"
          >
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  className="w-full h-14 rounded-full text-lg font-bold shadow-2xl"
                  style={{ backgroundColor: primaryColor }}
                >
                  <CheckSquare className="mr-2 h-5 w-5" /> Confirmar Presença
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-serif text-center">Confirmar Presença</DialogTitle>
                </DialogHeader>
                <RSVPForm conviteId={convite.id!} primaryColor={primaryColor} />
              </DialogContent>
            </Dialog>
          </motion.div>
        )}
      </AnimatePresence>

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

      {/* Main Content */}
      <div className="max-w-lg mx-auto px-6 -mt-10 relative z-20">
        <div className={cn(
          "bg-white p-8 space-y-8",
          isModern ? "rounded-none shadow-none border" : "rounded-3xl shadow-2xl"
        )}>
          <Countdown targetDate={convite.data_evento} color={primaryColor} />

          <div className="space-y-6">
            <div className="flex items-center justify-between">
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
              <Button variant="ghost" size="icon" onClick={addToCalendar} title="Adicionar ao Calendário">
                <CalendarPlus className="h-5 w-5" style={{ color: primaryColor }} />
              </Button>
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

            {convite.dress_code && (
              <div className="flex items-center space-x-4">
                <div className={cn("p-3", isModern ? "bg-slate-100" : "rounded-2xl bg-slate-50")} style={{ color: primaryColor }}>
                  <Shirt size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Traje</p>
                  <p className="text-lg font-medium">{convite.dress_code}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Timeline Section */}
        {timeline.length > 0 && (
          <div className="mt-12 space-y-8">
            <div className="text-center">
              <h3 className="text-lg font-bold uppercase tracking-widest text-slate-400">Cronograma</h3>
              <div className="h-1 w-12 bg-slate-100 mx-auto mt-2"></div>
            </div>
            <div className="space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
              {timeline.map((item: any, i: number) => (
                <div key={i} className="relative pl-12">
                  <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center z-10" style={{ color: primaryColor }}>
                    {ICON_MAP[item.icon] || <Star size={16} />}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400">{item.time}</p>
                    <p className="text-base font-bold">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Wall of Messages */}
        {messages.length > 0 && (
          <div className="mt-16 space-y-8">
            <div className="text-center">
              <h3 className="text-lg font-bold uppercase tracking-widest text-slate-400">Mural de Recados</h3>
              <div className="h-1 w-12 bg-slate-100 mx-auto mt-2"></div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {messages.map((msg, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-slate-50 relative"
                >
                  <MessageCircle className="absolute top-4 right-4 text-slate-100 h-8 w-8" />
                  <p className="text-slate-600 italic mb-4">"{msg.mensagem}"</p>
                  <p className="text-sm font-bold text-slate-800">— {msg.nome}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-12 grid grid-cols-2 gap-4">
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
          
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline"
                className={cn("h-16 text-lg font-semibold border-2 shadow-lg", isModern ? "rounded-none" : "rounded-2xl")}
                style={{ borderColor: primaryColor, color: primaryColor }}
              >
                <MapPin className="mr-2 h-5 w-5" /> Localização
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xs text-center">
              <DialogHeader>
                <DialogTitle className="font-serif">Como deseja chegar?</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 gap-3 py-4">
                <Button onClick={() => openMap('google')} className="h-14 rounded-xl gap-3 bg-white text-slate-900 border-2 hover:bg-slate-50">
                  <img src="https://www.google.com/images/branding/product/ico/maps15_b_64dp.ico" className="w-6 h-6" alt="Google Maps" />
                  Google Maps
                </Button>
                <Button onClick={() => openMap('waze')} className="h-14 rounded-xl gap-3 bg-white text-slate-900 border-2 hover:bg-slate-50">
                  <img src="https://v.fastcdn.co/u/60000000/52933333-0-Waze-Logo.png" className="w-6 h-6" alt="Waze" />
                  Waze
                </Button>
              </div>
            </DialogContent>
          </Dialog>

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
                <div className="py-6 space-y-4 flex flex-col items-center">
                  <p className="text-slate-500">Sua presença é nosso maior presente, mas se desejar nos agraciar:</p>
                  <div className="p-4 bg-white rounded-2xl border-2 border-slate-100">
                    <QRCodeSVG value={convite.pix_key} size={180} />
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-dashed border-slate-200 font-mono text-sm break-all w-full">
                    {convite.pix_key}
                  </div>
                  <Button onClick={copyPix} className="w-full gap-2 h-12 rounded-xl">
                    <Copy size={18} /> Copiar Chave Pix
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}

          <div className="col-span-2 pt-4">
            <PDFDownloadLink document={<InvitationPDF convite={convite} />} fileName={`convite-${convite.slug}.pdf`}>
              {({ loading }) => (
                <Button variant="ghost" className="w-full gap-2 text-slate-400 hover:text-primary">
                  <Download size={18} /> {loading ? 'Gerando PDF...' : 'Baixar Versão em PDF'}
                </Button>
              )}
            </PDFDownloadLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConvitePage;