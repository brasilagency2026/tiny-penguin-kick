"use client";

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, Download, ExternalLink, ArrowLeft, MessageSquare, 
  UserCheck, Trash2, Copy, LayoutDashboard, PieChart, 
  TrendingUp, CheckCircle2, UserPlus
} from 'lucide-react';
import { showSuccess } from '@/utils/toast';
import { motion } from 'framer-motion';

const MOCK_GUESTS = [
  { id: '1', nome: 'Família Silva', adultos: 2, criancas: 1, mensagem: 'Mal podemos esperar por esse dia tão especial! Parabéns ao casal.', created_at: new Date().toISOString() },
  { id: '2', nome: 'Ricardo Oliveira', adultos: 1, criancas: 0, mensagem: 'Estarei lá com certeza! Abraços.', created_at: new Date().toISOString() },
  { id: '3', nome: 'Ana e Paulo', adultos: 2, criancas: 0, mensagem: 'Obrigado pelo convite, será uma honra participar.', created_at: new Date().toISOString() },
  { id: '4', nome: 'Tia Maria', adultos: 1, criancas: 2, mensagem: 'As crianças estão ansiosas pela festa!', created_at: new Date().toISOString() },
  { id: '5', nome: 'Lucas Mendes', adultos: 1, criancas: 0, mensagem: '', created_at: new Date().toISOString() },
];

const DemoGerenciar = () => {
  const [guests, setGuests] = useState(MOCK_GUESTS);
  
  const stats = {
    adults: guests.reduce((acc, curr) => acc + curr.adultos, 0),
    children: guests.reduce((acc, curr) => acc + curr.criancas, 0),
    total: guests.reduce((acc, curr) => acc + curr.adultos + curr.criancas, 0)
  };

  const copyInviteLink = () => {
    showSuccess("Link do convite copiado (Simulação)");
  };

  const deleteGuest = (id: string) => {
    setGuests(guests.filter(g => g.id !== id));
    showSuccess("Convidado removido (Simulação)");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header de Navegação */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex gap-2">
            <Link to="/demo/classic">
              <Button variant="ghost" size="sm" className="gap-2 rounded-xl">
                <ArrowLeft size={16} /> Ver Convite
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="gap-2 rounded-xl" onClick={copyInviteLink}>
              <Copy size={16} /> Copiar Link
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-white px-4 py-1.5 text-primary border-primary/20 font-bold">
              MODO DEMONSTRAÇÃO
            </Badge>
          </div>
        </div>

        {/* Título do Evento */}
        <div className="text-center space-y-2">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold text-slate-900"
          >
            Helena & Gabriel
          </motion.h1>
          <p className="text-slate-500 font-medium">Painel de Controle do Organizador</p>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-none shadow-sm rounded-[2rem] bg-primary text-white">
            <CardContent className="pt-8">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-80">Total Geral</p>
                  <div className="text-4xl font-bold mt-1">{stats.total}</div>
                </div>
                <Users className="opacity-20" size={40} />
              </div>
              <p className="text-[10px] mt-4 font-medium opacity-70">Pessoas confirmadas no total</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-[2rem] bg-white">
            <CardContent className="pt-8">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Adultos</p>
                  <div className="text-4xl font-bold mt-1 text-slate-800">{stats.adults}</div>
                </div>
                <UserCheck className="text-blue-500/20" size={40} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-[2rem] bg-white">
            <CardContent className="pt-8">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Crianças</p>
                  <div className="text-4xl font-bold mt-1 text-slate-800">{stats.children}</div>
                </div>
                <UserPlus className="text-green-500/20" size={40} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-[2rem] bg-white">
            <CardContent className="pt-8">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Visualizações</p>
                  <div className="text-4xl font-bold mt-1 text-slate-800">342</div>
                </div>
                <TrendingUp className="text-purple-500/20" size={40} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabela de Convidados */}
        <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden bg-white">
          <CardHeader className="p-8 border-b border-slate-50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-serif">Lista de Presença</CardTitle>
              <CardDescription>Acompanhe quem confirmou e leia os recados.</CardDescription>
            </div>
            <Button variant="outline" className="gap-2 rounded-2xl h-12 px-6 border-2 font-bold">
              <Download size={18} /> Exportar para Excel
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow className="hover:bg-transparent border-none">
                    <TableHead className="pl-8 h-14 font-bold text-slate-400 uppercase text-[10px] tracking-widest">Convidado</TableHead>
                    <TableHead className="h-14 text-center font-bold text-slate-400 uppercase text-[10px] tracking-widest">Adultos</TableHead>
                    <TableHead className="h-14 text-center font-bold text-slate-400 uppercase text-[10px] tracking-widest">Crianças</TableHead>
                    <TableHead className="h-14 font-bold text-slate-400 uppercase text-[10px] tracking-widest">Mensagem</TableHead>
                    <TableHead className="pr-8 h-14 text-right font-bold text-slate-400 uppercase text-[10px] tracking-widest">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {guests.map((guest) => (
                    <TableRow key={guest.id} className="group border-slate-50">
                      <TableCell className="pl-8 py-6">
                        <div className="font-bold text-slate-700">{guest.nome}</div>
                        <div className="text-[10px] text-slate-400 font-medium mt-0.5">Confirmado em {new Date(guest.created_at).toLocaleDateString()}</div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary" className="rounded-lg bg-blue-50 text-blue-600 border-none font-bold">
                          {guest.adultos}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary" className="rounded-lg bg-green-50 text-green-600 border-none font-bold">
                          {guest.criancas}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        {guest.mensagem ? (
                          <div className="flex items-start gap-2 text-sm text-slate-500 italic bg-slate-50 p-3 rounded-2xl border border-slate-100">
                            <MessageSquare size={14} className="mt-1 shrink-0 text-slate-300" />
                            <span className="line-clamp-2">{guest.mensagem}</span>
                          </div>
                        ) : (
                          <span className="text-slate-300 text-xs italic">Sem mensagem</span>
                        )}
                      </TableCell>
                      <TableCell className="pr-8 text-right">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                          onClick={() => deleteGuest(guest.id)}
                        >
                          <Trash2 size={18} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Dica de Uso */}
        <div className="bg-amber-50 p-8 rounded-[2.5rem] border border-amber-100 flex flex-col md:flex-row items-center gap-6">
          <div className="bg-amber-100 p-4 rounded-3xl">
            <LayoutDashboard className="text-amber-600" size={32} />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h4 className="font-bold text-amber-900 text-lg">Dica para o Organizador</h4>
            <p className="text-amber-700/80">
              Você pode acessar este painel a qualquer momento para ver as novas confirmações. 
              O link de gestão é único e deve ser guardado com segurança, pois ele não exige senha para facilitar o seu acesso rápido.
            </p>
          </div>
          <Button className="bg-amber-600 hover:bg-amber-700 rounded-2xl h-12 px-8 font-bold">
            Entendi
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DemoGerenciar;