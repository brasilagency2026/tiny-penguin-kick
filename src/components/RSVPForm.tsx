"use client";

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { showSuccess, showError } from '@/utils/toast';
import { Users, UserPlus, CheckCircle2, Sparkles, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

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
    criancas: 0,
    mensagem: ''
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
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12 space-y-6"
      >
        <div className="relative inline-block">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ duration: 0.5, repeat: 1 }}
            className="mx-auto w-20 h-20 rounded-full bg-green-50 flex items-center justify-center"
          >
            <CheckCircle2 className="text-green-500 h-12 w-12" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0], y: [-20, -40] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute -top-4 -right-4 text-yellow-400"
          >
            <Sparkles size={24} />
          </motion.div>
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-serif font-bold">Presença Confirmada!</h3>
          <p className="text-slate-500">Obrigado por confirmar. Mal podemos esperar para te ver!</p>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="nome">Seu Nome Completo</Label>
        <Input 
          id="nome" 
          required 
          placeholder="Como indicado no convite"
          className="h-12 rounded-xl"
          value={formData.nome}
          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="adultos">Adultos</Label>
          <div className="relative">
            <Users className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
            <Input 
              id="adultos" 
              type="number" 
              min="1" 
              className="pl-10 h-12 rounded-xl"
              value={formData.adultos}
              onChange={(e) => setFormData({ ...formData, adultos: parseInt(e.target.value) })}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="criancas">Crianças</Label>
          <div className="relative">
            <UserPlus className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
            <Input 
              id="criancas" 
              type="number" 
              min="0" 
              className="pl-10 h-12 rounded-xl"
              value={formData.criancas}
              onChange={(e) => setFormData({ ...formData, criancas: parseInt(e.target.value) })}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="mensagem">Deixe uma mensagem (Opcional)</Label>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
          <Textarea 
            id="mensagem" 
            placeholder="Escreva um recadinho carinhoso..."
            className="pl-10 min-h-[100px] rounded-xl resize-none"
            value={formData.mensagem}
            onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
          />
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full h-14 text-lg font-bold rounded-xl shadow-lg" 
        style={{ backgroundColor: primaryColor }}
        disabled={loading}
      >
        {loading ? "Confirmando..." : "Confirmar minha presença"}
      </Button>
    </form>
  );
};

export default RSVPForm;