import { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ListItem, Button } from '@rneui/themed';
import { SafeAreaView } from "react-native-safe-area-context";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function StudentScreen() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const fetchStudents = async () => {
        try {
            const snap = await getDocs(collection(db, "students"));
            const data = snap.docs.map(doc => ({
                firestoreId: doc.id,
                ...doc.data()
            }));

            setStudents(data);
        } catch (error) {
            console.log("Error cargando estudiantes:", error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            setLoading(true);
            fetchStudents();
        }, [])
    );

    const eliminarEstudiante = (student) => {
        Alert.alert(
            "Eliminar estudiante",
            `¿Seguro que deseas eliminar a ${student.name}?`,
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            console.log("Borrando estudiante:", students);
                            await deleteDoc(doc(db, "students", student.firestoreId));
                            fetchStudents();
                        } catch (error) {
                            console.log("Error al eliminar:", error);
                        }
                    }
                }
            ]
        );
    };

    if (loading) {
        return (
            <View style={styles.loadingWrapper}>
                <Text style={styles.loadingText}>Cargando...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={styles.container}>
                <Text style={styles.title}>Estudiantes</Text>

                {students.length === 0 ? (
                    <Text>No hay estudiantes registrados</Text>
                ) : (
                    students.map(student => (
                        <ListItem.Swipeable
                            key={student.id}
                            leftWidth={80}
                            rightWidth={90}
                            minSlideWidth={40}
                            leftContent={() => (
                                <View
                                    style={{
                                        flex: 1,
                                        backgroundColor: '#fa3b3b',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Button
                                        icon={{
                                            name: 'delete',
                                            type: 'antdesign',
                                            size: 24,
                                            color: 'white',
                                        }}
                                        buttonStyle={{ backgroundColor: 'transparent' }}
                                        onPress={() => {
                                            console.log("Presionaste delete de:", student);
                                            eliminarEstudiante(student);
                                        }}
                                    />

                                </View>
                            )}
                            rightContent={() => (
                                <View style={{
                                    flex: 1,
                                    backgroundColor: '#fabd3bff',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Button
                                        icon={{
                                            name: 'edit',
                                            type: 'antdesign',
                                            size: 24,
                                            color: 'white',
                                        }}
                                        buttonStyle={{ backgroundColor: 'transparent' }}
                                        onPress={() =>
                                            navigation.navigate("StudentEdit", { student })
                                        }
                                    />
                                </View>
                            )}
                        >
                            <ListItem.Content>
                                <ListItem.Title>{student.name}</ListItem.Title>
                                <ListItem.Subtitle>{student.age} años</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem.Swipeable>
                    ))
                )}
                <TouchableOpacity
                    style={styles.fab}
                    onPress={() => navigation.navigate("StudentCreate")}
                >
                    <Text style={styles.fabPlus}>+</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: "center"
    },
    loadingWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingText: {
        fontSize: 18
    },
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fabPlus: {
        fontSize: 32,
        color: 'white',
        fontWeight: 'bold',
        top: -2
    }
});