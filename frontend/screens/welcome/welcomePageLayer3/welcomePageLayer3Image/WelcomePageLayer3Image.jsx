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
        width: 450, 
        top: -225,
        left: -350,
        transform: [{ scale: 0.28 }],
    },
    image: {
        width: '125%',
    },
});
