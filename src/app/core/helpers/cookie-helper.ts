import { CapacitorCookies } from '@capacitor/core';

export async function setCapacitorCookie(key: string, value: any) {
  const date = new Date();
  date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);

  await CapacitorCookies.setCookie({
    path: '/',
    key,
    value,
    expires: date.toUTCString()
  });
}


// To be used when logging out
export async function deleteCookie(key: string) {
  await CapacitorCookies.deleteCookie({
    key
  });
}

export async function clearCookiesOnUrl() {
  await CapacitorCookies.clearCookies({});
}

export async function clearAllCookies() {
  await CapacitorCookies.clearAllCookies();
}
