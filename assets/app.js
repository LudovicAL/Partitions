var githubUrl = isMobileDevice() ? "https://github.com/LudovicAL/Partitions/blob/main/" : "https://ludovical.github.io/Partitions/";

function isMobileDevice() {
   console.log("UserAgent: " + navigator.userAgent);
   return (navigator.userAgent.match(/Android/i)
         || navigator.userAgent.match(/webOS/i)
         || navigator.userAgent.match(/iPhone/i)
         || navigator.userAgent.match(/iPad/i)
         || navigator.userAgent.match(/iPod/i)
         || navigator.userAgent.match(/BlackBerry/i)
         || navigator.userAgent.match(/Windows Phone/i));
}

//DATA PROCESSING
requestTitles()
   .then(response => response.json())
   .then(data => {
      if (data.message === "Not Found") {
         console.log("Data not found");
         return;
      }
      console.log("Data retrieved!\nProcessing data...");
      let tuneList = document.getElementById("myList");
      while (tuneList.hasChildNodes()) {
         tuneList.removeChild(tuneList.firstChild);
      }
      for(let i = 0, max = data.tree.length; i < max; i++) {
         let tunePath = data.tree[i].path;
         let indexOfPdf = tunePath.toLowerCase().indexOf(".pdf");
         if (indexOfPdf !== -1) {
            let tuneNames = tunePath.substring(0, indexOfPdf).replaceAll(";", " | ");
            let linkElement = document.createElement("a");
            linkElement.title = tuneNames;
            linkElement.innerHTML = tuneNames;
            linkElement.href = "https://ludovical.github.io/Partitions/" + tunePath.replaceAll(" ", "%20").replaceAll(";", "%3B");
            linkElement.classList.add('link-offset-2');
            linkElement.classList.add('link-offset-3-hover');
            linkElement.classList.add('link-underline');
            linkElement.classList.add('link-underline-opacity-0');
            linkElement.classList.add('link-underline-opacity-75-hover');
            let listElement = document.createElement("li");
            listElement.classList.add('list-group-item');
            listElement.classList.add('list-group-item-action');
            listElement.appendChild(linkElement);
            tuneList.appendChild(listElement);
         }
      }
   })
   
function requestTitles() {
   console.log("Retrieving data...");
   return Promise.resolve(fetch(`https://api.github.com/repos/LudovicAL/Partitions/git/trees/main`));
}
//LIST FILTERING
$(document).ready(function(){
   $("#myInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#myList li").filter(function() {
         $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
   });
});
//TOP BUTTON SETUP
let topButton = document.getElementById("topButton");
window.onscroll = function () {
   scrollFunction();
};
function scrollFunction() {
   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      topButton.classList.remove("d-none");
   } else {
      topButton.classList.add("d-none");
   }
}
topButton.addEventListener("click", backToTop);
function backToTop() {
   document.body.scrollTop = 0;
   document.documentElement.scrollTop = 0;
}