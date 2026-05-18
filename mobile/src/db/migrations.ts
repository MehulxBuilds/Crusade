import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator'

import migrations from '../../drizzle/migrations'
import { db } from '@/db/db'

export function useDrizzleMigrations() {
  return useMigrations(db, migrations)
}
