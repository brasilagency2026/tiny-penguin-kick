import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, MapPin, Phone, Gift, Heart, Palette } from 'lucide-react';

interface InvitationFormProps {
  onSubmit: (data: any) => void;
  loading: boolean;
}

const InvitationForm = ({ onSubmit, loading }: InvitationFormProps) => {
  const [formData, setFormData] = useState({
    nome_evento: '',
    frase: '',
    data_evento: '',
    horario: '',
    endereco: '',
    link_maps: '',
    link_whatsapp: '',
    link_presentes: '',
    contato: '',
    cor: '#7c3aed',
    tema: 'classic'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
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
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="nome_evento">Nome do Evento / Noivos</Label>
              <div className="relative">
                <Heart className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="nome_evento" name="nome_evento" placeholder="Ex: Maria & João" className="pl-10" required onChange={handleChange} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="data_evento">Data do Evento</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="data_evento" name="data_evento" type="date" className="pl-10" required onChange={handleChange} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="horario">Horário</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="horario" name="horario" placeholder="Ex: 19:30" className="pl-10" onChange={handleChange} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contato">WhatsApp para Confirmação</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="contato" name="contato" placeholder="Ex: 11999999999" className="pl-10" onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="frase">Frase Especial</Label>
            <Textarea id="frase" name="frase" placeholder="Uma mensagem carinhosa para seus convidados..." onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endereco">Endereço Completo</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input id="endereco" name="endereco" placeholder="Rua, Número, Bairro, Cidade" className="pl-10" onChange={handleChange} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="tema">Estilo do Convite</Label>
              <div className="relative">
                <Palette className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                <Select onValueChange={(v) => handleSelectChange('tema', v)} defaultValue="classic">
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Selecione um tema" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="classic">Clássico & Elegante</SelectItem>
                    <SelectItem value="modern">Moderno & Minimalista</SelectItem>
                    <SelectItem value="romantic">Romântico & Floral</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cor">Cor do Tema</Label>
              <Input id="cor" name="cor" type="color" className="h-10 w-full cursor-pointer" defaultValue="#7c3aed" onChange={handleChange} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="link_maps">Link do Google Maps</Label>
              <Input id="link_maps" name="link_maps" placeholder="https://goo.gl/maps/..." onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="link_presentes">Link Lista de Presentes</Label>
              <div className="relative">
                <Gift className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="link_presentes" name="link_presentes" placeholder="https://site.com/lista" className="pl-10" onChange={handleChange} />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full h-12 text-lg font-semibold" disabled={loading}>
            {loading ? "Gerando Convite..." : "Finalizar e Gerar Link"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default InvitationForm;