import domEventReg from '../on/_domeventregexp';
import checkObjectType from '../_helpers/checkobjecttype';
import seempleError from '../_helpers/seempleerror';
import forEach from '../_helpers/foreach';
import splitBySpaceReg from '../on/_splitbyspaceregexp';
import defs from '../_core/defs';
import triggerOne from './_triggerone';
import triggerDomEvent from './_triggerdomevent';

// triggers an event
export default function trigger(...args) {
  let object;
  let givenNames;
  let triggerArgs;

  if (typeof this === 'object' && this.isSeemple) {
    // when context is Seemple instance, use this as an object and shift other args
    [givenNames, ...triggerArgs] = args;
    object = this;
  } else {
    [object, givenNames, ...triggerArgs] = args;
    // throw error when object type is wrong
    checkObjectType(object, 'trigger');
  }
  let names;

  // allow to use strings only as event name
  if (typeof givenNames === 'string') {
    names = givenNames.split(splitBySpaceReg);
  } else {
    throw seempleError('trigger:names_type', { names: givenNames });
  }

  const def = defs.get(object);

  // if no definition do nothing
  if (!def) {
    return object;
  }

  const { events: allEvents } = def;

  if (!allEvents) {
    return object;
  }

  forEach(names, (name) => {
    const domEvtExecResult = domEventReg.exec(name);

    if (domEvtExecResult) {
      // if EVT::KEY(SELECTOR) ia passed as event name then trigger DOM event
      const [, eventName, key = 'sandbox', selector] = domEvtExecResult;
      triggerDomEvent(object, key, eventName, selector, triggerArgs);
    } else {
      // trigger ordinary event
      triggerOne(object, name, triggerArgs);
    }
  });

  return object;
}
