import {routes} from 'routes';
class Util {
  /* Sometimes we have a hyperlink that needs to be a hyperlink but we don’t want it
  to process and open the link but only call a javascript function. Fortunately here
  comes a little sassy function to stop the hyperlink and trigger a function call.
  This could be very useful for changing the view of the page or adding information
  to it when making AJAX requests or asynchronous module loading instead of preserving
  the link natural behaviour and redirecting. This architecture help us provide
  graceful degradation functionality and provides key driver of SEO goodnes. */
  handleClick(e) {
    var el = e.target;
    /* Event delegation allows us to avoid adding event listeners to specific nodes; 
    instead, the event listener is added to one parent. That event listener analyses
    bubbled events to find a match on child elements. */
    do {
      if (el.nodeName === 'A') {
        let page = routes[el.getAttribute('href')];
        if (page && page.file) {
          let url = page.file;
          System.import(url);
          history.pushState({url: url}, url, url);
          e.preventDefault();
          return;
        }
      }
    } while(el = el.parentNode);
  }
  init() {
    document.addEventListener('click', (e) => this.handleClick(e));
  }
}
export default Util;