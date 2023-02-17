import React from 'react';
import {
    Button,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Animated,
    ScrollView,
    Image,
    ImageSourcePropType,
} from 'react-native';
import { StringArray } from '../../../types';

interface State {
    enthusiasmLevel: number;
}

interface GuideData {
    title: string;
    body: string;
    source?: ImageSourcePropType;
    customComponent?: JSX.Element;
}

export type Props = {
    name?: string;
    baseEnthusiasmLevel?: number;
    enthusiasmLevel?: number;
    backButton: string;
    nextButton: string;
    tripEndButton: string;
    data: GuideData[];
    onTripEndButtonPress: Function;
};

const DOT_CONTAINER_WIDTH = 18;
const { width: SCREEN_WIDTH } = Dimensions.get('window');

class PageGuide extends React.Component<Props, State> {
    private opacityText: Animated.Value;
    private previousPage: number;
    private pager: any;
    constructor(props: Props) {
        super(props);

        this.opacityText = new Animated.Value(1);
        this.state = {
            nativeEvent: { position: 0, offset: 0 },
        };
        this.previousPage = 0;

        this.state = {
            enthusiasmLevel: props.enthusiasmLevel || 1,
        };
    }

    onIncrement = () =>
        this.setState({
            enthusiasmLevel: this.state.enthusiasmLevel + 1,
        });
    onDecrement = () =>
        this.setState({
            enthusiasmLevel: this.state.enthusiasmLevel - 1,
        });
    getExclamationMarks = (numChars: number) => Array(numChars + 1).join('!');

    onPageScroll = ({ nativeEvent }) => {
        this.setState({ nativeEvent }, this.checkEndTrip);
    };

    next = () => {
        const {
            nativeEvent: { position },
        } = this.state;
        const { data } = this.props;

        if (position === data.length - 1) {
            const { onTripEndButtonPress } = this.props;
            if (onTripEndButtonPress && typeof onTripEndButtonPress === 'function') onTripEndButtonPress();
        } else if (this.pager) {
            this.pager.setPage(position + 1);
        }
    };

    checkEndTrip = () => {
        const { nativeEvent } = this.state;
        const { position } = nativeEvent;
        const { data } = this.props;
        Platform.OS === 'android' && this.onPageSelected();
        const isEnd = position === data.length - 1;
        this.setState({ isEnd });
    };

    onPageSelected = () => {
        const { onIndexChanged } = this.props;
        setTimeout(() => {
            const { nativeEvent } = this.state;
            const { position } = nativeEvent;
            onIndexChanged(position);
        }, 50);
    };

    renderTop = (item) => {
        const { titleStyle, bodyStyle } = this.props;
        return (
            <View>
                {item.title ? <Text style={[styles.title, titleStyle]}>{item.title}</Text> : <View />}
                {item.body ? <Text style={[styles.body, bodyStyle]}>{item.body}</Text> : <View />}
                {item.customComponent}
            </View>
        );
    };

    renderDots = () => {
        const { data } = this.props;
        const dots = data.map((item, index) => (
            <View key={index.toString()} style={styles.dotContainer}>
                <Animated.View style={styles.circleDot} />
            </View>
        ));
        return dots;
    };

    renderPage = (item, index) => {
        const { imageContainerStyle, imageStyle } = this.props;
        const marginTopBottom = get(imageContainerStyle, 'marginVertical', 10);
        const marginTop =
            item.position === 'bottom' ? { marginBottom: marginTopBottom } : { marginTop: marginTopBottom };
        const { renderContent } = item;
        if (renderContent) {
            return <View key={index}>{renderContent}</View>;
        }
        return (
            <ScrollView key={index} style={styles.page}>
                {item.position === 'bottom' ? <View /> : this.renderTop(item)}
                {item.source ? (
                    <View style={[styles.imageContainer, marginTop, imageContainerStyle]}>
                        <Image style={[styles.image, imageStyle]} source={item.source} />
                    </View>
                ) : (
                    <View />
                )}
                {item.position === 'bottom' ? this.renderTop(item) : <View />}
            </ScrollView>
        );
    };

    render() {
        const { data } = this.props;
        const width = data.length * DOT_CONTAINER_WIDTH;
        const { nativeEvent } = this.state;
        const { position, offset } = nativeEvent;
        const translateX = position * (DOT_CONTAINER_WIDTH + 2) + offset * (DOT_CONTAINER_WIDTH + 2);
        return (
            <View style={styles.container}>
                <View style={styles.flex}>
                    <ViewPager
                        ref={(ref) => (this.pager = ref)}
                        onPageScroll={this.onPageScroll}
                        style={styles.viewPager}
                        onPageSelected={this.onPageSelected}
                        initialPage={0}
                    >
                        {data.map(this.renderPage)}
                    </ViewPager>
                </View>
                <View>
                    <View style={styles.bottomView}>
                        <View style={styles.indicatorBarView}>
                            <View style={[styles.row, { width }]}>
                                {this.renderDots()}
                                <Animated.View style={[{ left: translateX }, styles.indicatorBar]} />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

// styles
const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        alignSelf: 'center',
    },
    buttons: {
        flexDirection: 'row',
        minHeight: 70,
        alignItems: 'stretch',
        alignSelf: 'center',
        borderWidth: 5,
    },
    button: {
        flex: 1,
        paddingVertical: 0,
    },
    greeting: {
        color: '#999',
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
    },
    bottomView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 20,
        paddingHorizontal: 24,
    },
    viewPager: {
        flex: 1,
    },
    flex: {
        flex: 1,
    },
    circleDot: {
        width: DOT_CONTAINER_WIDTH,
        height: 3,
        borderRadius: Radius.XXS,
        borderWidth: 0.5,
        borderColor: Colors.pink_05_b,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dotContainer: {
        width: DOT_CONTAINER_WIDTH + 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    indicatorBar: {
        width: DOT_CONTAINER_WIDTH + 2,
        height: 3,
        backgroundColor: 'pink',
        position: 'absolute',
        borderRadius: 2,
    },
    nextButton: {
        color: 'red',
    },
    page: {
        padding: 12,
        flex: 1,
    },
    title: {
        color: 'grey',
        fontWeight: 'bold',
    },
    body: {
        color: 'grey',
        marginTop: 16,
    },
    indicatorBarView: {
        left: 0,
        right: 0,
        position: 'absolute',
        alignItems: 'center',
    },
    backButton: {
        color: 'black',
    },
    imageContainer: {},
    image: {
        width: SCREEN_WIDTH - 20,
        height: SCREEN_WIDTH - 20,
    },
});

export default PageGuide;
