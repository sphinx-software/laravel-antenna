import React, { Suspense } from 'react'
import {
  AntennaProvider,
  Subscription,
  Subscriber
} from '@sphinx-software/antenna'
import { echo } from '@sphinx-software/laravel-echo-antenna-transport'
import Echo from 'laravel-echo'
import 'pusher-js'

const App = () => {
  return (
    <AntennaProvider
      transport={echo({
        echo: new Echo({
          broadcaster: 'pusher',
          key: '99ec60efe69b84de7f3c',
          cluster: 'ap1',
          forceTLS: true
        }),
        events: ['VideoProcessingEvent']
      })}
    >
      <Suspense fallback={'...'}>
        <Subscription
          initial={{}}
          channel='video.converter'
          reducer={(_, action: any) => action.payload}
        >
          <Subscriber
            component={({ state }) => <div>{JSON.stringify(state)}</div>}
          />
        </Subscription>
      </Suspense>
    </AntennaProvider>
  )
}

export default App
