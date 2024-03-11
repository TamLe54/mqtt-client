import { Button, Card, Col, Form, Input, Row, Select } from 'antd'
import { useContext } from 'react'
import { TConnectClient } from '../types'
import { QosOption } from './index'

type TSubscribe = {
  subscribe: (subscription: TConnectClient) => void
  unsubscribe: (subscription: TConnectClient) => void
  displayUnsubscribe: boolean
}

const Subscriber = ({
  subscribe,
  unsubscribe,
  displayUnsubscribe,
}: TSubscribe) => {
  const [form] = Form.useForm()
  const qosOptions = useContext(QosOption)

  // topic & QoS for MQTT subscribing
  const record = {
    topic: 'test-topic/react',
    qos: 0,
  }

  const onFinish = () => {
    const formValues = form.getFieldsValue(true)
    subscribe(formValues)
  }

  const unsubscribeHandler = () => {
    const values = form.getFieldsValue()
    unsubscribe(values)
  }

  const SubForm = (
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
        </Col>
        <Col span={8} offset={16} style={{ textAlign: 'right' }}>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Subscribe
            </Button>
            {displayUnsubscribe ? (
              <Button
                type='primary'
                danger
                style={{ marginLeft: '10px' }}
                onClick={unsubscribeHandler}>
                Unsubscribe
              </Button>
            ) : null}
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )

  return <Card title='Subscriber'>{SubForm}</Card>
}

export default Subscriber
