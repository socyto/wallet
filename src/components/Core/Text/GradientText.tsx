import MaskedView from '@react-native-community/masked-view';

const GradientText = (props) => (
    <MaskedView maskElement={<Text {...props} />}>
        <LinearGradient colors={['#f00', '#0f0']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
            <Text {...props} style={[props.style, { opacity: 0 }]} />
        </LinearGradient>
    </MaskedView>
);
