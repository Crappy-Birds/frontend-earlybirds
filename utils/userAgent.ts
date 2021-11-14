import { UAParser } from 'ua-parser-js'

let nWindow
if (typeof window !== 'undefined') {
  nWindow = window.navigator.userAgent
}
const parser = new UAParser(nWindow)
const { type } = parser.getDevice()

export const userAgent = parser.getResult()

export const isMobile = type === 'mobile' || type === 'tablet'
