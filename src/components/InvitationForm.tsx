import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, MapPin, Phone, Gift, Heart, Palette, Music, CreditCard, Shirt, Plus, Trash2, Utensils, Star, Camera, GlassWater, Church, Image as ImageIcon, Sparkles, Baby, GraduationCap, PartyPopper, Volume2 } from 'lucide-react';

interface InvitationFormProps {
  onSubmit: (data: any) => void;
  onChange: (data: any) => void;
  loading: boolean;
}

const ICONS = [
  { id: 'heart', icon: <Heart size={14} />, label: 'Coração' },
  { id: 'church', icon: <Church size={14} />, label: 'Cerimônia' },
  { id: 'utensils', icon: <Utensils size={14} />, label: 'Refeição' },
  { id: 'music', icon: <Music size={14} />, label: 'Festa' },
  { id: 'star', icon: <Star size={14} />, label: 'Estrela' },
  { id: 'camera', icon: <Camera size={14} />, label: 'Fotos' },
  { id: 'glass', icon: <GlassWater size={14} />, label: 'Brinde' },
  { id: 'baby', icon: <Baby size={14} />, label: 'Bebê' },
  { id: 'grad', icon: <GraduationCap size={14} />, label: 'Formatura' },
];

const EVENT_TYPES = [
  { id: 'casamento', label: 'Casamento', icon: <Heart size={14} /> },
  { id: 'nascimento', label: 'Nascimento / Chá', icon: <Baby size={14} /> },
  { id: 'aniversario', label: 'Aniversário', icon: <PartyPopper size={14} /> },
  { id: 'formatura', label: 'Formatura', icon: <GraduationCap size={14} /> },
  { id: 'batizado', label: 'Batizado', icon: <Church size={14} /> },
  { id: 'outro', label: 'Outro Evento', icon: <Sparkles size={14} /> },
];

const PHOTO_PRESETS = [
  { id: 'wedding', name: 'Casamento', url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800', icon: <Church size={14} /> },
  { id: 'baby', name: 'Bebê', url: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=800', icon: <Baby size={14} /> },
  { id: 'party', name: 'Festa', url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800', icon: <Music size={14} /> },
  { id: 'grad', name: 'Formatura', url: 'https://images.unsplash.com/photo-1525921429624-479b6a29d84c?auto=format&fit=crop&q=80&w=800', icon: <GraduationCap size={14} /> },
];

const MUSIC_PRESETS = [
  { name: 'Romântica 1', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { name: 'Romântica 2', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { name: 'Animada 1', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
  { name: 'Suave', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
];

const InvitationForm = ({ onSubmit, onChange, loading }: InvitationFormProps) => {
  const [formData, setFormData] = useState({
    nome_evento: '',
    tipo_evento: 'casamento',
    frase: '',
    data_evento: '',
    horario: '',
    endereco: '',
    link_maps: '',
    link_whatsapp: '',
    link_presentes: '',
    pix_key: '',
    musica_url: '',
    foto_url: '',
    contato: '',
    dress_code: '',
    cor: '#7c3aed',
    tema: 'classic',
    timeline: [
      { time: '19:00', title: 'Início', icon: 'star' },
      { time: '21:00', title: 'Celebração', icon: 'music' }
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
        <CardTitle className="text-3xl font-serif text-primary">Crie seu Convite</CardTitle>
        <p className="text-muted-foreground">Personalize cada detalhe do seu evento.</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Event Type Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2 text-slate-700">
              <Sparkles className="text-primary" size={20} /> Tipo de Evento
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="tipo_evento">Qual o tipo do evento?</Label>
                <Select onValueChange={(v) => handleSelectChange('tipo_evento', v)} defaultValue="casamento">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {EVENT_TYPES.map(type => (
                      <SelectItem key={type.id} value={type.id}>
                        <div className="flex items-center gap-2">{type.icon} {type.label}</div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="nome_evento">Nome do Evento</Label>
                <Input id="nome_evento" name="nome_evento" placeholder="Ex: Casamento de Maria & João" required onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2 text-slate-700">
              <Calendar className="text-primary" size={20} /> Data e Hora
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="data_evento">Data do Evento</Label>
                <Input id="data_evento" name="data_evento" type="date" required onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="horario">Horário de Início</Label>
                <Input id="horario" name="horario" placeholder="Ex: 19:30" onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* Photo Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2 text-slate-700">
              <ImageIcon className="text-primary" size={20} /> Imagem de Capa
            </h3>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {PHOTO_PRESETS.map((photo, idx) => (
                  <Button 
                    key={idx} 
                    type="button" 
                    variant={formData.foto_url === photo.url ? "default" : "outline"}
                    size="sm"
                    className="rounded-full gap-2"
                    onClick={() => setFormData({ ...formData, foto_url: photo.url })}
                  >
                    {photo.icon} {photo.name}
                  </Button>
                ))}
              </div>
              <Input 
                id="foto_url" 
                name="foto_url" 
                value={formData.foto_url}
                placeholder="Ou cole un link de imagem personalizado..." 
                onChange={handleChange} 
              />
            </div>
          </div>

          {/* Music Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2 text-slate-700">
              <Music className="text-primary" size={20} /> Música de Fundo
            </h3>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {MUSIC_PRESETS.map((music, idx) => (
                  <Button 
                    key={idx} 
                    type="button" 
                    variant={formData.musica_url === music.url ? "default" : "outline"}
                    size="sm"
                    className="rounded-full gap-2"
                    onClick={() => setFormData({ ...formData, musica_url: music.url })}
                  >
                    <Volume2 size={14} /> {music.name}
                  </Button>
                ))}
              </div>
              <Input 
                id="musica_url" 
                name="musica_url" 
                value={formData.musica_url}
                placeholder="Link direto do MP3 (ex: Dropbox, Google Drive direto)..." 
                onChange={handleChange} 
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2 text-slate-700">
              <MapPin className="text-primary" size={20} /> Localização
            </h3>
            <div className="space-y-2">
              <Label htmlFor="endereco">Endereço Completo</Label>
              <Input id="endereco" name="endereco" placeholder="Rua, Número, Cidade" onChange={handleChange} />
            </div>
          </div>

          {/* Timeline Editor */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold flex items-center gap-2 text-slate-700">
                <Clock className="text-primary" size={20} /> Cronograma
              </h3>
              <Button type="button" variant="outline" size="sm" onClick={addTimelineItem} className="gap-2">
                <Plus size={14} /> Adicionar
              </Button>
            </div>
            <div className="space-y-3">
              {formData.timeline.map((item, index) => (
                <div key={index} className="flex gap-3 items-end">
                  <div className="w-20">
                    <Input value={item.time} placeholder="19:00" onChange={(e) => handleTimelineChange(index, 'time', e.target.value)} />
                  </div>
                  <div className="flex-1">
                    <Input value={item.title} placeholder="Atividade" onChange={(e) => handleTimelineChange(index, 'title', e.target.value)} />
                  </div>
                  <div className="w-24">
                    <Select value={item.icon} onValueChange={(v) => handleTimelineChange(index, 'icon', v)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {ICONS.map(i => (
                          <SelectItem key={i.id} value={i.id}>
                            <div className="flex items-center gap-2">{i.icon}</div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="button" variant="ghost" size="icon" className="text-red-400" onClick={() => removeTimelineItem(index)}>
                    <Trash2 size={18} />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Style */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2 text-slate-700">
              <Palette className="text-primary" size={20} /> Estilo Visual
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="tema">Tema</Label>
                <Select onValueChange={(v) => handleSelectChange('tema', v)} defaultValue="classic">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="classic">Clássico</SelectItem>
                    <SelectItem value="modern">Moderno</SelectItem>
                    <SelectItem value="romantic">Romântico</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cor">Cor Principal</Label>
                <div className="flex gap-2">
                  {['#7c3aed', '#db2777', '#0f172a', '#059669', '#d97706'].map(c => (
                    <button
                      key={c}
                      type="button"
                      className={`w-8 h-8 rounded-full border-2 ${formData.cor === c ? 'border-slate-900' : 'border-transparent'}`}
                      style={{ backgroundColor: c }}
                      onClick={() => setFormData({ ...formData, cor: c })}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full h-14 text-lg font-bold shadow-lg" disabled={loading}>
            {loading ? "Gerando..." : "Finalizar Convite"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default InvitationForm;