(this["webpackJsonpmain-bt5"]=this["webpackJsonpmain-bt5"]||[]).push([[221],{141:function(e,t,n){"use strict";var c=n(156);n(182);t.a=function(e,t){return"success"===t?c.b.success(e,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"}):"error"===t?c.b.error(e,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"}):"info"===t?c.b.info(e,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"}):"warning"===t?c.b.warning(e,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"}):Object(c.b)(e)}},863:function(e,t,n){"use strict";n.r(t);var c=n(11),a=n(4),i=n(6),o=n(3),r=n(9),s=n(27),d=n(1),l=n(63),j=n(12),u=n(161),b=n.n(u),h=n(7),O=n(141),m=n(2);t.default=function(e){var t=e.editCreateReceipt,n=e.setEditCreateReceipt,u=Object(d.useState)(),p=Object(s.a)(u,2),f=p[0],v=p[1],x=Object(j.h)().id,_=Object(d.useState)(0),g=Object(s.a)(_,2),C=g[0],y=g[1],k=Object(d.useState)({amount:0,order_id:x,receipt_status:"Paid",receipt_date:b()(),receipt_code:""}),w=Object(s.a)(k,2),P=w[0],H=w[1],q=Object(d.useState)([]),E=Object(s.a)(q,2),N=E[0],S=E[1],F=function(e){"amount"===e.target.name&&y(parseInt(e.target.value)),H(Object(r.a)(Object(r.a)({},P),{},Object(o.a)({},e.target.name,e.target.value)))},I=function(e,t){h.a.post("/invoice/editInvoicePartialStatus",{invoice_id:e,status:t}).then((function(){Object(O.a)("data inserted successfully.")})).catch((function(){Object(O.a)("Network connection error.")}))},A=function(e){h.a.post("/finance/insertInvoiceReceiptHistory",e).then((function(){Object(O.a)("data inserted successfully."),window.location.reload()})).catch((function(){Object(O.a)("Network connection error.")}))},B=function(e){for(var t,n,c=C,a=0;a<N.length;a++)N[a].remainingAmount<=c?(c=parseFloat(c)-N[a].remainingAmount,N[a].paid=!0,t=N[a].invoice_id,n="Paid",h.a.post("/invoice/editInvoiceStatus",{invoice_id:t,status:n}).then((function(){Object(O.a)("data inserted successfully.")})).catch((function(){Object(O.a)("Network connection error.")})),A({invoice_id:N[a].invoice_id,receipt_id:e,published:"1",flag:"1",creation_date:"",modification_date:"",created_by:"admin",modified_by:"admin",amount:N[a].remainingAmount,site_id:"1"})):(N[a].partiallyPaid=!0,I(N[a].invoice_id,"Partial Payment"),A({invoice_id:N[a].invoice_id,receipt_id:e,published:"1",flag:"1",creation_date:"",modification_date:"",created_by:"admin",modified_by:"admin",amount:c,site_id:"1"}))},R=function(){var e=Object(i.a)(Object(a.a)().mark((function e(t){return Object(a.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:P.receipt_code=t,P.mode_of_payment&&N.length>0&&(C>=P.amount?h.a.post("/finance/insertreceipt",P).then((function(e){Object(O.a)("data inserted successfully."),B(e.data.data.insertId)})).catch((function(){Object(O.a)("Network connection error.")})):Object(O.a)("Please fill all required fields","warning"));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Y=[],D=[];return Object(d.useEffect)((function(){h.a.post("/invoice/getInvoiceReceiptById",{order_id:x}).then((function(e){var t=e.data.data;t.forEach((function(e){e.remainingAmount=e.invoice_amount-e.prev_amount}));var n=t.filter((function(e){return e.invoice_amount!==e.prev_amount}));v(n)}))}),[x]),Object(m.jsx)(m.Fragment,{children:Object(m.jsxs)(l.N,{size:"md=6",isOpen:t,children:[Object(m.jsxs)(l.Q,{children:["Create Receipt",Object(m.jsx)(l.e,{className:"shadow-none",color:"secondary",onClick:function(){n(!1)},children:"X"})]}),Object(m.jsx)(l.O,{children:Object(m.jsx)(l.eb,{children:Object(m.jsx)(l.s,{md:"12",children:Object(m.jsxs)(l.A,{children:[f&&f.map((function(e){return Object(m.jsx)(l.eb,{children:Object(m.jsx)(l.s,{md:"12",children:Object(m.jsxs)(l.C,{check:!0,children:[Object(m.jsx)(l.E,{onChange:function(t){var n;!function(e,t){var n=t.invoice_amount-t.prev_amount;!0===e.target.checked?(y(parseFloat(C)+parseFloat(n)),H(Object(r.a)(Object(r.a)({},P),{},{amount:(parseFloat(P.amount)+parseFloat(n)).toString()})),D.push(n)):(y(parseFloat(C)-parseFloat(n)),H(Object(r.a)(Object(r.a)({},P),{},{amount:parseFloat(P.amount)-parseFloat(n)})))}(t,e),n=e,!0===t.target.checked?S([].concat(Object(c.a)(N),[n])):(Y=function(e,t){var n=e.findIndex((function(e){return e.invoiceId===t}));return n>-1&&e.splice(n,1),e}(f,n.invoice_code),S(Y))},name:"invoice_code(prev_amount)",type:"checkbox"}),Object(m.jsxs)("span",{children:[e.invoice_code,"(",e.invoice_amount,") Paid - ",e.prev_amount]})]})})},e.invoice_id)})),Object(m.jsx)("br",{}),f&&f.length>0?Object(m.jsxs)(l.eb,{children:[Object(m.jsx)(l.s,{md:"12",children:Object(m.jsxs)(l.C,{children:[Object(m.jsx)(l.H,{children:"Amount"}),Object(m.jsx)(l.E,{type:"text",onChange:F,value:P&&P.amount,defaultValue:C.toString(),name:"amount"})]})}),Object(m.jsx)(l.s,{md:"12",children:Object(m.jsxs)(l.C,{children:[Object(m.jsx)(l.H,{children:"Date"}),Object(m.jsx)(l.E,{type:"date",onChange:F,value:P&&b()(P.receipt_date).format("YYYY-MM-DD"),name:"receipt_date"})]})}),Object(m.jsx)(l.s,{md:"12",children:Object(m.jsxs)(l.C,{children:[Object(m.jsxs)(l.H,{children:[" ","Mode Of Payment ",Object(m.jsx)("span",{className:"required",children:"*"})," "]}),Object(m.jsxs)(l.E,{type:"select",name:"mode_of_payment",onChange:F,children:[Object(m.jsx)("option",{value:"",selected:"selected",children:"Please Select"}),Object(m.jsx)("option",{value:"cash",children:"Cash"}),Object(m.jsx)("option",{value:"cheque",children:"Cheque"}),Object(m.jsx)("option",{value:"giro",children:"Giro"})]})]})}),P&&"cheque"===P.mode_of_payment&&Object(m.jsx)(l.s,{md:"12",children:Object(m.jsxs)(l.C,{children:[Object(m.jsx)(l.H,{children:"Check No"}),Object(m.jsx)(l.E,{type:"numbers",onChange:F,value:P&&P.cheque_no,name:"cheque_no"})]})}),P&&"cheque"===P.mode_of_payment&&Object(m.jsx)(l.s,{md:"12",children:Object(m.jsxs)(l.C,{children:[Object(m.jsx)(l.H,{children:"Check date"}),Object(m.jsx)(l.E,{type:"date",onChange:F,value:P&&P.cheque_date,name:"cheque_date"})]})}),P&&"cheque"===P.mode_of_payment&&Object(m.jsx)(l.s,{md:"12",children:Object(m.jsxs)(l.C,{children:[Object(m.jsx)(l.H,{children:"Bank"}),Object(m.jsx)(l.E,{type:"numbers",onChange:F,value:P&&P.bank_name,name:"bank_name"})]})}),Object(m.jsx)(l.s,{md:"12",children:Object(m.jsxs)(l.C,{children:[Object(m.jsx)(l.H,{children:"Notes"}),Object(m.jsx)(l.E,{type:"text",onChange:F,defaultValue:P&&P.remarks,name:"remarks"})]})})]}):Object(m.jsx)("span",{children:"Sorry"})]})})})}),Object(m.jsxs)(l.P,{children:[Object(m.jsxs)(l.e,{className:"shadow-none",color:"primary",onClick:function(){h.a.post("/commonApi/getCodeValue",{type:"receipt"}).then((function(e){R(e.data.data)})).catch((function(){R("")}))},children:[" ","Submit"," "]}),Object(m.jsx)(l.e,{className:"shadow-none",color:"secondary",onClick:function(){n(!1)},children:"Cancel"})]})]})})}}}]);
//# sourceMappingURL=221.ccf2e6ac.chunk.js.map