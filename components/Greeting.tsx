import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
    username: string;
    avatarUrl: string;
};

const Greeting = ({ username, avatarUrl }: Props) => {

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 18) return 'Good afternoon';
        return 'Good evening';
    };

    return (
        <View style={styles.container}>
            {/* Profile picture */}
            <Image
                source={avatarUrl ? { uri: avatarUrl } : require('../assets/images/default_avatar.jpg')}
                style={styles.avatar}
            />
            {/* Greeting and user name */}
            <View style={styles.textContainer}>
                <Text style={styles.greetingText}>{getGreeting()}</Text>
                <Text style={styles.usernameText}>{username}</Text>
            </View>

            {/* Icons on the Right Side */}
            <View style={styles.iconsContainer}>
                <TouchableOpacity onPress={() => console.log('Search pressed')}>
                    <Ionicons name="search" size={24} color="#333" style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log('Bell pressed')}>
                    <Ionicons name="notifications" size={24} color="#333" style={styles.icon} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: 'rgba(240, 240, 240, 0.7)',
        borderRadius: 40,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
    },
    textContainer: {
        flexDirection: 'column',
    },
    greetingText: {
        fontSize: 18,
        color: '#333',
    },
    usernameText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 4,
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: "center",
        marginLeft: 'auto',
    },
    icon: {
        marginLeft: 16,
    },
});

export default Greeting;