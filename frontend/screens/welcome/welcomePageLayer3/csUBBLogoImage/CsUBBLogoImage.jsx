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
        width: 450, 
        top: 165,
        left: -75,
        transform: [{ scale: 0.35 }],
    },
    image: {
        width: '45%',
    },
});
