(this["webpackJsonpmain-bt5"]=this["webpackJsonpmain-bt5"]||[]).push([[135,234],{141:function(e,t,c){"use strict";var n=c(156);c(182);t.a=function(e,t){return"success"===t?n.b.success(e,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"}):"error"===t?n.b.error(e,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"}):"info"===t?n.b.info(e,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"}):"warning"===t?n.b.warning(e,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"}):Object(n.b)(e)}},142:function(e,t,c){"use strict";var n=c(63),s=c(12),i=c(58),a=c(2);t.a=function(e){var t=Object(s.f)(),c=t.pathname.split("/")[1],r=t.pathname.split("/")[2];return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)("h4",{children:e.heading}),Object(a.jsxs)(n.c,{children:[Object(a.jsx)(n.d,{to:"/",tag:i.b,className:"text-decoration-none",children:"Home"}),c?Object(a.jsx)(n.d,{active:!0,children:c}):"",r?Object(a.jsx)(n.d,{active:!0,children:r}):""]})]})}},144:function(e,t,c){"use strict";c.r(t);var n=c(63),s=(c(1),c(2));function i(e){var t=e.details,c=void 0===t?null:t,i=e.title;return Object(s.jsx)(s.Fragment,{children:Object(s.jsx)(n.o,{tag:"h4",className:"border-bottom px-4 py-3 mb-0",children:Object(s.jsxs)(n.eb,{children:[Object(s.jsx)(n.s,{children:i}),c&&Object(s.jsxs)(n.s,{children:[Object(s.jsx)(n.eb,{children:Object(s.jsxs)("small",{children:["Modification Date: ",c&&c.modification_date]})}),Object(s.jsx)(n.eb,{className:"d-flex",children:Object(s.jsxs)("small",{children:["Creation Date: ",c&&c.creation_date]})})]})]})})})}t.default=function(e){var t=e.children,c=e.title,a=e.subtitle,r=e.creationModificationDate;return Object(s.jsxs)(n.i,{className:"shadow-none",children:[Object(s.jsx)(i,{details:r,title:c}),Object(s.jsxs)(n.j,{className:"p-4",children:[Object(s.jsx)(n.m,{className:"text-muted mb-3",children:a||""}),Object(s.jsx)("div",{children:t})]})]})}},1460:function(e,t,c){"use strict";c.r(t);var n=c(3),s=c(9),i=c(27),a=c(1),r=c(63),o=c(12),l=c(161),d=c.n(l),j=c(156),b=c(142),h=c(144),O=c(141),u=c(7),x=c(268),m=c(2);t.default=function(){var e=Object(a.useState)(),t=Object(i.a)(e,2),c=t[0],l=t[1],g=Object(o.g)(),f=Object(a.useState)({title:"",creation_date:d()(),content_date:d()(),content_type:""}),p=Object(i.a)(f,2),v=p[0],C=p[1];return Object(a.useEffect)((function(){u.a.get("/content/getContent").then((function(e){l(e.data.data),console.log(c)}))}),[]),Object(m.jsxs)("div",{children:[Object(m.jsx)(b.a,{}),Object(m.jsx)(j.a,{}),Object(m.jsx)(r.eb,{children:Object(m.jsx)(r.s,{md:"6",children:Object(m.jsx)(h.default,{title:"Key Details",children:Object(m.jsxs)(r.A,{children:[Object(m.jsx)(r.C,{children:Object(m.jsx)(r.eb,{children:Object(m.jsxs)(r.s,{md:"12",children:[Object(m.jsx)(r.H,{children:"Title"}),Object(m.jsx)(r.E,{type:"text",onChange:function(e){C(Object(s.a)(Object(s.a)({},v),{},Object(n.a)({},e.target.name,e.target.value)))},value:v&&v.title,name:"title"})]})})}),Object(m.jsx)(r.C,{children:Object(m.jsx)(r.eb,{children:Object(m.jsxs)("div",{className:"pt-3 mt-3 d-flex align-items-center gap-2",children:[Object(m.jsx)(r.e,{className:"shadow-none",color:"primary",onClick:function(){""!==v.title?(v.creation_date=x.a,u.a.post("/content/insertContent",v).then((function(e){var t=e.data.data.insertId;Object(O.a)("Content inserted successfully.","success"),setTimeout((function(){g("/ContentEdit/".concat(t))}),300)})).catch((function(){Object(O.a)("Network connection error.","error")}))):Object(O.a)("Please fill all required fields.","error")},children:"Save"}),Object(m.jsx)(r.e,{onClick:function(){g(-1)},type:"button",className:"btn btn-dark shadow-none",children:"Cancel"})]})})})]})})})})]})}},268:function(e,t,c){"use strict";var n=c(161),s=c.n(n)()().format("DD-MM-YYYY h:mm:ss a");t.a=s}}]);
//# sourceMappingURL=135.c01ffbaa.chunk.js.map