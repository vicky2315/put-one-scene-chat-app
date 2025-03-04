import { ActivityIndicator, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();
export default function Index() {
    const [fontLoaded, error] = useFonts({
        "Geist-Regular": require("../assets/fonts/Geist-Regular.ttf"),
        "SpaceMono-Regular": require("../assets/fonts/SpaceMono-Regular.ttf"),
    });

    useEffect(() => {
        if (fontLoaded || error) {
            SplashScreen.hideAsync();
            console.log(fontLoaded);
        }
    }, [fontLoaded, error]);

    if (!fontLoaded && !error) {
        return null;
    }
    if (!fontLoaded) {
        return <ActivityIndicator />;
    }
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#D7EC39",
            }}
        >
            <Text style={styles.titleFontOne}>Put1Scene</Text>
            <Text style={styles.titleFontTwo}>Put1Scene</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
    },
    bigBlue: {
        color: "blue",
        fontWeight: "bold",
        fontSize: 30,
    },
    red: {
        color: "red",
    },
    titleFontOne: {
        color: "black",
        fontWeight: "bold",
        fontSize: 40,
        fontFamily: "Geist-Regular",
    },
    titleFontTwo: {
        color: "black",
        fontWeight: "bold",
        fontSize: 40,
        fontFamily: "SpaceMono-Regular",
    },
});
