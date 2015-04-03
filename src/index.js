'use strict';

var React = require('react')
var assign = require('react/lib/Object.assign')
var {Link} = require('react-router')

var PropTypes = React.PropTypes

function createActiveRouteComponent(Component, options) {
  if (!Component) {
    throw new Error('createActiveRouteComponent() must be given a wrapper component.')
  }

  options = assign({
    link: true,
    linkClassName: ''
  }, options)

  return React.createClass({
    contextTypes: {
      router: PropTypes.func.isRequired
    },

    propTypes: {
      activeClassName: PropTypes.string.isRequired,
      to: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object // React Router doesn't expose Route or its custom PropType
      ]).isRequired,

      activeStyle: PropTypes.object,
      link: PropTypes.bool,
      linkClassName: PropTypes.string,
      onClick: PropTypes.func,
      params: PropTypes.object,
      query: PropTypes.object
    },

    getDefaultProps() {
      return {
        activeClassName: 'active',
        className: '',
        link: options.link,
        linkClassName: options.linkClassName
      }
    },

    getActiveState() {
      return this.context.router.isActive(this.props.to, this.props.params, this.props.query)
    },

    getClassName() {
      var className = this.props.className
      if (this.getActiveState()) {
        className += ' ' + this.props.activeClassName
      }
      return className
    },

    render() {
      var props = assign({}, this.props, {
        active: this.getActiveState(),
        className: this.getClassName()
      })
      if (props.activeStyle && props.active) {
        props.style = props.activeStyle
      }
      if (this.props.link) {
        // Only use active styles on the container
        var linkProps = assign({}, this.props, {
          className: this.props.linkClassName,
          activeClassName: '',
          activeStyle: null
        })
        return React.createElement(Component, props,
          React.createElement(Link, linkProps, this.props.children)
        )
      }
      else {
        return React.createElement(Component, props, this.props.children)
      }
    }
  })
}

module.exports = createActiveRouteComponent