import React, { Component } from "react";
import "./App.css";
import Graph from "./Graph";

const url = 'https://api.tiingo.com/tiingo/daily/';
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const dateTitle = "date";
const closeTitle = "close";
var headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token 5c55cabb26b73f033301e8d556368a6acdad40e2',
        };

var ticker = 'aapl'
var startDate = '2018-10-04'
let randomData = () =>
  Array.from({ length: 11 }, () => Math.floor(Math.random() * 100));

var tempData = {labels: [], datasets: []};


class App extends Component {
  state = {
    data : {
      labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
      datasets: [
        {
          color: "light-blue",
          values: randomData()
        }
      ]
    }
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Exponential Moving Average Charts</h1>
        </header>
        <Graph
          title="Line Chart"
          type="line"
          data={ this.state.data }
          show_dots={false}
          heatline
          region_fill
        />
      </div>
    );
  }
  rerender = () => {
    this.setState({
      data : tempData
    });
  };

  componentDidMount(){
    fetch(proxyurl + url + ticker + '/' + 'prices?startDate=' + startDate, { method: 'GET', headers: headers})
    .then(res => res.json())
      .then(data => 
        {
          tempData.datasets.push(({values: []}));
          data.forEach(day => {
            tempData.datasets[0].values.push(day[closeTitle]);
            tempData.labels.push(day[dateTitle]);
          });
          this.rerender();
        }
      )
      .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"));
	}
}

export default App;