document.addEventListener('click', function(event) {
  if (!event.target.parentNode.matches('.dropdown-email-menu') && 
      !event.target.parentNode.matches('.svg-logo1') &&
      !event.target.parentNode.matches('.email') &&
      !event.target.matches('.email') &&
      !event.target.matches('.share-via-email')) {
    var openDropdown = document.getElementsByClassName('dropdown-email-menu')[0];
    if(openDropdown.classList.contains('show')) {
      openDropdown.classList.remove('show');
    }
  }

  if (!event.target.parentNode.matches('.dropdown-sms-menu') && 
      !event.target.parentNode.matches('.svg-logo') &&
      !event.target.parentNode.matches('.sms') &&
      !event.target.matches('.share-via-sms') &&
      !event.target.matches('.sms')) {
    var openDropdownSMS = document.getElementsByClassName('dropdown-sms-menu')[0];
    if(openDropdownSMS.classList.contains('show')) {
      openDropdownSMS.classList.remove('show');
    }
  }
});


function shareEmail() {
  var email = document.getElementById('email').value;
  var element = document.getElementsByClassName('invalid-email-input')[0];

  if (!validateEmail(email)) {
    element.innerHTML = 'Invalid email address';
  } else {
    var url = '/api/share/email';
    var shareUrl = document.location.href;

    var request = new Request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: email,
        body: shareUrl,
      }),
    });

    fetch(request)
    .then((data) => {
      element.innerHTML = '';
      var button = document.getElementsByClassName('email-button')[0];
      button.classList.add('button-sent');
      button.value = 'SENT!';
      setTimeout(function() {
        var input = document.getElementsByClassName('email_input')[0];
        document.getElementById('email').value = '';
        document.getElementById('email').placeholder = 'Please enter an email';
        button.classList.remove('button-sent');
        button.value = 'SEND';
      }, 3000);
    })
    .catch((err) => {
      console.log(err);
      element.innerHTML = "An error occured";        
    })        
  }
}

function dropdownEmail() {
  var element = document.getElementsByClassName('invalid-email-input')[0];
  element.innerHTML = '';
  document.getElementsByClassName('dropdown-email-menu')[0].classList.toggle("show");
}

function validateEmail(email) {
  var re = /^\S+@\S+\.\S+$/;
  return re.test(email);
}

function shareSMS() {
  var phone = document.getElementById('sms').value;
  var element = document.getElementsByClassName('invalid-sms-input')[0];

  if (!validatePhone(phone)) {
     element.innerHTML = 'Invalid phone number';
  } else {
    var url ='/api/share/sms';
    var shareUrl = document.location.href;

    var request = new Request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: phone,
        html: shareUrl,
      }),
    });

    fetch(request)
    .then((data) => {
      element.innerHTML = '';
      var button = document.getElementsByClassName('sms-button')[0];
      button.classList.add('button-sent');
      button.value = 'SENT!';
      setTimeout(function() {
        var input = document.getElementsByClassName('sms_input')[0];
        document.getElementById('sms').value = '+1 ';
        button.classList.remove('button-sent');
        button.value = 'SEND';
      }, 3000);
    })
    .catch((err) => {
      console.log(err);
      element.innerHTML = "An error occured";        
    }) 
  }
}

function dropdownSMS() {
  var element = document.getElementsByClassName('invalid-sms-input')[0];
  element.innerHTML = '';
  document.getElementsByClassName('dropdown-sms-menu')[0].classList.toggle("show");
 }

function validatePhone(phone) {
  return phone.match(/\d/g).length===11;
}
