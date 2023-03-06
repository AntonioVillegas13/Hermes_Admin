
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
import { AdminPedidos } from './app/screens/AdministradorScreen/AdminPedidosScreen'
import { Productos } from './app/screens/AdministradorScreen/Productos'
import { ModProd } from './app/screens/AdministradorScreen/ModProd';
import { AddProd } from './app/screens/AdministradorScreen/AgregarProductoScreen';
import { Clientes } from './app/screens/AdministradorScreen/Clients';
import { RegistrarNuevo } from './app/screens/AdministradorScreen/RegistrarUsuarioNuevo';
import theme from './app/theme/theme';
import { DetallePedido } from './app/screens/AdministradorScreen/DetallePedido';
import { PedidoContext } from './app/context/PedidosContext';
import { ListaPedidosNoProcesados } from './app/screens/TiposPedidoScreen/PedidosNoProcesadosScreen';
import { ListaPedidosProcesados } from './app/screens/TiposPedidoScreen/PedidosProcesadosScreen';
import { DetallePedidoNopProcesado } from './app/screens/AdministradorScreen/DetallePedidoaNoProcesado';
import { doc, getDoc } from "firebase/firestore";
const StackMoProd = createNativeStackNavigator();
const LoginStack = createNativeStackNavigator();
const StackClient = createNativeStackNavigator();
const StackerPedidos = createNativeStackNavigator();

const Tab = createBottomTabNavigator();



const Administrador = () => {
  return <Tab.Navigator screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === 'TabProductosAdmin') {
        iconName = "shopping-cart"
      } else if (route.name === 'TabPedidosAdmin') {
        iconName = "list-alt";
      } else if (route.name === 'Clientes') {
        iconName = "users";
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
      component={StackPedidos}
      options={{
        headerShown: false,
        title: "Pedidos"

      }}
    />
    <Tab.Screen
      name="TabProductosAdmin"
      component={ModProducto}
      options={{
        title: "Productos"

      }}
    />
    <Tab.Screen
      name="Clientes"
      component={ClientesTAB}
      options={{
        title: "Clientes",
        headerShown: false,
      }}
    />




  </Tab.Navigator>



}

const StackPedidos = () => {
  return <StackerPedidos.Navigator>
    <StackerPedidos.Screen
      name="StackPedidos"
      component={AdminPedidos}
      options={{
        headerShown: false,
        title: "Pedidos"
      }}
    />
    <StackerPedidos.Screen
      name="StackDetalle"
      component={DetallePedido}
      options={{
        headerShown: false,
        title: "DetallePedidos"
      }}
    />
    <StackerPedidos.Screen
      name="StackDetalleNopProcesado"
      component={DetallePedidoNopProcesado}
      options={{
        headerShown: false,
        title: "DetallePedidos"
      }}
    />


    <StackerPedidos.Screen
      name="ListaPedidosProcesados"
      component={ListaPedidosProcesados}
      options={{
        title: "Pedidos",

      }}
    />
    <StackerPedidos.Screen
      name="ListaPedidosNoProcesados"
      component={ListaPedidosNoProcesados}
      options={{
        title: "Pedidos",

      }}
    />

  </StackerPedidos.Navigator>
}

const ClientesTAB = () => {
  return <StackClient.Navigator>
    <StackClient.Screen
      name="Clientes"
      component={Clientes}
      options={{
        title: "Clientes",
        headerShown: false,
      }}
    />
    <StackClient.Screen
      name="RegistrarNav"
      options={{
        headerShown: false
      }}
      component={RegistrarNuevo} />



  </ StackClient.Navigator>

}


const ModProducto = () => {

  return <StackMoProd.Navigator>

    <StackMoProd.Screen
      name="TabProductosAdmin"
      component={Productos}
      options={{
        title: "PedidosAdminstrador",
        headerShown: false,
      }}
    />

    <StackMoProd.Screen
      name="ModProdNav"
      options={{
        headerShown: false
      }}
      component={ModProd} />

    <StackMoProd.Screen
      name="AddProdNav"
      options={{
        headerShown: false
      }}
      component={AddProd} />



  </StackMoProd.Navigator>
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

const verficarFire = async (fnSetLogin,id) => {

  const docRef = doc(global.dbCon, "Administradores",id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    fnSetLogin(true);
    console.log("Document data:", docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }

}

export default function App() {
  const PedidosData = {

    productos: []
  }


  const [Login, setlogin] = useState(false);

  const [user, setUser] = useState();

  const registarObserver = () => {
    const auth = getAuth();
    if (!global.DesSuscribirObserver) {
      global.DesSuscribirObserver = onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User

          const uid = user.uid;
          console.log("Observer Cambia !!!!a sing in1")
          verficarFire(setlogin,uid);
          
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

    <PedidoContext.Provider value={{ user, setUser }} >

      <NavigationContainer>
        <StatusBar style={{
          flex: 1,
          backgroundColor: '#62CBDE',
          alignItems: 'center',
          justifyContent: 'center',
        }} />
        {Login ? <Administrador /> : <LoginNav />}
        {/* //Administrador ClientesTab */}
      </NavigationContainer>
    </PedidoContext.Provider>

  );
}
