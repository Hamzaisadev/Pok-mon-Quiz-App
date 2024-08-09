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

// 8) initialize variables
let usedPokemonIds =[]

// 2)create function to fetch one Pokemon with an id

 async function fetchPokemonById(id) {
   const Response = await fetch (`https://pokeapi.co/api/v2/pokemon/${id}`)
   const data = await Response.json ();
   return data;
}

// 3) create a test function to see result of step 2

async function testFetch() {
  const pokemon = await fetchPokemonById(getRandomPokemonId()); 
  console.log(pokemon)
}

// 4) call test function

testFetch()

// 6) function to load question with options

async function loadQuestionsWithOptions() {
  // 7)#fetch correct answer first
  let pokemonId = getRandomPokemonId();
  
  // 8.2)check if current question has already been used
  while (usedPokemonIds.includes(pokemonId))
  {pokemonId = getRandomPokemonId();
}


  //8.3) if Pokemon has not been displayed yet it is added to used Pokemon Ids and it is set as a new constant Pokemon
   usedPokemonIds.push(pokemonId);
   const pokemon = await fetchPokemonById(pokemonId);

  // 9)create options arrays
  const options = [pokemon.name];
  const optionsIds = [pokemon.id];

  // 10) fetch additional random Pokemon names to use as an option
  while (options.length < 4) {
    let getRandomPokemonId = getRandomPokemonId;
    //10.1) ensure face options does not exist in the option list creates a new random ID until it does not exist in optionids
    while (optionsId){
      randomPokemonId = getRandomPokemonId;
    }
    optionsIds.push(randomPokemonId);

    //10.2) searching a random Pokemon with the newly made ID and adding it to the options array
    const randomPokemon = await fetchPokemonById(randomPokemonId);
    const randomOption = randomPokemon.name;
    options.push(randomOption)

    //10.3) test
    console.log(options)
    console.log(optionsIds)
  }

}

loadQuestionsWithOptions(options)



// --- UTILITY FUNCTIONS ---

//5) function to randomise the Pokemon ID

function getRandomPokemonId() {
  return Math.floor(Math.random() * 151 ) + 1
}


