var gender = "notSelected";
var age = "notSelected";
var hasCorona = true;
var emailOrPhone = "";
var relation = "";
var patientHistory = "";
console.log(document.getElementById("check").checked);

var site = 'http://13.76.6.127';
// const $ = document.querySelector.bind(document);
const imageHolder = $('#blah');
// const modalBody = $('#modal-body');
let formData, hasFile = false;

function resetVals() {
    console.log("reseting...");
    $('textarea').val('');
    jQuery('#emailOrPhone').val('');
    jQuery('#relation').val('');
    document.getElementById(gender).checked = false;
    document.getElementById("check").checked = true;
    hasCorona = true;
    jQuery("input[type='number']").val('');
    gender = "notSelected";
    age = "notSelected";
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase()) || email === "";
}

function validatePhone(phone) {
    var re =/(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/
    return re.test(String(phone).toLowerCase()) || phone === "";
}

hideImage = function () {
    imageHolder.css('visibility', 'hidden');
}
showImage = function () {
    imageHolder.css('visibility', 'visible');
}

function isInvalidAge(age) {
    return age < 0 || age > 150;
}

hideImage();

jQuery('input[type="radio"]').on('change', function () {
    gender = this.value;
});

jQuery('input[type="number"]').on('change', function () {
    age = this.value;
});
jQuery('input[type="checkbox"]').on('change', function () {
    hasCorona = !this.checked;
    console.log(hasCorona);
    
});

jQuery('#emailOrPhone').on('change', function () {
    emailOrPhone = this.value;
});
jQuery('#relation').on('change', function () {
    relation = this.value;
});

jQuery('textarea').on('change', function () {
    console.log(this.value);
    console.log(typeof this.value);

    patientHistory = this.value;
});


function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah')
                .attr('src', e.target.result)
                .width(150)
                .height(200);

            showImage();
            hasFile = true;
        };
        formData = new FormData()
        formData.append('myFile', input.files[0]);
        reader.readAsDataURL(input.files[0]);
    }
}

document.getElementById("fileChoose").addEventListener("click", () => {
    console.log("Choose file");
    $("#fl").click();
});

$('.ribbons').on('click', (e) => {
    e.preventDefault();
    if (hasFile && gender != 'notSelected' && age != 'notSelected' && !isInvalidAge(age) && relation !== "" && (validateEmail(emailOrPhone) || validatePhone(emailOrPhone))) {
        hideImage();
        console.log("History: ");
        console.log(typeof patientHistory);
        console.log(patientHistory);
        formData.append('age', age);
        formData.append('gender', gender);
        formData.append('hasCorona', hasCorona);
        formData.append('history', patientHistory);
        formData.append('emailOrPhone', emailOrPhone);
        formData.append('relation', relation);
        //sumbittor's data
        emailOrPhone = emailOrPhone || "null";
        console.log("emailOrPhone: " + emailOrPhone);
        
        hasFile = false;
        console.log("Form Data");

        console.log(formData);

        
        // document.getElementById("overlay").style.display = "block";
        // $(".lds-ellipsis").style.display = "inline-block"
        fetch(site + '/submit/data', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                // $(".lds-ellipsis").style.display = "none";
                // document.getElementById("overlay").style.display = "none";
                // document.getElementById("getNewFile").disabled = false;
                console.log(data);
                console.log(data.success);
                resetVals();
                let addedClass = data.success ? "Success" : "Fail",
                removedClass = data.success ? "Fail" : "Success";
                let result = data.success ? "Successfull" : "  Failed";
                var text = document.createTextNode(" Submission " + result);
                document.getElementById("msg").appendChild(text);
                $("#cntMod").addClass(data.hasCorona ? "redBorder" : "greenBorder");
                $("#cntMod").addClass(addedClass)
                $("#cntMod").removeClass(removedClass);
                // modalBody.addClass(addedClass);
                // modalBody.removeClass(removedClass);
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

