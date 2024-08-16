// all globle variables-----------------------------------------------------------------
let searchInput = document.querySelector(".search-input");
let userInfo;
let user;
let allBData = [];
let allInHdata = [];
let archivData = [];
let allCashData = [];
let allCashArchData = [];
let HlogoName = document.querySelector("#Hotel-Name");
let logoutBtn = document.querySelector(".logout-btn");
// booking decalrations-------------------------------------------------------------------
let bookingForm = document.querySelector(".booking-Form");
let allBInputs = bookingForm.querySelectorAll("input");
let bookingNotice = bookingForm.querySelector("textarea");
let ModalClseBtn = document.querySelectorAll(".modal-close-btn");
let bListTBody = document.querySelector(".booking-list");
let RegisterBtn = document.querySelector(".b-register");
let BUbtn = bookingForm.querySelectorAll("button");
let showBRoomsEl = document.querySelector(".show-booking-rooms");
// in house declrations--------------------------------------------------------------------
let InHouseForm = document.querySelector(".InHouse-Form");
let allInHInputs = InHouseForm.querySelectorAll("input");
let inHbookingNotice = InHouseForm.querySelector("textarea");
let inHListTBody = document.querySelector(".InHouse-list");
let InHouseRegBtn = document.querySelector(".InHouse-reg-btn");
let inHUpdtBtn = InHouseForm.querySelectorAll("button");
let showInHRoomsEl = document.querySelector(".show-inHouse-rooms");
// Archive declrations---------------------------------------------------------------
let archiveListTBody = document.querySelector(".archive-list");
let addCashBtn = document.querySelector(".addCash-btn")
let cashierForm = document.querySelector(".cashier-Form");
let allCinput = cashierForm.querySelectorAll("input")
let allTabBtn = document.querySelectorAll(".tab-btn");
let cashierListTBody = document.querySelector(".cashier-list")
let cashierBtn = document.querySelector(".cashier-tab");
let cashierTab = document.querySelector("#cashier");
let bookingTab = document.querySelector("#booking");
let totalAmount = document.querySelector("#totalAmount");
let closeCashierBtn = document.querySelector(".close-cashier-btn");
let cashierArchTBody = document.querySelector(".cashier-arch-list");
let archTotal = document.querySelector("#arch-total-cash");
let allPrintBtn = document.querySelectorAll(".print-btn");
let cashierArchPrint = document.querySelector(".cashier-Arch-print");
let allTotalBtn = document.querySelectorAll(".total-btn");


// check if user is loged in----------------------------------------------------------------
if (sessionStorage.getItem("__au__") == null) {
  window.location = "../index.html";
}
userInfo = JSON.parse(sessionStorage.getItem("__au__"));
HlogoName.innerText = userInfo.hotelName;
user = userInfo.email.split("@")[0];

// getting data from storage-----------------------------------------------------------------
const fetchData = (key) => {
  if (localStorage.getItem(key) != null) {
    let data = JSON.parse(localStorage.getItem(key));
    return data;
  } else {
    return [];
  }
};
// ------------------------------- show total --------------------------------------------
const showTotal = () => {
  allTotalBtn[0].innerText = "Total Booking = " + allBData.length;
  allTotalBtn[1].innerHTML = "Total In House = " + allInHdata.length;
  allTotalBtn[2].innerHTML = "Total Archive = " + archivData.length;
};
showTotal();
// --------------------------------print coding--------------------------
for (let btn of allPrintBtn) {
  btn.onclick = () => {
    window.print();
  }
}
cashierArchPrint.onclick = () => {
  document.querySelector(".cashier-tab-pan").classList.add("d-none")
  window.print();
}
ModalClseBtn[3].onclick = () => {
  document.querySelector(".cashier-tab-pan").classList.remove("d-none")
}

// ----------check hotel rooms======-------------
const checkRooms = (element) => {
  if ( element.value<= 0) {
    if (element.value !='') {
      swal("warning !", ` room numbers starts from 1 in this hotel`, "warning");
      element.value='';
    }
  }
  if (+ userInfo.hotelRooms < element.value ) {
    swal("warning !", `Total ${userInfo.hotelRooms} rooms are available in this hotel`, "warning")
    element.value = + userInfo.hotelRooms
  };
}
allBInputs[2].oninput = (e) => {
  checkRooms(e.target);
}
allInHInputs[2].oninput = (e) => {
  checkRooms(e.target);
}
allCinput[0].oninput = (e) => {
  checkRooms(e.target);
}
// formate date function----------------------------------------------------------------------
const formatDate = (data) => {
  let mnth = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = new Date(data);
  let yy = date.getFullYear();
  let mm = date.getMonth();
  dd = date.getDate();
  return `${dd < 10 ? "0" + dd : dd}-${mnth[mm]}-${yy}`;
};
// logout coding-------------------------------------------------------------------------------
logoutBtn.onclick = () => {
  swal("Good !", "Login success.", "success");
  setTimeout(() => {
    sessionStorage.removeItem("__au__");
    window.location = "../index.html";
  }, 2500);
};
// start booking stored coding---------------------------------------------------=--------------------
bookingForm.onsubmit = (e) => {
  e.preventDefault();
  registrationFunc(bookingNotice, allBInputs, allBData, user + "_allBData");
  bookingForm.reset(" ");
  setTimeout(() => {
    ModalClseBtn[0].click();
    showData(bListTBody, allBData, user + "_allBData");
  }, 1500);
};
// start cashier stored coding---------------------------------------------------=--------------------

cashierForm.onsubmit = (e) => {
  e.preventDefault();
  registrationFunc(null, allCinput, allCashData, user + "_allCashData");
  cashierForm.reset(" ");
  setTimeout(() => {
    ModalClseBtn[2].click();
    showCashierData(cashierListTBody, allCashData)

  }, 1500);
};
// registration coding___________________________________________________________________________________
function registrationFunc(textArea, inputs, array, key1) {
  let data = {
    notice: textArea && textArea.value,
    createdAt: new Date(),
    inHouse: false
  };
  for (let el of inputs) {
    let key = el.name;
    let value = el.value;
    data[key] = value;
  }
  array.unshift(data);
  localStorage.setItem(key1, JSON.stringify(array));
  swal("Booking Success", " ", "success");
}
// booking delete coding--------------------------------------------------------------------------
function deleteDataFunc(element, array, string) {
  let allBdelBtn = element.querySelectorAll(".del-btn");
  allBdelBtn.forEach((btn, index) => {
    btn.onclick = () => {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        className: "swal",
      }).then((willDelete) => {
        if (willDelete) {
          array.splice(index, 1);
          localStorage.setItem(string, JSON.stringify(array));
          showData(element, array, string);
          swal("Poof! Your file has been deleted!", {
            icon: "success",
          });
        } else {
          showData(element, array, string);
          swal("Your imaginary file is safe!");
        }
      });
    };
  });
}
// booking update coding -------------------------------------------------------------------------
function updateDataFunc(
  ListTBody,
  array,
  upDateBtn,
  BkngInputs,
  NoticeArea,
  string,
  RgistrBtn,
  ClseBtn
) {
  let allBeditBtn = ListTBody.querySelectorAll(".edit-btn");
  allBeditBtn.forEach((btn, index) => {
    btn.onclick = () => {
      RgistrBtn.click();
      let data = array[index];
      upDateBtn[0].classList.add("d-none");
      upDateBtn[1].classList.remove("d-none");
      let tr = btn.parentElement.parentElement;
      let allTd = tr.querySelectorAll("td");
      let i = 0;
      for (i = 0; i < allTd.length - 4; i++) {
        if (i != 4 && i != 5) {
          BkngInputs[i].value = allTd[i + 1].innerText;
        }
      }
      BkngInputs[4].value = data.checkInDate;
      BkngInputs[5].value = data.checkOutDate;
      NoticeArea.value = data.notice;
      BkngInputs[8].value = array[index].RegisteredAt;
      upDateBtn[1].onclick = () => {
        swal("Booking Success", " ", "success");
        let upDdata = { notice: NoticeArea.value };
        for (let el of BkngInputs) {
          let key = el.name;
          let value = el.value;
          upDdata[key] = value;
        }
        setTimeout(() => {
          array.splice(index, 1, upDdata);
          localStorage.setItem(string, JSON.stringify(array));
          upDateBtn[0].classList.remove("d-none");
          upDateBtn[1].classList.add("d-none");
          bookingForm.reset(" ");
          InHouseForm.reset(" ");
          ClseBtn.click();
          showData(ListTBody, array, string);
        }, 1500);
      };
    };
  });
}
updateDataFunc(
  bListTBody,
  allBData,
  BUbtn,
  allBInputs,
  bookingNotice,
  user + "_allBData",
  RegisterBtn,
  ModalClseBtn[0]
);
updateDataFunc(
  inHListTBody,
  allInHdata,
  inHUpdtBtn,
  allInHInputs,
  inHbookingNotice,
  user + "_allInHdata",
  InHouseRegBtn,
  ModalClseBtn[1]
);

// --------------------show booking rooms ---------------------------------------------------------

const showBookingRooms = (element, array) => {
  element.innerHTML = '';
  array.forEach((item, index) => {
    let data;
    if (array == allBData) {
      data = `<div class="card-body bg-success text-white fw-bold">
               <p>${formatDate(item.checkInDate)}</p>
              <p>To</p>
              <p>${formatDate(item.checkOutDate)}</p>
         </div>`
    } else {
      data = ` <div class="card-body  fw-bold">
                  <img class="w-100" src=" ${item.inHouse ? '../img/dummy.png' : '../img/lock.png'}" />
               </div>
               <div class="card-footer">
                  <button class="btn in-btn action-btn text-white">In</button>
                  <button class="btn out-btn action-btn text-white">Out</button>
               </div>`
    }
    element.innerHTML += `
     <div class="card px-0 text-center col-md-2">
        <div class="card-header bg-danger text-white fw-bold">${item.roomNo}</div>
        ${data}
     </div>`
  });
  // in coding
  let allInBtn = element.querySelectorAll(".in-btn");
  let allOutBtn = element.querySelectorAll(".out-btn");
  const inOutFun = (arrBtns) => {
    arrBtns.forEach((btn, ind) => {
      btn.onclick = () => {
        if (arrBtns == allInBtn) {
          array[ind].inHouse = true;
        } else {
          array[ind].inHouse = false;
        }
        localStorage.setItem(user + "_allInHdata", JSON.stringify(allInHdata));
        showData(inHListTBody, allInHdata, user + "_allInHdata");
      }
    });
  }
  inOutFun(allInBtn);
  inOutFun(allOutBtn);
};
showBookingRooms(showBRoomsEl, allBData);
showBookingRooms(showInHRoomsEl, allInHdata);
// check In And Check Out Coding--------------------------------------------------------------------
function checkInAndCheckOut(ListTBody,
  array) {
  let allCheckBtn = ListTBody.querySelectorAll(".chechin-btn")
  allCheckBtn.forEach((btn, index) => {
    btn.onclick = () => {
      swal({
        title: "Are you sure?",
        text: "Once transfered, you will not be able to back this file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        className: "swal",
      }).then((willDelete) => {
        if (willDelete) {
          let data = array[index];
          if (array == allBData) {
            allInHdata.unshift(data);
            array.splice(index, 1);
            localStorage.setItem(user + "_allBData", JSON.stringify(array));
            localStorage.setItem(user + "_allInHdata", JSON.stringify(allInHdata));
            showData(bListTBody, allBData, user + "_allBData");
            showData(inHListTBody, allInHdata, user + "_allInHdata");
          } else if (array == archivData) {
            allBData.unshift(data);
            array.splice(index, 1);
            localStorage.setItem(user + "_archivData", JSON.stringify(archivData));
            localStorage.setItem(user + "_allBData", JSON.stringify(allBData));
            showData(archiveListTBody, archivData, user + "_archivData");
            showData(bListTBody, allBData, user + "_allBData");
          } else {
            archivData = fetchData(user + "_archivData");
            archivData.unshift(data);
            localStorage.setItem(user + "_archivData", JSON.stringify(archivData))
            array.splice(index, 1);
            localStorage.setItem(user + "_allInHdata", JSON.stringify(allInHdata));
            showData(inHListTBody, allInHdata, user + "_allInHdata");
            showData(archiveListTBody, archivData, user + "_archivData");
          }
          swal("Poof! Your file has been deleted!", {
            icon: "success",
          });
        } else {
          showData(bListTBody, allBData, user + "_allBData");
          showData(inHListTBody, allInHdata, user + "_allInHdata");
          showData(archiveListTBody, archivData, user + "_archivData");
          swal("Your file is not transfered!");
        }
      });
    }
  });
}
// show booking data--------------------------------------------------------------------------------
function showData(element, array, string) {
  let temp = string.split("_")[1];
  element.innerHTML = " ";
  array.forEach((item, index) => {
    // console.log(index, item);
    element.innerHTML += ` <tr>
                      <td class="text-nowrap  Noprint">${index + 1}</td>
                       <td class="text-nowrap">${item.fullname}</td>                      
                      <td class="text-nowrap">${item.location}</td>
                      <td class="text-nowrap">${item.roomNo}</td>
                      <td class="text-nowrap">${item.totalPerson}</td>
                      <td class="text-nowrap">${formatDate(item.checkInDate)}</td>
                      <td class="text-nowrap">${formatDate(item.checkOutDate)}</td>
                      <td class="text-nowrap">${item.price}</td>                      
                      <td class="text-nowrap">${item.mobile}</td>                      
                      <td >${item.notice}</td>
                      <td class="text-nowrap Noprint">${formatDate(item.RegisteredAt)}</td>
                      <td class=" text-nowrap Noprint ">
                        <button
                          class="${temp == 'archivData' && 'd-none'} btn text-white edit-btn me-1 p-1 px-2 btn-primary">
                          <i class="fa fa-edit"></i>
                        </button>
                        <button class=" btn text-white chechin-btn me-1 p-1 px-2 btn-info">
                          <i class="fa fa-check"></i>
                        </button>
                        <button class="btn del-btn text-white p-1 px-2 btn-danger">
                          <i class="fa fa-trash"></i>
                        </button>
                      </td>
                    </tr>`;
  });
  deleteDataFunc(element, array, string);
  // deleteDataFunc( inHListTBody,allInHdata, user + "_allInHdata");
  deleteDataFunc(archiveListTBody, archivData, user + "_archivData");

  updateDataFunc(
    bListTBody,
    allBData,
    BUbtn,
    allBInputs,
    bookingNotice,
    user + "_allBData",
    RegisterBtn,
    ModalClseBtn[0]
  );
  updateDataFunc(
    inHListTBody,
    allInHdata,
    inHUpdtBtn,
    allInHInputs,
    inHbookingNotice,
    user + "_allInHdata",
    InHouseRegBtn,
    ModalClseBtn[1]
  );
  checkInAndCheckOut(inHListTBody, allInHdata,);
  checkInAndCheckOut(bListTBody, allBData);
  checkInAndCheckOut(archiveListTBody, archivData);
  showTotal();
  showBookingRooms(showBRoomsEl, allBData);
  showBookingRooms(showInHRoomsEl, allInHdata);
}
allBData = fetchData(user + "_allBData");
allInHdata = fetchData(user + "_allInHdata");
archivData = fetchData(user + "_archivData");
allCashData = fetchData(user + "_allCashData");
allCashArchData = fetchData(user + "_allCashArchData");

//  --------------------show cashier data --------------------------------------------
function showCashierData() {
  Amount = 0;
  cashierListTBody.innerHTML = " ";
  allCashData.forEach((item, index) => {
    Amount += +item.amount;
    cashierListTBody.innerHTML += `<tr>
                      <td class="text-nowrap">${index + 1}</td>
                       <td class="text-nowrap">${item.roomNo}</td>                                           
                      <td class="text-nowrap">${item.cashierName}</td>
                     <td class="text-nowrap">${formatcashDate(item.createdAt)}</td>  
                     <td class="text-nowrap">${item.amount}</td>   
                    </tr>`
  });
  totalAmount.innerHTML = "<i class='fa fa-rupee'><i/> " + Amount;
}

//  --------------------show cashier archive data --------------------------------------------
function showCashierArchData() {
  archAmount = 0;
  cashierArchTBody.innerHTML = " ";
  allCashArchData.forEach((item, index) => {
    archAmount += +item.total;
    cashierArchTBody.innerHTML += `<tr>
                      <td class="text-nowrap">${index + 1}</td>
                                                                
                      <td class="text-nowrap">${item.cashierName}</td>
                     <td class="text-nowrap">${formatcashDate(item.createdAt)}</td>  
                     <td class="text-nowrap">${item.total}</td>   
                    </tr>`
  });
  archTotal.innerHTML = "<i class='fa fa-rupee'><i/> " + archAmount;
}
// ___________________________________inhouse coding ________________________________________________________
// ``````````````````````````````````````````````````````````````````````````````````````````````````````
// ___________________________________inhouse coding ________________________________________________________

// start inhouse stored bcoding---------------------------------------------------=---------------------------
InHouseForm.onsubmit = (e) => {
  e.preventDefault();
  registrationFunc(
    inHbookingNotice,
    allInHInputs,
    allInHdata,
    user + "_allInHdata"
  );
  InHouseForm.reset(" ");
  setTimeout(() => {
    ModalClseBtn[1].click();
    showData(inHListTBody, allInHdata, user + "_allInHdata");
  }, 1500);
};
// search conding-------------------------------------------------
searchFunc = () => {
  let value = searchInput.value.toLowerCase();
  let tableEl = document.querySelector(".tab-content .search-pane.active")
  let tr = tableEl.querySelectorAll("tbody tr")
  for (let el of tr) {
    let srNo = el.querySelectorAll("TD")[0].innerText;
    console.log(srNo)
    let fullname = el.querySelectorAll("td")[1].innerText.toLocaleLowerCase();
    let location = el.querySelectorAll("td")[2].innerText.toLocaleLowerCase();
    let roomNo = el.querySelectorAll("td")[3].innerText;
    let totalPerson = el.querySelectorAll("td")[4].innerText;
    let chechin = el.querySelectorAll("td")[5].innerText;
    let checkOut = el.querySelectorAll("td")[6].innerText;
    let price = el.querySelectorAll("td")[7].innerText;
    let mobile = el.querySelectorAll("td")[8].innerText;
    let notice = el.querySelectorAll("td")[9].innerText.toLocaleLowerCase();
    let bookedOn = el.querySelectorAll("td")[10].innerText;
    if (srNo.indexOf(value) != -1) {
      el.classList.remove("d-none");
    } else if (fullname.indexOf(value) != -1) {
      el.classList.remove("d-none");
    }
    else if (location.indexOf(value) != -1) {
      el.classList.remove("d-none");
    } else if (roomNo.indexOf(value) != -1) {
      el.classList.remove("d-none");
    }
    else if (roomNo.indexOf(value) != -1) {
      el.classList.remove("d-none");
    }
    else if (totalPerson.indexOf(value) != -1) {
      el.classList.remove("d-none");
    }
    else if (chechin.indexOf(value) != -1) {
      el.classList.remove("d-none");
    } else if (checkOut.indexOf(value) != -1) {
      el.classList.remove("d-none");
    } else if (price.indexOf(value) != -1) {
      el.classList.remove("d-none");
    } else if (mobile.indexOf(value) != -1) {
      el.classList.remove("d-none");
    } else if (notice.indexOf(value) != -1) {
      el.classList.remove("d-none");
    } else if (bookedOn.indexOf(value) != -1) {
      el.classList.remove("d-none");
    }
    else {
      el.classList.add("d-none")
    }
  }
}
searchInput.oninput = () => {
  searchFunc();
}
showData(bListTBody, allBData, user + "_allBData");
showData(inHListTBody, allInHdata, user + "_allInHdata");
showData(archiveListTBody, archivData, user + "_archivData");
showCashierData();
showCashierArchData();

// ______________________________________________________________________________________________________

// ----------------------Cashier Codings ----------------------------------------------------------------
addCashBtn.onclick = () => {
  allCinput[2].value = sessionStorage.getItem("c_name");
}
closeCashierBtn.onclick = () => {
  if (allCashData.length > 0) {
    let data = {
      cashierName: sessionStorage.getItem("c_name"),
      total: totalAmount.innerText,
      createdAt: new Date()
    };

    allCashArchData.push(data);
    localStorage.setItem(user + "_allCashArchData", JSON.stringify(allCashArchData))
    localStorage.removeItem(user + "_allCashData")
    allCashData = [];
    showCashierData(cashierListTBody, allCashData)
    showCashierArchData()
    sessionStorage.removeItem("c_name");
    // setTimeout(() => {
    //   allTabBtn[0].classList.add("active");
    //   bookingTab.classList.add("active");
    //   cashierBtn.classList.remove("active")
    //   cashierTab.classList.remove("active");
    // }, 2000);

  } else {
    swal("Warning !", "There is no cash to close", "warning")

  }




}
cashierBtn.onclick = () => {
  if (sessionStorage.getItem("c_name") == null) {
    let name = window.prompt("Enter your name !")
    if (name) {
      sessionStorage.setItem("c_name", name);
      allTabBtn[0].classList.remove("active");
      bookingTab.classList.remove("active");
      cashierBtn.classList.add("active");
      cashierTab.classList.add("active");
    } else {
      allTabBtn[0].classList.add("active");
      bookingTab.classList.add("active");
      cashierBtn.classList.remove("active")
      cashierTab.classList.remove("active");
    }
  } else {

    allCinput[2].value = sessionStorage.getItem("c_name")

  }
}
function formatcashDate(data) {
  let mnth = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = new Date(data);
  let yy = date.getFullYear();
  let mm = date.getMonth();
  dd = date.getDate();
  let time = date.toLocaleTimeString()
  return `${dd < 10 ? "0" + dd : dd}-${mnth[mm]}-${yy} ${time}`;
};

