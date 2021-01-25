import React from 'react';
import ReactDOM from 'react-dom';
import DOMPurify from 'dompurify';
const fetch = require("node-fetch");

export default class Docs extends React.Component{

  state = {
    finaldata: 1,
  };

  async componentDidMount(){
    const data = await fetch("https://readthedocs.org/api/v2/embed/?url=https://hydrus.readthedocs.io/en/latest/hydrus.html",

  ).then(response => {return response.json()} );
    this.setState({finaldata : data})
    console.log(data);
    }

      render()
          {
          return(
          <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.state.finaldata.content)}}></div>
        );
      }

}
