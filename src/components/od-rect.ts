import { ODObject } from "./od-object";

export class ODRect extends ODObject {
	public static template: HTMLTemplateElement = document.createElement('template');
	static {
		ODRect.template.innerHTML = ODObject.template.outerHTML;
	};

	constructor(x: string = "0", y: string = "0", width: string = "0", height: string = "0", rad: string = "0") {
		super(x, y, width, height);
		this.shadowRoot!.innerHTML = ODRect.template.outerHTML;
		this.radius = rad;
	}

	// static getter, setter
	static get elementName(): string {
		return "od-rect";
	}

	// main methods
	set radius(value: string) {
		// value = this.arrangedValue(value);
		this.setAttribute("radius", value);
		this.style.borderRadius = value;
	}
	get radius(): string | null | undefined {
		return getComputedStyle(this).borderRadius;
	}
}

if (!customElements.get(ODRect.elementName))
	customElements.define(ODRect.elementName, ODRect);