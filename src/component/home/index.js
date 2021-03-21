import {useState , useEffect} from 'react';
import { NavLink } from "react-router-dom";
import Loader from '../loader';

const Home = () => {

	const [list , updateList] = useState([]);
	const [next , setNext] = useState(null);
	const [previous , setPrevious] = useState(null);
	const [loading , setLoading] = useState(true);
	const [count , setCount] = useState(0);

	const limit = 20; // this can be changes at one place in case we change offset or limit


	useEffect(() => {
		fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${limit}`)
  .then(response => response.json())
  .then(data => {
  	updateList(data?.results || []);
  	setNext(data?.next);
  	setPrevious(data?.previous);
  	setLoading(false);
  	setCount(data?.count);
  });
	} , [])

	//function for pagination calls

	const fetchMore = (ev) => {
		const { id } = ev.currentTarget.dataset;
		fetch(id === 'next' ? next : id === 'previous' ?  previous : `https://pokeapi.co/api/v2/pokemon/?offset=${id}&limit=${limit}`)
  	.then(response => response.json())
  	.then(data => {
  		updateList(data?.results || []);
  		setNext(data?.next);
  		setPrevious(data?.previous);

  		//smooth scroll back to top after list change
  		window.scrollTo({
  			top: 0,
  			left: 0,
  			behavior: 'smooth'
			})
  });
	}


	//currently previous and next is disabled by css only as non clickable in case previous or next not exist ,  which can be change to toast or something later


	return(
		<>
			{loading ? <Loader/> : (
				<>
			<h1 className="tc pa3 ">Pokedex</h1>
			<div className=" pa3 flex justify-between flex-wrap">
				{list.map((data , idx) => (
					<div key={idx} className={`mt1 w-20-l w-40 card color-${idx%4}`}>
						<div className="flex items-center mb3 white">
							<img className="default-image mr2" src="https://i.ibb.co/PxXyj8b/580b57fcd9996e24bc43c31f.jpg" alt="pokeball" border="0"/>
							<span>{data?.name}</span>
						</div>
						<NavLink className="details-button" to={`/pokemon/${data?.url.substring(34)}`}>Check Details</NavLink>
					</div>
				))}
			</div>
			<div className="pagination">
  			<span data-id="previous" className={`${previous ? '' : 'pointer-events-none'} pointer`} onClick={fetchMore}>&laquo; Previous</span>
  			<div className="pagination-number">
  				{[...new Array(Math.ceil(count/limit))].map((ev , i) => (
  				<div key={i} data-id={i*limit} className="pointer" onClick={fetchMore}>
  					<span>{i}</span>
  				</div>
  				))}
  			</div>
 			  <span data-id="next" className={`${next ? '' : 'pointer-events-none'} pointer`} onClick={fetchMore}>Next &raquo;</span>
			</div>
			</>
			)}
		</>
		)
}

export default Home;