import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    textInput: {
        padding: 15,
        borderWidth: 1,
        borderColor: '#F3F6FF',
        borderRadius: 10,
        outline: 'none',
        backgroundColor: '#F3F6FF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3, // ← for Android
    },
    textInputFocused: {
        borderColor: '#18B67C',
        borderWidth: 1,
    }
})

export default styles;