import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import InvitationForm from '@/components/InvitationForm';
import { showSuccess, showError } from '@/utils/toast';
import { Loader2, Eye, Edit3, CheckCircle2, Copy, ExternalLink, Share2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConvitePreview from '@/components/ConvitePreview';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <Tabs defaultValue="edit" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-[400px] grid-cols-2 h-12">
              <TabsTrigger value="edit" className="flex items-center gap-2">
                <Edit3 size={18} /> Editar
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center gap-2">
                <Eye size={18} /> Visualizar
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="edit">
            <InvitationForm 
              onSubmit={handleSubmit} 
              loading={loading} 
              onChange={(data) => setFormData(data)}
            />
          </TabsContent>

          <TabsContent value="preview">
            <div className="max-w-md mx-auto border-[12px] border-slate-900 rounded-[3rem] overflow-hidden shadow-2xl h-[800px] bg-white relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-50"></div>
              <div className="h-full overflow-y-auto">
                {formData ? <ConvitePreview data={formData} /> : (
                  <div className="h-full flex items-center justify-center p-8 text-center text-slate-400">
                    Preencha os dados na aba "Editar" para ver a prévia aqui.
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Criar;