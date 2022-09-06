import generate, { getCSS, getMap } from "cssified-html"
import type { Map } from "cssified-html/src/types"
import merge from 'lodash.merge'

const virtualModuleId = 'cssified-html.css'
const resolvedVirtualModuleId = '\0' + virtualModuleId

let map = {} as Map

export default function plugin() {
    return [
        {
            name: 'cssified-html:pre',
            enforce: 'pre',
            resolveId(id: string) {
                if (id === virtualModuleId)  return resolvedVirtualModuleId
            },
            transform(code: string, id: string) {
                map = merge(map, getMap(code))
            },
            transformIndexHtml(code: string)
            {
                map = merge(map, getMap(code))
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
                    return getCSS(map)
                }
            }
        }
    ]
}