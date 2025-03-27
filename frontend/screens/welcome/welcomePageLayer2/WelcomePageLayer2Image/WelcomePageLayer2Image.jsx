import welcomePageLayer2Image from "../../../../assets/welcome-page-layer2-img.png";
import { View, Image, StyleSheet } from "react-native";

export default function WelcomePageLayer2Image() {
    return (
        <View style={styles.wlcPageLayer2Img}>
            <Image source={welcomePageLayer2Image} style={styles.image} />
        </View>
    );
}

const styles = StyleSheet.create({
    wlcPageLayer2Img: {
        position: "absolute",
        width: "25%", // Dimensiunea containerului
        top: "23%",
        left: "67%",
    },
    image: {
        width: "100%", // Imaginea este 100% din container
        height: "auto", // În React Native, 'auto' pentru înălțime nu funcționează, dar putem să lăsăm React Native să se ocupe de dimensiuni
    },
});
