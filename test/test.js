import fs from 'fs'
import generate from '../packages/core/dist/index.js'

const html = fs.readFileSync('./test.html').toString()

const interations = 100_000
const generated = generate(html)
const time = new Date()

// for( let i = 0; i < interations; i++ ) generate(html)

// console.log( 'generated css: ' + (( new Date() - time ) / interations ) + 'ms average' )
console.log(generated)