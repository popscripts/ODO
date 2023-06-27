import { API_URL } from '../config'

export function getImageSource(url: string | null) {
    return url ? { uri: API_URL + 'api/auth/picture/' + url } : require('../../assets/profile-picture.png')
}

export function translateAccountType(accountType: { id: number; accountType: string }) {
    switch (accountType.accountType) {
        case 'user':
            return 'Oprowadzający'
        case 'admin':
            return 'Administrator'
        case 'cook':
            return 'Kucharz'
        default:
            return 'Nieznana rola'
    }
}
