import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, FlatList } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function HomeScreen({ route }) {
    const user = route?.params?.user;
    const [cursos, setCursos] = useState([]);
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            /*const fetchData = async () => {
                const response = await fetch('http://10.168.141.94:8080/cursos');
                const data = await response.json();
                //console.log(data);
                setCursos(data);
            };
            fetchData();*/
            const fetchCursos = async () => {
                try {
                    const querySnapshot = await getDocs(collection(db, "cursos"));

                    const cursosFirebase = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));

                    setCursos(cursosFirebase);

                } catch (error) {
                    console.log("Error al cargar cursos:", error);
                }
            };

            fetchCursos();

        }, [])
    );

    const cursoItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('HomeTab', {
                screen: 'ListStudent',
                params: { course: item }
            })}>
            <View style={styles.itemContainer}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={require('../../assets/adidas_logo.png')}
                    style={styles.image}
                />
                {
                    cursos.length === 0 ? null :
                        <FlatList
                            data={cursos}
                            renderItem={({ item }) => (cursoItem({ item }))}
                            keyExtractor={item => item.id}
                        />
                }
            </View>
            <TouchableOpacity
                style={styles.fab}
                onPress={() =>
                    navigation.navigate('HomeTab', {
                        screen: 'CreateCourse'
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
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    logoContainer: {
        marginBottom: 40,
        alignItems: 'center',
        width: '100%',
    },
    image: {
        width: 160,
        height: 110,
        resizeMode: 'contain',
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    flatListContent: {
        paddingBottom: 20,
        width: '100%',
    },
    itemContainer: {
        backgroundColor: '#ffffff',
        padding: 20,
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
        transform: [{ scale: 1 }],
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
    homeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
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
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e1e1e1',
        paddingHorizontal: 15,
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
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#2f8415',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 6,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    }
});