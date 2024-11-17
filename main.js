function getAndUpdate() {
    console.log("updating...");

    const title = document.getElementById("title");
    const desc = document.getElementById("desc");

    const tit = title.value;
    const des = desc.value;

    if (localStorage.getItem('itemJson') == null) {
        itemJsonArray = [];
        if (tit != "" && des != "") {
            itemJsonArray.push([tit, des]);
        }
        localStorage.setItem('itemJson', JSON.stringify(itemJsonArray))

    }

    else {
        itemJsonArrayStr = localStorage.getItem('itemJson')
        itemJsonArray = JSON.parse(itemJsonArrayStr);
        if (tit != "" && des != "") {
            itemJsonArray.push([tit, des]);
            title.value = '';
            desc.value = '';
        }
        else {

            const errors = document.createElement('div');
            errors.innerHTML = `<div aria-live="polite" aria-atomic="true" class="d-flex justify-content-center align-items-center w-100">
  <!-- Then put toasts within -->
  <div class="toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header" style="background-color: rgba(255, 0, 0, 0.6);">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
      class="bi bi-exclamation-diamond-fill" viewBox="0 0 16 16">
      <path
          d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
  </svg>
      <strong class="me-auto" style="margin-left: 10px; " >Error</strong>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body" style="background-color: rgba(255, 0, 0, 0.2);">
      Please fill in both fields.
    </div>
  </div>
</div>`

            listContainer.appendChild(errors);
        }
        localStorage.setItem('itemJson', JSON.stringify(itemJsonArray))
    }
    update();
}


function update() {

    if (localStorage.getItem('itemJson') == null) {
        itemJsonArray = [];
        localStorage.setItem('itemJson', JSON.stringify(itemJsonArray))

    }

    else {
        itemJsonArrayStr = localStorage.getItem('itemJson')
        itemJsonArray = JSON.parse(itemJsonArrayStr);
    }

    // Populate the table

    let tableBody = document.getElementById("tableBody");
    let str = "";
    itemJsonArray.forEach((element, index) => {
        str += `
        <tr class="bg-transparent">
                <th class="bg-transparent" scope="row">${index + 1} </th>
                <td class="bg-transparent" >${element[0]}</td>
                <td class="bg-transparent" ><pre style="font-family: Arial; font-size: 15px;" >${element[1]}<pre></td>
                <td class="bg-transparent" ><button type="button" class="btn btn-danger" onclick="deleted(${index})" >Delete</button></td>
            </tr>
        `
    });
    tableBody.innerHTML = str;


    // When the list is empty

    if (itemJsonArray.length == 0) {
        const nothing = document.getElementById("nothing");
        nothing.style.display = 'block';
        const item = document.getElementById("item");
        item.style.display = 'none';
        const deleteAll = document.getElementById("deleteAll");
        deleteAll.style.display = 'none';
    }
    else {
        nothing.style.display = 'none';
        item.style.display = 'block';
        deleteAll.style.display = 'block';
    }
}

function cleared() {
    if (confirm("Are you sure you want to delete all the items?")) {
        localStorage.clear();
        console.log("all delete");
        update();
    }
}


added = document.getElementById("added");
added.addEventListener("click", getAndUpdate);
update();


function deleted(itemIndex) {

    itemJsonArrayStr = localStorage.getItem('itemJson')
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    // Delete item index elemen from the array
    itemJsonArray.splice(itemIndex, 1);
    console.log("Deleting", itemIndex);
    localStorage.setItem('itemJson', JSON.stringify(itemJsonArray));
    update();
}
