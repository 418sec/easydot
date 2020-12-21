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
// unsafe over jump access
//================================
test.beforeEach(t => {
  t.context.origin = getOriginData();
  t.context.proxy = easydot(t.context.origin);
});

test("[unsafe] get nested property", t => {
  const {proxy} = t.context;
  t.is(proxy["what.is.easydot"], 42);
});

test("[unsafe] set nested property", t => {
  const {proxy} = t.context;
  proxy["what.is.easydot"] = "set value";
  t.is(proxy.what.is.easydot, "set value");
});

test("[unsafe] set nested property affected origin (update)", t => {
  const {proxy, origin} = t.context;
  proxy["what.is.easydot"] = "set value";
  t.is(origin.what.is.easydot, "set value");
});

test("[unsafe] set nested property affected origin (add)", t => {
  const {proxy, origin} = t.context;
  proxy["what.is.name"] = "add value";
  t.is(origin.what.is.name, "add value");
  t.is(origin.what.is.easydot, 42);
});

test("[unsafe] over step get should be error", t => {
  const {proxy} = t.context;
  t.throws(() => {
    proxy["over.step.access"];
  });
});

test("[unsafe] over step set should be error", t => {
  const {proxy} = t.context;
  t.throws(() => {
    proxy["over.step.access"] = 777;
  });
});
