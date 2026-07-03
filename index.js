import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js"
import { getDatabase,
        ref,
        push,
        onValue,
        remove } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://leads-tracker-a24bb-default-rtdb.firebaseio.com/"
}
    
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "leads")

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")




function saveLead(lead){
    push(referenceInDB, lead)
}

function render(arrayList) {
    let listItems = ""
    for (let i = 0; i < arrayList.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${arrayList[i]}'>
                    ${arrayList[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

onValue(referenceInDB, function(snapshot) {
    if(!snapshot.exists()) {
        ulEl.innerHTML = "<p>No leads saved yet.</p>"
    }
    else {
        const snapshotValues = snapshot.val()
        const myLeads = Object.values(snapshotValues)
        render(myLeads)
    }
})

deleteBtn.addEventListener("dblclick", function() {
    remove(referenceInDB)
})

inputBtn.addEventListener("click", function() {
    saveLead(inputEl.value)
    inputEl.value = ""
})