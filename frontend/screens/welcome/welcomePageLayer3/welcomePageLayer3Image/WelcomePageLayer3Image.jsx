import welcomePageLayer3Image from "../../../../assets/welcome-page-layer3-img.png";
import { Image, View, StyleSheet } from "react-native";

export default function WelcomePageLayer3Image() {
    return (
        <View style={styles.wlcPageLayer3Img}>
            <Image source={welcomePageLayer3Image} style={styles.image} />
        </View>
    );
}

const styles = StyleSheet.create({
    wlcPageLayer3Img: {
        position: 'absolute',
        width: '25%', // Dimensiunea containerului
        top: '35%',
        left: '71%',
    },
    image: {
        width: '100%', // Imaginea va ocupa 100% din container
        height: 'auto', // React Native gestionează automat înălțimea imaginii
    },
});
