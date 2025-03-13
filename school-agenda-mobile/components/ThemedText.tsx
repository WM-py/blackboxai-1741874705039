import React from 'react';
import { Text, TextProps } from 'react-native';
import { useColorScheme } from '../hooks/useColorScheme';
import Colors from '../constants/Colors';

export const ThemedText: React.FC<TextProps> = ({ style, ...props }) => {
  const colorScheme = useColorScheme();

  return (
    <Text
      style={[
        {
          color: Colors[colorScheme ?? 'light'].text,
        },
        style,
      ]}
      {...props}
    />
  );
};
