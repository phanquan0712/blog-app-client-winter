import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PageRender from './PageRender'
import Header from './components/Global/Header'
import Footer from './components/Global/Footer'
import { refreshToken } from './redux/action/authAction'
import { Alert } from './components/alert/Alert'
import { gapi } from "gapi-script";
import { getCategory } from './redux/action/categoryAction'
import { getHomeBlogs } from './redux/action/blogAction'
import io from  'socket.io-client'
import SocketClient from './SocketClient'

import { API_URL } from './utils/config'
const App = () => {
  gapi.load("client:auth2", () => {
    gapi.client.init({
      clientId:
        "*****.apps.googleusercontent.com",
      plugin_name: "chat",
    });
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHomeBlogs())
    dispatch(getCategory())
    dispatch(refreshToken())
  }, [dispatch])


  useEffect(() => {
    const socket = io(API_URL);
    dispatch({ type: 'SOCKET', payload: socket })
    return () => {
      socket.close()
    }
  }, [])
  return (
    <div className="container">
      <SocketClient />
      <Router>
        <Header />
        <Alert />
        <Switch>
          <Route exact path='/' component={PageRender} />
          <Route exact path='/:page' component={PageRender} />
          <Route exact path='/:page/:slug' component={PageRender} />
        </Switch>
        <Footer />
      </Router>
    </div>
  )
}

export default App