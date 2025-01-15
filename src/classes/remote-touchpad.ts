import { CSSResult, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import {
	ActionType,
	DirectionAction,
	HapticType,
	IActions,
	ITouchpadConfig,
} from '../models/interfaces';

import {
	DOUBLE_TAP_WINDOW,
	HOLD_TIME,
	REPEAT_DELAY,
} from '../models/constants';
import { BaseRemoteElement } from './base-remote-element';

@customElement('remote-touchpad')
export class RemoteTouchpad extends BaseRemoteElement {
	@property() config!: ITouchpadConfig;

	clickTimer?: ReturnType<typeof setTimeout>;
	clickCount: number = 0;

	holdTimer?: ReturnType<typeof setTimeout>;
	holdInterval?: ReturnType<typeof setInterval>;
	direction?: DirectionAction;
	fireDragAction: boolean = true;

	onClick(e: MouseEvent | PointerEvent) {
		e.stopImmediatePropagation();
		this.clickCount++;
		const multiPrefix = this.getMultiPrefix();

		if (
			this.renderTemplate(
				this.config.double_tap_action?.action ?? 'none',
			) != 'none' ||
			this.renderTemplate(
				this.config.multi_double_tap_action?.action ?? 'none',
			) != 'none'
		) {
			// Double tap action is defined
			const doubleTapAction: ActionType = `${
				this.pointers > 2 ? 'multi_' : ''
			}double_tap_action`;

			if (this.clickCount > 1) {
				// Double tap action is triggered
				this.fireHapticEvent('success');
				this.sendAction(doubleTapAction);
				this.endAction();
			} else {
				// Single tap action is triggered if double tap is not within window
				if (!this.clickTimer) {
					const doubleTapWindow =
						(this.renderTemplate(
							this.config[doubleTapAction]?.double_tap_window ??
								(this.config.double_tap_action
									?.double_tap_window as number),
						) as number) ?? DOUBLE_TAP_WINDOW;
					this.clickTimer = setTimeout(() => {
						this.fireHapticEvent('light');
						this.sendAction(`${multiPrefix}tap_action`);
						this.endAction();
					}, doubleTapWindow);
				}
			}
		} else {
			// No double tap action defined, tap action is triggered
			this.fireHapticEvent('light');
			this.sendAction(`${multiPrefix}tap_action`);
			this.endAction();
		}
	}

	onDown(e: MouseEvent | PointerEvent) {
		if (!super.onDown(e)) {
			return;
		}
		this.cancelRippleToggle();

		// Only consider primary pointer event
		if ('isPrimary' in e && !e.isPrimary) {
			return;
		}

		if (!this.direction) {
			// Momentary actions only when no direction action
			if (
				this.renderTemplate(
					this.config.momentary_start_action?.action ?? 'none',
				) != 'none'
			) {
				this.fireHapticEvent('light');
				this.momentaryStart = performance.now();
				this.sendAction('momentary_start_action');
			} else if (
				this.renderTemplate(
					this.config.momentary_end_action?.action ?? 'none',
				) != 'none'
			) {
				this.fireHapticEvent('light');
				this.momentaryStart = performance.now();
			} else if (!this.holdTimer) {
				this.setHoldTimer();
			}
			return;
		}
	}

	onUp(e: MouseEvent | PointerEvent) {
		if (!super.onUp(e)) {
			return;
		}
		if (this.pointers) {
			if (this.direction) {
				// Swipe or drag actions
				if (
					this.renderTemplate(
						this.config[`${this.getMultiPrefix()}drag_action`]
							?.action ?? 'none',
					) == 'none'
				) {
					// Swipe direction actions
					if (this.holdInterval) {
						e.stopImmediatePropagation();
						if (e.cancelable) {
							e.preventDefault();
						}
					} else {
						this.fireHapticEvent('light');
						this.sendAction(
							`${this.getMultiPrefix()}tap_action`,
							this.getActions(),
						);
					}
				}
				this.endAction();
				return;
			}

			if (
				this.renderTemplate(
					this.config.momentary_end_action?.action ?? 'none',
				) != 'none'
			) {
				// No direction action and momentary end action is defined
				this.momentaryEnd = performance.now();
				this.fireHapticEvent('selection');
				this.sendAction('momentary_end_action');
				this.endAction();
			} else if (
				this.renderTemplate(
					this.config.momentary_start_action?.action ?? 'none',
				) != 'none'
			) {
				// No direction action and momentary start action is defined
				this.endAction();
			} else {
				// Tap and double tap actions, clear hold action before proceeding
				clearInterval(this.holdTimer);
				this.holdTimer = undefined;
				this.onClick(e);
			}
		}
		this.toggleRipple();
	}

	onMove(e: MouseEvent | PointerEvent) {
		if (!this.initialX || !this.initialY || !super.onMove(e)) {
			return;
		}
		const multiPrefix = this.getMultiPrefix();

		// Only consider significant enough movement
		const totalDeltaX = (this.currentX ?? 0) - this.initialX;
		const totalDeltaY = (this.currentY ?? 0) - this.initialY;
		if (
			this.renderTemplate(
				this.config[`${multiPrefix}drag_action`]?.action ?? 'none',
			) != 'none'
		) {
			// Drag actions
			if (Math.abs(Math.abs(totalDeltaX) - Math.abs(totalDeltaY)) > 0.5) {
				if (this.fireDragAction) {
					clearTimeout(this.holdTimer);
					this.holdTimer = undefined;

					const repeatDelay = this.renderTemplate(
						this.config[`${multiPrefix}drag_action`]
							?.repeat_delay ?? 0, // default to 0 instead of normal repeat delay
					) as number;
					if (repeatDelay) {
						this.fireDragAction = false;
						setTimeout(() => {
							this.fireDragAction = true;
						}, repeatDelay);
					}

					this.sendAction(`${multiPrefix}drag_action`);
				}
			}
		} else {
			// Swipe directions
			if (Math.abs(Math.abs(totalDeltaX) - Math.abs(totalDeltaY)) > 2) {
				if (Math.abs(totalDeltaX) > Math.abs(totalDeltaY)) {
					this.direction = totalDeltaX < 0 ? 'left' : 'right';
				} else {
					this.direction = totalDeltaY < 0 ? 'up' : 'down';
				}
			}
		}
	}

	onLeaveCancel(_e: MouseEvent | PointerEvent) {
		this.endAction();
		this.toggleRipple();
	}

	endAction() {
		clearTimeout(this.clickTimer as ReturnType<typeof setTimeout>);
		this.clickTimer = undefined;
		this.clickCount = 0;

		clearTimeout(this.holdTimer as ReturnType<typeof setTimeout>);
		clearInterval(this.holdInterval as ReturnType<typeof setInterval>);
		this.holdTimer = undefined;
		this.holdInterval = undefined;
		this.direction = undefined;

		super.endAction();
	}

	getActions(): IActions {
		return (
			this.direction ? this.config[this.direction] : this.config
		) as IActions;
	}

	getMultiPrefix(): 'multi_' | '' {
		return this.pointers > 1 ? 'multi_' : '';
	}

	setHoldTimer() {
		const holdAction = `${this.getMultiPrefix()}hold_action`;
		const actions = this.getActions();

		const holdTime = this.renderTemplate(
			actions[holdAction as ActionType]?.hold_time ?? HOLD_TIME,
		) as number;

		this.holdTimer = setTimeout(() => {
			const actions = this.getActions();
			const multiPrefix = this.getMultiPrefix();

			let repeat =
				this.renderTemplate(actions.hold_action?.action as string) ==
				'repeat';
			let repeatDelay = this.renderTemplate(
				actions.hold_action?.repeat_delay ?? REPEAT_DELAY,
			) as number;
			if (multiPrefix == 'multi_' && actions.multi_hold_action) {
				repeat =
					this.renderTemplate(
						actions.multi_hold_action?.action as string,
					) == 'repeat';
				repeatDelay = this.renderTemplate(
					actions.multi_hold_action?.repeat_delay ?? REPEAT_DELAY,
				) as number;
			}
			if (repeat) {
				if (!this.holdInterval) {
					const holdIntervalAction = (haptic: HapticType) => {
						this.fireHapticEvent(haptic);
						this.sendAction(
							`${this.getMultiPrefix()}tap_action`,
							this.getActions(),
						);
					};
					this.holdInterval = setInterval(() => {
						holdIntervalAction('selection');
					}, repeatDelay);
					holdIntervalAction('light');
				}
			} else {
				this.fireHapticEvent('medium');
				this.sendAction(`${multiPrefix}hold_action`, actions);
				this.endAction();
			}
		}, holdTime);
	}

	render() {
		this.setValue();
		return html`
			<toucharea
				@mousedown=${this.onDown}
				@mouseup=${this.onUp}
				@mousemove=${this.onMove}
				@mouseleave=${this.onLeaveCancel}
				@pointerdown=${this.onDown}
				@pointerup=${this.onUp}
				@pointermove=${this.onMove}
				@pointerleave=${this.onLeaveCancel}
				@pointercancel=${this.onLeaveCancel}
				@contextmenu=${this.onContextMenu}
			>
				<div class="toucharea-row">
					<remote-icon-label
						id="up"
						.hass=${this.hass}
						.config=${this.config.up ?? {}}
						.icons=${this.icons}
					></remote-icon-label>
				</div>
				<div class="toucharea-row">
					<remote-icon-label
						id="left"
						.hass=${this.hass}
						.config=${this.config.left ?? {}}
						.icons=${this.icons}
					></remote-icon-label>
					<remote-icon-label
						id="center"
						.hass=${this.hass}
						.config=${this.config}
						.icons=${this.icons}
					></remote-icon-label>
					<remote-icon-label
						id="right"
						.hass=${this.hass}
						.config=${this.config.right ?? {}}
						.icons=${this.icons}
					></remote-icon-label>
				</div>
				<div class="toucharea-row">
					<remote-icon-label
						id="down"
						.hass=${this.hass}
						.config=${this.config.down ?? {}}
						.icons=${this.icons}
					></remote-icon-label>
				</div>
				${this.buildRipple()}
			</toucharea>
			${this.buildStyles(this.config.styles)}
		`;
	}

	static get styles(): CSSResult | CSSResult[] {
		return [
			super.styles as CSSResult,
			css`
				:host {
					display: contents;

					--mdc-ripple-press-opacity: 0.04;
				}
				toucharea {
					border-radius: 32px;
					flex-grow: 1;
					height: 250px;
					width: -moz-available;
					width: -webkit-fill-available;
					width: fill-available;
					background: var(
						--lovelace-background,
						var(--primary-background-color, rgb(111, 118, 125))
					);
					touch-action: none;
					text-align: center;
					position: relative;
					overflow: hidden;
					display: flex;
					flex-direction: column;
					flex-wrap: nowrap;
					justify-content: space-between;
				}
				.toucharea-row {
					min-height: var(--size, 48px);
					display: flex;
					flex-direction: row;
					flex-wrap: nowrap;
					width: -moz-available;
					width: -webkit-fill-available;
					width: fill-available;
					justify-content: space-around;
					align-items: center;
					pointer-events: none;
				}
			`,
		];
	}
}

@customElement('remote-icon-label')
export class IconLabelContainer extends BaseRemoteElement {
	render() {
		this.setValue();
		return html`
			${this.buildIcon(this.config.icon)}${this.buildLabel(
				this.config.label,
			)}${this.buildStyles(this.config.styles)}
		`;
	}
}
