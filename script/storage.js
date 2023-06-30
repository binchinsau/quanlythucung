"use strict";

//Dữ liệu có sẵn
const data1 = {
  id: "P001",
  name: "Bull",
  age: 2,
  type: "Cat",
  weight: 5,
  length: 40,
  color: "Brown",
  breed: "Black",
  vaccinated: true,
  dewormed: true,
  sterilized: true,
  date: new Date(),
};

const data2 = {
  id: "P002",
  name: "Fox",
  age: 2,
  type: "Dog",
  weight: 6,
  length: 60,
  color: "Black",
  breed: "Oggy",
  vaccinated: false,
  dewormed: true,
  sterilized: false,
  date: new Date(),
};

const breed1 = {
  breed: "Oggy",
  type: "Dog",
};
const breed2 = {
  breed: "Ba Lan",
  type: "Cat",
};
const breed3 = {
  breed: "Gold",
  type: "Dog",
};
const breed4 = {
  breed: "Black",
  type: "Cat",
};

//Bổ sung Animation cho Sidebar
//Tạo sự kiện click để xóa active
const sideBar = document.getElementById("sidebar");
sideBar.addEventListener("click", function () {
  this.classList.toggle("active");
});

//HÀM LẤY dữ liệu từ LocalStorage theo Key tương ứng.
const getFromStorage = key => {
  return JSON.parse(localStorage.getItem(key));
};

//TẠO BIẾN CHỨA LẤY DỮ LIỆU LƯU TRỮ
const petArr = getFromStorage("petArr");

// Điều kiện Lấy dữ liệu từ petArr
if (!getFromStorage("petArr")) {
  saveToStorage("petArr", [data1, data2]);
}

//HÀM thực hiện việc LƯU xuống LocalStorage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

//Lấy dữ liệu từ breedArr
if (!getFromStorage("breedArr")) {
  saveToStorage("breedArr", [breed1, breed2, breed3, breed4]);
}
//TẠO BIẾN LẤY DỮ LIỆU LƯU TRỮ
const breedArr = getFromStorage("breedArr");
