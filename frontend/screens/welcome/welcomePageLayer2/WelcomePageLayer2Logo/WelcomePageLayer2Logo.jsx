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
        position: 'absolute',
        width: 450, 
        top: -365,
        left: -330,
        transform: [{ scale: 0.3}],
    },
    image: {
        width: '150%',
    },
});
