import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { useState, useContext } from 'react';
import { AuthContext } from "../routes/AuthContext";
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../FirebaseConfig";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigation = useNavigation();
  const { setUser } = useContext(AuthContext);
  const [showPass, setShowPass] = useState(false);

  /*async function conectUsers() {
    const response = await fetch('http://10.168.141.94:8080/users');
    const data = await response.json();
    return data;
  }*/

  const validarAcceso = async () => {
    if (email === "" || pass === "") {
      alert("Por favor, complete todos los campos.");
      return;
    }

    try {
      // Login con Firebase Auth
      const cred = await signInWithEmailAndPassword(auth, email, pass);
      const uid = cred.user.uid;

      // Obtener los datos extra desde Firestore
      const ref = doc(db, "users", uid);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        alert("Tu cuenta existe en Auth pero no en Firestore.");
        return;
      }
      const perfil = snap.data();
      // Login correcto
      // Guardar en AuthContext
      setUser(perfil);
      // Redirigir a Home en la navegacion
      navigation.navigate("Home");

    } catch (error) {
      console.log(error);
      let msg = "Error al iniciar sesión.";
      switch (error.code) {
        case "auth/invalid-email":
          msg = "Correo inválido.";
          break;
        case "auth/user-not-found":
          msg = "Usuario no encontrado.";
          break;
        case "auth/wrong-password":
          msg = "Contraseña incorrecta.";
          break;
      }
      alert(msg);
    }
  };


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>

          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/adidas_logo.png')}
              style={styles.image}
            />
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.title}>Iniciar Sesión</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputWithIcon}>
                <Image
                  source={require('../../assets/user_logo.png')}
                  style={styles.icon}
                />
                <TextInput
                  onChangeText={(txt) => setEmail(txt)}
                  value={email}
                  placeholder='Ingresa tu email'
                  placeholderTextColor="#999"
                  style={styles.textInput}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Contraseña</Text>

              <View style={styles.inputWithIcon}>
                <Image
                  source={require('../../assets/password_logo.png')}
                  style={styles.icon}
                />

                <TextInput
                  onChangeText={(txt) => setPass(txt)}
                  value={pass}
                  placeholder='Ingresa tu contraseña'
                  placeholderTextColor="#999"
                  secureTextEntry={!showPass}
                  style={[styles.textInput, { paddingRight: 40 }]}
                />

                <TouchableOpacity
                  onPress={() => setShowPass(!showPass)}
                  style={{ position: "absolute", right: 10, top: 10 }}
                >
                  <Image
                    source={
                      showPass
                        ? require("../../assets/view.png")
                        : require("../../assets/hide.png")
                    }
                    style={{ width: 24, height: 24, opacity: 0.7 }}
                  />
                </TouchableOpacity>
              </View>
            </View>


            <TouchableOpacity style={styles.button} onPress={validarAcceso}>
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.registerText}>
                ¿No tienes cuenta? <Text style={styles.registerLink}>Regístrate aquí</Text>
              </Text>
            </TouchableOpacity>

          </View>

          <StatusBar style="auto" />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  registerText: {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 15,
    color: '#555',
  },
  registerLink: {
    fontWeight: 'bold',
    color: '#2f8415'
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
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
    marginBottom: 8,
    marginLeft: 5,
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
    shadowColor: '#2f8415',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  }
});