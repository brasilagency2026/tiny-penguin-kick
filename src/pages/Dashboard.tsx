import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Users, Ticket, Eye, Lock, TrendingUp, Calendar as CalendarIcon, ArrowUpRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState({ tokens: 0, convites: 0, views: 0 });
  const [recentConvites, setRecentConvites] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Senha incorreta');
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;

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
      setRecentConvites(convites?.slice(0, 5) || []);

      // Prepare chart data (views per invitation)
      const chartDataFormatted = convites?.slice(0, 7).map(c => ({
        name: c.nome_evento.length > 10 ? c.nome_evento.substring(0, 10) + '...' : c.nome_evento,
        views: c.visualizacoes || 0
      })).reverse() || [];
      
      setChartData(chartDataFormatted);
      setLoading(false);
    };

    fetchData();
  }, [isAuthenticated]);

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
            <p className="text-slate-500">Bem-vindo de volta, administrador.</p>
          </div>
          <Button variant="outline" className="rounded-xl" onClick={() => setIsAuthenticated(false)}>Sair do Sistema</Button>
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
              <CardTitle className="text-lg font-serif">Últimas Atividades</CardTitle>
              <CardDescription>Convites gerados recentemente</CardDescription>
            </CardHeader>
            <CardContent className="p-0 bg-white">
              <div className="divide-y divide-slate-50">
                {recentConvites.map((c) => (
                  <div key={c.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
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
                    <div className="text-right">
                      <p className="text-sm font-bold text-primary flex items-center">
                        {c.visualizacoes} <Eye className="h-3 w-3 ml-1 opacity-50" />
                      </p>
                      <Badge variant="outline" className="text-[9px] h-4 px-1 bg-green-50 text-green-600 border-green-100">Ativo</Badge>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-slate-50">
                <Button variant="ghost" className="w-full text-xs text-slate-400 font-bold uppercase tracking-widest hover:text-primary">
                  Ver todos os registros <ArrowUpRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;