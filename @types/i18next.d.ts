import 'i18next'

import type Resources from './resources'

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: Resources
  }
}
