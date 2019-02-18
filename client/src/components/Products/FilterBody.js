import React from 'react';
import {headerLinks} from '../../headerLinks';

export default class FilterBody extends React.Component {
	constructor(props){
		super(props);
		this.state = {

				collapse1: true,
				collapse2: false,
				collapse3: false

		}
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick(event){
		console.log(event.target.id);
		const {id} = event.target;
		this.setState(prevState => {
			return {
				[id]: !prevState[id]
			}
		})
	}
	render() {
		return(
			<div>
				<div className="filter-box p-2">
					<div className="box-header d-flex justify-content-between">
						<p className="align-self-center">sort by</p>
						<button className="btn p-1 btn-collapse " name="button1" type="button" data-toggle="collapse" 
						data-target="#collapse1">
							{this.state.collapse1 ? <i className="fas fa-minus"></i> : <i className="fas fa-plus"></i>}
						</button>
					</div>
					<div className="box-content collapse show" id="collapse1" onTransitionEnd={this.handleClick}>
						<div className="custom-control custom-radio">
						  <input type="radio" id="customRadio1" name="customRadio" className="custom-control-input" />
						  <label className="custom-control-label" htmlFor="customRadio1">popularity</label>
						</div>
						<div className="custom-control custom-radio">
						  <input type="radio" id="customRadio2" name="customRadio" className="custom-control-input" />
						  <label className="custom-control-label" htmlFor="customRadio2">
						  	price: low <span className="text-lowercase">to</span> high
						  </label>
						</div>
						<div className="custom-control custom-radio">
						  <input type="radio" id="customRadio3" name="customRadio" className="custom-control-input" />
						  <label className="custom-control-label" htmlFor="customRadio3">
						  	price: high <span className="text-lowercase">to</span> low
						  </label>
						</div>
					</div>
				</div>
				<div className="filter-box p-2">
					<div className="box-header d-flex justify-content-between">
						<p className="align-self-center">availability</p>
						<button className="btn p-1 btn-collapse" name="button2" type="button" data-toggle="collapse" 
						data-target="#collapse2">
							{this.state.collapse2 ? <i className="fas fa-minus"></i> : <i className="fas fa-plus"></i>}
						</button>
					</div>
					<div className="box-content collapse" id="collapse2" onTransitionEnd={this.handleClick}> 
						<div className="custom-control custom-checkbox">
						  <input type="checkbox" className="custom-control-input" id="customCheck1" />
						  <label className="custom-control-label" htmlFor="customCheck1">in stock</label>
						</div>	
					</div>
				</div>
				<div className="filter-box p-2">
					<div className="box-header d-flex justify-content-between">
						<p className="align-self-center">bass guitar types</p>
						<button className="btn p-1 btn-collapse" name="button3" type="button" data-toggle="collapse" 
						data-target="#collapse3" >
							{this.state.collapse3 ? <i className="fas fa-minus"></i> : <i className="fas fa-plus"></i>}
						</button>
					</div>
					<div className="box-content collapse" id="collapse3" onTransitionEnd={this.handleClick}>
						{headerLinks.basses.map(item => {
							return (
			    			<div className="custom-control custom-checkbox" key={item.id}>
								  <input type="checkbox" className="custom-control-input" id={"types" + item.id} />
								  <label className="custom-control-label" htmlFor={"types" + item.id}>{item.linkTitle}</label>
								</div>	
		    			);
						})}
					</div>
				</div>
				<div className="filter-box p-2 no-bb">
					<button type="button" className="btn btn-block show-btn" 
					data-toggle="collapse" data-target="#filterCollapse">Show Products</button>
				</div>
			</div>
			
		);
	}
	
}