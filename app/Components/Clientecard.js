import { FlatList, ScrollView, TouchableHighlight, StyleSheet, View } from "react-native";
import { Card, Button, Text } from 'react-native-paper';
export const TarjetaCliente = (props) => {

    let ItemClient = ({ prod, indice }) => {
        return (
            <TouchableHighlight onPress={() => {
                props.navegar.navigate("ModProdNav", { titulo: prod.title, precio: prod.price, categoria: prod.Category, id: prod.id })
            }}>
                <Card>

                    <Card.Title title={prod.name} subtitle={prod.cedula} />
                    <Card.Content>
                        {/* <Text variant="titleLarge">{prod.title}</Text> */}
                        <Text variant="bodyMedium">{prod.correo}</Text>
                    </Card.Content>

                </Card>
            </TouchableHighlight>

        );
    }








    return <FlatList
        data={props.clientes}
        renderItem={(e) => {

            return (
                <View style={styles.container}>
                    <ScrollView >
                        <ItemClient
                            indice={e.index}
                            prod={e.item}
                        />
                    </ ScrollView >

                </View>


            )
        }}
        keyExtractor={(item) => { return item.id }}

    />


}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#ffff',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        flexDirection: "row",
        padding: 20,
        // backgroundColor: "gray"
    },
    caja: {
        backgroundColor: "red",
        borderWidth: 3,
        height: 100,
        width: 100,
        margin: 20
    },
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 20,
    }
    ,
    text: {
        fontSize: 42,
    }
});