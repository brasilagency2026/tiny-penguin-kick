import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Users, Ticket, Eye, Lock, TrendingUp, Calendar as CalendarIcon, ArrowUpRight, Plus, Copy, UserCheck, Trash2, Download, ExternalLink } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { showSuccess, showError } from '@/utils/toast';

const Dashboard = () => {
  const [stats, setStats] = useState({ tokens: 0, convites: 0, views: 0 });
  const [recentConvites, setRecentConvites] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [guests, setGuests] = useState<any[]>([]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Senha incorreta');
    }
  };

  const fetchData = async () => {
    const { count: tokenCount } = await supabase.from('acessos_ml').select('*', { count: 'exact', head: true });
    const { count: conviteCount, data: convites } = await supabase
      .from('convites')
      .select('*')
      .order('created_at', { ascending: false });
    
    const totalViews = convites?.reduce((acc, curr) => acc + (curr.visualizacoes || 0), 0) || 0;

    setStats({ 
      tokens: tokenCount || 0, 
      convites: conviteCount || 0, 
      views: totalViews 
    });
    setRecentConvites(convites || []);

    const chartDataFormatted = convites?.slice(0, 7).map(c => ({
      name: c.nome_evento.length > 10 ? c.nome_evento.substring(0, 10) + '...' : c.nome_evento,
      views: c.visualizacoes || 0
    })).reverse() || [];
    
    setChartData(chartDataFormatted);
    setLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const fetchGuests = async (conviteId: string) => {
    const { data } = await supabase
      .from('presencas')
      .select('*')
      .eq('convite_id', conviteId)
      .order('created_at', { ascending: false });
    
    if (data) setGuests(data);
  };

  const exportToCSV = (nomeEvento: string) => {
    if (guests.length === 0) return;
    
    const headers = ["Nome", "Adultos", "Crianças", "Data de Confirmação"];
    const rows = guests.map(g => [
      g.nome,
      g.adultos,
      g.criancas,
      new Date(g.created_at).toLocaleDateString()
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(r => r.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `convidados-${nomeEvento.toLowerCase().replace(/\s+/g, '-')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const deleteConvite = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este convite?")) {
      const { error } = await supabase.from('convites').delete().eq('id', id);
      if (error) {
        showError("Erro ao excluir");
      } else {
        showSuccess("Convite excluído");
        fetchData();
      }
    }
  };

  const copyConviteLink = (slug: string) => {
    const url = `${window.location.origin}/convite/${slug}`;
    navigator.clipboard.writeText(url);
    showSuccess("Link do convite copiado!");
  };

  const generateManualToken = async () => {
    const token = crypto.randomUUID();
    const { error } = await supabase.from('acessos_ml').insert([{
      token,
      comprador_email: 'venda_manual@admin.com',
      usado: false
    }]);

    if (error) {
      showError("Erro ao gerar token");
    } else {
      const url = `${window.location.origin}/criar?token=${token}`;
      navigator.clipboard.writeText(url);
      showSuccess("Token gerado e link copiado!");
      fetchData();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <Card className="w-full max-w-md border-none shadow-2xl rounded-[2rem]">
          <CardHeader className="text-center pt-10">
            <div className="mx-auto bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <Lock className="text-primary h-8 w-8" />
            </div>
            <CardTitle className="text-2xl font-serif">Acesso Restrito</CardTitle>
            <CardDescription>Entre com sua senha administrativa para continuar.</CardDescription>
          </CardHeader>
          <CardContent className="pb-10">
            <form onSubmit={handleLogin} className="space-y-4">
              <Input 
                type="password" 
                placeholder="Senha mestre" 
                value={password}
                className="h-12 rounded-xl"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" className="w-full h-12 rounded-xl text-lg font-bold">Entrar no Painel</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin text-primary h-10 w-10" /></div>;

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold">Painel de Controle</h1>
            <p className="text-slate-500">Gerencie suas vendas e convites.</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={generateManualToken} className="rounded-xl gap-2">
              <Plus size={18} /> Gerar Venda Manual
            </Button>
            <Button variant="outline" className="rounded-xl" onClick={() => setIsAuthenticated(false)}>Sair</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2 bg-white">
              <CardTitle className="text-sm font-bold text-slate-400 uppercase tracking-widest">Vendas Totais</CardTitle>
              <Ticket className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent className="pt-4 bg-white">
              <div className="text-3xl font-bold">{stats.tokens}</div>
              <p className="text-xs text-green-500 flex items-center mt-1 font-medium">
                <TrendingUp className="h-3 w-3 mr-1" /> +12% este mês
              </p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2 bg-white">
              <CardTitle className="text-sm font-bold text-slate-400 uppercase tracking-widest">Convites Ativos</CardTitle>
              <Users className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent className="pt-4 bg-white">
              <div className="text-3xl font-bold">{stats.convites}</div>
              <p className="text-xs text-slate-400 mt-1 font-medium">Taxa de conversão: 85%</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2 bg-white">
              <CardTitle className="text-sm font-bold text-slate-400 uppercase tracking-widest">Visualizações</CardTitle>
              <Eye className="h-5 w-5 text-purple-500" />
            </CardHeader>
            <CardContent className="pt-4 bg-white">
              <div className="text-3xl font-bold">{stats.views.toLocaleString()}</div>
              <p className="text-xs text-slate-400 mt-1 font-medium">Média de 42 por convite</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 border-none shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="bg-white border-b border-slate-50">
              <CardTitle className="text-lg font-serif">Engajamento por Convite</CardTitle>
              <CardDescription>Visualizações dos convites mais recentes</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 bg-white h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="views" radius={[6, 6, 0, 0]} barSize={40}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#7c3aed' : '#a78bfa'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="bg-white border-b border-slate-50">
              <CardTitle className="text-lg font-serif">Todos os Convites</CardTitle>
              <CardDescription>Gerencie e veja convidados</CardDescription>
            </CardHeader>
            <CardContent className="p-0 bg-white">
              <div className="divide-y divide-slate-50 max-h-[400px] overflow-y-auto">
                {recentConvites.map((c) => (
                  <div key={c.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                    <Dialog onOpenChange={(open) => open && fetchGuests(c.id)}>
                      <DialogTrigger asChild>
                        <div className="flex items-center gap-3 cursor-pointer flex-1">
                          <div className="bg-slate-100 p-2 rounded-lg">
                            <CalendarIcon className="h-4 w-4 text-slate-500" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-700 truncate max-w-[120px]">{c.nome_evento}</p>
                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">
                              {new Date(c.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader className="flex flex-row items-center justify-between">
                          <div>
                            <DialogTitle className="text-2xl font-serif">{c.nome_evento}</DialogTitle>
                            <DialogDescription>Lista de convidados confirmados</DialogDescription>
                          </div>
                          <Button variant="outline" size="sm" className="gap-2 rounded-xl" onClick={() => exportToCSV(c.nome_evento)}>
                            <Download size={16} /> Exportar CSV
                          </Button>
                        </DialogHeader>
                        <div className="mt-6 space-y-4">
                          <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="bg-slate-50 p-4 rounded-2xl text-center">
                              <p className="text-xs text-slate-400 font-bold uppercase">Total</p>
                              <p className="text-2xl font-bold text-primary">
                                {guests.reduce((acc, g) => acc + g.adultos + g.criancas, 0)}
                              </p>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-2xl text-center">
                              <p className="text-xs text-slate-400 font-bold uppercase">Adultos</p>
                              <p className="text-2xl font-bold text-slate-700">
                                {guests.reduce((acc, g) => acc + g.adultos, 0)}
                              </p>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-2xl text-center">
                              <p className="text-xs text-slate-400 font-bold uppercase">Crianças</p>
                              <p className="text-2xl font-bold text-slate-700">
                                {guests.reduce((acc, g) => acc + g.criancas, 0)}
                              </p>
                            </div>
                          </div>

                          <div className="border rounded-2xl overflow-hidden">
                            <Table>
                              <TableHeader className="bg-slate-50">
                                <TableRow>
                                  <TableHead>Nome</TableHead>
                                  <TableHead className="text-center">Adultos</TableHead>
                                  <TableHead className="text-center">Crianças</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {guests.length === 0 ? (
                                  <TableRow>
                                    <TableCell colSpan={3} className="text-center py-8 text-slate-400 italic">
                                      Nenhuma confirmação ainda.
                                    </TableCell>
                                  </TableRow>
                                ) : (
                                  guests.map((guest) => (
                                    <TableRow key={guest.id}>
                                      <TableCell className="font-medium">{guest.nome}</TableCell>
                                      <TableCell className="text-center">{guest.adultos}</TableCell>
                                      <TableCell className="text-center">{guest.criancas}</TableCell>
                                    </TableRow>
                                  ))
                                )}
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <div className="flex items-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-slate-400 hover:text-primary"
                        onClick={() => copyConviteLink(c.slug)}
                        title="Copiar Link"
                      >
                        <Copy size={14} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-slate-400 hover:text-primary"
                        onClick={() => window.open(`/convite/${c.slug}`, '_blank')}
                        title="Visualizar"
                      >
                        <ExternalLink size={14} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => deleteConvite(c.id)}
                        title="Excluir"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;