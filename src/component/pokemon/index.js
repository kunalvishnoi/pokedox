import {useState , useEffect} from 'react'
import { NavLink } from "react-router-dom";
import Loader from '../loader';

const PokemonDetail = (props) => {

	const [pokemon , setPokemon] = useState({});
	const [loading , setLoading] = useState(true);
	const [error , setError] = useState(false);
	const {pokemonId} = props?.match?.params;


	//calling api request by using id of that pokemon and pass pokemonId as update dependency

	useEffect(() => {
		fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
		.then(response => response.json())
  	.then(data => {
  		setPokemon(data);
  		setLoading(false);
  })
  	.catch(error => {
  		setError(true);
  		setLoading(false);
  	})
 
	} , [pokemonId])


	return(
		<>
			{loading ? (
				<Loader/>
			 ) : (
				<>
			<NavLink className="back-button" to="/">
				<img  src="https://i.ibb.co/0tZrtDW/187-1871440-button-back-return-step-back-arrow-button-hd.jpg" alt="back-button" border="0"/>
			</NavLink>
			{error ? <p className="tc">Pokemon Not found</p>: (
				<div className="color-0 tc white  vh-100">
				<h1 className="ttc pa3">{pokemon.name}</h1>
				<div className="flex justify-center pa3 flex-wrap">
				{pokemon?.abilities?.map((data , idx) => (
					<div key={idx} className="ability mr2">
						{data?.ability?.name}
					</div>
					))}
				</div>
				<img className="w-60 w-20-l" alt={pokemon?.name} src={pokemon?.sprites?.front_default}/>
				<p className="mv0 f3 b">Basic Details</p>
				<div className="flex justify-center items-center flex-column">
					<div className="flex">
						<p className="b">Height:</p>
						<p className="b">{pokemon?.height}</p>
					</div>
					<div className="flex">
						<span className="b">Weight:</span>
						<span className="b">{pokemon?.weight} lbs</span>
					</div>
					<p className="mb0 f3 b">Moves</p>
					<div className="flex justify-center pa3 flex-wrap">
						{pokemon?.moves?.slice(0,5).map((data , idx) => (
							<div key={idx} className=" mt1 ability mr2">
								{data?.move?.name}
							</div>
						))}
					</div>
				</div>
				</div>
			)}
		</> 
		)}
		</>
		)
}

export default PokemonDetail;