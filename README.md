# React Router Active Component

A factory function for creating [React](http://facebook.github.io/react)
components which get a special `className` when a specified
[React Router](https://github.com/rackt/react-router) route is active, and can
also handle creating a link to the route.

The primary use case for this module is making it convenient to create
components which contain a link to a route but put the active class name on the
container rather than the link:

**Using React Router's `Link` component:**

```html
<ul>                           <ul>
  <li>                   =>      <li>
    <Link to="route">              <a href="/route" class="active">
      Link Text                      Link Text
```

**Using the `createActiveRouteComponent()` factory function:**

```javascript
var NavLink = createActiveRouteComponent('li')
```
```html
<ul>                           <ul>
  <NavLink to="route">   =>      <li class="active">
    Link Text                      <a href="/route">
                                     Link Text
```

## [Live Demo](http://insin.github.io/react-router-active-component) ([source](https://github.com/insin/react-router-active-component/blob/master/demo/app.jsx))

The demo shows:

* A `NavLink` component which creates a navigation `<li>` (including its `<a>`)
  which gets an `"active"` class, as required by Bootstrap's CSS.

  ```javascript
  var NavLink = createActiveRouteComponent('li')
  ```

* An `ActivePara` component which creates a `<p>` which only gets a `"special"`
  class for a specific route.

  ```javascript
  var ActivePara = createActiveRouteComponent('p', {link: false})
  ```
  ```html
  <ActivePara activeClassName="special">...</ActivePar>
  ```

## Install

**Node**

React Router Active Component can be used on the server, or bundled for the
client using an npm-compatible packaging system such as
[Browserify](http://browserify.org/) or [webpack](http://webpack.github.io/).

````
npm install react-router-active-component
```

**Browser**

The browser bundle exports a global ``createActiveRouteComponent`` variable and
expects to find global ``React`` and ``ReactRouter`` variables to work with.
You can find it in the
[/dist directory](https://github.com/insin/react-router-active-component/tree/master/dist).

## API: `createActiveRouteComponent(component[, options])`

Creates a `ReactComponent` which takes the same props as React Router's
[Link](https://github.com/rackt/react-router/blob/master/docs/api/components/Link.md)
component to configure when it is considered active and which class it will
be given when active.

The component's contents will be wrapped in the given tag name or component - by
default, its children will be used as contents for a `<Link/>`.

### `component`: `String`|`ReactComponent`

This can be anything that can be passed as the first argument to
[`React.createElement()`](http://facebook.github.io/react/docs/top-level-api.html#react.createelement) -
a tag name or a `ReactComponent` which will be used to wrap the component's
children.

```javascript
var NavItem = createActiveRouteComponent('li')
```

If a custom React component is given, the following additional props will be
passed to it when rendering:

* `active`: `Boolean` - `true` if the specified route is active, `false` otherwise.
* `className`: `String` - contains any `className` passed to the component plus
  its `activeClassName`, if active.

### `options`: `Object`

An options object with the following properties:

#### `link`: `Boolean` (default: `true`)

If `true`, the component's `props` and `children` be used to create a `<Link/>`.
Otherwise, its `children` will just be wrapped in the specified `component`.

```javascript
var ActiveParagraph = createActiveRouteComponent('p', {link: false})
```

### Component Props

The component created by `createActiveRouteComponent()` takes the same props as
React Router's `Link` component.

These are:

* `to` - a route name.
* `params` - optional URL parameter object.
* `query` - optional query parameters object.
* `activeClassName` - the class name to be used when the component is active.
* `onClick` - a custom handler for the Link's click event.

See the [Link docs](https://github.com/rackt/react-router/blob/master/docs/api/components/Link.md)
for more details.

### MIT Licensed