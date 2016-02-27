import {$http} from 'js/services/http.js';
import Page from 'js/views/page.js';
import User from 'js/models/user.js';
var prevRoute;
class Router {
  getFile(page) {
    prevRoute = page.file;
    if (page && page.file) {
      if(page.file.slice(-4) === 'html') {
        new Page(page.file);
      }
      else {
        System.import(page.file).then(function(C) {new C.default()});
      }
    }
  }
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
      if(el.nodeName === 'A') {
        let href = el.getAttribute('href');
        let page = this.getPage(href);
        if(page) {
          history.pushState({account: User.account}, page.file, href);
          this.getFile(page);
          e.preventDefault();
          return;
        }
      }
    } while(el = el.parentNode);
  }
  getRoute(path) {
    return path === '/' ? '/' : path.replace(/\//g, '');
  }
  get prevRoute() {
    return prevRoute;
  }
  set prevRoute(route) {
    prevRoute = route;
  }
  getPage(ref) {
    var route = this.routes[ref];
    if(!route) {
      return;
    }
    let page = Object.assign({}, route);
    if(page.account && User.account) {
      page.file = page.account;
    }
    return page;
  }
  /* Determines the current route by mathcing current location pathname to
  routes map, and returning the route entry with all of its properties. */
  handleRouteChange(e = {}) {
    var page = this.getPage(this.getRoute(location.pathname));
    if(page) {
      if(e.state && e.state.account !== User.account) {
        history.replaceState({account: User.account}, '', '/');
      }
      else if(!prevRoute || !e.state) {
        history.replaceState({account: User.account}, '');
      } 
      if(prevRoute === page.file) {
        return;
      }
      this.getFile(page);
    }
  }
  // Starts the SPA app router and processes the  view initialisation
  init() {
    var success = routes => {
        this.routes = JSON.parse(routes);
        /* As we don't want to make an extra Ajax request to check
        whether the user is logged in or not we set this data as
        part of a document body classList. */
        User.account = document.body.classList.contains('account');
        this.handleRouteChange();
      },
      error = res => console.log('error', res);
    window.addEventListener('popstate', (e) => this.handleRouteChange(e));  
    document.addEventListener('click', e => this.handleClick(e));
    $http({
      method: 'GET', 
      url: 'js/config/routes.json'
    }).then(success, error);
  }
}
export default new Router();