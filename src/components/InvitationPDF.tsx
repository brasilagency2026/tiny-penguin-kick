import React from 'react';
import { Page, Text, View, Document, StyleSheet, Link, Image } from '@react-pdf/renderer';
import { Convite } from '@/types/convite';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const styles = StyleSheet.create({
  page: {
    padding: 0,
    backgroundColor: '#f8fafc',
  },
  container: {
    margin: 'auto',
    width: '85%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 40,
    marginTop: 40,
    marginBottom: 40,
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 36,
    color: '#7c3aed',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  phrase: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 20,
  },
  divider: {
    height: 2,
    backgroundColor: '#f1f5f9',
    width: '100%',
    marginBottom: 25,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  infoBox: {
    width: '48%',
    backgroundColor: '#fdfaff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    border: '1pt solid #f3e8ff',
  },
  label: {
    fontSize: 8,
    textTransform: 'uppercase',
    color: '#a78bfa',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  value: {
    fontSize: 12,
    color: '#1e293b',
    fontWeight: 'bold',
  },
  timelineSection: {
    marginTop: 10,
    marginBottom: 30,
  },
  timelineTitle: {
    fontSize: 10,
    textTransform: 'uppercase',
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 15,
    letterSpacing: 2,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingLeft: 20,
  },
  time: {
    width: 60,
    fontSize: 10,
    color: '#7c3aed',
    fontWeight: 'bold',
  },
  activity: {
    fontSize: 11,
    color: '#475569',
  },
  buttonContainer: {
    marginTop: 20,
    gap: 10,
  },
  button: {
    backgroundColor: '#7c3aed',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
  },
  buttonOutline: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    border: '1.5pt solid #7c3aed',
    textDecoration: 'none',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  buttonTextOutline: {
    color: '#7c3aed',
    fontSize: 12,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 9,
    color: '#94a3b8',
    textAlign: 'center',
  },
  link: {
    color: '#7c3aed',
    textDecoration: 'underline',
    fontSize: 9,
    marginTop: 5,
  }
});

interface Props {
  convite: Convite;
}

export const InvitationPDF = ({ convite }: Props) => {
  const baseUrl = window.location.origin;
  const fullUrl = `${baseUrl}/convite/${convite.slug}`;
  const mapsUrl = convite.link_maps || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(convite.endereco || '')}`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>{convite.nome_evento}</Text>
            {convite.frase && <Text style={styles.phrase}>"{convite.frase}"</Text>}
          </View>

          <View style={styles.divider} />

          {/* Info Grid */}
          <View style={styles.infoGrid}>
            <View style={styles.infoBox}>
              <Text style={styles.label}>Data</Text>
              <Text style={styles.value}>
                {format(new Date(convite.data_evento), "dd/MM/yyyy", { locale: ptBR })}
              </Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.label}>Horário</Text>
              <Text style={styles.value}>{convite.horario || '--:--'}</Text>
            </View>
            {convite.dress_code && (
              <View style={styles.infoBox}>
                <Text style={styles.label}>Traje</Text>
                <Text style={styles.value}>{convite.dress_code}</Text>
              </View>
            )}
          </View>

          {/* Timeline */}
          {convite.timeline && (convite.timeline as any[]).length > 0 && (
            <View style={styles.timelineSection}>
              <Text style={styles.timelineTitle}>Cronograma</Text>
              {(convite.timeline as any[]).map((item, i) => (
                <View key={i} style={styles.timelineItem}>
                  <Text style={styles.time}>{item.time}</Text>
                  <Text style={styles.activity}>{item.title}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Interactive Buttons */}
          <View style={styles.buttonContainer}>
            <Link style={styles.button} src={fullUrl}>
              <Text style={styles.buttonText}>CONFIRMAR PRESENÇA</Text>
            </Link>
            
            {convite.endereco && (
              <Link style={styles.buttonOutline} src={mapsUrl}>
                <Text style={styles.buttonTextOutline}>VER LOCALIZAÇÃO NO MAPA</Text>
              </Link>
            )}
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Este é um convite interativo.</Text>
            <Text style={styles.footerText}>Clique nos botões acima para interagir.</Text>
            <Link style={styles.link} src={fullUrl}>{fullUrl}</Link>
            <Text style={[styles.footerText, { marginTop: 20, fontSize: 7 }]}>Gerado por ConvitePro</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};