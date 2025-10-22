import { stringify } from "querystring";

export class ODObject extends HTMLElement {
	public static template: HTMLTemplateElement = document.createElement('template');
	static {
		ODObject.template.innerHTML = `
<template id="template">
	<style>
		:host {

			/*変数*/
			--tso-otln-cl: white;

			--tso-otln-cl: black;
			--tso-otln-wei: 1px;
			--tso-otln-tp: solid;

			--tso-black: rgb(0, 0, 0);
			--tso-black-re: rgb(200, 200, 200);
			--tso-white: rgb(255, 255, 255);
			--tso-white-re: rgb(55, 55, 55);
			--tso-red: rgb(255, 0, 0);
			--tso-red-re: rgb(255, 200, 200);
			--tso-blue: rgb(0, 0, 255);
			--tso-blue-re: rgb(200, 200, 255);
			--tso-green: rgb(0, 64, 0);
			--tso-green-re: rgb(200, 255, 200);
			--tso-yellow: rgb(255, 255, 0);
			--tso-yellow-re: rgb(255, 255, 200);

			/*装飾*/
			position: absolute;
			display: block;
			border-width: var(--tso-otln-wei);
		}

		slot[name="text"] {
			position: absolute;
			z-index: 10;
		}
	</style>
	<slot id="slot-id">
		<slot name="text"></slot>
	</slot>

</template>
		`;
	};

	static positionTypeArray: string[][] = [["lt", "lcy", "lb"], ["cxt", "cxcy", "cxb"], ["rt", "rcy", "rb"]];
	#myAttributeArray = [
		{
			"attr": "x",
			"default": "0",
			"func": (arg: string) => this.x = arg
		},
		{
			"attr": "y",
			"default": "0",
			"func": (arg: string) => this.y = arg
		},
		{
			"attr": "width",
			"default": "0",
			"func": (arg: string) => this.width = arg
		},
		{
			"attr": "height",
			"default": "0",
			"func": (arg: string) => this.height = arg
		},
		{
			"attr": "fill",
			"default": "transparent",
			"func": (arg: string) => this.fill = arg
		},
		{
			"attr": "stroke",
			"default": "transparent",
			"func": (arg: string) => this.stroke = arg
		},
		{
			"attr": "stroke-weight",
			"default": "var(--tso-otln-wei)",
			"func": (arg: string) => this.strokeWeight = arg
		},
		{
			"attr": "stroke-style",
			"default": "var(--tso-otln-tp)",
			"func": (arg: string) => this.strokeStyle = arg
		},
		{
			"attr": "position-type",
			"default": "lt",
			"func": (arg: string) => this.positionType = arg
		}
	];

	constructor(x: string = "0", y: string = "0", width: string = "0", height: string = "0") {
		super();
		this.setAttribute("tabindex", "0");
		this.attachShadow({ mode: "open" });
		this.shadowRoot!.appendChild(ODObject.template.content.cloneNode(true));
		this.#myAttributeArray.forEach(c => {
			if (!Boolean(this.hasAttribute(c["attr"]))) this.setAttribute(c["attr"], c["default"]);
			c["func"](String(this.getAttribute(c["attr"])));
		});
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	// static getter, setter
	static get elementName(): string {
		return "od-object";
	}

	// setter, getter
	set fill(value: string | null | undefined) {
		if (value == null || value == "none") value = "rgba(0, 0, 0, 0)";
		this.setAttribute("fill", this.arrangedValue(value, this, "background-color"));
	}
	get fill(): string | null | undefined {
		return getComputedStyle(this).backgroundColor;
	}
	set stroke(value: string | null | undefined) {
		if (value == null || value == "none") value = "rgba(0, 0, 0, 0)";
		this.setAttribute("stroke", this.arrangedValue(value, this, "outline-color"));
	}
	get stroke(): string | null | undefined {
		return getComputedStyle(this).outlineColor;
	}
	set strokeWeight(value: string | null | undefined) {
		if (value == null || value == "none") value = "0px";
		this.setAttribute("stroke-weight", this.arrangedValue(value, this, "outline-width"));
	}
	get strokeWeight(): string | null | undefined {
		return getComputedStyle(this).outlineWidth;
	}
	set strokeStyle(value: string | null | undefined) {
		if (value == null || value == "none") value = "var(--tso-otln-tp)";
		this.setAttribute("stroke-style", this.arrangedValue(value, this, "outline-style"));
	}
	get strokeStyle(): string | null | undefined {
		return getComputedStyle(this).outlineStyle;
	}

	// 座標
	set x(value: string) {
		const _val: string = this.arrangedValue(value);
		this.style.left = _val;
		this.setAttribute("x", _val);
	}
	get x(): string | null | undefined {
		return getComputedStyle(this).left;
	}
	set y(value: string) {
		const _val: string = this.arrangedValue(value);
		this.style.top = _val;
		this.setAttribute("y", _val);
	}
	get y(): string | null | undefined {
		return getComputedStyle(this).top;
	}
	set width(value: string) {
		const _val: string = this.arrangedValue(value);
		this.style.width = _val;
		this.setAttribute("width", _val);
	}
	get width(): string | null | undefined {
		return getComputedStyle(this).width;
	}
	set height(value: string) {
		const _val: string = this.arrangedValue(value);
		this.style.height = _val;
		this.setAttribute("height", _val);
	}
	get height(): string | null | undefined {
		return getComputedStyle(this).height;
	}

	set positionType(value: string) {
		if (this.setTranslate(value))
			this.setAttribute("position-type", value);
	}
	get positionType(): string | null | undefined {
		return this.getAttribute("position-type");
	}

	// my-methods
	arrangedValue(value: string | null | undefined, setPropertyElement = this, setPropertyName: string = ""): string {
		if (value == undefined || value == null || value.length == 0) {
			console.error(`this.arrangedValueでエラー：value error -> ${value}`);
			return "";
		}
		const include_important = value.includes(" !important");
		value = value.replace(" !important", "");
		value = `${value}${!isNaN(Number(value)) ? "px" : ""}`;
		if (setPropertyName != "")
			setPropertyElement.style.setProperty(setPropertyName, value, include_important ? "important" : "");
		return value;
	}
	arrangedValues(...values: [string | null | undefined]): (string | null)[] {
		return values.map(c => this.arrangedValue(c));
	}
	setRotate(value: string | number): void {
		value = Number(value) % 360;
		this.style.rotate = `${value}rad`;
	}
	setTranslate(value: string): boolean {
		let _correct_flag: boolean = false;
		ODObject.positionTypeArray.forEach((i_v: string[], i: number) => {
			i_v.forEach((j_v: string, j: number) => {
				if (!_correct_flag) {
					_correct_flag = value == j_v;
					if (_correct_flag)
						this.style.translate = `-${i * 50}% -${j * 50}%`;
				}
			});
		});
		return _correct_flag;
	}
}

if (!customElements.get(ODObject.elementName))
	customElements.define(ODObject.elementName, ODObject);