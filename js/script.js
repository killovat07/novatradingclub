// Input change
let validateCount = new Set();
const addFocus = (el) => {};

const removeFocus = (el) => {
    el.closest('.form-field').classList.remove('is-focused');
};

const addErrorClass = (el) => {
    el.closest('.form-field').classList.add('is-error');
    validateCount.add(el);
};
const removeErrorClass = (el) => {
    el.closest('.form-field').classList.remove('is-error');
    validateCount.delete(el);
};

document.querySelectorAll('form input').forEach((input) => {
    input.value ? addFocus(input) : removeFocus(input);

    input.addEventListener('focus', (e) => addFocus(e.currentTarget));
    input.addEventListener('blur', ({ currentTarget }) => {
        currentTarget.value ? addFocus(currentTarget) : removeFocus(currentTarget);
    });
});

// document.querySelector('.submit-btn').addEventListener('click', (e) => {
//     e.preventDefault();
//     document.querySelectorAll('form input').forEach((input) => {
//         input.value ? removeErrorClass(input) : addErrorClass(input);
//     });
//     document.querySelectorAll('form select').forEach((select) => {
//         select.value ? removeErrorClass(select) : addErrorClass(select);
//     });

//     if (!validateCount.size) {
//         fetch('send.php', {
//             body: new FormData(document.querySelector('.form')),
//             method: 'POST',
//         }).then((response) => {
//             console.log(response);
//             document.querySelector('.loader').classList.add('is-active');
//             setTimeout(function () {
//                 document.querySelector('.loader').classList.add('animate');
//             }, 1500);
//             setTimeout(function () {
//                 document.querySelector('.loader').classList.remove('is-active');
//                 document.querySelector('.loader').classList.remove('animate');
//                 document.querySelector('.form').reset();
//             }, 3000);
//         });
//     }
// });

/* TERMS Policy */
document.querySelector('.policy').addEventListener('click', () => {
    document.querySelector('.wrapper').classList.add('popup-open');
    document.querySelector('.policy-popup').classList.add('is-active');
});

document.querySelectorAll('.close-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
        document.querySelector('.wrapper').classList.remove('popup-open');
        document.querySelector('.policy-popup').classList.remove('is-active');
        document.querySelector('.terms-popup').classList.remove('is-active');
    });
});

document.querySelector('.overlay').addEventListener('click', () => {
    document.querySelector('.wrapper').classList.remove('popup-open');
    document.querySelector('.policy-popup').classList.remove('is-active');
    document.querySelector('.terms-popup').classList.remove('is-active');
});

const hiddenElement = document.getElementById('form-section');
function handleButtonClick() {
    hiddenElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
}
const btn = document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('click', handleButtonClick);
});

var scrollToTopBtn = document.querySelector('.scrollToTopBtn');
var rootElement = document.documentElement;

function handleScroll() {
    // Do something on scroll
    var scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
    if (rootElement.scrollTop / scrollTotal > 0.3) {
        // Show button
        scrollToTopBtn.classList.add('showBtn');
    } else {
        // Hide button
        scrollToTopBtn.classList.remove('showBtn');
    }
}

function scrollToTop() {
    // Scroll to top logic
    rootElement.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
}
scrollToTopBtn.addEventListener('click', scrollToTop);
document.addEventListener('scroll', handleScroll);

//form
var form = document.querySelector('.form');

form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var fieds = this.elements;

    var serializedData = $(this).serialize();

    var request = $.ajax({
        url: 'send.php',
        type: 'post',
        data: serializedData,
    });

    for (i = 0; i < fieds.length; i++) {
        if (fieds[i].value) {
            $('.loader').fadeIn();
            setTimeout(function () {
                $('.loader .title').fadeIn();
                $('.lds-spinner').fadeOut();
                form.reset();
            }, 1500);

            setTimeout(function () {
                request.always(function () {
                    $('.loader').fadeOut();
                    form.reset();
                });
            }, 3000);
        }
    }
});
