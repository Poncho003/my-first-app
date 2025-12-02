import { StyleSheet, Text, View } from 'react-native';
import { useContext } from "react";
import { AuthContext } from "../routes/AuthContext";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function ProfileScreen() {
    const { user } = useContext(AuthContext);
    console.log("USER:", user);

    if (!user) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 18 }}>Cargando...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <FontAwesome
                    name="user-circle"
                    size={90}
                    color="#58c7ffff"
                    style={styles.avatar}
                />
                <Text style={styles.userName}>{user.nombre}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
            </View>

            <View style={styles.settingsSection}>
                <Text style={styles.sectionTitle}>Información Personal</Text>

                <View style={styles.settingItem}>
                    <View style={styles.settingLeft}>
                        <FontAwesome name="user" size={20} color="#58c7ffff" style={styles.settingIcon} />
                        <Text style={styles.settingLabel}>Nombre completo</Text>
                    </View>
                    <Text style={styles.settingValue}>{user.nombre}</Text>
                </View>

                <View style={styles.settingItem}>
                    <View style={styles.settingLeft}>
                        <FontAwesome name="envelope" size={20} color="#58c7ffff" style={styles.settingIcon} />
                        <Text style={styles.settingLabel}>Email</Text>
                    </View>
                    <Text style={styles.settingValue}>{user.email}</Text>
                </View>

                <View style={styles.settingItem}>
                    <View style={styles.settingLeft}>
                        <FontAwesome name="shield" size={20} color="#58c7ffff" style={styles.settingIcon} />
                        <Text style={styles.settingLabel}>Rol</Text>
                    </View>
                    <Text style={styles.settingValue}>{user.rol}</Text>
                </View>

                <View style={styles.settingItem}>
                    <View style={styles.settingLeft}>
                        <FontAwesome name="calendar" size={20} color="#58c7ffff" style={styles.settingIcon} />
                        <Text style={styles.settingLabel}>Fecha de registro</Text>
                    </View>
                    <Text style={styles.settingValue}>{user.fecha_registro}</Text>
                </View>

                <View style={styles.settingItem}>
                    <View style={styles.settingLeft}>
                        <FontAwesome name="building" size={20} color="#58c7ffff" style={styles.settingIcon} />
                        <Text style={styles.settingLabel}>Departamento</Text>
                    </View>
                    <Text style={styles.settingValue}>{user.departamento}</Text>
                </View>
            </View>

            <View style={styles.settingsSection}>
                <Text style={styles.sectionTitle}>Configuración</Text>

                <View style={styles.settingItem}>
                    <View style={styles.settingLeft}>
                        <FontAwesome name="bell" size={20} color="#58c7ffff" style={styles.settingIcon} />
                        <Text style={styles.settingLabel}>Notificaciones</Text>
                    </View>
                    <FontAwesome name="chevron-right" size={16} color="#666" />
                </View>

                <View style={styles.settingItem}>
                    <View style={styles.settingLeft}>
                        <FontAwesome name="lock" size={20} color="#58c7ffff" style={styles.settingIcon} />
                        <Text style={styles.settingLabel}>Privacidad</Text>
                    </View>
                    <FontAwesome name="chevron-right" size={16} color="#666" />
                </View>

                <View style={styles.settingItem}>
                    <View style={styles.settingLeft}>
                        <FontAwesome name="question-circle" size={20} color="#58c7ffff" style={styles.settingIcon} />
                        <Text style={styles.settingLabel}>Ayuda y Soporte</Text>
                    </View>
                    <FontAwesome name="chevron-right" size={16} color="#666" />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
    },
    header: {
        alignItems: 'center',
        paddingVertical: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        marginBottom: 20,
    },
    avatar: {
        marginBottom: 15,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 5,
    },
    userEmail: {
        fontSize: 16,
        color: '#666',
    },
    settingsSection: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 12,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    settingIcon: {
        marginRight: 15,
        width: 24,
    },
    settingLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    settingValue: {
        fontSize: 16,
        color: '#666',
        fontWeight: '400',
    },
});