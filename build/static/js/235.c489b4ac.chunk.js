(this["webpackJsonpmain-bt5"]=this["webpackJsonpmain-bt5"]||[]).push([[235],{864:function(e,t,n){"use strict";n.r(t);var c=n(4),o=n(6),i=n(3),a=n(9),r=n(27),s=n(1),d=n(63),l=n(12),j=n(160),u=n.n(j),b=n(7),h=n(2);t.default=function(e){var t=e.editCreateNote,n=e.setEditCreateNote,j=Object(s.useState)(null),m=Object(r.a)(j,2),O=m[0],x=m[1],p=Object(s.useState)(null),f=Object(r.a)(p,2),v=f[0],_=f[1],g=Object(l.h)().id,w=Object(s.useState)({amount:0,order_id:g}),y=Object(r.a)(w,2),C=y[0],E=y[1],N=function(e){x(Object(a.a)(Object(a.a)({},O),{},Object(i.a)({},e.target.name,e.target.value)))},k=function(e){b.a.post("/finance/insertcredit_note_history",e).then((function(e){console.log("Inserted successfully."),_(e.data.data)})).catch((function(){console.log("Network connection error.")}))},I=function(e,t){for(var n=0;n<t.length;n++)""!==t[n].amount&&k({invoice_id:t[n].invoice_id,credit_note_id:e,invoice_code:t[n].invoice_code,item_title:t[n].item_title,amount:t[n].amount,description:t[n].description,modified_by:""})},S=function(){var e=Object(o.a)(Object(c.a)().mark((function e(t,n){return Object(c.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:C.credit_note_code=n,b.a.post("/finance/insertcredit_note",C).then((function(e){console.log("Inserted successfully."),console.log("amount",C),x(e.data.data),I(e.data.data.insertId,t),window.location.reload()})).catch((function(){console.log("Network connection error.")}));case 2:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),A=0,D=function(){var e,t,n=[];u()(".display tbody tr").each((function(){var e={};u()(this).find("input").each((function(){var t=u()(this).attr("name");e[t]=u()(this).val()})),n.push(e)})),console.log(n),n.forEach((function(e){e.amount&&(A+=parseFloat(e.amount)+.07*e.amount),C.amount=A})),E({amount:A}),e=n,t="creditNote",b.a.post("/commonApi/getCodeValue",{type:t}).then((function(t){S(e,t.data.data)})).catch((function(){S(e,"")})),console.log(A),n.forEach((function(e){""!==e.item_title&&e.description&&e.amount&&k(e)}))},F=Object(s.useState)(null),H=Object(r.a)(F,2),J=H[0],z=H[1];console.log("creditnote",J),Object(s.useEffect)((function(){b.a.post("/invoice/getInvoiceById",{order_id:g}).then((function(e){z(e.data.data)}))}),[g]);return Object(h.jsx)(h.Fragment,{children:Object(h.jsxs)(d.N,{size:"xl",isOpen:t,children:[Object(h.jsxs)(d.Q,{children:["Credit Note",Object(h.jsx)(d.e,{color:"secondary",onClick:function(){n(!1)},children:"X"})]}),Object(h.jsx)(d.O,{children:Object(h.jsx)(d.eb,{children:Object(h.jsx)(d.s,{md:"12",children:Object(h.jsx)(d.i,{children:Object(h.jsx)(d.j,{children:Object(h.jsx)(d.A,{children:Object(h.jsx)(d.eb,{children:Object(h.jsxs)("div",{className:"container",children:[Object(h.jsxs)(d.ib,{id:"example",className:"display",children:[Object(h.jsx)("thead",{children:Object(h.jsx)("tr",{children:[{name:"Invoice Code",selector:"invoice_code",grow:0,wrap:!0,width:"4%"},{name:"Amount",selector:"invoice_amount",grow:0,width:"1%",wrap:!0},{name:"Invoice Id",selector:"invoice_id",grow:0,width:"1%",wrap:!0},{name:"Title",selector:" ",sortable:!0,grow:0,wrap:!0},{name:"Description",selector:" ",sortable:!0,grow:0},{name:"Credit Amount",selector:" ",sortable:!0,width:"auto",grow:3}].map((function(e){return Object(h.jsx)("td",{children:e.name},e.name)}))})}),Object(h.jsx)("tbody",{children:J&&J.map((function(e){return Object(h.jsxs)("tr",{children:[Object(h.jsxs)("td",{children:[Object(h.jsx)(d.E,{value:e.invoice_code})," "]}),Object(h.jsx)("td",{children:e.invoice_amount}),Object(h.jsx)("td",{children:Object(h.jsx)(d.E,{type:"text",name:"invoice_id",value:e.invoice_id})}),Object(h.jsx)("td",{children:Object(h.jsx)(d.E,{type:"text",name:"item_title",value:v&&v.item_title})}),Object(h.jsx)("td",{children:Object(h.jsx)(d.E,{type:"text",name:"description",value:v&&v.description})}),Object(h.jsx)("td",{children:Object(h.jsx)(d.E,{type:"text",name:"amount",value:v&&v.amount})})]},e.invoice_code)}))})]}),Object(h.jsx)(d.H,{children:"Date"}),Object(h.jsx)(d.E,{type:"date",name:"from_date",onChange:N,value:O&&O.from_date}),Object(h.jsx)(d.H,{children:"Notes"}),Object(h.jsx)(d.E,{type:"text",name:"remarks",onChange:N,value:O&&O.remarks})]})})})})})})})}),Object(h.jsxs)(d.P,{children:[Object(h.jsx)(d.e,{color:"primary",type:"button",onClick:function(){D()},children:"Submit"}),Object(h.jsx)(d.e,{color:"secondary",children:"Cancel"})]})]})})}}}]);
//# sourceMappingURL=235.c489b4ac.chunk.js.map