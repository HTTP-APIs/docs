import React from 'react';
import ReactDOM from 'react-dom';
const fetch = require("node-fetch");

export default class Docs extends React.Component{

  html = "";

  async componentDidMount(){
  fetch("https://cors-anywhere.herokuapp.com/"+"https://readthedocs.org/api/v2/embed/?url=https://hydrus.readthedocs.io/en/latest/hydrus.html"
  ).then(response => {
    return response.json();
  }).then(data => {
    this.html = data.content[0];
    console.log(data);
  })
  }

      render()
          {
          return(
          <div  dangerouslySetInnerHTML={{
            __html: this.html
          }}>
          </div>
        );
      }

}
