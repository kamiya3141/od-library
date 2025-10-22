import { ODObject } from './components/od-object';
import { ODRect } from './components/od-rect';
import { ODCircle } from './components/od-circle';

declare global {
	interface HTMLElementTagNameMap {
		'od-object': ODObject;
		'od-rect': ODRect;
		'od-circle': ODCircle
	}
}

export { ODObject, ODRect, ODCircle };