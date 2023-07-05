import React, { useCallback } from 'react'
import ScreenWrapper from '../components/ScreenWrapper/ScreenWrapper'
import MainHeader from '../containers/MainHeader/MainHeader'
import MapClassrooms from '../containers/MapClassrooms'
import ClassroomSection from '../components/ClassroomSection/ClassroomSection'
import { Scroll } from '../components/commonStyles'
import Footer from '../components/Footer/Footer'
import { useParsedClassrooms } from '../providers/ClassroomProvider'
import { RefreshControl } from 'react-native'

function MainScreen() {
    const classrooms = useParsedClassrooms()

    const [refreshing, setRefreshing] = React.useState(false)

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        setTimeout(() => {
            setRefreshing(false)
        }, 1000)
    }, [])

    return (
        <ScreenWrapper>
            <Scroll refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <MainHeader />
                <ClassroomSection title={'Wolne Sale'}>
                    <MapClassrooms status={'free'} data={classrooms?.free} />
                </ClassroomSection>
                <ClassroomSection title={'Zajęte Sale'}>
                    <MapClassrooms status={'busy'} data={classrooms?.busy} />
                </ClassroomSection>
                <ClassroomSection title={'Zarezerwowane Sale'}>
                    <MapClassrooms status={'reserved'} data={classrooms?.reserved} />
                </ClassroomSection>
                <Footer />
            </Scroll>
        </ScreenWrapper>
    )
}

export default MainScreen
