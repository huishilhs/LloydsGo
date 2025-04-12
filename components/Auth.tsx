import React, { useState } from 'react'
import { Alert, StyleSheet, View, AppState, Text } from 'react-native'
import { supabase } from '../lib/supabase'
import { Button, Input } from '@rneui/themed'
import globalStyles from '../assets/styles/global'
import { color } from '@rneui/themed/dist/config'
import CTextInput from './CTextInput'

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
                <View style={styles.headingContainer}>
                    <Text style={styles.header}>Login here</Text>
                    <Text style={styles.subheader}>Welcome back you’ve been missed!</Text>
                </View>
                <View style={styles.inputContainer}>
                    <CTextInput
                        style={globalStyles.textInput}
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                        placeholder="Email"
                        autoCapitalize={'none'} />
                    
                    <CTextInput 
                        style={globalStyles.textInput}
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        placeholder="Password"
                        autoCapitalize={'none'}
                        secureTextEntry={true}
                        />
                </View>
            </View>
            
            <View style={[styles.buttonWrapper, styles.mt20]}>
                <Button color={"#18B67C"} title="Sign in" disabled={loading} onPress={() => signInWithEmail()} />
            </View>
            <View style={styles.buttonWrapper}>
                <Button color={"#18B67C"}  title="Sign up" disabled={loading} onPress={() => signUpWithEmail()} />
            </View>
        </View>
    )
} 

const styles = StyleSheet.create({
    container: {
        paddingTop: "25%",
        display: 'flex',
        flex: 1,
        paddingHorizontal: "7%",
        backgroundColor: '#F3F3F3',
    },
    headingContainer: {
        height: "40%",
        width: "75%",
        marginHorizontal: "auto",
    },
    inputContainer: {
        marginTop: "10%",
    },
    buttonWrapper: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: 'stretch',
        borderRadius: 10,
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
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 25,
        marginBottom: 20,
    },
})