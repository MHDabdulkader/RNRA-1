
import React from 'react'
import { Pressable, PressableProps, StyleSheet, Text, View } from 'react-native'
import Animated, { AnimatedProps, FadeInDown, FadeInLeft, FadeOutLeft, FadeOutUp, interpolateColor, LinearTransition, SharedValue, useAnimatedStyle, useDerivedValue, withSpring } from 'react-native-reanimated'

type Props = {
    total: number,
    selectedIndex: number,
    onIndexChange: (index: number) => void
}
const _spacing = 8;
const _buttonHeight = 42;
const _linearTransition = LinearTransition.springify().damping(80).stiffness(200);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const _dotContainer = 24;
const _dotSize = _dotContainer / 3;
const _activeColor = "#fff"
const _inactiveColor = "#aaa"

function Button({ children, style, ...rest }: AnimatedProps<PressableProps>) {
    return (
        <AnimatedPressable
            style={[{
                height: _buttonHeight,
                borderRadius: _buttonHeight / 2,
                justifyContent: 'center',
                alignItems: "center",
                paddingHorizontal: _spacing * 2

            }, style]}
            entering={FadeInLeft.springify().damping(80).stiffness(200)}
            exiting={FadeOutLeft.springify().damping(80).stiffness(200)}
            layout={_linearTransition}
            {...rest}
        >
            {children}
        </AnimatedPressable>
    )
}
export function Dot({ index, animation }: { index: number, animation: SharedValue<number> }) {
      const stylez = useAnimatedStyle(()=>{
            return{
                backgroundColor: interpolateColor(
                    animation.value,
                    [index-1, index, index+1],
                    [_inactiveColor, _activeColor,_activeColor]
                )
            }
        })


    return (
      
        <View
            style={{width: _dotContainer, height: _dotContainer, justifyContent: "center", alignItems: "center"}}
        >
            <Animated.View
                style={[stylez, {
                    width: _dotSize,
                    height: _dotSize,
                    borderRadius: _dotSize,
                    // backgroundColor: "black"
                }]}
            />
        </View>

    )
}
function PaginationIndicator({animation}: {animation: SharedValue<number>}){
    const stylez = useAnimatedStyle(()=> {
        return {
            width: _dotContainer + _dotContainer * animation.value
        }
    })
    return (
        <Animated.View 
            style={[stylez,{
                backgroundColor: "#29BE56",
                height: _dotContainer,
                width: _dotContainer,
                position: "absolute",
                borderRadius: _dotContainer,
                left: 0,
                top: 0
            }]}
        />
    )
}
export function Pagination({ selectedIndex, total }
    : { selectedIndex: number, total: number }) {
    const animation = useDerivedValue(()=>{
        return withSpring(selectedIndex, {
            damping: 80,
            stiffness: 200
        })
    })
    return (
        <View style={{justifyContent: "center", alignItems: "center"}}>
            <View style={{ flexDirection: "row" }}>
                <PaginationIndicator animation={animation}/>
                {[...Array(total).keys()].map((i) => (
                    <Dot key={`dot-${i}`} index={i} animation={animation}/>
                ))}
            </View>

        </View>
    )
}

export default function OnboardingPagination({ total, selectedIndex, onIndexChange }: Props) {
    return (
        <View style={[styles.container, { gap: _spacing *2, paddingHorizontal: 10  }]}>
            <Pagination total={total} selectedIndex={selectedIndex} />
            <View
                style={{ flexDirection: "row", gap: _spacing }}
            >
                {selectedIndex > 0 && <Button
                    style={{
                        backgroundColor: "#ddd",
                        // flex: 1
                    }}
                    onPress={() => {
                        if (selectedIndex === 0) return;
                        onIndexChange(selectedIndex - 1);
                    }}
                >
                    <Text>Back</Text>
                </Button>
                }
                <Button
                    style={{
                        backgroundColor: "#036BFB",
                        flex: 1
                    }}
                    onPress={() => {
                        if (selectedIndex === total-1) {
                            return;
                        }

                        onIndexChange(selectedIndex + 1)
                    }}
                >
                    {selectedIndex === total-1 ?
                        <Animated.Text
                            key={"finish"}
                            style={{ color: "white" }}
                            layout={_linearTransition}
                            entering={FadeInDown.springify().damping(80).stiffness(200)}
                            exiting={FadeOutUp.springify().damping(80).stiffness(200)}
                        >Finished</Animated.Text>
                        : <Animated.Text
                            key={"continue"}
                            style={{ color: "white" }}
                            layout={_linearTransition}
                            entering={FadeInDown.springify().damping(80).stiffness(200)}
                            exiting={FadeOutUp.springify().damping(80).stiffness(200)}
                        >Continue</Animated.Text>

                    }
                </Button>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center"
    }
})