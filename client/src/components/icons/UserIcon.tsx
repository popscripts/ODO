import * as React from 'react'
import Svg, { Mask, Path, Circle } from 'react-native-svg'

type Props = {
    color: string
}
const SvgComponent = ({ color }: Props) => (
    <Svg width={30} height={30} viewBox={'0 0 82 96'} fill="none">
        <Mask id="a" fill="#fff">
            <Path d="M0 86.738C0 66.448 16.448 50 36.738 50h8.524C65.552 50 82 66.448 82 86.738a8.817 8.817 0 0 1-8.817 8.818H8.817A8.817 8.817 0 0 1 0 86.738Z" />
        </Mask>
        <Path
            fill={color}
            d="M-8 86.738C-8 62.03 12.03 42 36.738 42h8.524C69.97 42 90 62.03 90 86.738H74C74 70.867 61.133 58 45.262 58h-8.524C20.867 58 8 70.867 8 86.738H-8Zm98 0c0 9.288-7.53 16.818-16.817 16.818H8.817C-.47 103.556-8 96.026-8 86.738H8c0 .452.366.818.817.818h64.366a.817.817 0 0 0 .817-.818h16ZM8.817 103.556C-.47 103.556-8 96.026-8 86.738-8 62.03 12.03 42 36.738 42v16C20.867 58 8 70.867 8 86.738c0 .452.366.818.817.818v16ZM45.262 42C69.97 42 90 62.03 90 86.738c0 9.288-7.53 16.818-16.817 16.818v-16a.817.817 0 0 0 .817-.818C74 70.867 61.133 58 45.262 58V42Z"
            mask="url(#a)"
        />
        <Circle cx={41} cy={23} r={19} stroke={color} strokeWidth={8} />
    </Svg>
)
export default SvgComponent