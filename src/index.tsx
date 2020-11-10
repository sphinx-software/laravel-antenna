import Echo from 'laravel-echo'

type Listener<T> = (message: T) => void
type Detach = () => void
interface Transporter {
  subscribe(channel: string, listener: Listener<unknown>): Detach
  authorize(channel: string): Promise<void>
  handshake(): Promise<void>
}

type EnvelopeEvent = {
  type: string
  payload: string
}

export default class EchoTransport implements Transporter {
  private isPrivate = false
  constructor(private readonly echo: Echo, private readonly events: string[]) {}

  public async authorize() {
    this.isPrivate = true
  }

  public async handshake() {}

  public subscribe(channel: string, listener: Listener<unknown>): Detach {
    const _channel = this.isPrivate
      ? this.echo.private(channel)
      : this.echo.channel(channel)

    this.events.forEach((eventName) => {
      _channel.listen(eventName, (event: EnvelopeEvent) => {
        listener({
          type: eventName,
          payload: event
        })
      })
    })

    return () => {
      this.echo.leave(channel)
    }
  }
}

export const echo = ({
  echo: laravelEcho,
  events
}: {
  echo: Echo
  events: string[]
}) => {
  return new EchoTransport(laravelEcho, events)
}
