(this.webpackJsonpproject_1_frontend=this.webpackJsonpproject_1_frontend||[]).push([[0],{169:function(e,t,a){},197:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(60),s=a.n(r),i=(a(169),a(10)),l=a(22),o=a(13),d=(a(87),a(170),a(209)),j=a(12),u=a.n(j),b=a(26),h=a(212),O=a(214),p=a(215),m=a(208),g=a(217),x=a(213),f=a(27),v=a.n(f),C=a(1),y=function(){var e,t=Object(n.useState)({validLogin:!0}),a=Object(i.a)(t,2),r=a[0],s=a[1],l=Object(n.useState)({email:"",password:""}),d=Object(i.a)(l,2),j=d[0],f=d[1],y=function(e){"email"==e.target.id?f({email:e.target.value,password:j.password}):f({email:j.email,password:e.target.value})},k=Object(o.f)(),w=function(){var e=Object(b.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,v.a.get("http://localhost:8080/api/users/"+j.email).then((function(e){switch(e.status){case 200:if(void 0==e.data[0].password){s({validLogin:!1});break}if(e.data[0].password!==j.password){s({validLogin:!1});break}if(s({validLogin:!0}),localStorage.setItem("user",JSON.stringify(e.data[0])),e.data[0].manager){k.push("/ManagerHome");break}k.push("/EmployeeHome");break;case 400:console.log("There was something wrong with the requested format");break;case 404:console.log("Not found");break;default:console.log("Something else happened")}}));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return e=r.validLogin?"":Object(C.jsx)(h.a,{negative:!0,children:Object(C.jsx)(h.a.Header,{children:"Invalid Email or Password"})}),Object(C.jsx)(c.a.Fragment,{children:Object(C.jsx)(O.a,{textAlign:"center",style:{height:"75vh"},verticalAlign:"middle",children:Object(C.jsxs)(O.a.Column,{style:{maxWidth:450},children:[Object(C.jsx)(p.a,{as:"h2",color:"black",textAlign:"center",children:"Log-in to your account"}),e,Object(C.jsx)(m.a,{size:"large",children:Object(C.jsxs)(g.a,{stacked:!0,children:[Object(C.jsx)(m.a.Input,{id:"email",fluid:!0,icon:"user",iconPosition:"left",placeholder:"E-mail address",onChange:y}),Object(C.jsx)(m.a.Input,{id:"password",fluid:!0,icon:"lock",iconPosition:"left",placeholder:"Password",type:"password",onChange:y}),Object(C.jsx)(x.a,{type:"submit",onClick:w,color:"black",fluid:!0,size:"large",children:"Login"})]})})]})})})},k=a(11),w=a(85),N=a(211),S=a(86),I=a(152),H=a(153),A=a(210),P=new(function(){function e(){Object(I.a)(this,e)}return Object(H.a)(e,[{key:"resolvedTable",value:function(e){return e.filter((function(e){return 0==e.pending})).map((function(e){return Object(C.jsxs)(A.a.Row,{children:[Object(C.jsx)(A.a.Cell,{children:e._id}),Object(C.jsxs)(A.a.Cell,{children:["$",e.money]}),Object(C.jsx)(A.a.Cell,{children:e.message}),Object(C.jsx)(A.a.Cell,{children:e.date}),e.approved?Object(C.jsxs)(A.a.Cell,{positive:!0,children:[Object(C.jsx)(S.a,{name:"checkmark"}),"Approved"]}):Object(C.jsxs)(A.a.Cell,{negative:!0,children:[Object(C.jsx)(S.a,{name:"close"}),"Denied"]}),Object(C.jsx)(A.a.Cell,{children:e.manager})]})}))}},{key:"pendingTable",value:function(e){return e.filter((function(e){return 1==e.pending})).map((function(e){return Object(C.jsxs)(A.a.Row,{children:[Object(C.jsx)(A.a.Cell,{children:e._id}),Object(C.jsxs)(A.a.Cell,{children:["$",e.money]}),Object(C.jsx)(A.a.Cell,{children:e.message}),Object(C.jsx)(A.a.Cell,{children:e.date})]})}))}},{key:"assembleReimbursementTable",value:function(e,t){return Object(C.jsxs)(A.a,{striped:!0,children:[Object(C.jsx)(A.a.Header,{children:Object(C.jsxs)(A.a.Row,{children:[Object(C.jsx)(A.a.HeaderCell,{children:"ID"}),Object(C.jsx)(A.a.HeaderCell,{children:"Amount"}),Object(C.jsx)(A.a.HeaderCell,{children:"Reason"}),Object(C.jsx)(A.a.HeaderCell,{children:"Date"}),t?null:Object(C.jsx)(A.a.HeaderCell,{children:"Approved"}),t?null:Object(C.jsx)(A.a.HeaderCell,{children:"Manager"})]})}),Object(C.jsx)(A.a.Body,{children:t?this.pendingTable(e):this.resolvedTable(e)})]})}}],[{key:"assembleReimbursementTable",value:function(e,t){throw new Error("Method not implemented.")}}]),e}()),_=function(){console.log(localStorage.getItem("user"));var e=c.a.useState(!1),t=Object(i.a)(e,2),a=t[0],r=t[1],s=Object(n.useState)([]),l=Object(i.a)(s,2),d=l[0],j=l[1],h=Object(n.useState)(!1),f=Object(i.a)(h,2),y=f[0],I=f[1],H=Object(o.f)();""==localStorage.getItem("user")&&H.push("./Login");var A=Object(n.useState)(JSON.parse(localStorage.getItem("user"))),_=Object(i.a)(A,2),R=_[0],L=_[1];R.manager&&H.push("./ManagerHome");var T=Object(n.useState)({employee:R._id,money:"",message:"",date:""}),E=Object(i.a)(T,2),D=E[0],J=E[1];Object(n.useEffect)((function(){L(JSON.parse(localStorage.getItem("user"))),Object(b.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.a.get("http://localhost:8080/api/reimbursements/"+R._id,{headers:{"Content-Type":"application/json"}});case 2:t=e.sent,j(t.data);case 4:case"end":return e.stop()}}),e)})))()}),[]);var F=function(){var e=Object(b.a)(u.a.mark((function e(t){var a,n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r(!1),t.preventDefault(),""!=D.money&&""!=D.date){e.next=4;break}return e.abrupt("return");case 4:return e.next=6,v.a.post("http://localhost:8080/api/reimbursements/add",D,{headers:{"Content-Type":"application/json"}});case 6:a=e.sent,console.log(a.data),n=[].concat(Object(w.a)(d),[a.data]),j(n);case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),U=function(e){I(!y)},q=function(e){switch(e.target.id){case"money":J(Object(k.a)(Object(k.a)({},D),{},{money:e.target.value}));break;case"message":J(Object(k.a)(Object(k.a)({},D),{},{message:e.target.value}));break;case"date":J(Object(k.a)(Object(k.a)({},D),{},{date:e.target.value}))}};return Object(C.jsx)("div",{children:Object(C.jsx)(c.a.Fragment,{children:Object(C.jsx)(O.a,{textAlign:"center",style:{height:"75vh"},verticalAlign:"middle",children:Object(C.jsxs)(O.a.Column,{style:{width:"90%"},children:[Object(C.jsxs)(p.a,{children:["Welcome ",R.firstName," ",R.lastName]}),Object(C.jsx)(g.a,{children:Object(C.jsxs)(O.a,{children:[Object(C.jsxs)(O.a.Column,{width:"9",children:[Object(C.jsx)(x.a,{id:"pending",toggle:!0,active:y,onClick:U,children:"Pending"}),Object(C.jsx)(x.a,{id:"resolved",toggle:!0,active:!y,onClick:U,children:"Resolved"})]}),Object(C.jsx)(O.a.Column,{width:"7",children:Object(C.jsxs)(N.a,{closeIcon:!0,open:a,trigger:Object(C.jsxs)(x.a,{icon:!0,labelPosition:"left",primary:!0,children:[Object(C.jsx)(S.a,{name:"edit"}),"Add Reimbursement"]}),onClose:function(){return r(!1)},onOpen:function(){return r(!0)},children:[Object(C.jsx)(p.a,{icon:"edit",position:"center",content:"Add a new Reimbursement"}),Object(C.jsx)(N.a.Content,{children:Object(C.jsx)(m.a,{size:"large",children:Object(C.jsxs)(g.a,{stacked:!0,children:[Object(C.jsx)(m.a.Input,{id:"money",fluid:!0,icon:"dollar sign",iconPosition:"left",placeholder:"Amount($)",onChange:q}),Object(C.jsx)(m.a.Input,{id:"message",fluid:!0,icon:"comment",iconPosition:"left",placeholder:"Reason",onChange:q}),Object(C.jsx)(m.a.Input,{id:"date",fluid:!0,icon:"calendar outline",iconPosition:"left",placeholder:"mm/dd/yyyy",onChange:q}),Object(C.jsxs)(x.a,{color:"green",type:"submit",onClick:F,fluid:!0,size:"large",children:[Object(C.jsx)(S.a,{name:"checkmark"}),"Add Reimbursement"]})]})})})]})})]})}),P.assembleReimbursementTable(d,y)]})})})})},R=function(){return localStorage.setItem("user",""),Object(C.jsx)(c.a.Fragment,{children:Object(C.jsx)(O.a,{textAlign:"center",style:{height:"75vh"},verticalAlign:"middle",children:Object(C.jsxs)(O.a.Column,{style:{maxWidth:450},children:[Object(C.jsx)(p.a,{as:"h2",color:"black",textAlign:"center",children:"You are now logged out."}),Object(C.jsxs)(g.a,{children:[Object(C.jsx)("span",{children:Object(C.jsx)(l.b,{to:"/Login",children:"Login"})}),Object(C.jsx)(o.a,{path:"/Login",children:Object(C.jsx)(y,{})})]})]})})})},L=function(){console.log(localStorage.getItem("user"));var e=c.a.useState(!1),t=Object(i.a)(e,2),a=t[0],r=t[1],s=Object(n.useState)([]),l=Object(i.a)(s,2),d=l[0],j=l[1],h=Object(n.useState)([]),f=Object(i.a)(h,2),y=f[0],I=f[1],H=Object(n.useState)({employee:!0,pending:!1,resolved:!1}),P=Object(i.a)(H,2),_=P[0],R=P[1],L=Object(n.useState)(!1),T=Object(i.a)(L,2),E=T[0],D=T[1],J=Object(n.useState)({email:"",password:"",firstName:"",lastName:""}),F=Object(i.a)(J,2),U=F[0],q=F[1],z=Object(o.f)();""==localStorage.getItem("user")&&z.push("./Login");var B=Object(n.useState)(JSON.parse(localStorage.getItem("user"))),M=Object(i.a)(B,2),W=M[0],$=M[1];W.manager||z.push("./EmployeeHome");var V=function(){var e={email:U.email,password:U.password,firstName:U.firstName,lastName:U.lastName,manager:E};return v.a.post("http://localhost:8080/api/users/add/",e,{headers:{"Content-Type":"application/json"}})},G=function(e,t){var a={_id:e,approved:t,manager:W.firstName+" "+W.lastName};return v.a.put("http://localhost:8080/api/reimbursements/update",a,{headers:{"Content-Type":"application/json"}})},Y=function(){var e=Object(b.a)(u.a.mark((function e(t){var a,n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(""!=U.email&&""!=U.password&&""!=U.firstName&&""!=U.lastName){e.next=2;break}return e.abrupt("return");case 2:return t.preventDefault(),e.next=5,V();case 5:a=e.sent,D(!1),n=[].concat(Object(w.a)(d),[a.data]),j(n);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),K=function(){var e=Object(b.a)(u.a.mark((function e(t){var a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),a=d.find((function(e){return e._id==t.target.value})),z.push("/employee/"+(null===a||void 0===a?void 0:a._id)+"/"+(null===a||void 0===a?void 0:a.lastName)+"/"+(null===a||void 0===a?void 0:a.firstName));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Q=function(){var e=Object(b.a)(u.a.mark((function e(t){var a,n,c,r,s,i;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),"approve"!=t.target.id){e.next=11;break}return e.next=4,G(t.target.value,!0);case 4:a=e.sent,console.log(a),n=y.filter((function(e){return e._id!=a.data._id})),c=[].concat(Object(w.a)(n),[a.data]),I(c),e.next=22;break;case 11:return e.next=13,G(t.target.value,!1);case 13:r=e.sent,console.log(r),console.log(y),s=y.filter((function(e){return e._id!=r.data._id})),console.log(s),i=[].concat(Object(w.a)(s),[r.data]),console.log(r.data),console.log(y),I(i);case 22:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();Object(n.useEffect)((function(){$(JSON.parse(localStorage.getItem("user"))),Object(b.a)(u.a.mark((function e(){var t,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.a.get("http://localhost:8080/api/users/",{headers:{"Content-Type":"application/json"}});case 2:return t=e.sent,e.next=5,v.a.get("http://localhost:8080/api/reimbursements",{headers:{"Content-Type":"application/json"}});case 5:a=e.sent,j(t.data),I(a.data);case 8:case"end":return e.stop()}}),e)})))()}),[]);var X=function(e){switch(e.target.id){case"employee":R({employee:!0,pending:!1,resolved:!1});break;case"pending":R({employee:!1,pending:!0,resolved:!1});break;case"resolved":R({employee:!1,pending:!1,resolved:!0});break;case"manager":D(!E)}},Z=function(e){switch(e.target.id){case"email":q(Object(k.a)(Object(k.a)({},U),{},{email:e.target.value}));break;case"password":q(Object(k.a)(Object(k.a)({},U),{},{password:e.target.value}));break;case"firstName":q(Object(k.a)(Object(k.a)({},U),{},{firstName:e.target.value}));break;case"lastName":q(Object(k.a)(Object(k.a)({},U),{},{lastName:e.target.value}))}};return Object(C.jsx)("div",{children:Object(C.jsx)(c.a.Fragment,{children:Object(C.jsx)(O.a,{textAlign:"center",style:{height:"75vh"},verticalAlign:"middle",children:Object(C.jsxs)(O.a.Column,{style:{width:"90%"},children:[Object(C.jsxs)(p.a,{children:["Welcome ",W.firstName," ",W.lastName]}),Object(C.jsx)(g.a,{children:Object(C.jsxs)(O.a,{children:[Object(C.jsxs)(O.a.Column,{width:"9",children:[Object(C.jsx)(x.a,{id:"employee",toggle:!0,active:_.employee,onClick:X,children:"Employees"}),Object(C.jsx)(x.a,{id:"pending",toggle:!0,active:_.pending,onClick:X,children:"Pending"}),Object(C.jsx)(x.a,{id:"resolved",toggle:!0,active:_.resolved,onClick:X,children:"Resolved"})]}),Object(C.jsx)(O.a.Column,{width:"7",children:Object(C.jsxs)(N.a,{closeIcon:!0,open:a,trigger:Object(C.jsxs)(x.a,{icon:!0,labelPosition:"left",primary:!0,children:[Object(C.jsx)(S.a,{name:"user"}),"Add User"]}),onClose:function(){return r(!1)},onOpen:function(){return r(!0)},children:[Object(C.jsx)(p.a,{icon:"address book",position:"center",content:"Add a new User"}),Object(C.jsx)(N.a.Content,{children:Object(C.jsx)(m.a,{size:"large",children:Object(C.jsxs)(g.a,{stacked:!0,children:[Object(C.jsx)(m.a.Input,{id:"email",fluid:!0,icon:"at",iconPosition:"left",placeholder:"Email address",onChange:Z,required:!0}),Object(C.jsx)(m.a.Input,{id:"password",fluid:!0,icon:"lock",iconPosition:"left",placeholder:"Password",onChange:Z,required:!0}),Object(C.jsx)(m.a.Input,{id:"firstName",fluid:!0,icon:"user",iconPosition:"left",placeholder:"First name",onChange:Z,required:!0}),Object(C.jsx)(m.a.Input,{id:"lastName",fluid:!0,icon:"user",iconPosition:"left",placeholder:"Last name",onChange:Z,required:!0}),Object(C.jsx)(m.a.Checkbox,{id:"manager",fluid:!0,icon:"certificate",iconPosition:"left",label:"Are they a manager?",onChange:X}),Object(C.jsxs)(x.a,{color:"green",type:"submit",onClick:Y,fluid:!0,size:"large",children:[Object(C.jsx)(S.a,{name:"checkmark"}),"Add User"]})]})})})]})})]})}),_.employee?Object(C.jsxs)(A.a,{striped:!0,children:[Object(C.jsx)(A.a.Header,{children:Object(C.jsxs)(A.a.Row,{children:[Object(C.jsx)(A.a.HeaderCell,{children:"ID"}),Object(C.jsx)(A.a.HeaderCell,{children:"Name"}),Object(C.jsx)(A.a.HeaderCell,{children:"E-mail address"}),Object(C.jsx)(A.a.HeaderCell,{width:"2",children:"See Requests"})]})}),Object(C.jsx)(A.a.Body,{children:d.filter((function(e){return!e.manager})).map((function(e){return Object(C.jsxs)(A.a.Row,{children:[Object(C.jsx)(A.a.Cell,{children:e._id}),Object(C.jsxs)(A.a.Cell,{children:[e.firstName," ",e.lastName]}),Object(C.jsx)(A.a.Cell,{children:e.email}),Object(C.jsx)(A.a.Cell,{collapsing:!0,children:Object(C.jsx)(x.a,{type:"submit",value:e._id,onClick:K,basic:!0,color:"black",children:"Requests"})})]})}))})]}):function(){var e,t=Object(C.jsx)(A.a.HeaderCell,{children:"Deny / Approve"});return _.resolved&&(t=Object(C.jsx)(A.a.HeaderCell,{children:"Approved"}),e=Object(C.jsx)(A.a.HeaderCell,{children:"Manager"})),Object(C.jsxs)(A.a,{striped:!0,children:[Object(C.jsx)(A.a.Header,{children:Object(C.jsxs)(A.a.Row,{children:[Object(C.jsx)(A.a.HeaderCell,{children:"ID"}),Object(C.jsx)(A.a.HeaderCell,{children:"Employee"}),Object(C.jsx)(A.a.HeaderCell,{children:"Amount"}),Object(C.jsx)(A.a.HeaderCell,{children:"Reason"}),Object(C.jsx)(A.a.HeaderCell,{children:"Date"}),t,e]})}),Object(C.jsx)(A.a.Body,{children:_.pending?y.filter((function(e){return 1==e.pending})).map((function(e){var t,a;return Object(C.jsxs)(A.a.Row,{children:[Object(C.jsx)(A.a.Cell,{children:e._id}),Object(C.jsxs)(A.a.Cell,{children:[null===(t=d.find((function(t){return t._id==e.employee})))||void 0===t?void 0:t.firstName," "," ",null===(a=d.find((function(t){return t._id==e.employee})))||void 0===a?void 0:a.lastName]}),Object(C.jsxs)(A.a.Cell,{children:["$",e.money]}),Object(C.jsx)(A.a.Cell,{children:e.message}),Object(C.jsx)(A.a.Cell,{children:e.date}),Object(C.jsxs)(x.a.Group,{children:[Object(C.jsx)(x.a,{id:"deny",value:e._id,negative:!0,type:"submit",onClick:Q,children:"Deny"}),Object(C.jsx)(x.a.Or,{}),Object(C.jsx)(x.a,{id:"approve",value:e._id,positive:!0,type:"submit",onClick:Q,children:"Approve"})]})]})})):y.filter((function(e){return 0==e.pending})).map((function(e){var t,a;return Object(C.jsxs)(A.a.Row,{children:[Object(C.jsx)(A.a.Cell,{children:e._id}),Object(C.jsxs)(A.a.Cell,{children:[null===(t=d.find((function(t){return t._id==e.employee})))||void 0===t?void 0:t.firstName," "," ",null===(a=d.find((function(t){return t._id==e.employee})))||void 0===a?void 0:a.lastName]}),Object(C.jsxs)(A.a.Cell,{children:["$",e.money]}),Object(C.jsx)(A.a.Cell,{children:e.message}),Object(C.jsx)(A.a.Cell,{children:e.date}),e.approved?Object(C.jsxs)(A.a.Cell,{positive:!0,children:[Object(C.jsx)(S.a,{name:"checkmark"}),"Approved"]}):Object(C.jsxs)(A.a.Cell,{negative:!0,children:[Object(C.jsx)(S.a,{name:"close"}),"Denied"]}),Object(C.jsx)(A.a.Cell,{children:e.manager})]})}))})]})}()]})})})})},T=function(){var e=Object(o.f)(),t=Object(n.useState)(!1),a=Object(i.a)(t,2),r=a[0],s=a[1],l=Object(n.useState)(!1),d=Object(i.a)(l,2),j=d[0],f=d[1];""==localStorage.getItem("user")&&e.push("./Login");var y,w=Object(n.useState)(JSON.parse(localStorage.getItem("user"))),N=Object(i.a)(w,2),S=N[0],I=N[1],H=function(e){switch(e.target.id){case"email":I(Object(k.a)(Object(k.a)({},S),{},{email:e.target.value}));break;case"password":I(Object(k.a)(Object(k.a)({},S),{},{password:e.target.value}));break;case"firstName":I(Object(k.a)(Object(k.a)({},S),{},{firstName:e.target.value}));break;case"lastName":I(Object(k.a)(Object(k.a)({},S),{},{lastName:e.target.value}))}},A=function(){var t=Object(b.a)(u.a.mark((function t(a){return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(a.preventDefault(),f(!1),s(!1),""!=S.email&&""!=S.password&&""!=S.firstName&&""!=S.lastName){t.next=6;break}return f(!0),t.abrupt("return");case 6:return t.next=8,v.a.put("http://localhost:8080/api/users/update/",S,{headers:{"Content-Type":"application/json"}}).then((function(t){switch(t.status){case 201:s(!0),localStorage.setItem("user",JSON.stringify(S)),e.goBack();break;case 400:console.log("There was something wrong with the requested format");break;case 403:f(!0),console.log("Not found");break;case 404:console.log("Not found");break;default:console.log("Something else happened")}}));case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return j&&(y=Object(C.jsx)(h.a,{error:!0,children:Object(C.jsx)(h.a.Header,{children:"Invalid Input"})})),r&&(y=Object(C.jsx)(h.a,{info:!0,children:Object(C.jsx)(h.a.Header,{children:"Information Updated!"})})),Object(C.jsx)(c.a.Fragment,{children:Object(C.jsx)(O.a,{textAlign:"center",style:{height:"75vh"},verticalAlign:"middle",children:Object(C.jsxs)(O.a.Column,{style:{maxWidth:450},children:[Object(C.jsx)(p.a,{as:"h2",color:"black",textAlign:"center",children:"Update your Information:"}),y,Object(C.jsx)(m.a,{size:"large",children:Object(C.jsxs)(g.a,{stacked:!0,children:[Object(C.jsx)(m.a.Input,{id:"email",fluid:!0,icon:"at",iconPosition:"left",defaultValue:S.email,onChange:H}),Object(C.jsx)(m.a.Input,{id:"password",fluid:!0,icon:"lock",iconPosition:"left",defaultValue:S.password,onChange:H}),Object(C.jsx)(m.a.Input,{id:"firstName",fluid:!0,icon:"user",iconPosition:"left",defaultValue:S.firstName,onChange:H}),Object(C.jsx)(m.a.Input,{id:"lastName",fluid:!0,icon:"user",iconPosition:"left",defaultValue:S.lastName,onChange:H}),Object(C.jsx)(x.a,{type:"submit",onClick:A,color:"black",fluid:!0,size:"large",children:"Update Info"})]})})]})})})},E=function(){console.log(Object(o.g)());var e=Object(o.g)().employeeId,t=Object(o.f)(),a=Object(n.useState)([]),r=Object(i.a)(a,2),s=r[0],l=r[1],d=Object(n.useState)(!1),j=Object(i.a)(d,2),h=j[0],m=j[1];""==localStorage.getItem("user")&&t.push("./Login");var f=Object(n.useState)(JSON.parse(localStorage.getItem("user"))),y=Object(i.a)(f,2),k=y[0],w=y[1];k.manager||t.push("./EmployeeHome");Object(n.useEffect)((function(){w(JSON.parse(localStorage.getItem("user"))),Object(b.a)(u.a.mark((function t(){var a;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,v.a.get("http://localhost:8080/api/reimbursements/"+e,{headers:{"Content-Type":"application/json"}});case 2:a=t.sent,l(a.data);case 4:case"end":return t.stop()}}),t)})))()}),[]);var N=function(e){m(!h)};return Object(C.jsx)("div",{children:Object(C.jsx)(c.a.Fragment,{children:Object(C.jsx)(O.a,{textAlign:"center",style:{height:"75vh"},verticalAlign:"middle",children:Object(C.jsxs)(O.a.Column,{style:{width:"90%"},children:[Object(C.jsxs)(p.a,{children:["Welcome ",k.firstName," ",k.lastName]}),Object(C.jsx)(p.a,{}),Object(C.jsx)(g.a,{children:Object(C.jsxs)(O.a,{children:[Object(C.jsxs)(O.a.Column,{width:"9",children:[Object(C.jsx)(x.a,{id:"pending",toggle:!0,active:h,onClick:N,children:"Pending"}),Object(C.jsx)(x.a,{id:"resolved",toggle:!0,active:!h,onClick:N,children:"Resolved"})]}),Object(C.jsx)(O.a.Column,{width:"7",children:Object(C.jsx)(x.a,{id:"back",onClick:t.goBack,content:"Back"})})]})}),P.assembleReimbursementTable(s,h)]})})})})};var D=function(){var e=Object(n.useState)(),t=Object(i.a)(e,2),a=t[0],c=t[1];return Object(n.useEffect)((function(){""!=localStorage.getItem("user")&&c(JSON.parse(localStorage.getItem("user")))}),[]),console.log(localStorage.getItem("user")),Object(C.jsx)("div",{className:"App",children:Object(C.jsxs)(l.a,{children:[Object(C.jsx)("nav",{className:"Nav",children:Object(C.jsxs)(d.a,{children:[Object(C.jsx)(d.a.Item,{header:!0,children:"Pawnee Civil Reimbursement"}),a&&a.manager?Object(C.jsx)(d.a.Item,{children:Object(C.jsx)(l.b,{to:"/ManagerHome",children:"Home"})}):Object(C.jsx)(d.a.Item,{children:Object(C.jsx)(l.b,{to:"/EmployeeHome",children:"Home"})}),Object(C.jsx)(d.a.Item,{position:"right",children:a?Object(C.jsx)(l.b,{to:"/Update",children:"Update"}):""}),Object(C.jsx)(d.a.Item,{children:a?Object(C.jsx)(l.b,{to:"/Logout",children:"Logout"}):Object(C.jsx)(l.b,{to:"/Login",children:"Login"})})]})}),Object(C.jsxs)(o.c,{children:[Object(C.jsx)(o.a,{path:"/",exact:!0,children:a?a.manager?Object(C.jsx)(L,{}):Object(C.jsx)(_,{}):Object(C.jsx)(y,{})}),Object(C.jsx)(o.a,{path:"/Login",children:Object(C.jsx)(y,{})}),Object(C.jsx)(o.a,{path:"/Logout",children:Object(C.jsx)(R,{})}),Object(C.jsx)(o.a,{path:"/EmployeeHome",children:Object(C.jsx)(_,{})}),Object(C.jsx)(o.a,{path:"/ManagerHome",children:Object(C.jsx)(L,{})}),Object(C.jsx)(o.a,{path:"/Update",children:Object(C.jsx)(T,{})}),Object(C.jsx)(o.a,{path:"/employee/:employeeId/:lastName/:firstName",component:E})]})]})})},J=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,219)).then((function(t){var a=t.getCLS,n=t.getFID,c=t.getFCP,r=t.getLCP,s=t.getTTFB;a(e),n(e),c(e),r(e),s(e)}))};s.a.render(Object(C.jsx)(c.a.StrictMode,{children:Object(C.jsx)(D,{})}),document.getElementById("root")),J()},87:function(e,t,a){}},[[197,1,2]]]);
//# sourceMappingURL=main.85e715b1.chunk.js.map