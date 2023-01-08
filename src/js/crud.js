const userInfo=document.getElementById('user-info')
const userInfoForm=document.getElementById('user-info-form');
const userName=document.getElementById('user-info-name');
const lastName=document.getElementById('user-info-surname');
const userEmail=document.getElementById('user-info-email');
const contentUsers=document.getElementById('content-users');
const userInfoButton=document.getElementById('user-info-button');
const userInfoTitle=document.getElementById('user-info-title');

userInfo.addEventListener('click',(e)=>{
    if(e.target.classList.contains('button--cancel')){
        userInfoButton.textContent='New user';
        userInfoTitle.textContent='New user';
        userName.value='';
        lastName.value='';
        userEmail.value='';
        userInfoForm.action=`/add-user`;
    }
});

contentUsers.addEventListener('click',(e)=>{
    if (e.target.classList.contains('button--edit')){
        userInfoButton.textContent='Update user';
        userInfoTitle.textContent='Update user';
        userName.value=e.target.parentElement.children[0].textContent;
        lastName.value=e.target.parentElement.children[1].textContent;
        userEmail.value=e.target.parentElement.children[2].textContent;
        userInfoForm.action=`/update-user/${e.target.parentElement.dataset.id}`;
    }else if(e.target.classList.contains('button--delete')){
        fetch(`/delete-user/${e.target.parentElement.dataset.id}`,{
            method:'DELETE',
        })
        .then(res=>res.json())
        .then(data=>{
            if (data.ok) location.reload();
        })
    }

})

//colocar al submir o validacion del formulario al final
userInfoForm.addEventListener('submit',(e)=>{
    e.preventDefault();//evita q se ejecute el metodo por defecto q es enviar el fomulario
    if(userName.value.trim()!='' && lastName.value.trim()!='' && userEmail.value.trim()!=''){
        e.target.submit()
    }
});