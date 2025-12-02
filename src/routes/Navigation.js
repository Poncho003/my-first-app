import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStaticNavigation } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import TaskListScreen from "../screens/TaskListScreen";
import ListStudentScreen from "../screens/ListStudentScreen";
import ListStudentTaskScreen from "../screens/ListStudentTaskScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RegisterScreen from "../screens/RegistroScreen";
import AddStudentToCourseScreen from "../screens/AddStudentToCourseScreen";
import CreateCourseScreen from "../screens/CreateCourseScreen";
import StudentScreen from "../screens/StudentScreen";
import StudentScreenEdit from "../screens/StudentScreenEdit";
import StudentScreenCreate from "../screens/StudentScreenCreate";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from '@expo/vector-icons/Ionicons';
// Test Git Poncho
const StudentsStack = createNativeStackNavigator({
    screens: {
        StudentsList: {
            screen: StudentScreen,
            options: {
                headerShown: false
            }
        },
        StudentCreate: {
            screen: StudentScreenCreate,
            options: {
                headerShown: true,
                title: "Nuevo Estudiante"
            }
        },
        StudentEdit: {
            screen: StudentScreenEdit,
            options: {
                headerShown: true,
                title: "Editar Estudiante"
            }
        }
    }
});

const HomeStack = createNativeStackNavigator({
    screens: {
        Home: {
            screen: HomeScreen,
            options: { headerShown: false }
        },
        ListStudent: {
            screen: ListStudentScreen,
            options: { headerShown: false },
            params: { course: undefined }
        },
        Profile: {
            screen: ProfileScreen,
            options: { headerShown: false },
            params: { user: undefined }
        },
        CreateCourse: {
            screen: CreateCourseScreen,
            options: { headerShown: true, title: "Nuevo Curso" }
        },
        AddStudentToCourse: {
            screen: AddStudentToCourseScreen,
            options: { headerShown: true, title: "Agregar estudiante" }
        },
        Student: {
            screen: StudentsStack,
            options: { headerShown: false }
        }
    }
});

const TaskStack = createNativeStackNavigator({
    screens: {
        TaskListMain: {
            screen: TaskListScreen,
            options: { headerShown: false }
        },
        ListStudentTask: {
            screen: ListStudentTaskScreen,
            options: { headerShown: false }
        }
    }
});

/*const StudentStack = createNativeStackNavigator({
    screens: {
        Student: {
            screen: StudentScreen,
            options: { headerShown: false }
        },
        StudentScreenCreate: {
            screen: StudentScreenCreate,
            options: {
                headerShown: true,
                title: "Nuevo estudiante"
            }
        }
    }
});*/

const MyTabs = createBottomTabNavigator({
    screenOptions: ({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'HomeTab') {
                iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Student') {
                iconName = focused ? 'people' : 'people-outline';
            } else if (route.name === 'Profile') {
                iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
        }
    }),

    screens: {
        HomeTab: {
            screen: HomeStack,
            options: { headerShown: false }
        },
        Student: {
            screen: StudentsStack,
            options: { headerShown: false }
        },
        Profile: {
            screen: ProfileScreen,
            options: { headerShown: false }
        }
    }
});


const RootStack = createNativeStackNavigator({
    initialRouteName: 'Login',
    screens: {
        Login: {
            screen: LoginScreen,
            options: { headerShown: false }
        },
        Register: {
            screen: RegisterScreen,
            options: { headerShown: false }
        },
        Home: {
            screen: MyTabs,
            options: { headerShown: false }
        }
    }
});

const Navigation = createStaticNavigation(RootStack);
export default Navigation;