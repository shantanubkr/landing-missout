const ACCESS_KEY = import.meta.env.VITE_WAITLIST_WEB3FORMS_ACCESS_KEY as
  | string
  | undefined

export type WaitlistPayload = {
  name: string
  collegeName: string
  email: string
}

export async function submitWaitlist(payload: WaitlistPayload): Promise<void> {
  if (!ACCESS_KEY) {
    throw new Error('The waitlist isn’t available right now. Please try again later.')
  }

  const name = payload.name.trim()
  const collegeName = payload.collegeName.trim()
  const email = payload.email.trim()

  let res: Response
  try {
    res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        subject: `Missout waitlist: ${name}`,
        from_name: 'Missout Waitlist',
        replyto: email,
        name,
        college_name: collegeName,
        email,
      }),
    })
  } catch {
    throw new Error('Network error. Please check your connection and try again.')
  }

  const data = (await res.json().catch(() => null)) as
    | { success?: boolean; message?: string }
    | null
  if (!res.ok || !data?.success) {
    throw new Error(data?.message ?? 'Could not join the waitlist right now. Please try again.')
  }
}
