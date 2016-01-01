require('bootstrap/dist/css/bootstrap.min.css')
require('bootstrap/dist/css/bootstrap-theme.min.css')
require('./style.css')

import React from 'react'
import {render} from 'react-dom'
import {IndexRoute, Route, Router, hashHistory} from 'react-router'

import activeComponent from '../../src'

let NavItem = activeComponent('li')

let ActivePara = activeComponent('p', {link: false})

let App = React.createClass({
  render() {
    return <div className="App container">
      <nav className="navbar navbar-default" role="navigation">
        <div className="container">
          <span className="navbar-brand">Example App</span>
          <ul className="nav navbar-nav">
            <NavItem to="/" onlyActiveOnIndex>Dashboard</NavItem>
            <NavItem to="/tasks">Tasks</NavItem>
            <li>
              <p className="navbar-text"><code>&lt;li&gt;</code>s in this navbar get the <code>active</code>class</p>
            </li>
          </ul>
        </div>
      </nav>
      {this.props.children}
      <hr/>
      <footer>
        <a href="https://github.com/insin/react-router-active-component">Fork me on GitHub</a>
      </footer>
    </div>
  }
})

let Dashboard = React.createClass({
  render() {
    return <div className="Dashboard">
      <h2>Dashboard</h2>
      <p>I'm a regular paragraph.</p>
      <ActivePara to="/" activeClassName="special" onlyActiveOnIndex>
        I get highlighted because the Dashboard route is active.
      </ActivePara>
    </div>
  }
})

let Tasks = React.createClass({
  render() {
    return <div className="Tasks row">
      <div className="col-md-3">
        <ul className="nav nav-pills nav-stacked">
          <NavItem to="/tasks/all">All Tasks</NavItem>
          <NavItem to="/tasks/my">My Tasks</NavItem>
          <li>
            <p className="navbar-text"><code>&lt;li&gt;</code>s in this nav get the <code>active</code> class</p>
          </li>
        </ul>
      </div>
      <div className="col-md-9">
        <ActivePara to="/tasks/my" activeClassName="special">
          I get highlighted when the My Tasks route is active.
        </ActivePara>
        {this.props.children}
      </div>
    </div>
  }
})

let TasksDashboard = React.createClass({
  render() {
    return <div className="TasksDashboard">
      <h2>Tasks Dashboard</h2>
    </div>
  }
})

let AllTasks = React.createClass({
  render() {
    return <div className="AllTasks">
      <h2>All Tasks</h2>
    </div>
  }
})

let MyTasks = React.createClass({
  render() {
    return <div className="MyTasks">
      <h2>My Tasks</h2>
    </div>
  }
})

let routes = <Route path="/" component={App}>
  <IndexRoute component={Dashboard}/>
  <Route path="tasks" component={Tasks}>
    <IndexRoute component={TasksDashboard}/>
    <Route path="all" component={AllTasks}/>
    <Route path="my" component={MyTasks}/>
  </Route>
</Route>

render(<Router history={hashHistory} routes={routes}/>, document.querySelector('#demo'))
