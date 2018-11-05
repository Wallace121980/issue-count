import React, { Component } from 'react';
import './App.css';

let fileReader;

class App extends Component {
  state = {
    csvData: []
  }

  csvToJson = csv => {
    const [firstLine, ...lines] = csv.split('\r\n');
    return lines.map(line =>
      firstLine.split(';').reduce(
        (curr, next, index) => ({
          ...curr,
          [next]: line.split(';')[index],
        }),
        {}
      )
    );
  };

  handleFileRead = (e) => {
    const content = fileReader.result;
    console.log(content);
    const csv = this.csvToJson(content);
    this.setState({
      csvData: csv
    })
  }

  handleFileChosen = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = this.handleFileRead;
    fileReader.readAsText(file);
  }

  onSortAsc(event, sortKey){
    const csvData = this.state.csvData;
    csvData.sort((a,b) => a[sortKey].localeCompare(b[sortKey]));
    this.setState({csvData})
  }

  onSortDesc(event, sortKey){
    const csvData = this.state.csvData;
    csvData.sort((a,b) => a[sortKey].localeCompare(b[sortKey])).reverse();
    this.setState({csvData})
  }


  render() {
    console.log(this.state.csvData);

    return (
      <div>
        <table id="customers">
          <thead>
            <tr>
              <th>First Name <button onClick={e => this.onSortAsc(e, 'first_name')}>Asc</button><button onClick={e => this.onSortDesc(e, 'first_name')}>Desc</button></th>
              <th>Surname <button onClick={e => this.onSortAsc(e, 'sur_name')}>Asc</button><button onClick={e => this.onSortDesc(e, 'sur_name')}>Desc</button></th>
              <th>Issue Count <button onClick={e => this.onSortAsc(e, 'issue_count')}>Asc</button><button onClick={e => this.onSortDesc(e, 'issue_count')}>Desc</button></th>
              <th>Date of Birth <button onClick={e => this.onSortAsc(e, 'date_of_birth')}>Asc</button><button onClick={e => this.onSortDesc(e, 'date_of_birth')}>Desc</button></th>
            </tr>
          </thead>
          <tbody>
            {this.state.csvData.map((item, key) => {
              console.log(JSON.stringify(item));
              return (
                <tr key={key}>
                  <td>{item.first_name}</td>
                  <td>{item.sur_name}</td>
                  <td>{item.issue_count}</td>
                  <td>{item.date_of_birth}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <form>
          <div className="col-25">
            <label>Choose File:</label>
          </div>
          <div className="col-75">
            <input  type="file" 
                    accept=".csv"
                    onChange={e => this.handleFileChosen(e.target.files[0])} />
          </div>
        </form>
      </div>
    );
  }
}

export default App;
