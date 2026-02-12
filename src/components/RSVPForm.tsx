import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { showSuccess, showError } from '@/utils/toast';
import { Users, UserPlus, CheckCircle2 } from 'lucide-react';

interface Props {
  conviteId: string;
  primaryColor: string;
}

const RSVPForm = ({ conviteId, primaryColor }: Props) => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    adultos: 1,
    criancas: 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('presencas')
        .insert([{ ...formData, convite_id: conviteId }]);

      if (error) throw error;
      
      setSubmitted(true);
      showSuccess("Presença confirmada com sucesso!");
    } catch (error: any) {
      showError("Erro ao confirmar: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8 space-y-4 animate-in fade-in zoom-in duration-500">
        <div className="mx-auto w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
          <CheckCircle2 className="text-green-500 h-10 w-10" />
        </div>
        <h3 className="text-xl font-bold">Presença Confirmada!</h3>
        <p className="text-slate-500">Obrigado por confirmar. Nos vemos lá!</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="nome">Seu Nome Completo</Label>
        <Input 
          id="nome" 
          required 
          placeholder="Como está no convite"
          value={formData.nome}
          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="adultos">Adultos</Label>
          <div className="relative">
            <Users className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input 
              id="adultos" 
              type="number" 
              min="1" 
              className="pl-10"
              value={formData.adultos}
              onChange={(e) => setFormData({ ...formData, adultos: parseInt(e.target.value) })}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="criancas">Crianças</Label>
          <div className="relative">
            <UserPlus className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input 
              id="criancas" 
              type="number" 
              min="0" 
              className="pl-10"
              value={formData.criancas}
              onChange={(e) => setFormData({ ...formData, criancas: parseInt(e.target.value) })}
            />
          </div>
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full h-12 text-lg font-bold" 
        style={{ backgroundColor: primaryColor }}
        disabled={loading}
      >
        {loading ? "Confirmando..." : "Confirmar Presença"}
      </Button>
    </form>
  );
};

export default RSVPForm;