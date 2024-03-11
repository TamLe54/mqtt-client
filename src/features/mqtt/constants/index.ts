import { IClientOptions } from 'mqtt'
import { TOptions } from '../types'

export const qosOption: TOptions[] = [
  {
    label: '0',
    value: 0,
  },
  {
    label: '1',
    value: 1,
  },
  {
    label: '2',
    value: 2,
  },
]

export const initialConnectionOptions: IClientOptions = {
  // ws or wss
  protocol: 'ws',
  host: 'broker.emqx.io',
  clientId: 'emqx_react_' + Math.random().toString(16).substring(2, 8),
  // ws -> 8083; wss -> 8084
  port: 8083,
  /**
   * By default, EMQX allows clients to connect without authentication.
   * https://docs.emqx.com/en/enterprise/v4.4/advanced/auth.html#anonymous-login
   */
  username: 'emqx_test',
  password: 'emqx_test',

}
