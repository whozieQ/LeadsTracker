import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js"
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://console.firebase.google.com/u/0/project/leads-tracker-a24bb/database/leads-tracker-a24bb-default-rtdb/data/~2F"
}
    
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
console.log(app)

let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        saveLead(tabs[0].url)    
    })

})
function saveLead(lead){
    myLeads.push(lead)
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
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

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function() {
    saveLead(inputEl.value)
    inputEl.value = ""

})