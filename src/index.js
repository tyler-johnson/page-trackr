import Trackr from "trackr";

export default function(page) {
  if (page.__trackr) return page;
  page.__trackr = true;

  page(function(ctx, next) {
    ctx._comps = [];
    ctx.autorun = function(fn, opts) {
      let comp = Trackr.autorun(fn, opts);
      ctx._comps.push(comp);
      return comp;
    };

    ctx.forceStopComputations = function() {
      ctx._comps.forEach(c => c.stop());
    };

    next();
  });

  page.exit(function(ctx, next) {
    if (ctx.forceStopComputations) {
      ctx.forceStopComputations();
    }
    
    next();
  });

  return page;
}
