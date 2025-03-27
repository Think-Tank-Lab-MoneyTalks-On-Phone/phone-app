import welcomePageLayer3Image2 from "../../../../assets/welcome-page-layer3-img2.png";
import { Image, View, StyleSheet } from "react-native";

export default function WelcomePageLayer3Image2() {
    return (
        <View style={styles.wlcPageLayer3Img2}>
            <Image source={welcomePageLayer3Image2} style={styles.image} />
        </View>
    );
}

const styles = StyleSheet.create({
    wlcPageLayer3Img2: {
        position: 'absolute',
        width: '30%', // Dimensiunea containerului
        top: '34%',
        left: '1%',
    },
    image: {
        width: '100%', // Imaginea va ocupa 100% din container
        height: 'auto', // React Native gestionează automat înălțimea imaginii
    },
});
