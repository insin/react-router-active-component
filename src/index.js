import React, {PropTypes} from 'react'
import {Link} from 'react-router'

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
    ...options
  }

  return React.createClass({
    contextTypes: {
      router: PropTypes.object
    },

    propTypes: {
      activeClassName: PropTypes.string.isRequired,
      to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,

      activeStyle: PropTypes.object,
      className: PropTypes.string,
      hash: PropTypes.string,
      link: PropTypes.bool,
      linkProps: PropTypes.object,
      onlyActiveOnIndex: PropTypes.bool,
      query: PropTypes.object
    },

    getDefaultProps() {
      return {
        activeClassName: 'active',
        link: options.link,
        onlyActiveOnIndex: false
      }
    },

    render() {
      let {
        link, linkProps,
        to, query, hash, state, onlyActiveOnIndex,
        activeClassName, activeStyle,
        ...props
      } = this.props
      let location = createLocationDescriptor({to, query, hash, state})
      let {router} = this.context

      if (router) {
        props.active = this.context.router.isActive(location, onlyActiveOnIndex)
        if (props.active) {
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
}
