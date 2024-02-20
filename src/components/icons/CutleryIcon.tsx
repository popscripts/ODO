import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

type Props = {
    color: string
}
const SvgComponent = ({ color }: Props) => (
    <Svg width={30} height={30} fill="none" viewBox="0 0 89 98">
        <Path
            stroke={color}
            strokeLinecap="round"
            strokeWidth={8}
            d="M22 4v90M85 4v90M25 42c12.535 0 15.214-7.238 14.987-10.857V4M19 42C6.465 42 3.786 34.762 4.013 31.143V4M85 4c-7.333 3.333-22 16.9-22 44.5 0 8.4 14.667 9.5 22 9"
        />
    </Svg>
)
export default SvgComponent
