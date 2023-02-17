import React, { FunctionComponent, ReactElement, isValidElement } from "react";
import { ColorPalette } from "../../../styles";
import { Text, StyleSheet, TextStyle, View, ViewStyle } from "react-native";
import { ButtonCore } from "./ButtonCore";
import {titleStyles, buttonSize, iconStyles} from "./styles";

const Button: FunctionComponent<{
    mode?: "primary" | "secondary" | "outline" | "disabled";
    size?: "medium" | "small" | "large";
    title: string;
    leftIcon?: ReactElement | ((color: string) => ReactElement);
    rightIcon?: ReactElement | ((color: string) => ReactElement);
    loading?: boolean;
    disabled?: boolean;

    onPress?: () => void;

    containerStyle?: ViewStyle;
    style?: ViewStyle;
    textStyle?: TextStyle;

    rippleColor?: string;
    underlayColor?: string;
}> = ({
          mode = "primary",
          size = "medium",
                        title,
          leftIcon,
          rightIcon,
          loading = false,
          disabled = false,
          onPress,
          containerStyle,
          style: buttonStyle,
          textStyle,
          rippleColor: propRippleColor,
          underlayColor: propUnderlayColor,
      }) => {

    const backgroundColorDefinitions: string = (() => {
        switch (mode) {
            case "primary":
               return ColorPalette.pink_05
            case "secondary":
                return ColorPalette.gray_20
            case "disabled":
                return ColorPalette.black_04
            default:
                return ColorPalette.transparent
        }
    })();

    const textDefinition = (() => {
        switch (size) {
            case "large":
                return 16;
            case "small":
                return 14;
            default:
                return 12;
        }
    })();

    const textColorDefinition: string = (() => {

        switch (mode) {
            case "primary":
                return 'white'

        }
    })();



    const _buttonStyle: ViewStyle = (() => {
        const _buttonSize = buttonSize?.[mode] ;
        if(mode) return buttonSize?.[mode]
    })();


    return (
        <View
            style={StyleSheet.flatten([
                _buttonStyle,
                containerStyle,
            ])}
        >
            <ButtonCore
                style={StyleSheet.flatten([
                    {flexDirection:'row', justifyContent:'center', alignItems:'center', height:52, padding: 8}
                    ,
                    buttonStyle,
                ])}
                onPress={onPress}
                enabled={!loading && !disabled}
            >
                <View

                >
                    <View>
                        {isValidElement(leftIcon) || !leftIcon
                            ? leftIcon
                            : leftIcon(
                                textColorDefinition)
                            }
                    </View>
                </View>
                <Text
                    style={StyleSheet.flatten([
                        style.flatten(
                            [textDefinition, "text-center", ...(textColorDefinition as any)],
                            [loading && "opacity-transparent"]
                        ),
                        textStyle,
                    ])}
                >
                    {text}
                </Text>
                <View
                    style={style.flatten(
                        ["height-1", "justify-center"],
                        [loading && "opacity-transparent"]
                    )}
                >
                    <View>
                        {isValidElement(rightIcon) || !rightIcon
                            ? rightIcon
                            : rightIcon(
                                (style.flatten(textColorDefinition as any) as any).color
                            )}
                    </View>
                </View>
            </ButtonCore>
        </View>
    );
};

export default Button
