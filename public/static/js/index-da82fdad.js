import{j as r}from"./index-6b6aa884.js";import{F as t,I as c}from"./index-0021922b.js";import"./index-aaad3bfd.js";import"./AntdIcon-d8c0518e.js";import"./index-65e99b06.js";import"./ExclamationCircleFilled-8c3dffcc.js";function p(o){const{disabled:e,placeholder:n,onChange:a,addonAfter:m,suffix:l,style:s,...i}=o;return r(t.Item,{...i,children:r(c,{allowClear:!0,disabled:e,placeholder:n||"请输入",addonAfter:m,onChange:a,suffix:l,style:s})})}const f={labelCol:{flex:"100px"},wrapperCol:{flex:"1"}};function u({formLayout:o=f}){const[e]=t.useForm();return r("div",{className:"searchContainer",children:r(t,{...o,form:e,children:r(p,{name:"userName"})})})}function b(){return r(u,{})}export{b as default};
