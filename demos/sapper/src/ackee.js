'use strict'

const ackeeTracker = require('ackee-tracker');
const { writable } = require('svelte/store')

let hasChanged = false;

const locationStore = writable({
  current:  undefined,
  previous: undefined,
});


locationStore.subscribe( l => {
  if ( (!l.previous || !l.current) || (l.previous.pathname !== l.current.pathname)) 
    hasChanged = true;
  else
    hasChanged = false;

})

/**
 * Use Ackee in Svelte and Sapper.
 * Creates an instance once and a new record every time the pathname changes.
 * * @param {?Function} beforeUpdate - Svelte component life cycle event.
 * * @param {?Function} afterUpdate - Svelte component life cycle event.
 * @param {?String} pathname - Current path.
 * @param {Object} server - Server details.
 * @param {?Object} opts - Ackee options.
 */
const useAckeeSapper = function(beforeUpdate, afterUpdate, server, opts = {}) {
  let currentInstance = ackeeTracker.create(server, opts);
  beforeUpdate(() => {
    if (typeof window !== "undefined") {
      locationStore.update((l) => {
        return {
          previous: l.current,
          current: { ...window.location },
        };
      });
    }
  });
  afterUpdate(() => {
    if (hasChanged) {
      let path = window.location.pathname

      const attributes = ackeeTracker.attributes(opts.detailed)
      const url = new URL(path, location)

      currentInstance.record({
        ...attributes,
        siteLocation: url.href
      }).stop
    }
  });
}

/**
 * Use Ackee in Svelte with Routify.
 * Creates an instance once and a new record every time the pathname changes.
 * * @param {?Function} afterPageLoad - Routify event.
 * @param {?String} pathname - Current path.
 * @param {Object} server - Server details.
 * @param {?Object} opts - Ackee options.
 */
const useAckeeSvelte = function( afterPageLoad, server, opts = {}){
  let currentInstance = ackeeTracker.create(server, opts)
	
	afterPageLoad(page => {

    if (typeof window !== "undefined") {
      locationStore.update((l) => {
        return {
          previous: l.current,
          current: { ...window.location },
        };
      });
    }
    if (hasChanged) {
  		
      let path = window.location.pathname

      const attributes = ackeeTracker.attributes(opts.detailed)
      const url = new URL(path, location)

      currentInstance.record({
        ...attributes,
        siteLocation: url.href
      }).stop

    }

	})
	
}

module.exports = {
  useAckeeSapper,
  useAckeeSvelte
};
