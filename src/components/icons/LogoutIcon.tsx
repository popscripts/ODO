import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function LogoutIcon() {
    return (
        <Svg width={30} height={30} viewBox="0 0 100 100" fill="none">
            <Path
                d="M59 31.5V25c0-9.389-7.611-17-17-17H28c-9.389 0-17 7.611-17 17v50c0 9.389 7.611 17 17 17h14c9.389 0 17-7.611 17-17v-5"
                stroke="#f6f6f6"
                strokeWidth={8}
                strokeLinecap="round"
            />
            <Path d="M35 45a4 4 0 000 8v-8zm0 8h52.5v-8H35v8z" fill="#f6f6f6" />
            <Path
                d="M88 49L74 28M74 70l14-21"
                stroke="#f6f6f6"
                strokeWidth={8}
                strokeLinecap="round"
            />
        </Svg>
    )
}

export default LogoutIcon
