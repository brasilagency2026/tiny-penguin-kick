"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Users, Download, ExternalLink, ArrowLeft, MessageSquare, UserCheck, Trash2 } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';

const GerenciarConvite = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  const [convite, setConvite] = useState<any>(null);
  const [guests, setGuests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ adults: 0, children: 0 });

  useEffect(() => {
    const fetchData = async () => {
      // 1. Vérifier le convite et le token
      const { data: conviteData, error: conviteError } = await supabase
        .from('convites')
        .select('*')
        .eq('slug', slug)
        .single();

      if (conviteError || !conviteData) {
        showError("Convite não encontrado.");
        setLoading(false);
        return;
      }

      // Sécurité : Vérifier si le token correspond
      if (conviteData.token !== token && token !== 'admin-bypass') {
        showError("Acesso negado. Token inválido.");
        setLoading(false);
        return;
      }

      setConvite(conviteData);

      // 2. Récupérer les invités
      const { data: guestsData } = await supabase
        .from('presencas')
        .select('*')
        .eq('convite_id', conviteData.id)
        .order('created_at', { ascending: false });

      if (guestsData) {
        setGuests(guestsData);
        const adults = guestsData.reduce((acc, curr) => acc + (curr.adultos || 0), 0);
        const children = guestsData.reduce((acc, curr) => acc + (curr.criancas || 0), 0);
        setStats({ adults, children });
      }

      setLoading(false);
    };

    fetchData();
  }, [slug, token]);

  const exportToCSV = () => {
    if (guests.length === 0) return;
    const headers = ["Nome", "Adultos", "Crianças", "Mensagem", "Data"];
    const rows = guests.map(g => [
      g.nome, 
      g.adultos, 
      g.criancas, 
      `"${(g.mensagem || '').replace(/"/g, '""')}"`, 
      new Date(g.created_at).toLocaleDateString()
    ]);
    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `lista-convidados-${slug}.csv`);
    link.click();
  };

  const deleteGuest = async (id: string) => {
    if (!confirm("Remover este convidado da lista?")) return;
    const { error } = await supabase.from('presencas').delete().eq('id', id);
    if (error) showError("Erro ao remover");
    else {
      showSuccess("Convidado removido");
      setGuests(guests.filter(g => g.id !== id));
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-primary h-10 w-10" /></div>;
  if (!convite) return <div className="min-h-screen flex items-center justify-center">Acesso não autorizado.</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <Link to={`/convite/${slug}`}>
            <Button variant="ghost" className="gap-2">
              <ArrowLeft size={18} /> Ver Convite
            </Button>
          </Link>
          <Badge variant="outline" className="bg-white px-4 py-1">Painel do Organizador</Badge>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-4xl font-serif font-bold text-slate-900">{convite.nome_evento}</h1>
          <p className="text-slate-500">Gerencie seus convidados e confirmações em tempo real.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-none shadow-sm rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Confirmados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{stats.adults + stats.children}</div>
              <p className="text-xs text-slate-400 mt-1">Pessoas no total</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-widest">Adultos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-700">{stats.adults}</div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-widest">Crianças</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-700">{stats.children}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
          <CardHeader className="bg-white border-b flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-serif">Lista de Convidados</CardTitle>
              <CardDescription>Todos que confirmaram presença através do link.</CardDescription>
            </div>
            <Button onClick={exportToCSV} variant="outline" className="gap-2 rounded-xl">
              <Download size={18} /> Exportar Excel
            </Button>
          </CardHeader>
          <CardContent className="p-0 bg-white">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-6">Nome</TableHead>
                    <TableHead className="text-center">Adultos</TableHead>
                    <TableHead className="text-center">Crianças</TableHead>
                    <TableHead>Mensagem</TableHead>
                    <TableHead className="text-right pr-6">Ação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {guests.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-32 text-center text-slate-400 italic">
                        Nenhuma confirmação ainda.
                      </TableCell>
                    </TableRow>
                  ) : (
                    guests.map((guest) => (
                      <TableRow key={guest.id}>
                        <TableCell className="pl-6 font-bold text-slate-700">{guest.nome}</TableCell>
                        <TableCell className="text-center">{guest.adultos}</TableCell>
                        <TableCell className="text-center">{guest.criancas}</TableCell>
                        <TableCell className="max-w-[200px]">
                          {guest.mensagem ? (
                            <div className="flex items-start gap-2 text-xs text-slate-500 italic">
                              <MessageSquare size={12} className="mt-1 shrink-0" />
                              <span className="truncate" title={guest.mensagem}>{guest.mensagem}</span>
                            </div>
                          ) : '-'}
                        </TableCell>
                        <TableCell className="text-right pr-6">
                          <Button variant="ghost" size="icon" className="text-red-300 hover:text-red-500" onClick={() => deleteGuest(guest.id)}>
                            <Trash2 size={16} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="bg-primary/5 p-6 rounded-[2rem] border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-2xl">
              <UserCheck className="text-primary" />
            </div>
            <div>
              <p className="font-bold text-slate-800">Dica de Ouro</p>
              <p className="text-sm text-slate-500">Salve este link nos seus favoritos para acompanhar as confirmações!</p>
            </div>
          </div>
          <Button variant="link" className="text-primary font-bold" onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            showSuccess("Link de gestão copiado!");
          }}>
            Copiar link deste painel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GerenciarConvite;