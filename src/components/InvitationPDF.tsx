import React from 'react';
import { Page, Text, View, Document, StyleSheet, Link } from '@react-pdf/renderer';
import { Convite } from '@/types/convite';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
  },
  container: {
    border: '2pt solid #7c3aed',
    padding: 30,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    marginBottom: 10,
    textAlign: 'center',
    color: '#7c3aed',
    fontWeight: 'bold',
  },
  phrase: {
    fontSize: 12,
    fontStyle: 'italic',
    marginBottom: 20,
    textAlign: 'center',
    color: '#64748b',
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 9,
    textTransform: 'uppercase',
    color: '#94a3b8',
    marginBottom: 4,
    letterSpacing: 1,
  },
  value: {
    fontSize: 14,
    color: '#1e293b',
    marginBottom: 10,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 8,
    fontSize: 11,
  },
  time: {
    width: 50,
    fontWeight: 'bold',
    color: '#7c3aed',
  },
  activity: {
    flex: 1,
    color: '#475569',
  },
  footer: {
    marginTop: 'auto',
    paddingTop: 20,
    borderTop: '1pt solid #f1f5f9',
    alignItems: 'center',
  },
  link: {
    fontSize: 10,
    color: '#7c3aed',
    textDecoration: 'underline',
    marginTop: 5,
  },
  notice: {
    fontSize: 8,
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 10,
  }
});

interface Props {
  convite: Convite;
}

export const InvitationPDF = ({ convite }: Props) => {
  const baseUrl = window.location.origin;
  const fullUrl = `${baseUrl}/convite/${convite.slug}`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>{convite.nome_evento}</Text>
            {convite.frase && <Text style={styles.phrase}>"{convite.frase}"</Text>}
          </View>
          
          <View style={styles.section}>
            <Text style={styles.label}>Data e Horário</Text>
            <Text style={styles.value}>
              {format(new Date(convite.data_evento), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
              {convite.horario ? ` às ${convite.horario}` : ''}
            </Text>
          </View>

          {convite.endereco && (
            <View style={styles.section}>
              <Text style={styles.label}>Localização</Text>
              <Text style={styles.value}>{convite.endereco}</Text>
              <Link style={styles.link} src={convite.link_maps || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(convite.endereco)}`}>
                Ver no Google Maps
              </Link>
            </View>
          )}

          {convite.dress_code && (
            <View style={styles.section}>
              <Text style={styles.label}>Traje (Dress Code)</Text>
              <Text style={styles.value}>{convite.dress_code}</Text>
            </View>
          )}

          {convite.pix_key && (
            <View style={styles.section}>
              <Text style={styles.label}>Sugestão de Presente (Pix)</Text>
              <Text style={styles.value}>{convite.pix_key}</Text>
            </View>
          )}

          {convite.timeline && (convite.timeline as any[]).length > 0 && (
            <View style={styles.section}>
              <Text style={styles.label}>Cronograma</Text>
              {(convite.timeline as any[]).map((item, i) => (
                <View key={i} style={styles.timelineItem}>
                  <Text style={styles.time}>{item.time}</Text>
                  <Text style={styles.activity}>{item.title}</Text>
                </View>
              ))}
            </View>
          )}

          <View style={styles.footer}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#1e293b' }}>Acesse a versão interativa</Text>
            <Text style={{ fontSize: 10, color: '#64748b', marginBottom: 5 }}>Para confirmar presença e ouvir a trilha sonora:</Text>
            <Link style={styles.link} src={fullUrl}>{fullUrl}</Link>
            <Text style={styles.notice}>Convite Digital Gerado por ConvitePro</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};