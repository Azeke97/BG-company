// @ts-ignore
import { NCALayerClient } from 'ncalayer-js-client/ncalayer-client'
import { NCA_EVENTS, WS_STATUSES } from '~/shared/libs/ncalayer/types'

export class NCALayerService extends EventTarget {
  private client: typeof NCALayerClient

  constructor() {
    super()
    this.client = new NCALayerClient('wss://127.0.0.1:13579', false)
  }

  get connectionState(): WS_STATUSES {
    return this.client?.wsConnection && this.client.wsConnection.readyState
  }

  checkConnected(withEvent: boolean = false) {
    const state = Boolean(this.client?.wsConnection && this.connectionState === WS_STATUSES.OPEN)

    if (withEvent) {
      this.dispatchEvent(
        new CustomEvent(NCA_EVENTS.checkConnected, {
          detail: state,
        })
      )
    }

    return state
  }

  private get isConnected() {
    return this.checkConnected()
  }

  async connect() {
    if (this.isConnected) return
    try {
      await this.client.connect()
    } catch {
      console.error('Ошибка подключения к NCALayer')
    }
  }

  private async clearSocket() {
    if (this.client.wsConnection) {
      await this.client.wsConnection.close()
      this.client.wsConnection = null
    }
  }

  async reconnect() {
    await this.clearSocket()
    await this.connect()
  }

  async disconnect() {
    if (!this.isConnected) return
    try {
      await this.clearSocket()
    } catch (error) {
      throw new Error('Ошибка отключения от NCALayer: ' + (error as Error).message)
    }
  }

  async signXML(content: string) {
    await this.ensureConnected()
    try {
      return await this.client.basicsSignXML(
        NCALayerClient.basicsStorageAll,
        content,
        NCALayerClient.basicsXMLParams,
        NCALayerClient.basicsSignerSignAny
      )
    } catch (error) {
      alert(String(error))
      return null
    }
  }

  async signCMS(content: string) {
    await this.ensureConnected()
    try {
      return await this.client.basicsSignCMS(
        NCALayerClient.basicsStorageAll,
        content,
        NCALayerClient.basicsCMSParamsAttached,
        NCALayerClient.basicsSignerSignAny
      )
    } catch (error) {
      alert(String(error))
      return null
    }
  }

  private async ensureConnected() {
    if (!this.isConnected) {
      await this.connect()
    }
  }
}
