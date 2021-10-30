'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(function (btn) {
  btn.addEventListener('click', openModal);
});

// /*btnCloseModal.addEventListener('click', closeModal);*/
// overlay.addEventListener('click', closeModal);

// document.addEventListener('keydown', function (e) {
//   if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
//     closeModal();
//   }
// });
//________________________________________________________________________
//Page navigation
//!Smooth scrolling
// if we don't want the smooth scrolling we just leave it to the browser
/*document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    console.log('link');
    const id = this.getAttribute('href'); //here we use get attribute since i need the relative url;
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  });
});*/
//here the solution is not clean since we are creating an event listner for each elemnt
//let's use event propgation in our advantage
//1.Add event listner to common parent element
//2.in that event listner determine what elemnt is selected

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   //here if is used to select only the tab button
//   if (
//     e.target.classList.contains('nav__link') &&
//     !e.target.classList.contains('btn--show-modal')
//   ) {
//     e.preventDefault();
//     const id = e.target.getAttribute('href');

//     document.querySelector(id).scrollIntoView({
//       behavior: 'smooth',
//     });
//   }
// });
//_______________________________________________________________________
//! Selecting creating and deleting elements
//! it's complicated on MDN so it's suggested to read it from here
//console.log(document.documentElement);
//console.log(document.body);
//console.log(document.head);
//? for these elements we don't need to use querryselector
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
const allBtns = document.getElementsByTagName('button');
//console.log(allBtns);
//This method returns HTML collection so if the dom changes it will be updated automatically
// for the node list queryselectorall it dosn't update
//? selectelementbyclassName returns live collection also
//Creating and inserting elemnt
//INsertAdjacentHTML
const message = document.createElement('div');
message.classList.add('cookie-message');
//message.textContent = 'We use cookies for improved functionality and analytics';
message.innerHTML =
  'We use cookies for improved functionality and analytics.<button class="btn btn--close-cookie"> Got it!</button>';
//Prepending add the element as the first child of the element
//header.prepend(message);
header.append(message);
//here the elemnt is inserted once since message is a live element that can't be in two places
// if we want multiple copies we can simply copy it
//header.append(message.cloneNode(true));
//header.after(message);
//header.before(message);
//Deleting elemnts
//we want to delete the elemnt using the button Got it
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    //! this remove is new before we used remove child
    //message.remove();
    message.parentElement.removeChild(message);
  });
//________________________________________________________
//! Tabbed component
const operationTabContainer = document.querySelector(
  '.operations__tab-container'
);
const operationsTab = [...document.querySelectorAll('.operations__tab')];
const operationsContent = [
  ...document.querySelectorAll('.operations__content'),
];

operationTabContainer.addEventListener('click', function (e) {
  e.preventDefault();

  const tabClicked = e.target.closest('.operations__tab');
  if (!tabClicked) return;

  operationsTab.forEach(function (tab, i) {
    tab.classList.remove('operations__tab--active');
    operationsContent[i].classList.remove('operations__content--active');
  });
  const containerNumber = tabClicked?.getAttribute('data-tab');
  document
    .querySelector(`.operations__tab--${containerNumber}`)
    ?.classList.toggle('operations__tab--active');
  document
    .querySelector(`.operations__content--${containerNumber}`)
    ?.classList.toggle('operations__content--active');
});

//________________________________________________________
//*Styles and attributes lecture
/*message.style.backgroundColor = '#37383d';
message.style.width = '110 %';
//These styles are inline styles
console.log(message.style.color);
//it will show nothing since the color is not an inline style
//if we want to get the style from the style sheet we use getComputedStyle
console.log(getComputedStyle(message).color);
//here the computed style is astring so we want the number
message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 40 + 'px';
//if we want to change css variables
// in css the selector is root which is the same as document
document.documentElement.style.setProperty('--color-primary', 'orangered');
// we change the moin color variable in css using JAVSCRIPT

//?Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src); //url here is an absolute url
//if we wnat to get the relative url like in the html file
console.log(logo.getAttribute('src')); //Here we go!
console.log(logo.className);
//It reads only the standard porperties that are expected to be on an elemnt
console.log(logo.designer); //non standard
//but we can get it using another way
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Banksit');
//?DATA atribute
console.log(logo.dataset.versionNumber);
// clases*/
//_______________________________________________________________
//!Scrolling
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScrollTo.addEventListener('click', function (e) {
  const s1cords = section1.getBoundingClientRect();
  //console.log(s1cords);
  //current scroll
  //console.log('current scroll (x/y)', window.pageXOffset, pageYOffset);
  //Getting the height of the view port
  /*console.log(
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );*/
  // window.scrollTo(s1cords.left, s1cords.top + pageYOffset);
  // we can make this animation nice and smooth
  // window.scrollTo({
  //   left: s1cords.left + window.pageXOffset,
  //   top: s1cords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  //old school
  //new way
  //this only works in modern browsers
  section1.scrollIntoView({ behavior: 'smooth' });
});
//!Fading effect
const nav = document.querySelector('.nav');
const navLinks = document.querySelector('.nav__links');

// mouseenter dosn't puple so we will use mosue over
const navHoverStyle = function (e, opacity1, scale1, fontWeight1) {
  const hoveredEl = e.target;
  const siblings = hoveredEl.closest('.nav').querySelectorAll('.nav__link');
  const logo = hoveredEl.closest('.nav').querySelector('img');
  if (hoveredEl.classList.contains('nav__link')) {
    hoveredEl.style.fontWeight = fontWeight1;
    hoveredEl.style.transform = scale1;

    [...siblings].forEach(el => {
      if (el !== hoveredEl) el.style.opacity = logo.style.opacity = opacity1;
    });
  }
};

// nav.addEventListener('mouseover', function (e) {
//   navHoverStyle(e, '0.2', '1.05', '600');
// });
// nav.addEventListener('mouseout', function (e) {
//   navHoverStyle(e, '1', '1', '400');
// });
//________________________________________________________
//! sticky navigation
//const initialcord = section1.getBoundingClientRect();

/*window.addEventListener('scroll', function (e) {
  // the scrolling event is inefficient
  if (window.scrollY > initialcord.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
  //it's very bad for performance
  //it will have bad perofrmance on mobile
});*/
//The best way using intersection Observer API
const observerCallback1 = function (entries, observer, str) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
  });
};
const obsOptions1 = {
  root: null,
  threshold: 0.1,
};
const observer = new IntersectionObserver(observerCallback1, obsOptions1);
observer.observe(header);

//________________________________________________________
//!revealing  allSections
const section2 = document.querySelector('#section--2');
const section3 = document.querySelector('#section--3');
const footer = document.querySelector('.footer');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2,
});
allSections.forEach(function (section) {
  //? we should add the class hidden using js
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});
//After the first reload we should remove observation

//__________________________________________________________________
//!lazy loading images
//the trick is having a low resolution image at the begining in html
//it should be small and small sized
//then we will add the real image using special data attribute
// we load through the image we will replace the image with the larger one
// we put the filter to hide the low resolution image
// not all images are lazy loaded so we will use the data attribute
const imgTargets = document.querySelectorAll('img[data-src]');
const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  //we shlouldn't remove the class straight away we should wait for the image to finish loading
  //entry.target.classList.remove('lazy-img');
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  //console.log(entry.target);
  imgObserver.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 1,
  //If we want to make the loading unnoticable
  rootMargin: '200px',
});
imgTargets.forEach(img => imgObserver.observe(img));
//________________________________________________________
//! Events
// ? event is a signle that is generated by a certain dom node
// any event will happen even if we are not listening to it

/*h1.addEventListener('mouseenter', function (e) {
  //like hover effect
  alert('addEventListner:Great!:you are reading the heading:D');
});*/
/*h1.onmouseenter = function (e) {
  //like hover effect
  alert('addEventListner:Great!:you are reading the heading:D');
};*/
//this way is old school but now we use add event listner
//2 ways why event listener is better
// we can remove an event handler if don't want it anymore
/*onst alertH1 = function (e) {
  //like hover effect
  alert('addEventListner:Great!:you are reading the heading:D');
  h1.removeEventListener('mouseenter', alertH1);
  // h1.removeEventListener('mouseenter', alertH1);
};
h1.addEventListener('mouseenter', alertH1);
// we can remove event listner remove using timeout
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);*/
//________________________________________________________
//! capturing phase and bubbling phase
//random color==> rgb(255,255,255)
/*const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

const navlink = document.querySelector('.nav__link');
const navlinks = document.querySelector('.nav__links');
navlink.addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  //console.log('navlink', e.target);
  //we can stop the propgation
  //e.stopPropagation();=>> can help fix complex pugs but it's not used as much
});
navlinks.addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  //console.log('navlinks', e.target);
});
header.addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  //console.log('header', e.target);
});*/
//? event listner listens to the pupling phase and it dosn't listen to the capture phase

//___________________________________________________________________
//**Traversing dom */
/*const h1 = document.querySelector('h1');
console.log(h1.childNodes);
console.log(h1.children);
//only works for direct children
h1.firstElementChild.style.color = 'red';
h1.lastElementChild.style.color = 'white';
//Going upwards//slecting parent
console.log(h1.parentNode);
console.log(h1.parentElement);
// we need a parent element that is not close
h1.closest('.header').style.background = 'var(--gradient-secondary)';
//closet method finds parents whereas queryselector finds children
//selecting siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
// if we want to select all the siblings
console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});*/
//__________________________________________________________________
/*const charCount = function (str) {
  const result = {};
  const letterList = str.split('');
  letterList.forEach(letter => {
    letter = letter.toLowerCase();
    if (/[a-z0-9]/.test(letter)) result[letter] = (result[letter] || 0) + 1;
  });
  return result;
};

console.log(charCount('abdfufhnjJ dfrthgf 12354549---frhgotkmGG '));*/
//!intersection observer Api
/*const observerCallback = function (entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
  });
};
const obsOptions = {
  root: null,
  threshold: 0,
};
const observer = new IntersectionObserver(observerCallback, obsOptions);
observer.observe(section1);*/
//_______________________________________________________________________________________________________________________
//!SLider
const sliderFun = function () {
  const slides = document.querySelectorAll('.slide');
  const slider = document.querySelector('.slider');
  let curSlide = 0;
  const maxSlides = slides.length;
  const dotContainer = document.querySelectorAll('.dots__dot');
  const dotSection = document.querySelector('.dots');
  //console.log(dotSection);
  const dotsArr = [...dotContainer];
  const dotsFun = function (curSlide) {
    dotsArr.forEach(el => {
      if (Number(el.getAttribute('data-slide')) === curSlide)
        el.classList.add('dots__dot--active');
    });
  };
  dotSection.addEventListener('click', function (e) {
    const num = Number(e.target.getAttribute('data-slide'));
    curSlide = num;
    init(curSlide);
  });
  //slider.style.overflow = 'visible';

  const btnRight = document.querySelector('.slider__btn--right');
  const btnLeft = document.querySelector('.slider__btn--left');
  slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));

  const goToSlide = () => {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - curSlide)}%)`;
      dotsArr[i].classList.remove('dots__dot--active');
    });
  };
  const nextSLide = () => {
    if (curSlide < maxSlides - 1) {
      curSlide++;
      init(curSlide);
    }
  };
  const prevSlide = () => {
    {
      if (curSlide > 0) {
        curSlide--;
        init(curSlide);
      }
    }
  };
  const init = curSlide => {
    goToSlide();
    dotsFun(curSlide);
  };
  btnLeft.addEventListener('click', prevSlide);
  btnRight.addEventListener('click', nextSLide);

  //! slider keyboard functionality
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSLide();
  });
};
//___________________________________________________________________________________________________________
sliderFun(); //_______________________________________________________________________ //? Dom content loaded

//______________________________________________________
/*
!here i tried to intesectionobserver for section3 but it didn't work as i intended
const section3Slider = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSLide();
  });
};
const section3Observer = new IntersectionObserver(section3Slider, {
  root: null,
  threshold: 0.5,
});
section3Observer.observe(section3);*/

/*const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  onst sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2,
});
allSections.forEach(function (section) {
  //? we should add the class hidden using js
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});*/

//We don't need to wrap all of our code in this add event listner since we put the script file
//in the end of the body which let the script load after all html elements
//? Domcintent loaded when the html file is fully loaded
/*document.addEventListener('DOMContentLoaded', function (e) {
  console.log('Html parsed and dom tree', e);
});
//Jquery
//domcontentloaded===document.ready in jquery
//?load =>> all the html,css and js are loaded
window.addEventListener('load', function (e) {
  console.log(e);
});*/
//? before load
// when the user is about to leave the page
/*window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = '';
  // historically we could change the message but now we can't
});*/
//?Attributes added to the script elemnt in html
//!important lecture
//!must be rewatched
//
//___________________________________________________
//!Algorithm training
/*const squared = function (arr1, arr2) {
  const obj1 = {};
  const obj2 = {};
  arr1.forEach(el => {
    el[(obj1[el ** 2] = (obj1[el ** 2] || 0) + 1)];
  });

  arr2.forEach(el => {
    el[(obj2[el] = (obj2[el] || 0) + 1)];
  });
  for (let key in obj1) {
    if (!(key in obj2)) return false;
    if (obj2[key] !== obj1[key]) return false;
  }
  return true;
};
console.log(squared([1, 4, 1, 1], [1, 9, 16]));
*/
/*const squared = function (arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  //this is O(n^2)sincd index of loop over the array
  
  for (let i = 0; i < arr1.length; i++) {
    let correctIndex = arr2.indexOf(arr1[i] ** 2);
    if (correctIndex === -1) return false;
    arr2.splice(correctIndex, 1);
  }
  return true;
};
console.log(squared([1, 1, 1], [1, 1, 1]));*/
//put the frequency of every letter in an object (obj1)
//we will put the second string in obj2
//________________________________________
//Anagram
/*const validAnagram = function (str1, str2) {
  const obj1 = {};
  const obj2 = {};
  const arr1 = str1.split('');
  const arr2 = str2.split('');
  if (str1 === str2) return true;
  if (str1.length !== str2.length) return false;

  arr1.forEach(letter => {
    obj1[letter] = (obj1[letter] || 0) + 1;
  });
  str2.split('').forEach(letter => {
    obj2[letter] = (obj2[letter] || 0) + 1;
  });
  for (let key in obj1) {
    console.log(key);
    if (!(key in obj2)) return false;
    if (obj1[key] !== obj2[key]) return false;
  }
  return true;
};
console.log(validAnagram('anagram', 'nagaram  '));*/
//another solution
/*const validAnagram = function (str1, str2) {
  const lookup = {};
  if (str1 !== str2) return false;
  for (let i = 0; i < str1.length; i++) {
    let letter = str1[i];
    lookup[letter] ? (lookup[letter] += 1) : (lookup[letter] = 1);
  }
  for (let i = 0; i < str2.length; i++) {
    let letter = str2[i];
    if (!lookup[letter]) return false;
    else lookup[letter] -= 1;
  }
  return true;
};*/
//__________________________________________________________
//Multiple pointers
// two variables indexInit and indexFin
// we will move the last index after we sum each one
/*const sumZero = function (arr) {
  let indexFin = arr.length - 1;
  let indexInit = 0;
  for (let indexInit = 0; indexInit < indexFin; indexInit++) {
    let sum = arr[indexInit] + arr[indexFin];

    if (sum === 0) return [arr[indexInit], arr[indexFin]];
  }
  for (indexFin; indexFin > 0; indexFin--) {
    let sum = arr[indexInit] + arr[indexFin];
    console.log(sum);
    if (sum === 0) return [arr[indexInit], arr[indexFin]];
  }
  return undefined;
};

console.log(sumZero([-7, -6, -5, -4, -3, -2, -1, 0, 1, 2]));*/
/*function sumZero(arr) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    let sum = arr[left] + arr[rigth];
    if (sum === 0) return [arr[left], arr[rigth]];
    else if (sum > 0) rigth--;
    else left++;
  }
}
*/
/*const countUniqueValues = function (arr) {
  let right = arr.length - 1;

  let left = 0;

  for (right; right > 0; right--) {
    if (arr[right - 1] === arr[right]) arr.splice(right, 1);
  }

  return arr.length;
};
console.log(countUniqueValues([-2, -1, -1, 0, 1]));
*/
//______________________________________________________-
//sliding window
// const maxSubarraySum = function (arry, n) {
//   let ind = 0;
//   let sum = 0;
//   let newsum = 0;
//   let newarr = [];
//   n=2
//   if (arry.length < n) return null;
//   arry.forEach((el, i) => {
//     newarr = arry.slice(i, n + i);
//     newsum = newarr.reduce((a, b) => a + b, 0);
//     if (newsum > sum) sum = newsum;
//   });
//   return sum;
//   for (ind; ind < n; ind++) sum += arry[ind];
//   newsum = sum;
//   for (let i = n; i < arry.length; i++) {
//     newsum = newsum - arry[i - n] + arry[i];
//     sum = Math.max(sum, newsum);
//   }
//   return sum;
// };

// console.log(maxSubarraySum([2, 6, 9, 2, 1, 8, 5, 6, 3], 4));
//________________________________________________________
// function toArray(obj) {
//   /*toArray({ a: 1, b: 2 }) ➞ [["a", 1], ["b", 2]]

// toArray({ shrimp: 15, tots: 12 }) ➞ [["shrimp", 15], ["tots", 12]]

// toArray({}) ➞ []*/
//   let arr = [];
//   for (const [key, el] of Object.entries(obj)) {
//     arr.push([key, el]);
//   }
//   return arr;
// }
// console.log(toArray({ 12: 2, 5: 14 }));
//_______________________________________________________
