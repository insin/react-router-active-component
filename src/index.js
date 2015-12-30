import React, {PropTypes} from 'react'
import {Link} from 'react-router'

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
      history: PropTypes.object
    },

    propTypes: {
      activeClassName: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,

      activeStyle: PropTypes.object,
      className: PropTypes.string,
      link: PropTypes.bool,
      linkClassName: PropTypes.string,
      onlyActiveOnIndex: PropTypes.bool,
      query: PropTypes.object
    },

    getDefaultProps() {
      return {
        activeClassName: 'active',
        link: options.link,
        linkClassName: options.linkClassName,
        onlyActiveOnIndex: false
      }
    },

    render() {
      let {
        link, linkClassName,
        to, query, onlyActiveOnIndex, hash, state,
        activeClassName, activeStyle,
        ...props
      } = this.props

      props.active = this.context.history.isActive(to, query, onlyActiveOnIndex)
      if (props.active) {
        if (activeClassName) {
          props.className = `${props.className || ''}${props.className ? ' ' : ''}${activeClassName}`
        }
        if (activeStyle) {
          props.style = {...props.style, activeStyle}
        }
      }

      if (!link) {
        return <Component {...props}>{this.props.children}</Component>
      }

      // Only use active styles on the container
      let linkProps = {
        to, query, hash, state, onlyActiveOnIndex,
        activeClassName: null,
        activeStyle: null,
        className: linkClassName
      }
      return <Component {...props}>
        <Link {...linkProps}>{this.props.children}</Link>
      </Component>
    }
  })
}
