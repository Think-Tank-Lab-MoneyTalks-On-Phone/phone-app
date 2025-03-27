import Logos from "../../components/logos/Logos";
import { View, StyleSheet } from "react-native";

export default function WelcomePageLogo() {
    return (
        <View style={styles.wlcPageLogo}>
            <Logos />
        </View>
    );
}

const styles = StyleSheet.create({
    wlcPageLogo: {
        position: "absolute",
        width: 100,
        top: -425,
        bottom: 0,
        left: 0,
        right: 20,
        transform: [
            { scale: 0.3 },
            { translateX: -670 }
          ],          
    },
});
