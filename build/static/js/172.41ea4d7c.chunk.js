(this["webpackJsonpmain-bt5"]=this["webpackJsonpmain-bt5"]||[]).push([[172,234],{141:function(e,t,c){"use strict";var s=c(156);c(182);t.a=function(e,t){return"success"===t?s.b.success(e,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"}):"error"===t?s.b.error(e,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"}):"info"===t?s.b.info(e,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"}):"warning"===t?s.b.warning(e,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"}):Object(s.b)(e)}},142:function(e,t,c){"use strict";var s=c(63),r=c(12),n=c(58),i=c(2);t.a=function(e){var t=Object(r.f)(),c=t.pathname.split("/")[1],o=t.pathname.split("/")[2];return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)("h4",{children:e.heading}),Object(i.jsxs)(s.c,{children:[Object(i.jsx)(s.d,{to:"/",tag:n.b,className:"text-decoration-none",children:"Home"}),c?Object(i.jsx)(s.d,{active:!0,children:c}):"",o?Object(i.jsx)(s.d,{active:!0,children:o}):""]})]})}},144:function(e,t,c){"use strict";c.r(t);var s=c(63),r=(c(1),c(2));function n(e){var t=e.details,c=void 0===t?null:t,n=e.title;return Object(r.jsx)(r.Fragment,{children:Object(r.jsx)(s.o,{tag:"h4",className:"border-bottom px-4 py-3 mb-0",children:Object(r.jsxs)(s.eb,{children:[Object(r.jsx)(s.s,{children:n}),c&&Object(r.jsxs)(s.s,{children:[Object(r.jsx)(s.eb,{children:Object(r.jsxs)("small",{children:["Modification Date: ",c&&c.modification_date]})}),Object(r.jsx)(s.eb,{className:"d-flex",children:Object(r.jsxs)("small",{children:["Creation Date: ",c&&c.creation_date]})})]})]})})})}t.default=function(e){var t=e.children,c=e.title,i=e.subtitle,o=e.creationModificationDate;return Object(r.jsxs)(s.i,{className:"shadow-none",children:[Object(r.jsx)(n,{details:o,title:c}),Object(r.jsxs)(s.j,{className:"p-4",children:[Object(r.jsx)(s.m,{className:"text-muted mb-3",children:i||""}),Object(r.jsx)("div",{children:t})]})]})}},1481:function(e,t,c){"use strict";c.r(t);var s=c(3),r=c(9),n=c(27),i=c(1),o=c(63),a=c(156),l=c(12),d=c(142),j=c(144),b=c(7),u=c(141),h=c(2);t.default=function(){var e=Object(i.useState)({title:""}),t=Object(n.a)(e,2),c=t[0],O=t[1],p=Object(i.useState)([]),g=Object(n.a)(p,2),x=g[0],m=g[1],f=Object(l.g)();return Object(i.useEffect)((function(){b.a.get("/usergroup/getSectionsforusergroup").then((function(e){m(e.data.data),console.log(e.data.data)}))}),[]),Object(h.jsxs)("div",{children:[Object(h.jsx)(d.a,{}),Object(h.jsx)(a.a,{}),Object(h.jsx)(o.eb,{children:Object(h.jsx)(o.s,{md:"6",children:Object(h.jsx)(j.default,{title:"Key Details",children:Object(h.jsxs)(o.A,{children:[Object(h.jsx)(o.C,{children:Object(h.jsx)(o.eb,{children:Object(h.jsxs)(o.s,{md:"12",children:[Object(h.jsx)(o.H,{children:"Title"}),Object(h.jsx)(o.E,{type:"text",onChange:function(e){O(Object(r.a)(Object(r.a)({},c),{},Object(s.a)({},e.target.name,e.target.value)))},value:c&&c.title,name:"title"})]})})}),Object(h.jsx)(o.C,{children:Object(h.jsx)(o.eb,{children:Object(h.jsxs)("div",{className:"pt-3 mt-3 d-flex align-items-center gap-2",children:[Object(h.jsx)(o.e,{className:"shadow-none",color:"primary",onClick:function(){b.a.post("/usergroup/insertUserGroup",c).then((function(e){var t=e.data.data.insertId;console.log(t),x.forEach((function(e){e.user_group_id=t,b.a.post("/usergroup/insertRoomUserGroup",e).then((function(){})).catch((function(e){console.log(e)}))})),Object(u.a)("UserGroup created successfully.","success"),setTimeout((function(){f("/UserGroupEdit/".concat(t))}),500)})).catch((function(){Object(u.a)("Unable to edit record.","error")}))},children:"Save"}),Object(h.jsx)(o.e,{onClick:function(){f("/UserGroup")},type:"button",className:"btn btn-dark shadow-none",children:"Go to List"})]})})})]})})})})]})}}}]);
//# sourceMappingURL=172.41ea4d7c.chunk.js.map