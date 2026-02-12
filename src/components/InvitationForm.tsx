import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, MapPin, Phone, Gift, Heart, Palette, Music, CreditCard, Shirt, Plus, Trash2, Utensils, Star, Camera, GlassWater, Church } from 'lucide-react';

interface InvitationFormProps {
  onSubmit: (data: any) => void;
  onChange: (data: any) => void;
  loading: boolean;
}

const ICONS = [
  { id: 'heart', icon: <Heart size={14} />, label: 'Coração' },
  { id: 'church', icon: <Church size={14} />, label: 'Cerimônia' },
  { id: 'utensils', icon: <Utensils size={14} />, label: 'Jantar' },
  { id: 'music', icon: <Music size={14} />, label: 'Festa' },
  { id: 'star', icon: <Star size={14} />, label: 'Destaque' },
  { id: 'camera', icon: <Camera size={14} />, label: 'Fotos' },
  { id: 'glass', icon: <GlassWater size={14} />, label: 'Brinde' },
];

const MUSIC_PRESETS = [
  { name: 'Romântico (Piano)', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { name: 'Clássico (Violino)', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { name: 'Festa (Animado)', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
];

const InvitationForm = ({ onSubmit, onChange, loading }: InvitationFormProps) => {
  const [formData, setFormData] = useState({
    nome_evento: '',
    frase: '',
    data_evento: '',
    horario: '',
    endereco: '',
    link_maps: '',
    link_whatsapp: '',
    link_presentes: '',
    pix_key: '',
    musica_url: '',
    contato: '',
    dress_code: '',
    cor: '#7c3aed',
    tema: 'classic',
    timeline: [
      { time: '19:00', title: 'Cerimônia', icon: 'church' },
      { time: '20:30', title: 'Jantar', icon: 'utensils' },
      { time: '22:00', title: 'Festa', icon: 'music' }
    ]
  });

  useEffect(() => {
    onChange(formData);
  }, [formData, onChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleTimelineChange = (index: number, field: string, value: string) => {
    const newTimeline = [...formData.timeline];
    newTimeline[index] = { ...newTimeline[index], [field]: value };
    setFormData({ ...formData, timeline: newTimeline });
  };

  const addTimelineItem = () => {
    setFormData({
      ...formData,
      timeline: [...formData.timeline, { time: '', title: '', icon: 'star' }]
    });
  };

  const removeTimelineItem = (index: number) => {
    setFormData({
      ...formData,
      timeline: formData.timeline.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border-none shadow-xl bg-white/80 backdrop-blur-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-serif text-primary">Crie seu Convite Mágico</CardTitle>
        <p className="text-muted-foreground">Preencha os detalhes abaixo para gerar seu link exclusivo.</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2 text-slate-700">
              <Heart className="text-primary" size={20} /> Informações Básicas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nome_evento">Nome do Evento / Noivos</Label>
                <Input id="nome_evento" name="nome_evento" placeholder="Ex: Maria & João" required onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="data_evento">Data do Evento</Label>
                <Input id="data_evento" name="data_evento" type="date" required onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* Location & Time */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2 text-slate-700">
              <MapPin className="text-primary" size={20} /> Local e Horário
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="horario">Horário de Início</Label>
                <Input id="horario" name="horario" placeholder="Ex: 19:30" onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endereco">Endereço Completo</Label>
                <Input id="endereco" name="endereco" placeholder="Rua, Número, Bairro, Cidade" onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* Timeline Editor */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold flex items-center gap-2 text-slate-700">
                <Clock className="text-primary" size={20} /> Cronograma do Evento
              </h3>
              <Button type="button" variant="outline" size="sm" onClick={addTimelineItem} className="gap-2">
                <Plus size={14} /> Adicionar
              </Button>
            </div>
            <div className="space-y-3">
              {formData.timeline.map((item, index) => (
                <div key={index} className="flex gap-3 items-end animate-in fade-in slide-in-from-top-2">
                  <div className="w-20">
                    <Label className="text-[10px] uppercase">Hora</Label>
                    <Input 
                      value={item.time} 
                      placeholder="19:00" 
                      onChange={(e) => handleTimelineChange(index, 'time', e.target.value)} 
                    />
                  </div>
                  <div className="flex-1">
                    <Label className="text-[10px] uppercase">Atividade</Label>
                    <Input 
                      value={item.title} 
                      placeholder="Ex: Cerimônia" 
                      onChange={(e) => handleTimelineChange(index, 'title', e.target.value)} 
                    />
                  </div>
                  <div className="w-24">
                    <Label className="text-[10px] uppercase">Ícone</Label>
                    <Select value={item.icon} onValueChange={(v) => handleTimelineChange(index, 'icon', v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ICONS.map(i => (
                          <SelectItem key={i.id} value={i.id}>
                            <div className="flex items-center gap-2">{i.icon} {i.label}</div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    className="text-red-400 hover:text-red-600"
                    onClick={() => removeTimelineItem(index)}
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Style & Music */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2 text-slate-700">
              <Palette className="text-primary" size={20} /> Estilo e Música
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="tema">Estilo do Convite</Label>
                <Select onValueChange={(v) => handleSelectChange('tema', v)} defaultValue="classic">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um tema" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="classic">Clássico & Elegante</SelectItem>
                    <SelectItem value="modern">Moderno & Minimalista</SelectItem>
                    <SelectItem value="romantic">Romântico & Floral</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="musica_url">Música de Fundo</Label>
                <Select onValueChange={(v) => handleSelectChange('musica_url', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha uma música" />
                  </SelectTrigger>
                  <SelectContent>
                    {MUSIC_PRESETS.map(m => (
                      <SelectItem key={m.url} value={m.url}>{m.name}</SelectItem>
                    ))}
                    <SelectItem value="custom">Link Personalizado (MP3)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {formData.musica_url === 'custom' && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                <Label htmlFor="custom_music">Link da Música (URL MP3)</Label>
                <Input id="custom_music" name="musica_url" placeholder="https://exemplo.com/musica.mp3" onChange={handleChange} />
              </div>
            )}
          </div>

          {/* Extra Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2 text-slate-700">
              <Plus className="text-primary" size={20} /> Informações Extras
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="dress_code">Dress Code (Traje)</Label>
                <Input id="dress_code" name="dress_code" placeholder="Ex: Esporte Fino" onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pix_key">Chave Pix para Presentes</Label>
                <Input id="pix_key" name="pix_key" placeholder="E-mail, CPF ou Aleatória" onChange={handleChange} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="frase">Frase Especial</Label>
              <Textarea id="frase" name="frase" placeholder="Uma mensagem carinhosa para seus convidados..." onChange={handleChange} />
            </div>
          </div>

          <Button type="submit" className="w-full h-14 text-lg font-bold shadow-lg shadow-primary/20" disabled={loading}>
            {loading ? "Gerando Convite..." : "Finalizar e Gerar Link"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default InvitationForm;