import React, {PropTypes as t} from 'react'
import Link from 'react-router/lib/Link'
import withRouter from 'react-router/lib/withRouter'

let {toString} = Object.prototype

let typeOf = o => toString.call(o).slice(8, -1).toLowerCase()

function createLocationDescriptor({to, query, hash, state}) {
  if (typeOf(to) === 'string') {
    return {pathname: to, query, hash, state}
  }
  return {query, hash, state, ...to}
}

module.exports = function activeComponent(Component, options) {
  if (!Component) {
    throw new Error('activeComponent() must be given a tag name or React component')
  }

  options = {
    link: true,
    linkClassName: undefined,
    ...options,
  }

  let ActiveComponent = React.createClass({
    propTypes: {
      activeClassName: t.string.isRequired,
      router: t.object.isRequired,
      to: t.oneOfType([t.string, t.object]).isRequired,

      activeStyle: t.object,
      className: t.string,
      hash: t.string,
      link: t.bool,
      linkProps: t.object,
      onlyActiveOnIndex: t.bool,
      query: t.object,
    },

    getDefaultProps() {
      return {
        activeClassName: 'active',
        link: options.link,
        onlyActiveOnIndex: false,
      }
    },

    render() {
      let {
        link, linkProps,
        to, query, hash, state, onlyActiveOnIndex,
        activeClassName, activeStyle,
        router,
        ...props,
      } = this.props
      let location = createLocationDescriptor({to, query, hash, state})

      if (router) {
        let active = router.isActive(location, onlyActiveOnIndex)
        if (typeOf(Component) !== 'string') {
          props.active = active
        }

        if (active) {
          if (activeClassName) {
            props.className = `${props.className || ''}${props.className ? ' ' : ''}${activeClassName}`
          }
          if (activeStyle) {
            props.style = {...props.style, activeStyle}
          }
        }
      }

      if (!link) {
        return <Component {...props}>{this.props.children}</Component>
      }
      return <Component {...props}>
        <Link className={options.linkClassName} {...linkProps} to={location}>
          {this.props.children}
        </Link>
      </Component>
    }
  })

  return withRouter(ActiveComponent)
}
