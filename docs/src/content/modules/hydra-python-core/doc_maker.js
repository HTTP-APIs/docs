import React from 'react';
import ReactDOM from 'react-dom';
import DOMPurify from 'dompurify';
const fetch = require("node-fetch");

export default class Docs extends React.Component{

  state = {
    doc_maker_data: 0,
    doc_maker_functions : 0,
  };
  async componentDidMount(){
    const doc_maker_data = await fetch("https://readthedocs.org/api/v2/embed/?project=hydra-python-core&version=latest&doc=index&section=doc_maker",
    ).then(response => {return response.json()} );
    const doc_maker_functions = await fetch("https://readthedocs.org/api/v2/embed/?url=https://hydra-python-core.readthedocs.io/en/develop/doc_maker.html",
    ).then(response => {return response.json()} );
    this.setState({doc_maker_data : doc_maker_data,doc_maker_functions:doc_maker_functions })
  }
  render()
  {
  return(
    <div>
    <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.state.doc_maker_data.content)}}></div>
    <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.state.doc_maker_functions.content)}}></div>
    </div>
);
  }
}
