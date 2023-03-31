function firstStart() {
  const data = JSON.parse(localStorage.getItem("data"));

  if (data === null || data.length === 0) {
    let students = [
      {
        id: 0,
        name: "Николай",
        age: 20,
        gender: "м",
        beginnerCourse: false,
      },
      {
        id: 1,
        name: "Анастасия",
        age: 21,
        gender: "ж",
        beginnerCourse: true,
      },
      {
        id: 2,
        name: "Павел",
        age: 28,
        gender: "м",
        beginnerCourse: false,
      },
      {
        id: 3,
        name: "Мария",
        age: 24,
        gender: "ж",
        beginnerCourse: true,
      },
      {
        id: 4,
        name: "Николай",
        age: 21,
        gender: "м",
        beginnerCourse: true,
      },
    ];

    localStorage.setItem("data", JSON.stringify(students));
  }
}
firstStart();

const studentsTable = document.querySelector(".students");

function studentRender() {
  let studentItem = "";
  const data = JSON.parse(localStorage.getItem("data"));

  data.forEach(({ id, name, age, gender, beginnerCourse }) => {
    studentItem += `
    <ul class="student">
        <li class="student__id">${id}</li>
        <li class="student__name">${name}</li>
        <li class="student__age">${age}</li>
        <li class="student__gender">${gender}</li>
        <li class="student__beginnerCourse">${beginnerCourse}</li>
        <button class="student__delete">Удалить студента</button>
    </ul>
    `;

    studentsTable.innerHTML = studentItem;
  });
}

studentRender();

const studentBtn = document.querySelector(".set-panel__btn");
studentBtn.addEventListener("click", addStudent);

function addStudent(e) {
  e.preventDefault();

  const selectedGender = document.querySelector('input[name="gender"]:checked');
  const studentName = document.querySelector(".set-panel__name-input");
  const studentAge = document.querySelector(".set-panel__age-input");

  const data = JSON.parse(localStorage.getItem("data"));
  let user = {};

  user.id = data[data.length - 1].id + 1;
  user.name = studentName.value;
  user.age = studentAge.value;
  user.gender = selectedGender.value;

  if (studentName.value !== "" && studentAge.value !== "") {
    data.push(user);
    localStorage.setItem("data", JSON.stringify(data));
  }

  studentName.value = "";
  studentAge.value = "";

  studentRender();
}

const removeButtons = document.querySelectorAll(".student__delete");
studentsTable.addEventListener("click", removeStudent);

function removeStudent(event) {
  const data = JSON.parse(localStorage.getItem("data"));
  const numberStudent =
    event.target.parentNode.querySelector(".student__id").innerHTML;

  for (let i = 0; i <= data.length; i++) {
    if (data[i].id == numberStudent) {
      data.splice(i, 1);
      localStorage.setItem("data", JSON.stringify(data));
      studentRender();
    }
  }
}
