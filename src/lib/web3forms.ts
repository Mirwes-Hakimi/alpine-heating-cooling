const WEB3FORMS_ACCESS_KEY = 'a0afc0c6-9650-4e4f-b53f-11b9200a8e58'

export async function submitToWeb3Forms(data: Record<string, string>): Promise<boolean> {
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ access_key: WEB3FORMS_ACCESS_KEY, ...data }),
    })
    const result = await res.json()
    return result.success === true
  } catch {
    return false
  }
}
