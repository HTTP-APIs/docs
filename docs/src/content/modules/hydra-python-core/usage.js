import React from 'react';
import ReactDOM from 'react-dom';
const fetch = require("node-fetch");

export default class Docs extends React.Component{
  
 
  state = {
    usage_data : 0,
  };
  async componentDidMount(){
   
    const usage_data = await fetch("https://cors-anywhere.herokuapp.com/"+"https://readthedocs.org/api/v2/embed/?project=hydra-python-core&version=latest&doc=index&section=Usage",
    ).then(response => {return response.json()} );
    this.setState({usage_data:usage_data}) 
    
    // Cleaning the embedded HTML
    let child = document.querySelectorAll('a.headerlink');
      let i = 0;
      for(i=0;i < child.length;i++)
       {
        child[i].parentNode.removeChild(child[i]);
       }
        child = document.getElementById("usage").querySelectorAll("h2")
        child[0].parentNode.removeChild(child[0])
       
    }
  
  render()
  {
    console.log('Here')
  return(
    <div>
        <div dangerouslySetInnerHTML={{__html: (this.state.usage_data.content)}}></div>
    </div>
);
  }
}


