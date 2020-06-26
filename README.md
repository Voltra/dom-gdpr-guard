# dom-gdpr-guard
>  Vanilla JavaScript binding to use gdpr-guard as efficiently and easily as possible

<center><img src="https://github.com/Voltra/dom-gdpr-guard/raw/dev/dom-gdpr-guard.png" alt="Logo" width="250"/></center>

This library defines logic to display GDPR settings and allow to easily modify and save them.

If you need any help, you're more than welcome on my [official Discord server](https://discordapp.com/invite/JtWAjbw) dedicated to my open-source projects.

You can read the online documentation [here](https://voltra.github.io/dom-gdpr-guard/) and take a look at a [very simple example](https://github.com/Voltra/dom-gdpr-guard/tree/master/example).

## How to import

```javascript
//// ES6
import {
    gdprGuard, // everything that gdpr-guard exports
    // you could also directly import from gdpr-guard as it's a dependency
    render,
    renderInside,
} from "dom-gdpr-guard"

//// Node
const {
    gdprGuard, // everything that gdpr-guard exports
    // you could also directly import from gdpr-guard as it's a dependency
    render,
    renderInside,
} = require("dom-gdpr-guard");

//// Browser
const {
    gdprGuard, // everything that gdpr-guard exports
    render,
    renderInside,
} = window.domGdprGuard;
```

## What's available ?

```typescript
declare const renderInside: (target: Element, gdpr: GdprPayload, payload: RenderPayload) => Promise<ReRenderFunction>;

declare const render: (gdpr: GdprPayload, payload: RenderPayload) => Promise<Rendered>;

declare interface GdprPayload{
	savior: GdprSavior;
	managerFactory: GdprManagerFactory;
}

// render function : (subRenderFunction, savior, gdprItem) => Rendered
declare interface RenderPayload{
	renderManager: ManagerRenderFunction;
	renderGroup: GroupRenderFunction;
	renderGuard: GuardRenderFunction;
}

type Rendered = Element;
type ReRenderFunction = () => Promise<void>;
```

### render

`render` is a function that allows to render the GDPR state using the provided render functions, manager factory and gdpr savior.

It returns the rendered element so that you can mount it yourself in the DOM.

### renderInside

`renderInside` is a function that allows to render the GDPR state inside a container using the container as well as the provided render functions, manager factory and gdpr savior.

It returns a function that when called will smartly re-render the GDPR state to avoid the pain of manually handling updates efficiently (it uses DOM diffing).

## Savior API

The [Savior API](https://voltra.github.io/gdpr-guard/interfaces/gdprsavior.html) is mainly designed for library developers, therefore you might need an additional library to provide with the savior you may need (e.g. `gdpr-guard-local` for local storage).

## Design choices

From a design stand point, it's been a common trend across all my libraries to expose my APIs as asynchronous if users might need to use their own asynchronous code inside. That comes from the idea that integrating asynchronous code inside code that is required to be synchronous makes it really difficult to interface properly.

As such, even though I use the term `return` in the previous descriptions, it's more accurate to say that the returned promise **resolves** to the described value. 

That does not mean in any way that you **have to** return a promise, we can `await` on non-promise values and they will resolve immediately. Although, for good measures, if you can mark your functions as `async`, that would avoid any issues and the code inside would still be the same.

One of the advantages of using promises and asynchronous functions as an API designer is that error handling is "covered for free" with the promises's exception propagation mecanisms.

