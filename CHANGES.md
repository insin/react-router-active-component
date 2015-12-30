Updated to React 0.14 and React Router 1.0.

Changed global variable exported from the UMD build from `createActiveComponent` to `reactRouterActiveComponent`

Switched to [nwb](https://github.com/insin/nwb) for development tooling.

Update use of context for React Router 1.0.x [adamcharnock][adamcharnock]

Added an `onlyActiveOnIndex` prop to match `<Link>`'s' API [adamcharnock][adamcharnock]

## 2.0.0 / 2015-04-03

Updated to React 0.13 and React Router 0.13.

Added an `activeStyle` prop for the created component, as per `<Link>` in
React Router 0.13.

A `style` prop will be passed to the wrapped component when the configured route
is active and an `activeStyle` prop has been given..

Added a `linkClassName` option when creating the component and as a prop for the
created component. The option sets the default value for the prop. When
provided, this will always be used when rendering a `<Link>`.

## 1.0.0 / 2015-01-08

Version bunp to update package.json info on npm.

## 1.0.0 / 2015-01-07

First release.

[adamcharnock]: https://github.com/adamcharnock
