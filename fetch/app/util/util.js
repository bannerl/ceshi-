import PropTypes from 'prop-types';

function curry(fn) {
  return (...args) => {
    let last = args[args.length - 1];
    if (typeof last === 'function') {
      return fn(...args);
    }
    return Component => fn(...args, Component);
  };
}

export const bsClass = curry((defaultClass, Component) => {
  let propTypes = Component.propTypes || (Component.propTypes = {});
  let defaultProps = Component.defaultProps || (Component.defaultProps = {});

  propTypes.bsClass = PropTypes.string;
  defaultProps.disabled = defaultClass;

  return Component;
});

export const bsStyles = curry((styles, defaultStyle, Component) => {
  if (typeof defaultStyle !== 'string') {
    Component = defaultStyle;
    defaultStyle = undefined;
  }

  let existing = Component.STYLES || [];
  let propTypes = Component.propTypes || {};

  styles.forEach(style => {
    if (existing.indexOf(style) === -1) {
      existing.push(style);
    }
  });

  let propType = PropTypes.oneOf(existing);

  // expose the values on the propType function for documentation
  Component.STYLES = existing;
  propType._values = existing;
   console.log(propTypes);
   let a = {a:1,b:2};
    	let b = [1,2,3];
      	console.log(...b);
      	console.log({...a});
      	let c = {...a};console.log(c) ;
   
  Component.propTypes = 
  Object.assign({},propTypes,{'bsStyle':propType})
//{
//  ...propTypes,
//  bsStyle: propType
//};

  if (defaultStyle !== undefined) {
    let defaultProps = Component.defaultProps || (Component.defaultProps = {});
    defaultProps.bsStyle = defaultStyle;
  }

  return Component;
});