"use strict";


/**
 * a function that requires an event and a form
    displays or removes the add contact form
 * 
 * 
 * @param {*} el 
 * @param {*} form 
 * @example
 * 
 */
function showAdd(el, form){
   
    el.preventDefault()
    if(formCheck){
        form.style.display = 'flex';
        formCheck = false;
    }
    else{
        formCheck = true;
        form.style.display = 'none';
        contactEdit = {name:"", phoneNumber: ""
            , address: "", email: "", about: "", img: ""};
    }

}
/**
 * a function creates the labels and the inputs for the add contact form
 * @param {*} el - a string to represent a person's property type
 * @param {*} form - a form for adding a contact 
 * 
 * @example
 * addLabels("string", form);
 * 
 */
function addLabels(el, form){

    let label1 = document.createElement("label");
    label1.innerText = "Enter " + el;
    let input1 = document.createElement("input");
    
    if (el === 'phoneNumber' || el === 'name'){
        input1.required = true;
    }
    input1.onchange = (txt)=>{

        contactEdit[el] = txt.target.value;

    }
    
    input1.type = "text"; // make the input of type text
    input1.name = el;
    
    form.append(label1);
    form.appendChild(input1);

}

/**
 * a function that requries a formcheck to check if the form is displayed or isnt and 
 * creates and returns a form
 * @param {*} formCheck - a value to check if the form is already opened or closed
 * @returns {form} - the form required for the addition of a user
 * @example
 * let form = addBlock()
 * let form_parent = document.createElement("section");
 * form_parent.appendchild(form);
 * document.body.appendchild(form_parent)
 */
function addBlock(formCheck){

    let btnClose = document.createElement("button"); // a button to close the form
    let imageBtn = document.createElement("img") // an image for the close button
    let imageInput = document.createElement("input"); // an input for images
    
    imageInput.type = "file" // the type of input for the image
    imageInput.accept = "image/jpeg, image/png" // we dont allow anything but images


    btnClose.classList.toggle("btnClose")
    imageBtn.src = "../images/exit.png"
    imageBtn.style.width = "1rem";
    imageInput.onchange = (el)=>{
        contactEdit['img'] = el.target.files[0].name
    }
    btnClose.append(imageBtn);
    
    // creating the form
    let form = document.createElement("form");
    form.append(btnClose);
    btnClose.addEventListener("click", el=>{
        title_form.innerText = "Enter values for new user";
        showAdd(el, form_parent);
    })
    form.classList.toggle("addPeople");
    
    properties.forEach(el=>{
        // to each propertie name phone number ... we add an input and a label
        addLabels(el, form);

    })
    
    form.append(imageInput);
    let submit = document.createElement("input");
    submit.type = "submit";

    form.addEventListener("submit", (el)=>{
        // when we submit we need to make sure to prevent the page from refreshing 
        // and then we add a user
        el.preventDefault();
        addUser(form, formCheck);
        return false
        
    });
    form.append(submit);

    return form
}

/**
 * a function that clears the form of the users info
 * 
 * @param {form} addForm - the form for adding users
 * 
 * @example
 * let btn = document.createElement("button");
 * 
 * btn.addEventListener("click", ()=>{
 * 
 * clearForm(addForm);
 *  
 * })
 */
function clearForm(addForm){
    contactEdit = {name:"", phoneNumber: ""
        , address: "", email: "", about: "", img: ""};
    addForm.childNodes.forEach(el=>{
        
        if(el.type === 'text'){
            el.value = ""
            el.name = "";
        }
    
    })

}
