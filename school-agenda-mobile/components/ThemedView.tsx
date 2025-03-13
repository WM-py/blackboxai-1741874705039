import React from 'react';
import { View, ViewProps } from 'react-native';
import { useColorScheme } from '../hooks/useColorScheme';
import Colors from '../constants/Colors';

export const ThemedView: React.FC<ViewProps> = ({ style, ...props }) => {
  const colorScheme = useColorScheme();

  return (
    <View
      style={[
        {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
        },
        style,
      ]}
      {...props}
    />
  );
};
