export class CookieHelper {
  public static getUserInfo(): string {
    const cookies = document.cookie.split('; ');
    const name = 'BZ-USER-ID=';

    for (const c of cookies) {
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }

    return '';
  }

  public static getToken(): string {
    const cookies = document.cookie.split('; ');
    const name = 'BZ-TOKEN=';

    for (const c of cookies) {
      if (c.indexOf(name) === 0) {
        return 'Bearer ' + c.substring(name.length, c.length);
      }
    }

    return '';
  }
}
