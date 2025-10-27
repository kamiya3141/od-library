import { ODRect } from "./od-rect";

export class ODConfirm extends ODRect {
	public static template: HTMLTemplateElement = document.createElement('template');
	static {
		const replaced_template = ODRect.addOtherStyles(ODRect.template.outerHTML, "box-shadow: 0 0 0.5em 0.25em rgba(128, 128, 128, 0.25);")
		ODConfirm.template.innerHTML = replaced_template;
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