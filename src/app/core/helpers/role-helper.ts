import { Role } from '../enums';

export class RoleHelper {
  public static getRole(): Role {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      if (cookie.indexOf('BZ-ROLE=') === 0) {
        switch (cookie.split('=')[1]) {
          case Role.admin:
            return Role.admin;
          case Role.driver:
            return Role.driver;
          case Role.passenger:
            return Role.passenger;
          default:
            return Role.passenger;
        }
      }
    }
    return Role.passenger;
  }
}
