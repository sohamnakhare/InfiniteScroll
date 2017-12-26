import React from 'react';
import ReactDOM from 'react-dom';

import InfiniteScroll from '../src/InfiniteScroll.jsx';


class TestComponent extends React.Component {

   constructor(){
       super();
       this.state = {
           data:[],
           pageNum: 1,
           pageSize: 100
       };
       for (var index = 0; index < 10000; index++) {
            this.state.data.push(index);           
       }
       this.loadMore = this.loadMore.bind(this);
   } 

   loadMore() {
      this.setState({pageNum: this.state.pageNum + 1});
   }

    render() {
        return(
			<InfiniteScroll loadMore={this.loadMore} useWindow={true}>
				<ul>
					{
						this.state.data.slice(0, this.state.pageNum * this.state.pageSize)
							.map((item, i)=>{
								return (<li key={i}>{item}</li>)
						})
					}
				</ul>
			</InfiniteScroll>
        )
    }
}

ReactDOM.render(<TestComponent />, document.getElementById('app'));