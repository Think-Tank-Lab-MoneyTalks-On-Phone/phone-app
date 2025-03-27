import welcomePageCsUBBLogo from "../../../../assets/logoCSUBB.png";
import { Image, View, StyleSheet } from "react-native";

export default function CsUBBLogoImage() {
    return (
        <View style={styles.wlcPageCsUbbLogo}>
            <Image source={welcomePageCsUBBLogo} style={styles.image} />
        </View>
    );
}

const styles = StyleSheet.create({
    wlcPageCsUbbLogo: {
        position: 'absolute',
        width: '5%', // Dimensiunea containerului
        top: '45%',
        left: '56.5%',
    },
    image: {
        width: '100%', // Imaginea va ocupa 100% din container
        height: 'auto', // React Native gestionează automat înălțimea imaginii
    },
});
