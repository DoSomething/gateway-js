
# Gateway (JS)

This is a simple JavaScript API client for DoSomething.org service, modeled after the [Gateway](https://github.com/DoSomething/gateway) PHP API client.

### Installation
Install your own copy of Gateway JS using [npm](#):

```
npm install @dosomething/gateway --save
```

### Browser
Include the bundled `dist/gateway.js` in your page, or require it using a module bundler.

### Server
- Set valid ENV variables in your project. See: `.env.example`.
- Require the server module `@dosomething/gateway/server`.

### Usage

```javascript
/**
 * Browser
 * somefile.js
 */

import { RestApiClient, PhoenixAshes } from '@dosomething/gateway';

console.log(new RestApiClient());
console.log(new PhoenixAshes());


/**
 * Server
 * somefile.js
 */

 const { GatewayClient } = require('@dosomething/gateway/server');

 const gatewayClient = GatewayClient.getNewInstance();
```
