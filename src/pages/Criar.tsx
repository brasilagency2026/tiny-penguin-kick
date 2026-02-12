import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import InvitationForm from '@/components/InvitationForm';
import { showSuccess, showError } from '@/utils/toast';
import { Loader2 } from 'lucide-react';

const Criar = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const [verifying, setVerifying] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (formData: any) => {
    setLoading(true);
    try {
      const slug = `${formData.nome_evento.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Math.random().toString(36).substring(2, 7)}`;
      
      const { data: convite, error: conviteError } = await supabase
        .from('convites')
        .insert([{ ...formData, token, slug }])
        .select()
        .single();

      if (conviteError) throw conviteError;

      const { error: updateError } = await supabase
        .from('acessos_ml')
        .update({ usado: true, convite_id: convite.id })
        .eq('token', token);

      if (updateError) throw updateError;

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
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {isValid && <InvitationForm onSubmit={handleSubmit} loading={loading} />}
      </div>
    </div>
  );
};

export default Criar;