import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import InvitationForm from '@/components/InvitationForm';
import { showSuccess, showError } from '@/utils/toast';
import { Loader2, Eye, Edit3 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConvitePreview from '@/components/ConvitePreview';

const Criar = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const [verifying, setVerifying] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>(null);

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
      navigate(`/convite/${slug}`);
    } catch (error: any) {
      showError("Erro ao criar convite: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (verifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
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