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
    imageHolder.style.visibility = 'visible';
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
$(document).ready(function() {
    hideImage();
    $('#fileChoose').on('click', () => {
        $("input[type=file]").click();
    });

    $("input[type=file]").on("change", () => {
        showImage();
        hasFile = true;
        const files = evt.target.files; // FileList object
        formData = new FormData()
        formData.append('myFile', evt.target.files[0]);
        formData.append('age', age);
        formData.append('gender', gender);
        imageHolder.src = URL.createObjectURL(evt.target.files[0]);

    });

    $('.ribbon').on('click', () => {
        if (hasFile && gender != 'notSelected' && age != 'notSelected' && !isInvalidAge(age)) {
            hideImage();
            hasFile = false;
            document.getElementById("overlay").style.display = "block";
            $(".lds-ellipsis").style.display = "inline-block"
            fetch(site + '/submit/', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    $(".lds-ellipsis").style.display = "none";
                    document.getElementById("overlay").style.display = "none";
                    // document.getElementById("getNewFile").disabled = false;
                    console.log(data);
                    console.log(data.success);
                    let addedClass = data.success ? "Success" : "Fail",
                        removedClass = data.success ? "Fail" : "Success";
                    let result = data.success ? "Successfull" : "  Failed";
                    modalBody.innerHTML = " Submission " + result;
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
        } else {
            $('#err-btn').click();
            setTimeout(() => {
                $('#exit-btn').click();
            }, 4000);
        }

    });




});