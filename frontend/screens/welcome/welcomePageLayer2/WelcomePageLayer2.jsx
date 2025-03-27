import React from 'react';
import { View } from 'react-native';
import WelcomePageLayer2Logo from './WelcomePageLayer2Logo/WelcomePageLayer2Logo';
import WelcomePageLayer2Image from './WelcomePageLayer2Image/WelcomePageLayer2Image';
import WelcomePageLayer2Writing from './WelcomePageLayer2Writing/WelcomePageLayer2Writing';

export default function WelcomePageLayer2() {
    return (
        <View>
            <WelcomePageLayer2Logo />
            <WelcomePageLayer2Image />
            <WelcomePageLayer2Writing />
        </View>
    );
}
