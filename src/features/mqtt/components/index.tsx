import mqtt, { IClientOptions, MqttClient } from 'mqtt'
import { createContext, useEffect, useState } from 'react'
import { qosOption } from '../constants'
import { TConnectClient, TOptions, TReceivedPayload } from '../types'
import Connection from './connection'
import Publisher from './publisher'
import Receiver from './receiver'
import Subscriber from './subscriber'

export const QosOption = createContext<TOptions[]>([])

const HookMqtt = () => {
  const [client, setClient] = useState<MqttClient>()
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [payload, setPayload] = useState<TReceivedPayload>({
    topic: '',
    message: '',
  })
  const [connectStatus, setConnectStatus] = useState<string>('Connect')

  const mqttConnect = (host: string, mqttOption: IClientOptions) => {
    setConnectStatus('Connecting')
    /**
     * if protocol is "ws", connectUrl = "ws://broker.emqx.io:8083/mqtt"
     * if protocol is "wss", connectUrl = "wss://broker.emqx.io:8084/mqtt"
     *
     * /mqtt: MQTT-WebSocket uniformly uses /path as the connection path,
     * which should be specified when connecting, and the path used on EMQX is /mqtt.
     *
     * for more details about "mqtt.connect" method & options,
     * please refer to https://github.com/mqttjs/MQTT.js#mqttconnecturl-options
     */
    setClient(mqtt.connect(host, mqttOption))
  }

  useEffect(() => {
    if (client) {
      // https://github.com/mqttjs/MQTT.js#event-connect
      client.on('connect', () => {
        setConnectStatus('Connected')
        console.log('connection successful')
      })

      // https://github.com/mqttjs/MQTT.js#event-error
      client.on('error', (err) => {
        console.error('Connection error: ', err)
        client.end()
      })

      // https://github.com/mqttjs/MQTT.js#event-reconnect
      client.on('reconnect', () => {
        setConnectStatus('Reconnecting')
      })

      // https://github.com/mqttjs/MQTT.js#event-message
      client.on('message', (topic, message) => {
        const payload = { topic, message: message.toString() }
        setPayload(payload)
        console.log(`received message: ${message} from topic: ${topic}`)
      })
    }
  }, [client])

  // disconnect
  // https://github.com/mqttjs/MQTT.js#mqttclientendforce-options-callback
  const mqttDisconnect = () => {
    if (client) {
      try {
        client.end(false, () => {
          setConnectStatus('Connect')
          console.log('disconnected successfully')
        })
      } catch (error) {
        console.log('disconnect error:', error)
      }
    }
  }

  // publish message
  // https://github.com/mqttjs/MQTT.js#mqttclientpublishtopic-message-options-callback
  const mqttPublish = (context: TConnectClient) => {
    if (client) {
      // topic, QoS & payload for publishing message
      const { topic, qos, payload, retain } = context
      console.log(retain)
      client.publish(topic, payload, { qos, retain }, (error) => {
        if (error) {
          console.log('Publish error: ', error)
        }
      })
    }
  }

  const mqttSub = (subscription: TConnectClient) => {
    if (client) {
      // topic & QoS for MQTT subscribing
      const { topic, qos } = subscription
      // subscribe topic
      // https://github.com/mqttjs/MQTT.js#mqttclientsubscribetopictopic-arraytopic-object-options-callback
      client.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
        console.log(`Subscribe to topics: ${topic}`)
        setIsSubscribed(true)
      })
    }
  }

  // unsubscribe topic
  // https://github.com/mqttjs/MQTT.js#mqttclientunsubscribetopictopic-array-options-callback
  const mqttUnSub = (subscription: TConnectClient) => {
    if (client) {
      const { topic, qos } = subscription
      client.unsubscribe(topic, { qos }, (error) => {
        if (error) {
          console.log('Unsubscribe error', error)
          return
        }
        console.log(`unsubscribed topic: ${topic}`)
        setIsSubscribed(false)
      })
    }
  }

  return (
    <>
      <Connection
        connect={mqttConnect}
        disconnect={mqttDisconnect}
        connectionStatus={connectStatus}
      />
      <QosOption.Provider value={qosOption}>
        <Subscriber
          subscribe={mqttSub}
          unsubscribe={mqttUnSub}
          displayUnsubscribe={isSubscribed}
        />
        <Publisher publish={mqttPublish} />
      </QosOption.Provider>
      <Receiver payload={payload} />
    </>
  )
}

export default HookMqtt
