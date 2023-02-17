import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import PageGuide from '../../components/PageGuide';
import { Images } from '../../assets/images';
export type Props = {
    name: string;
    baseEnthusiasmLevel?: number;
};

const Onboarding: React.FC<Props> = ({ name, baseEnthusiasmLevel = 0 }) => {
    const [enthusiasmLevel, setEnthusiasmLevel] = React.useState(baseEnthusiasmLevel);

    const onIncrement = () => setEnthusiasmLevel(enthusiasmLevel + 1);
    const onDecrement = () => setEnthusiasmLevel(enthusiasmLevel > 0 ? enthusiasmLevel - 1 : 0);

    const getExclamationMarks = (numChars: number) => (numChars > 0 ? Array(numChars + 1).join('!') : '');
    const renderPage = () => {
        return (
            <PageGuide
                backButton="BACK"
                nextButton="NEXT"
                tripEndButton="CONTINUE"
                onTripEndButtonPress={() => {
                    alert('predd');
                }}
                data={[
                    {
                        title: 'Quyên góp bước chân',
                        body: 'Mỗi bước chân bạn đi sẽ quy đổi thành tiền đê quyên góp từ thiện',
                        source: Images.onboarding_chart,
                        customComponent: (
                            <View>
                                <Text>Custom component</Text>
                            </View>
                        ),
                    },
                    {
                        title: 'Quyên góp bước chân',
                        body: 'Mỗi bước chân bạn đi sẽ quy đổi thành tiền đê quyên góp từ thiện',
                    },
                    {
                        title: 'Quyên góp bước chân',
                        body: 'Mỗi bước chân bạn đi sẽ quy đổi thành tiền đê quyên góp từ thiện',
                        source: Images.onboarding_wallet,
                    },
                ]}
            />
        );
    };
    return (
        <View style={styles.container}>
            {renderPage()}
            <Button title="Decrease enthusiasm" accessibilityLabel="decrement" onPress={onDecrement} color="red" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    greeting: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 16,
    },
});

export default Onboarding;
