(this["webpackJsonpmain-bt5"]=this["webpackJsonpmain-bt5"]||[]).push([[243],{1152:function(e,s,c){"use strict";c.r(s);var t=c(4),a=c(6),l=c(27),i=c(1),d=c(667),n=c.n(d),j=(c(699),c(160)),r=c(971),m=c.n(r),o=c(12),b=c(7),x=c(2);s.default=function(){var e=Object(i.useRef)(null),s=Object(i.useState)(),c=Object(l.a)(s,2),d=c[0],r=c[1],h=Object(o.h)().id;Object(i.useEffect)((function(){b.a.post("tender/getQuotePDF",{quote_id:h}).then((function(e){console.log(e.data.data),r(e.data.data)}))}),[]);var O=function(){var e=Object(a.a)(Object(t.a)().mark((function e(){var s,c,a,l,i,d,r,o,b;return Object(t.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:s=j(".canvas_div_pdf").width(),c=j(".canvas_div_pdf").height(),a=15,i=1.5*(l=s+30)+30,d=s,r=c,o=Math.ceil(c/i)-1,b=new n.a("p","pt",[l,i]),m()(j(".canvas_div_pdf")[0],{allowTaint:!0}).then((function(e){e.getContext("2d"),console.log(e.height+e.width);var s=e.toDataURL("image/jpeg",1);b.addImage(s,"JPG",a,a,d,r);for(var c=1;c<=o;c++)b.addPage(l,i),b.addImage(s,"JPG",a,-i*c+60,d,r);b.save("Print-Link.pdf")}));case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(x.jsxs)("div",{children:[Object(x.jsx)("button",{type:"button",className:"button",onClick:O,children:"Generate PDF"}),Object(x.jsx)("div",{id:"pdf",className:"canvas_div_pdf",ref:e,children:Object(x.jsxs)("div",{className:"page-content container",children:[Object(x.jsxs)("div",{className:"text-blue-d2",children:[Object(x.jsx)("div",{className:"row",children:Object(x.jsx)("div",{className:"col-12",children:Object(x.jsx)("div",{className:"text-center text-150",children:Object(x.jsx)("img",{src:"/static/media/logo.9e5dbf9f.jpg",alt:"Logo"})})})}),Object(x.jsx)("div",{className:"page-tools"})]}),Object(x.jsxs)("div",{className:"page-header text-blue-d2",children:[Object(x.jsx)("p",{className:"text-sm text-grey-m2 ",children:Object(x.jsxs)("p",{className:"text-sm text-grey-m2",children:["Reg No:",Object(x.jsxs)("small",{className:"page-info",children:[Object(x.jsx)("i",{className:"fa fa-angle-double-right text-80"}),"201526293M"]})]})}),Object(x.jsx)("div",{className:"row",children:Object(x.jsx)("div",{className:"col-12",children:Object(x.jsx)("div",{className:"text-center ",children:Object(x.jsx)("span",{className:"text-default-d3",children:"QUOTATION"})})})}),Object(x.jsx)("div",{className:"page-tools d-flex ",children:Object(x.jsxs)("div",{className:"text-grey-m2 justify-content-end",children:[Object(x.jsx)("div",{className:"my-1",children:"10 Jalan Besar, #15-02 Sim Lim Tower,"}),Object(x.jsx)("div",{className:"my-1",children:"Singapore - 208787,"}),Object(x.jsx)("div",{className:"my-1",children:"Email:arif@usoftsolutions.com"})]})})]}),Object(x.jsx)("div",{className:"container px-0",children:Object(x.jsx)("div",{className:"row mt-4",children:Object(x.jsxs)("div",{className:"col-12 col-lg-12",children:[Object(x.jsxs)("div",{className:"row",children:[Object(x.jsxs)("div",{className:"col-sm-6",children:[Object(x.jsx)("div",{children:Object(x.jsx)("span",{className:"text-sm text-grey-m2 align-middle",children:"To:"})}),Object(x.jsxs)("div",{className:"text-grey-m2 ",children:[Object(x.jsxs)("div",{className:"my-1",children:[" ",d&&d[0].company_name]}),Object(x.jsxs)("div",{className:"my-1",children:[" ",d&&d[0].billing_address_flat]}),Object(x.jsxs)("div",{className:"my-1",children:[" ",d&&d[0].billing_address_street]}),Object(x.jsxs)("div",{className:"my-1",children:[" "," ".concat(d&&d[0].billing_address_country&&d[0].billing_address_po_code," ")]}),Object(x.jsxs)("div",{className:"my-1",children:[" ",d&&d[0].email]}),Object(x.jsx)("div",{className:"my-1",children:" oncompany.com"})]})]}),Object(x.jsxs)("div",{className:"text-95 col-sm-6 align-self-start d-sm-flex justify-content-end",children:[Object(x.jsx)("hr",{className:"d-sm-none"}),Object(x.jsxs)("div",{className:"text-grey-m2",children:[Object(x.jsxs)("div",{className:"mt-1 mb-2 text-secondary-m1 text-600 text-125",children:["Date : ",d&&d[0].quote_date.substring(1,10)]}),Object(x.jsx)("div",{className:"mt-1 mb-2 text-secondary-m1 text-600 text-125",children:d&&d[0].quote_code})]})]})]}),Object(x.jsx)("div",{className:"row mt-5",children:Object(x.jsx)("div",{className:"col-12",children:Object(x.jsxs)("div",{className:"text-grey-m2 ",children:[Object(x.jsx)("div",{className:"my-1",children:Object(x.jsxs)("b",{children:[" ",d&&d[0].salutation&&d[0].first_name," "]})}),Object(x.jsxs)("div",{className:"my-1 mt-3",children:[Object(x.jsx)("b",{children:"Project:-"})," ",d&&d[0].project_reference]}),Object(x.jsx)("div",{className:"my-1",children:" Dear Sir,"}),Object(x.jsxs)("div",{className:"my-1 mt-3",children:[" ","With reference to the above captions, we would like to thank you for inviting us to quote for the above mentioned works and we are pleased to submit herewith our Value Quotation for you kind persual."]})]})})}),Object(x.jsxs)("div",{className:"mt-4",children:[Object(x.jsxs)("div",{className:"row text-600 text-white bgc-default-tp1 py-25",children:[Object(x.jsx)("div",{className:"d-none d-sm-block col-1",children:"Sn"}),Object(x.jsx)("div",{className:"col-9 col-sm-3",children:"Description"}),Object(x.jsx)("div",{className:"d-none d-sm-block col-4 col-sm-1",children:"EA"}),Object(x.jsx)("div",{className:"d-none d-sm-block col-sm-1",children:"Qty"}),Object(x.jsx)("div",{className:"d-none d-sm-block col-sm-2",children:"U/R(S$)"}),Object(x.jsx)("div",{className:"d-none d-sm-block col-sm-2",children:"Amt(S$)"}),Object(x.jsx)("div",{className:"col-2",children:"Remarks"})]}),Object(x.jsx)("div",{className:"text-95 text-secondary-d3",children:Object(x.jsx)("div",{className:"row mb-2 mb-sm-0 py-25",children:d&&d.map((function(e){return Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)("div",{className:"d-none d-sm-block col-1",children:e.id}),Object(x.jsxs)("div",{className:"col-9 col-sm-3",children:[e.quote_item_title,Object(x.jsx)("p",{children:e.description})]}),Object(x.jsx)("div",{className:"d-none d-sm-block col-4 col-sm-1",children:e.unit}),Object(x.jsx)("div",{className:"d-none d-sm-block col-sm-1",children:e.quantity}),Object(x.jsx)("div",{className:"d-none d-sm-block col-sm-2",children:e.unit_price}),Object(x.jsx)("div",{className:"d-none d-sm-block col-sm-2",children:e.amount}),Object(x.jsx)("div",{className:"col-2"})]})}))})})]})]})})})]})})]})}}}]);
//# sourceMappingURL=243.ca6581fd.chunk.js.map