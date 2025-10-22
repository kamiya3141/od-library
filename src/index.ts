import { ODObject } from './components/od-object';
import { ODRect } from './components/od-rect';

declare global {
	interface HTMLElementTagNameMap {
		'od-object': ODObject;
		'od-rect': ODRect
	}
}
