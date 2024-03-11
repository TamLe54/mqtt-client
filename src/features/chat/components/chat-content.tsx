import { Button, Form, Input } from 'antd'
import { useForm } from 'antd/es/form/Form'

export const ChatContent = () => {
  const [form] = useForm()

  const onFinish = () => {
    const message = form.getFieldValue('message')
    console.log(message)
  }

  return (
    <div className='h-full flex flex-col items-center justify-end'>
      <div></div>
      <Form
        form={form}
        onFinish={onFinish}
        className='w-full h-fit border-solid border-gray-200 border-t-2 p-3 flex flex-row items-center justify-between'>
        <Form.Item name='message' className='w-full'>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button htmlType='submit'>Send</Button>
        </Form.Item>
      </Form>
    </div>
  )
}
