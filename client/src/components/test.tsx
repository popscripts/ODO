import {Text, TouchableOpacity} from "react-native";
import {StatusBar} from "expo-status-bar";
import {useToken, useLogIn} from "../providers/AuthProvider";


export default function Test() {
    const token = useToken()
    const logIn = useLogIn()

    return (
        <>
            <Text>{token.result}</Text>
            <StatusBar style="auto" />
            <TouchableOpacity onPress={() => logIn("Kasiula", "mojehaslo")}><Text>Touch me</Text></TouchableOpacity>
        </>
    )
}