## React Router Active Component

[![Travis][build-badge]][build]
[![Codecov][coverage-badge]][coverage]
[![npm package][npm-badge]][npm]

A factory function for creating [React](http://facebook.github.io/react) components which get a special `className` when a specified [React Router](https://github.com/rackt/react-router) route is active, and can also handle creating a link to the route.

The primary use case for this module is making it convenient to create components which contain a link to a route but put the active class name on the container rather than the link:

**Using React Router's `Link` component:**

```html
<ul>                           <ul>
  <li>                   =>      <li>
    <Link to="route">              <a href="/route" class="active">
      Link Text                      Link Text
```

**Using the `activeComponent()` factory function:**

```js
var NavLink = activeComponent('li')
```
```html
<ul>                           <ul>
  <NavLink to="route">   =>      <li class="active">
    Link Text                      <a href="/route">
                                     Link Text
```

### [Live Demo](http://insin.github.io/react-router-active-component) ([source](https://github.com/insin/react-router-active-component/blob/master/demo/app.jsx))

The demo shows:

* A `NavLink` component which creates a navigation `<li>` (including its `<a>`)
  which gets an `"active"` class, as required by Bootstrap's CSS.

  ```js
  var NavLink = activeComponent('li')
  ```

* An `ActivePara` component which creates a `<p>` which only gets a `"special"`
  class for a specific route.

  ```js
  var ActivePara = activeComponent('p', {link: false})
  ```
  ```html
  <ActivePara to="routename" activeClassName="special">...</ActivePara>
  ```

### Install

````
npm install react-router-active-component
```
```
var activeComponent = require('react-router-active-component')
// or
import activeComponent from 'react-router-active-component'
```

Browser bundles are available, which export a global `reactRouterActiveComponent` function and expect to find global `React` and `ReactRouter` variables to work with:

* [react-router-active-component.js](https://npmcdn.com/react-router-active-component/umd/react-router-active-component.js) (development version)
* [react-router-active-component.min.js](https://npmcdn.com/react-router-active-component/umd/react-router-active-component.min.js) (compressed production version)

### API

#### `activeComponent(component[, options])`

Creates a `ReactComponent` which takes the same props as React Router's [Link](https://github.com/rackt/react-router/blob/master/docs/api/components/Link.md) component to configure when it is considered active and which class it will be given when active.

The component's contents will be wrapped in the given tag name or component - by default, its children will be used as contents for a `<Link/>`.

##### `component`: `String` | `ReactComponent`

This can be anything that can be passed as the first argument to [`React.createElement()`](http://facebook.github.io/react/docs/top-level-api.html#react.createelement) - a tag name string or a `ReactComponent` which will be used to wrap the component's children.

```js
var NavItem = activeComponent('li')
```

If a custom React component is given, the following additional props will be passed to it when rendering:

* `active`: `Boolean` - `true` if the specified route is active, `false` otherwise.
* `className`: `String` - contains any `className` passed to the component plus its `activeClassName`, if active.
* `style`: `Object` - the `activeStyle` object passed to the component, if active.

##### `options`: `Object`

An options object with the following properties:

###### `link`: `Boolean` (default: `true`)

If `true`, the component's `props` and `children` be used to create a `<Link/>`. Otherwise, its `children` will just be wrapped in the specified `component`.

```js
var ActiveParagraph = activeComponent('p', {link: false})
```

###### `linkClassName` : `String` (default: `''`)

A `className` for the nested `<Link/>`.

#### Component Props

The component created by `activeComponent()` takes the same props as React Router's `Link` component.

See the [Link API docs](https://github.com/rackt/react-router/blob/v1.0.3/docs/API.md#link) for details.

### MIT Licensed

[build-badge]: https://img.shields.io/travis/insin/react-router-active-component/master.svg
[build]: https://travis-ci.org/insin/react-router-active-component

[coverage-badge]: https://img.shields.io/codecov/c/github/insin/react-router-active-component.svg
[coverage]: https://codecov.io/github/insin/react-router-active-component

[npm-badge]: https://img.shields.io/npm/v/react-router-active-component.svg
[npm]: https://www.npmjs.org/package/react-router-active-component
