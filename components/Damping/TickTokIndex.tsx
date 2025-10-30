import TictokIncomingMsg from "@/components/animation/tictok_incoming_msg";
import { ChatItem, generateNewMessage } from "@/util/chat";
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { useEffect, useRef, useState } from "react";
import { Image, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const chatSpeed = {
    slow: [1000,500],
    medium: [500, 500],
    fast: [250, 250],
    insane: [50, 100]
}
// function SegmentedControl(){
//     return <></>
// }
export default function App() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [message, setMessage] = useState<ChatItem[]>([])
    const timeout = useRef<NodeJS.Timeout | null>(null);
    const [speed, setSpeed] = useState<keyof typeof chatSpeed> ("slow")
    const generateData = ()=>{
        clearTimeout(timeout.current!);
        const selectedSpeed = chatSpeed[speed];
        const timer = Math.random() * selectedSpeed[0] + selectedSpeed[1];

        timeout.current = setTimeout(()=>{
            setMessage((data)=>{
                return [generateNewMessage(), ...data]; 
            })

            generateData();
        }, timer)
    }

    useEffect(()=>{generateData()}, [speed])

    return (
        <GestureHandlerRootView style={{ flex: 1, justifyContent: "center" }}>
           <TictokIncomingMsg
                data={message}
                renderItem={({ item }) => {
                    return (
                        <View key={item.key} style={[{
                            alignItems: "flex-start",
                            padding: 4 * 2,
                            gap: 4,
                            borderRadius: 12
                        }]}>
                            {/* <View> */}
                            <View style={{ flexDirection: "row", gap: 10, alignItems: 'center', justifyContent: "flex-end" }}>
                                <Image source={{ uri: item.user.avater }} style={{width: 20, aspectRatio: 1}} />
                                <Text>{item.user.name}</Text>
                            </View>

                            {/* </View> */}
                            <View style={{ backgroundColor: "lightgray", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 }}><Text>{item.description}</Text></View>
                        </View>
                    )
                }}
            />
            <View style={{height: 300, justifyContent: "center", alignItems: "center"}}>
                <SegmentedControl 
                    values = {Object.keys(chatSpeed)}
                    style={{width: 300}}
                    selectedIndex= {Object.keys(chatSpeed).indexOf(speed)}
                    onChange={(event)=>{
                        setSpeed(event.nativeEvent.value as keyof typeof chatSpeed)
                    }}
                />
            </View>
        </GestureHandlerRootView>

    )
}