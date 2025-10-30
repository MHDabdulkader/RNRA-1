

import React from 'react';
import { FlatList, FlatListProps, ListRenderItem } from 'react-native';
import Animated, { FadeInDown, interpolate, LinearTransition, useAnimatedStyle, useDerivedValue, withSpring } from 'react-native-reanimated';

type TikTokMessageProps<T> = FlatListProps<T> & {
    renderItem: ListRenderItem<T>;
}

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

function AnimatedItem({ index, children }: { index: number, children: React.ReactNode }) {


    const newIndex = useDerivedValue(() => {
        return withSpring(index, { damping: 80, stiffness: 200 })
    })

    const stylez = useAnimatedStyle(() => {
        // const normalize = 
        return {
            opacity: interpolate(newIndex.value, [0, 1], [1, 1 - 1 / 6])
        }
    })
    return (
        <Animated.View
            entering={FadeInDown.springify().damping(80).stiffness(200).withInitialValues({
                opacity: 0,
                transform:[{
                    translateY:100,
                    // translateX: 100
                }]
            })}
        >
            <Animated.View
                style={stylez}
            >{children}</Animated.View>
        </Animated.View>

    )
}
export default function TictokIncomingMsg<T>({ renderItem, ...rest }: TikTokMessageProps<T>) {
    return (
        <Animated.FlatList
            // style={{flex: 1}}
            inverted
            itemLayoutAnimation={LinearTransition.springify().damping(80).stiffness(200)}
            {...rest}
            renderItem={(props) => {
                return <AnimatedItem index={props.index}>{renderItem(props)}</AnimatedItem>
            }}
        />
    )
}