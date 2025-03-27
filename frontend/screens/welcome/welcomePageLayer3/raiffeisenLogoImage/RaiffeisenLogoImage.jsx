import welcomePageRaiffeisenLogo from "../../../../assets/logoRaiffeisen.png";
import { Image, View, StyleSheet } from "react-native";

export default function RaiffeisenLogoImage() {
    return (
        <View style={styles.wlcPageRaiffeisenLogo}>
            <Image source={welcomePageRaiffeisenLogo} style={styles.image} />
        </View>
    );
}

const styles = StyleSheet.create({
    wlcPageRaiffeisenLogo: {
        position: 'absolute',
        width: 450, 
        top: -60,
        left: -340,
        transform: [{ scale: 0.1 }],
    },
    image: {
        width: '145%',
    },
});
