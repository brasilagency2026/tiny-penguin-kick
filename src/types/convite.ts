export interface Convite {
  id?: string;
  token: string;
  nome_evento: string;
  frase?: string;
  data_evento: string;
  horario?: string;
  endereco?: string;
  link_maps?: string;
  link_whatsapp?: string;
  link_presentes?: string;
  pix_key?: string;
  musica_url?: string;
  contato?: string;
  tema?: string;
  cor?: string;
  visualizacoes?: number;
  slug: string;
  created_at?: string;
}

export interface AcessoML {
  id: string;
  token: string;
  usado: boolean;
  payment_id?: string;
  convite_id?: string;
  comprador_email?: string;
  comprador_id?: string;
  created_at?: string;
}