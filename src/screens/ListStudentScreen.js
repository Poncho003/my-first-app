import { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ListItem, Button } from '@rneui/themed';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function ListStudentScreen({ route }) {
    const { course } = route.params;
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const fetchData = async () => {
        try {
            const qSt = await getDocs(collection(db, "students"));
            const allStudents = qSt.docs.map(doc => ({
                firestoreId: doc.id,
                ...doc.data()
            }));

            const qMat = await getDocs(collection(db, "matriculas"));
            const allMatriculas = qMat.docs.map(doc => ({
                id: doc.id, ...doc.data()
            }));

            const matriculasCurso = allMatriculas.filter(
                m => `${m.courseId}` === `${course.id}`
            );

            const studentsFound = allStudents.filter(st =>
                matriculasCurso.some(m => m.studentId === st.id)
            );

            setStudents(studentsFound);
        } catch (error) {
            console.log("Error cargando estudiantes:", error);
        } finally {
            setLoading(false);
        }
    };
    useFocusEffect(
        useCallback(() => {
            setLoading(true);
            fetchData();
        }, [])
    );
    const eliminarEstudiante = async (student) => {
        Alert.alert(
            "Eliminar estudiante",
            `¿Seguro que deseas quitar a ${student.name} del curso?`,
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const qMat = await getDocs(collection(db, "matriculas"));
                            const allMat = qMat.docs.map(doc => ({
                                docId: doc.id,
                                ...doc.data()
                            }));
                            const matricula = allMat.find(
                                m => m.studentId === student.id && m.courseId === course.id
                            );
                            if (!matricula) return;
                            await deleteDoc(doc(db, "matriculas", matricula.docId));
                            await fetchData();
                        } catch (error) {
                            console.log("Error eliminando matrícula:", error);
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
        <View style={styles.container}>
            <Text style={styles.title}>{course.title}</Text>

            {students.length === 0 ? (
                <Text>No hay estudiantes matriculados</Text>
            ) : (
                students?.map(student => (
                    <ListItem.Swipeable
                        key={student.id}
                        leftWidth={80}
                        rightWidth={90}
                        minSlideWidth={40}
                        leftContent={() => (
                            <View style={{
                                flex: 1,
                                backgroundColor: '#fa3b3b',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Button
                                    icon={{
                                        name: 'delete',
                                        type: 'antdesign',
                                        size: 24,
                                        color: 'white',
                                    }}
                                    buttonStyle={{ backgroundColor: 'transparent' }}
                                    onPress={() => eliminarEstudiante(student)}
                                />
                            </View>
                        )}
                    >
                        <ListItem.Content>
                            <ListItem.Title>{student.name}</ListItem.Title>
                            <ListItem.Subtitle>{student.age + " años"}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem.Swipeable>
                ))
            )}

            <TouchableOpacity
                style={styles.fab}
                onPress={() =>
                    navigation.navigate('HomeTab', {
                        screen: 'AddStudentToCourse',
                        params: { course }
                    })
                }
            >
                <Text style={styles.fabPlus}>+</Text>
            </TouchableOpacity>

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        marginBottom: 30,
    },
    flatListContent: {
        paddingBottom: 20,
    },
    itemContainer: {
        backgroundColor: '#ffffff',
        padding: 20,
        width: '100%',
        borderRadius: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: 8,
        letterSpacing: -0.3,
    },
    itemDescription: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        fontWeight: '400',
    },
    noStudentsText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 50,
    },
    loadingWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff', // opcional pero se ve más limpio
    },
    loadingText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#333',
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
        elevation: 6
    },
    fabPlus: {
        fontSize: 32,
        color: 'white',
        fontWeight: 'bold',
        top: -2
    }
});