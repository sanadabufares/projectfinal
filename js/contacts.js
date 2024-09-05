let contacts = [
    {name: "Alex", phoneNumber: "0549384988", 
        address:"somewhere", email: "uu@gmail.com",
        about: "its my friend", img:"images1.jpg"},
        {name: "Mark", phoneNumber: "0549554959", 
            address:"somewhere", email: "uu@gmail.com",
            about: "its my friend", img:"images2.jpg"},
            {name: "Borert", phoneNumber: "0549234959", 
                address:"somewhere", email: "uu@gmail.com",
                about: "its my friend", img:"images3.jpg"},
                {name: "Sara", phoneNumber: "0549365459", 
                    address:"somewhere", email: "uu@gmail.com",
                    about: "its my friend", img:"images4.jpg"}
]

let contactsSave = contacts.filter(()=>{
    return true
});

let restoreContacts = contacts.map((el)=>{
    return {...el};
});

let contactEdit = {name:"", phoneNumber: ""
    , address: "", email: "", about: "", img: ""};

let properties = ["name", "phoneNumber", "address", "email", "about"];
