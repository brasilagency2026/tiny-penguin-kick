import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { Convite } from '@/types/convite';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Enregistrement d'une police plus élégante (optionnel si disponible)
// Font.register({ family: 'Helvetica-Bold', src: '...' });

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
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    textAlign: 'center',
    color: '#7c3aed',
  },
  phrase: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 40,
    textAlign: 'center',
    color: '#64748b',
  },
  detailLabel: {
    fontSize: 10,
    textTransform: 'uppercase',
    color: '#94a3b8',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    marginBottom: 20,
    color: '#1e293b',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 10,
    color: '#cbd5e1',
  }
});

interface Props {
  convite: Convite;
}

export const InvitationPDF = ({ convite }: Props) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.container}>
        <Text style={styles.title}>{convite.nome_evento}</Text>
        {convite.frase && <Text style={styles.phrase}>"{convite.frase}"</Text>}
        
        <Text style={styles.detailLabel}>Data</Text>
        <Text style={styles.detailValue}>
          {format(new Date(convite.data_evento), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
        </Text>

        {convite.horario && (
          <>
            <Text style={styles.detailLabel}>Horário</Text>
            <Text style={styles.detailValue}>{convite.horario}</Text>
          </>
        )}

        {convite.endereco && (
          <>
            <Text style={styles.detailLabel}>Local</Text>
            <Text style={styles.detailValue}>{convite.endereco}</Text>
          </>
        )}

        <Text style={styles.footer}>Convite Digital Gerado por ConvitePro</Text>
      </View>
    </Page>
  </Document>
);