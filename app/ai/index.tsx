import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { GiftedChat, Bubble, Send, IMessage } from 'react-native-gifted-chat';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // if you use expo-router
import Greeting from '@/components/Greeting';


// Define a type for quick reply items
interface QuickReplyItem {
  title: string;
  value: string;
}

const AiPage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [conversationContext, setConversationContext] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const YOUR_DEEPSEEK_API_KEY = 'sk-51629bef4f0b4967ae9853a705032361'

  // Initialize the chat with a welcome message
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: `Hello! I'm your personal finance coach. I can help you with investments, spending insights, and saving strategies. What would you like to do today?`,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'LloydsGo Bot',
          avatar: require('../../assets/images/robot_icon.png'),
        },
        quickReplies: {
          type: 'radio',
          values: [
            { title: 'Invest', value: 'stocks' },
            { title: 'Spending Insights', value: 'spending_overview' },
            { title: 'Saving Course', value: 'save_money' },
            { title: 'Budgeting Help', value: 'budget' },
          ],
        },
      },
    ]);
  }, []);

  // Function to get a dynamic response from OpenAI's API
  const getAIResponse = async (message: string, context: string): Promise<string> => {
    try {
      const requestBody = {
        model: 'deepseek-chat', // Must match what Deepseek expects/returns
        messages: [
          {
            role: "system",
            content:
              "You are a personal finance coach that provides brief and clear responses. Keep your answers short and to the point.",
          },
          {
            role: "user",
            content: `${context}\n${message}`,
          },
        ],
        max_tokens: 40,
      };
  
      // Replace the endpoint URL with Deepseek's answer endpoint
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Replace YOUR_DEEPSEEK_API_KEY with your actual Deepseek API key (or load it securely)
          'Authorization': `Bearer ${YOUR_DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Deepseek API error ${response.status}: ${errorText}`);
        return "I'm having trouble generating a response right now. Please try again later.";
      }
  
      const data = await response.json();
      console.log("Parsed Deepseek response data:", data); // Log the parsed JSON
  
      // Check that the data has the expected structure:
      if (
        data.choices &&
        Array.isArray(data.choices) &&
        data.choices.length > 0 &&
        data.choices[0].message &&
        data.choices[0].message.content
      ) {
        return data.choices[0].message.content.trim();
      } else {
        console.error("Deepseek response missing expected fields:", data);
        return "I'm having trouble generating a response right now. Please try again later.";
      }
    } catch (error) {
      console.error("Error calling Deepseek API:", error);
      return "I'm sorry, something went wrong while generating a response.";
    }
  };
  
  
  

  // Handle sending messages from the user
  const onSend = useCallback((newMessages: IMessage[] = []) => {
    const userMessage = newMessages[0];
    setMessages(prev => GiftedChat.append(prev, newMessages));
    // Update conversation context
    setConversationContext(prev => prev + `\nUser: ${userMessage.text}`);
    // Get AI response using OpenAI's API
    handleAIResponse(userMessage.text);
  }, [conversationContext]);

  const handleAIResponse = async (userInput: string) => {
    setIsTyping(true);
    const aiResponse = await getAIResponse(userInput, conversationContext);
    setIsTyping(false);

    setConversationContext(prev => prev + `\nBot: ${aiResponse}`);

    const botMessage: IMessage = {
      _id: Math.random(),
      text: aiResponse,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'LloydsGo Bot',
        avatar: require('../../assets/images/robot_icon.png'),
      },
    };
    setMessages(prev => GiftedChat.append(prev, [botMessage]));

    // Optionally, navigate based on keywords in the user input
    if (userInput.toLowerCase().includes('invest')) {
      router.push('/invest');
    } else if (userInput.toLowerCase().includes('save')) {
      router.push('/rewards');
    } else if (userInput.toLowerCase().includes('spending')) {
      router.push('/home/spending-insights');
    }
  };

  // Handle quick reply selection
  const handleQuickReply = useCallback((quickReplies: QuickReplyItem[]) => {
    const { title, value } = quickReplies[0];
    const userMessage: IMessage = {
      _id: Math.random(),
      text: title,
      createdAt: new Date(),
      user: { _id: 1, name: 'Matthew.W' },
    };
    setMessages(prev => GiftedChat.append(prev, [userMessage]));
    setConversationContext(prev => prev + `\nUser: ${title}`);
    handleAIResponse(title);
  }, [conversationContext]);

  // Customize chat bubble appearance
  const renderBubble = (props: any) => (
    <Bubble
      {...props}
      wrapperStyle={{
        left: { backgroundColor: '#f2f2f2', marginBottom: 5 },
        right: { backgroundColor: '#EAFFF2', marginBottom: 5 },
      }}
      textStyle={{
        left: { color: '#000' },
        right: { color: '#000' },
      }}
    />
  );

  // Customize the send button
  const renderSend = (props: any) => (
    <Send {...props}>
      <View style={styles.sendButtonContainer}>
        <Ionicons name="send" size={20} color="#007AFF" />
      </View>
    </Send>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Greeting username="John" avatarUrl=""/>
      <View style={styles.chatContainer}>
        <GiftedChat
          messages={messages}
          onSend={msgs => onSend(msgs)}
          user={{ _id: 1, name: 'You' }}
          renderBubble={renderBubble}
          renderSend={renderSend}
          onQuickReply={handleQuickReply}
          isTyping={isTyping}
          showAvatarForEveryMessage={true}
          messagesContainerStyle={{
            flexGrow: 1,
            justifyContent: 'flex-start',
            backgroundColor: '#FFF',
          }}
          placeholder="Type your message..."
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFEF',
  },
  chatContainer: {
    flex: 1,
    margin: 16,
    backgroundColor: '#FFF',
    borderRadius: 8,
    overflow: 'hidden',
  },
  sendButtonContainer: {
    marginRight: 10,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AiPage;
