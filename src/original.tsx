import * as React from 'react';



export class Dial extends React.Component {
    incriment: number;
    _timeout: any;
    state: {
        items: number[];
        position: number;
        rotation: number;
        scrollStatus: string;
    }
	constructor(props : any){
		super(props)
		this.state = {
			position:1,
			items: [1,2,3,4,5,6,7, 8],
			rotation:0,
			scrollStatus:''
		}

		this.incriment = 360/this.state.items.length;
		this.nextPosition = this.nextPosition.bind(this);
		this.prevPosition = this.prevPosition.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
		this._timeout = null;
	}

	componentDidMount() {
		window.addEventListener('wheel', this.handleScroll)
		// window.addEventListener('keyDown', this.handleKeyPress, false);
	}

	componentWillUnmount() {
		window.removeEventListener('wheel', this.handleScroll)
		// window.addEventListener('keyDown', this.handleKeyPress, false);
	}

	handleScroll(event : Event & { deltaY: number}) {	
		if(this._timeout){ //if there is already a timeout in process cancel it
			clearTimeout(this._timeout);
		}
		this._timeout = setTimeout(() => {
			this._timeout = null;
			this.setState({
				scrollStatus:'scroll stopped'
			}, () => {
				let rotation = this.state.rotation 
				// let rounds = Math.floor(rotation/360)
				// let absRotation = rotation - (rounds*360)
				let position = Math.round(8*(rotation/360))
				this.setPosition(position)			
			});
		},300);
		if(this.state.scrollStatus !== 'scrolling') {
			this.setState({
				scrollStatus:'scrolling'
			});
		}

		if(event.deltaY > 0) {
			this.scrollPos()
		} else {
			this.scrollNeg()
		}
	}
	
	scrollPos() {
		this.setState({
			rotation:this.state.rotation + 2
		})
	}
	
	scrollNeg() {
		this.setState({
			rotation:this.state.rotation - 2
		})
	}

    setPosition(position: number ) {
		this.setState({
			position:position
		}, () => this.setRotation())
	}

	nextPosition() {
		this.setState({
			position:this.state.position + 1
		}, () => this.setRotation())
	}

	prevPosition() {
		this.setState({
			position:this.state.position - 1
		}, () => this.setRotation())
	}
	
	setRotation() {
		this.setState({
			rotation:this.state.position*this.incriment
		})
	}
	

	render() {
		
		console.log('ROATION', this.state.rotation)
		let style = {
			transform:`rotate(${this.state.rotation}deg)`
		}

		let opStyle = {
			transform:`rotate(-${this.state.rotation}deg)`
		}
		if (this.state.rotation < 0) {
			opStyle = {
				transform:`rotate(${Math.abs(this.state.rotation)}deg)`
			}
		}

		return (
			<div className = 'page-wrapper'>
				<div className = 'dial' style = {style}>
					<p className = 'di2 item' style = {opStyle} >one</p> 
					<p className = 'di3 item' style = {opStyle} >eight</p>
					<p className = 'di4 item' style = {opStyle} >seven</p>
					<p className = 'di5 item' style = {opStyle} >six</p>
					<p className = 'di6 item' style = {opStyle} >five</p>
					<p className = 'di7 item' style = {opStyle} >four</p>
					<p className = 'di8 item' style = {opStyle} >three</p>
					<p className = 'di1 item' style = {opStyle} >two</p>
					<div className = 'showDial'></div>
				</div>
				<div>
					<button onClick = {this.prevPosition} >prev</button>				
					<button onClick = {this.nextPosition} >next</button>
				</div>
			</div>
		)
	}
};


