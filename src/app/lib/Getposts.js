// app/lib/Getposts.js
export async function fetchPosts() {
  try {
    const res = await fetch('/api/posts?limit=1000')  // ← Changed to proxy and added limit
    if (!res.ok) throw new Error('Failed to fetch')
    const data = await res.json()
 
    return data.docs || []
  } catch (error) {
    console.error('❌ fetchPosts error:', error)
    return []
  }
}
