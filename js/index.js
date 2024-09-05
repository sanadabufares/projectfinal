"use strict";

let formCheck = true; // check if the form is appearent
let addContact = document.getElementById("addcontact"); // a button to show the add contact pop-up
let addForm = addBlock(formCheck); // the add contact form
let title_form = document.createElement("p"); // the title of the contact addition/ edit popup
title_form.classList.toggle("title_form"); 
title_form.innerText = "Enter values for new user";
let form_parent = document.createElement("section"); // form parent used for designing
form_parent.classList.toggle("form_parent");
form_parent.append(title_form);
form_parent.appendChild(addForm);
document.body.appendChild(form_parent);
form_parent.style.display = "none";
let infoDocument_parent = document.createElement("section"); // the infomation section parent for desgining
infoDocument_parent.style.width = "100%"
infoDocument_parent.style.minHeight = "100vh"

infoDocument_parent.classList.toggle("infoParent");

infoDocument_parent.style.display = 'none';
let removeAllBtn = document.getElementById("removeAll"); // the remove all button
let animateTrickBt = document.getElementById("animateBtn"); // animation trick  button
let animateTrickSt = document.createElement("section"); // animation box
let animateTrickSt2 = document.createElement("section"); // animation box
let check_animation = true; // check if the animation is visible
let check_deleted = true; // check if the list is deleted
document.body.append(animateTrickSt);
document.body.append(animateTrickSt2);
let search = document.getElementById("searchIn") // the search input
search.type = "text";
search.onchange = (el)=>{
    el.preventDefault()
    searchContacts(el.target.value);
};

let infoCheck = true; // checks if the info popup is visible
document.body.append(infoDocument_parent);
var header_section = document.getElementById("head_section"); // the header
var show_btns_btn = document.getElementById("hamburger"); // the hamburger media section
let check_btns_menu = true // check if the buttons are visible
let infoDocument = document.createElement("section"); // the information section
infoDocument_parent.appendChild(infoDocument)

infoDocument.classList.toggle("infoDocs");
infoDocument.style.display = 'flex';

show_btns_btn.addEventListener("click", ()=>{
    if(check_btns_menu){
        header_section.style.display="flex";
        check_btns_menu = false
    }else{
        header_section.style.display="none";
        check_btns_menu = true;
    }

});

showUsers(); // we'll have to make sure to show the the current list once we enter the site

/**
 * a function that requires a user and creates a popup of his informaion
 * @param {HTMLElement} user - the user information
 * 
 */
function showInfo(user){
  
    if(infoCheck){
        
        let exitBtn = document.createElement("Button");
        exitBtn.classList.toggle("exist_btn");
        exitBtn.addEventListener("click",()=>{

            infoCheck = true;
            infoDocument_parent.style.display = 'none';

        })
        
        infoDocument_parent.style.display = 'flex';
        infoDocument.innerHTML = "";// deleting everything in the element to enter new informaion
        // make sure to gather all of the user's attributes
        let namePlc = document.createElement('p');
        namePlc.innerText = "Name: " + user.name
        let phoneNumber = document.createElement('p');
        phoneNumber.innerText = "phone number: " + user.phoneNumber
        let address = document.createElement('p');
        address.innerText = "Address: " + user.address
        let email = document.createElement('p');
        email.innerText = "Email: " + user.email
        let about = document.createElement('p');
        about.innerText = "About: " + user.about
        infoDocument.append(exitBtn, namePlc, phoneNumber, address, email, about);

        infoCheck = false
    }else{
        // when clicking an information button again the element disappears
        infoCheck = true;
        infoDocument_parent.style.display = 'none';
        
    }

}

/* 
    a function that removes all the contacts from the list
*/
removeAllBtn.addEventListener("click", (el)=>{
    if(check_deleted && window.confirm("Are you sure you want to delete your contacts all contacts ?")){
        el.preventDefault()
        contacts = [];
        contactsSave = [];
        showUsers();
        window.alert("The list was deleted.")
        check_deleted = false;
    }else if(check_deleted){
        window.alert("The list wasn't deleted.")
    }
})

function removeContact(contact) {
    // Show a confirmation prompt with the user's name
    const confirmation = confirm(`Are you sure you want to delete the contact: ${contact.name}?`);

    if (!confirmation) {
        // If the user clicks "Cancel," do nothing and return
        return;
    }

    // Proceed with deleting the contact if confirmed
    contacts = contacts.filter(user => 
        contact.name !== user.name || contact.phoneNumber !== user.phoneNumber
    );
    
    // Update the saved contacts list as well
    contactsSave = contacts.filter(user => 
        contact.name !== user.name || contact.phoneNumber !== user.phoneNumber
    );

    // Reload the contacts list to reflect the changes
    showUsers();
}


addContact.addEventListener("click", (el)=>{
    // a function that turns the add popup on and off
    el.preventDefault();
    clearForm(addForm);
    showAdd(el, form_parent);
    contactEdit = {name:"", phoneNumber: ""
        , address: "", email: "", about: "", img: ""};
});

restore.addEventListener("click", ()=>{
    // a function taht restore the original list of contacts
    check_deleted = true;
    contacts = restoreContacts.filter(()=>{
        return true
    });
    contactsSave = restoreContacts.filter(()=>{
        return true
    });
    showUsers() // reload the contancts list after the restore to show the current list

})


function searchContacts(el){
    // a function that requires a string and searches the contacts for name that has this string
    contacts = contactsSave.filter((contact)=>{

        return contact.name.indexOf(el) != -1;

    })
    showUsers() // we have to make sure to reload the contacts list after the search
    contacts = contactsSave.filter(()=> true);
}

animateTrickBt.addEventListener("click", ()=>{
    animateTrickSt.classList.toggle("animateTrickSt");
    animateTrickSt.innerHTML = "<p>Sanad</p>";
    
    animateTrickSt2.classList.toggle("animateTrickSt2");
    animateTrickSt2.innerHTML = "<p>Bahaa</p>";
    if(check_animation){
        animateTrickSt.style.display = "flex";
        animateTrickSt2.style.display = "flex";
        check_animation = false
    }else{
        animateTrickSt.style.display = "none";
        animateTrickSt2.style.display = "none";
        check_animation = true;
    }

})

