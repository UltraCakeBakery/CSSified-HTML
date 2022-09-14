import { getCSS, getMap } from '@cssified-html/core'
import merge from 'lodash.merge'

const virtualModuleId = 'CSSified-HTML.css'
const resolvedVirtualModuleId = '\0' + virtualModuleId

let map = {}

export default function plugin() 
{
	return [
		{
			name: 'CSSified-HTML:pre',
			enforce: 'pre',
			resolveId( id: string ) 
			{
				if ( id === virtualModuleId ) return resolvedVirtualModuleId
			},
			transform( code: string ) 
			{
				map = merge( map, getMap( code ) )
			},
			transformIndexHtml( code: string )
			{
				map = merge( map, getMap( code ) )
			}
		},
		{
			name: 'CSSified-HTML:post',
			enforce: 'post',
			resolveId( id: string ) 
			{
				if ( id === virtualModuleId ) return resolvedVirtualModuleId
			},
			load( id: string ) 
			{
				if ( id === resolvedVirtualModuleId ) return getCSS( map )
			}
		}
	]
}
