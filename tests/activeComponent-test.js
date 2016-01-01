import expect from 'expect'
import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'
import {Route, Router} from 'react-router'
import createHistory from 'react-router/lib/createMemoryHistory'

import activeComponent from 'src/index'

describe('activeComponent', () => {
  it('must be given a tag name or React component', () => {
    expect(activeComponent).toThrow()
  })
  describe('main navigation link use case', () => {
    let NavLink = activeComponent('li')
    let node

    beforeEach(() => node = document.createElement('div'))
    afterEach(() => unmountComponentAtNode(node))

    let App = (props) => <div>
      <nav>
        <ul>
          <NavLink id="home-nav" to="/" onlyActiveOnIndex>Home</NavLink>
          <NavLink id="tasks-nav" to="/tasks">Tasks</NavLink>
        </ul>
      </nav>
      {props.children}
    </div>

    let Tasks = (props) => <h2>Tasks</h2>

    let renderApp = (path, cb) => render(
      <Router history={createHistory(path)}>
        <Route path="/" component={App}>
          <Route path="tasks" component={Tasks}/>
        </Route>
      </Router>,
      node,
      () => cb(node)
    )

    it('gets an "active" class by default when active (/)', done => {
      renderApp('/', node => {
        expect(node.querySelector('#home-nav').className).toEqual('active')
        expect(node.querySelector('#tasks-nav').className).toNotExist()
        done()
      })
    })

    it('gets an "active" class by default when active (/tasks)', done => {
      renderApp('/tasks', node => {
        expect(node.querySelector('#home-nav').className).toNotExist('onlyActiveOnIndex should apply')
        expect(node.querySelector('#tasks-nav').className).toEqual('active')
        done()
      })
    })
  })
})
