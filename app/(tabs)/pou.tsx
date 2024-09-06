import { router } from "expo-router";
import { Text, View, StyleSheet, Button } from "react-native";

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    text: {
        color: "orange",
    }
})

const pou = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Tela do Pou
            </Text>

            <Button 
                title="Go back"
                onPress={() => {
                    router.back();
                }}
            />
        
        </View>
    );
}

export default pou;