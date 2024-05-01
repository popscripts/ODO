export function useConjugated(string: string) {
    let id = string.lastIndexOf('a')
    let temp = string.split('')
    temp[id] = 'ę'
    return temp.join('')
}
