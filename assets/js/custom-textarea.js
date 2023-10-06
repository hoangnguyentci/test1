$(document).ready(function(){
  const textarea = document.getElementById('note-create-form-note');
  textarea.addEventListener("keyup", e => {
    textarea.style.height = "63px";
    let scHeight = e.target.scrollHeight;
    textarea.style.height = `${scHeight}px`;
  });
})
