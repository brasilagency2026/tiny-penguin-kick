import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, MapPin, Phone, Gift, Heart, Palette, Music, CreditCard, Shirt, Plus, Trash2, Utensils, Star, Camera, GlassWater, Church, Image as ImageIcon, Sparkles, Baby, GraduationCap, PartyPopper } from 'lucide-react';

interface InvitationFormProps {
  onSubmit: (data: any) => void;
  onChange: (data: any) => void;
  loading: boolean;
}

const ICONS = [
  { id: 'heart', icon: <Heart size={14} />, label: 'Cœur' },
  { id: 'church', icon: <Church size={14} />, label: 'Cérémonie' },
  { id: 'utensils', icon: <Utensils size={14} />, label: 'Repas' },
  { id: 'music', icon: <Music size={14} />, label: 'Fête' },
  { id: 'star', icon: <Star size={14} />, label: 'Étoile' },
  { id: 'camera', icon: <Camera size={14} />, label: 'Photos' },
  { id: 'glass', icon: <GlassWater size={14} />, label: 'Brinde' },
  { id: 'baby', icon: <Baby size={14} />, label: 'Bébé' },
  { id: 'grad', icon: <GraduationCap size={14} />, label: 'Diplôme' },
];

const EVENT_TYPES = [
  { id: 'casamento', label: 'Mariage', icon: <Heart size={14} /> },
  { id: 'nascimento', label: 'Naissance', icon: <Baby size={14} /> },
  { id: 'aniversario', label: 'Anniversaire', icon: <PartyPopper size={14} /> },
  { id: 'formatura', label: 'Remise de diplôme', icon: <GraduationCap size={14} /> },
  { id: 'batizado', label: 'Baptême', icon: <Church size={14} /> },
  { id: 'outro', label: 'Autre Événement', icon: <Sparkles size={14} /> },
];

const PHOTO_PRESETS = [
  { id: 'wedding', name: 'Mariage', url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800', icon: <Church size={14} /> },
  { id: 'baby', name: 'Bébé', url: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=800', icon: <Baby size={14} /> },
  { id: 'party', name: 'Fête', url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800', icon: <Music size={14} /> },
  { id: 'grad', name: 'Diplôme', url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800', icon: <GraduationCap size={14} /> },
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
      { time: '19:00', title: 'Début', icon: 'star' },
      { time: '21:00', title: 'Célébration', icon: 'music' }
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
        <CardTitle className="text-3xl font-serif text-primary">Créez votre Invitation</CardTitle>
        <p className="text-muted-foreground">Personnalisez chaque détail de votre événement.</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Event Type Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2 text-slate-700">
              <Sparkles className="text-primary" size={20} /> Type d'Événement
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="tipo_evento">Quel type d'événement ?</Label>
                <Select onValueChange={(v) => handleSelectChange('tipo_evento', v)} defaultValue="casamento">
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez le type" />
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
                <Label htmlFor="nome_evento">Nom de l'Événement</Label>
                <Input id="nome_evento" name="nome_evento" placeholder="Ex: Mariage de Marie & Jean" required onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2 text-slate-700">
              <Calendar className="text-primary" size={20} /> Date et Heure
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="data_evento">Date de l'Événement</Label>
                <Input id="data_evento" name="data_evento" type="date" required onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="horario">Heure de Début</Label>
                <Input id="horario" name="horario" placeholder="Ex: 19:30" onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* Photo Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2 text-slate-700">
              <ImageIcon className="text-primary" size={20} /> Image de Couverture
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
                placeholder="Ou collez un lien d'image personnalisé..." 
                onChange={handleChange} 
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2 text-slate-700">
              <MapPin className="text-primary" size={20} /> Lieu
            </h3>
            <div className="space-y-2">
              <Label htmlFor="endereco">Adresse Complète</Label>
              <Input id="endereco" name="endereco" placeholder="Rue, Numéro, Ville" onChange={handleChange} />
            </div>
          </div>

          {/* Timeline Editor */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold flex items-center gap-2 text-slate-700">
                <Clock className="text-primary" size={20} /> Programme
              </h3>
              <Button type="button" variant="outline" size="sm" onClick={addTimelineItem} className="gap-2">
                <Plus size={14} /> Ajouter
              </Button>
            </div>
            <div className="space-y-3">
              {formData.timeline.map((item, index) => (
                <div key={index} className="flex gap-3 items-end">
                  <div className="w-20">
                    <Input value={item.time} placeholder="19:00" onChange={(e) => handleTimelineChange(index, 'time', e.target.value)} />
                  </div>
                  <div className="flex-1">
                    <Input value={item.title} placeholder="Activité" onChange={(e) => handleTimelineChange(index, 'title', e.target.value)} />
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
              <Palette className="text-primary" size={20} /> Style Visuel
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="tema">Thème</Label>
                <Select onValueChange={(v) => handleSelectChange('tema', v)} defaultValue="classic">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="classic">Classique</SelectItem>
                    <SelectItem value="modern">Moderne</SelectItem>
                    <SelectItem value="romantic">Romantique</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cor">Couleur Principale</Label>
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
            {loading ? "Génération..." : "Finaliser l'Invitation"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default InvitationForm;