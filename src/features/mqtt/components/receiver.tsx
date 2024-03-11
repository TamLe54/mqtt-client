import { Card, List } from 'antd'
import { useEffect, useState } from 'react'
import { TReceivedPayload } from '../types'

const Receiver = ({ payload }: { payload: TReceivedPayload }) => {
  const [messages, setMessages] = useState<TReceivedPayload[]>([])

  useEffect(() => {
    if (payload.topic) {
      setMessages((messages) => [...messages, payload])
    }
  }, [payload])

  const renderListItem = (item: TReceivedPayload) => (
    <List.Item>
      <List.Item.Meta
        title={item.topic}
        description={item.message.toString('utf-8')}
      />
    </List.Item>
  )

  return (
    <Card title='Receiver'>
      <List
        size='small'
        bordered
        dataSource={messages}
        renderItem={renderListItem}
      />
    </Card>
  )
}

export default Receiver
