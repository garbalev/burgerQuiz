document.addEventListener("DOMContentLoaded", function () {
  const btnOpenModal = document.querySelector("#btnOpenModal"),
    modalBlock = document.querySelector("#modalBlock"),
    closeModal = document.querySelector("#closeModal"),
    questionTitle = document.querySelector("#question"),
    formAnswers = document.querySelector("#formAnswers"),
    nextButton = document.querySelector("#next"),
    prevButton = document.querySelector("#prev"),
    sendButton = document.querySelector("#send"),
    modalTitle = document.querySelector("#modalTitle")

  const questions = [
    {
      question: "Bun",
      answers: [
        {
          title: "Regular Bun",
          url: "./image/burger.png",
        },
        {
          title: "English Muffin",
          url: "./image/englishMuffin.png",
        },
      ],
      type: "radio",
    },
    {
      question: "Patty",
      answers: [
        {
          title: "Chiken Patty",
          url: "./image/chickenMeat.png",
        },
        {
          title: "100% Beef Patty",
          url: "./image/beefPatty.png",
        },
        {
          title: "Sausage Patty",
          url: "./image/porkMeat.png",
        },
      ],
      type: "radio",
    },
    {
      question: "Vegetables",
      answers: [
        {
          title: "Roma Tomato",
          url: "./image/tomato.png",
        },
        {
          title: "Pickle Slices",
          url: "./image/cucumber.png",
        },
        {
          title: "Shredded letuce",
          url: "./image/salad.png",
        },
        {
          title: "Onions",
          url: "./image/onion.png",
        },
      ],
      type: "checkbox",
    },
    {
      question: "Sauce",
      answers: [
        {
          title: "Spicy Pepper Sauce",
          url: "./image/sauce1.png",
        },
        {
          title: "Ketchup",
          url: "./image/sauce2.png",
        },
        {
          title: "Mustard",
          url: "./image/sauce3.png",
        },
      ],
      type: "radio",
    },
  ];

  btnOpenModal.addEventListener("click", () => {
    modalBlock.classList.add("d-block");
    playTest();
  });

  closeModal.addEventListener("click", () => {
    modalBlock.classList.remove("d-block");
  });

  const playTest = () => {
    const finalAnswers = [];

    let numberQuestion = 0;

    const renderAnswers = (index) => {
      questions[index].answers.forEach((answer) => {
        const answerItem = document.createElement("div");
        answerItem.classList.add("answers-item", "d-flex", "justify-content-center");
        answerItem.innerHTML = `
        <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}">
        <label for="${answer.title}" class="d-flex flex-column justify-content-between">
          <img class="answerImg" src=${answer.url} alt="burger">
          <span>${answer.title}</span>
        </label>
        `;
        formAnswers.appendChild(answerItem);
      });
    };

    const renderQuestions = (indexQuestion) => {
      formAnswers.innerHTML = "";
      if (numberQuestion >= 0 && numberQuestion < questions.length) {
        questionTitle.textContent = `${questions[indexQuestion].question}`;
        renderAnswers(indexQuestion);
        nextButton.classList.remove("d-none");
        prevButton.classList.remove("d-none");
        sendButton.classList.add("d-none");
        modalTitle.classList.remove('d-none');
      }

      if (numberQuestion === 0) {
        prevButton.classList.add("d-none");
      }

      if (numberQuestion === questions.length) {
        nextButton.classList.add("d-none");
        prevButton.classList.add("d-none");
        sendButton.classList.remove("d-none");

        formAnswers.innerHTML = `
          <div class="form-proup">
            <label for="numberPhone">Enter ur phone</label>
            <input type="phone" class="form-control" id="numberPhone">
          </div>
        `;
      }

      if (numberQuestion === questions.length + 1) {
        formAnswers.textContent = 'Thank you. Stay in touch, our specialist will call you back';
        sendButton.classList.add("d-none");
        questionTitle.classList.add("d-none");
        modalTitle.classList.add('d-none');
        setTimeout(() => {
          modalBlock.classList.remove('d-block');
        }, 2000);
      }
    };

    renderQuestions(numberQuestion);

    const checkAnswer = () => {
      const obj = {};

      const inputs = [...formAnswers.elements].filter(
        (input) => input.checked || input.id === "numberPhone"
      );
      inputs.forEach((input, index) => {
        if (numberQuestion >= 0 && numberQuestion < questions.length) {
          obj[`${index}_${questions[numberQuestion].question}`] = input.value;
        }
        if (numberQuestion === questions.length) {
          obj["Phone Number"] = input.value;
        }
      });
      finalAnswers.push(obj);
    };

    nextButton.addEventListener("click", () => {
      checkAnswer();
      numberQuestion++;
      renderQuestions(numberQuestion);
    });

    prevButton.addEventListener("click", () => {
      numberQuestion--;
      renderQuestions(numberQuestion);
    });

    sendButton.addEventListener("click", () => {
      checkAnswer();
      numberQuestion++;
      renderQuestions(numberQuestion);
      console.log(finalAnswers);
    });
  };
});
