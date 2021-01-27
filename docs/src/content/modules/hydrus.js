import React from 'react';
import ReactDOM from 'react-dom';
const fetch = require("node-fetch");

export default class Docs extends React.Component{

  html = "";

  componentDidMount(){
  fetch("https://cors-anywhere.herokuapp.com/"+"https://readthedocs.org/api/v2/embed/?project=hydra-python-core&version=develop&doc=index&section=Welcome to hydra-python-core’s documentation!"
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
