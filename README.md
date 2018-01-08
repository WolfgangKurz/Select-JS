# Select.JS
Independent HTML+JS+CSS library for design select tag. (dropdown)


## Usage
You can design select tag with below js code.
```javascript
DOMElement.selectjs({});
```
Designed Select.JS element will copy ClassName of source element.
Also, Select.JS element will copy `optgroup`, and child will be indent.


## Options
Select-JS has options to design select tag differently.

ClassName | Description
--------- | -----------
select-js-inline | Droplist will not fit size to parent element.
select-js-up | Droplist will show to Up.
select-js-scroll | Droplist will show vertical scroll always.
select-js-noscroll | Droplist will hide vertical scroll.
select-js-editable | Droplist will be changed to text input element. Caution! Cannot back to select element.
select-js-autofilter | Options will be filtered automatically by input value. `Editable only.`
select-js-customfilter | Options will be filtered (or display something new) by user function. `Editable only.`
select-js-global | Droplist will share list element, and it added to body dom element.
select-js-fullsize | Same with select-js-global, but it expend to display all element. (Smaller than screen)
select-js-noadjust | Select element will not adjusted automatically.

On `select-js-editable`, you can use some attributes for design.

Attributes | Description
--------- | -----------
value | Set default value of editable select.
placeholder | Set placeholder of editable select.

When you use some special options, you can call selectjs() with some parameters.

Name | Type | Description
--------- | -------- | -----------
customfilter | function | Custom-filter function. Sample: `function(value, original_options){ return [{display:"", value:""}] }`.


## Customize
In original Select.JS code, it has Blue accent color.
If you want change this, need to modify CSS.

Change `#0077CC` to your color.
You can use Replace-all function.
