import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import InvitationForm from '@/components/InvitationForm';
import { showSuccess, showError } from '@/utils/toast';
import { Loader2, Eye, Edit3, CheckCircle2, Copy, ExternalLink, Share2, Smartphone, Monitor, Sparkles, QrCode as QrCodeIcon } from 'lucide-react';
import ConvitePreview from '@/components/ConvitePreview';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { QRCodeSVG } from 'qrcode.react';

const Criar = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const [verifying, setVerifying] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const [createdSlug, setCreatedSlug] = useState<string | null>(null);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        showError("Token não fornecido.");
        navigate('/');
        return;
      }

      const { data, error } = await supabase
        .from('acessos_ml')
        .select('*')
        .eq('token', token)
        .single();

      if (error || !data) {
        showError("Token inválido.");
        navigate('/');
      } else if (data.usado) {
        showError("Este token já foi utilizado.");
        navigate('/');
      } else {
        setIsValid(true);
      }
      setVerifying(false);
    };

    verifyToken();
  }, [token, navigate]);

  const handleSubmit = async (data: any) => {
    setLoading(true);
    try {
      const slug = `${data.nome_evento.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Math.random().toString(36).substring(2, 7)}`;
      
      const { data: convite, error: conviteError } = await supabase
        .from('convites')
        .insert([{ ...data, token, slug }])
        .select()
        .single();

      if (conviteError) throw conviteError;

      await supabase
        .from('acessos_ml')
        .update({ usado: true, convite_id: convite.id })
        .eq('token', token);

      showSuccess("Convite criado com sucesso!");
      setCreatedSlug(slug);
    } catch (error: any) {
      showError("Erro ao criar convite: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showSuccess("Link copiado!");
  };

  if (verifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (createdSlug) {
    const fullUrl = `${window.location.origin}/convite/${createdSlug}`;
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg border-none shadow-2xl bg-white rounded-[2.5rem] overflow-hidden">
          <div className="bg-primary p-12 text-center text-white">
            <CheckCircle2 className="mx-auto h-20 w-20 mb-6 animate-bounce" />
            <h2 className="text-3xl font-serif font-bold">Tudo Pronto!</h2>
            <p className="opacity-90 mt-2">Seu convite mágico foi gerado com sucesso.</p>
          </div>
          <CardContent className="p-8 space-y-6">
            <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
              <QRCodeSVG value={fullUrl} size={160} />
              <p className="text-[10px] uppercase font-bold text-slate-400 mt-4 tracking-widest flex items-center gap-2">
                <QrCodeIcon size={12} /> Escaneie para testar no celular
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Link do seu Convite</p>
              <div className="flex gap-2">
                <div className="flex-1 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-sm font-medium truncate text-slate-600">
                  {fullUrl}
                </div>
                <Button size="icon" variant="outline" className="h-14 w-14 rounded-2xl" onClick={() => copyToClipboard(fullUrl)}>
                  <Copy size={20} />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <Button className="h-14 rounded-2xl text-lg font-bold gap-2" onClick={() => window.open(fullUrl, '_blank')}>
                <ExternalLink size={20} /> Visualizar Agora
              </Button>
              <Button variant="outline" className="h-14 rounded-2xl text-lg font-bold gap-2" onClick={() => navigator.share({ title: 'Meu Convite', url: fullUrl })}>
                <Share2 size={20} /> Compartilhar
              </Button>
            </div>

            <div className="pt-4 text-center">
              <Link to="/" className="text-sm text-slate-400 hover:text-primary transition-colors font-medium">
                Voltar para o Início
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b px-8 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-xl font-serif font-bold text-primary">ConvitePro</Link>
          <div className="h-6 w-[1px] bg-slate-200"></div>
          <p className="text-sm text-slate-500 font-medium">Criando seu convite mágico</p>
        </div>
        <div className="hidden md:flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
          <div className="px-3 py-1.5 bg-white rounded-lg shadow-sm text-xs font-bold flex items-center gap-2">
            <Monitor size={14} /> Desktop
          </div>
          <div className="px-3 py-1.5 text-slate-400 text-xs font-bold flex items-center gap-2">
            <Smartphone size={14} /> Mobile
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Area */}
          <div className="lg:col-span-7 xl:col-span-8">
            <InvitationForm 
              onSubmit={handleSubmit} 
              loading={loading} 
              onChange={(data) => setFormData(data)}
            />
          </div>

          {/* Preview Area (Sticky on Desktop) */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24">
            <div className="relative mx-auto w-full max-w-[380px]">
              {/* Phone Frame */}
              <div className="relative border-[12px] border-slate-900 rounded-[3rem] overflow-hidden shadow-2xl h-[780px] bg-white">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-50"></div>
                
                {/* Content */}
                <div className="h-full overflow-y-auto scrollbar-hide">
                  {formData ? (
                    <ConvitePreview data={formData} />
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-4">
                      <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
                        <Eye size={40} />
                      </div>
                      <p className="text-slate-400 font-medium">
                        Preencha os dados ao lado para ver a mágica acontecer aqui em tempo real.
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl z-10 animate-bounce hidden xl:block">
                <Sparkles className="text-yellow-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Criar;