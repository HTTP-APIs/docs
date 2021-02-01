import React from 'react';
import ReactDOM from 'react-dom';
const fetch = require("node-fetch");

export default class Docs extends React.Component{

  state = {
    doc_maker_data: 0,
    doc_maker_functions : 0,
  };
  async componentDidMount(){
    const doc_maker_data = await fetch("https://cors-anywhere.herokuapp.com/"+"https://readthedocs.org/api/v2/embed/?project=hydra-python-core&version=latest&doc=index&section=doc_maker",
    ).then(response => {return response.json()} );
    const doc_maker_functions = await fetch("https://cors-anywhere.herokuapp.com/"+"https://readthedocs.org/api/v2/embed/?url=https://hydra-python-core.readthedocs.io/en/develop/doc_maker.html",
    ).then(response => {return response.json()} );
    this.setState({doc_maker_data : doc_maker_data,doc_maker_functions:doc_maker_functions })
    
    // Cleaning the embedded HTML
    let child = document.querySelectorAll('a.headerlink');
    let i = 0;
    for(i=0;i < child.length;i++)
     {
      child[i].parentNode.removeChild(child[i]);
     }
    child = document.getElementById("doc-maker").querySelectorAll('h2')
    child[0].parentNode.removeChild(child[0])
    child = document.getElementById("module-hydra_python_core.doc_maker").querySelectorAll('h1')
    child[0].parentNode.removeChild(child[0])
    
  }
  render()
  {
  return(
    <div>
    <div dangerouslySetInnerHTML={{__html: (this.state.doc_maker_data.content)}}></div>
    <div dangerouslySetInnerHTML={{__html: (this.state.doc_maker_functions.content)}}></div>
    </div>
);
  }
}
