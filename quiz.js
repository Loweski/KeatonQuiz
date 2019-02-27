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
      return answer == this.correct;
      /*This has to be compared using == instead of === because some of the answer can be numbers but
      when we grab the number from the choices chosen, the number would be a string. This can be easily
      solve by parsing it was parseInt but that would have it parse ALL answers including ones that
      are actually strings. */
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
    result: '#result',
    questionList: '#questionList',
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



  let qHtmlList = [];

  for (let i = 0; i < qOrder.length; i++){
    let currQ = qList[qOrder[i]];
    let choices = currQ.choices;
    let html =
    `<h3 id='questionDescription'>${currQ.getDescription()}</h3>
      <div class="choiceList">
        <button class="choice" type="button">${choices[0]}</button>
        <button class="choice" type="button">${choices[1]}</button>
        <button class="choice" type="button">${choices[2]}</button>
        <button class="choice" type="button">${choices[3]}</button>
      </div>`;
    qHtmlList.push(html);
  }

  document.querySelector(DOM.questionList).innerHTML = qHtmlList.join('');
  console.log(qHtmlList);

  //Create the HTML for all the questions

  //Add button to check for all of them




})(modelController, viewController);
