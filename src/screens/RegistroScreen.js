import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ToastAndroid } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from "../../FirebaseConfig";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function RegisterScreen() {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [rol, setRol] = useState("");
    const [departamento, setDepartamento] = useState("");
    const navigation = useNavigation();

    const registrarUsuario = async () => {
        if (!nombre || !email || !pass || !rol || !departamento) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        try {
            // console.log("Iniciando registro");

            const cred = await createUserWithEmailAndPassword(auth, email, pass);
            /*console.log("Usuario creado en Auth", cred.user.uid);
            console.log("Guardando Firestore...");
            const uid = cred.user.uid;
            console.log("Guardando Firestore...");*/
            const uid = cred.user.uid;

            await setDoc(doc(db, "users", uid), {
                id_simple: Date.now(),
                nombre,
                email,
                rol,
                departamento,
                activo: true,
                fecha_registro: new Date().toISOString().split("T")[0]
            });

            // console.log("Datos guardados en Firestore");

            alert("Cuenta creada");
            navigation.navigate("Login");


        } catch (error) {
            console.log(error);

            let mensaje = "Ocurrió un error al registrar.";

            switch (error.code) {
                case "auth/invalid-email":
                    mensaje = "El correo no es válido.";
                    break;
                case "auth/email-already-in-use":
                    mensaje = "Este correo ya está registrado.";
                    break;
                case "auth/weak-password":
                    mensaje = "La contraseña debe tener al menos 6 caracteres.";
                    break;
                case "auth/missing-email":
                    mensaje = "Debes escribir un correo.";
                    break;
                case "auth/missing-password":
                    mensaje = "Debes escribir una contraseña.";
                    break;
                default:
                    mensaje = "Error: " + error.message;
                    break;
            }

            ToastAndroid.show(mensaje);
        }
    };

    return (
        <View style={styles.container}>

            <View style={styles.logoContainer}>
                <Image
                    source={require('../../assets/adidas_logo.png')}
                    style={styles.image}
                />
            </View>

            <View style={styles.formContainer}>
                <Text style={styles.title}>Crear Cuenta</Text>

                {/* NOMBRE */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nombre</Text>
                    <View style={styles.inputWithIcon}>
                        <Image source={require('../../assets/user_logo.png')} style={styles.icon} />
                        <TextInput
                            onChangeText={setNombre}
                            value={nombre}
                            placeholder="Nombre completo"
                            placeholderTextColor="#999"
                            style={styles.textInput}
                        />
                    </View>
                </View>

                {/* EMAIL */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email</Text>
                    <View style={styles.inputWithIcon}>
                        <Image source={require('../../assets/user_logo.png')} style={styles.icon} />
                        <TextInput
                            onChangeText={setEmail}
                            value={email}
                            placeholder="Correo electrónico"
                            placeholderTextColor="#999"
                            style={styles.textInput}
                        />
                    </View>
                </View>

                {/* PASS */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Contraseña</Text>
                    <View style={styles.inputWithIcon}>
                        <Image source={require('../../assets/password_logo.png')} style={styles.icon} />
                        <TextInput
                            onChangeText={setPass}
                            value={pass}
                            placeholder="Contraseña"
                            secureTextEntry={true}
                            placeholderTextColor="#999"
                            style={styles.textInput}
                        />
                    </View>
                </View>

                {/* ROL */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Rol</Text>
                    <View style={styles.inputWithIcon}>
                        <Image source={require('../../assets/user_logo.png')} style={styles.icon} />
                        <TextInput
                            onChangeText={setRol}
                            value={rol}
                            placeholder="Ej: Administrador"
                            placeholderTextColor="#999"
                            style={styles.textInput}
                        />
                    </View>
                </View>

                {/* DEPARTAMENTO */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Departamento</Text>
                    <View style={styles.inputWithIcon}>
                        <Image source={require('../../assets/user_logo.png')} style={styles.icon} />
                        <TextInput
                            onChangeText={setDepartamento}
                            value={departamento}
                            placeholder="Ej: TI, Ventas..."
                            placeholderTextColor="#999"
                            style={styles.textInput}
                        />
                    </View>
                </View>

                {/* BOTÓN */}
                <TouchableOpacity style={styles.button} onPress={registrarUsuario}>
                    <Text style={styles.buttonText}>Registrar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.registerText}>
                        ¿Ya tienes cuenta? <Text style={styles.registerLink}>Inicia sesión</Text>
                    </Text>
                </TouchableOpacity>

            </View>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    logoContainer: {
        marginBottom: 40,
        alignItems: 'center',
    },
    image: {
        width: 160,
        height: 110,
        resizeMode: 'contain',
    },
    formContainer: {
        width: '100%',
        backgroundColor: '#f8f9fa',
        padding: 25,
        borderRadius: 15,
        elevation: 5,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        marginBottom: 8,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginLeft: 5,
        marginBottom: 8,
    },
    inputWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 15,
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    textInput: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 16,
        color: '#333',
    },
    button: {
        backgroundColor: '#2f8415',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    registerText: {
        marginTop: 15,
        textAlign: 'center',
        fontSize: 15,
        color: '#555',
    },
    registerLink: {
        fontWeight: 'bold',
        color: '#2f8415',
    }
});
