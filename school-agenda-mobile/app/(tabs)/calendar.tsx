import React, { useState, useCallback } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Calendar as RNCalendar, DateData } from 'react-native-calendars';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';
import { FontAwesome } from '@expo/vector-icons';
import { useColorScheme } from '../../hooks/useColorScheme';
import Colors from '../../constants/Colors';
import { CalendarEvent, CalendarViewMode, EventType } from '../../src/types/calendar';

const eventTypeColors: Record<EventType, string> = {
  class: '#4CAF50',      // Green
  exam: '#F44336',       // Red
  assignment: '#2196F3', // Blue
  meeting: '#9C27B0',    // Purple
  event: '#FF9800',      // Orange
  holiday: '#795548',    // Brown
  other: '#607D8B',      // Blue Grey
};

export default function CalendarScreen() {
  const colorScheme = useColorScheme();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewMode, setViewMode] = useState<CalendarViewMode>({
    type: 'month',
    date: selectedDate,
  });
  const [events] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Prova de Matemática',
      description: 'Avaliação do segundo bimestre',
      startDate: '2024-03-15',
      type: 'exam',
      createdBy: 'teacher1',
      createdAt: new Date().toISOString(),
      subject: 'Matemática',
      class: '9º Ano A',
    },
    {
      id: '2',
      title: 'Reunião de Pais',
      description: 'Reunião geral com os responsáveis',
      startDate: '2024-03-20',
      type: 'meeting',
      createdBy: 'admin1',
      createdAt: new Date().toISOString(),
      location: 'Auditório',
    },
  ]);

  const getMarkedDates = useCallback(() => {
    const marked: {
      [date: string]: {
        dots?: Array<{ color: string }>;
        selected?: boolean;
      };
    } = {};

    events.forEach(event => {
      if (marked[event.startDate]) {
        marked[event.startDate].dots?.push({
          color: eventTypeColors[event.type],
        });
      } else {
        marked[event.startDate] = {
          dots: [{
            color: eventTypeColors[event.type],
          }],
        };
      }
    });

    // Mark selected date
    if (marked[selectedDate]) {
      marked[selectedDate].selected = true;
    } else {
      marked[selectedDate] = {
        selected: true,
        dots: [],
      };
    }

    return marked;
  }, [events, selectedDate]);

  const getDayEvents = useCallback((date: string) => {
    return events.filter(event => event.startDate === date);
  }, [events]);

  const renderEventItem = (event: CalendarEvent) => (
    <TouchableOpacity
      key={event.id}
      style={[
        styles.eventItem,
        { borderLeftColor: eventTypeColors[event.type] },
      ]}
      onPress={() => {/* Handle event press */}}
    >
      <View style={styles.eventHeader}>
        <ThemedText style={styles.eventTitle}>{event.title}</ThemedText>
        <ThemedText style={styles.eventTime}>
          {new Date(event.startDate).toLocaleDateString('pt-BR')}
        </ThemedText>
      </View>
      {event.description && (
        <ThemedText style={styles.eventDescription}>{event.description}</ThemedText>
      )}
      {(event.class || event.subject) && (
        <View style={styles.eventMeta}>
          {event.class && (
            <View style={styles.metaItem}>
              <FontAwesome name="users" size={12} color="#666" />
              <ThemedText style={styles.metaText}>{event.class}</ThemedText>
            </View>
          )}
          {event.subject && (
            <View style={styles.metaItem}>
              <FontAwesome name="book" size={12} color="#666" />
              <ThemedText style={styles.metaText}>{event.subject}</ThemedText>
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <RNCalendar
        style={styles.calendar}
        theme={{
          backgroundColor: Colors[colorScheme].background,
          calendarBackground: Colors[colorScheme].background,
          textSectionTitleColor: Colors[colorScheme].text,
          selectedDayBackgroundColor: Colors[colorScheme].tint,
          selectedDayTextColor: '#ffffff',
          todayTextColor: Colors[colorScheme].tint,
          dayTextColor: Colors[colorScheme].text,
          textDisabledColor: '#666666',
          dotColor: Colors[colorScheme].tint,
          monthTextColor: Colors[colorScheme].text,
          arrowColor: Colors[colorScheme].tint,
        }}
        markedDates={getMarkedDates()}
        onDayPress={(day: DateData) => setSelectedDate(day.dateString)}
        markingType="multi-dot"
      />

      <View style={styles.eventsContainer}>
        <ThemedText style={styles.eventsTitle}>
          Eventos do dia {new Date(selectedDate).toLocaleDateString('pt-BR')}
        </ThemedText>
        {getDayEvents(selectedDate).map(renderEventItem)}
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {/* Handle add event */}}
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
  calendar: {
    marginBottom: 10,
  },
  eventsContainer: {
    flex: 1,
    padding: 15,
  },
  eventsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  eventItem: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 4,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  eventTime: {
    fontSize: 12,
    color: '#666',
  },
  eventDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  eventMeta: {
    flexDirection: 'row',
    marginTop: 5,
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
