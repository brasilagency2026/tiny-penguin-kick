import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Users, Ticket, Eye, Lock, Plus, Copy, Trash2, Download, ExternalLink, Activity, UserPlus, CheckCircle2, ShoppingBag, PieChart as PieChartIcon } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { showSuccess, showError } from '@/utils/toast';

const Dashboard = () => {
  const [stats, setStats] = useState({ tokens: 0, convites: 0, views: 0, totalGuests: 0 });
  const [recentConvites, setRecentConvites] = useState<any[]>([]);
  const [tokens, setTokens] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [themeData, setThemeData] = useState<any[]>([]);
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
    const { count: tokenCount, data: allTokens } = await supabase
      .from('acessos_ml')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });
    
    const { count: conviteCount, data: convites } = await supabase
      .from('convites')
      .select('*')
      .order('created_at', { ascending: false });
    
    const { data: allPresencas } = await supabase
      .from('presencas')
      .select('*, convites(nome_evento)')
      .order('created_at', { ascending: false })
      .limit(10);
    
    const { data: presencasStats } = await supabase.from('presencas').select('adultos, criancas');
    
    const totalViews = convites?.reduce((acc, curr) => acc + (curr.visualizacoes || 0), 0) || 0;
    const totalAdults = presencasStats?.reduce((acc, curr) => acc + (curr.adultos || 0), 0) || 0;
    const totalChildren = presencasStats?.reduce((acc, curr) => acc + (curr.criancas || 0), 0) || 0;

    setStats({ 
      tokens: tokenCount || 0, 
      convites: conviteCount || 0, 
      views: totalViews,
      totalGuests: totalAdults + totalChildren
    });

    setTokens(allTokens || []);
    setRecentConvites(convites || []);
    setActivities(allPresencas || []);

    // Bar Chart Data
    const chartDataFormatted = convites?.slice(0, 7).map(c => ({
      name: c.nome_evento.length > 10 ? c.nome_evento.substring(0, 10) + '...' : c.nome_evento,
      views: c.visualizacoes || 0
    })).reverse() || [];
    setChartData(chartDataFormatted);

    // Pie Chart Data (Themes)
    const themes = convites?.reduce((acc: any, curr) => {
      acc[curr.tema] = (acc[curr.tema] || 0) + 1;
      return acc;
    }, {});
    const themeDataFormatted = Object.keys(themes || {}).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value: themes[key]
    }));
    setThemeData(themeDataFormatted);

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

  const deleteConvite = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este convite?")) return;
    const { error } = await supabase.from('convites').delete().eq('id', id);
    if (error) showError("Erro ao excluir");
    else {
      showSuccess("Convite excluído");
      fetchData();
    }
  };

  const copyLink = (slug: string) => {
    const url = `${window.location.origin}/convite/${slug}`;
    navigator.clipboard.writeText(url);
    showSuccess("Link do convite copiado!");
  };

  const copyTokenLink = (token: string) => {
    const url = `${window.location.origin}/criar?token=${token}`;
    navigator.clipboard.writeText(url);
    showSuccess("Link de criação copiado!");
  };

  const exportToCSV = (nomeEvento: string) => {
    if (guests.length === 0) return;
    const headers = ["Nome", "Adultos", "Crianças", "Data"];
    const rows = guests.map(g => [g.nome, g.adultos, g.criancas, new Date(g.created_at).toLocaleDateString()]);
    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `convidados-${nomeEvento.toLowerCase().replace(/\s+/g, '-')}.csv`);
    link.click();
  };

  const generateManualToken = async () => {
    const token = crypto.randomUUID();
    const { error } = await supabase.from('acessos_ml').insert([{
      token,
      comprador_email: 'venda_manual@admin.com',
      usado: false
    }]);

    if (error) showError("Erro ao gerar token");
    else {
      copyTokenLink(token);
      fetchData();
    }
  };

  const COLORS = ['#7c3aed', '#a78bfa', '#c4b5fd', '#ddd6fe'];

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
              <Input type="password" placeholder="Senha mestre" value={password} className="h-12 rounded-xl" onChange={(e) => setPassword(e.target.value)} />
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
            <p className="text-slate-500">Visão geral da sua plataforma de convites.</p>
          </div>
          <Button onClick={generateManualToken} className="rounded-xl gap-2 h-12 px-6">
            <Plus size={18} /> Gerar Venda Manual
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { title: 'Vendas', value: stats.tokens, icon: <Ticket />, color: 'text-primary' },
            { title: 'Convites', value: stats.convites, icon: <Users />, color: 'text-blue-500' },
            { title: 'Views', value: stats.views.toLocaleString(), icon: <Eye />, color: 'text-purple-500' },
            { title: 'Convidados', value: stats.totalGuests, icon: <CheckCircle2 className="h-5 w-5" />, color: 'text-green-500' }
          ].map((stat, i) => (
            <Card key={i} className="border-none shadow-sm rounded-2xl overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between pb-2 bg-white">
                <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.title}</CardTitle>
                <div className={stat.color}>{stat.icon}</div>
              </CardHeader>
              <CardContent className="pt-4 bg-white">
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="bg-white p-1 rounded-xl border shadow-sm">
            <TabsTrigger value="overview" className="rounded-lg">Visão Geral</TabsTrigger>
            <TabsTrigger value="convites" className="rounded-lg">Convites</TabsTrigger>
            <TabsTrigger value="vendas" className="rounded-lg">Vendas (Tokens)</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="lg:col-span-2 border-none shadow-sm rounded-2xl overflow-hidden">
                <CardHeader className="bg-white border-b border-slate-50">
                  <CardTitle className="text-lg font-serif">Engajamento Recente</CardTitle>
                  <CardDescription>Visualizações por convite</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 bg-white h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                      <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                      <Bar dataKey="views" radius={[6, 6, 0, 0]} barSize={40}>
                        {chartData.map((_, index) => <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#7c3aed' : '#a78bfa'} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
                <CardHeader className="bg-white border-b border-slate-50">
                  <CardTitle className="text-lg font-serif">Temas Populares</CardTitle>
                  <CardDescription>Distribuição de estilos</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 bg-white h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={themeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {themeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="lg:col-span-3 border-none shadow-sm rounded-2xl overflow-hidden">
                <CardHeader className="bg-white border-b border-slate-50 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-serif">Atividade Recente</CardTitle>
                    <CardDescription>Últimas confirmações de presença</CardDescription>
                  </div>
                  <Activity className="text-slate-300 h-5 w-5" />
                </CardHeader>
                <CardContent className="p-0 bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-x divide-y divide-slate-50">
                    {activities.length === 0 ? (
                      <div className="p-8 text-center text-slate-400 italic text-sm col-span-full">Nenhuma atividade recente.</div>
                    ) : (
                      activities.map((act, i) => (
                        <div key={i} className="p-6 flex items-start gap-4 hover:bg-slate-50 transition-colors">
                          <div className="bg-green-50 p-3 rounded-2xl">
                            <UserPlus className="h-5 w-5 text-green-500" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-700">{act.nome}</p>
                            <p className="text-xs text-slate-400">Evento: {act.convites?.nome_evento}</p>
                            <div className="flex gap-2 mt-2">
                              <Badge variant="outline" className="text-[10px] px-1.5 py-0">{act.adultos} Adultos</Badge>
                              {act.criancas > 0 && <Badge variant="outline" className="text-[10px] px-1.5 py-0">{act.criancas} Crianças</Badge>}
                            </div>
                            <p className="text-[10px] text-slate-300 mt-2 uppercase font-bold">
                              {new Date(act.created_at).toLocaleDateString()} às {new Date(act.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="convites">
            <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
              <CardContent className="p-0 bg-white">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="pl-6">Evento</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead className="text-right pr-6">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentConvites.map((c) => (
                      <TableRow key={c.id} className="group">
                        <TableCell className="pl-6 font-bold text-slate-700">{c.nome_evento}</TableCell>
                        <TableCell className="text-slate-500">{new Date(c.data_evento).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-slate-100 text-slate-600">{c.visualizacoes || 0}</Badge>
                        </TableCell>
                        <TableCell className="text-right pr-6 space-x-2">
                          <Button variant="ghost" size="icon" onClick={() => copyLink(c.slug)} title="Copiar Link"><Copy size={16} /></Button>
                          <Dialog onOpenChange={(open) => open && fetchGuests(c.id)}>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="rounded-lg gap-2">
                                <Users size={14} /> Convidados
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader className="flex flex-row items-center justify-between">
                                <DialogTitle className="text-2xl font-serif">{c.nome_evento}</DialogTitle>
                                <Button variant="outline" size="sm" onClick={() => exportToCSV(c.nome_evento)} className="gap-2">
                                  <Download size={14} /> CSV
                                </Button>
                              </DialogHeader>
                              <div className="mt-4 border rounded-xl overflow-hidden">
                                <Table>
                                  <TableHeader className="bg-slate-50">
                                    <TableRow><TableHead>Nome</TableHead><TableHead className="text-center">Adultos</TableHead><TableHead className="text-center">Crianças</TableHead></TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {guests.map((g) => (
                                      <TableRow key={g.id}><TableCell className="font-medium">{g.nome}</TableCell><TableCell className="text-center">{g.adultos}</TableCell><TableCell className="text-center">{g.criancas}</TableCell></TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="icon" onClick={() => window.open(`/convite/${c.slug}`, '_blank')}><ExternalLink size={16} /></Button>
                          <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-600" onClick={() => deleteConvite(c.id)}><Trash2 size={16} /></Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vendas">
            <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
              <CardContent className="p-0 bg-white">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="pl-6">Email Comprador</TableHead>
                      <TableHead>Token</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Data Venda</TableHead>
                      <TableHead className="text-right pr-6">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tokens.map((t) => (
                      <TableRow key={t.id}>
                        <TableCell className="pl-6 font-medium">{t.comprador_email || 'N/A'}</TableCell>
                        <TableCell className="font-mono text-xs text-slate-400">{t.token.substring(0, 8)}...</TableCell>
                        <TableCell>
                          <Badge variant={t.usado ? "secondary" : "default"} className={t.usado ? "" : "bg-green-500"}>
                            {t.usado ? "Usado" : "Disponível"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-500">{new Date(t.created_at).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right pr-6">
                          {!t.usado && (
                            <Button variant="ghost" size="icon" onClick={() => copyTokenLink(t.token)} title="Copiar Link de Criação">
                              <Copy size={16} />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;