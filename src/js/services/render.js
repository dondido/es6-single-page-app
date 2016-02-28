/*jshint ignore:start*/
export const $render = (c, k, v) => new Function(...k, 'return `' + c + '`;')(...v);
/*jshint ignore:end*/