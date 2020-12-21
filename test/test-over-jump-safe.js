const easydot = require("../dist/easydot.js");
const test = require("ava");

const getOriginData = () => ({
  what: {
    is: {
      easydot: 42
    }
  }
});

//================================
// safe over jump access
//================================
test.beforeEach(t => {
  t.context.origin = getOriginData();
  t.context.proxy = easydot(t.context.origin, true);
});

test("[safe] get nested property", t => {
  const {proxy} = t.context;
  t.is(proxy["what.is.easydot"], 42);
});

test("[safe] set nested property", t => {
  const {proxy} = t.context;
  proxy["what.is.easydot"] = "set value";
  t.is(proxy.what.is.easydot, "set value");
});

test("[safe] set nested property affected origin (update)", t => {
  const {proxy, origin} = t.context;
  proxy["what.is.easydot"] = "set value";
  t.is(origin.what.is.easydot, "set value");
});

test("[safe] set nested property affected origin (add)", t => {
  const {proxy, origin} = t.context;
  proxy["what.is.name"] = "add value";
  t.is(origin.what.is.name, "add value");
  t.is(origin.what.is.easydot, 42);
});

test("[safe] over step get should be safe", t => {
  const {proxy} = t.context;
  t.is(proxy["over.step"], undefined);
});

test("[safe] over step set should be error", t => {
  const {proxy, origin} = t.context;
  proxy["over.step"] = 777;
  t.is(origin.over.step, 777);
});
