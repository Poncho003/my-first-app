import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Icon } from '@rneui/themed';
import { StyleSheet, Text } from 'react-native';
import { ListItem, Button } from '@rneui/themed';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function ListStudentTaskScreen({ route }) {
    const { task } = route.params;
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const responseStudents = await fetch('http://10.168.141.94:8080/students');
            const allStudents = await responseStudents.json();

            const responseMatriculas = await fetch('http://10.168.141.94:8080/matriculas');
            const allMatriculas = await responseMatriculas.json();

            // 1) buscar la matrícula de la tarea
            const match = allMatriculas.find(m => m.id == task.matricula);

            if (!match) {
                setStudents([]);
                return;
            }

            // 2) buscar el estudiante de esa matrícula
            const student = allStudents.find(s => s.id == match.studentId);

            // 3) lo guardamos (si existe)
            setStudents(student ? [student] : []);
        };

        fetchData();
    }, []);


    return (
        <View style={styles.container}>
            <Text style={styles.title}>{task.nombre}</Text>

            {
                students.length === 0 ?
                    <Text style={styles.noStudentsText}>No hay estudiantes asignados</Text> :
                    students.map(student =>
                        <ListItem.Swipeable
                            key={student.id}
                            leftWidth={80}
                            rightWidth={90}
                            minSlideWith={40}
                            backgroundColor='#fa3b3bff'
                        >
                            <ListItem.Content>
                                <ListItem.Title>{student.name}</ListItem.Title>
                                <ListItem.Subtitle>{student.age + ' años'}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem.Swipeable>
                    )
            }
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
    }
});