//DOM
var site = 'http://13.76.6.127';
var gender = "notSelected";
var age = "notSelected";

const $ = document.querySelector.bind(document);
const imageHolder = $('#blah');
const modalBody = $('#modal-body');
let formData;
function isInvalidAge(age) {
  return age<0 || age>150;  
}


jQuery('input[type="radio"]').on('change', function () {
  gender = this.value;
});

jQuery('input[type="number"]').on('change', function () {
  age = this.value;
});

hideImage = function () {
  imageHolder.style.visibility = 'hidden';
  console.log("Hiding image");

}
showImage = function () {
  console.log("Showing image");
  imageHolder.style.visibility = 'visible';
}

hideImage();
//APP
let App = {};
App.init = function () {

  //Init

  function handleFileSelect(evt) {
    console.log("Handle File...");
    console.log(evt.target.files[0]);
    
    if (evt.target.files[0]) {
      const files = evt.target.files; // FileList object
    console.log(files);
    
    formData = new FormData()
    formData.append('myFile', evt.target.files[0]);
    formData.append('age', age);
    formData.append('gender', gender);
    //files template
    let template = `${Object.keys(files).
      map(file => `<div class="file file--${file}">
     <div class="name"><span>${files[file].name}</span></div>
     <div class="progress active"></div>
     <div class="done">
	<a href="" target="_blank">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000">
		<g><path id="path" d="M500,10C229.4,10,10,229.4,10,500c0,270.6,219.4,490,490,490c270.6,0,490-219.4,490-490C990,229.4,770.6,10,500,10z M500,967.7C241.7,967.7,32.3,758.3,32.3,500C32.3,241.7,241.7,32.3,500,32.3c258.3,0,467.7,209.4,467.7,467.7C967.7,758.3,758.3,967.7,500,967.7z M748.4,325L448,623.1L301.6,477.9c-4.4-4.3-11.4-4.3-15.8,0c-4.4,4.3-4.4,11.3,0,15.6l151.2,150c0.5,1.3,1.4,2.6,2.5,3.7c4.4,4.3,11.4,4.3,15.8,0l308.9-306.5c4.4-4.3,4.4-11.3,0-15.6C759.8,320.7,752.7,320.7,748.4,325z"</g>
		</svg>
						</a>
     </div>
    </div>`).
      join("")}`;

    $("#drop").classList.add("hidden");
    $("footer").classList.add("hasFiles");
    document.querySelectorAll('.importar').forEach(el => {
      el.classList.add("active");
    });
    // $(".importar").classList.add("active");
    setTimeout(() => {
      $(".list-files").innerHTML = template;
      // document.getElementById("getNewFile").disabled = true;
      setTimeout(() => {
        showImage();
        imageHolder.src = URL.createObjectURL(evt.target.files[0]);

      }, 3000);
    }, 1000);

    Object.keys(files).forEach(file => {
      let load = 2000 + file * 2000; // fake load
      setTimeout(() => {
        $(`.file--${file}`).querySelector(".progress").classList.remove("active");
        $(`.file--${file}`).querySelector(".done").classList.add("anim");
      }, load);
    });  
    } 
  }






  // trigger input
  $("#triggerFile").addEventListener("click", evt => {
    evt.preventDefault();
    console.log("Gender: " + gender);
    console.log("Age: " + age);
    if (gender === "notSelected" || age === "notSelected" || isInvalidAge(age)) {
      document.getElementById('err-btn').click();
      setTimeout(() => {
        $('#exit-btn').click();
      }, 4000);
    }
    else {
      $("input[type=file]").click();
    }
    // $("input[type=file]").click();
  });

  // drop events
  // $("#drop").ondragleave = evt => {
  //   $("#drop").classList.remove("active");
  //   evt.preventDefault();
  // };
  // $("#drop").ondragover = $("#drop").ondragenter = evt => {
  //   $("#drop").classList.add("active");
  //   evt.preventDefault();
  // };
  // $("#drop").ondrop = evt => {
  //   $("input[type=file]").files = evt.dataTransfer.files;
  //   $("footer").classList.add("hasFiles");
  //   $("#drop").classList.remove("active");
  //   evt.preventDefault();
  // };
  function goToFirstScreen() {
    hideImage();
    // document.getElementById('res').style.display = 'none';
    $(".list-files").innerHTML = "";
    $("footer").classList.remove("hasFiles");
    document.querySelectorAll('.importar').forEach(el => {
      el.classList.remove("active");
    });
    // $(".importar").classList.remove("active");
    setTimeout(() => {
      $("#drop").classList.remove("hidden");
    }, 500);
  }
  function resetVals() {
    console.log("reseting...");

    document.getElementById(gender).checked = false;
    jQuery("input[type='number']").val('');
    gender = "notSelected";
    age = "notSelected";
  }

  // input change
  $("input[type=file]").addEventListener("change", handleFileSelect);

  //btn click listners
  $("#difFile").addEventListener("click", () => {
    console.log("Upload different file");
    goToFirstScreen();
    $("input[type=file]").click();
  });

  $("#difTest").addEventListener("click", () => {
    resetVals();
    goToFirstScreen();
  });

  //upload more
  $("#goBack").addEventListener("click", () => {
    goToFirstScreen();
  });
  $("#test").addEventListener("click", () => {
    console.log("Overlay...");
    document.getElementById("overlay").style.display = "block";
    $(".lds-ellipsis").style.display = "inline-block"
    console.log(formData);
    fetch(site + '/upload/', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        
        $(".lds-ellipsis").style.display = "none";
        // document.getElementById('res').style.display = "inline-block";
        // let addedAlert = data.hasCorona ? "alert-danger" : "alert-success", removedAlert = data.hasCorona ? "alert-success" : "alert-danger";
        // document.getElementById('res').classList.remove(removedAlert);
        // document.getElementById('res').classList.add(addedAlert);
        console.log("Overlay gone...");
        document.getElementById("overlay").style.display = "none";
        // document.getElementById("getNewFile").disabled = false;
        // console.log(data);
        // console.log(data.hasCorona);
        // console.log(typeof data.hasCorona);

        let addedClass = data.hasCorona ? "Positive" : "Negative", removedClass = data.hasCorona ? "Negative" : "Positive";
        // let result = data.hasCorona ? "  Positive ( + ) " : "  Negative ( - )";
        modalBody.innerHTML = data.positiveProbabilty + " %";
        //document.getElementById('res').innerHTML = " Test " + result;
        $(".modal-content").classList.add(data.hasCorona ? "redBorder" : "greenBorder");
        $(".modal-content").classList.add(addedClass);
        $(".modal-content").classList.remove(removedClass);
        modalBody.classList.add(addedClass);
        modalBody.classList.remove(removedClass);
        document.getElementById('mBtn').click();
      })
      .catch(error => {
        console.error(error)
      });
  })
  jQuery('#myModal').on('hide.bs.modal', function () {
    resetVals();
    goToFirstScreen();
})
}();

