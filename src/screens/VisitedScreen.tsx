import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper/ScreenWrapper'
import { MediumTextCenter, Scroll } from '../components/commonStyles'
import Footer from '../components/Footer/Footer'
import { useParsedClassrooms } from '../providers/ClassroomProvider'
import MapVisited from '../containers/MapVisited'
import ClassroomSection from '../components/ClassroomSection/ClassroomSection'
import { View } from 'react-native'

function MainScreen() {
    const classrooms = useParsedClassrooms()
    return (
        <ScreenWrapper>
            <Scroll keyboardShouldPersistTaps="handled">
                <ClassroomSection title={'Odwiedzone klasy'}>
                    <View />
                </ClassroomSection>
                <MapVisited classrooms={classrooms.visited} />
                {classrooms.visited.length === 0 && (
                    <MediumTextCenter>
                        Brak sal do wyświetlenia
                    </MediumTextCenter>
                )}
                <Footer />
            </Scroll>
        </ScreenWrapper>
    )
}

export default MainScreen