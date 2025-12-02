import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import { useNavigation } from "@react-navigation/native";

export default function StudentScreenCreate() {
    const navigation = useNavigation();
    const [name, setName] = useState("");
    const [age, setAge] = useState("");

    const guardarEstudiante = async () => {
        if (!name || !age) {
            Alert.alert("Campos incompletos", "Llena todos los campos.");
            return;
        }

        try {
            const querySnapshot = await getDocs(collection(db, "students"));
            let lastId = 0;

            querySnapshot.forEach(doc => {
                const data = doc.data();
                if (data.id && data.id > lastId) lastId = data.id;
            });

            const newId = lastId + 1;

            await addDoc(collection(db, "students"), {
                id: newId,
                name,
                age: Number(age)
            });

            Alert.alert(
                "Estudiante creado",
                "El estudiante se registró correctamente.",
                [{ text: "OK", onPress: () => navigation.goBack() }]
            );

        } catch (error) {
            console.log("Error guardando estudiante:", error);
            Alert.alert("Error", "No se pudo guardar el estudiante.");
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Nuevo estudiante</Text>

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
                onPress={guardarEstudiante}
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
                    Guardar Estudiante
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
