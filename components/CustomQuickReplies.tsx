// CustomQuickReplies.tsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

interface QuickReplyItem {
  title: string;
  value: string;
}

interface QuickRepliesBarProps {
  quickReplies: QuickReplyItem[];
  onQuickReply: (selected: QuickReplyItem[]) => void;
}

const CustomQuickReplies: React.FC<QuickRepliesBarProps> = ({
  quickReplies,
  onQuickReply,
}) => {
  return (
    <View style={styles.container}>
      {quickReplies.map((reply, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => onQuickReply([reply])}
        >
          <Text style={styles.buttonText}>{reply.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#eee',
    borderRadius: 20,
  },
  buttonText: {
    color: '#007AFF',
    fontSize: 14,
  },
});

export default CustomQuickReplies;
