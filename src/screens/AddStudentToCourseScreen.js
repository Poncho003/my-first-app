import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import { useNavigation } from '@react-navigation/native';

export default function AddStudentToCourseScreen({ route }) {
    const { course } = route.params;
    const navigation = useNavigation();
    const [allStudents, setAllStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const query = await getDocs(collection(db, "students"));
                const students = query.docs.map(doc => ({
                    id: doc.id, ...doc.data()
                }));
                setAllStudents(students);

            } catch (error) {
                console.log("Error cargando estudiantes:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    const agregarMatricula = async (student) => {
        try {
            await addDoc(collection(db, "matriculas"), {
                studentId: student.id,
                courseId: course.id,
                date: new Date().toISOString().split("T")[0],
                id: Math.floor(Math.random() * 99999)
            });

            navigation.goBack();

        } catch (error) {
            console.log("Error asignando estudiante:", error);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingWrapper}>
                <Text>Cargando estudiantes...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Agregar estudiante a {course.title}</Text>

            <FlatList
                data={allStudents}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.studentItem}
                        onPress={() => agregarMatricula(item)}
                    >
                        <Text style={styles.studentName}>{item.name}</Text>
                        <Text style={styles.studentAge}>{item.age} años</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20
    },
    studentItem: {
        padding: 15,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        marginBottom: 10
    },
    studentName: {
        fontSize: 18,
        fontWeight: "500"
    },
    studentAge: {
        fontSize: 14,
        color: "#555"
    },
    loadingWrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});
