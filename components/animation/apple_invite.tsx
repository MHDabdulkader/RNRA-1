
import { Marquee } from "@animatereactnative/marquee";
import { Stagger } from "@animatereactnative/stagger";
import { useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Animated, { Easing, FadeIn, FadeInUp, FadeOut, interpolate, SharedValue, useAnimatedReaction, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { runOnJS } from "react-native-worklets";
const imageURLs = [
    require("@/assets/images/image 1.jpg"),
    require("@/assets/images/image 2.jpg"),
    require("@/assets/images/image 3.jpg"),
    require("@/assets/images/image 6.jpg"),
    require("@/assets/images/image 7.jpg"),

];

const { width } = Dimensions.get("window");
const _itemWidth = width * .67;
const _itemHeight = _itemWidth * 1.67;
const _spacing = 16;
const _itemSize = _itemWidth + _spacing;
function Item({
    image,
    index,
    offset
}: {
    image: any,
    index: number,
    offset: SharedValue<number>
}) {


    const _stylez = useAnimatedStyle(() => {
        // item inital position with center-based coordinate system for the item's fixed position
        const itemPosition = _itemSize * index - width - _itemSize/2;
        // marquee total size
        const totalSize = imageURLs.length * _itemSize;

        // Range, relative position back into the final screnn coordinate so the item is correctly rendered on the display
        const range = ((itemPosition - (offset.value+ totalSize * 1000))% totalSize) + width + _itemSize;


        return {
            transform:[
                {
                    //{perspective: 1000 },
                   // {rotateY: `280deg`}
                    //rotate: `45deg`
                    rotate: `${interpolate(
                        range,
                        [-_itemSize, (width - _itemSize)/2, width],
                        [-3,0,3]
                    )}deg`
                }
            ]
        }; 
    })

    return (
        <Animated.View
            style={[
                {
                    width: _itemWidth,
                    height: _itemHeight,

                },
                _stylez
            ]}
        >
            <Image source={image} style={{ flex: 1, borderRadius: 16, width: "auto" }} />
        </Animated.View>

    )
}
export default function AppleInvite() {
    const offset = useSharedValue(0);
    const [activeIndex, setActiveIndex] = useState(0);

    // effect for get index :
    // useAnimatedReaction takes offset means kind of calculated index:
    useAnimatedReaction(
        // calculate value
        () => {
            const floatIndex = ((offset.value + ((width + _spacing) / 2)) / _itemSize) % imageURLs.length;
            return Math.abs(Math.round(floatIndex));
        },
        // update value
        (value) => {
            //    console.log(value)
            runOnJS(setActiveIndex)(value);
        }
    )
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: 'center', backgroundColor: "#000" }}>
            <View style={[StyleSheet.absoluteFillObject, { opacity: 0.5 }]}>
                <Animated.Image
                    key={`image-${activeIndex}`}
                    style={{ flex: 1, width: "auto" }}
                    source={imageURLs[activeIndex]}
                    blurRadius={50}
                    entering={FadeIn.duration(1000)}
                    exiting={FadeOut.duration(1000)}
                />
            </View>
            <Marquee
                spacing={_spacing}
                position={offset}
            >
                <Animated.View
                    entering={
                        FadeInUp.delay(500).duration(1000).easing(Easing.elastic(0.5)).withInitialValues({
                            transform: [{ translateY: -_itemHeight / 2 }]
                        })
                    }
                    //  exiting={FadeOutDown.duration(1000)}
                    style={{ flexDirection: "row", gap: _spacing }}
                >
                    {imageURLs.map((image, index) => (
                        <Item
                            key={`image-${index}`}
                            image={image}
                            index={index}
                            offset={offset}
                        />
                    ))}
                </Animated.View>
            </Marquee>
            <Stagger

                stagger={500}
                initialEnteringDelay={1000}
                duration={500}
                style={{
                    flex: 0.5,
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Text style={{ color: "white", fontWeight: 500 }}>Welcome to</Text>
                <Text style={{ color: "white", fontSize: 28, marginBottom: 12, fontWeight: "bold" }}>React Native Reanimated</Text>
                <Text
                    style={{
                        color: "white",
                        // opacity: 0.8
                        textAlign: "center",
                        paddingHorizontal: 20
                    }}
                >As <Text style={{ fontWeight: "bold" }}>users scroll</Text> through the items, the background dynamically.</Text>
            </Stagger>
        </View>
    )
}