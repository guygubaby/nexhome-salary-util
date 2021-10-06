import { createPinia } from 'pinia'
import { createPersistPlugin } from 'pinia-persist-plugin'

export const store = createPinia().use(createPersistPlugin())
