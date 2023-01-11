import { create, attributes } from "ackee-tracker";
import { writable } from "svelte/store";

const setupLocationStore = function (callback) {
  const locationStore = writable({
    current: undefined,
    previous: undefined,
  });

  locationStore.subscribe((l) => {
    callback(
      !l.previous || !l.current || l.previous.pathname !== l.current.pathname
    );
  });

  return locationStore;
};

/**
 * Use Ackee in Svelte and Sapper.
 * Creates an instance once and a new record every time the pathname changes.
 * * @param {?Function} beforeUpdate - Svelte component life cycle event.
 * * @param {?Function} afterUpdate - Svelte component life cycle event.
 * @param {?String} pathname - Current path.
 * @param {Object} config - Configuration.
 * @param {String} config.server - Server URL.
 * @param {String} config.domainId - Id of the domain.
 * @param {?Object} opts - Ackee options.
 * @returns {Object} ackee-tracker instance.
 */
const useAckeeSapper = function (
  beforeUpdate,
  afterUpdate,
  { server, domainId },
  opts = {}
) {
  let hasChanged = false;
  let locationStore = setupLocationStore((changed) => (hasChanged = changed));
  let currentInstance = create(server, opts);
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
      let path = window.location.pathname;

      const attrs = attributes(opts.detailed);
      const url = new URL(path, location);

      currentInstance.record(domainId, {
        ...attrs,
        siteLocation: url.href,
      }).stop;
    }
  });

  return currentInstance;
};

/**
 * Use Ackee in Svelte with Routify.
 * Creates an instance once and a new record every time the pathname changes.
 * * @param {?Function} afterPageLoad - Routify event.
 * @param {?String} pathname - Current path.
 * @param {Object} config - Configuration.
 * @param {String} config.server - Server URL.
 * @param {String} config.domainId - Id of the domain.
 * @param {?Object} opts - Ackee options.
 * @returns {Object} ackee-tracker instance.
 */
const useAckeeSvelte = function (
  afterPageLoad,
  { server, domainId },
  opts = {}
) {
  let hasChanged = false;
  let locationStore = setupLocationStore((changed) => (hasChanged = changed));
  let currentInstance = create(server, opts);

  afterPageLoad((page) => {
    if (typeof window !== "undefined") {
      locationStore.update((l) => {
        return {
          previous: l.current,
          current: { ...window.location },
        };
      });
    }
    if (hasChanged) {
      let path = window.location.pathname;

      const attrs = attributes(opts.detailed);
      const url = new URL(path, location);

      currentInstance.record(domainId, {
        ...attrs,
        siteLocation: url.href,
      }).stop;
    }
  });

  return currentInstance;
};
export { useAckeeSapper };
export { useAckeeSvelte };
export default {
  useAckeeSapper,
  useAckeeSvelte,
};
