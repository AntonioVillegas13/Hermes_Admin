
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
//import { Home } from './app/screens/HomeScreen'
//import { Pedidos } from './app/screens/PedidosScreen';
import { loadConfiguration } from './app/utils/FirebaseConfig';
import { LoginForm } from './app/screens/LoginScreen/LoginScreen';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from 'react';
import { Registrar } from './app/screens/LoginScreen/RegistrarUsuario';
import { ReseteoForm } from './app/screens/LoginScreen/ReseteoCorreoScreen';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from '@rneui/base';
import{AdminPedidos} from './app/screens/AdministradorScreen/AdminPedidosScreen'
import{Productos} from './app/screens/AdministradorScreen/Productos'
import theme from './app/theme/theme';

const Stack = createNativeStackNavigator();
const LoginStack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();



const Administrador=()=>{
return <Tab.Navigator screenOptions={({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    if (route.name === 'TabProductosAdmin') {
      iconName ="pencil-square-o"
    } else if (route.name === 'TabPedidosAdmin') {
      iconName = "shopping-cart";
    }

    // You can return any component that you like here!
    return <Icon name={iconName} size={size} color={color} type='font-awesome' />;
  },
  tabBarActiveTintColor: theme.colors.morado,
  tabBarInactiveTintColor: 'gray',
   tabBarStyle: {
        // position: 'absolute',
        backgroundColor: "#FBFBFF",
        height: 60,
      },
       tabBarHideOnKeyboard: true,
      headerShown: false,
      // tabBarShowLabel: false,
})} 


>
    <Tab.Screen
      name="TabPedidosAdmin"
      component={AdminPedidos}
      options={{
        title: "PedidosAdminstrador"
        
      }}
    />
    <Tab.Screen
      name="TabProductosAdmin"
      component={Productos}
      options={{
        title: "PedidosAdminstrador"
        
      }}
    />



</Tab.Navigator>



}





const LoginNav = () => {
  return <LoginStack.Navigator>


    <LoginStack.Screen
      name="LoginNav"
      options={{
        headerShown: false
      }}
      component={LoginForm} />
    <LoginStack.Screen
      name="RegistrarNav"
      options={{
        headerShown: false
      }}
      component={Registrar} />

    <LoginStack.Screen
      name="ReseteoNav"
      options={{
        headerShown: false
      }}
      component={ReseteoForm} />



  </LoginStack.Navigator>
}



export default function App() {
  const PedidosData = {
    productos: []
  }
  const [Login, setlogin] = useState(false);
  const registarObserver = () => {
    const auth = getAuth();
    if (!global.DesSuscribirObserver) {
      global.DesSuscribirObserver = onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User

          const uid = user.uid;
          console.log("Observer Cambia !!!!a sing in1")
          setlogin(true);
          console.log("L,", Login)
          // ...
        } else {
          // User is signed out
          // ...
          console.log("Observer Cambia !!!!a sing out")
          setlogin(false);
        }
      });
    }
  }

  loadConfiguration();
  registarObserver();



  return (


    <NavigationContainer>
      {Login ? <Administrador /> : <Administrador />} 
      {/* //Administrador ClientesTab */}
    </NavigationContainer>

  );
}