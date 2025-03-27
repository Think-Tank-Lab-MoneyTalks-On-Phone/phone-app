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
        position: 'absolute',
        width: 450, 
        top: -150,
        left: -250,
        transform: [{ scale: 0.55 }],
    },
    image: {
        width: '100%',
    },
});
