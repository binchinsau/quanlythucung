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

// Hàm hiển thị thời gian
const displayTime = date => {
  if (typeof date === "string") {
    return date;
  } else if (typeof date === "object") {
    return JSON.parse(JSON.stringify(date));
  }
};

renderTableData(petArr);

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
      console.log("ok");
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

// //TẠO SỰ KIỆN CLICK KHI ẤN CHỌN VÀO typeInput để hiển thị loại giống của Dog , Cat
// typeInput.addEventListener("click", renderBreed);

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
    // date: new Date(),
  };
  console.log(data);

  //KIỂM TRA TÍNH HỢP LỆ CỦA DỮ LIỆU
  const validate = validateData(data);

  //Nếu hợp lệ =>
  if (validate) {
    //Thêm dữ liệu vào mảng của thú cưng
    petArr.push(data);

    //Hiển thị danh sách thú cưng ra bảng
    renderTableData(petArr);
    saveToStorage("petArr", petArr);
    //Xóa dữ liệu nhập vào từ form
    clearInput();
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
    <td>${displayTime(petArr[i].date).slice(8, 10)} /
    ${displayTime(petArr[i].date).slice(5, 7)} /
    ${displayTime(petArr[i].date).slice(0, 4)}</td>
    <td>
    <button class="btn btn-danger" onclick="deletePet('${
      petArr[i].id
    }')">Delete</button>
    </td>`;
    tableBodyEl.appendChild(row);
  }
}
//Hàm xóa dữ liệu của khách nhập vào.
function clearInput() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
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
  for (let i = 0; i < petArr.length; i++) {
    if (data.id === petArr[i].id) {
      alert("ID must be unique!");
      isValidate = false;
      break;
    }
  }
  return isValidate;
}

//Hàm Xóa một thú cưng
const deletePet = petID => {
  //Thông báo Trước khi xóa
  if (confirm("Bạn choắc chưa?")) {
    for (let i = 0; i < petArr.length; i++) {
      if (petID === petArr[i].id) {
        petArr.splice(i, 1);
        saveToStorage("petArr", petArr);
      }
      renderTableData(petArr);
    }
  }
};

//Tạo 1 boolean
let healthyCheck = false;

// Lọc ra thú cưng khỏe mạnh
healthyBtn.addEventListener("click", function () {
  if (healthyCheck === false) {
    const healthyPetArr = [];

    // làm vòng lặp for và thêm 3 điều kiện
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized) {
        healthyPetArr.push(petArr[i]);
      }
    }
    //Hiển thị ra bảng HTML
    renderTableData(healthyPetArr);
    healthyBtn.textContent = "Show All Pet";
    healthyCheck = true;
  } else if (healthyCheck === true) {
    renderTableData(petArr);
    healthyBtn.textContent = "Show Healthy Pet";
    healthyCheck = false;
  }
});
