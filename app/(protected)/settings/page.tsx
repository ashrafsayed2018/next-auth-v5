
import {auth, signOut} from "@/auth"
async function SettingsPage() {
    const session = await auth();
  
  return (
    <>
    <div>{JSON.stringify(session)}</div>

      <form action={async () => {
        "use server"
        await signOut()
      }}>
        <button type="submit">logout</button>
      </form>
    </>
  )
}

export default SettingsPage