import AniVerticleList from "@/components/animation/AniVerticleList";
import generateNewImage from "@/util/image";
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
    
    return (
        <GestureHandlerRootView style={{ flex: 1, justifyContent: "center", backgroundColor: "black" }}>
           <AniVerticleList data ={generateNewImage}/>
        </GestureHandlerRootView>

    )
}