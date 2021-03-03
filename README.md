<div>
    <img src="img/svelte-logo.png" alt="Svelte" height="100" />
    <span style="font-size: 80px; vertical-align: top; margin: 0 40px;">+</span>
    <img src="img/ackee.png" alt="Ackee" height="100" />
</div>

# Svelte module for Ackee

[Ackee](https://ackee.electerious.com/) is a self-hosted analytics tool for those who care about privacy and this module makes it easy to integrate with Svelte/Sapper.

## Installation

```
$ npm install --save svelte-ackee
```

## Usage

### With Sapper

Edit the `routes/_layout.svelte` and add following script:

```js
import { afterUpdate, beforeUpdate } from "svelte";
import { useAckeeSapper } from "svelte-ackee";

export let segment;

useAckeeSapper(
  beforeUpdate,
  afterUpdate,
  {
    server: "https://example.com", // Set to your Ackee instance
    domainId: "hd11f820-68a1-11e6-8047-79c0c2d9bce0", // Set to your domain ID
  },
  {
    ignoreLocalhost: false,
  }
);
```

See the demo in [`demos/sapper`](demos/sapper) directory.

### With Routify

Edit the `App.svelte` and add following:

```js
import { useAckeeSvelte } from "svelte-ackee";
import { afterPageLoad } from "@roxi/routify";

useAckeeSvelte(
  $afterPageLoad,
  {
    server: "https://example.com",
    domainId: "hd11f820-68a1-11e6-8047-79c0c2d9bce0",
  },
  {
    ignoreLocalhost: false,
  }
);
```

See the demo in [`demos/routify`](demos/routify) directory.
