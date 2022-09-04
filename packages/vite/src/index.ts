import generate from "cssified-html"

const virtualModuleId = 'cssified-html.css'
const resolvedVirtualModuleId = '\0' + virtualModuleId

const storedCode = {} as {[key: string]: string}

export default function plugin() {
    return [
        {
            name: 'cssified-html:pre',
            enforce: 'pre',
            resolveId(id: string) {
                if (id === virtualModuleId)  return resolvedVirtualModuleId
            },
            transform(code: string, id: string) {
                storedCode[id] = code
            },
            transformIndexHtml(code: string)
            {
                storedCode['__index__'] = code
            }
        },
        {
            name: 'cssified-html:post',
            enforce: 'post',
            resolveId(id: string) {
                if (id === virtualModuleId) return resolvedVirtualModuleId
            },
            load(id: string) {
                if (id === resolvedVirtualModuleId)
                {
                    return generate(Object.values(storedCode).join(''))
                }
            }
        }
    ]
}