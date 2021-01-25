import React from 'react';
import ReactDOM from 'react-dom';
import DOMPurify from 'dompurify';
const fetch = require("node-fetch");

export default class Docs extends React.Component{

  state = {
    doc_writer_data: 0,
    doc_writer_templates : 0,
  };

  async componentDidMount(){
    const doc_writer_data = await fetch("https://readthedocs.org/api/v2/embed/?project=hydra-python-core&version=latest&doc=index&section=doc_writer",
    ).then(response => {return response.json()} );
    const doc_writer_templates = await fetch("https://readthedocs.org/api/v2/embed/?url=https://hydra-python-core.readthedocs.io/en/develop/doc_writer.html",
    ).then(response => {return response.json()} );
   
      this.setState({doc_writer_data: doc_writer_data,doc_writer_templates:doc_writer_templates })
    // console.log(data);
    }
      render()
          {
          return(
            <div>
            <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.state.doc_writer_data.content)}}></div>
            <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.state.doc_writer_templates.content)}}></div>
            <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.state.usage_data.content)}}></div>
            </div>
        );
          }
}
