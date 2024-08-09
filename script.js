// 1) Get DOM elements
const resultElement = document.getElementById("result");
const pokemonImageElement = document.getElementById("pokemonImage");
const optionsContainers = document.getElementById("options");
const PointsElements = document.getElementById("pointsValue");
const totalCount = document.getElementById("totalCount");
const mainContainer = document.getElementsByClassName("container");
const loadingContainer = document.getElementById("loadingContainer");

// 8) initialize variables
let usedPokemonIds = [];
let count = 0
let points = 0;
let showLoading = false

// 2)create function to fetch one Pokemon with an id
async function fetchPokemonById(id) {
  showLoading = true;
  const Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await Response.json();
  return data;
}

// 6) function to load question with options
async function loadQuestionsWithOptions() {
  if (showLoading) {
    showLoadingWindow();
    hidePuzzleWindow();
  }



  // 7)#fetch correct answer first
  let pokemonId = getRandomPokemonId();

  // 8.2)check if current question has already been used
  while (usedPokemonIds.includes(pokemonId)) {
    pokemonId = getRandomPokemonId();
  }

  // 8.3) if Pokemon has not been displayed yet it is added to used Pokemon Ids and it is set as a new constant Pokemon
  usedPokemonIds.push(pokemonId);
  const pokemon = await fetchPokemonById(pokemonId);

  // 9)create options arrays
  const options = [pokemon.name];
  const optionsIds = [pokemon.id];

  // 10) fetch additional random Pokemon names to use as an option
  while (options.length < 4) {
    let randomPokemonId = getRandomPokemonId();
    // 10.1) ensure face options does not exist in the option list creates a new random ID until it does not exist in optionids
    while (optionsIds.includes(randomPokemonId)) {
      randomPokemonId = getRandomPokemonId();
    }
    optionsIds.push(randomPokemonId);

    // 10.2) searching a random Pokemon with the newly made ID and adding it to the options array
    const randomPokemon = await fetchPokemonById(randomPokemonId);
    const randomOption = randomPokemon.name;
    options.push(randomOption);

    // 10.3) test
    console.log(options);
    console.log(optionsIds);
    if (options.length === 4) {
      showLoading = false ;
    }
  
  
  
  }


  shuffleArray(options);

  
  // 13) clear any previous result and update Pokemon image to fest image URL from the sprite
  resultElement.textContent = "Who's that Pokémon?";
  pokemonImageElement.src = pokemon.sprites.other.dream_world.front_default;

  // 14) create option buttons 
  optionsContainers.innerHTML ="";
  options.forEach((option) =>{
    const button = document.createElement("button");
    button.textContent = option;
    button.onclick = (event) => checkAnswer(option === pokemon.name ,event);
    optionsContainers.appendChild(button);
    
  });
  if (!showLoading) {
    hideLoadingWindow();
    showPuzzleWindow();
  }


  
}

//15) function to check answer
function checkAnswer(isCorrect,event){
  //15.1) if correct answer is clicked
  const selectedButton = document.querySelector(".selected ");

  //15.2) if already a button is clicked
  if (selectedButton) {
    return;
  }

  //15.4) Else mark tha clicked button as selected and increase the count by one
  event.target.classList.add("selected");
  count++;
  totalCount.textContent = count;


  if(isCorrect) {
    displayResult("Correct answer")
    //15.8) increases point by 1 if correct 
    points++;
    PointsElements.textContent = points;
    event.target.classList.add("correct")
  } else {
    displayResult("Wrong answer...")
    event.target.classList.add("wrong")
 
  }
//15.9) LOAD THE NEXT QUESTION WITH A 1 SEC DELAY FOR THE USER TO READ THE RESULT
  setTimeout(() => {
    showLoading = true;
    loadQuestionsWithOptions();
  },400)
  
}


//11) initialize 
loadQuestionsWithOptions();

// --- UTILITY FUNCTIONS ---

//5) function to randomise the Pokemon ID
function getRandomPokemonId() {
  return Math.floor(Math.random() * 151) + 1;
}


//12.1) function to shuffle the options
function shuffleArray(array){
  return array.sort(() => Math.random() - 0.5);
}

//15.5) function to update result text and class namr
function displayResult(result) {
  resultElement.textContent = result;
}

// 17) hide loading

 function hideLoadingWindow() {
  loadingContainer.classList.add ("hide");
 }

 //18) show loading window
 function showLoadingWindow() {
  mainContainer[0].classList.remove("show");
  loadingContainer.classList.remove("hide");
  loadingContainer.classList.add("show");
 }

// 19) show puzzle window
function showPuzzleWindow(){
  loadingContainer.classList.remove("show");
  mainContainer[0].classList.remove("hide");
  mainContainer[0].classList.add("show");
}

// 20) hide puzzle window
function hidePuzzleWindow(){
  mainContainer[0].classList.add("hide");
}
