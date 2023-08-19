(this["webpackJsonpmain-bt5"]=this["webpackJsonpmain-bt5"]||[]).push([[162,234],{141:function(e,t,c){"use strict";var s=c(156);c(182);t.a=function(e,t){return"success"===t?s.b.success(e,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"}):"error"===t?s.b.error(e,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"}):"info"===t?s.b.info(e,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"}):"warning"===t?s.b.warning(e,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"}):Object(s.b)(e)}},142:function(e,t,c){"use strict";var s=c(63),n=c(12),i=c(58),r=c(2);t.a=function(e){var t=Object(n.f)(),c=t.pathname.split("/")[1],o=t.pathname.split("/")[2];return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("h4",{children:e.heading}),Object(r.jsxs)(s.c,{children:[Object(r.jsx)(s.d,{to:"/",tag:i.b,className:"text-decoration-none",children:"Home"}),c?Object(r.jsx)(s.d,{active:!0,children:c}):"",o?Object(r.jsx)(s.d,{active:!0,children:o}):""]})]})}},144:function(e,t,c){"use strict";c.r(t);var s=c(63),n=(c(1),c(2));function i(e){var t=e.details,c=void 0===t?null:t,i=e.title;return Object(n.jsx)(n.Fragment,{children:Object(n.jsx)(s.o,{tag:"h4",className:"border-bottom px-4 py-3 mb-0",children:Object(n.jsxs)(s.eb,{children:[Object(n.jsx)(s.s,{children:i}),c&&Object(n.jsxs)(s.s,{children:[Object(n.jsx)(s.eb,{children:Object(n.jsxs)("small",{children:["Modification Date: ",c&&c.modification_date]})}),Object(n.jsx)(s.eb,{className:"d-flex",children:Object(n.jsxs)("small",{children:["Creation Date: ",c&&c.creation_date]})})]})]})})})}t.default=function(e){var t=e.children,c=e.title,r=e.subtitle,o=e.creationModificationDate;return Object(n.jsxs)(s.i,{className:"shadow-none",children:[Object(n.jsx)(i,{details:o,title:c}),Object(n.jsxs)(s.j,{className:"p-4",children:[Object(n.jsx)(s.m,{className:"text-muted mb-3",children:r||""}),Object(n.jsx)("div",{children:t})]})]})}},1476:function(e,t,c){"use strict";c.r(t);var s=c(3),n=c(9),i=c(27),r=c(1),o=c(63),a=c(156),j=c(12),l=c(142),d=c(144),b=c(7),h=c(141),O=c(2);t.default=function(){var e=Object(r.useState)([]),t=Object(i.a)(e,2),c=t[0],u=t[1],p=Object(r.useState)([]),x=Object(i.a)(p,2),f=x[0],m=x[1],g=Object(r.useState)({task_title:"",project_id:"",project_milestone_id:""}),v=Object(i.a)(g,2),_=v[0],k=v[1],C=Object(j.g)(),N=function(e){k(Object(n.a)(Object(n.a)({},_),{},Object(s.a)({},e.target.name,e.target.value)))},w=function(e){b.a.post("/projecttask/getMilestoneById",{project_id:e}).then((function(e){m(e.data.data)})).catch((function(){Object(h.a)("Milestones not found","info")}))};return Object(r.useEffect)((function(){b.a.get("/projecttask/getProjectTitle").then((function(e){u(e.data.data)})).catch((function(){Object(h.a)("Projects not found","info")}))}),[]),Object(r.useEffect)((function(){if(_.project_id){var e=_.project_id;w(e)}}),[_.project_id]),Object(O.jsxs)("div",{children:[Object(O.jsx)(l.a,{}),Object(O.jsx)(a.a,{}),Object(O.jsx)(o.eb,{children:Object(O.jsx)(o.s,{md:"6",xs:"12",children:Object(O.jsx)(d.default,{title:"Details",children:Object(O.jsxs)(o.A,{children:[Object(O.jsx)(o.C,{children:Object(O.jsxs)(o.eb,{children:[Object(O.jsx)(o.s,{md:"12",children:Object(O.jsxs)(o.C,{children:[Object(O.jsxs)(o.H,{children:["Title ",Object(O.jsx)("span",{className:"required",children:"*"})]}),Object(O.jsx)(o.E,{type:"text",name:"task_title",onChange:N})]})}),Object(O.jsx)(o.s,{md:"12",children:Object(O.jsxs)(o.C,{children:[Object(O.jsx)(o.H,{children:"Project Title"}),Object(O.jsxs)(o.E,{type:"select",name:"project_id",onChange:function(e){N(e);var t=e.target.value;w(t)},children:[Object(O.jsx)("option",{children:"Select Project"}),c&&c.map((function(e){return Object(O.jsx)("option",{value:e.project_id,children:e.title},e.project_id)}))]})]})}),Object(O.jsx)(o.s,{md:"12",children:Object(O.jsxs)(o.C,{children:[Object(O.jsx)(o.H,{children:"Milestone"}),Object(O.jsxs)(o.E,{type:"select",name:"project_milestone_id",onChange:N,children:[Object(O.jsx)("option",{children:"Select Milestone"}),f&&f.map((function(e){return Object(O.jsx)("option",{value:e.project_milestone_id,children:e.milestone_title},e.project_id)}))]})]})})]})}),Object(O.jsx)(o.C,{children:Object(O.jsx)(o.eb,{children:Object(O.jsxs)("div",{className:"pt-3 mt-3 d-flex align-items-center gap-2",children:[Object(O.jsx)(o.e,{color:"primary",onClick:function(){""!==_.task_title?b.a.post("/projecttask/insertTask",_).then((function(e){var t=e.data.data.insertId;Object(h.a)("Task inserted successfully.","success"),setTimeout((function(){C("/TaskEdit/".concat(t))}),300)})).catch((function(){Object(h.a)("Network connection error.","error")})):Object(h.a)("Please fill all required fields.","warning")},type:"button",className:"btn mr-2 shadow-none",children:"Save & Continue"}),Object(O.jsx)(o.e,{onClick:function(){C("/TaskList")},type:"button",className:"btn btn-dark shadow-none",children:"Go to List"})]})})})]})})})})]})}}}]);
//# sourceMappingURL=162.cc95b2bd.chunk.js.map