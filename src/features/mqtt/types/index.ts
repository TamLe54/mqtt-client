export type TConnectClient = {
  topic: string
  payload: string | Buffer
  qos: 0 | 1 | 2
  retain: boolean
}

export type TOptions = {
  value: string | number
  label: string
}

export type TReceivedPayload = {
  topic: string
  message: string | Buffer
}
