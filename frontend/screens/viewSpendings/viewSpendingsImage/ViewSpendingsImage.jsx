import VectorialIlustrationImage from "../../../assets/view-all-spendings-img.png"
import { Image } from 'react-native';

export default function ViewSpendingsImage() {
    return (
        <Image
            source={VectorialIlustrationImage}
            style={{ width: 360, height: 100, marginTop: 25 }}
            resizeMode="contain"
        />
    );
}
