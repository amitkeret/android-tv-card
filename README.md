# Universal Remote Card

[![GitHub Release](https://img.shields.io/github/release/Nerwyn/android-tv-card.svg?style=for-the-badge)](https://github.com/nerwyn/android-tv-card/releases)
[![License](https://img.shields.io/github/license/Nerwyn/android-tv-card.svg?style=for-the-badge)](LICENSE)
[![hacs_badge](https://img.shields.io/badge/HACS-Default-blue.svg?style=for-the-badge)](https://github.com/hacs/default)
[![Project Maintenance](https://img.shields.io/badge/maintainer-Nerwyn-blue.svg?style=for-the-badge)](https://github.com/Nerwyn)
![Github](https://img.shields.io/github/followers/Nerwyn.svg?style=for-the-badge)
[![GitHub Activity](https://img.shields.io/github/last-commit/Nerwyn/android-tv-card?style=for-the-badge)](https://github.com/Nerwyn/android-tv-card/commits/main)
[![Community Forum](https://img.shields.io/badge/community-forum-brightgreen.svg?style=for-the-badge)](https://community.home-assistant.io/t/android-tv-card-a-tv-card-fork-for-android-tv/585089)
[![Buy Me A Coffee](https://img.shields.io/badge/donate-☕buy_me_a_coffee-yellow.svg?style=for-the-badge)](https://www.buymeacoffee.com/nerwyn)

[![My Home Assistant](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?repository=android-tv-card&owner=Nerwyn&category=Plugin)

_Formerly called Android TV Card_

<img src="https://raw.githubusercontent.com/Nerwyn/android-tv-card/main/assets/screenshot.png" alt="example" width="300"/>

A super customizable universal remote card iterating on the work of several other projects. Featuring:

- Configuration UI.
- Out of the box support for [several platforms](#media-platform-and-entity-ids) with default keys and sources lists.
  - Android TV (with keyboard via ADB)
  - Sony BRAVIA (with keyboard via ADB)
  - Fire TV (with keyboard)
  - Roku (with keyboard)
  - LG webOS (with keyboard)
  - Kodi (with keyboard)
  - Unified Remote for Windows, macOS, and Linux (with keyboard)
  - Apple TV
  - Samsung TV
  - Jellyfin
- Support for multiple buttons, touchpads, and sliders using default or user defined custom actions.
- Complete [Home Assistant actions](https://www.home-assistant.io/dashboards/actions/) support.
- [Keyboard and search](#keyboard-textbox-and-search) dialog actions for most platforms.
- [Template](#a-note-on-templating) support for almost all fields using nunjucks.
- Toggleable haptics.
- Remappable touchpad with [momentary, multi-touch, and drag](#touchpad-actions) gesture support.
- Remappable slider with vertical orientation support.
- User configurable remote [layout](#layout).
- Icons and labels for all elements.
- Custom SVG icon support.
- CSS style options for all sub-elements.

# How To Use

This project now has a fully featured configuration user interface! To get started, install this project using HACS. Then go to a dashboard and create a universal remote card or edit an existing one.

The editor has four tabs - General, Layout, Actions, and Icons.

# General

<img src="https://raw.githubusercontent.com/Nerwyn/android-tv-card/main/assets/editor_general_tab.png" alt="editor general tab" width="600"/>

Platform, entity ID, and timing fields set in the general tab will be used for default keys and sources. If you do not set these fields for custom actions and autofill is enabled, they will also use these fields. If you explicitly set one of these fields in a custom action, it will not be overwritten if you change the matching general field until you clear the field in the custom action. To completely clear toggle fields, you must remove them from the config using the code editor.

## Media Platform and Entity IDs

This card supports several media platforms with default key and source lists. For the most part it uses the Home Assistant integrations for these platforms via their remote and/or media player entities. Some platforms require custom integrations as listed below. Different platforms use the remote and media player entities for different functions as shown below. For platforms with keyboard support, the keyboard entity ID (which doesn't always match the remote and media player entities) can also be provided.

| Platform                                                                   | Remote                   | Media Player                                                                                                                           | Keyboard                                                                                                  |
| -------------------------------------------------------------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| [Android TV](https://www.home-assistant.io/integrations/androidtv_remote/) | Default keys and sources | Default slider                                                                                                                         | [ADB](https://www.home-assistant.io/integrations/androidtv/) remote (preferred) or media player           |
| [Sony BRAVIA](https://www.home-assistant.io/integrations/braviatv/)        | Default keys             | Default sources and slider                                                                                                             | [ADB](https://www.home-assistant.io/integrations/androidtv/) remote (preferred) or media player           |
| [Fire TV](https://www.home-assistant.io/integrations/androidtv/)           | Default keys             | Default sources and slider                                                                                                             | Remote (preferred) or media player                                                                        |
| [Roku](https://www.home-assistant.io/integrations/roku/)                   | Default keys             | Default sources and slider                                                                                                             | Remote for keyboard, media player for search (provide one for keyboard ID and the others in their fields) |
| [LG webOS](https://www.home-assistant.io/integrations/webostv/)            | NA                       | Default keys, sources, and slider                                                                                                      | Media player                                                                                              |
| [Kodi](https://www.home-assistant.io/integrations/kodi/)                   | NA                       | Default keys, sources, and slider                                                                                                      | Media player                                                                                              |
| [Unified Remote](https://github.com/DaviPtrs/hass-unified-remote)          | NA (see below)           | NA (see below)                                                                                                                         | NA (see below)                                                                                            |
| [Apple TV](https://www.home-assistant.io/integrations/apple_tv)            | Default keys             | Default sources and slider                                                                                                             | NA                                                                                                        |
| [Samsung TV](https://www.home-assistant.io/integrations/samsungtv/)        | Default keys             | Default sources (requires the [SamsungTV Smart Component custom integration](https://github.com/ollo69/ha-samsungtv-smart)) and slider | NA                                                                                                        |
| [Jellyfin](https://www.home-assistant.io/integrations/jellyfin/)           | Default keys             | Play/pause and slider                                                                                                                  | NA                                                                                                        |

### Samsung TV Sources

The Home Assistant Samsung TV integration does not allow you to change sources. To do so you need to setup the [SamsungTV Smart Component custom integration](https://github.com/ollo69/ha-samsungtv-smart) and provide it's media player entity ID to this card.

### Unified Remote Setup

Unlike most platforms, Unified Remote relies entirely on [a custom integration](https://github.com/DaviPtrs/hass-unified-remote), which is used to control a [Unified Remote server](https://www.unifiedremote.com/) on your PC. This custom integration does not create any entities, but does provide us with the action `unified_remote.call`, which can be used to call any Unified Remote API. It requires that you install the integration and setup your computer hosts [as described here in its README](https://github.com/DaviPtrs/hass-unified-remote?tab=readme-ov-file#home-assistant). You can then use the host name or IP address in the remote and keyboard ID fields in the configuration UI (make sure it does not autofill with an actual entity, you may have to fix it with the code editor).

## Action Timings

Double tap and hold actions have user adjustable timings to change how they are triggered. These values can be set globally in the general tab or for each custom action.

### Hold Time

Hold actions are triggered by holding down on a button for a defined amount of time and then releasing. The default amount of time is 500ms. You can change this by setting `Hold time` in the hold action to a different number.

### Repeat and Repeat Delay

By setting a hold action to `repeat`, the tap action will repeat while the button is held down. The default delay between repeats is 100ms. You can change this by setting `Repeat delay` in the hold action to a different number.

The following default keys have hold actions set to `repeat` by default. You can disable this by creating a custom action for them and setting their hold actions to `none` or a different action. The touchpad direction actions also are set to repeat when held, and can similarly be disabled or remapped by creating a custom action for the touchpad and changing it's hold action.

- up
- down
- left
- right
- volume_up
- volume_down
- delete
- forward_delete
- touchpad up/down/left/right

### Double Tap Window

Double tap actions have a default window of 200ms to trigger before a single tap action is triggered instead. You can change this by setting `Double tap window` in the double tap action to a different number.

**NOTE**: Setting `Double tap window` above or too close to `Hold time` can result in undesirable behavior, as the hold timer expires before the double tap timer does. If you increase the `Double tap window` you should also increase `Hold time` to not be too close to it by at least 100ms if not more. In a custom action without a hold action defined, you can set `Hold behavior` explicitly to `Nothing` to render the `Hold time` field.

## Miscellaneous

### CSS Styles

Styles can be set and changed for all remote sub-elements using regular CSS and templating. CSS styles have to be encapsulated in a CSS selector like the following.

| CSS Selector  | Element                       |
| ------------- | ----------------------------- |
| :host         | Global values.                |
| .row          | All rows.                     |
| .column       | All columns.                  |
| .button-pad   | All default button pads.      |
| .empty-button | All empty/null button spaces. |
| remote-button | All buttons.                  |
| #row-1        | The first row.                |
| #column-1     | The first column.             |
| #pad-1        | The first button default pad. |

```css
.row {
  justify-content: center;
}
remote-button {
  background: rgb(27, 27, 27);
  padding: 8px;
  margin: 4px;
  border-radius: 24px;
  --size: 24px;
}
```

If you hover over the card preview window, a red dashed outline will appear along with a tooltip showing either the element name or the row, column, or pad ID selector.

<img src="https://raw.githubusercontent.com/Nerwyn/android-tv-card/main/assets/editor_hover_id.png" alt="editor hover id" width="600"/>

### Autofill and Haptics

When creating custom actions, the card editor will autofill fields using information set in the general tab. This can be disabled by toggling `Autofill` off. This value can also be set at the custom remote element level. Haptics can be similarly toggled globally or for individual custom remote elements and are enabled by default.

### Other

You can add a title to the card with the title field.

Instead of copying the same custom actions across multiple remote cards, you can put custom actions in an array in a JSON or YAML file on your Home Assistant server's config www folder and fetch them by filename, like `local/remote_card_custom_actions.yaml`.

If you are updating from an older version of this card, you may find that your configurations no longer work. Sorry! To upgrade them, click the button `UPDATE OLD CONFIG` at the bottom of the general tab. It should update your configuration to work with newer versions of this card.

# Layout

<img src="https://raw.githubusercontent.com/Nerwyn/android-tv-card/main/assets/editor_layout_tab.png" alt="editor layout tab" width="600"/>

The remote layout is defined using a series of nested arrays. The lowest level of arrays is each row. As you nest arrays further it switches between rows and columns, allowing you to create unique remote layouts.

```yaml
- - home
  - menu
  - back
  - keyboard
- - - volume_buttons
    - momentary_light
  - - netflix
    - hulu
    - disney
    - max
    - primevideo
  - touchpad
  - slider
- - chandelier_light_color
  - light_color
  - sunroom_light
  - search
```

The default keys and sources lists for your selected platform are displayed below the layout code editor. If you have configured any custom actions, they will be displayed above this. You can use this as reference as you create your remote, or drag and drop entries from these lists to the editor. The default keys list also includes the default touchpad and slider, along with some special elements for button pads and layouts. Not all special elements are available for all platforms.

| Name               | Type        | Description                                                                                                                                                                                     |
| ------------------ | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| touchpad           | touchpad    | A touchpad for swipe navigation.                                                                                                                                                                |
| dragpad            | touchpad    | A touchpad for drag navigation. Use two fingers for faster movement.                                                                                                                            |
| mousepad           | touchpad    | A touchpad for mouse navigation. **NOTE**: mousepad support is dependent on the platform supporting mouse movement via a Home Assistant action.                                                 |
| slider             | slider      | A slider that controls the volume of the entity defined by `media_player_id`. **NOTE**: Volume slider support is dependent on the media player supporting the `media_player.volume_set` action. |
| volume_buttons     | button rows | Shorthand to generate a set of volume down, volume mute, and volume up buttons in a row or column.                                                                                              |
| navigation_buttons | button rows | Shorthand to generate a set of up, down, left, right, and center buttons across three rows within a column.                                                                                     |
| dpad               | button grid | Shorthand to generate a set of up, down, left, right, and center buttons arranged in a square grid.                                                                                             |
| numpad             | button grid | Shorthand to generate a set of 1-9 buttons arranged in a square grid. Does not include `n0`.                                                                                                    |
| xpad               | button grid | Shorthand to generate a set of A, B, X, and Y buttons arranged in a square grid.                                                                                                                |
| npad               | button grid | Shorthand to generate a set of A, B, X, and Y buttons arranged in an alternate square grid.                                                                                                     |

# Actions

<img src="https://raw.githubusercontent.com/Nerwyn/android-tv-card/main/assets/editor_actions_tab.png" alt="editor actions tab" width="600"/>

In addition to the default keys and sources, you can create your own custom actions. You can also overwrite default keys and sources (including the default touchpad and slider) by setting the custom action name to match a default one. If you do so the default key or source information will be autopopulated if autofill is enabled.

**NOTE**: If the remote element (default or custom) actions targets are not explicitly set in the UI they will be autofilled (if autofill is enabled) using the custom action entity or global IDs depending on which best matches the `perform-action` domain.

Click the `ADD REMOTE ELEMENT` button to add a custom action remote element. Custom action remote elements can be buttons, sliders, or touchpads.

Custom actions in this list can be reordered for organization, but doing so does not have any effect on the the remote card layout. They can also be deleted, copied, and edited.

## General Options

<img src="https://raw.githubusercontent.com/Nerwyn/android-tv-card/main/assets/editor_actions_general_options.png" alt="editor actions general options" width="600"/>

Every remote element must have a name so that it can be added to your remote.

Every remote element can have an entity assigned to it, which is used to track it's internal value. This value can then be used in styles and actions using templates, like `{{ value | float }}`. By default the value will be derived from the entity state, but it can be changed to an attribute using the corresponding field.

Some additional value logic is applied for certain attributes:

- `brightness` - Converted from the default range of 0-255 to 0-100.
- `media_position` - Updated twice per second using the current timestamp and the attribute `media_position_updated_at` when the entity state is `playing`, and locked to a max value using the attribute `media_duration`.
- `elapsed` - Only for timer entities. Updated twice per second using the the current timestamp and the attributes `duration`, `remaining`, and `finishes_at`, and locked to a max value using the attribute `duration`.
  - **NOTE**: `elapsed` is not an actual attribute of timer entities, but is a possible attribute for timer entities in this card for the purpose of displaying accurate timer elapsed values. Timer entities do have an attribute `remaining`, which only updates when the timer state changes. The actual `remaining` attribute can be calculated using the elapsed value and the timer duration attribute.

If you find that the autofilling of fields in actions or remote element values is causing issues, setting `Autofill` to false may help. Just remember to set the entity ID of the remote element and the entity, device, area, or label ID of the action target.

Haptics are enabled for remote elements by default, but can be toggled globally or at the custom action level.

### Slider General Options

<img src="https://raw.githubusercontent.com/Nerwyn/android-tv-card/main/assets/editor_actions_general_options_slider.png" alt="editor actions general options slider" width="600"/>

Sliders have some additional general options. They have a range `Min` and `Max` which defaults to 0 and 1 respectively. They also have a `Step` size which defaults to 0.01.

Sliders will wait one second before updating their internal values from Home Assistant to prevent it from bouncing between the old and new values. This time can be changed by setting `Update after action delay`, which defaults to 1000ms

### Touchpad Tabs

<img src="https://raw.githubusercontent.com/Nerwyn/android-tv-card/main/assets/editor_actions_general_options_touchpad.png" alt="editor actions general options touchpad" width="600"/>

Touchpads have five tabs at the top of their actions page for each direction and it's center. Only the center tab has general options as these apply to the entire touchpad remote element. Each direction and center have their own options for appearance and interactions as described below.

## Appearance

<img src="https://raw.githubusercontent.com/Nerwyn/android-tv-card/main/assets/editor_actions_appearance_options.png" alt="editor actions appearance options" width="600"/>

All remote elements can have a `Label`, `Icon`, and `Units`. These fields can also be set using templates. Similar to the general tab, each remote element can have it's CSS styles set (also supports templates).

You may find the following CSS selectors useful for styling:

| CSS Selector | Element                        |
| ------------ | ------------------------------ |
| :host        | The element itself.            |
| .icon        | The element icon.              |
| .label       | The element label.             |
| button       | A button element background.   |
| toucharea    | A touchpad element background. |
| input        | A slider element.              |
| .background  | A slider element background.   |
| .tooltip     | A slider element tooltip.      |
| .button-pad  | All button pads.               |

While you can now set most CSS fields directly using their sub-element selectors, you may find the following CSS properties useful, especially for sliders which use and modify them internally.

| Name                        | Description                                                                                                                                                                                                                                                                 |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| --size                      | Height and width of the icon.                                                                                                                                                                                                                                               |
| --thumb-width               | Slider thumb width, defaults to `48px`.                                                                                                                                                                                                                                     |
| --height                    | Slider height when horizontal and width when vertical.                                                                                                                                                                                                                      |
| --tooltip-label             | Slider tooltip label template, defaults to `'{{ value }}'`.                                                                                                                                                                                                                 |
| --tooltip-transform         | Slider tooltip location transform function, defaults to `translate(var(--thumb-offset), calc(-0.5 * var(--height) - 0.4em - 10px))` for horizontal sliders and `translate(calc(-0.3 * var(--height) - 0.8em - 18px), calc(-1 * var(--thumb-offset)))` for vertical sliders. |
| --icon-transform            | Slider icon transform function, defaults to `translateX(var(--thumb-offset))` for horizontal sliders and `translateY(calc(-1 * var(--thumb-offset)))` for vertical sliders.                                                                                                 |
| --ha-ripple-color           | Color of ripples when hovered over or pressed, defaults to `var(--secondary-text-color)`.                                                                                                                                                                                   |
| --ha-ripple-hover-color     | Color of ripples when hovered over, defaults to `var(--secondary-text-color)`.                                                                                                                                                                                              |
| --ha-ripple-pressed-color   | Color of riples when pressed, defaults to `var(--secondary-text-color)`.                                                                                                                                                                                                    |
| --ha-ripple-hover-opacity   | Opacity of ripples when hovered over, defaults to `0.08`.                                                                                                                                                                                                                   |
| --ha-ripple-pressed-opacity | Opacity of ripples when pressed, defaults to `0.12`.                                                                                                                                                                                                                        |
| --ha-ripple-height          | Ripple height, defaults to `100%`.                                                                                                                                                                                                                                          |
| --ha-ripple-width           | Ripple width, defaults to `100%`.                                                                                                                                                                                                                                           |
| --ha-ripple-top             | Ripple top offset, defaults to `0`.                                                                                                                                                                                                                                         |
| --ha-ripple-left            | Ripple left offset, defaults to `0`.                                                                                                                                                                                                                                        |

### Vertical Sliders

Sliders have an additional `Vertical` toggle which rotates it 90 degrees to make it vertical. By default sliders will be horizontal. Vertical slider heights are determined by the slider's sibling elements. If it has no sibling elements or you find that it is not consistently rendering correctly, then you may need to explicitly set it's height using the style options like so:

```css
:host {
  height: 350px;
}
```

### Multiple Icons and Labels for Touchpads

Touchpads can have a separate icon and label for the center and each direction. You can also style each of these icons and labels independently using their own `CSS Styles` fields. General touchpad styles such as those for `toucharea` like height should go in the center tab styles.

### A Note on Templating

Almost all fields support nunjucks templating. Nunjucks is a templating engine for JavaScript, which is heavily based on the jinja2 templating engine for Python which Home Assistant uses. While the syntax of nunjucks and jinja2 is almost identical, you may find the [nunjucks documentation](https://mozilla.github.io/nunjucks/templating.html) useful. Most extensions supported by Home Assistant templates are supported by this templating system, but not all and the syntax may vary. Please see the [ha-nunjucks](https://github.com/Nerwyn/ha-nunjucks) repository for a list of available extensions. If you want additional extensions to be added or have templating questions or bugs, please make an issue or discussion on that repository, not this one.

You can include the current value of a remote element and it's units by using the variables `value` and `unit` in a label template. You can also include `hold_secs` in a template if performing a momentary end action. Each remote element can also reference it's configuration using `config` within templates. `config.entity` and `config.attribute` will return the remote element's entity ID and attribute with their templates rendered (if they have them), and other templated config fields can be rendered within templates by wrapping them in the function `render` within a template. You can access the entire card config in a template via `config.card`, and global values such as remote ID within that like `config.card.remote_id`. Note that default values for some fields are not actually in the config and will not appear in templates, and you have to default to them using "or", like `config.card.platform or 'Android TV'`.

You can include touch location information in your templates using the values `initialX`, `initialY`, `currentX`, `currentY`, `deltaX`, and `deltaY` This is especially useful when using drag interactions on the touchpad, like with the Unified Remote default mousepad or as a dragpad on all platforms.

## Interactions

There are three traditional ways to trigger an action - tap, double tap, and hold. Buttons, touchpad center support all three, touchpad swipes only support tap and hold actions, and sliders only support tap actions. Defining a double tap action that is not `none` introduces a 200ms delay to single tap actions.

<img src="https://raw.githubusercontent.com/Nerwyn/android-tv-card/main/assets/editor_actions_interactions.png" alt="editor actions interactions" width="600"/>

Each action also supports the `confirmation` field. More information on Home Assistant action confirmations can be found [here](https://www.home-assistant.io/dashboards/actions/#options-for-confirmation).

When setting the action for a slider, you must use `value` within a template in the action data to use the feature value in action. For convenience, a codebox for the action will be displayed below the normal action options.

<img src="https://raw.githubusercontent.com/Nerwyn/android-tv-card/main/assets/editor_actions_interactions_slider.png" alt="editor actions interactions slider" width="600"/>

### Action Types

Actions follow the [Home Assistant actions](https://www.home-assistant.io/dashboards/actions/) syntax. All Home Assistant actions are supported along with some additional ones.

| Action         | Description                                                                                                                                                                                                                             |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| More info      | Open the more info dialog.                                                                                                                                                                                                              |
| Toggle         | Toggle between the target's on and off (or similar) states.                                                                                                                                                                             |
| Navigate       | Navigate to another Home Assistant page.                                                                                                                                                                                                |
| URL            | Navigate to an external URL.                                                                                                                                                                                                            |
| Perform action | Call any Home Assistant service action.                                                                                                                                                                                                 |
| Assist         | Open the assist dialog. Uses the mobile dialog if available, like in the Home Assistant app. The pipeline ID and start listening options only work in the mobile assist dialog.                                                         |
| Key            | Send a key to the media platform via the action `remote.send_command`. If no hold action is defined, then `hold_secs: 1` is added when a hold action is fired.                                                                          |
| Source         | Open a source via the action `remote.turn_on`.                                                                                                                                                                                          |
| Keyboard       | Open a dialog for sending seamless keyboard input.                                                                                                                                                                                      |
| Textbox        | Open a dialog for sending bulk keyboard input.                                                                                                                                                                                          |
| Search         | Open a dialog for sending a global search query.                                                                                                                                                                                        |
| Fire DOM event | Fire a browser dom event using the action object as the event detail. Useful for opening [browser mod popup cards](https://github.com/thomasloven/hass-browser_mod?tab=readme-ov-file#how-do-i-update-a-popup-from-the-browser-mod-15). |
| Repeat         | Repeat the tap action ten times a second while held. Only applicable to hold.                                                                                                                                                           |
| Nothing        | Explicilty set a command to do nothing.                                                                                                                                                                                                 |

### Key and Source

`Key` and `Source` are shortcuts for `perform-action` actions and vary by platform. Read the Home Assistant documentation as linked above [in this table](#media-platform-and-entity-ids) for more information on the actions performed by each platform. You can also look at the default key and source map files [here](https://github.com/Nerwyn/android-tv-card/tree/main/src/models/maps). They will use the general remote or media player ID if set but can be overridden at the custom action level.

For Android TV you may find the [Android TV deep linking guide helpful](https://community.home-assistant.io/t/android-tv-remote-app-links-deep-linking-guide/567921).

If you find keys or sources that are not part of the default lists that you wish to add, please make a feature or even a pull request to add them, especially if they are for a platform other than Android TV (Android TV default list improvements also welcome).

While most default keys use the `key` action, some actions require more information and call the actions directly.

### Momentary Mode

<img src="https://raw.githubusercontent.com/Nerwyn/android-tv-card/main/assets/editor_actions_interactions_momentary.png" alt="editor actions interactions momentary" width="600"/>

As an alternative to normal tap, hold, and double tap actions, buttons and the touchpad center can also be used in a momentary mode. Configuring this option disables the normal tap, hold, and double tap actions.

The momentary start action is fired when you first press down on a button or touchpad. The momentary end action is fired when you release the button or touchpad. These actions can be used together or separately.

For momentary end actions you can include the number of seconds a button has been held down using `hold_secs` in a template. For convenience, the momentary end action YAML is included in a code box below the action, like shown above.

### Touchpad Actions

<img src="https://raw.githubusercontent.com/Nerwyn/android-tv-card/main/assets/editor_actions_interactions_touchpad.png" alt="editor actions interactions touchpad" width="600"/>

The touchpad's center acts like a button, with support for the same actions. The touchpad's direction actions are activated when the user swipes in a direction, and do not support double tap actions or momentary mode.

Touchpads also support multi-touch mode, which fires alternate actions when more than one finger is used with it. This mode is disabled by default but can be enabled by setting a touchpad's multi-touch actions to something other than `Nothing`. Multi-touch mode supports center tap, double tap, and hold actions, and direction swipe and hold actions.

Touchpads also support an alternate drag mode. This action is called whenever movement is detected on the touchpad, and works best with mouse movement actions like Unified Remote's `Relmtech.Basic Input delta`. The touchpad X and Y movement can be added to actions using templates using `deltaX` and `deltaY`. Because this action fires every time movement is detected on the touchpad, you may find that it fires too often, or not often enough. You can either use math to modify the values of `deltaX` and `deltaY` within the action data templates, or introduce a delay in which movement will be ignored after a drag action is fired using the configuration UI option `Sampling delay` to tweak the speed of your drag movements and action fire rate. The drag action can also be used in multi-touch mode. Enabling this action disables directional actions.

### Keyboard, Textbox, and Search

This card supports sending text to the following platforms:

- Android TV
- Sony BRAVIA
- Fire TV
- Roku
- LG webOS
- Kodi
- Unified Remote (PC, Mac, Linux)

If the user defined general platform is listed above, then any action set to a keyboard action (that has autofill enabled) will inherit it. Otherwise it will default to `Android TV`. Keyboard support for more platforms can be added if there is a way to do so through their Home Assistant (or community made) integrations.

When you use any keyboard action, a dialog will open that can be typed into.

<img src="https://raw.githubusercontent.com/Nerwyn/android-tv-card/main/assets/keyboard_dialog.png" alt="keyboard dialog" width="300"/>

You can change the prompt text that appears before you type anything using the `Prompt` field at the action level.

<img src="https://raw.githubusercontent.com/Nerwyn/android-tv-card/main/assets/editor_actions_interactions_keyboard_prompt.png" alt="editor actions interactions keyboard prompt" width="600"/>

<img src="https://raw.githubusercontent.com/Nerwyn/android-tv-card/main/assets/keyboard_dialog_custom_prompt.png" alt="keyboard dialog custom prompt" width="600"/>

For Android TV you need to include the Android TV Remote integration remote entity ID at the general or action level as it is used to send the keys enter and delete (backspace).

For Roku make sure to include both the remote and media player IDs at the general or action level, as the remote is used for normal keyboard entry while the media player is used for search.

#### Keyboard - Seamless Text Entry

Send text to your supported media platform seamlessly using the action or default key `keyboard`. The dialog has several listeners which will send anything you type to your media platform immediately.

Because we do not have a way to retrieve the currently on screen text of most media platforms, the dialog and platform text may become out of sync if a message gets dropped due to a network issue, you attempt to erase more than one character at a time, you try to modify the middle of the entered text, or if you prematurely close the dialog window. The keyboard dialog will attempt to prevent you from doing things that would cause this, but please remember that if you make a mistake you have to backspace all the way to the incorrect character from the end of your input text one character at at a time. In my testing the dialog always kept in sync with the platform text unless I attempted to delete more than one character. This does not apply to Kodi or LG webOS, whose text entry methods replace the on screen text when called instead of appending/inserting.

ADB can be slow and you may notice some delay in what you type and what appears on your Android TV, Sony BRAVIA, or Fire TV device. Make sure to use the newer ADB integration remote entity for a faster typing experience.

#### Textbox - Bulk Text Entry

Send text to your supported media platform in bulk using the action or default button `textbox`. The dialog will not send any information until you tap the send button. It is highly recommended that you also create buttons for delete and enter so you can easily delete the text you send and quickly search using it.

#### Search - Global Search

Not supported by the platforms LG webOS or Unified Remote.

Send a global search query to your media platform using the action or default button `search`. Like the bulk entry method, the dialog will not send any information until you tap the search button. This method cannot be used to enter text into currently visible text fields.

## Icons

<img src="https://raw.githubusercontent.com/Nerwyn/android-tv-card/main/assets/editor_icons.png" alt="editor icons" width="600"/>

You can add custom SVG path icons to use with this card using the icons tab. The custom icons list works the same as the custom actions list, except that there is only one type of custom icon you can add.

<img src="https://raw.githubusercontent.com/Nerwyn/android-tv-card/main/assets/editor_icons_editor.png" alt="editor icons editor" width="600"/>

Each custom icon has to have a name and a SVG path. The SVG path must generate a 24x24 pixel icon to properly render in the remote. A preview of the icon is shown below the path. I highly recommend using a tool like [this SVG path editor](https://yqnn.github.io/svg-path-editor/) to modify SVG paths to work with this card.

Once setup, you can reference these icons in custom actions in the icon field by name. Many default sources similarly use SVG paths instead of the Home Assistant built in icons. If you have an SVG icon you wish to add to this project, you can create a feature or pull request to do so.

# YAML Examples

While all configuration can now be done through the user interface, these YAML examples can provide some insight on layout basics.

## Example 1

Playing with order, moving and repeating buttons.

<img src="https://raw.githubusercontent.com/Nerwyn/android-tv-card/main/assets/disorder.png" alt="disorder example" width="300"/>

<details>

<summary>Remote Config</summary>

```yaml
type: custom:android-tv-card
remote_id: remote.google_chromecast
media_player_id: media_player.google_chromecast
title: Example 1
rows:
  - - power
  - - back
    - home
    - tv
    - netflix
  - - youtube
    - spotify
    - netflix
  - - touchpad
  - - slider
  - - channel_up
    - channel_down
    - info
  - - rewind
    - play
    - spotify
    - pause
    - fast_forward
```

</details>

## Example 2

Buttons, buttons everywhere!

<img src="https://raw.githubusercontent.com/Nerwyn/android-tv-card/main/assets/buttons_everywhere.png" alt="buttons example" width="300"/>

<details>

<summary>Remote Config</summary>

```yaml
type: custom:android-tv-card
remote_id: remote.google_chromecast
title: Example 2
rows:
  - - power
    - channel_up
    - info
    - channel_down
  - - netflix
    - youtube
    - spotify
  - - volume_buttons
  - - dpad
  - - back
    - home
    - tv
  - - rewind
    - play
    - pause
    - fast_forward
```

</details>

## Example 3

Using less and a vertical slider.

<img src="https://raw.githubusercontent.com/Nerwyn/android-tv-card/main/assets/using_less.png" alt="less example" width="300"/>

<details>

<summary>Remote Config</summary>

```yaml
type: custom:android-tv-card
remote_id: remote.google_chromecast
media_player_id: media_player.google_chromecast
title: Example 3
rows:
  - - power
    - netflix
    - youtube
    - spotify
  - - touchpad
    - slider
  - - back
    - home
custom_actions:
  - type: slider
    name: slider
    range:
      - 0
      - 1
    step: 0.01
    value_attribute: volume_level
    tap_action:
      action: perform-action
      perform_action: media_player.volume_set
      data:
        volume_level: '{{ value | float }}'
    vertical: true
    icon: mdi:volume-high
```

</details>

## Example 4

In any row, if you add a `null` item, there will be an empty button sized space.

<img src="https://raw.githubusercontent.com/Nerwyn/android-tv-card/main/assets/empty_buttons.png" alt="empty buttons example" width="300"/>

<details>

<summary>Remote Config</summary>

```yaml
type: custom:android-tv-card
rows:
  - - back
    - home
    - tv
  - - rewind
    - null
    - null
    - fast_forward
```

</details>

## Example 5

A tablet layout using nested rows and columns.

<img src="https://raw.githubusercontent.com/Nerwyn/android-tv-card/main/assets/tablet.png" alt="tablet example" width="800"/>

<details>

<summary>Remote Config</summary>

```yaml
type: custom:android-tv-card
remote_id: remote.google_chromecast
rows:
  - - - - back
        - null
        - home
        - null
        - menu
      - - volume_down
        - null
        - volume_mute
        - null
        - volume_up
      - - rewind
        - null
        - play_pause
        - null
        - fast_forward
      - - netflix
        - disney
        - hulu
        - max
        - primevideo
      - - plex
        - vudu
        - youtube
        - spotify
    - - - keyboard
        - search
      - - touchpad
custom_actions:
  - type: touchpad # All of this except styles will be autofilled
    name: touchpad # when you create a custom touchpad with the name touchpad
    tap_action:
      action: key
      key: DPAD_CENTER
    up:
      tap_action:
        action: key
        key: DPAD_UP
      hold_action:
        action: repeat
    down:
      tap_action:
        action: key
        key: DPAD_DOWN
      hold_action:
        action: repeat
    left:
      tap_action:
        action: key
        key: DPAD_LEFT
      hold_action:
        action: repeat
    right:
      tap_action:
        action: key
        key: DPAD_RIGHT
      hold_action:
        action: repeat
    styles: |-
      toucharea {
        height: 300px;
      }
```

</details>

## Example 6

Combining Apple TVs `wakeup` and `suspend` keys into one custom power action and using an icon for the touchpad background.

<img src="https://raw.githubusercontent.com/Nerwyn/android-tv-card/main/assets/apple_tv.png" alt="apple tv example" width="400"/>

<details>

<summary>Remote Config</summary>

```yaml
type: custom:android-tv-card
remote_id: remote.apple_tv
platform: Apple TV
autofill_entity_id: true
rows:
  - - power
    - menu
    - home
  - - skip_backward
    - play
    - pause
    - skip_forward
  - - touchpad
  - - appletv
    - netflix
    - disney
    - primevideo
    - allente
  - - nrktv
    - tv2play
    - max
    - skyshowtime
    - plex
  - - viaplay
    - discovery
    - spotify
    - youtube
custom_actions:
  - type: button
    name: power
    tap_action:
      action: key
      key: wakeup
    icon: mdi:power
    hold_action:
      action: key
      key: suspend
  - type: touchpad
    name: touchpad
    tap_action:
      action: key
      key: select
    up:
      tap_action:
        action: key
        key: up
      hold_action:
        action: repeat
    down:
      tap_action:
        action: key
        key: down
      hold_action:
        action: repeat
    left:
      tap_action:
        action: key
        key: up
      hold_action:
        action: repeat
    right:
      tap_action:
        action: key
        key: right
      hold_action:
        action: repeat
    styles: |-
      .icon {
        --size: 250px;
      }
    double_tap_action:
      action: key
      key: menu
    icon: mdi:apple
```

</details>

## Example 7

A user's Kodi remote.

<img src="https://raw.githubusercontent.com/Nerwyn/android-tv-card/main/assets/kodi.png" alt="kodi example" width="400"/>

<details>

<summary>Remote Config</summary>

```yaml
type: custom:android-tv-card
keyboard_id: media_player.kodi
media_player_id: media_player.kodi
platform: Kodi
rows:
  - - back
    - home
    - menu
  - - info
    - osd
    - play_pause
  - - - volume_buttons
    - touchpad
    - - keyboard
      - null
      - search
custom_actions:
  - type: touchpad
    name: touchpad
    tap_action:
      action: key
      key: Input.Select
    up:
      tap_action:
        action: key
        key: Input.Up
      hold_action:
        action: repeat
      styles: ''
    down:
      tap_action:
        action: key
        key: Input.Down
      hold_action:
        action: repeat
    left:
      tap_action:
        action: key
        key: Input.Left
      hold_action:
        action: repeat
    right:
      tap_action:
        action: key
        key: Input.Right
      hold_action:
        action: repeat
    styles: |-
      toucharea {
        height: 200px;
        background-image: url("https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Kodi-logo-Thumbnail-light-transparent.png/600px-Kodi-logo-Thumbnail-light-transparent.png?20141126003611");
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        opacity: 1.0;;
      }
```

</details>

## Example 8

A touchpad remapped to work with a [Denon/Marantz Receiver](https://www.home-assistant.io/integrations/denonavr).

<details>

<summary>Remote Config</summary>

```yaml
type: custom:android-tv-card
media_player_id: media_player.marantz_sr7013
autofill_entity_id: true
rows:
  - - touchpad
custom_actions:
  - type: touchpad
    name: touchpad
    tap_action:
      action: perform-action
      perform_action: denonavr.get_command
      data:
        command: /goform/formiPhoneAppDirect.xml?MNENT
    up:
      tap_action:
        action: perform-action
        perform_action: denonavr.get_command
        data:
          command: /goform/formiPhoneAppDirect.xml?MNCUP
      hold_action:
        action: repeat
    down:
      tap_action:
        action: perform-action
        perform_action: denonavr.get_command
        data:
          command: /goform/formiPhoneAppDirect.xml?MNCDN
      hold_action:
        action: repeat
    left:
      tap_action:
        action: perform-action
        perform_action: denonavr.get_command
        data:
          command: /goform/formiPhoneAppDirect.xml?MNCLT
      hold_action:
        action: repeat
    right:
      tap_action:
        action: perform-action
        perform_action: denonavr.get_command
        data:
          command: /goform/formiPhoneAppDirect.xml?MNCRT
      hold_action:
        action: repeat
    styles: |-
      toucharea {
        height: 200px;
      }
    double_tap_action:
      action: perform-action
      perform_action: denonavr.get_command
      data:
        command: /goform/formiPhoneAppDirect.xml?MNRTN
```

</details>

## Example 9

Even more disorder with columns and special elements in the same row as buttons, stylized everything, and a label to display the slider value.

<img src="https://raw.githubusercontent.com/Nerwyn/android-tv-card/main/assets/more_disorder.png" alt="more disorder example" width="500"/>

<details>

<summary>Remote Config</summary>

```yaml
type: custom:android-tv-card
remote_id: remote.google_chromecast
media_player_id: media_player.google_chromecast
rows:
  - - - home
      - menu
      - back
      - keyboard
    - - netflix
      - hulu
      - disney
      - max
      - primevideo
    - touchpad
  - - slider
    - search
custom_actions:
  - type: button
    name: netflix
    tap_action:
      action: source
      source: netflix://
    icon: mdi:netflix
    styles: |-
      :host {
        --icon-color: rgb(229, 9, 20);
      }
  - type: button
    name: hulu
    tap_action:
      action: source
      source: hulu://
    icon: mdi:hulu
    styles: |-
      :host {
        --icon-color: rgb(28, 231, 131);
      }
  - type: button
    name: disney
    tap_action:
      action: source
      source: https://www.disneyplus.com
    icon: disney
    styles: |-
      :host {
        --icon-color: rgb(17, 60, 207);
      }
  - type: button
    name: max
    tap_action:
      action: source
      source: market://launch?id=com.wbd.stream
    icon: max
    styles: |-
      :host {
        --icon-color: rgb(0, 35, 246);
      }
  - type: button
    name: primevideo
    tap_action:
      action: source
      source: https://app.primevideo.com
    icon: primevideo
    styles: |-
      :host {
        --icon-color: rgb(0, 165, 222);
      }
  - type: slider
    name: slider
    range:
      - 0
      - 0.6
    step: 0.01
    value_attribute: volume_level
    tap_action:
      action: perform-action
      perform_action: media_player.volume_set
      data:
        volume_level: '{{ value | float }}'
    styles: |-
      :host {
        height: 24px;
        border-radius: 4px;
        --background-height: 12px;
        --color: darkred;
        --background: red;
        --thumb-border-radius: 0;
      }
      .icon {
        display: none;
      }
      .label {
        {% if not states(config.entity, 'on') %}
        display: none;
        {% endif %}
        transform: var(--icon-transform);
        font-size: 14px;
        font-weight: 1000;
        color: var(--primary-text-color);
      }
      .tooltip {
        display: none;
      }
    label: '{{ (value * 100 ) | int }}%'
  - type: touchpad
    name: touchpad
    tap_action:
      action: key
      key: DPAD_CENTER
    up:
      tap_action:
        action: key
        key: DPAD_UP
      hold_action:
        action: repeat
    down:
      tap_action:
        action: key
        key: DPAD_DOWN
      hold_action:
        action: repeat
    left:
      tap_action:
        action: key
        key: DPAD_LEFT
      hold_action:
        action: repeat
    right:
      tap_action:
        action: key
        key: DPAD_RIGHT
      hold_action:
        action: repeat
    styles: |-
      toucharea {
        background: linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%), linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%), linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%);
      }
```

</details>

## Example 10

A simple gamepad with a custom button grid

<img src="https://raw.githubusercontent.com/Nerwyn/android-tv-card/main/assets/gamepad.png" alt="gamepad example" width="500"/>

<details>

<summary>Remote Config</summary>

```yaml
ttype: custom:android-tv-card
remote_id: remote.google_chromecast
rows:
  - - - null
      - up
      - null
      - left
      - null
      - right
      - null
      - down
      - null
    - xpad
custom_actions:
  - type: button
    name: a
    tap_action:
      action: key
      key: BUTTON_A
    icon: mdi:alpha-a-circle
    styles: |-
      :host {
        padding: 0;
        margin: 0;
        --size: 48px;
        --icon-color: #C1121C;
      }
  - type: button
    name: b
    tap_action:
      action: key
      key: BUTTON_B
    icon: mdi:alpha-b-circle
    styles: |-
      :host {
        padding: 0;
        margin: 0;
        --size: 48px;
        --icon-color: #F7BA0B;
      }
  - type: button
    name: x
    tap_action:
      action: key
      key: BUTTON_X
    icon: mdi:alpha-x-circle
    styles: |-
      :host {
        padding: 0;
        margin: 0;
        --size: 48px;
        --icon-color: #00387b;
      }
  - type: button
    name: 'y'
    tap_action:
      action: key
      key: BUTTON_Y
    icon: mdi:alpha-y-circle
    styles: |-
      :host {
        padding: 0;
        margin: 0;
        --size: 48px;
        --icon-color: #007243;
      }
styles: |-
  remote-button {
    background: rgb(27,27,27);
    padding: 8px;
    margin: 4px;
    border-radius: 24px;
    --size: 24px;
  }
  .row {
    justify-content: center;
  }
  #column-1 {
    display: grid;
    direction: ltr;
    grid-template-rows: repeat(3, var(--size, 48px));
    grid-template-columns: repeat(3, var(--size, 48px));
    grid-gap: 8px 16px;
    padding: 0;
    flex: 0;
    background: rgb(27,27,27);
    border-radius: 128px;
  }
haptics: false
```

</details>

## Example 11

Conditional layouts using templating and an input select.

<img src="https://raw.githubusercontent.com/Nerwyn/android-tv-card/main/assets/conditional_layouts.png" alt="conditional layouts example" width="500"/>

<details>

<summary>Remote Config</summary>

```yaml
type: custom:android-tv-card
remote_id: remote.google_tv
media_player_id: media_player.google_tv
rows:
  - - next_thing
  - |
    {% if is_state("input_select.select_test", "A") %}
    - touchpad
    - - slider
    {% elif is_state("input_select.select_test", "B") %}
    - dpad
    - - volume_buttons
    {% elif is_state("input_select.select_test", "C") %}
    - numpad
    {% endif %}
custom_actions:
  - icon: mdi:skip-next-circle
    name: next_thing
    tap_action:
      data:
        cycle: true
      target:
        entity_id: input_select.select_test
      action: perform-action
      perform_action: input_select.select_next
    type: button
    entity_id: input_select.select_test
```

</details>

## Example 12

RGB Remote using Broadlink RM4 Pro.

<img src="https://raw.githubusercontent.com/Nerwyn/android-tv-card/main/assets/rgb.png" alt="rgb remote example" width="500"/>

<details>

<summary>Remote Config</summary>

```yaml
type: custom:android-tv-card
remote_id: remote.rm4_pro
title: TV RGB
rows:
  - - power
    - null
    - poweroff
  - - up
    - null
    - down
  - - 1
    - 2
    - 3
  - - 4
    - 5
    - 6
  - - 7
    - 8
    - 9
  - - 10
    - 11
    - 12
custom_actions:
  - icon: mdi:circle
    tap_action:
      action: perform-action
      perform_action: remote.send_command
      data:
        device: Office TV Led
        command: red
    name: '1'
    type: button
    styles: |-
      :host {
        --size: 42px;
        --icon-color: red;
      }
  - icon: mdi:circle
    tap_action:
      action: perform-action
      perform_action: remote.send_command
      data:
        device: Office TV Led
        command: green
    name: '2'
    type: button
    styles: |-
      :host {
        --size: 42px;
        --icon-color: green;;
      }
  - icon: mdi:circle
    tap_action:
      action: perform-action
      perform_action: remote.send_command
      data:
        device: Office TV Led
        command: dark_blue
    name: '3'
    type: button
    styles: |-
      :host {
        --size: 42px;
        --icon-color: darkblue;;
      }
  - icon: mdi:circle
    tap_action:
      action: perform-action
      perform_action: remote.send_command
      data:
        device: Office TV Led
        command: yellow
    name: '4'
    type: button
    styles: |-
      :host {
        --size: 42px;
        --icon-color: yellow;;
      }
  - icon: mdi:circle
    tap_action:
      action: perform-action
      perform_action: remote.send_command
      data:
        device: Office TV Led
        command: yellow-orange
    name: '5'
    type: button
    styles: |-
      :host {
        --size: 42px;
        --icon-color: goldenrod;;
      }
  - icon: mdi:circle
    tap_action:
      action: perform-action
      perform_action: remote.send_command
      data:
        device: Office TV Led
        command: orange
    name: '6'
    type: button
    styles: |-
      :host {
        --size: 42px;
        --icon-color: orange;;
      }
  - icon: mdi:circle
    tap_action:
      action: perform-action
      perform_action: remote.send_command
      data:
        device: Office TV Led
        command: orange-light
    name: '7'
    type: button
    styles: |-
      :host {
        --size: 42px;
        --icon-color: lightsalmon;;
      }
  - icon: mdi:circle
    tap_action:
      action: perform-action
      perform_action: remote.send_command
      data:
        device: Office TV Led
        command: cyan
    name: '8'
    type: button
    styles: |-
      :host {
        --size: 42px;
        --icon-color: cyan;;
      }
  - icon: mdi:circle
    tap_action:
      action: perform-action
      perform_action: remote.send_command
      data:
        device: Office TV Led
        command: blue
    name: '9'
    type: button
    styles: |-
      :host {
        --size: 42px;
        --icon-color: blue;;
      }
  - icon: mdi:circle
    tap_action:
      action: perform-action
      perform_action: remote.send_command
      data:
        device: Office TV Led
        command: pink
    name: '10'
    type: button
    styles: |-
      :host {
        --size: 42px;
        --icon-color: magenta;;
      }
  - icon: mdi:circle
    tap_action:
      action: perform-action
      perform_action: remote.send_command
      data:
        device: Office TV Led
        command: green_light
    name: '11'
    type: button
    styles: |-
      :host {
        --size: 42px;
        --icon-color: mediumseagreen;;
      }
  - icon: mdi:circle
    tap_action:
      action: perform-action
      perform_action: remote.send_command
      data:
        device: Office TV Led
        command: white
    name: '12'
    type: button
    styles: |-
      :host {
        --size: 42px;
        --icon-color: white;;
      }
  - type: button
    name: power
    tap_action:
      action: perform-action
      perform_action: remote.send_command
      data:
        device: Office TV Led
        command: 'on'
    icon: mdi:power
    styles: |-
      :host {
        --icon-color: green;
      }
  - icon: mdi:power
    tap_action:
      action: perform-action
      perform_action: remote.send_command
      data:
        device: Office TV Led
        command: 'off'
    name: poweroff
    type: button
    styles: |-
      :host {
        --icon-color: red;
      }
  - type: button
    name: up
    tap_action:
      action: perform-action
      perform_action: remote.send_command
      data:
        device: Office TV Led
        command: brightness+
    hold_action:
      action: repeat
    icon: mdi:chevron-up
  - type: button
    name: down
    tap_action:
      action: perform-action
      perform_action: remote.send_command
      data:
        device: Office TV Led
        command: brightness-
    hold_action:
      action: repeat
    icon: mdi:chevron-down
```

</details>

## Example 13

Style `dpad` to be like the Google TV app remote. **NOTE**: You have to add the provided overall styles including matching the row number. You can find the CSS IDs of your navigation button rows by hovering over the remote in the editor as described [in this section](#css-styles).

<img src="https://raw.githubusercontent.com/Nerwyn/android-tv-card/main/assets/google_tv_dpad.png" alt="google tv app styled dpad" width="500"/>

<details>

<summary>Remote Config</summary>

```yaml
type: custom:android-tv-card
rows:
  - - dpad
custom_actions:
  - type: button
    name: center
    tap_action:
      action: key
      key: DPAD_CENTER
    icon: ''
    styles: |-
      :host {
        border-radius: 50%;
        z-index: 2;
        pointer-events: none;
        width: 200px;
        height: 200px;
        top: -75px;
        left: -75px;
      }
      button {
        height: 80%;
        width: 80%;
        border-radius: 50%;
        background: rgb(94, 94, 94);
        pointer-events: all;
      }
  - type: button
    name: up
    tap_action:
      action: key
      key: DPAD_UP
    hold_action:
      action: repeat
    icon: mdi:chevron-up
    styles: |-
      button {
        top: 10%;
        left: 10%;
        border-radius: 0;
      }
      .icon {
        transform: rotate(-45deg);
        color: rgb(197, 199, 197);
      }
  - type: button
    name: down
    tap_action:
      action: key
      key: DPAD_DOWN
    hold_action:
      action: repeat
    icon: mdi:chevron-down
    styles: |-
      button {
        bottom: 10%;
        right: 10%;
        border-radius: 0;
      }
      .icon {
        transform: rotate(-45deg);
        color: rgb(197, 199, 197);
      }
  - type: button
    name: left
    tap_action:
      action: key
      key: DPAD_LEFT
    hold_action:
      action: repeat
    icon: mdi:chevron-left
    styles: |-
      button {
        bottom: 10%;
        left: 10%;
        border-radius: 0;
      }
      .icon {
        transform: rotate(-45deg);
        color: rgb(197, 199, 197);
      }
  - type: button
    name: right
    tap_action:
      action: key
      key: DPAD_RIGHT
    hold_action:
      action: repeat
    icon: mdi:chevron-right
    styles: |-
      button {
        top: 10%;
        right: 10%;
        border-radius: 0;
      }
      .icon {
        transform: rotate(-45deg);
        color: rgb(197, 199, 197);
      }
styles: |-
  .button-pad {
    gap: 98px;
    border-radius: 50%;
    overflow: hidden;
    background: rgb(31, 31, 31);
  }
  .button-pad .empty-button {
    width: 0;
    height: 0;
  }
  .button-pad remote-button {
    top: -125%;
    left: -125%;
    width: 170px;
    height: 170px;
    transform: rotate(45deg);
    z-index: 1;
  }
  #row-1 {
    width: fit-content;
  }
custom_icons: []
```

</details>

## Example 14

Style `dpad` to be like a traditional tv remote. **NOTE**: You have to add the provided overall styles.

<img src="https://raw.githubusercontent.com/Nerwyn/android-tv-card/main/assets/traditional_dpad.png" alt="traditional remote styled dpad" width="500"/>

<details>

<summary>Remote Config</summary>

```yaml
type: custom:android-tv-card
rows:
  - dpad
custom_actions:
  - type: button
    name: center
    tap_action:
      action: key
      key: DPAD_CENTER
    icon: ok
    styles: |-
      :host {
        --size: 36px;
        top: -30%;
        left: -30%;
        width: 160%;
        height: 160%;
        border: 1px solid rgba(0,0,0,0.5);
        border-radius: 50%;
        transform: rotate(0deg);
        background: radial-gradient(circle at top left,#303030 15%,#101010 100%);
        z-index: 2;
      }
      .icon {
        color:rgba(128,128,128,0.8);
      }
  - type: button
    name: up
    tap_action:
      action: key
      key: DPAD_UP
    hold_action:
      action: repeat
    icon: mdi:chevron-up
    styles: |-
      .icon {
        transform:rotate(-45deg);
        color: rgba(96,96,96,0.8);
      }
      button {
        border-radius: 0;
      }
  - type: button
    name: down
    tap_action:
      action: key
      key: DPAD_DOWN
    hold_action:
      action: repeat
    icon: mdi:chevron-down
    styles: |-
      .icon {
        transform:rotate(-45deg);
        color: rgba(96,96,96,0.8);
      }
      button {
        border-radius: 0;
      }
  - type: button
    name: left
    tap_action:
      action: key
      key: DPAD_LEFT
    hold_action:
      action: repeat
    icon: mdi:chevron-left
    styles: |-
      .icon {
        transform:rotate(-45deg);
        color: rgba(96,96,96,0.8);
      }
      button {
        border-radius: 0;
      }
  - type: button
    name: right
    tap_action:
      action: key
      key: DPAD_RIGHT
    hold_action:
      action: repeat
    icon: mdi:chevron-right
    styles: |-
      .icon {
        transform:rotate(-45deg);
        color: rgba(96,96,96,0.8);
      }
      button {
        border-radius: 0;
      }
styles: |-
  .button-pad {
    gap: 14px;
    border: 1px solid #444;
    border-radius: 50%;
    overflow: hidden;
    background: radial-gradient(circle at top left,#202020 15%,#303030 100%);
  }
  .button-pad .empty-button {
    width: 0;
    height: 0;
  }
  .button-pad remote-button {
    top: -40%;
    left: -40%;
    width: 180%;
    height: 180%;
    transform: rotate(45deg);
    overflow: hidden;
    border-radius: 0;
  }
custom_icons:
  - name: ok
    path: >-
      M7 7A2 2 0 005 9V15A2 2 0 007 17H9A2 2 0 0011 15V9A2 2 0 009 7H7M7
      9H9V15H7V9ZM13 7V17H15V13.7L17 17H19L16 12 19 7H17L15 10.3V7H13Z
```

</details>

## Example 15

A music player with multiple sliders for volume and media position and a touchpad for media controls and album art.

<img src="https://raw.githubusercontent.com/Nerwyn/android-tv-card/main/assets/music_controls.png" alt="music controls" width="500"/>

<details>

<summary>Remote Config</summary>

```yaml
type: custom:android-tv-card
media_player_id: media_player.spotify
rows:
  - - touchpad
    - volume
  - - media_position
custom_actions:
  - type: slider
    name: volume
    value_attribute: volume_level
    tap_action:
      action: perform-action
      perform_action: media_player.volume_set
      data:
        volume_level: '{{ value | float }}'
    icon: mdi:spotify
    vertical: true
    styles: |-
      :host {
        --tooltip-label: "{{ (100 * value) | int }}%";
      }
    haptics: true
  - type: slider
    name: media_position
    value_attribute: media_position
    range:
      - 0
      - '{{ state_attr(config.entity, "media_duration") }}'
    tap_action:
      action: perform-action
      perform_action: media_player.media_seek
      data:
        seek_position: '{{ value }}'
    step: 1
    styles: |-
      :host {
        --thumb-width: 5px;
        --tooltip-label: '{{ (value / 60) | int }}:{{ 0 if (value - 60*((value / 60) | int)) < 10 else "" }}{{ (value - 60*((value / 60) | int)) | int }}';
        height: 14px;
      }
      .label {
        filter: invert(1);
        mix-blend-mode: difference;
      }
    label: |2-
        {% set minutes = (value / 60) | int %} {% set seconds = (value - 60 * minutes)
        | int %} {{ minutes }}:{{ 0 if seconds < 10 else "" }}{{ seconds | int }}/{{ (state_attr(config.entity, "media_duration") / 60) | int }}:{{ 0 if
        (state_attr(config.entity, "media_duration") - 60*((state_attr(config.entity,
        "media_duration") / 60) | int)) < 10 else "" }}{{ (state_attr(config.entity,
        "media_duration") - 60*((state_attr(config.entity, "media_duration") / 60) |
        int)) | int }}
  - type: touchpad
    name: touchpad
    tap_action:
      action: perform-action
      perform_action: media_player.media_play_pause
    up:
      tap_action:
        action: none
      hold_action:
        action: none
    down:
      tap_action:
        action: none
      hold_action:
        action: none
    left:
      tap_action:
        action: perform-action
        perform_action: media_player.media_next_track
      hold_action:
        action: none
      icon: mdi:skip-previous
    right:
      tap_action:
        action: perform-action
        perform_action: media_player.media_previous_track
      hold_action:
        action: none
      icon: mdi:skip-next
    styles: |-
      toucharea {
        background-color: rgb(0, 0, 0, 0);
        background-image: url("http://homeassistant.local:8123{{ state_attr(config.entity, 'entity_picture') }}");
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        height: 400px;
        --size: 48px;
      }
    hold_action:
      action: more-info
    icon: mdi:play-pause
```

</details>

## Example 16

Multiple sliders for light color control.

<img src="https://raw.githubusercontent.com/Nerwyn/android-tv-card/main/assets/color_controls.png" alt="color controls" width="500"/>

<details>

<summary>Remote Config</summary>

```yaml
type: custom:android-tv-card
rows:
  - - brightness
    - color_temp
    - hs_color
custom_actions:
  - type: slider
    vertical: true
    entity_id: light.sunroom_ceiling
    value_attribute: brightness
    range:
      - 0
      - 100
    step: 1
    tap_action:
      action: perform-action
      perform_action: light.turn_on
      data:
        brightness_pct: '{{ value | int }}'
      target:
        entity_id: '{{ config.entity }}'
    styles: |
      :host {
        height: 400px;
        border-radius: 4px;
        --height: 36px;
        --thumb-width: 18px;
        --color: rgb({{ state_attr(config.entity, "rgb_color") }});
        --thumb-border-radius: 4px;
      }
      .background {
        height: 24px;
      }
    name: brightness
  - type: slider
    vertical: true
    entity_id: light.sunroom_ceiling
    value_attribute: color_temp
    range:
      - '{{ state_attr(config.entity, "min_mireds") }}'
      - '{{ state_attr(config.entity, "max_mireds") }}'
    step: 1
    tap_action:
      action: perform-action
      data:
        color_temp: '{{ value | int }}'
      perform_action: light.turn_on
      target:
        entity_id: '{{ config.entity }}'
    styles: |
      :host {
        height: 400px;
        --color: rgba(0, 0, 0, 0.2);
        --background: linear-gradient(-90deg, rgb(255, 167, 87), rgb(255, 255, 251));
        --thumb-box-shadow: none;
      }
      .icon {
        filter: invert(1);
        mix-blend-mode: difference;
      }
    name: color_temp
    icon: mdi:thermometer
  - type: slider
    range:
      - 0
      - 360
    value_attribute: hs_color[0]
    tap_action:
      action: perform-action
      perform_action: light.turn_on
      data:
        hs_color:
          - '{{ value | int }}'
          - 100
      target:
        entity_id: '{{ config.entity }}'
    vertical: true
    step: 0.1
    icon: mdi:palette
    styles: |-
      :host {
        height: 400px;
        color: hsl({{ value | int }}, 100%, 50%);
        --color: rgba(0, 0, 0, 0.5);
        --background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 66%, #f0f 83%, #f00 100%);
        --thumb-box-shadow: none;
      }
    entity_id: light.sunroom_ceiling
    name: hs_color
```

</details>
