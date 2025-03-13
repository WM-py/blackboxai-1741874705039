import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  subject?: string;
  class?: string;
  completed: boolean;
  createdBy: string;
  createdAt: string;
}

export default function TasksScreen() {
  const [tasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Trabalho de História',
      description: 'Pesquisa sobre a Revolução Industrial',
      dueDate: '2024-03-20',
      subject: 'História',
      class: '9º Ano A',
      completed: false,
      createdBy: 'teacher1',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Exercícios de Matemática',
      description: 'Páginas 45-47 do livro',
      dueDate: '2024-03-18',
      subject: 'Matemática',
      class: '9º Ano A',
      completed: true,
      createdBy: 'teacher2',
      createdAt: new Date().toISOString(),
    },
  ]);

  const renderTask = ({ item: task }: { item: Task }) => (
    <TouchableOpacity
      style={[
        styles.taskItem,
        task.completed && styles.taskItemCompleted,
      ]}
      onPress={() => {/* Handle task press */}}
    >
      <View style={styles.taskHeader}>
        <View style={styles.taskTitleContainer}>
          <TouchableOpacity
            style={[
              styles.checkbox,
              task.completed && styles.checkboxChecked,
            ]}
            onPress={() => {/* Handle completion toggle */}}
          >
            {task.completed && (
              <FontAwesome name="check" size={14} color="#fff" />
            )}
          </TouchableOpacity>
          <ThemedText
            style={[
              styles.taskTitle,
              task.completed && styles.taskTitleCompleted,
            ]}
          >
            {task.title}
          </ThemedText>
        </View>
        <ThemedText style={styles.dueDate}>
          {new Date(task.dueDate).toLocaleDateString('pt-BR')}
        </ThemedText>
      </View>

      {task.description && (
        <ThemedText
          style={[
            styles.taskDescription,
            task.completed && styles.taskDescriptionCompleted,
          ]}
        >
          {task.description}
        </ThemedText>
      )}

      {(task.subject || task.class) && (
        <View style={styles.taskMeta}>
          {task.subject && (
            <View style={styles.metaItem}>
              <FontAwesome name="book" size={12} color="#666" />
              <ThemedText style={styles.metaText}>{task.subject}</ThemedText>
            </View>
          )}
          {task.class && (
            <View style={styles.metaItem}>
              <FontAwesome name="users" size={12} color="#666" />
              <ThemedText style={styles.metaText}>{task.class}</ThemedText>
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={task => task.id}
        contentContainerStyle={styles.listContent}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {/* Handle add task */}}
      >
        <FontAwesome name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 15,
  },
  taskItem: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  taskItemCompleted: {
    opacity: 0.7,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  taskTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.light.tint,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: Colors.light.tint,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#666',
  },
  dueDate: {
    fontSize: 12,
    color: '#666',
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  taskDescriptionCompleted: {
    textDecorationLine: 'line-through',
  },
  taskMeta: {
    flexDirection: 'row',
    marginTop: 10,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  metaText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.light.tint,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
