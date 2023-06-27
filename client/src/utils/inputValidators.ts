export function loginValidation(login: string) {
    if (login.length === 0) return { error: true, errorText: 'Pole login nie może być puste' }
    if (login.length < 4)
        return {
            error: true,
            errorText: 'Login musi składać się z co najmniej 4 znaków'
        }
    if (login.length > 15)
        return {
            error: true,
            errorText: 'Login nie może być dłuższy niż 15 znaków'
        }
    return { error: false, errorText: '' }
}

export function passwordValidation(password: string) {
    if (password.length < 6)
        return {
            error: true,
            errorText: 'Hasło musi składać się z co najmniej 6 znaków'
        }
    return { error: false, errorText: '' }
}

export function repeatPasswordValidation(password: string, repeatPassword: string) {
    if (password !== repeatPassword) return { error: true, errorText: 'Hasła się nie zgadzają' }
    return { error: false, errorText: '' }
}

export const keyValidation = (key: string) => {
    if (key.length === 0) return { error: true, errorText: 'Pole klucz nie może być puste' }
    if (!/^\d+$/.test(key)) return { error: true, errorText: 'Kod składa się tylko z cyfr' }
    if (key.length !== 6) return { error: true, errorText: 'Kod musi mieć dokładnie 6 cyfr' }
    return { error: false, errorText: '' }
}
