import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import { useNavigation } from '@react-navigation/native';

export default function CreateCourseScreen() {
    const navigation = useNavigation();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [hora, setHora] = useState("");
    const [instructor, setInstructor] = useState("");

    const guardarCurso = async () => {
        if (!title || !description || !hora || !instructor) return;

        try {
            const querySnapshot = await getDocs(collection(db, "cursos"));

            let lastId = 0;
            querySnapshot.forEach(doc => {
                const data = doc.data();
                if (data.id && data.id > lastId) lastId = data.id;
            });

            const newId = lastId + 1;

            await addDoc(collection(db, "cursos"), {
                id: newId,
                title,
                description,
                hora,
                instructor
            });

            Alert.alert(
                "Curso creado",
                "El curso se ha guardado correctamente.",
                [
                    {
                        text: "OK",
                        onPress: () =>
                            navigation.navigate("HomeTab", { screen: "Home" })
                    }
                ]
            );

        } catch (error) {
            console.log("Error al guardar:", error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Título"
                value={title}
                onChangeText={setTitle}
                style={styles.input}
            />
            <TextInput
                placeholder="Descripción"
                value={description}
                onChangeText={setDescription}
                style={styles.input}
            />
            <TextInput
                placeholder="Horario"
                value={hora}
                onChangeText={setHora}
                style={styles.input}
            />
            <TextInput
                placeholder="Instructor"
                value={instructor}
                onChangeText={setInstructor}
                style={styles.input}
            />

            <TouchableOpacity onPress={guardarCurso} style={styles.btn}>
                <Text style={styles.btnText}>Guardar curso</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 10
    },
    btn: {
        backgroundColor: "green",
        padding: 15,
        borderRadius: 8
    },
    btnText: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold"
    }
});
