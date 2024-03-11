import { Button } from 'antd'
import Typography from 'antd/es/typography/Typography'
import mqtt, { MqttClient } from 'mqtt'
import { useEffect, useState } from 'react'

const BROKER_URL = 'mqtt://localhost:1883'

export const MQTT_DEMO = () => {
  const [client, setClient] = useState<MqttClient>()
  const [connectStatus, setConnectStatus] = useState('Disconnected')
  const [payload, setPayload] = useState({ topic: '', message: '' })

  const mqttConnect = (
    host: string,
    mqttOption: mqtt.IClientOptions | undefined
  ) => {
    setConnectStatus('Connecting')
    setClient(mqtt.connect(host, mqttOption))
  }

  useEffect(() => {
    if (client) {
      console.log(client)
      client.on('connect', () => {
        setConnectStatus('Connected')
      })
      client.on('error', (err) => {
        console.error('Connection error: ', err)
        client.end()
      })
      client.on('reconnect', () => {
        setConnectStatus('Reconnecting')
      })
      client.on('message', (topic, message) => {
        const payload = { topic, message: message.toString() }
        setPayload(payload)
      })
    }
  }, [client])

  return (
    <div>
      <Button onClick={() => mqttConnect(BROKER_URL, undefined)}>
        Click here
      </Button>
      <Typography>{connectStatus}</Typography>
      <Typography>{`topic: ${payload.topic}`}</Typography>
      <Typography>{`message: ${payload.message}`}</Typography>
    </div>
  )
}
