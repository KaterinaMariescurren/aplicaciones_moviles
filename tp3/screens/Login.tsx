import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FIREBASE_AUTH } from "../FireBaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { View,StyleSheet, TextInput, ActivityIndicator, Button, KeyboardAvoidingView, Alert } from "react-native";
import { RootStackParamList } from "../types";
import { useNavigation } from "@react-navigation/native";

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;
    const navigation = useNavigation<LoginScreenNavigationProp>(); // Tipado de navigation


    // Validación del formato de email
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Validación de longitud de contraseña
    const validatePassword = (password: string | any[]) => {
        return password.length >= 6;  // Ejemplo: mínimo 6 caracteres
    };

    const signIn = async () => {
        if (!validateEmail(email)) {
            Alert.alert("Error", "Por favor ingresa un email válido.");
            return;
        }
        if (!validatePassword(password)) {
            Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
            navigation.navigate("HabitList");  // Redirecciona a la lista de hábitos si es exitoso
        } catch (error: any) {
            console.log(error);
            Alert.alert("Error", "Error al iniciar sesión: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const signUp = async () => {
        if (!validateEmail(email)) {
            Alert.alert("Error", "Por favor ingresa un email válido.");
            return;
        }
        if (!validatePassword(password)) {
            Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            Alert.alert("Registro exitoso", "Por favor verifica tu correo electrónico para confirmar la cuenta.");
        } catch (error: any) {
            console.log(error);
            Alert.alert("Error", "Error al registrar: " + error.message);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior="padding">
                <TextInput 
                    value={email} 
                    style={styles.input} 
                    placeholder="Email" 
                    autoCapitalize="none" 
                    onChangeText={(text)=>setEmail(text)}
                >
                </TextInput>
                <TextInput 
                    secureTextEntry={true}
                    value={password} 
                    style={styles.input} 
                    placeholder="Password" 
                    autoCapitalize="none" 
                    onChangeText={(text)=>setPassword(text)}
                >
                </TextInput>
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff"/>
                ) : (
                    <>
                        <Button title="Login" onPress={()=> signIn()} />
                        <Button title="Create account" onPress={()=> signUp()} />
                    </>
                )}
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginHorizontal:20,
        justifyContent:'center'
    },
    input:{
        marginVertical: 4,
        height: 50,
        borderWidth:1,
        borderRadius:4,
        padding:10,
        backgroundColor:'#fff'
    }
})

export default Login;