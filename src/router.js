import {$http} from 'js/$http.js';
class Router {
  getFile(page) {
    if (page && page.file) {
      if(page.file.slice(-4) === 'html') {
        updateContent(page.file);
      }
      else {
        System.import(page.file).then(m => m.init && m.init());
      }
    }
  }
  updateContent(f) {
    System.import(f + '!text').then(m => this.$main.innerHTML = m);
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
      if (el.nodeName === 'A') {
        let href = el.getAttribute('href');
        let page = this.routes[href];
        if (page && page.file) {
          this.getFile(page);
          history.pushState({url: href}, page.file, href);
          e.preventDefault();
          return;
        }
      }
    } while(el = el.parentNode);
  }
  getRoute(path) {
    return path === '/' ? '/' : path.replace(/\//g, '');
  }
  handleRouteChange(first) {
    var page;
    console.log(110, history.state)
    if (first) {
      history.replaceState({url: location.pathname, first: 1}, document.title, location.pathname);
      console.log(112, history.state)
    }
    page = this.routes[this.getRoute(history.state.url)];
    
    if (page && page.file) {
      this.getFile(page);
    }
  }
  init() {
    console.log(109, history.state)
    var success = routes => {
        this.routes = JSON.parse(routes);
        this.handleRouteChange(1);
      },
      error = res => console.log('error', res);
    //this.getFile(routes[this.getRoute(location.pathname)]);  
    window.addEventListener('popstate', () => this.handleRouteChange());  
    document.addEventListener('click', (e) => this.handleClick(e));
    this.$main = document.querySelector('.main');
    $http({
      method: 'GET', 
      url: '/routes.json'
    }).then(success, error);
/*    $http({
      method: 'POST', 
      url: '/login',
      params: 'aa=1'
    }).then(success, error);*/
  }
}
export default new Router();