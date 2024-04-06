import { WebView } from 'react-native-webview'
import ScreenWrapper from '../components/ScreenWrapper/ScreenWrapper'
import { Corner, Radius, Web, Wrapper } from './InfoScreenStyle'
import { Dimensions } from 'react-native'
import { useInfo } from '../providers/InfoProvider'
import { useHtml } from '../hooks/useHtml'

function InfoScreen() {
    const height = Dimensions.get('window').height
    const info = useInfo()
    return (
        <ScreenWrapper>
            <Wrapper height={height}>
                <Corner />
                <Radius />
                <Web source={{ html: useHtml(info) }} />
                <Radius />
            </Wrapper>
        </ScreenWrapper>
    )
}

export default InfoScreen
