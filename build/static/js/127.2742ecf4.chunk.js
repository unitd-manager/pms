(this["webpackJsonpmain-bt5"]=this["webpackJsonpmain-bt5"]||[]).push([[127],{1419:function(t,e,n){"use strict";n.r(e);var r=n(27),p=n(1),s=n(277),i=(n(269),n(210),n(211),n(160)),o=n.n(i),c=(n(212),n(213),n(214),n(217),n(58)),a=n(63),l=n(7),d=n(142),x=n(201),_=n(2);e.default=function(){var t=Object(p.useState)(null),e=Object(r.a)(t,2),n=e[0],i=e[1],k=Object(p.useState)(null),m=Object(r.a)(k,2),j=m[0],y=m[1];Object(p.useEffect)((function(){l.a.get("project/getProjects").then((function(t){i(t.data.data),o()("#example").DataTable({pagingType:"full_numbers",pageLength:20,processing:!0,dom:"Bfrtip",buttons:[{extend:"print",text:"Print",className:"shadow-none btn btn-primary"}]}),y(!1)})).catch((function(){y(!1)}))}),[]);var b=[{name:"id",selector:"opportunity_id",grow:0,wrap:!0},{name:"Edit",selector:"edit",cell:function(){return Object(_.jsx)(s.a,{})},grow:0,width:"auto",button:!0,sortable:!1},{name:"Code",selector:"project_code",sortable:!0,grow:0,wrap:!0},{name:"Title",selector:"title",sortable:!0,grow:2,wrap:!0},{name:"company",selector:"company_name",sortable:!0,grow:0},{name:"contact",selector:"contact_name",sortable:!0,width:"auto",grow:3},{name:"Category",selector:"category",sortable:!0,grow:2,width:"auto"},{name:"Status",selector:"status",sortable:!0,grow:2,wrap:!0}];return Object(_.jsx)("div",{className:"MainDiv",children:Object(_.jsxs)("div",{className:" pt-xs-25",children:[Object(_.jsx)(d.a,{}),Object(_.jsxs)(x.a,{loading:j,title:"Project List",Button:Object(_.jsx)(c.b,{to:"/ProjectDetails",children:Object(_.jsx)(a.e,{color:"primary",className:"shadow-none",children:"Add New"})}),children:[Object(_.jsx)("thead",{children:Object(_.jsx)("tr",{children:b.map((function(t){return Object(_.jsx)("td",{children:t.name},t.name)}))})}),Object(_.jsx)("tbody",{children:n&&n.map((function(t,e){return Object(_.jsxs)("tr",{children:[Object(_.jsx)("td",{children:e+1}),Object(_.jsx)("td",{children:Object(_.jsx)(c.b,{to:"/ProjectEdit/".concat(t.project_id),children:Object(_.jsx)(s.a,{})})}),Object(_.jsx)("td",{children:t.project_code}),Object(_.jsx)("td",{children:t.title}),Object(_.jsx)("td",{children:t.company_name}),Object(_.jsx)("td",{children:t.contact_name}),Object(_.jsx)("td",{children:t.category}),Object(_.jsx)("td",{children:t.status})]},t.project_id)}))})]})]})})}},142:function(t,e,n){"use strict";var r=n(63),p=n(12),s=n(58),i=n(2);e.a=function(t){var e=Object(p.f)(),n=e.pathname.split("/")[1],o=e.pathname.split("/")[2];return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)("h4",{children:t.heading}),Object(i.jsxs)(r.c,{children:[Object(i.jsx)(r.d,{to:"/",tag:s.b,className:"text-decoration-none",children:"Home"}),n?Object(i.jsx)(r.d,{active:!0,children:n}):"",o?Object(i.jsx)(r.d,{active:!0,children:o}):""]})]})}},200:function(t){t.exports=JSON.parse('{"assets":[],"layers":[{"ddd":0,"ind":0,"ty":4,"nm":"\u5f62\u72b6\u56fe\u5c42 5","ks":{"o":{"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.333],"y":[0]},"n":["0p833_0p833_0p333_0"],"t":8,"s":[100],"e":[30]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.333],"y":[0]},"n":["0p833_0p833_0p333_0"],"t":24,"s":[30],"e":[100]},{"t":40}]},"r":{"k":0},"p":{"k":[187.875,77.125,0]},"a":{"k":[-76.375,-2.875,0]},"s":{"k":[{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,0.833]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0.333]},"n":["0p833_0p833_0p333_0","0p833_0p833_0p333_0","0p833_0p833_0p333_0p333"],"t":8,"s":[100,100,100],"e":[200,200,100]},{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,0.833]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0.333]},"n":["0p833_0p833_0p333_0","0p833_0p833_0p333_0","0p833_0p833_0p333_0p333"],"t":24,"s":[200,200,100],"e":[100,100,100]},{"t":40}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"k":[18,18]},"p":{"k":[0,0]},"nm":"\u692d\u5706\u8def\u5f84 1","mn":"ADBE Vector Shape - Ellipse"},{"ty":"st","c":{"k":[1,1,1,1]},"o":{"k":100},"w":{"k":0},"lc":1,"lj":1,"ml":4,"nm":"\u63cf\u8fb9 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"fl","c":{"k":[0.3137254901960784,0.803921568627451,0.5372549019607843,1]},"o":{"k":100},"nm":"\u586b\u5145 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"k":[-76.482,-3.482],"ix":2},"a":{"k":[0,0],"ix":1},"s":{"k":[100,100],"ix":3},"r":{"k":0,"ix":6},"o":{"k":100,"ix":7},"sk":{"k":0,"ix":4},"sa":{"k":0,"ix":5},"nm":"\u53d8\u6362"}],"nm":"\u692d\u5706 1","np":3,"mn":"ADBE Vector Group"}],"ip":0,"op":40,"st":0,"bm":0,"sr":1},{"ddd":0,"ind":1,"ty":4,"nm":"\u5f62\u72b6\u56fe\u5c42 4","ks":{"o":{"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.333],"y":[0]},"n":["0p833_0p833_0p333_0"],"t":6,"s":[100],"e":[30]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.333],"y":[0]},"n":["0p833_0p833_0p333_0"],"t":22,"s":[30],"e":[100]},{"t":36}]},"r":{"k":0},"p":{"k":[162.125,76.625,0]},"a":{"k":[-76.375,-2.875,0]},"s":{"k":[{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,0.833]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0.333]},"n":["0p833_0p833_0p333_0","0p833_0p833_0p333_0","0p833_0p833_0p333_0p333"],"t":6,"s":[100,100,100],"e":[200,200,100]},{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,0.833]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0.333]},"n":["0p833_0p833_0p333_0","0p833_0p833_0p333_0","0p833_0p833_0p333_0p333"],"t":22,"s":[200,200,100],"e":[100,100,100]},{"t":36}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"k":[18,18]},"p":{"k":[0,0]},"nm":"\u692d\u5706\u8def\u5f84 1","mn":"ADBE Vector Shape - Ellipse"},{"ty":"st","c":{"k":[1,1,1,1]},"o":{"k":100},"w":{"k":0},"lc":1,"lj":1,"ml":4,"nm":"\u63cf\u8fb9 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"fl","c":{"k":[1,0.8392156862745098,0.34509803921568627,1]},"o":{"k":100},"nm":"\u586b\u5145 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"k":[-76.482,-3.482],"ix":2},"a":{"k":[0,0],"ix":1},"s":{"k":[100,100],"ix":3},"r":{"k":0,"ix":6},"o":{"k":100,"ix":7},"sk":{"k":0,"ix":4},"sa":{"k":0,"ix":5},"nm":"\u53d8\u6362"}],"nm":"\u692d\u5706 1","np":3,"mn":"ADBE Vector Group"}],"ip":0,"op":40,"st":0,"bm":0,"sr":1},{"ddd":0,"ind":2,"ty":4,"nm":"\u5f62\u72b6\u56fe\u5c42 3","ks":{"o":{"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.333],"y":[0]},"n":["0p833_0p833_0p333_0"],"t":4,"s":[100],"e":[30]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.333],"y":[0]},"n":["0p833_0p833_0p333_0"],"t":20,"s":[30],"e":[100]},{"t":32}]},"r":{"k":0},"p":{"k":[135.625,76.625,0]},"a":{"k":[-76.375,-2.875,0]},"s":{"k":[{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,0.833]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0.333]},"n":["0p833_0p833_0p333_0","0p833_0p833_0p333_0","0p833_0p833_0p333_0p333"],"t":4,"s":[100,100,100],"e":[200,200,100]},{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,0.833]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0.333]},"n":["0p833_0p833_0p333_0","0p833_0p833_0p333_0","0p833_0p833_0p333_0p333"],"t":20,"s":[200,200,100],"e":[100,100,100]},{"t":32}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"k":[18,18]},"p":{"k":[0,0]},"nm":"\u692d\u5706\u8def\u5f84 1","mn":"ADBE Vector Shape - Ellipse"},{"ty":"st","c":{"k":[1,1,1,1]},"o":{"k":100},"w":{"k":0},"lc":1,"lj":1,"ml":4,"nm":"\u63cf\u8fb9 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"fl","c":{"k":[0,0.7490196078431373,0.9529411764705882,1]},"o":{"k":100},"nm":"\u586b\u5145 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"k":[-76.482,-3.482],"ix":2},"a":{"k":[0,0],"ix":1},"s":{"k":[100,100],"ix":3},"r":{"k":0,"ix":6},"o":{"k":100,"ix":7},"sk":{"k":0,"ix":4},"sa":{"k":0,"ix":5},"nm":"\u53d8\u6362"}],"nm":"\u692d\u5706 1","np":3,"mn":"ADBE Vector Group"}],"ip":0,"op":40,"st":0,"bm":0,"sr":1},{"ddd":0,"ind":3,"ty":4,"nm":"\u5f62\u72b6\u56fe\u5c42 2","ks":{"o":{"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.333],"y":[0]},"n":["0p833_0p833_0p333_0"],"t":2,"s":[100],"e":[30]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.333],"y":[0]},"n":["0p833_0p833_0p333_0"],"t":16,"s":[30],"e":[100]},{"t":28}]},"r":{"k":0},"p":{"k":[109.375,76.625,0]},"a":{"k":[-76.625,-3.125,0]},"s":{"k":[{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,0.833]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0.333]},"n":["0p833_0p833_0p333_0","0p833_0p833_0p333_0","0p833_0p833_0p333_0p333"],"t":2,"s":[100,100,100],"e":[200,200,100]},{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,0.833]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0.333]},"n":["0p833_0p833_0p333_0","0p833_0p833_0p333_0","0p833_0p833_0p333_0p333"],"t":16,"s":[200,200,100],"e":[100,100,100]},{"t":28}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"k":[18,18]},"p":{"k":[0,0]},"nm":"\u692d\u5706\u8def\u5f84 1","mn":"ADBE Vector Shape - Ellipse"},{"ty":"st","c":{"k":[1,1,1,1]},"o":{"k":100},"w":{"k":0},"lc":1,"lj":1,"ml":4,"nm":"\u63cf\u8fb9 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"fl","c":{"k":[0.9490196078431372,0.39215686274509803,0.36470588235294116,1]},"o":{"k":100},"nm":"\u586b\u5145 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"k":[-76.482,-3.482],"ix":2},"a":{"k":[0,0],"ix":1},"s":{"k":[100,100],"ix":3},"r":{"k":0,"ix":6},"o":{"k":100,"ix":7},"sk":{"k":0,"ix":4},"sa":{"k":0,"ix":5},"nm":"\u53d8\u6362"}],"nm":"\u692d\u5706 1","np":3,"mn":"ADBE Vector Group"}],"ip":0,"op":40,"st":0,"bm":0,"sr":1},{"ddd":0,"ind":4,"ty":4,"nm":"\u5f62\u72b6\u56fe\u5c42 1","ks":{"o":{"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.333],"y":[0]},"n":["0p833_0p833_0p333_0"],"t":0,"s":[100],"e":[30]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.333],"y":[0]},"n":["0p833_0p833_0p333_0"],"t":12,"s":[30],"e":[100]},{"t":24}]},"r":{"k":0},"p":{"k":[82.625,76.625,0]},"a":{"k":[-76.625,-3.375,0]},"s":{"k":[{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,0.833]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0.333]},"n":["0p833_0p833_0p333_0","0p833_0p833_0p333_0","0p833_0p833_0p333_0p333"],"t":0,"s":[100,100,100],"e":[200,200,100]},{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,0.833]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0.333]},"n":["0p833_0p833_0p333_0","0p833_0p833_0p333_0","0p833_0p833_0p333_0p333"],"t":12,"s":[200,200,100],"e":[100,100,100]},{"t":24}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"k":[18,18]},"p":{"k":[0,0]},"nm":"\u692d\u5706\u8def\u5f84 1","mn":"ADBE Vector Shape - Ellipse"},{"ty":"st","c":{"k":[1,1,1,1]},"o":{"k":100},"w":{"k":0},"lc":1,"lj":1,"ml":4,"nm":"\u63cf\u8fb9 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"fl","c":{"k":[0,0,0,1]},"o":{"k":100},"nm":"\u586b\u5145 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"k":[-76.482,-3.482],"ix":2},"a":{"k":[0,0],"ix":1},"s":{"k":[100,100],"ix":3},"r":{"k":0,"ix":6},"o":{"k":100,"ix":7},"sk":{"k":0,"ix":4},"sa":{"k":0,"ix":5},"nm":"\u53d8\u6362"}],"nm":"\u692d\u5706 1","np":3,"mn":"ADBE Vector Group"}],"ip":0,"op":40,"st":0,"bm":0,"sr":1}],"v":"4.5.4","ddd":0,"ip":0,"op":40,"fr":24,"w":280,"h":160}')},201:function(t,e,n){"use strict";var r=n(63),p=(n(1),n(207)),s=n.n(p),i=n(200),o=n(2),c=function(){var t={loop:!0,autoplay:!0,renderer:"svg",animationData:i,rendererSettings:{preserveAspectRatio:"xMidYMid slice"}};return Object(o.jsx)("div",{children:Object(o.jsx)(s.a,{options:t,height:100,width:100})})};e.a=function(t){return Object(o.jsx)("div",{children:Object(o.jsx)(r.i,{children:Object(o.jsxs)(r.j,{children:[Object(o.jsxs)(r.eb,{className:"mb-2 title_border",children:[Object(o.jsxs)(r.s,{children:[Object(o.jsx)(r.o,{tag:"h5",children:t.title}),Object(o.jsx)(r.m,{className:"mb-2 text-muted",tag:"h6",children:t.subtitle})]}),Object(o.jsx)(r.s,{className:"d-flex",style:{justifyContent:"flex-end"},xl:3,sm:12,children:t.Button})]}),t.loading?Object(o.jsx)(c,{}):Object(o.jsx)(r.ib,{id:"example",className:"no-wrap mt-3 align-middle example ".concat(t.additionalClasses),striped:!0,responsive:!0,borderless:!0,children:t.children})]})})})}},277:function(t,e,n){"use strict";var r=n(1),p=n.n(r),s=n(0),i=n.n(s);function o(){return o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},o.apply(this,arguments)}function c(t,e){if(null==t)return{};var n,r,p=function(t,e){if(null==t)return{};var n,r,p={},s=Object.keys(t);for(r=0;r<s.length;r++)n=s[r],e.indexOf(n)>=0||(p[n]=t[n]);return p}(t,e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);for(r=0;r<s.length;r++)n=s[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(p[n]=t[n])}return p}var a=Object(r.forwardRef)((function(t,e){var n=t.color,r=void 0===n?"currentColor":n,s=t.size,i=void 0===s?24:s,a=c(t,["color","size"]);return p.a.createElement("svg",o({ref:e,xmlns:"http://www.w3.org/2000/svg",width:i,height:i,viewBox:"0 0 24 24",fill:"none",stroke:r,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},a),p.a.createElement("path",{d:"M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"}))}));a.propTypes={color:i.a.string,size:i.a.oneOfType([i.a.string,i.a.number])},a.displayName="Edit2",e.a=a}}]);
//# sourceMappingURL=127.2742ecf4.chunk.js.map