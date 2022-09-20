import {
  Text,
  TextInput,
  Textarea,
  Button,
  Group,
  Modal,
} from '@mantine/core'
import { FormEvent, useState } from 'react'
import { supabase } from '../client'

type Props = {
  fetchPosts: () => void
}

export function CreatePost({fetchPosts}:Props) {
  const [post, setPost] = useState({ title: '', content: '' })
  const [opened, setOpened] = useState(false);
  const { title, content } = post

  async function createPost(event: FormEvent) {
    event.preventDefault()
    await supabase.from('posts').insert([{ title, content }]).single()
    setPost({ title: '', content: '' })
    setOpened(false)
    fetchPosts()
  }
  return (
    <>
      <Modal 
        opened={opened}
        onClose={() => setOpened(false)}
        title="Criar Post">
        <form
            onSubmit={createPost}
          >
            <div>
              <TextInput
                mt="md"
                label="Título"
                placeholder="Título"
                required
                onChange={e => setPost({ ...post, title: e.target.value })}
              />

              <Textarea
                mt="md"
                label="Conteúdo"
                placeholder="Digite aqui o texto do seu conteúdo"
                minRows={3}
                onChange={e => setPost({ ...post, content: e.target.value })}
              />

              <Group position="right" mt="md">
                <Button type="submit">
                  Salvar
                </Button>
              </Group>
            </div>
          </form>
      </Modal>
      <Button onClick={() => setOpened(true)}>Criar Post</Button>
    </>
  )
}
