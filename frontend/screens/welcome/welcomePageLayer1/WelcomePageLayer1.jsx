import React from 'react';
import { View } from 'react-native';
import WelcomePageImage from '../welcomePageImage/WelcomePageImage';
import WelcomePageWriting from '../welcomePageWriting/WelcomePageWriting';
import WelcomePageLogo from '../welcomePageLogo/WelcomePageLogo';

export default function WelcomePageLayer1() {
    return (
        <View>
            <WelcomePageImage />
            <WelcomePageWriting />
            <WelcomePageLogo />
        </View>
    );
}
