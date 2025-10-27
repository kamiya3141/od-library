import { ODRect } from "./od-rect";

export class ODConfirm extends ODRect {
	public static template: HTMLTemplateElement = document.createElement('template');
	static {
		ODConfirm.template.innerHTML = ODRect.template.outerHTML;
	};
	colorType: string = "normal";

	constructor(confirm_text: string = "") {
		super("0", "0", "100", "100");
		this.shadowRoot!.innerHTML = ODConfirm.template.outerHTML;
		this.radius = "10000em";
	}

	// static getter, setter
	static get elementName(): string {
		return "od-confirm";
	}

	// main methods

}

if (!customElements.get(ODConfirm.elementName))
	customElements.define(ODConfirm.elementName, ODConfirm);