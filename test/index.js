import test from "tape";
import pageTrackr from "../src/index";
import page from "page";
import {Computation} from "trackr";

function resetPage() {
	page.callbacks = [];
	page.exits = [];
	page.current = '';
	page.len = 0;
	delete page.__trackr;
}

test("autoruns in route", (t) => {
	t.plan(1);

	resetPage();
	pageTrackr(page);

	page(function(ctx) {
		ctx.autorun(function(comp) {
			t.ok(comp instanceof Computation, "ran autorun in route");
		});

		ctx.forceStopComputations();
	});

	page.show("/", {}, true, false);

	t.end();
});

test("removes autorun on route exit", (t) => {
	t.plan(1);

	let count = 0;
	resetPage();
	pageTrackr(page);

	page(function(ctx) {
		if (ctx.path === "/") {
			ctx.autorun(function() {
				count++;
			});
		}
	});

	page.show("/", {}, true, false);
	page.show("/other", {}, true, false);

	t.equals(count, 1, "ran autorun only once");
	t.end();
});
