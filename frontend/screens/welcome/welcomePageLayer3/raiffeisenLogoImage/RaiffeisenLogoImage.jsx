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
        width: '5%', // Dimensiunea containerului
        top: '45%',
        left: '40%',
    },
    image: {
        width: '100%', // Imaginea va ocupa 100% din container
        height: 'auto', // React Native gestionează automat înălțimea imaginii
    },
});
