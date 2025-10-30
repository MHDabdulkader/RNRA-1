
import { ImageType } from '@/util/image'
import React from 'react'
import { Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import Animated, { interpolate, SharedValue, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'

type VericleListProps = {
  data: ImageType[]
}

const { height } = Dimensions.get("screen");

const _spacing = 8;
const _itemSize = height * 0.72
const _itemFullSize = _itemSize + _spacing * 2;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)


function AnimatedCard({ item, index, scrollY }: { item: ImageType, index: number, scrollY: SharedValue<number> }) {
  const stylez = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value, // which layout,
        [index - 1, index, index + 1], // input change layer
        [0.2, 1, 0.2] // output effect layer
      ),
      transform: [
        {
          scale: interpolate(
            scrollY.value, // which layout,
            [index - 1, index, index + 1], // input change layer
            [0.92, 1, 0.92] // output effect layer
          )
        }
      ]
    }
  })

  return (
    <Animated.View 
      // entering={FadeInUp.springify().damping(80).stiffness(200)}
    style={[stylez, { flex: 1, height: _itemSize, padding: _spacing * 2, borderRadius: 8, gap: _spacing }]}>
      <Image
        source={{ uri: item.image }}
        style={[{ borderRadius: 12, }, StyleSheet.absoluteFillObject,]}
        blurRadius={50}
      />

      <Image source={{ uri: item.image }}
        style={{ flex: 1, height: _itemSize * 0.4, borderRadius: 8 }}
      />
      <View>

        <Text style={{ fontSize: 24, fontWeight: "700", color: "#fff" }}>{item.title}</Text>
        <Text style={{ color: "#ddd" }} numberOfLines={3}>{item.description}</Text>
      </View>
      <View style={{ flexDirection: "row", gap: _spacing, alignItems: "center" }}>
        <Image source={{ uri: item.author.avater }} style={{ width: 24, aspectRatio: 1, borderRadius: 12 }} />
        <Text style={{ fontSize: 12, color: "#ddd" }}>{item.author.name}</Text>

      </View>



    </Animated.View>
  )
}


export default function AniVerticleList({ data }: VericleListProps) {
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler(e => {
    scrollY.value = e.contentOffset.y / _itemFullSize;
  })

  return (
    <Animated.FlatList

      data={data}
      contentContainerStyle={{
        paddingHorizontal: _spacing * 3,
        paddingVertical: (height - _itemFullSize) / 2,
        gap: _spacing * 2
      }}
      renderItem={({ item, index }) => (
        <AnimatedCard item={item} index={index} scrollY={scrollY} />
      )}
      snapToInterval={_itemFullSize}
      decelerationRate={"fast"}
      onScroll={onScroll}
      scrollEventThrottle={16} // 1000/ 60
    />
  )
}