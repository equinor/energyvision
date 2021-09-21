/* eslint-disable */
import * as React from 'react'

export default class LegacyScriptLayout extends React.Component {
  componentDidMount () {
       const scriptTag = document.createElement('script')
        scriptTag.src = "/legacy/legacy.minified.js";
        document.body.appendChild(scriptTag)
  }
 
  render () {
    return (
       <div>{this.props.children}</div>
    )
  }
}