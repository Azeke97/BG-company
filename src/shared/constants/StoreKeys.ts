import { capitalize } from 'lodash-es'

export class StoreKeys {
  static Translations = 'translations'
  static Navigation = 'navigation'
  static User = 'user'

  // Auth
  static Auth = (type: string) => `auth${capitalize(type)}`
  static AuthClient = StoreKeys.Auth('client')
  static AuthShareholder = StoreKeys.Auth('shareholder')
  static AuthApplicant = StoreKeys.Auth('applicant')
  static AuthEDSQR = StoreKeys.Auth('EDSQR')

  // Objects
  static Objects = 'objects'
}
