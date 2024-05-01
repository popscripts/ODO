const palette = {
    neutral100: '#FFFFFF',
    neutral200: '#F6F6F6',
    neutral300: '#878794',
    neutral400: '#61617a',
    neutral500: '#54546e',
    neutral600: '#48445c',
    neutral700: '#303041',
    neutral800: '#18181F',
    neutral900: '#000000',

    primary100: '#2cee81',
    primary200: '#2ad375',
    primary300: '#099848',
    primary400: '#087c38',

    secondary100: '#b558ec',
    secondary200: '#9e43d3',
    secondary300: '#7723ad',

    tertiary200: '#28a6dc',
    tertiary300: '#0076a8',

    quaternary100: '#ef5c5c',
    quaternary200: '#d33a3a',
    quaternary300: '#b71818',

    quinary100: '#ffbc41',
    quinary200: '#eea833',
    quinary300: '#ee9e1d',
    quinary400: '#E5AD42',

    accent100: '#FFDC23',

    angry100: '#bd001c22',
    angry500: '#bd001c',

    overlay22: '#00000022',
    overlay50: 'rgba(48,48,65, 0.5)',
    overlay85: 'rgba(48,48,65, 0.85)',
    blackoverlay60: 'rgba(0,0,0, 0.60)',
    blackoverlay80: 'rgba(0,0,0, 0.80)'
} as const

export const colors = {
    palette,

    transparent: 'rgba(0, 0, 0, 0)',

    text: palette.neutral200,

    textDim: palette.neutral300,

    background: palette.neutral700,

    border: palette.neutral400,

    tint: palette.primary300,

    separator: palette.neutral300,

    error: palette.angry500,

    errorBackground: palette.angry100
}
