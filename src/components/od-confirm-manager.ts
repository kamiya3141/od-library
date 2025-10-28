import { ODRect } from "./od-rect";

export class ODConfirmManager extends ODRect {
	public static template: HTMLTemplateElement = document.createElement('template');
	static {
		ODConfirmManager.template.innerHTML = ODRect.template.outerHTML;
	};
	
	#myStatus: {expanded: boolean, sort: boolean} = {
		"expanded": false,
		"sort": false
	};

	constructor(x: string = "0", y: string = "0", width: string = "0", height: string = "0", confirm_text: string = "") {
		super(x, y, width, height);
		this.shadowRoot!.innerHTML = ODConfirmManager.template.outerHTML;
		this.radius = "9999em";
		this.#myStatus["expanded"] = false;
		
	}

	// static getter, setter
	static get elementName(): string {
		return "od-confirm-manager";
	}

}

if (!customElements.get(ODConfirmManager.elementName))
	customElements.define(ODConfirmManager.elementName, ODConfirmManager);