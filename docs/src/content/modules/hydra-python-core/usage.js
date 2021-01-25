import React from 'react';
import ReactDOM from 'react-dom';
import DOMPurify from 'dompurify';
const fetch = require("node-fetch");

export default class Docs extends React.Component{

  state = {
    usage_data : 0,
  };
  async componentDidMount(){
    const usage_data = await fetch("https://readthedocs.org/api/v2/embed/?project=hydra-python-core&version=latest&doc=index&section=Usage",
    ).then(response => {return response.json()} );
    this.setState({usage_data:usage_data})
  }
  render()
  {
  return(
    <div>
    <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.state.usage_data.content)}}></div>
    </div>
);
  }
}


