import { FlatList, ScrollView, TouchableHighlight, StyleSheet, View, Text } from "react-native";

export const TarjetaProducto = (props) => {








    let ItemProduct = ({ prod, indice }) => {

        return (

            <TouchableHighlight onPress={() => {
            }}>
                <View style={styles.caja}>
                    <Text>{prod.title}</Text>
                </View>
            </TouchableHighlight>

        );
    }








    return <FlatList
        data={props.productos}
        renderItem={(e) => {

            return (
                <View style={styles.container}>
                    <ScrollView >
                        <ItemProduct
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
        flexDirection: "row"
    },
    caja: {
        // backgroundColor: "red",
        borderWidth:3,
        margin:23
    }
});
