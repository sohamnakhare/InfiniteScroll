import React from 'react';
import ReactDOM from 'react-dom';

import InfiniteScroll from '../src/InfiniteScroll.jsx';


class TestComponent extends React.Component {

   constructor(){
       super();
       this.state = {
           data:[],
           pageNum: 1,
           pageSize: 20
       };
       for (var index = 0; index < 1000; index++) {
            this.state.data.push(index);           
       }
       this.state.lazyData = this.state.data.slice(0, this.state.pageNum * this.state.pageSize);
       this.loadMore = this.loadMore.bind(this);
   } 

   loadMore() {
       if(this.state.pageNum<100){
        this.setState({lazyData: this.state.data.slice(0, this.state.pageNum * this.state.pageSize)});
       }
   }

    render() {
        return(
            <div style={{height:'100px', overflow:'scroll'}}>
                <InfiniteScroll loadMore={this.loadMore}>
                        <ul>
                            {
                                this.state.lazyData.map((item, i)=>{
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