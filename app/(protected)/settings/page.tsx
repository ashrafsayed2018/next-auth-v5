
import {auth} from "@/auth"
async function SettingsPage() {
    const session = await auth();
    console.log(session)
  return (
    <div>{JSON.stringify(session)}</div>
  )
}

export default SettingsPage