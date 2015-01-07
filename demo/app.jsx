void function() { 'use strict'

var {DefaultRoute, Route, RouteHandler} = ReactRouter

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
            <NavItem to="tasks">Tasks</NavItem>
          </ul>
        </div>
      </nav>
      <RouteHandler/>
      <hr/>
      <footer>
        <a href="https://github.com/insin/react-router-active-component">Fork me on GitHub</a>
      </footer>
    </div>
  }
})

var Dashboard = React.createClass({
  render() {
    return <div className="Dashboard">
      <h2>Dashboard</h2>
      <p>I'm a regular paragraph.</p>
      <ActivePara to="dashboard" activeClassName="special">
        I get highlighted because the Dashboard route is active.
      </ActivePara>
    </div>
  }
})

var Tasks = React.createClass({
  render() {
    return <div className="Tasks row">
      <div className="col-md-3">
        <ul className="nav nav-pills nav-stacked">
          <NavItem to="all-tasks">All Tasks</NavItem>
          <NavItem to="my-tasks">My Tasks</NavItem>
        </ul>
      </div>
      <div className="col-md-9">
        <ActivePara to="my-tasks" activeClassName="special">
          I get highlighted when the My Tasks route is active.
        </ActivePara>
        <RouteHandler/>
      </div>
    </div>
  }
})

var TasksDashboard = React.createClass({
  render() {
    return <div className="TasksDashboard">
      <h2>Tasks Dashboard</h2>
    </div>
  }
})

var AllTasks = React.createClass({
  render() {
    return <div className="AllTasks">
      <h2>All Tasks</h2>
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

var routes = <Route handler={App}>
  <DefaultRoute name="dashboard" handler={Dashboard}/>
  <Route name="tasks" handler={Tasks}>
    <DefaultRoute handler={TasksDashboard}/>
    <Route name="all-tasks" path="all" handler={AllTasks}/>
    <Route name="my-tasks" path="my" handler={MyTasks}/>
  </Route>
</Route>

ReactRouter.run(routes, function(Handler) {
  React.render(<Handler/>, document.body)
})

}()