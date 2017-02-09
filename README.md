# Gateway (JS)

This is a simple JavaScript API client for DoSomething.org service, modeled after the [Gateway](https://github.com/DoSomething/gateway) PHP API client.

### Installation
Install your own copy of Gateway JS using [npm](#):

```
npm install @dosomething/gateway --save
```

Include the bundled `dist/gateway.js` in your page, or require it using a module bundler.

### Usage

```javascript
//somefile.js

import { RestApiClient, PhoenixAshes } from '@dosomething/gateway';

console.log(new RestApiClient());
console.log(new PhoenixAshes());
```
