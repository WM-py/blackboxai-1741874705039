import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

interface AttendanceRecord {
  id: string;
  date: string;
  subject: string;
  class: string;
  status: 'present' | 'absent' | 'late';
  justification?: string;
  teacher: string;
}

export default function AttendanceScreen() {
  const [records] = useState<AttendanceRecord[]>([
    {
      id: '1',
      date: '2024-03-15',
      subject: 'Matemática',
      class: '9º Ano A',
      status: 'present',
      teacher: 'Prof. Maria Silva',
    },
    {
      id: '2',
      date: '2024-03-14',
      subject: 'História',
      class: '9º Ano A',
      status: 'late',
      justification: 'Atraso devido ao trânsito',
      teacher: 'Prof. João Santos',
    },
    {
      id: '3',
      date: '2024-03-13',
      subject: 'Português',
      class: '9º Ano A',
      status: 'absent',
      justification: 'Consulta médica',
      teacher: 'Prof. Ana Oliveira',
    },
  ]);

  const getStatusColor = (status: AttendanceRecord['status']) => {
    switch (status) {
      case 'present':
        return '#4CAF50';
      case 'late':
        return '#FF9800';
      case 'absent':
        return '#F44336';
      default:
        return '#666666';
    }
  };

  const getStatusIcon = (status: AttendanceRecord['status']) => {
    switch (status) {
      case 'present':
        return 'check-circle';
      case 'late':
        return 'clock-o';
      case 'absent':
        return 'times-circle';
      default:
        return 'question-circle';
    }
  };

  const renderRecord = ({ item: record }: { item: AttendanceRecord }) => (
    <TouchableOpacity
      style={styles.recordItem}
      onPress={() => {/* Handle record press */}}
    >
      <View style={styles.recordHeader}>
        <View style={styles.statusContainer}>
          <FontAwesome
            name={getStatusIcon(record.status)}
            size={24}
            color={getStatusColor(record.status)}
            style={styles.statusIcon}
          />
          <View>
            <ThemedText style={styles.date}>
              {new Date(record.date).toLocaleDateString('pt-BR')}
            </ThemedText>
            <ThemedText
              style={[
                styles.status,
                { color: getStatusColor(record.status) },
              ]}
            >
              {record.status === 'present' ? 'Presente' :
               record.status === 'late' ? 'Atrasado' : 'Ausente'}
            </ThemedText>
          </View>
        </View>
      </View>

      <View style={styles.recordDetails}>
        <View style={styles.detailItem}>
          <FontAwesome name="book" size={14} color="#666" />
          <ThemedText style={styles.detailText}>{record.subject}</ThemedText>
        </View>
        <View style={styles.detailItem}>
          <FontAwesome name="users" size={14} color="#666" />
          <ThemedText style={styles.detailText}>{record.class}</ThemedText>
        </View>
        <View style={styles.detailItem}>
          <FontAwesome name="user" size={14} color="#666" />
          <ThemedText style={styles.detailText}>{record.teacher}</ThemedText>
        </View>
      </View>

      {record.justification && (
        <View style={styles.justificationContainer}>
          <FontAwesome name="comment" size={14} color="#666" />
          <ThemedText style={styles.justification}>
            {record.justification}
          </ThemedText>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.summary}>
        <View style={styles.summaryItem}>
          <ThemedText style={styles.summaryValue}>
            {records.filter(r => r.status === 'present').length}
          </ThemedText>
          <ThemedText style={styles.summaryLabel}>Presenças</ThemedText>
        </View>
        <View style={styles.summaryItem}>
          <ThemedText style={styles.summaryValue}>
            {records.filter(r => r.status === 'late').length}
          </ThemedText>
          <ThemedText style={styles.summaryLabel}>Atrasos</ThemedText>
        </View>
        <View style={styles.summaryItem}>
          <ThemedText style={styles.summaryValue}>
            {records.filter(r => r.status === 'absent').length}
          </ThemedText>
          <ThemedText style={styles.summaryLabel}>Faltas</ThemedText>
        </View>
      </View>

      <FlatList
        data={records}
        renderItem={renderRecord}
        keyExtractor={record => record.id}
        contentContainerStyle={styles.listContent}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  summary: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    margin: 15,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.tint,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  listContent: {
    padding: 15,
  },
  recordItem: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIcon: {
    marginRight: 10,
  },
  date: {
    fontSize: 16,
    fontWeight: '500',
  },
  status: {
    fontSize: 14,
    fontWeight: '500',
  },
  recordDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginBottom: 5,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  justificationContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  justification: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
});
