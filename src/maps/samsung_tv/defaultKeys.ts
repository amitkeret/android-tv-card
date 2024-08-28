import { IElementConfig } from '../../models';

/**
 * https://www.home-assistant.io/integrations/samsungtv/#remote
 */
export const samsungTVDefaultKeys: IElementConfig[] = [
	{
		type: 'button',
		name: 'power',
		tap_action: { action: 'key', key: 'KEY_POWER' },
		icon: 'mdi:power',
	},
	{
		type: 'button',
		name: 'power_on',
		tap_action: { action: 'key', key: 'KEY_POWERON' },
		icon: 'mdi:power-on',
	},
	{
		type: 'button',
		name: 'power_off',
		tap_action: { action: 'key', key: 'KEY_POWEROFF' },
		icon: 'mdi:power-off',
	},
	{
		type: 'button',
		name: 'home',
		tap_action: { action: 'key', key: 'KEY_HOME' },
		icon: 'mdi:home',
	},
	{
		type: 'button',
		name: 'back',
		tap_action: { action: 'key', key: 'KEY_RETURN' },
		icon: 'mdi:keyboard-backspace',
	},
	{
		type: 'button',
		name: 'menu',
		tap_action: { action: 'key', key: 'KEY_MENU' },
		icon: 'mdi:menu',
	},
	{
		type: 'button',
		name: 'top_menu',
		tap_action: { action: 'key', key: 'KEY_TOPMENU' },
		icon: 'mdi:backburger',
	},
	{
		type: 'button',
		name: 'volume_up',
		tap_action: { action: 'key', key: 'KEY_VOLUP' },
		icon: 'mdi:volume-high',
	},
	{
		type: 'button',
		name: 'volume_down',
		tap_action: { action: 'key', key: 'KEY_VOLDOWN' },
		icon: 'mdi:volume-medium',
	},
	{
		type: 'button',
		name: 'volume_mute',
		tap_action: { action: 'key', key: 'KEY_MUTE' },
		icon: 'mdi:volume-low',
	},
	{
		type: 'button',
		name: 'volume_buttons',
		icon: 'mdi:volume-plus',
	},
	{
		type: 'slider',
		name: 'slider',
		range: [0, 1],
		step: 0.01,
		value_attribute: 'volume_level',
		tap_action: {
			action: 'perform-action',
			perform_action: 'media_player.volume_set',
			data: {
				volume_level: '{{ value | float }}',
			},
		},
	},
	{
		type: 'button',
		name: 'up',
		tap_action: { action: 'key', key: 'KEY_UP' },
		icon: 'mdi:chevron-up',
	},
	{
		type: 'button',
		name: 'down',
		tap_action: { action: 'key', key: 'KEY_DOWN' },
		icon: 'mdi:chevron-down',
	},
	{
		type: 'button',
		name: 'left',
		tap_action: { action: 'key', key: 'KEY_LEFT' },
		icon: 'mdi:chevron-left',
	},
	{
		type: 'button',
		name: 'right',
		tap_action: { action: 'key', key: 'KEY_RIGHT' },
		icon: 'mdi:chevron-right',
	},
	{
		type: 'button',
		name: 'center',
		tap_action: { action: 'key', key: 'KEY_ENTER' },
		icon: 'mdi:circle',
	},
	{
		type: 'button',
		name: 'navigation_buttons',
		icon: 'mdi:gamepad',
	},
	{
		type: 'button',
		name: 'dpad',
		icon: 'mdi:gamepad',
	},
	{
		type: 'touchpad',
		name: 'touchpad',
		tap_action: {
			action: 'key',
			key: 'KEY_ENTER',
		},
		up: {
			tap_action: { action: 'key', key: 'KEY_UP' },
			hold_action: { action: 'repeat' },
		},
		down: {
			tap_action: { action: 'key', key: 'KEY_DOWN' },
			hold_action: { action: 'repeat' },
		},
		left: {
			tap_action: { action: 'key', key: 'KEY_LEFT' },
			hold_action: { action: 'repeat' },
		},
		right: {
			tap_action: { action: 'key', key: 'KEY_RIGHT' },
			hold_action: { action: 'repeat' },
		},
	},
	{
		type: 'button',
		name: 'play',
		tap_action: { action: 'key', key: 'KEY_PLAY' },
		icon: 'mdi:play',
	},
	{
		type: 'button',
		name: 'pause',
		tap_action: { action: 'key', key: 'KEY_PAUSE' },
		icon: 'mdi:pause',
	},
	{
		type: 'button',
		name: 'rewind',
		tap_action: { action: 'key', key: 'KEY_REWIND' },
		icon: 'mdi:rewind',
	},
	{
		type: 'button',
		name: 'fast_forward',
		tap_action: { action: 'key', key: 'KEY_FF' },
		icon: 'mdi:fast-forward',
	},
	{
		type: 'button',
		name: 'stop',
		tap_action: { action: 'key', key: 'KEY_STOP' },
		icon: 'mdi:stop',
	},
	{
		type: 'button',
		name: 'record',
		tap_action: { action: 'key', key: 'KEY_REC' },
		icon: 'mdi:record',
	},
	{
		type: 'button',
		name: 'channel_up',
		tap_action: { action: 'key', key: 'KEY_CHUP' },
		icon: 'mdi:arrow-up-circle',
	},
	{
		type: 'button',
		name: 'channel_down',
		tap_action: { action: 'key', key: 'KEY_CHDOWN' },
		icon: 'mdi:arrow-down-circle',
	},
	{
		type: 'button',
		name: 'channel_previous',
		tap_action: { action: 'key', key: 'KEY_PRECH' },
		icon: 'mdi:arrow-left-circle',
	},
	{
		type: 'button',
		name: 'channel_favorites',
		tap_action: { action: 'key', key: 'KEY_FAVCH' },
		icon: 'mdi:star-circle',
	},
	{
		type: 'button',
		name: 'channel_list',
		tap_action: { action: 'key', key: 'KEY_CH_LIST' },
		icon: 'mdi:list-box',
	},
	{
		type: 'button',
		name: 'red',
		tap_action: { action: 'key', key: 'KEY_RED' },
		icon: 'mdi:alpha-r-box',
	},
	{
		type: 'button',
		name: 'green',
		tap_action: { action: 'key', key: 'KEY_GREEN' },
		icon: 'mdi:alpha-g-box',
	},
	{
		type: 'button',
		name: 'yellow',
		tap_action: { action: 'key', key: 'KEY_YELLOW' },
		icon: 'mdi:alpha-y-box',
	},
	{
		type: 'button',
		name: 'blue',
		tap_action: { action: 'key', key: 'KEY_CYAN' },
		icon: 'mdi:alpha-b-box',
	},
	{
		type: 'button',
		name: 'n0',
		tap_action: { action: 'key', key: 'KEY_0' },
		icon: 'mdi:numeric-0',
	},
	{
		type: 'button',
		name: 'n1',
		tap_action: { action: 'key', key: 'KEY_1' },
		icon: 'mdi:numeric-1',
	},
	{
		type: 'button',
		name: 'n2',
		tap_action: { action: 'key', key: 'KEY_2' },
		icon: 'mdi:numeric-2',
	},
	{
		type: 'button',
		name: 'n3',
		tap_action: { action: 'key', key: 'KEY_3' },
		icon: 'mdi:numeric-3',
	},
	{
		type: 'button',
		name: 'n4',
		tap_action: { action: 'key', key: 'KEY_4' },
		icon: 'mdi:numeric-4',
	},
	{
		type: 'button',
		name: 'n5',
		tap_action: { action: 'key', key: 'KEY_5' },
		icon: 'mdi:numeric-5',
	},
	{
		type: 'button',
		name: 'n6',
		tap_action: { action: 'key', key: 'KEY_6' },
		icon: 'mdi:numeric-6',
	},
	{
		type: 'button',
		name: 'n7',
		tap_action: { action: 'key', key: 'KEY_7' },
		icon: 'mdi:numeric-7',
	},
	{
		type: 'button',
		name: 'n8',
		tap_action: { action: 'key', key: 'KEY_8' },
		icon: 'mdi:numeric-8',
	},
	{
		type: 'button',
		name: 'n9',
		tap_action: { action: 'key', key: 'KEY_9' },
		icon: 'mdi:numeric-9',
	},
	{
		type: 'button',
		name: 'numpad',
		icon: 'mdi:dialpad',
	},
	{
		type: 'button',
		name: 'info',
		tap_action: { action: 'key', key: 'KEY_INFO' },
		icon: 'mdi:information',
	},
	{
		type: 'button',
		name: 'guide',
		tap_action: { action: 'key', key: 'KEY_GUIDE' },
		icon: 'mdi:television-box',
	},
	{
		type: 'button',
		name: 'captions',
		tap_action: { action: 'key', key: 'KEY_CAPTION' },
		icon: 'mdi:closed-caption',
	},
	{
		type: 'button',
		name: 'tools',
		tap_action: { action: 'key', key: 'KEY_TOOLS' },
		icon: 'mdi:hammer-screwdriver',
	},
	{
		type: 'button',
		name: 'contents',
		tap_action: { action: 'key', key: 'KEY_CONTENTS' },
		icon: 'mdi:table-of-contents',
	},
	{
		type: 'button',
		name: 'disc_menu',
		tap_action: { action: 'key', key: 'KEY_DISC_MENU' },
		icon: 'mdi:dots-horizontal-circle',
	},
	{
		type: 'button',
		name: 'dvr_menu',
		tap_action: { action: 'key', key: 'KEY_DVR_MENU' },
		icon: 'mdi:dots-vertical-circle',
	},
	{
		type: 'button',
		name: 'help',
		tap_action: { action: 'key', key: 'KEY_HELP' },
		icon: 'mdi:help',
	},
	{
		type: 'button',
		name: 'live',
		tap_action: { action: 'key', key: 'KEY_LIVE' },
		icon: 'mdi:debug-step-over',
	},
	{
		type: 'button',
		name: 'quick_replay',
		tap_action: { action: 'key', key: 'KEY_QUICK_REPLAY' },
		icon: 'mdi:replay',
	},
	{
		type: 'button',
		name: 'still_picture',
		tap_action: { action: 'key', key: 'KEY_STILL_PICTURE' },
		icon: 'mdi:image',
	},
	{
		type: 'button',
		name: 'instant_replay',
		tap_action: { action: 'key', key: 'KEY_INSTANT_REPLAY' },
		icon: 'mdi:replay',
	},
	{
		type: 'button',
		name: 'source',
		tap_action: { action: 'key', key: 'KEY_SOURCE' },
		icon: 'mdi:import',
	},
	{
		type: 'button',
		name: 'auto_program',
		tap_action: { action: 'key', key: 'KEY_AUTO_PROGRAM' },
		icon: 'mdi:refresh-auto',
	},
	{
		type: 'button',
		name: 'channel_magic',
		tap_action: { action: 'key', key: 'KEY_MAGIC_CHANNEL' },
		icon: 'mdi:auto-fix',
	},
	{
		type: 'button',
		name: 'component_1',
		tap_action: { action: 'key', key: 'KEY_COMPONENT1' },
		icon: 'mdi:video-input-component',
	},
	{
		type: 'button',
		name: 'component_2',
		tap_action: { action: 'key', key: 'KEY_COMPONENT2' },
		icon: 'mdi:video-input-component',
	},
	{
		type: 'button',
		name: 'av_1',
		tap_action: { action: 'key', key: 'KEY_AV1' },
		icon: 'mdi:video-input-component',
	},
	{
		type: 'button',
		name: 'av_2',
		tap_action: { action: 'key', key: 'KEY_AV2' },
		icon: 'mdi:video-input-component',
	},
	{
		type: 'button',
		name: 'av_2',
		tap_action: { action: 'key', key: 'KEY_AV2' },
		icon: 'mdi:video-input-component',
	},
	{
		type: 'button',
		name: 'svideo_1',
		tap_action: { action: 'key', key: 'KEY_SVIDEO1' },
		icon: 'mdi:video-input-svideo',
	},
	{
		type: 'button',
		name: 'svideo_2',
		tap_action: { action: 'key', key: 'KEY_SVIDEO2' },
		icon: 'mdi:video-input-svideo',
	},
	{
		type: 'button',
		name: 'svideo_3',
		tap_action: { action: 'key', key: 'KEY_SVIDEO3' },
		icon: 'mdi:video-input-svideo',
	},
	{
		type: 'button',
		name: 'hdmi',
		tap_action: { action: 'key', key: 'KEY_HDMI' },
		icon: 'mdi:video-input-hdmi',
	},
	{
		type: 'button',
		name: 'fm_radio',
		tap_action: { action: 'key', key: 'KEY_FM_RADIO' },
		icon: 'mdi:radio-fm',
	},
	{
		type: 'button',
		name: 'dvi',
		tap_action: { action: 'key', key: 'KEY_DVI' },
		icon: 'mdi:serial-port',
	},
	{
		type: 'button',
		name: 'dvr',
		tap_action: { action: 'key', key: 'KEY_DVR' },
		icon: 'mdi:record-rec',
	},
	{
		type: 'button',
		name: 'tv',
		tap_action: { action: 'key', key: 'KEY_TV' },
		icon: 'mdi:television',
	},
	{
		type: 'button',
		name: 'antenna',
		tap_action: { action: 'key', key: 'KEY_ANTENA' },
		icon: 'mdi:video-input-antenna',
	},
	{
		type: 'button',
		name: 'dtv',
		tap_action: { action: 'key', key: 'KEY_DTV' },
		icon: 'mdi:alpha-d-box',
	},
	{
		type: 'button',
		name: 'ambient',
		tap_action: { action: 'key', key: 'KEY_AMBIENT' },
		icon: 'mdi:television-ambient-light',
	},
	{
		type: 'button',
		name: '3d',
		tap_action: { action: 'key', key: 'KEY_PANNEL_CHDOWN' },
		icon: 'mdi:video-3d',
	},
	{
		type: 'button',
		name: 'anynet',
		tap_action: { action: 'key', key: 'KEY_ANYNET' },
		icon: 'mdi:hdmi-port',
	},
	{
		type: 'button',
		name: 'energy_saving',
		tap_action: { action: 'key', key: 'KEY_ESAVING' },
		icon: 'mdi:leaf',
	},
	{
		type: 'button',
		name: 'sleep_timer',
		tap_action: { action: 'key', key: 'KEY_SLEEP' },
		icon: 'mdi:power-sleep',
	},
	{
		type: 'button',
		name: 'dtv_signal',
		tap_action: { action: 'key', key: 'KEY_DTV_SIGNAL' },
		icon: 'mdi:alpha-d-circle',
	},
	{
		type: 'button',
		name: 'pip_toggle',
		tap_action: { action: 'key', key: 'KEY_PIP_ONOFF' },
		icon: 'mdi:picture-in-picture-top-right',
	},
	{
		type: 'button',
		name: 'pip_swap',
		tap_action: { action: 'key', key: 'KEY_PIP_SWAP' },
		icon: 'mdi:picture-in-picture-bottom-right-outline',
	},
	{
		type: 'button',
		name: 'pip_size',
		tap_action: { action: 'key', key: 'KEY_PIP_SIZE' },
		icon: 'mdi:picture-in-picture-top-right-outline',
	},
	{
		type: 'button',
		name: 'pip_channel_up',
		tap_action: { action: 'key', key: 'KEY_PIP_CHUP' },
		icon: 'mdi:arrow-up-circle-outline',
	},
	{
		type: 'button',
		name: 'pip_channel_down',
		tap_action: { action: 'key', key: 'KEY_PIP_CHDOWN' },
		icon: 'mdi:arrow-down-circle-outline',
	},
	{
		type: 'button',
		name: 'pip_small',
		tap_action: { action: 'key', key: 'KEY_AUTO_ARC_PIP_SMALL' },
		icon: 'mdi:image',
	},
	{
		type: 'button',
		name: 'pip_wide',
		tap_action: { action: 'key', key: 'KEY_AUTO_ARC_PIP_WIDE' },
		icon: 'mdi:panorama',
	},
	{
		type: 'button',
		name: 'pip_bottom_right',
		tap_action: { action: 'key', key: 'KEY_AUTO_ARC_PIP_RIGHT_BOTTOM' },
		icon: 'mdi:picture-in-picture-bottom-right',
	},
	{
		type: 'button',
		name: 'pip_scan',
		tap_action: { action: 'key', key: 'KEY_PIP_SCAN' },
		icon: 'mdi:picture-in-picture-bottom-right-outline',
	},
	{
		type: 'button',
		name: 'vcr',
		tap_action: { action: 'key', key: 'KEY_VCR_MODE' },
		icon: 'mdi:vhs',
	},
	{
		type: 'button',
		name: 'catv',
		tap_action: { action: 'key', key: 'KEY_CATV_MODE' },
		icon: 'mdi:video-input-antenna',
	},
	{
		type: 'button',
		name: 'dss',
		tap_action: { action: 'key', key: 'KEY_DSS_MODE' },
		icon: 'mdi:alpha-d-box',
	},
	{
		type: 'button',
		name: 'tv',
		tap_action: { action: 'key', key: 'KEY_TV_MODE' },
		icon: 'mdi:television',
	},
	{
		type: 'button',
		name: 'dvd',
		tap_action: { action: 'key', key: 'KEY_DVD_MODE' },
		icon: 'mdi:disc',
	},
	{
		type: 'button',
		name: 'stb',
		tap_action: { action: 'key', key: 'KEY_STB_MODE' },
		icon: 'mdi:audio-video',
	},
	{
		type: 'button',
		name: 'pc',
		tap_action: { action: 'key', key: 'KEY_PCMODE' },
		icon: 'mdi:desktop-tower',
	},
	{
		type: 'button',
		name: 'teletext_mix',
		tap_action: { action: 'key', key: 'KEY_TTX_MIX' },
		icon: 'mdi:text',
	},
	{
		type: 'button',
		name: 'teletext_subface',
		tap_action: { action: 'key', key: 'KEY_' },
		icon: 'mdi:text-box-outline',
	},
	{
		type: 'button',
		name: 'aspect_ratio',
		tap_action: { action: 'key', key: 'KEY_ASPECT' },
		icon: 'mdi:aspect-ratio',
	},
	{
		type: 'button',
		name: 'picture_size',
		tap_action: { action: 'key', key: 'KEY_PICTURE_SIZE' },
		icon: 'mdi:image-size-select-large',
	},
	{
		type: 'button',
		name: 'aspect_ratio_4_3',
		tap_action: { action: 'key', key: 'KEY_4_3' },
		icon: 'mdi:image',
	},
	{
		type: 'button',
		name: 'aspect_ratio_16_9',
		tap_action: { action: 'key', key: 'KEY_16_9' },
		icon: 'mdi:image-area',
	},
	{
		type: 'button',
		name: 'picture_mode',
		tap_action: { action: 'key', key: 'KEY_PMODE' },
		icon: 'mdi:image-text',
	},
	{
		type: 'button',
		name: 'picture_mode_panorama',
		tap_action: { action: 'key', key: 'KEY_PANORAMA' },
		icon: 'mdi:panorama-variant',
	},
	{
		type: 'button',
		name: 'picture_mode_dynamic',
		tap_action: { action: 'key', key: 'KEY_DYNAMIC' },
		icon: 'mdi:image-auto-adjust',
	},
	{
		type: 'button',
		name: 'picture_mode_standard',
		tap_action: { action: 'key', key: 'KEY_STANDARD' },
		icon: 'mdi:image',
	},
	{
		type: 'button',
		name: 'picture_mode_movie',
		tap_action: { action: 'key', key: 'KEY_MOVIE1' },
		icon: 'mdi:movie',
	},
	{
		type: 'button',
		name: 'picture_mode_game',
		tap_action: { action: 'key', key: 'KEY_GAME' },
		icon: 'mdi:controller',
	},
	{
		type: 'button',
		name: 'picture_mode_custom',
		tap_action: { action: 'key', key: 'KEY_CUSTOM' },
		icon: 'mdi:image-plus',
	},
	{
		type: 'button',
		name: 'clock',
		tap_action: { action: 'key', key: 'KEY_CLOCK_DISPLAY' },
		icon: 'mdi:clock',
	},
	{
		type: 'button',
		name: 'clock_timer_setup',
		tap_action: { action: 'key', key: 'KEY_SETUP_CLOCK_TIMER' },
		icon: 'mdi:clock-alert',
	},
	{
		type: 'button',
		name: 'subtitle',
		tap_action: { action: 'key', key: 'KEY_SUB_TITLE' },
		icon: 'mdi:subtitles',
	},
	{
		type: 'button',
		name: 'zoom_move',
		tap_action: { action: 'key', key: 'KEY_ZOOM_MOVE' },
		icon: 'mdi:magnify-plus-cursor',
	},
	{
		type: 'button',
		name: 'zoom_in',
		tap_action: { action: 'key', key: 'KEY_ZOOM_IN' },
		icon: 'mdi:magnify-plus',
	},
	{
		type: 'button',
		name: 'zoom_out',
		tap_action: { action: 'key', key: 'KEY_ZOOM_OUT' },
		icon: 'mdi:magnify-minus',
	},
	{
		type: 'button',
		name: 'zoom_1',
		tap_action: { action: 'key', key: 'KEY_ZOOM1' },
		icon: 'mdi:magnify-plus-outline',
	},
	{
		type: 'button',
		name: 'zoom_2',
		tap_action: { action: 'key', key: 'KEY_ZOOM2' },
		icon: 'mdi:magnify-minus-outline',
	},
];
