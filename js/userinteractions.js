"use strict";

function editUser(){
    //a function that requires the form responsible for adding contacts and the form observation chech
    // and edits the user's informaion
    contactsSave.forEach((con)=>{

        if((con.name == contactEdit.name && con.phoneNumber == contactEdit.phoneNumber || addForm.childNodes[2].name == con.name + con.phoneNumber)){
            // the system is allowd to change the informaion for only one specific user
            
                console.log(con.name + con.phoneNumber + "   " + contactEdit.img)
                con.name = contactEdit.name;
                con.email = contactEdit.email;
                con.phoneNumber = contactEdit.phoneNumber;
                con.address = contactEdit.address;
                con.img = contactEdit.img;
                con.about = contactEdit.about;
            
        }
        
    });
    // the contacts saving list should change too we dont want to see the previous information again
    contacts = contactsSave.filter(()=>{

        return true;

    })
    showUsers(); // make sure to reload the information
    showUsers()
}

/*

    * a function that requires a user, form and a form observation check and creates a new user

    * @param {object} user the required user info to add to the array

    *@returns {HtmlElement}

    * @example
    * let user = {name: "sara", phoneNumber: "0549365459", 
                    address:"somewhere", email: "uu@gmail.com",
                    about: "its my friend", img:"images4.jpg"}
    * createUser(user)
 */
/**
 * 
 * @param {Object} user - the required user info to add to the array
 * @returns {section} - a section to carry the users information
 * 
 */

function createUser(user){
    
    let section = document.createElement("li"); // the section that will yield the entiry of the user list
    let btnInfo = document.createElement("button"); // a button to show the information for the current user
    let editBtn = document.createElement("button"); // a button to show the add contact popup but with the values of the current user

    editBtn.classList.toggle("editBtn");
    btnInfo.classList.toggle("info_btn");

    editBtn.addEventListener("click", (el)=>{
        // a function that shows the add user popup but this time filled with the current user information
        el.preventDefault()
        form_parent.style.display = 'flex';
        title_form.innerText = "Edit Contact";
        formCheck = false;
        let i = 0;
        addForm.childNodes.forEach(el=>{
            // saving the current users information in a different list to edit it
            if(el.type === 'text'){
                el.name = user['name'] + user['phoneNumber']
                el.value = Object.values(user)[i]
                contactEdit[Object.entries(user)[i][0]] = Object.values(user)[i]
                i++;
            }
            if(el.type === 'file')
                contactEdit[Object.entries(user)[i][0]] = Object.values(user)[i]

        })
        
    });

    btnInfo.addEventListener("click", ()=>{
        // a function that calles the showinfo function in order to show the current user information list
        showInfo(user);

    });
    
    let propsSeciton = document.createElement("section")
    let removeCurrent = document.createElement("button");
    removeCurrent.classList.toggle("remove_btn");
    removeCurrent.addEventListener("click", ()=>{

        removeContact(user, contactsSave);

    })
    section.addEventListener("mouseover", ()=>{
        // a funciton that 
        section.classList.remove("user")
        
        section.classList.toggle("userColor");
    }, false)

    section.addEventListener("mouseout", ()=>{
        section.classList.remove("userColor")
        section.classList.toggle("user");
    }, false)

    propsSeciton.classList.toggle("propsSection");
    section.classList.toggle("user")
    let img = document.createElement("img");
    let pName = document.createElement("p");
    let phoneNumber = document.createElement("p");
    img.src = "../images/" + user.img;
    img.style.borderRadius = "4rem";
    img.style.width = "5rem";
    pName.innerText = user.name;
    phoneNumber.innerText = user.phoneNumber;
    section.append(img);
    propsSeciton.append(pName);
    propsSeciton.append(phoneNumber);
    section.append(propsSeciton);
    
    section.append(editBtn);
    section.append(btnInfo);
    section.append(removeCurrent);
    return section;
}


function addUser(form, formCheck) {
    // Regular expressions for validation
    const nameRegex = /^[A-Za-z\s]+$/;  // Allows only letters and spaces
    const phoneRegex = /^[0-9]+$/;      // Allows only numbers

    // Validate the name
    if (!nameRegex.test(contactEdit.name)) {
        alert('Please enter a valid name (letters only).');
        return; // Stop the function if the name is invalid
    }

    // Validate the phone number
    if (!phoneRegex.test(contactEdit.phoneNumber)) {
        alert('Please enter a valid phone number (numbers only).');
        return; // Stop the function if the phone number is invalid
    }

    // Check if the name already exists in the contacts list
    const nameExists = contacts.some(contact => contact.name === contactEdit.name);
    
    if (nameExists) {
        alert('A contact with this name already exists. Please use a different name.');
        return; // Stop the function if the name exists
    }

    // If the name doesn't exist and validations pass, proceed with adding the contact
    contacts.push({...contactEdit}); // Push a copy of the contactEdit object
    contactsSave.push({...contactEdit}); // Save to the backup array

    // Clear the form and hide it after adding the user
    clearForm(form);
    showAdd({ preventDefault: () => {} }, form_parent);
    formCheck = true;

    // Reload the contacts list to reflect the new contact
    showUsers();
}



/**
 * a function that reqiores a form and a form ovservation check and prints the current users
 * information from a to z
*/
function showUsers(){
    
    let contactsSec = document.getElementById("contactsSec");
    let emptyzone = document.getElementById("emptyCon");
    contactsSec.innerHTML = "";
    contacts.sort((a, b) => {
        
        const nameA = a.name.toLowerCase(); // Convert names to lowercase for case-insensitive sorting
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) {
          return -1; // a comes before b
        } else if (nameA > nameB) {
          return 1; // b comes before a
        }
        // names must be equal
        return 0;
      });
    if (contacts.length > 0){
        check_deleted = true;
        emptyzone.style.display = "none";
        contacts.forEach(el => {
            contactsSec.append(createUser(el));
        });
    }
    else{
        emptyzone.style.display = "flex"; // if the list was empty we need a clear message to the user
        if(contactsSave.length == 0)
            check_deleted = false;
    }

}
