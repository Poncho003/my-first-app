import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function StudentScreenEdit() {
    const navigation = useNavigation();
    const route = useRoute();
    const { student } = route.params;

    // Estados inicializados con datos del estudiante
    const [name, setName] = useState(student.name);
    const [age, setAge] = useState(String(student.age));

    const editarEstudiante = async () => {
        if (!name || !age) {
            Alert.alert("Campos incompletos", "Llena todos los campos.");
            return;
        } try {
            const ref = doc(db, "students", student.firestoreId);
            await updateDoc(ref, {
                name,
                age: Number(age)
            });
            Alert.alert(
                "Actualizado",
                "El estudiante fue actualizado correctamente.",
                [{ text: "OK", onPress: () => navigation.goBack() }]
            );
        } catch (error) {
            console.log("Error actualizando estudiante:", error);
            Alert.alert("Error", "No se pudo actualizar al estudiante.");
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>
                Editar estudiante
            </Text>

            <TextInput
                placeholder="Nombre completo"
                value={name}
                onChangeText={setName}
                style={{
                    borderWidth: 1,
                    marginBottom: 10,
                    padding: 10,
                    borderRadius: 8
                }}
            />

            <TextInput
                placeholder="Edad"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
                style={{
                    borderWidth: 1,
                    marginBottom: 20,
                    padding: 10,
                    borderRadius: 8
                }}
            />

            <TouchableOpacity
                onPress={editarEstudiante}
                style={{
                    backgroundColor: "green",
                    padding: 15,
                    borderRadius: 10
                }}
            >
                <Text
                    style={{
                        color: "white",
                        fontWeight: "bold",
                        textAlign: "center"
                    }}
                >
                    Guardar Cambios
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
