import React, { useState } from 'react'
import { Alert, StyleSheet, View, AppState, Text, TextInput } from 'react-native'
import { supabase } from '../lib/supabase'
import { Button, Input } from '@rneui/themed'
import { color } from '@rneui/themed/dist/config'

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
    if (state === 'active') {
        supabase.auth.startAutoRefresh()
    } else {
        supabase.auth.stopAutoRefresh()
    }
})

export default function Auth() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    async function signInWithEmail() {
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (error) Alert.alert(error.message)
        setLoading(false)
    }

    async function signUpWithEmail() {
        setLoading(true)
        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        if (error) Alert.alert(error.message)
        if (!session) Alert.alert('Please check your inbox for email verification!')
        setLoading(false)
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.header}>Login here</Text>
                <Text style={styles.subheader}>Welcome back you’ve been missed!</Text>
                    <TextInput
                        style={styles.inputBox}
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                        placeholder="Email"
                        placeholderTextColor="gray"
                        autoCapitalize={'none'} />
                    
                    <TextInput 
                        style={styles.inputBox}
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        placeholder="Password"
                        placeholderTextColor="gray"
                        autoCapitalize={'none'}
                        secureTextEntry={true}
                        
                        />
            </View>
            
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Button title="Sign in" disabled={loading} onPress={() => signInWithEmail()} />
            </View>
            <View style={styles.verticallySpaced}>
                <Button title="Sign up" disabled={loading} onPress={() => signUpWithEmail()} />
            </View>
        </View>
    )
} 

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        padding: 12,
    },
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: 'stretch',
    },
    mt20: {
        marginTop: 20,
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#18B67C'
    },
    subheader: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    inputBox: {
        borderWidth: 1,
        margin: 20,
        padding: 15,
        borderRadius: 10,
    },
})