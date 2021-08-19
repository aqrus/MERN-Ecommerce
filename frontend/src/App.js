import './App.css';
import { Footer, Header, Home } from './compoments/layout';
import { BrowserRouter, Route } from 'react-router-dom';
function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Header />
				<div className="container container-fluid">
					<Route path="/" exact component={Home}></Route>
				</div>
				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;
