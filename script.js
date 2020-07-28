let questions = [
    {
      "question": "What percentage of the world's oxygen does algea produce?",
      "correct_answer": "70% - 80%",
      "answers": [
        "5% - 10%",
        "10% - 20%",
        "70% - 80%",
        "40% - 50%"
      ]
    },
    {
      "question": "Every time you look at the moon, you look one second into the past.",
      "correct_answer": "True",
      "answers": [
        "True",
        "False"
      ]
    },
    {
      "question": "At what rate is the moon moving away from Earth, and aproximately how long will it take for Earth to experience it's final total solar eclipse?",
      "correct_answer": "1.5 inches/year , 563 million years",
      "answers": [
        "0.5 inches/year , 796 million years",
        "1 inch/decade , 10 million years",
        "0.8 inches/year , 29 million years",
        "1.5 inches/year , 563 million years"
      ]
    },
    {
      "question": "What was the name of Achilies' men in the Trojan wars?",
      "correct_answer": "Myrmidon",
      "answers": [
        "Myrmidon",
        "Spartans",
        "Fluffy Pandas",
        "Achaeans "
      ]
    },
    {
      "question": "In-N-Outs 300th store opened in what city?",
      "correct_answer": "Anaheim",
      "answers": [
        "Anaheim hills",
        "Palm Springs",
        "Anaheim",
        "Redding"
      ]
    },
    {
      "question": "The Pomegranit is a symbol of which Greek goddess?",
      "correct_answer": "Persephone",
      "answers": [
        "Demeter",
        "Persephone",
        "Hestia",
        "Artemis"
      ]
    },
    {
      "question": "How many watts does the human brain run on?",
      "correct_answer": "20 watts",
      "answers": [
        "2 watts",
        "20 watts",
        "10 watts",
        "29 watts"
      ]
    },
    {
      "question": "What is the name of the plastic tip of a shoe lace?",
      "correct_answer": "Aglet",
      "answers": [
        "Aglet",
        "Argon",
        "Flynn",
        "Peanut",
      ]
    },
    {
      "question": "Which animal did Johnny Cash fight causing him to have broken ribs?",
      "correct_answer": "Ostrich",
      "answers": [
        "Kangaroo",
        "Chimp",
        "Eagle",
        "Ostrich"
      ]
    },
    {
      "question": "In the US version of the tv show The Office, What is Dwight Shrute's middle name?",
      "correct_answer": "Kurt",
      "answers": [
        "Kurt",
        "Clark",
        "Cory",
        "Kyle"
      ]
    }
  ]
  
  let currentIndex = 0
  let score = 0
  let seconds = 100
  let timer
  
  const newQuestion = () => {
  
    document.getElementById('question').textContent = questions[currentIndex].question
  
    let answers = questions[currentIndex].answers
  
    document.getElementById('answers').innerHTML = ''
  
    for (let i = 0; i < answers.length; i++) {
      let answerElem = document.createElement('button')
      answerElem.className = 'answer btn btn-info btn-lg'
      answerElem.dataset.answer = answers[i]
      answerElem.textContent = answers[i]
  
      document.getElementById('answers').append(answerElem)
    }
  }
  
  const getAnswer = answer => {
  
    if (answer === questions[currentIndex].correct_answer) {
      score++
      document.getElementById('score').textContent = score
      let resultElem = document.createElement('div')
      resultElem.className = 'alert alert-success'
      resultElem.textContent = 'Correct Answer'
      document.getElementById('answers').append(resultElem)
    } else {
      let resultElem = document.createElement('div')
      resultElem.className = 'alert alert-danger'
      resultElem.textContent = 'Incorrect Answer'
      document.getElementById('answers').append(resultElem)
    }
  
    currentIndex++
  
    setTimeout(() => {
      if (currentIndex < questions.length) {
        newQuestion()
      } else {
        endGame()
      }
    }, 1000)
  }
  
  const endGame = () => {
    document.getElementById('Quiz').innerHTML = `
      <h1 class="display-2">Game Over!</h1>
    <p class="display-4">Your final score is: ${score}</p>
    <hr class="my-4">
    <p>Please enter a username for the leaderboard</p>
    <form>
      <div class="form-group">
        <label for="username">username</label>
        <input type="text" class="form-control" id="username">
        <button id="submitScore" class="btn btn-primary">Submit</button>
      </div>
    </form>
    `
  
  }
  
  const submitScore = submission => {
    console.log(submission)
    
    let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || []
  
    leaderboard.push(submission)
  
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard))
  
    leaderboard.sort((a, b) => {
      return b.score - a.score
    })
  
    let tableElem = document.createElement('table')
    tableElem.className = 'table'
    tableElem.innerHTML = `
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">username</th>
          <th scope="col">score</th>
        </tr>
      </thead>
    `
  
    let bodyElem = document.createElement('tbody')
  
    for (let i = 0; i < leaderboard.length; i++) {
      let rowElem = document.createElement('tr')
      rowElem.innerHTML = `
        <th scope="row">${i + 1}</th>
        <td>${leaderboard[i].username}</td>
        <td>${leaderboard[i].score}</td>
      `
      bodyElem.append(rowElem)
    }
  
    tableElem.append(bodyElem)
  
    document.getElementById('Quiz').append(tableElem)
  
  }
  
  document.getElementById('startTrivia').addEventListener('click', () => {
  
    timer = setInterval(() => {
      seconds--
      document.getElementById('time').textContent = seconds
  
      if (seconds <= 0) {
        clearInterval(timer)
        endGame()
      }
    }, 1000)
  
    newQuestion()
  })
  
  document.addEventListener('click', event => {
    if (event.target.classList.contains('answer')) {
      getAnswer(event.target.dataset.answer)
    } else if (event.target.id === 'submitScore') {
      event.preventDefault()
      submitScore({
        username: document.getElementById('username').value,
        score: score
      })
    }
  })
  
  