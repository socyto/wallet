import React from 'react';
import { Dimensions, Platform, Text as RNText } from 'react-native';
import { isEmpty } from 'lodash/isEmpty';
const styles = StyleSheet.create({
    text: {
        flexShrink: 1,
        color: 'black',
    },
});
export default class Text extends React.PureComponent {
    state = {
        dimensions: {},
    };
    private subscription: EmitterSubscription;

    componentDidMount() {
        this.subscription = Dimensions.addEventListener('change', ({ window }) => {
            if (window?.height > 0 && window?.width > 0 && Platform.OS === 'android') {
                this.setState({ dimensions: window });
            }
        });
    }

    componentWillUnmount() {
        this.subscription?.remove?.();
    }

    render = () => {
        const { children, variant, color, weight, style, size, font, status, ...props } = this.props;
        const { dimensions } = this.state;
        const fontSize = size || sizes[variant];
        const getStyle = getStyles({ font });

        return (
            <RNText
                accessibilityLabel={`${children ?? ''}/Text`}
                allowFontScaling={false}
                style={StyleSheet.flatten([
                    styles.text,
                    { color },
                    getStyle.type[variant],
                    getStyle.status[status],
                    weight !== 'regular' && getStyle.weight[weight],

                    (!isEmpty(dimensions) || size) && { fontSize },
                    style,
                ])}
                {...props}
            >
                {children || ''}
            </RNText>
        );
    };
}
