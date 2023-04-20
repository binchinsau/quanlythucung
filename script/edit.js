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
renderTableData(petArr);
//
//Hàm sửa thông tin thú cưng
const editPet = id => {
  //Hiển thị bảng nhập dữ liệu
  formEl.classList.remove("hide");

  const pet = petArr.find(petItem => petItem.id === id);
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
      option.innerHTML = `${breedItem.name}`;
      breedInput.appendChild(option);
    });
    //KHI NHẤN VÀO Cat
  } else if (typeInput.value === "Cat") {
    const breedCats = breedArr.filter(breedItem => breedItem.type === "Cat");
    breedCats.forEach(breedItem => {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.name}`;
      breedInput.appendChild(option);
    });
  }
};

submitBtn.addEventListener("click", function () {
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
    petArr[index] = data;
    saveToStorage("petArr", petArr);
    // Khi nhấn submit sẽ thêm class hide để đóng phần nhập thông tin
    formEl.classList.add("hide");
    //Hiển thị danh sách thú cưng ra bảng
    renderTableData(petArr);
  }
});

//Hàm hiển thị thú cưng
function renderTableData(petARR) {
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < petARR.length; i++) {
    let row = document.createElement("tr");
    row.innerHTML = `
    <th scope="row">${petArr[i].id}</th>
    <td>${petArr[i].name}</td>
    <td>${petArr[i].age}</td>
    <td>${petArr[i].type}</td>
    <td>${petArr[i].weight} kg</td>
    <td>${petArr[i].length} cm</td>
    <td>${petArr[i].breed}</td>
    <td>
      <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
    </td>
    <td><i class="bi ${
      petArr[i].vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      petArr[i].dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      petArr[i].sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    
    <td>...</td>
    <td>
    <button class="btn btn-info" onclick="editPet('${
      petArr[i].id
    }')">Edit</button>
    </td>`;
    tableBodyEl.appendChild(row);
  }
}

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
