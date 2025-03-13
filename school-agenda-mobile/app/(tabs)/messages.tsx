import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList, Image } from 'react-native';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'teacher' | 'student' | 'parent' | 'admin';
  recipientId: string;
  recipientName: string;
  subject: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export default function MessagesScreen() {
  const [messages] = useState<Message[]>([
    {
      id: '1',
      senderId: 'teacher1',
      senderName: 'Prof. Maria Silva',
      senderRole: 'teacher',
      recipientId: 'parent1',
      recipientName: 'João Santos',
      subject: 'Reunião de Pais',
      content: 'Prezado responsável, gostaria de agendar uma reunião para discutir o desempenho do aluno.',
      timestamp: new Date().toISOString(),
      read: false,
    },
    {
      id: '2',
      senderId: 'admin1',
      senderName: 'Coordenação',
      senderRole: 'admin',
      recipientId: 'all',
      recipientName: 'Todos',
      subject: 'Comunicado Importante',
      content: 'Informamos que na próxima semana haverá uma palestra sobre orientação profissional.',
      timestamp: new Date(Date.now() - 86400000).toISOString(), // Yesterday
      read: true,
    },
  ]);

  const renderMessage = ({ item: message }: { item: Message }) => (
    <TouchableOpacity
      style={[
        styles.messageItem,
        !message.read && styles.messageItemUnread,
      ]}
      onPress={() => {/* Handle message press */}}
    >
      <View style={styles.messageHeader}>
        <View style={styles.senderInfo}>
          <View style={styles.avatarContainer}>
            <FontAwesome 
              name={message.senderRole === 'admin' ? 'building' : 'user'} 
              size={24} 
              color={Colors.light.tint}
            />
          </View>
          <View>
            <ThemedText style={styles.senderName}>{message.senderName}</ThemedText>
            <ThemedText style={styles.timestamp}>
              {new Date(message.timestamp).toLocaleDateString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </ThemedText>
          </View>
        </View>
        {!message.read && <View style={styles.unreadDot} />}
      </View>

      <ThemedText style={styles.subject}>{message.subject}</ThemedText>
      <ThemedText 
        style={styles.content}
        numberOfLines={2}
      >
        {message.content}
      </ThemedText>

      <View style={styles.messageFooter}>
        <View style={styles.recipientContainer}>
          <FontAwesome name="user" size={12} color="#666" />
          <ThemedText style={styles.recipientName}>
            Para: {message.recipientName}
          </ThemedText>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={message => message.id}
        contentContainerStyle={styles.listContent}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {/* Handle new message */}}
      >
        <FontAwesome name="pencil" size={24} color="#fff" />
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
  messageItem: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  messageItemUnread: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.light.tint,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  senderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  senderName: {
    fontSize: 16,
    fontWeight: '500',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.light.tint,
  },
  subject: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  content: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  recipientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recipientName: {
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
