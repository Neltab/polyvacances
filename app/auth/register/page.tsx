import { Suspense } from 'react'
import styles from './Register.module.css'
import RegisterForm from "./RegisterForm"

export default async function LogIn() {
  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.loginTitle}>Polyvacances</h1>
      <h2 className={styles.loginSubtitle}>Créer un compte</h2>
      <Suspense>
        <RegisterForm />
      </Suspense>
    </div>
  )
}