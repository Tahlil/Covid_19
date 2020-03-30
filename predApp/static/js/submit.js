var gender = "notSelected";
var age = "notSelected";

// const $ = document.querySelector.bind(document);
const imageHolder = $('#blah');
const modalBody = $('#modal-body');
let formData, hasFile = false;;

hideImage = function() {
    imageHolder.css('visibility', 'hidden');
}
showImage = function() {
    imageHolder.css('visibility', 'visible');
}

function isInvalidAge(age) {
    return age < 0 || age > 150;
}

jQuery('input[type="radio"]').on('change', function() {
    gender = this.value;
});

jQuery('input[type="number"]').on('change', function() {
    age = this.value;
});


function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah')
                .attr('src', e.target.result)
                .width(150)
                .height(200);

                formData = new FormData()
                formData.append('myFile', e.target.result);
                formData.append('age', age);
                formData.append('gender', gender);
                showImage();
        };

        reader.readAsDataURL(input.files[0]);
       
    }
}
hideImage();
document.getElementById("fileChoose").addEventListener("click", () => {
    console.log("Choose file");
    $("#fl").click();
  });

// $(document).ready(function() {
   
//     console.log("Document ready.");
//     // document.getElementById("fl").addEventListener("click", evt => {
//     //     evt.preventDefault();
//     // });

//     // $("input[type=file]").on("change", (evt) => {
//     //     console.log("Handle image");
        
//     //     hasFile = true;
//     //     const files = evt.target.files; // FileList object
//     //     formData = new FormData()
//     //     formData.append('myFile', evt.target.files[0]);
//     //     formData.append('age', age);
//     //     formData.append('gender', gender);
//     //     console.log(evt.target.files[0]);
//     //     console.log(imageHolder);
//     //     imageHolder.src = URL.createObjectURL(evt.target.files[0]);
//     //     showImage();
//     // });

//     // $('.ribbon').on('click', () => {
//     //     console.log("Ribbon clicked");
        
//     //     if (hasFile && gender != 'notSelected' && age != 'notSelected' && !isInvalidAge(age)) {
//     //         hideImage();
//     //         hasFile = false;
//     //         document.getElementById("overlay").style.display = "block";
//     //         $(".lds-ellipsis").style.display = "inline-block"
//     //         fetch(site + '/submit/', {
//     //                 method: 'POST',
//     //                 body: formData
//     //             })
//     //             .then(response => response.json())
//     //             .then(data => {
//     //                 $(".lds-ellipsis").style.display = "none";
//     //                 document.getElementById("overlay").style.display = "none";
//     //                 // document.getElementById("getNewFile").disabled = false;
//     //                 console.log(data);
//     //                 console.log(data.success);
//     //                 let addedClass = data.success ? "Success" : "Fail",
//     //                     removedClass = data.success ? "Fail" : "Success";
//     //                 let result = data.success ? "Successfull" : "  Failed";
//     //                 modalBody.innerHTML = " Submission " + result;
                 
//     //                 $(".modal-content").classList.add(data.hasCorona ? "redBorder" : "greenBorder");
//     //                 $(".modal-content").classList.add(addedClass);
//     //                 $(".modal-content").classList.remove(removedClass);
//     //                 modalBody.classList.add(addedClass);
//     //                 modalBody.classList.remove(removedClass);
//     //                 document.getElementById('mBtn').click();
//     //             })
//     //             .catch(error => {
//     //                 console.error(error)
//     //             });
//     //     } else {
//     //         $('#err-btn').click();
//     //         setTimeout(() => {
//     //             $('#exit-btn').click();
//     //         }, 4000);
//     //     }

//     // });




// });