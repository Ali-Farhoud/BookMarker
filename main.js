const siteName=document.getElementById('site-name');
const siteURL=document.getElementById('site-url');
const form=document.getElementById('inputForm');
const output=document.getElementById('output');

const getMarks=()=>{
    let marks;
    if(localStorage.getItem('marks')===null){
        marks=[];
    }else{
        marks=JSON.parse(localStorage.getItem('marks'));
    }
    return marks;
}

const displayMarks=()=>{
    const marks=getMarks();
    marks.forEach((mark)=>addBookMarks(mark.name,mark.url));

}
const addMarkToStore=(name,url)=>{
    let mark={
        name,
        url
    };
    const marks=getMarks();
    marks.push(mark);
    localStorage.setItem('marks',JSON.stringify(marks));
}
const addBookMarks=(name,url)=>{
    
    
        const div=document.createElement('div');
        div.style.background='lightgray';
        div.className='p-3 mb-3';
        div.innerHTML=`<big class="me-3">${name}</big>
                        <button onClick="window.open('${url}');" class="btn btn-primary">Visit</button>
                        <button  class="btn btn-danger delete">Delete</button>`;
        output.appendChild(div);
    
}
const deleteFromStore=(name)=>{
    let marks=getMarks();
    marks.forEach((mark,index)=>{
        if(mark.name===name ){
            marks.splice(index,1);
        }
    });
    localStorage.setItem('marks',JSON.stringify(marks));
};

// EVENTS
form.addEventListener('submit',(e)=>{
     e.preventDefault();
    if(siteName.value.length>0 && siteURL.value.length>0){
       addBookMarks(siteName.value,siteURL.value);
       addMarkToStore(siteName.value,siteURL.value);
       siteName.value='';
       siteURL.value='';
    }else{
        alert('something is missing');
    }
});
// Delete
output.addEventListener('click',(e)=>{
    if(e.target.classList.contains('delete')){
        let current =e.target.parentElement;
        deleteFromStore(e.target.parentElement.firstChild.textContent);
        e.target.parentElement.parentElement.removeChild(current);
        
    }
});

document.addEventListener('DOMContentLoaded',displayMarks);



