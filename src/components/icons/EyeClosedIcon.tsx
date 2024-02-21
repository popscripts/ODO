import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

type Props = {
    color: string
    size: number
}

const SvgComponent = ({ color, size }: Props) => (
    <Svg width={size} height={size} fill="none" viewBox="0 0 100 100">
        <Path
            stroke={color}
            strokeLinecap="round"
            strokeWidth={8}
            d="M13 39c4.5 5.833 12.5 19.5 37 19.5M87 39c-4.5 5.833-12.5 19.5-37 19.5M61 59l3.5 13M38.5 59 35 72M80 51l10 8.5M20 51l-10 8.5"
        />
    </Svg>
)
export default SvgComponent
