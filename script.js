

let questions = [
    question1 = `What is a Function?`
    question2 = 'What is a a function peramiter?'
    question3 = 'What are the three main Primative Data Types?'
    question4 = 'const and let are examples of what in coding.'
    question5 = 'what are three useless promts?'
    question6 = 'what is the correct way to code and equals sign regarding conditional logic?'
    question7 = 'what is a parseInt?'
    question8 = 'An array is what kinda of Data Type'





]

let score = 0

for(var i=0; i < questions.length; i++){
    var response = window.prompt(questions[i].prompt)
    if (response === question[i].answer) {
        alert('correct!');
    } else {
        alert('WRONG!');
    }
}
alert('you got ' + score + '/' + questions.length)

document.getElementById('start').addEventListener('click' , event =>{
    event.preventDefault()
    // console.log('hello')
    document.getElementById('Answers').innerHTML = `
    ${questions.question1}
    `
    })




})

function addQuestion () {
    document.getElementById('Question').innerHTML = `
    ${questions.question1}
    `
 console.log(addQuestion)

}



document.getElementById('Questions').innerHTML () 




    `${questions.question1}`
    console.log(questions.question1)