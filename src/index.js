'use strict';

var React = require('react')
var assign = require('react/lib/Object.assign')
var {Link, State} = require('react-router')

function createActiveRouteComponent(component, options) {
  if (!component) {
    throw new Error('createActiveRouteComponent() must be given a wrapper component.')
  }
  options = assign({link: true}, options)

  return React.createClass({
    mixins: [State],

    propTypes: {
      activeClassName: React.PropTypes.string.isRequired,
      link: React.PropTypes.bool,
      to: React.PropTypes.string.isRequired,
      params: React.PropTypes.object,
      query: React.PropTypes.object,
      onClick: React.PropTypes.func
    },

    getDefaultProps() {
      return {
        activeClassName: 'active'
      , link: options.link
      }
    },

    getClassName() {
      var {className, activeClassName, to, params, query} = this.props
      var classNames = []
      if (className) {
        classNames.push(className)
      }
      if (this.isActive(to, params, query)) {
        classNames.push(activeClassName)
      }
      return classNames.join(' ')
    },

    render() {
      var props = assign({}, this.props, {
        active: this.isActive(this.props.to, this.props.params, this.props.query)
      , className: this.getClassName()
      })
      if (this.props.link) {
        // Only put classNames on the container
        var linkProps = assign({}, this.props, {
          className: ''
        , activeClassName: ''
        })
        return React.createElement(component, props,
          React.createElement(Link, linkProps, this.props.children)
        )
      }
      else {
        return React.createElement(component, props, this.props.children)
      }
    }
  })
}

module.exports = createActiveRouteComponent