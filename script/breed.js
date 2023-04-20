"use strict";

const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const activeInput = document.getElementById("input-active");
const submitBtn = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("tbody");

renderBreedTable(breedArr);

submitBtn.addEventListener("click", function () {
  const data = {
    name: breedInput.value,
    type: typeInput.value,
  };
  console.log(data);

  //KIỂM TRA TÍNH HỢP LỆ CỦA DỮ LIỆU
  const validate = validateData(data);

  // TẠO ĐIỀU KIỆN
  if (validate) {
    // THÊM DỮ LIỆU VÀO MẢNG THÚ CƯNG
    breedArr.push(data);
    // HIỂN THỊ DANH SÁCH RA BẢNG HTML
    renderBreedTable(breedArr);
    saveToStorage("breedArr", breedArr);
    // XÓA THÔNG TIN KHI NHẬP XONG
    clearInput();
  }
});

//HÀM KIỂM TRA TÍNH HỢP LỆ CỦA DỮ LIỆU
const validateData = data => {
  let isValidate = true;
  if (data.name.trim() === "") {
    alert("Nhập Breed");
    isValidate = false;
  }
  if (data.type === "Select Type") {
    alert("Chọn kiểu Type");
    isValidate = false;
  }
  return isValidate;
};

//HÀM XÓA THÔNG TIN KHI KHÁCH NHẬP XONG
const clearInput = () => {
  breedInput.value = "";
  typeInput.value = "Select Type";
};
// HÀM HIỂN THỊ THÚ CƯNG
function renderBreedTable() {
  tableBodyEl.innerHTML = "";
  breedArr.forEach((breedItem, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td scope="col">${index + 1}</td>
    <td scope="col">${breedItem.name}</td>
    <td scope="col">${breedItem.type}</td>
    <td><button class="btn btn-danger" onclick="deleteBreed('${
      breedItem.name
    }')">Delete</button></td>
    `;
    tableBodyEl.appendChild(tr);
  });
}

//HÀM XÓA BREED
const deleteBreed = breedID => {
  const commandDel = confirm("Bạn choắc chưa?");
  if (commandDel) {
    for (let i = 0; i < breedArr.length; i++) {
      if (breedID === breedArr[i].name) {
        breedArr.splice(i, 1);
        saveToStorage("breedArr", breedArr);
        break; // thoát khỏi vòng lặp khi tìm thấy phần tử cần xóa
      }
    }
    renderBreedTable(breedArr);
  }
};
