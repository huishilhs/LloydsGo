import { TextInput as Input } from "react-native"
import globalStyles from "../assets/styles/global"
import { InputProps } from "@rneui/themed"
import { useState } from "react"

type CTextInputProps = {
    style?: object,
    onChangeText?: (text: string) => void,
    onFocus?: () => void,
    onBlur?: () => void,
    value?: string,
    placeholder?: string,
    secureTextEntry?: boolean,
    autoCapitalize?: InputProps['autoCapitalize']
}

export default function CTextInput({style, onChangeText, onFocus, onBlur, value, placeholder, secureTextEntry, autoCapitalize = 'none'}: CTextInputProps) {
	// Custom focus behaviour
    const [isFocused, setIsFocused] = useState(false)

  	return (
		<Input
			style={[globalStyles.textInput, style, isFocused && globalStyles.textInputFocused]}
			onChangeText={onChangeText}
            onFocus={() => {
                setIsFocused(true);
                onFocus && onFocus();
            }}
            onBlur={() => {
                setIsFocused(false);
                onBlur && onBlur();
            }}
			value={value}
			placeholder={placeholder}
			placeholderTextColor="gray"
            secureTextEntry={secureTextEntry}
			autoCapitalize={autoCapitalize}
            underlineColorAndroid="transparent" // ← this is important on Android
            />
  )
}