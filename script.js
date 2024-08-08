// 1) Get DOM elements
const resultElement = document.
getElementById("result")
const pokeminImageElement = document.
getElementById("pokemonImage")
const optionsContainers = document.
getElementById("options")
const PointsElements = document.
getElementById("pointsValue")
const totalCount = document.
getElementById("totalCount")
const mainContainer = document.
getElementById("loadingContainer")
const loadingContainer = document.
getElementById("loadingIcon")

 async function fetchPokemonById(id) {
   const Response = await fetch (`https://pokeapi.co/api/v2/pokemon/${id}`)
   const data = await Response.json ();
   return data;}



   async function testFetch() {
    const pokemon = await fetchPokemonById(getRandomPokemonId()); 
    console.log(pokemon)


   }

   testFetch();


   function getRandomPokemonId() {
    return Math.floor(Math.random() * 151 ) + 1
   }

\\

