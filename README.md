# React Router Active Component

A factory function for creating [React](http://facebook.github.io/react)
omponents which get a special `className` when a specified
[React Router](https://github.com/rackt/react-router) route is active, and can
also handle creating a link to the route.

The primary use case for this module is making it convenient to create
components which contain a link to a route but put the active class name on the
container rather than the link:

**Using React Router <Link/>**

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
be given when active, in the same way as `Link`.

The component's children will be wrapped in the given tag name or component - by
default, children will be used as contents for a `Link`.

### `component`: `String`|`ReactComponent`

This can be anything that can be passed as the first argument to
[`React.createElement()`](http://facebook.github.io/react/docs/top-level-api.html#react.createelement)
- a tag name or a `ReactComponent` which will be used to wrap the component's
children.

```javascript
var NavItem = createActiveRouteComponent('li')
```

If a custom React component is given, the following props will be passed to it
when rendering:

* `active` (Boolean) - `true` if the specified route is active, `false` otherwise.
* `className` (String) - containings any `className` passed to the active
component plus its `activeClassName`, if active.

### `options`

An options object with the following properties:

#### `link`: `Boolean` (default: `true`)

If `true`, the component's `props` and `children` be used to create a `<Link/>`.
Otherwise, its `children`` will just be wrapped in the specified `component`.

```javascript
var ActiveParagraph = createActiveRouteComponent('p', {link: false})
```

### Component Props

The component created by `createActiveRouteComponent()` takes the same props as
React Router's `Link` component These are:

* `to` - a route name.
* `params` - optional URL parameter object.
* `query` - optional query parameters object.
* `activeClassName` - the class name to be used when the component is active.
* `onClick` - a custom handler for the Link's click event.

See the [Link docs](https://github.com/rackt/react-router/blob/master/docs/api/components/Link.md)
for more details.

## Example

Live version: http://insin.github.io/react-router-active-component

```javascript
var React = require('React')
var {DefaultRoute, Route, RouterHandler} = require('react-router')

var NavItem = createActiveRouteComponent('li')

var ActivePara = createActiveRouteComponent('p', {link: false})

var App = React.createClass({
  render() {
    return <div className="App container">
      <nav className="navbar navbar-default" role="navigation">
        <div className="container">
          <span className="navbar-brand">Example App</span>
          <ul className="nav navbar-nav">
            <NavItem to="dashboard">Dashboard</NavItem>
            <NavItem to="mytasks">My Tasks</NavItem>
          </ul>
        </div>
      </nav>
      <RouteHandler/>
    </div>
  }
})

var Dashboard = React.createClass({
  render() {
    return <div className="Dashboard">
      <h2>Dashboard</h2>
      <p>I'm a regular paragraph.</p>
      <ActivePara to="dashboard" className="special">
        I'm a special, active paragraph.
      </ActivePara>
    </div>
  }
})

var MyTasks = React.createClass({
  render() {
    return <div className="MyTasks">
      <h2>My Tasks</h2>
    </div>
  }
})

var routes = <Route handler={App} path="/">
  <DefaultRoute name="dashboard" handler={Dashboard}/>
  <Route name="mytasks" path="/mytasks" handler={MyTasks}/>
</Route>

ReactRouter.run(routes, function(Handler) {
  React.render(<Handler/>, document.body)
})
```

### MIT Licensed