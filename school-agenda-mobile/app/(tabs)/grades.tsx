import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

interface Grade {
  id: string;
  subject: string;
  type: 'test' | 'assignment' | 'project' | 'participation';
  description: string;
  value: number;
  maxValue: number;
  date: string;
  teacher: string;
  feedback?: string;
}

interface SubjectGrades {
  subject: string;
  teacher: string;
  average: number;
  grades: Grade[];
}

export default function GradesScreen() {
  const [subjects] = useState<SubjectGrades[]>([
    {
      subject: 'Matemática',
      teacher: 'Prof. Maria Silva',
      average: 8.5,
      grades: [
        {
          id: '1',
          subject: 'Matemática',
          type: 'test',
          description: 'Prova Bimestral',
          value: 9.0,
          maxValue: 10,
          date: '2024-03-10',
          teacher: 'Prof. Maria Silva',
          feedback: 'Excelente desempenho!',
        },
        {
          id: '2',
          subject: 'Matemática',
          type: 'assignment',
          description: 'Lista de Exercícios',
          value: 8.0,
          maxValue: 10,
          date: '2024-03-05',
          teacher: 'Prof. Maria Silva',
        },
      ],
    },
    {
      subject: 'Português',
      teacher: 'Prof. Ana Oliveira',
      average: 7.8,
      grades: [
        {
          id: '3',
          subject: 'Português',
          type: 'project',
          description: 'Trabalho de Literatura',
          value: 8.5,
          maxValue: 10,
          date: '2024-03-08',
          teacher: 'Prof. Ana Oliveira',
          feedback: 'Boa análise dos personagens',
        },
        {
          id: '4',
          subject: 'Português',
          type: 'participation',
          description: 'Participação em Aula',
          value: 7.0,
          maxValue: 10,
          date: '2024-03-01',
          teacher: 'Prof. Ana Oliveira',
        },
      ],
    },
  ]);

  const getGradeColor = (value: number, maxValue: number) => {
    const percentage = (value / maxValue) * 100;
    if (percentage >= 80) return '#4CAF50';
    if (percentage >= 60) return '#FF9800';
    return '#F44336';
  };

  const getTypeIcon = (type: Grade['type']) => {
    switch (type) {
      case 'test':
        return 'file-text-o';
      case 'assignment':
        return 'pencil';
      case 'project':
        return 'folder-o';
      case 'participation':
        return 'comments-o';
      default:
        return 'star-o';
    }
  };

  const renderGrade = (grade: Grade) => (
    <View key={grade.id} style={styles.gradeItem}>
      <View style={styles.gradeHeader}>
        <View style={styles.gradeTypeContainer}>
          <FontAwesome
            name={getTypeIcon(grade.type)}
            size={20}
            color="#666"
            style={styles.typeIcon}
          />
          <View>
            <ThemedText style={styles.gradeDescription}>
              {grade.description}
            </ThemedText>
            <ThemedText style={styles.gradeDate}>
              {new Date(grade.date).toLocaleDateString('pt-BR')}
            </ThemedText>
          </View>
        </View>
        <ThemedText
          style={[
            styles.gradeValue,
            { color: getGradeColor(grade.value, grade.maxValue) },
          ]}
        >
          {grade.value.toFixed(1)}/{grade.maxValue}
        </ThemedText>
      </View>

      {grade.feedback && (
        <View style={styles.feedbackContainer}>
          <FontAwesome name="comment-o" size={14} color="#666" />
          <ThemedText style={styles.feedback}>{grade.feedback}</ThemedText>
        </View>
      )}
    </View>
  );

  const renderSubject = (subjectData: SubjectGrades) => (
    <View key={subjectData.subject} style={styles.subjectContainer}>
      <View style={styles.subjectHeader}>
        <View>
          <ThemedText style={styles.subjectTitle}>
            {subjectData.subject}
          </ThemedText>
          <ThemedText style={styles.teacherName}>
            {subjectData.teacher}
          </ThemedText>
        </View>
        <View style={styles.averageContainer}>
          <ThemedText style={styles.averageLabel}>Média</ThemedText>
          <ThemedText
            style={[
              styles.averageValue,
              { color: getGradeColor(subjectData.average, 10) },
            ]}
          >
            {subjectData.average.toFixed(1)}
          </ThemedText>
        </View>
      </View>

      {subjectData.grades.map(renderGrade)}
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {subjects.map(renderSubject)}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 15,
  },
  subjectContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  subjectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  teacherName: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  averageContainer: {
    alignItems: 'center',
  },
  averageLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  averageValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  gradeItem: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  gradeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gradeTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  typeIcon: {
    marginRight: 10,
  },
  gradeDescription: {
    fontSize: 16,
    fontWeight: '500',
  },
  gradeDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  gradeValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  feedbackContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  feedback: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
});
