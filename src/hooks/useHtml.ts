import { colors } from '../theme/colors'

export function useHtml(info: string) {
    return (
        '<!doctype html>\n' +
        '<html lang="pl">\n' +
        '<head>\n' +
        '    <meta charset="UTF-8">\n' +
        '    <meta name="viewport"\n' +
        '          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">\n' +
        '    <meta http-equiv="X-UA-Compatible" content="ie=edge">\n' +
        '    <link rel="preconnect" href="https://fonts.googleapis.com">\n' +
        '    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
        '    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">\n' +
        '    <style>\n' +
        '        * {\n' +
        '            font-family: "Inter", sans-serif;\n' +
        '            color: ' +
        colors.text +
        ';\n' +
        '\t\t\tbackground-color: ' +
        colors.palette.neutral600 +
        ';\n' +
        '        }\n' +
        '\n' +
        '        body {\n' +
        '            background-color: ' +
        colors.palette.neutral600 +
        ';\n' +
        '            padding: 10px;\n' +
        '        }\n' +
        '    </style>\n' +
        '    <title>Document</title>\n' +
        '</head>\n' +
        '<body>' +
        info +
        '</body>\n'
    )
}
