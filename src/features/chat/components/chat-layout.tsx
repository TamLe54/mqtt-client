import { Button, Form, Input } from 'antd'
import { useState } from 'react'
import { ChatChannels } from './chat-channels'
import { ChatContent } from './chat-content'

export const ChatLayout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const onClick = (value: { username: string }) => {
    console.log(value.username)
    setIsLoggedIn((prev) => !prev)
  }

  return (
    <div className='w-full h-screen flex flex-col gap-4'>
      <Form
        onFinish={onClick}
        className='w-full h-1/6 p-2 flex flex-row gap-4 items-center justify-center'>
        <Form.Item name={'username'}>
          <Input />
        </Form.Item>

        <Form.Item>
          <Button htmlType='submit'>{isLoggedIn ? 'Log out' : 'Log in'}</Button>
        </Form.Item>
      </Form>
      {isLoggedIn && (
        <div className='w-full h-5/6 flex flex-row gap-3 '>
          <div className='h-full w-1/4 border-solid border-2 border-gray-200'>
            <ChatChannels />
          </div>
          <div className='h-full w-3/4 border-solid border-2 border-gray-200'>
            <ChatContent />
          </div>
        </div>
      )}
    </div>
  )
}
