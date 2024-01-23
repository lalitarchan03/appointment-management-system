const nInput = document.querySelector('#name');
const eInput = document.querySelector('#email');
const pInput = document.getElementById('phoneNumber');
const msg = document.getElementById('msg');
const btn = document.querySelector('.btn');

btn.addEventListener('mouseover', (e) => {

    e.preventDefault();

    if(nInput.value === '' || eInput.value === '' || !pInput.value) {
        btn.style.color = 'blue';
        msg.style.color = 'red';
        msg.innerHTML = 'Please fill all the fields!';
        setTimeout(() => msg.innerHTML = '', 3000);
        setTimeout(() => btn.style.color = 'black', 3000);
    }
});

const form = document.getElementById('my-form');

form.addEventListener('submit', async (e) => {

    e.preventDefault();
    
    const formData = new FormData(form);
    const formDataObject = {};
    
    formData.forEach((value, key) => {
        formDataObject[key] = value;
    });
    // console.log(1, formDataObject);
   
    axios.post("http://localhost:3000/user/add-user", formDataObject)
    .then((res) => {
            // console.log(2, res);
            form.reset();
            addUserDetailsOnScreen(res.data.newUserDetail)
    })
    .catch((err) =>{
        document.body.innerHTML = document.body.innerHTML + '<h3> Somthing went wrong </h3>';
        console.log(err);
    })

});

function addUserDetailsOnScreen(curUserDetails) {
    const parentList = document.getElementById('items');
    const newListItem = document.createElement('li');
    newListItem.appendChild(document.createTextNode('Name: ' + curUserDetails.name + ', ' + 'Email: ' + curUserDetails.email + ', ' + 'Phone Number: ' + curUserDetails.phoneNumber));
    parentList.appendChild(newListItem);

    // delete button 
    const delbtn = document.createElement('button');
    delbtn.className = 'delete';
    delbtn.innerText = 'X';
    delbtn.onclick = () => {
        // localStorage.removeItem(email);
        let userId = curUserDetails.userId;
        axios.delete(`http://localhost:3000/user/delete/${userId}`)
            .then(res => {
                // showAllUser();
                nodeToDelete = document.getElementById(email);
                // console.log(parentList);
                // console.log(newListItem);
                parentList.removeChild(newListItem);
                console.log(`Deleted post with ID ${userId}`);
            })
            .catch((err) => {
                console.log(err);
            });
        
    }
    newListItem.appendChild(delbtn);

    // edit button 
    // const editbtn = document.createElement('button');
    // editbtn.innerText = 'Edit';
    // editbtn.className = 'edit';
    // editbtn.onclick = () => {

    //     nInput.value = curUserDetails.name;
    //     eInput.value = curUserDetails.email;
    //     pInput.value = curUserDetails.phoneNumber;
        
    //     let userId = curUserDetails.userId;
    //     axios.put(`http://localhost:3000/user/update/${userId}`)
    //         .then(res => {
    //             parentList.removeChild(newListItem);
    //             // console.log(`Deleted post with ID ${postIdToDelete}`);
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //         });
    // }
    // newListItem.appendChild(editbtn);
}


window.addEventListener("DOMContentLoaded", () => {
    // axios.get("http://localhost:3000/user/get-user")
    //     .then((res) => {
    //         for (let i=0; i < res.data.allUserDetail.length; i++) {
    //             console.log('GET', res.data.allUserDetail[i]);
    //             addUserDetailsOnScreen(res.data.allUserDetail[i]);
    //         }
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
    showAllUser();
});

const showAllUser = (req, res, next) => {
    axios.get("http://localhost:3000/user/get-user")
        .then((res) => {
            for (let i=0; i < res.data.allUserDetail.length; i++) {
                // console.log('GET', res.data.allUserDetail[i]);
                addUserDetailsOnScreen(res.data.allUserDetail[i]);
            }
        })
        .catch((err) => {
            console.log(err);
        })
};