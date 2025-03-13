# School Agenda Mobile App

A comprehensive mobile application for managing school-related activities, built with React Native and Expo.

## Features

- **Authentication System**
  - Login and registration for students, teachers, parents, and administrators
  - Secure authentication using Firebase
  - Role-based access control

- **Calendar**
  - View and manage school events
  - Different event types (classes, exams, assignments, meetings)
  - Color-coded events for better visualization
  - Event details and descriptions

- **Tasks**
  - Track homework and assignments
  - Mark tasks as completed
  - Due date reminders
  - Subject and class organization

- **Messages**
  - Communication between teachers, students, and parents
  - Inbox system with read/unread status
  - Message history and threading
  - Direct messaging and announcements

- **Attendance**
  - Track student attendance
  - View attendance history
  - Justification for absences
  - Statistics and summaries

- **Grades**
  - View academic performance
  - Detailed grade breakdown by subject
  - Progress tracking
  - Teacher feedback

## Technology Stack

- React Native
- Expo
- TypeScript
- Firebase Authentication
- Cloud Firestore
- React Native Navigation
- React Native Calendars

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure Firebase:
   - Create a Firebase project
   - Add your Firebase configuration to `src/config/firebase.ts`
   - Enable Authentication and Firestore in Firebase Console

3. Start the development server:
   ```bash
   npx expo start
   ```

## Project Structure

```
school-agenda-mobile/
├── app/
│   ├── (auth)/
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── calendar.tsx
│   │   ├── tasks.tsx
│   │   ├── messages.tsx
│   │   ├── attendance.tsx
│   │   └── grades.tsx
│   └── _layout.tsx
├── src/
│   ├── config/
│   │   └── firebase.ts
│   ├── contexts/
│   │   └── UserContext.tsx
│   └── types/
│       └── calendar.ts
├── components/
│   ├── ThemedView.tsx
│   └── ThemedText.tsx
├── constants/
│   └── Colors.ts
├── hooks/
│   └── useColorScheme.ts
└── assets/
    └── images/
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
