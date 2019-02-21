console.log('Welcome to the Quiz!');

//Shuffle function based on the Fisher-Yate shuffle
function fisherYateShuffle(array){
  var i = 0
    , j = 0
    , temp = null

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }

  return array
}

let modelController = (function() {
  class Question {
    constructor(description, choices, correct){
      this.description = description;
      this.choices = choices;
      this.correct = correct;
    }

    getDescription(){
      return this.description;
    }

    getChoices(){
      return this.choices;
    }

    isCorrect(answer) {
      return answer === this.correct;
    }
  }

  //Populate the questions

  let questions = {
    1: new Question (
      "How old is Tingle?",
      [25, 30, 35, 40],
      35
    ),
    2: new Question(
      "In Ocarina of Time, who did the Kakariko Guard wanted to get the Keaton Mask for?",
      [
        'His son.',
        'His wife.',
        'His friend.',
        'For himself.'
      ],
      'His son.'
    ),
    3: new Question(
      "In Majora's Mask, what was the name of the Goron Hero?",
      [
        'Rudania',
        'Darmani',
        'Daruk',
        'Darunia'
      ],
      'Darmani'
    ),
    4: new Question(
      "In Link's Awakening, what do you get at the end of the trade sequence?",
      [
        'Unlimited Rupees',
        'Lv. 3 Sword',
        'Lv. 3 Shield',
        'Boomerang'
      ],
      'Boomerang'
    ),
  };
  console.log(questions);

  //Create a random order for the questions
  let quizOrder = [];

  for (let i = 1; i < Object.keys(questions).length+1; i++) quizOrder.push(i);

  console.log(quizOrder);

  quizOrder = fisherYateShuffle(quizOrder);
  console.log('Quiz Order: ' + quizOrder);

  let score = 0;

  return {
    quizOrder: quizOrder,
    getScore: score,
    getQuestions: questions,

  }


})();

let viewController = (function(){
  let DOMStrings = {
    questionDescription: '#questionDescription',
    choice1: '#choice1',
    choice2: '#choice2',
    choice3: '#choice3',
    choice4: '#choice4',
  };

  return {
    getDOMstrings: function(){
      return DOMStrings;
    },


  }


})();

let appController = (function(model, view){
  console.log('Inside Controller: ' + model.quizOrder);

  let DOM = view.getDOMstrings();

  let qList = model.getQuestions;
  let qOrder = model.quizOrder;
  console.log(qList);
  let currQ = qList[qOrder[0]];
  console.log(currQ.getDescription());

  //Display Questions to the UI
  document.querySelector(DOM.questionDescription).textContent = currQ.getDescription();
  let choices = currQ.choices;
  console.log(choices);
  //Store the user's button click
  document.querySelector(DOM.choice1).textContent = choices[0];
  document.querySelector(DOM.choice2).textContent = choices[1];
  document.querySelector(DOM.choice3).textContent = choices[2];
  document.querySelector(DOM.choice4).textContent = choices[3];

  //Check for correct answer


  //Stop quiz if wrong, other wise continue until done


})(modelController, viewController);
