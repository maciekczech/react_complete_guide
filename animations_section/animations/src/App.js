import React, { Component } from 'react';
import Transition from 'react-transition-group/Transition';

import './App.css';
import Modal from './components/Modal/Modal';
import Backdrop from './components/Backdrop/Backdrop';
import List from './components/List/List';

class App extends Component {
	state = {
		modalIsOpen: false,
		blockIsVisible: false,
	};

	showModal = () => {
		this.setState({ modalIsOpen: true });
	};

	closeModal = () => {
		this.setState({ modalIsOpen: false });
	};

	render() {
		return (
			<div className='App'>
				<h1>React Animations</h1>
				<button
					className='Button'
					onClick={() =>
						this.setState((prevState) => ({
							blockIsVisible: !prevState.blockIsVisible,
						}))
					}
				>
					Toggle
				</button>
				<br></br>
				<Transition
					in={this.state.blockIsVisible}
					timeout={1000}
					mountOnEnter
					unmountOnExit
				>
					{(state) => {
						return (
							<div
								style={{
									backgroundColor: 'red',
									height: '100px',
									width: '100px',
									margin: 'auto',
									transition: 'opacity 1000ms ease-out',
									opacity: state === 'exiting' ? '0' : '1',
								}}
							></div>
						);
					}}
				</Transition>
				<Modal show={this.state.modalIsOpen} closed={this.closeModal} />
				<Backdrop show={this.state.modalIsOpen} />
				<button className='Button' onClick={this.showModal}>
					Open Modal
				</button>
				<h3>Animating Lists</h3>
				<List />
			</div>
		);
	}
}

export default App;
