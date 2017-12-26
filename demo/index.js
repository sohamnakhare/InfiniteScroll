import React from 'react';
import ReactDOM from 'react-dom';

import InfiniteScroll from '../src/InfiniteScroll.jsx';


class TestComponent extends React.Component {

   constructor(){
       super();
       this.state = {
           data:[],
           pageNumWin: 1,
           pageNumDiv: 1,
           pageSize: 100
       };
       for (var index = 0; index < 10000; index++) {
            this.state.data.push(index);           
       }
       this.loadMore = this.loadMore.bind(this);
       this.loadMoreDiv = this.loadMoreDiv.bind(this);
   } 

   loadMore() {
      this.setState({pageNumWin: this.state.pageNumWin + 1});
   }

   loadMoreDiv(){
    this.setState({pageNumDiv: this.state.pageNumDiv + 1});
   }

    render() {
        return(
            <div>
            <div style={{'float': 'right', width:'300px', height: '200px', overflow:'scroll'}}>
                <h1>Div scroll</h1>
                <InfiniteScroll loadMore={this.loadMoreDiv}>
                    <ul>
                        {
                            this.state.data.slice(0, this.state.pageNumDiv * this.state.pageSize)
                                .map((item, i)=>{
                                    return (<li key={i}>{item}</li>)
                            })
                        }
                    </ul>
                </InfiniteScroll>
            </div>
            <h1>Window Scroll</h1>
                <InfiniteScroll loadMore={this.loadMore.bind(this)} useWindow={true}>
                    <ul>
                        {
                            this.state.data.slice(0, this.state.pageNumWin * this.state.pageSize)
                                .map((item, i)=>{
                                    return (<li key={i}>{item}</li>)
                            })
                        }
                    </ul>
                </InfiniteScroll>
            </div>
        )
    }
}

ReactDOM.render(<TestComponent />, document.getElementById('app'));