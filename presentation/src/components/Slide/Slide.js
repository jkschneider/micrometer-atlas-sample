import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Slide.css';

import CodeMirror from 'react-codemirror';
import { Pos } from 'codemirror';
import 'codemirror/mode/http/http.js';
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/eclipse.css';

export default class Slide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stackLang: this.props.stackLang,
      queryParams: this.props.queryParams,
    }
  }

  componentDidMount() {
    this.refreshTimer = setInterval(
      () => {
        this.graph.src = this.graph.src.replace(/&random=.+/g, "&random=" + Date.now());
      },
      8000
    );
  }

  componentWillUnmount() {
    clearInterval(this.refreshTimer);
  }

  render()
  {
    let query = this.state.queryParams;
    let stackSingleLine = this.state.stackLang.split('\n').map(ln => ln.trim()).join('');

    return (
      <div className="slide">
        <h1>{this.props.title}</h1>

        <img
          ref={(graph) => { this.graph = graph; }}
          alt="graph"
          src={`http://localhost:7101/api/v1/graph?${query}&q=${stackSingleLine}&random=${Date.now()}`} />

        <CodeMirror
          className="mt-4"
          value={`GET /api/v1/graph?${query} HTTP/1.1\n${this.state.stackLang}`}
          options={{
            mode: 'http',
            theme: 'eclipse',
            extraKeys: {
              Tab: (cm) => cm.replaceSelection('  '),
              'Alt-Enter': (cm) => {
                let code = cm.doc.getValue();
                let getLine = code.split('\n')[0];
                this.setState({
                  stackLang: code.split('\n').splice(1).join('\n'),
                  queryParams: getLine.substring(getLine.indexOf('?')+1, getLine.indexOf("HTTP/")-1),
                })
              },
            },
          }} />
      </div>
    );
  }
}

Slide.propTypes = {
  title: PropTypes.string.isRequired,
  stackLang: PropTypes.string.isRequired,
  queryParams: PropTypes.string.isRequired,
};