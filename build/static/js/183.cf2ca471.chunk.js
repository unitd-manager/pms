(this["webpackJsonpmain-bt5"]=this["webpackJsonpmain-bt5"]||[]).push([[183,234],{141:function(e,t,s){"use strict";var c=s(156);s(182);t.a=function(e,t){return"success"===t?c.b.success(e,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"}):"error"===t?c.b.error(e,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"}):"info"===t?c.b.info(e,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"}):"warning"===t?c.b.warning(e,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"}):Object(c.b)(e)}},144:function(e,t,s){"use strict";s.r(t);var c=s(63),n=(s(1),s(2));function r(e){var t=e.details,s=void 0===t?null:t,r=e.title;return Object(n.jsx)(n.Fragment,{children:Object(n.jsx)(c.o,{tag:"h4",className:"border-bottom px-4 py-3 mb-0",children:Object(n.jsxs)(c.eb,{children:[Object(n.jsx)(c.s,{children:r}),s&&Object(n.jsxs)(c.s,{children:[Object(n.jsx)(c.eb,{children:Object(n.jsxs)("small",{children:["Modification Date: ",s&&s.modification_date]})}),Object(n.jsx)(c.eb,{className:"d-flex",children:Object(n.jsxs)("small",{children:["Creation Date: ",s&&s.creation_date]})})]})]})})})}t.default=function(e){var t=e.children,s=e.title,i=e.subtitle,a=e.creationModificationDate;return Object(n.jsxs)(c.i,{className:"shadow-none",children:[Object(n.jsx)(r,{details:a,title:s}),Object(n.jsxs)(c.j,{className:"p-4",children:[Object(n.jsx)(c.m,{className:"text-muted mb-3",children:i||""}),Object(n.jsx)("div",{children:t})]})]})}},1488:function(e,t,s){"use strict";s.r(t);var c=s(3),n=s(9),r=s(27),i=s(1),a=s(63),o=(s(269),s(210),s(211),s(212),s(213),s(214),s(217),s(12)),l=s(7),d=s(141),j=s(144),b=s(2);t.default=function(){var e=Object(o.h)().id,t=Object(o.g)(),s=Object(i.useState)(),h=Object(r.a)(s,2),O=h[0],u=h[1],x=function(e){u(Object(n.a)(Object(n.a)({},O),{},Object(c.a)({},e.target.name,e.target.value)))};return Object(i.useEffect)((function(){}),[e]),Object(b.jsx)("div",{children:Object(b.jsx)(a.eb,{children:Object(b.jsx)(a.s,{md:"8",children:Object(b.jsx)(j.default,{title:"Login",children:Object(b.jsxs)(a.A,{children:[Object(b.jsx)(a.C,{children:Object(b.jsx)(a.eb,{children:Object(b.jsxs)(a.A,{children:[Object(b.jsx)(a.eb,{children:Object(b.jsx)(a.s,{md:"8",children:Object(b.jsxs)(a.C,{children:[Object(b.jsxs)(a.H,{children:["Username ",Object(b.jsx)("span",{className:"required",children:" "})]}),Object(b.jsx)(a.E,{type:"text",name:"login",onChange:x})]})})}),Object(b.jsx)(a.eb,{children:Object(b.jsx)(a.s,{md:"8",children:Object(b.jsxs)(a.C,{children:[Object(b.jsxs)(a.H,{children:[" ","password",Object(b.jsx)("span",{className:"required",children:" "})]}),Object(b.jsx)(a.E,{type:"text",name:"password",onChange:x})]})})})]})})}),Object(b.jsx)(a.C,{children:Object(b.jsx)(a.eb,{children:Object(b.jsxs)("div",{className:"pt-3 mt-3 d-flex align-items-center gap-2",children:[Object(b.jsx)(a.e,{onClick:function(){O.staff_id=e,l.a.post("/attendance/insertAttendance",O).then((function(e){var s=e.data.data.insertId;console.log(s),Object(d.a)("add inserted successfully.","success"),setTimeout((function(){t("/Dashboard")}),300)})).catch((function(){Object(d.a)("Network connection error.","error")}))},type:"button",className:"btn btn-success mr-2",children:"submit"}),Object(b.jsx)(a.e,{onClick:function(){},type:"button",className:"btn btn-dark",children:"Cancel"})]})})})]})})})})})}}}]);
//# sourceMappingURL=183.cf2ca471.chunk.js.map