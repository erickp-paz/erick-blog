import { useState, useEffect } from 'react'
import { AppShell, Header, Group } from '@mantine/core'
import { supabase } from '../client'
import { ThemeSwitch } from '../components/ThemeSwitch'
import { CreatePost } from '../components/CreatePost'

type Post = {
  id: number
  title: string
  content: string
}

export function Home() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    const { data } = await supabase.from('posts').select('*')
    if (data) {
      setPosts(data)
    }
  }

  return (
    <>
      <AppShell
        padding="md"
        header={
          <Header height={60} p="xs">
            {
              <Group position='apart'>
                <CreatePost fetchPosts={fetchPosts} />
                <ThemeSwitch />
              </Group>
            }
          </Header>
        }
        styles={theme => ({
          main: {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.colors.gray[0]
          }
        })}
      >
        {posts.map(post => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))}
      </AppShell>
    </>
  )
}
