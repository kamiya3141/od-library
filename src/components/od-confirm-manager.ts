import { ODRect } from "./od-rect";

export class ODConfirmManager extends ODRect {
	public static template: HTMLTemplateElement = document.createElement('template');
	static {
		ODConfirmManager.template.innerHTML = ODRect.template.outerHTML;
	};
	public static instance: null | ODConfirmManager = null;

	static #myStatus: { expanded: boolean, sort: boolean } = {
		"expanded": false,
		"sort": false
	};

	constructor(x: string = "0", y: string = "0", width: string = "0", height: string = "0") {
		if (ODConfirmManager.instance) {
			new Error("ConfirmManager instance already exists !!");
			return;
		}
		super(x, y, width, height);
		ODConfirmManager.instance = this;
		ODConfirmManager.instance.shadowRoot!.innerHTML = ODConfirmManager.template.outerHTML;
		ODConfirmManager.#myStatus["expanded"] = false;
	}

	// static getter, setter
	static get elementName(): string {
		return "od-confirm-manager";
	}

	static reloadMyStatus(): void {
		ODConfirmManager.instance!.positionType = "cxcy";
		ODConfirmManager.instance!.x = "2.5vw";
		ODConfirmManager.instance!.y = "2.5vh";
		ODConfirmManager.instance!.radius = "9999em";
		if (ODConfirmManager.#myStatus["expanded"]) {
			ODConfirmManager.instance!.width = "95vw";
			ODConfirmManager.instance!.height = "95vh";
		} else {
			ODConfirmManager.instance!.width = "5vw";
			ODConfirmManager.instance!.height = "2.5vh";
		}
	}
}

if (!customElements.get(ODConfirmManager.elementName))
	customElements.define(ODConfirmManager.elementName, ODConfirmManager);