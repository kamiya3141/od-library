import { ODRect } from "./od-rect";

export class ODCircle extends ODRect {
	public static template: HTMLTemplateElement = document.createElement('template');
	static {
		ODCircle.template.innerHTML = ODRect.template.outerHTML;
	};

	constructor(x: string = "0", y: string = "0", width: string = "0", height: string = "0") {
		super(x, y, width, height, "100%");
		this.shadowRoot!.innerHTML = ODCircle.template.outerHTML;
		this.radius = "100%";
		// this.style.setProperty("border-radius", "100%", "important");
	}

	// static getter, setter
	static get elementName(): string {
		return "od-circle";
	}
}

if (!customElements.get(ODCircle.elementName))
	customElements.define(ODCircle.elementName, ODCircle);