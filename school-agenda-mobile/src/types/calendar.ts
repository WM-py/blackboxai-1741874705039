export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate?: string;
  type: EventType;
  createdBy: string;
  createdAt: string;
  class?: string;
  subject?: string;
  location?: string;
  attendees?: string[];
}

export type EventType = 
  | 'class'       // Regular class
  | 'exam'        // Tests and exams
  | 'assignment'  // Homework and assignments
  | 'meeting'     // Parent-teacher meetings
  | 'event'       // School events
  | 'holiday'     // School holidays
  | 'other';      // Other events

export interface CalendarFilter {
  type?: EventType[];
  class?: string;
  subject?: string;
  startDate?: string;
  endDate?: string;
}

export interface CalendarViewMode {
  type: 'month' | 'week' | 'day' | 'agenda';
  date: string;
}

export interface EventFormData {
  title: string;
  description?: string;
  startDate: string;
  endDate?: string;
  type: EventType;
  class?: string;
  subject?: string;
  location?: string;
  attendees?: string[];
}
