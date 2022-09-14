import type { Plugin } from 'vite'
import { getCSS, getMap } from '@cssified-html/core'
import merge from 'lodash.merge'

const virtualModuleId = 'CSSified-HTML.css'

let map = {}

export default function plugin(): Plugin[] 
{
	return [
		{
			name: 'CSSified-HTML:pre',
			enforce: 'pre',
			resolveId( id: string ) 
			{
				if ( id === virtualModuleId ) return virtualModuleId
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
			handleHotUpdate({ server })
			{
				const module = server.moduleGraph.getModuleById( virtualModuleId )

				if ( !module ) return

				const timestamp = Date.now()

				server.ws.send(
					{
						type: 'update',
						updates: [
							{
								acceptedPath: module.url,
								path: module.url,
								type: 'css-update',
								timestamp
							}
						]
					}
				)
			},
			load( id: string ) 
			{
				if ( id === virtualModuleId ) return getCSS( map )
			}
		}
	]
}
