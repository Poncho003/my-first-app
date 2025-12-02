import { useContext } from "react";
import { View, Text } from "react-native";
import { AuthContext } from "../routes/AuthContext";

export default function ProfileScreen() {
    const { user } = useContext(AuthContext);

    console.log("USER:", user);

    if (!user) return <Text>Cargando usuario...</Text>;

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 20 }}>Nombre: {user.nombre}</Text>
            <Text style={{ fontSize: 16 }}>Email: {user.email}</Text>
        </View>
    );
}
