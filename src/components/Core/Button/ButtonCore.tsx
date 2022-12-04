import React, {FunctionComponent} from "react";
import {View, ViewStyle} from "react-native";
import {
    RectButton as NativeRectButton,
    RectButtonProps,
} from "react-native-gesture-handler";
import styles from "./styles";
import {ColorPalette} from '../../../styles'

/**
 * RectButton replaces the "RectButton" of "react-native-gesture-handler".
 * "react-native-gesture-handler"'s rect button seems to have the bugs that the ripple color is not provided
 * and border radius is used directly to the rect button component.
 * To solve this problem, set the default ripple color if it is not provided
 * and wrap it with the View and set the border radius to that View if border radius style is provided.
 * @param props
 * @constructor
 */
export const ButtonCore: FunctionComponent<RectButtonProps & {
    style?: ViewStyle;
}> = (props) => {

    const {
        children,
        style: propStyle,
        rippleColor,
        underlayColor,
        activeOpacity,
        ...rest
    } = props;

    const {
        borderRadius,
        borderTopLeftRadius,
        borderTopRightRadius,
        borderBottomLeftRadius,
        borderBottomRightRadius,
        borderBottomColor,
        borderBottomWidth,
        borderLeftColor,
        borderLeftWidth,
        borderRightColor,
        borderRightWidth,
        borderTopColor,
        borderTopWidth,
        borderColor,
        borderWidth,
        borderStyle,
        margin,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        flexGrow,
        flex,
        flexBasis,
        flexShrink,
        flexWrap,
        backgroundColor,
        // ...restStyle
    } = propStyle ?? {};

    return (
        <View
            style={{
                overflow: "hidden",
                borderRadius,
                borderTopLeftRadius,
                borderTopRightRadius,
                borderBottomLeftRadius,
                borderBottomRightRadius,
                borderBottomColor,
                borderBottomWidth,
                borderLeftColor,
                borderLeftWidth,
                borderRightColor,
                borderRightWidth,
                borderTopColor,
                borderTopWidth,
                borderColor,
                borderWidth,
                borderStyle,
                margin,
                marginTop,
                marginBottom,
                marginLeft,
                marginRight,
                flexGrow,
                flex,
                flexBasis,
                flexShrink,
                flexWrap,
                backgroundColor,
            }}
        >
            <NativeRectButton
                // style={restStyle}
                rippleColor={
                    rippleColor || ColorPalette?.['gray-100']
                }
                underlayColor={
                    underlayColor || ColorPalette?.['gray-300']
                }
                activeOpacity={activeOpacity ?? 0.2}
                {...rest}
            >
                {children}
            </NativeRectButton>
        </View>
    );
};
