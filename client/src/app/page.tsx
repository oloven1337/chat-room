import { RoomConnectionForm } from '@/app/components/room-connection-form'

import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <RoomConnectionForm />
    </div>
  )
}
