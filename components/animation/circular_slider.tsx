import { Animated, Dimensions, Image, View } from "react-native";
import { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";

const imageURLs = [
    require("@/assets/images/image 1.jpg"),
    require("@/assets/images/image 2.jpg"),
    require("@/assets/images/image 3.jpg"),
    require("@/assets/images/image 6.jpg"),
    require("@/assets/images/image 7.jpg"),

];
const {width} = Dimensions.get("screen");
const _itemSize = width * .24;
//const _itemHeight = _itemWidth * 1.67;
const _spacing = 12;
const _itemTotalSize = _itemSize + _spacing;
function CarouselItem({ imageUri, index }: { imageUri: any, index: number}) {

    // const stylez = useAnimatedStyle(()=>{
    //     return {
    //         transform: [
    //             {
    //                 translateY: interpolate(
    //                     scrollX.value,
    //                     [index -1 , index, index+1],
    //                     [_itemSize/3, 0, _itemSize/3]
    //                 )
    //             }
    //         ]
    //     }
    // })
    return(
        <Animated.View
            // style={[stylez]}
        >
            <Image 
                source={imageUri}
                style={{
                    width: _itemSize,
                    height: _itemSize,
                    borderRadius: _itemSize/2
                }}
            />
        </Animated.View>
    )
}

export function CircularSlider() {
    const scrollX = useSharedValue(0);
    const onScroll = useAnimatedScrollHandler((e) => {
        
        scrollX.value = e.contentOffset.x / _itemTotalSize; 
        console.log(scrollX.value)
    })
    return (
        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: "center" }}>
            <Animated.FlatList
                style={{flexGrow:0, paddingBottom: _itemSize}}
                contentContainerStyle={{
                    gap: _spacing,
                    paddingHorizontal: (width-_itemSize)/2
                }}
                data={imageURLs}
                keyExtractor={(_, index) => String(index)}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    return <CarouselItem
                        imageUri={item}
                        index={index}
                       // scrollX={scrollX}
                    />

                }}

                onScroll={onScroll}
                scrollEventThrottle={1000/60}
                snapToInterval={_itemTotalSize}
                decelerationRate={"fast"}
            />
        </View>
    )
}