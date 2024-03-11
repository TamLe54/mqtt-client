import { Button, Card, Checkbox, Col, Form, Input, Row, Select } from 'antd'
import { useContext } from 'react'
import { TConnectClient } from '../types'
import { QosOption } from './index'

type TPublisher = {
  publish: (_: TConnectClient) => void
}

const Publisher = ({ publish }: TPublisher) => {
  const [form] = Form.useForm()
  const qosOptions = useContext(QosOption)

  // topic, QoS for publishing message
  const record = {
    topic: 'test-topic/react',
    qos: 0,
  }

  const onFinish = () => {
    const formValues = form.getFieldsValue(true)
    publish(formValues)
  }

  const PublishForm = (
    <Form
      layout='vertical'
      name='basic'
      form={form}
      initialValues={record}
      onFinish={onFinish}>
      <Row gutter={20}>
        <Col span={12}>
          <Form.Item label='Topic' name='topic'>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label='QoS' name='qos'>
            <Select options={qosOptions} />
          </Form.Item>

          <Form.Item
            label='Retain Mesage'
            name='retain'
            valuePropName='checked'>
            <Checkbox />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label='Payload' name='payload'>
            <Input.TextArea />
          </Form.Item>
        </Col>
        <Col span={8} offset={16} style={{ textAlign: 'right' }}>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Publish
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )

  return <Card title='Publisher'>{PublishForm}</Card>
}

export default Publisher
