"use strict";

const submitBtn = document.getElementById("submit-btn");
const healthyBtn = document.getElementById("healthy-btn");
const calculateBtn = document.getElementById("calculate--bmi-btn");

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const tableBodyEl = document.getElementById("tbody");
const formEl = document.getElementById("container-form");

// Hàm hiển thị thời gian
const displayTime = date => {
  if (typeof date === "string") {
    return date;
  } else if (typeof date === "object") {
    return JSON.parse(JSON.stringify(date));
  }
};

renderTableData(petArr);

//Hàm hiển thị thú cưng
function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";
  petArr.forEach(pet => {
    let row = document.createElement("tr");
    row.innerHTML = `
    <th scope="row">${pet.id}</th>
    <td>${pet.name}</td>
    <td>${pet.age}</td>
    <td>${pet.type}</td>
    <td>${pet.weight} kg</td>
    <td>${pet.length} cm</td>
    <td>${pet.breed}</td>
    <td>
      <i class="bi bi-square-fill" style="color: ${pet.color}"></i>
    </td>
    <td><i class="bi ${
      pet.vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      pet.dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      pet.sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td>${displayTime(pet.date).slice(8, 10)} /
    ${displayTime(pet.date).slice(5, 7)} /
    ${displayTime(pet.date).slice(0, 4)}</td>
    <td>
    <button class="btn btn-info" onclick="startEditPet('${
      pet.id
    }')">Edit</button>
    </td>`;

    tableBodyEl.appendChild(row);
  });
}
//THÊM SỰ KIỆN VÀO PHẦN TỬ inputType để cập nhật các tùy chọn cho phần tử
typeInput.addEventListener("change", () => {
  renderBreed();
});
//HÀM HIỂN THỊ LOẠI GIỐNG CỦA DOG , CAT
const renderBreed = () => {
  breedInput.innerHTML = "<option>Select Breed</option>";

  //KHI NHẤN VÀO Dog
  if (typeInput.value === "Dog") {
    const breedDogs = breedArr.filter(breedItem => breedItem.type === "Dog");
    breedDogs.forEach(breedItem => {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });
    //KHI NHẤN VÀO Cat
  } else if (typeInput.value === "Cat") {
    const breedCats = breedArr.filter(breedItem => breedItem.type === "Cat");
    breedCats.forEach(breedItem => {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });
  }
};

submitBtn.addEventListener("click", () => {
  //Lấy dữ liệu
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
  };
  console.log(data);

  //KIỂM TRA TÍNH HỢP LỆ CỦA DỮ LIỆU
  const validate = validateData(data);

  //Nếu hợp lệ =>
  if (validate) {
    const index = petArr.findIndex(pet => pet.id === data.id);
    //
    data.date = petArr[index].date;

    petArr[index] = data;

    saveToStorage("petArr", petArr);
    // Khi nhấn submit sẽ thêm class hide để đóng phần nhập thông tin
    formEl.classList.add("hide");
    //Hiển thị danh sách thú cưng ra bảng
    renderTableData(petArr);
  }
});

//Hàm sửa thông tin thú cưng
const startEditPet = petId => {
  //Hiển thị bảng nhập dữ liệu
  formEl.classList.remove("hide");

  const pet = petArr.find(petItem => petItem.id === petId);
  idInput.value = pet.id;
  nameInput.value = pet.name;
  ageInput.value = pet.age;
  typeInput.value = pet.type;
  weightInput.value = pet.weight;
  lengthInput.value = pet.length;
  colorInput.value = pet.color;
  breedInput.value = pet.breed;
  vaccinatedInput.checked = pet.vaccinated;
  dewormedInput.checked = pet.dewormed;
  sterilizedInput.checked = pet.sterilized;

  renderBreed();
  breedInput.value = `${pet.breed}`;
};

//Tạo lệnh if else để không có trường nào bị nhập thiếu dữ liệu.
function validateData(data) {
  let isValidate = true;
  if (data.id.trim() === "") {
    alert("Không để trống ID");
    isValidate = false;
  }
  if (data.name.trim() === "") {
    alert("Không để trống Tên");
    isValidate = false;
  }
  if (isNaN(data.age)) {
    alert("Không để trống Age");
    isValidate = false;
  } else if (data.age < 1 || data.age > 15) {
    alert("Age must be between 1 and 15!");
    isValidate = false;
  }
  if (data.type === "Select Type") {
    alert("Please select Type!");
    isValidate = false;
  }
  if (isNaN(data.weight)) {
    alert("Không để trống Weight");
    isValidate = false;
  } else if (data.weight < 1 || data.weight > 15) {
    alert("Weight must be between 1 and 15");
    isValidate = false;
  }

  if (isNaN(data.length)) {
    alert("Không để trống Length");
    isValidate = false;
  } else if (data.length < 1 || data.length > 100) {
    alert("Length must be between 1 and 100!");
    isValidate = false;
  }
  if (data.breed === "Select Breed") {
    alert("Please select Breed!");
    isValidate = false;
  }
  return isValidate;
}
