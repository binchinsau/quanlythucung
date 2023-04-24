"use strict";

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const btnFind = document.getElementById("find-btn");
const tableBodyEl = document.getElementById("tbody");
const formEl = document.getElementById("container-form");

console.log(petArr);

// Bắt sự kiện click
btnFind.addEventListener("click", () => {
  // Đối tượng petArr chứa tất cả các đối tượng thú cưng trong bảng.
  // biến petArrFind sẽ lưu giữ tập hợp các thú cưng được lọc theo các điều kiện.
  let petArrFind = petArr;

  //Nếu ô đầu vào "ID" được nhập, danh sách động vật sẽ chỉ chứa các đối tượng có giá trị ID bắt đầu bằng chuỗi đã nhập.
  if (idInput.value) {
    petArrFind = petArrFind.filter(pet => pet.id.includes(idInput.value));
  }
  // Nếu ô đầu vào "Name" được nhập, danh sách động vật sẽ chỉ chứa các đối tượng có tên chứa chuỗi đã nhập.
  if (nameInput.value) {
    petArrFind = petArrFind.filter(pet => pet.name.includes(nameInput.value));
  }
  // Nếu ô đầu vào "Type" được chọn (không phải "Select Type"), danh sách động vật sẽ chỉ chứa các đối tượng có loại (type) bằng với giá trị đã chọn.
  if (typeInput.value !== "Select Type") {
    petArrFind = petArrFind.filter(pet => pet.type === typeInput.value);
  }
  //Nếu ô đầu vào "Breed" được chọn (không phải "Select Breed"), danh sách động vật sẽ chỉ chứa các đối tượng có giống (breed) bằng với giá trị đã chọn
  if (breedInput.value !== "Select Breed") {
    petArrFind = petArrFind.filter(pet => pet.breed === breedInput.value);
  }
  //Nếu ô đầu vào "Vaccinated" được chọn, danh sách động vật sẽ chỉ chứa các đối tượng đã được tiêm phòng (vaccinated = true).
  if (vaccinatedInput.checked === true) {
    petArrFind = petArrFind.filter(pet => pet.vaccinated === true);
  }
  //Nếu ô đầu vào "Dewormed" được chọn, danh sách động vật sẽ chỉ chứa các đối tượng đã được trị giun (dewormed = true).
  if (dewormedInput.checked === true) {
    petArrFind = petArrFind.filter(pet => pet.dewormed === true);
  }
  //Nếu ô đầu vào "Sterilized" được chọn, danh sách động vật sẽ chỉ chứa các đối tượng đã được triệt sản (sterilized = true).
  if (sterilizedInput.checked === true) {
    petArrFind = petArrFind.filter(pet => pet.sterilized === true);
  }
  // Hiển thị lên bảng table
  renderTableData(petArrFind);
});

//Hàm hiển thị thú cưng
const renderTableData = petArr => {
  //Lệnh này sẽ xóa tất cả các dòng trong bảng (table) hiển thị các thú cưng (pet) trước khi
  // thêm dữ liệu của các thú cưng đã được tìm kiếm vào bảng.
  tableBodyEl.innerHTML = "";
  //Vòng lặp này tạo ra các hàng trong bảng và hiển thị dữ liệu từ mảng đối tượng petArr trên trang web
  petArr.forEach(pet => {
    // Với mỗi đối tượng pet trong mảng, một hàng mới sẽ được tạo và các thuộc tính của đối tượng đó sẽ được thêm vào các cột tương ứng
    const row = document.createElement("tr");
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
    <td>${displayTime(pet.date).slice(8, 10)} -
    ${displayTime(pet.date).slice(5, 7)} -
    ${displayTime(pet.date).slice(0, 4)}</td>
    `;
    //Phương thức appendChild() được sử dụng để thêm hàng vào bảng
    tableBodyEl.appendChild(row);
  });
};

// Hàm hiển thị thời gian
const displayTime = date => {
  if (typeof date === "string") {
    return date;
  } else if (typeof date === "object") {
    return JSON.parse(JSON.stringify(date));
  }
};
renderTableData(petArr);

const renderBreed = () => {
  //Hàm này sẽ duyệt qua mảng breedArr chứa thông tin về các loài vật nuôi
  //và tạo một phần tử option trong thẻ select với nội dung là tên của loài vật
  breedArr.forEach(function (breedItem) {
    const option = document.createElement("option");
    //Phần tử option này sẽ được thêm vào trong thẻ select có id là breedInput.
    option.innerHTML = `${breedItem.breed}`;
    breedInput.appendChild(option);
  });
};
//Hàm renderBreed được sử dụng để hiển thị danh sách các giống thú cưng
renderBreed();
