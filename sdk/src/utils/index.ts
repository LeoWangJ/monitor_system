import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { UID } from './config'

export async function getDeviceId () {
  const fp = await FingerprintJS.load()
  const result = await fp.get()
  return result.visitorId
}

export async function markUv () {
  const uid = localStorage.getItem(UID)
  if (uid !== undefined) {
    return uid
  } else {
    const did = await getDeviceId()
    const uid = `${did}${randomString()}`
    localStorage.setItem(UID, uid)
    return uid
  }
}

function randomString (len = 8) {
  const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789'
  const maxPos = $chars.length
  let pwd = ''
  for (let i = 0; i < len; i++) {
    pwd = $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd + `${new Date().getTime()}`
}
