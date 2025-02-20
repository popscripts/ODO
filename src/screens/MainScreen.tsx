import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper/ScreenWrapper'
import MainHeader from '../containers/MainHeader/MainHeader'
import MapClassrooms from '../containers/MapClassrooms'
import ClassroomSection from '../components/ClassroomSection/ClassroomSection'
import { Scroll, Width100 } from '../components/commonStyles'
import Footer from '../components/Footer/Footer'
import { useClassroomContext } from '../providers/ClassroomProvider'
import MyTakenClassroomBox from '../containers/MyTakenClassroomBox/MyTakenClassroomBox'
import MyReservedClassroomBox from '../containers/MyReservedClassroomBox/MyReservedClassroomBox'
import { ClassroomSectionWrapper } from '../components/ClassroomSection/ClassroomSectionStyle'
import { useUserContext } from '../providers/UserProvider'

function MainScreen() {
    const { classrooms } = useClassroomContext()
    const { userData } = useUserContext()
    return (
        <ScreenWrapper>
            <Width100>
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
                    <MapClassrooms
                        status={'free'}
                        classrooms={classrooms.free}
                    />
                </ClassroomSection>
                <ClassroomSection title={'Zajęte Sale'}>
                    <MapClassrooms
                        status={'busy'}
                        classrooms={classrooms.busy}
                    />
                </ClassroomSection>
                <ClassroomSection title={'Zarezerwowane Sale'}>
                    <MapClassrooms
                        status={'reserved'}
                        classrooms={classrooms.reserved}
                    />
                </ClassroomSection>
                <Footer />
            </Width100>
        </ScreenWrapper>
    )
}

export default MainScreen
