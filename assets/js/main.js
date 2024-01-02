// 
// CLICK NEXT SILDES
// 

let currentIndexVietNam = 0;
let currentIndexThaiLand = 0;

function clickNext(country) {
  if (country === 'vietnam' && currentIndexVietNam < 2) {
    currentIndexVietNam++;
    updateBoxes(country);
  } else if (country === 'thailand' && currentIndexThaiLand < 2) {
    currentIndexThaiLand++;
    updateBoxes(country);
  }
}

function clickPrevious(country) {
  if (country === 'vietnam' && currentIndexVietNam > 0) {
    currentIndexVietNam--;
    updateBoxes(country);
  } else if (country === 'thailand' && currentIndexThaiLand > 0) {
    currentIndexThaiLand--;
    updateBoxes(country);
  }
}

function updateBoxes(country) {
  const boxes = document.querySelectorAll(`.box.${country}`);
  const navigationRight = document.querySelector(`.${country} .navigation-right`);
  const navigationLeft = document.querySelector(`.${country} .navigation-left`);

  anime({
    targets: `.box.${country}.active`,
    opacity: 0,
    duration: 200,
    easing: 'easeInOutQuad',
    complete: function () {
      boxes.forEach(box => box.classList.remove('active'));
      boxes[country === 'vietnam' ? currentIndexVietNam : currentIndexThaiLand].classList.add('active');

      if ((currentIndexVietNam === 2 && country === 'vietnam') || (currentIndexThaiLand === 2 && country === 'thailand')) {
        navigationRight.style.display = 'none';
        navigationLeft.style.display = 'block';
      } else if ((currentIndexVietNam === 0 && country === 'vietnam') || (currentIndexThaiLand === 0 && country === 'thailand')) {
        navigationLeft.style.display = 'none';
      } else {
        navigationRight.style.display = 'block';
        navigationLeft.style.display = 'block';
      }

      anime({
        targets: `.box.${country}.active`,
        opacity: 1,
        duration: 200,
        easing: 'easeInOutQuad'
      });
    }
  });
}



const boxSubs = document.querySelectorAll('.box-sub');
boxSubs.forEach(boxSub => {
    boxSub.addEventListener('click', () => clickBySub(boxSub));
    // console.log('ok');
});

function clickBySub(boxSub) {
  var selectedCategory = boxSub.getAttribute("data-sub");
  // ngoai tru box comming soon thi duoc nhay tag moi
  if(selectedCategory !== 'none'){
    window.open('selectionTickets.html' ,'_blank');
   
    // luu du lieu vao localStorage
    localStorage.setItem("selectedCategory", JSON.stringify(selectedCategory));
    // addItem(selectedCategory);
  }
}


function clickBoxHandler(country) {
  // Mở trang selectionTickets.html và truyền tham số qua query string
  window.open(`selectionTickets.html?country=${country}`, '_blank');
}

function signUp(e) {
  event.preventDefault();
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var rePass = document.getElementById("confirm-password").value;

  // Check if the passwords match.
  if (password !== rePass) {
    alert("Passwords do not match");
    return;
  }else{
    alert("Sign up successful");
    window.location.href = "../signInPage/index.html";
  }

  // Create a new user object.
  var user = {
    username: username,
    password: password,
  };

  // Save the user object to local storage.
  localStorage.setItem(username, JSON.stringify(user));

  // Redirect the user to the sign-in page.
}

function signIn(e) {
  event.preventDefault();
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  // Check if the user exists in local storage.
  var user = localStorage.getItem(username);
  if (user === null) {
    alert("Username does not exist");
    return;
  }

  // Parse the user object from JSON.
  var data = JSON.parse(user);

  // Check if the username and password match.
  if (username === data.username && password === data.password) {
    alert("Login successful");
    window.location.href = "../index.html";
  } else {
    alert("Username or password is incorrect");
  }
}







