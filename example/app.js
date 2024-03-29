/*
	<div class="card" style="width: 18rem;">
		<h5 class="card-header">{{ card.title }}</h5>
		<div class="card-body">
			<p class="card-text">{{ card.text }}</p>
			{{ card.children }}
		</div>
	</div>
*/

const GDPR = {};

const makeChildren = (guardsMap, fn) => Promise.all(
	Sequency
	.asSequence(guardsMap)
	.map(([_name, guard]) => guard)
	.map(fn)
	.toArray()
);

const createTitle = guard => {
	const title = document.createElement("h3");
	title.classList.add("card-header", "col-12");
	title.textContent = guard.name;
	return title;
};

const createDescription = guard => {
	const desc = document.createElement("p");
	desc.textContent = guard.description;
	return desc;
};

const rehydrate = input => {
	setTimeout(() => {
		console.log("[rehydrate]");
		GDPR.smartReRender();
	}, 50);
};

const createSwitch = guard => {
	const switch_ = document.createElement("input");
	const $switch = $(switch_);
	switch_.checked = guard.enabled;
	switch_.setAttribute("type", "checkbox");

	if (guard.required) {
		switch_.setAttribute("disabled", "disabled");
	} else {
		$switch.click(e => {
			console.log(`[IN] guard: ${guard.name} [${guard.enabled}]`);
			e.preventDefault();
			if (switch_.checked) {
				guard.enable();
			} else {
				guard.disable();
			}


			console.log(`[OUT] guard: ${guard.name} [${guard.enabled}]`);
			rehydrate(switch_);
		});
	}

	return switch_;
};

const createBody = (guard, children) => {
	const text = createDescription(guard);
	const switch_ = createSwitch(guard);

	const body = document.createElement("div");
	body.classList.add("card-body");

	[
		text,
		switch_,
		...children,
	].forEach(child => body.appendChild(child));
	return body;
};

const createCard = (guard, children = []) => {
	const card = document.createElement("div");
	card.classList.add("card");
	$(card).css({
		minWidth: "18rem",
		margin: "2em 1em",
	});

	const cardTitle = createTitle(guard);
	const cardBody = createBody(guard, children);


	card.appendChild(cardTitle);
	card.appendChild(cardBody);
	return card;
};

async function renderGuard(renderSubGroup, guard) {
	const children = "bindings" in guard
		? await makeChildren(guard.bindings, renderSubGroup)
		: [];
	return createCard(guard, children);
}

async function renderGroup(renderGuard, group) {
	const children = await makeChildren(group.bindings, renderGuard);
	return createCard(group, children);
}

async function renderManager(renderGroup, manager) {
	const children = await makeChildren(manager.groups, renderGroup);
	return createCard(manager, children);
}

const { GdprManagerBuilder, GdprStorage, GdprSaviorAdapter } = domGdprGuard.gdprGuard;

const storeKey = "gdpr";
const manager = GdprManagerBuilder.make()
	.startRequiredGroup(GdprStorage.LocalStorage, "RGPD", "Gestion des préférences relatives à la protection des données")
		.withEnabledGuard(storeKey, "Sauvegarde de vos préférences RGPD")
		.withEnabledGuard(`${storeKey}__version`, "Version des paramètres RGPD")
	.endGroup()
	.startGroup(GdprStorage.Cookie, "Trafic", "Analyse du trafic des visiteurs")
	.enabled()
		.withEnabledGuard("_ga", "Google Analytics")
		.startRequiredGuard()
			.withName("vue-tabs-component.cache")
			.withDescription("Cache d'onglet de la page tarauds et filières")
			.storedIn(GdprStorage.LocalStorage)
		.endGuard()
	.endGroup()
	.startRequiredGroup(GdprStorage.Cookie, "Sécurité", "Mesures de sécurité")
		.withEnabledGuard("XSRF-TOKEN", "Jeton prévenant la soumission frauduleuse de formulaire")
		.withEnabledGuard("adonis-session", "Identifiant de session")
		.withEnabledGuard("adonis-session-values", "Jetons de session")
		.startRequiredGuard()
			.withName("Adresse IP")
			.withDescription("Utilisation dans la journalisation des visites")
			.storedIn(GdprStorage.Server)
		.endGuard()
	.endGroup()
.build();

const managerFactory = () => manager;

class Savior extends GdprSaviorAdapter {
	updateSharedManager() {
	}

	restore() {
		return null;
	}

	store() {
	}
}

const savior = new Savior();

(async () => {
	console.clear();

	GDPR.manager = await savior.restoreOrCreate(managerFactory);

	const $footer = $("footer");
	const $rejectAll = $footer.find("#reject");
	const $acceptAll = $footer.find("#accept");
	const $ok = $footer.find("#ok");

	const closeBanner = () => {
		savior.store();
		GDPR.manager.closeBanner();
		$footer.hide();
	};

	$rejectAll.click(e => {
		e.preventDefault();
		GDPR.manager.disable();
		closeBanner();
	});

	$acceptAll.click(e => {
		e.preventDefault();
		GDPR.manager.enable();
		closeBanner();
	});

	$ok.click(e => {
		e.preventDefault();
		closeBanner();
	});

	GDPR.manager.events.onEnable("_ga", () => {
		console.log("At this point, you would load Google Analytics' scripts");
	});

	GDPR.manager.events.onDisable("_ga", () => {
		console.log("At this point, you would remove all traces of Google Analytics if it were already loaded");
	});

	const { render } = await domGdprGuard.renderInside(
		document.getElementById("app"),
		GDPR.manager,
		{
			renderManager,
			renderGroup,
			renderGuard,
		},
	);

	GDPR.smartReRender = render;
})();



