const getContext = require('./bla')
import axios from 'axios'

class MyCustomReporter {
  constructor(globalConfig, options) {
    //this.context = getContext(false)
    this._globalConfig = globalConfig;
    this._options = options;
  }

  onRunComplete(contexts, results) {
    console.log('Custom reporter output:', context);
    console.log('context', )
  }
}

module.exports = MyCustomReporter;