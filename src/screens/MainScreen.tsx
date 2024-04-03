import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper/ScreenWrapper'
import MainHeader from '../containers/MainHeader/MainHeader'
import MapClassrooms from '../containers/MapClassrooms'
import ClassroomSection from '../components/ClassroomSection/ClassroomSection'
import { Scroll } from '../components/commonStyles'
import Footer from '../components/Footer/Footer'
import { useParsedClassrooms } from '../providers/ClassroomProvider'
import MyTakenClassroomBox from '../containers/MyTakenClassroomBox/MyTakenClassroomBox'
import { useUserData } from '../providers/AuthProvider'
import MyReservedClassroomBox from '../containers/MyReservedClassroomBox/MyReservedClassroomBox'
import { ClassroomSectionWrapper } from '../components/ClassroomSection/ClassroomSectionStyle'

function MainScreen() {
    const filters = useParsedClassrooms()
    const userData = useUserData()
    return (
        <ScreenWrapper>
            <Scroll keyboardShouldPersistTaps="handled">
                <MainHeader />
                <ClassroomSectionWrapper>
                    {userData.Group?.Taken && (
                        <MyTakenClassroomBox
                            classroom={userData.Group?.Taken}
                        />
                    )}
                    {userData.Group?.Reserved && (
                        <MyReservedClassroomBox
                            classroom={userData.Group?.Reserved}
                        />
                    )}
                </ClassroomSectionWrapper>
                <ClassroomSection title={'Wolne Sale'}>
                    <MapClassrooms status={'free'} filter={filters.free} />
                </ClassroomSection>
                <ClassroomSection title={'Zajęte Sale'}>
                    <MapClassrooms status={'busy'} filter={filters.busy} />
                </ClassroomSection>
                <ClassroomSection title={'Zarezerwowane Sale'}>
                    <MapClassrooms
                        status={'reserved'}
                        filter={filters.reserved}
                    />
                </ClassroomSection>
                <Footer />
            </Scroll>
        </ScreenWrapper>
    )
}

export default MainScreen
