import Logos from "../../../components/logos/Logos";
import { View, StyleSheet } from "react-native";

export default function WelcomePageLayer2Logo() {
    return (
        <View style={styles.wlcPageLayer2Logo}>
            <Logos />
        </View>
    );
}

const styles = StyleSheet.create({
    wlcPageLayer2Logo: {
        position: "absolute", // echivalentul "fixed" în web
        maxWidth: 700,
        top: "25%",
        left: "16%",
        transform: [{ translateX: -350 }], // Pentru a centra containerul pe ecran
    },
});
