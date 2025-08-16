let members = JSON.parse(localStorage.getItem("members")) || [];
const memberForm = document.getElementById("member-form");
const memberList = document.getElementById("member-list");
const editIndex = document.getElementById("editIndex");

function renderMembers(){
  memberList.innerHTML="";
  members.forEach((member,index)=>{
    memberList.innerHTML+=`
      <tr>
        <td>${member.name}</td>
        <td>${member.email}</td>
        <td>${member.memberId}</td>
        <td>
          <button onclick="editMember(${index})">✏️ Edit</button>
          <button onclick="deleteMember(${index})">🗑️ Delete</button>
        </td>
      </tr>
    `;
  });
}

memberForm.addEventListener("submit",e=>{
  e.preventDefault();
  const name=document.getElementById("name").value;
  const email=document.getElementById("email").value;
  const memberId=document.getElementById("memberId").value;
  if(editIndex.value==="") members.push({name,email,memberId});
  else { members[editIndex.value]={name,email,memberId}; editIndex.value=""; }
  localStorage.setItem("members",JSON.stringify(members));
  memberForm.reset();
  renderMembers();
});

function editMember(index){
  const member=members[index];
  document.getElementById("name").value=member.name;
  document.getElementById("email").value=member.email;
  document.getElementById("memberId").value=member.memberId;
  editIndex.value=index;
}

function deleteMember(index){
  members.splice(index,1);
  localStorage.setItem("members",JSON.stringify(members));
  renderMembers();
}

renderMembers();
