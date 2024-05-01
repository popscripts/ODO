import * as React from 'react'
import Svg, { Mask, Path } from 'react-native-svg'

type Props = {
    color: string
}
const HomeIcon = ({ color }: Props) => (
    <Svg width={30} height={30} fill="none" viewBox="0 0 98 99">
        <Mask id="a" fill="#fff">
            <Path d="M13 50h72v33c0 8.837-7.163 16-16 16H29c-8.837 0-16-7.163-16-16V50Z" />
        </Mask>
        <Path
            fill={color}
            d="M13 50h72-72Zm80 33c0 13.255-10.745 24-24 24H29C15.745 107 5 96.255 5 83h16a8 8 0 0 0 8 8h40a8 8 0 0 0 8-8h16Zm-64 24C15.745 107 5 96.255 5 83V50h16v33a8 8 0 0 0 8 8v16Zm64-57v33c0 13.255-10.745 24-24 24V91a8 8 0 0 0 8-8V50h16Z"
            mask="url(#a)"
        />
        <Path
            stroke={color}
            strokeLinecap="round"
            strokeWidth={8}
            d="M81 50h13M4 50h13M4 50 49 4M94 50 49 4M62 94.5V74c0-10.5-3.5-13-13-13M36 94.5V74c0-10.5 3.5-13 13-13"
        />
    </Svg>
)
export default HomeIcon
