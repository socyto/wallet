import { StyleSheet } from 'react-native';
import { DynamicSize } from '../../../utils/ScreenUtils';
import { ColorPalette } from '../../../assets/colors';

const buttonSize = (width: number) => ({
    small: {
        height: 28,
        minWidth: DynamicSize(60, width),
    },
    medium: {
        height: 36,
        minWidth: DynamicSize(78, width),
    },
    large: {
        height: 48,
        minWidth: DynamicSize(96, width),
    },
    iconOnly: {
        height: 36,
        width: 36,
    },
});

const titleStyles = () => ({
    default: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    primary: {
        color: ColorPalette.white,
    },
    tonal: {
        color: ColorPalette.blue_01,
    },
    disabled: {
        color: ColorPalette.gray_18,
    },
    small: {
        fontSize: 12,
    },
    medium: {
        fontSize: 14,
    },
    large: {
        fontSize: 16,
    },
});

const iconStyles = (width: number) => ({
    default: {
        width: DynamicSize(20, width),
        height: DynamicSize(20, width),
    },
    left: {
        marginRight: 8,
    },
    right: {
        marginLeft: 8,
    },
    primary: {
        tintColor: ColorPalette.white,
    },
    tonal: {
        tintColor: ColorPalette.blue_05,
    },
    disabled: {
        tintColor: ColorPalette.gray_18,
    },
    small: {
        width: DynamicSize(16, width),
        height: DynamicSize(16, width),
    },
    medium: {
        width: DynamicSize(16, width),
        height: DynamicSize(16, width),
    },
    large: {
        width: DynamicSize(24, width),
        height: DynamicSize(24, width),
    },
    iconOnly: {
        width: 16,
        height: 16,
        margin: 0,
    },
});

export { iconStyles, buttonSize, titleStyles };
