
import { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, TouchableHighlight, ScrollView } from "react-native"
import { Card, Text, TextInput } from 'react-native-paper';
import theme from '../../theme/theme'
import { Button, Icon } from '@rneui/base';
import { AddProduct } from "../../Services/ProductosSrv";
import uuid from 'react-native-uuid';
import * as ImagePicker from 'expo-image-picker';
import { SubirFoto, SubirIamgen } from "../../Services/ImagesSrv";
export function AddProd({ route, navigation }) {
    const [tituloaux, setTitulo] = useState("");
    const [precioaux, setPrecio] = useState("");
    const [categoriaaux, setCategoria] = useState("");
    const [Peso, setPeso] = useState("");
    const [iamgeBase64, setImageBase64] = useState("");
    const [Idaux, setId] = useState(uuid.v4());
    const [Url, setUrl]=useState("")



    const pickImages = async () => {
        let resultado = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            selectionLimit: 1,
            aspect: [4, 3],
            quality: 1,
            // base64:true

        })
        let aim = resultado.assets
        console.log("Imagen Uri:", resultado.assets[0].uri)
        await setImageBase64(resultado.assets[0].uri)
        await  SubirFoto(resultado.assets[0].uri,Idaux,setUrl);
      
    }






    const AñadirProducto = () => {
        // SubirIamgen();
        console.log("NUEVO URL",Url)
        AddProduct({
            id: Idaux,
            price: precioaux,
            Category: categoriaaux,
            title: tituloaux,
            weigth: Peso,
            uri: iamgeBase64,
            url:Url


        });
    }



    return <View style={styles.container}>
        <Card>
            {iamgeBase64 ? <Card.Cover source={{ uri: iamgeBase64 }} /> : <Card.Cover source={{ uri: "https://firebasestorage.googleapis.com/v0/b/prueba13112022.appspot.com/o/image13e8340c-b35c-43c5-bad4-0bd4b162bf06.jpg?alt=media&token=e0bbd549-adea-498f-827f-83e7266098e7" }} />}

            <Card.Title title={tituloaux} subtitle={categoriaaux} />
            <Card.Content>
                {/* <Text variant="titleLarge">{prod.title}</Text> */}
                <Text variant="bodyMedium">{precioaux}</Text>

            </Card.Content>
        </Card>

        <TextInput
            label="Codigo"
            value={Idaux}
            onChangeText={setId}
            mode="outlined"
            keyboardType="numeric"

        />

        <TextInput
            label="Nombre"
            value={tituloaux}
            onChangeText={setTitulo}
            mode="outlined"
            keyboardType="email-address"

        />


        <TextInput
            label="Precio"
            value={precioaux}
            onChangeText={setPrecio}
            mode="outlined"
            keyboardType="numeric"


        />

        <TextInput
            label="Categoria"
            value={categoriaaux}
            onChangeText={setCategoria}
            mode="outlined"
            keyboardType="email-address"


        />
        <TextInput
            label="Peso"
            value={Peso}
            onChangeText={setPeso}
            mode="outlined"
            keyboardType="numeric"


        />

        <View style={styles.cajaBotones}>
            <Button
                title='Agregar Producto'
                onPress={() => {
                    AñadirProducto();
                    navigation.goBack();
                }}
                buttonStyle={{ borderRadius: 10, backgroundColor: theme.colors.jade, alignSelf: "auto" }}
                containerStyle={{
                    width: 200,
                    paddingTop: 40
                }}
            />

            <Button
                title='Agregar Imagen'
                onPress={() => {
                    pickImages();
                }}
                buttonStyle={{ borderRadius: 10, backgroundColor: theme.colors.jade, alignSelf: "auto" }}
                containerStyle={{
                    width: 200,
                    paddingTop: 40
                }}
            />
        </View>
    </View>

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff',
        alignItems: 'stretch',
        justifyContent: 'center',
        padding: 10,
        // backgroundColor: "gray"
    },
    cajaBotones: {
        paddingBottom: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 4
    }

});
