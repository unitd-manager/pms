(this["webpackJsonpmain-bt5"]=this["webpackJsonpmain-bt5"]||[]).push([[132,234],{141:function(e,t,c){"use strict";var n=c(156);c(182);t.a=function(e,t){return"success"===t?n.b.success(e,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"}):"error"===t?n.b.error(e,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"}):"info"===t?n.b.info(e,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"}):"warning"===t?n.b.warning(e,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"}):Object(n.b)(e)}},142:function(e,t,c){"use strict";var n=c(63),s=c(12),a=c(58),i=c(2);t.a=function(e){var t=Object(s.f)(),c=t.pathname.split("/")[1],r=t.pathname.split("/")[2];return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)("h4",{children:e.heading}),Object(i.jsxs)(n.c,{children:[Object(i.jsx)(n.d,{to:"/",tag:a.b,className:"text-decoration-none",children:"Home"}),c?Object(i.jsx)(n.d,{active:!0,children:c}):"",r?Object(i.jsx)(n.d,{active:!0,children:r}):""]})]})}},144:function(e,t,c){"use strict";c.r(t);var n=c(63),s=(c(1),c(2));function a(e){var t=e.details,c=void 0===t?null:t,a=e.title;return Object(s.jsx)(s.Fragment,{children:Object(s.jsx)(n.o,{tag:"h4",className:"border-bottom px-4 py-3 mb-0",children:Object(s.jsxs)(n.eb,{children:[Object(s.jsx)(n.s,{children:a}),c&&Object(s.jsxs)(n.s,{children:[Object(s.jsx)(n.eb,{children:Object(s.jsxs)("small",{children:["Modification Date: ",c&&c.modification_date]})}),Object(s.jsx)(n.eb,{className:"d-flex",children:Object(s.jsxs)("small",{children:["Creation Date: ",c&&c.creation_date]})})]})]})})})}t.default=function(e){var t=e.children,c=e.title,i=e.subtitle,r=e.creationModificationDate;return Object(s.jsxs)(n.i,{className:"shadow-none",children:[Object(s.jsx)(a,{details:r,title:c}),Object(s.jsxs)(n.j,{className:"p-4",children:[Object(s.jsx)(n.m,{className:"text-muted mb-3",children:i||""}),Object(s.jsx)("div",{children:t})]})]})}},1562:function(e,t,c){"use strict";c.r(t);var n=c(3),s=c(9),a=c(27),i=c(1),r=c(63),j=c(12),d=c(156),o=c(161),l=c.n(o),b=c(142),h=c(144),O=c(2);function x(e){var t=e.toggle,c=e.handleInputs,n=e.insertCompany,s=e.modal;return Object(O.jsxs)(r.N,{size:"l",isOpen:s,toggle:t.bind(null),children:[Object(O.jsx)(r.Q,{toggle:t.bind(null),children:"New Customer"}),Object(O.jsx)(r.O,{children:Object(O.jsx)(r.eb,{children:Object(O.jsx)(r.s,{md:"12",children:Object(O.jsx)(r.i,{children:Object(O.jsx)(r.j,{children:Object(O.jsxs)(r.A,{children:[Object(O.jsx)(r.eb,{children:Object(O.jsx)(r.s,{md:"12",children:Object(O.jsxs)(r.C,{children:[Object(O.jsxs)(r.H,{children:["Customer Name ",Object(O.jsx)("span",{className:"required",children:" *"})]}),Object(O.jsx)(r.E,{type:"text",name:"company_name",onChange:c})]})})}),Object(O.jsx)(r.eb,{children:Object(O.jsx)(r.s,{md:"12",children:Object(O.jsxs)(r.C,{children:[Object(O.jsxs)(r.H,{children:[" ","Phone ",Object(O.jsx)("span",{className:"required",children:" *"})]}),Object(O.jsx)(r.E,{type:"text",name:"phone",onChange:c})]})})}),Object(O.jsx)(r.eb,{children:Object(O.jsx)(r.s,{md:"12",children:Object(O.jsxs)(r.C,{children:[Object(O.jsx)(r.H,{children:"Website"}),Object(O.jsx)(r.E,{type:"text",name:"website",onChange:c})]})})}),Object(O.jsx)(r.eb,{children:Object(O.jsx)(r.s,{md:"12",children:Object(O.jsxs)(r.C,{children:[Object(O.jsxs)(r.H,{children:["Address 1",Object(O.jsx)("span",{className:"required",children:" *"})]}),Object(O.jsx)(r.E,{type:"text",name:"address_flat",placeholder:" ",onChange:c})]})})}),Object(O.jsx)(r.eb,{children:Object(O.jsx)(r.s,{md:"12",children:Object(O.jsxs)(r.C,{children:[Object(O.jsx)(r.H,{children:"Address 2"}),Object(O.jsx)(r.E,{type:"text",name:"address_street",placeholder:" ",onChange:c})]})})}),Object(O.jsx)(r.eb,{children:Object(O.jsx)(r.s,{md:"12",children:Object(O.jsxs)(r.C,{children:[Object(O.jsx)(r.H,{children:"Area"}),Object(O.jsx)(r.E,{type:"text",name:"address_town",placeholder:" ",onChange:c})]})})}),Object(O.jsx)(r.eb,{children:Object(O.jsx)(r.s,{md:"12",children:Object(O.jsxs)(r.C,{children:[Object(O.jsx)(r.H,{children:"Zipcode"}),Object(O.jsx)(r.E,{type:"text",name:"address_state",placeholder:" ",onChange:c})]})})}),Object(O.jsx)(r.eb,{children:Object(O.jsx)(r.s,{md:"12",children:Object(O.jsxs)(r.C,{children:[Object(O.jsx)(r.H,{children:"Latitude"}),Object(O.jsx)(r.E,{type:"text",name:"latitude",placeholder:" ",onChange:c})]})})}),Object(O.jsx)(r.eb,{children:Object(O.jsx)(r.s,{md:"12",children:Object(O.jsxs)(r.C,{children:[Object(O.jsx)(r.H,{children:"Longitude"}),Object(O.jsx)(r.E,{type:"text",name:"longitude",placeholder:" ",onChange:c})]})})})]})})})})})}),Object(O.jsxs)(r.P,{children:[Object(O.jsx)(r.e,{className:"shadow-none",color:"primary",onClick:function(){n()},children:"Save & Continue"}),Object(O.jsx)(r.e,{color:"dark",className:"shadow-none",onClick:t.bind(null),children:"Cancel"})]})]})}var m=c(7),u=c(141),p=c(268);t.default=function(){var e=Object(i.useState)(!1),t=Object(a.a)(e,2),c=t[0],o=t[1],g=Object(i.useState)(),f=Object(a.a)(g,2),C=f[0],y=f[1],v=Object(j.h)().id,N=Object(j.g)(),k=Object(i.useState)(),w=Object(a.a)(k,2),_=w[0],H=w[1],E=function(){o(!c)},B=Object(i.useState)({company_id:"",phone:"",website:"",address_flat:"",address_street:"",address_town:"",address_state:"",longitude:"",latitude:""}),P=Object(a.a)(B,2),A=P[0],S=P[1],D=function(){m.a.get("/booking/getCompanyName").then((function(e){H(e.data.data)})).catch((function(){Object(u.a)("Company not found","info")}))};return Object(i.useEffect)((function(){D()}),[v]),Object(O.jsxs)("div",{children:[Object(O.jsx)(b.a,{}),Object(O.jsx)(d.a,{}),Object(O.jsx)(r.eb,{children:Object(O.jsx)(r.s,{md:"12",children:Object(O.jsx)(h.default,{title:"Booking Details",children:Object(O.jsxs)(r.A,{children:[Object(O.jsx)(r.C,{children:Object(O.jsxs)(r.eb,{children:[Object(O.jsxs)(r.s,{md:"10",children:[Object(O.jsx)(r.H,{children:"CustomerName "}),Object(O.jsxs)(r.E,{type:"select",name:"company_id",onChange:function(e){y(Object(s.a)(Object(s.a)({},C),{},Object(n.a)({},e.target.name,e.target.value)))},children:[Object(O.jsx)("option",{children:"Select Customer"}),_&&_.map((function(e){return Object(O.jsx)("option",{value:e.company_id,children:e.company_name},e.company_id)}))]})]}),Object(O.jsxs)(r.s,{md:"2",className:"addNew",children:[Object(O.jsx)(r.H,{children:"Add New Customer"}),Object(O.jsx)(r.e,{color:"primary",className:"shadow-none",onClick:E.bind(null),children:"Add New"})]})]})}),Object(O.jsx)(r.C,{children:Object(O.jsx)(r.eb,{children:Object(O.jsxs)("div",{className:"pt-3 mt-3 d-flex align-items-center gap-2",children:[Object(O.jsx)(r.e,{color:"primary",onClick:function(){""!==C.company_id?(C.booking_date=l()(),C.creation_date=p.a,m.a.post("/booking/insertBooking",C).then((function(e){var t=e.data.data.insertId;Object(u.a)("Booking inserted successfully.","success"),setTimeout((function(){N("/BookingEdit/".concat(t))}),300)})).catch((function(){Object(u.a)("Network connection error.","error")}))):Object(u.a)("Please fill all required fields","warning")},type:"button",className:"btn mr-2 shadow-none",children:"Save & Continue"}),Object(O.jsx)(r.e,{onClick:function(){N(-1)},type:"button",className:"btn btn-dark shadow-none",children:"Cancel"})]})})})]})})})}),Object(O.jsx)(x,{toggle:E,handleInputs:function(e){S(Object(s.a)(Object(s.a)({},A),{},Object(n.a)({},e.target.name,e.target.value)))},insertCompany:function(){""!==A.company_name&&""!==A.address_flat?m.a.post("/company/insertCompany",A).then((function(){Object(u.a)("Company inserted successfully.","success"),D(),E()})).catch((function(){Object(u.a)("Network connection error.","error")})):Object(u.a)("Please fill all required fields","warning")},modal:c})]})}},268:function(e,t,c){"use strict";var n=c(161),s=c.n(n)()().format("DD-MM-YYYY h:mm:ss a");t.a=s}}]);
//# sourceMappingURL=132.83725fde.chunk.js.map