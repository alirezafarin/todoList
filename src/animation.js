import $ from 'jquery';

export const animateOnClick = (element, classToAdd) => {
  $(element).addClass(classToAdd);
  setTimeout(() => $(element).removeClass(classToAdd), 500 );
}