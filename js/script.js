/* Tabs */

// const tabTitle = document.querySelectorAll('.tab-title');
// const tabContent = document.querySelectorAll('.tab-content');

// tabTitle.forEach((tab) => {
//     tab.addEventListener('click', () => {
//         tabTitle.forEach((el) => el.classList.remove('is-active'));
//         tabContent.forEach((el) => el.classList.remove('is-active'));

//         const tabCount = tab.getAttribute('data-tab');
//         document.querySelectorAll(`[data-tab="${tabCount}"]`).forEach((el) => el.classList.add('is-active'));
//     });
// });

// Input change
let validateCount = new Set();
const addFocus = (el) => {
    // el.closest('.form-field').classList.add('is-focused');
};

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

document.querySelector('.submit-btn').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelectorAll('form input').forEach((input) => {
        input.value ? removeErrorClass(input) : addErrorClass(input);
    });
    document.querySelectorAll('form select').forEach((select) => {
        select.value ? removeErrorClass(select) : addErrorClass(select);
    });
    if (!validateCount.size) {
        fetch('send.php', {
            body: new FormData(document.querySelector('.form')),
            method: 'POST',
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
            });
        // window.location.href = '/';
    }
});

/* TERMS Policy */
document.querySelector('.policy').addEventListener('click', () => {
    document.querySelector('.wrapper').classList.add('popup-open');
    document.querySelector('.policy-popup').classList.add('is-active');
});
// document.querySelector('.terms').addEventListener('click', () => {
//     document.querySelector('.wrapper').classList.add('popup-open');
//     document.querySelector('.terms-popup').classList.add('is-active');
// });

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
