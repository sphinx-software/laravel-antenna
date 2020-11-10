# @sphinx-software/laravel-antenna

> The Antenna transport that using built on top of Laravel Echo

[![NPM](https://img.shields.io/npm/v/@sphinx-software/laravel-antenna.svg)](https://www.npmjs.com/package/@sphinx-software/laravel-echo-antenna-transport) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @sphinx-software/laravel-antenna
```

## Usage

```tsx
import { echo } from '@sphinx-software/laravel-antenna'
import { AntennaProvider } from '@sphinx-software/antenna'

import Echo from 'laravel-echo'

const transport = echo({
  echo: new Echo({ 
      // ... your Laravel echo config here
  }),
  events: [ 
    // List of your events
  ]
})


const App = () => {
  return (
    <AntennaProvider transport={transport}>
      {/* Your app code here */}
    </AntennaProvider>
  )
}
```

## License

MIT © [monkey-programmer](https://github.com/monkey-programmer)
