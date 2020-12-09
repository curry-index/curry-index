(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{32:function(e,t,r){},44:function(e,t,r){},62:function(e,t,r){},66:function(e,t,r){"use strict";r.r(t);var a=r(13),s=r(14),n=r(16),c=r(15),i=r(1),l=r(0),o=r.n(l),d=r(12),j=r.n(d),u=(r(32),r(19)),b=r(7),m=r(22),h=r(28),O=r.n(h);r(44),r(21);O.a.setApiKey("AIzaSyAYZ0l37RYVyu6rfb-K6WEP1tbFrPfJmKM");var p={width:"80%",height:"60%"};var x=function(){var e=localStorage.getItem("curryList");return e&&JSON.parse(e)}(),y=function(){for(var e=[],t=function(t){var r=x[t];O.a.fromAddress(r.restaurantAddress).then((function(t){var a=t.results[0].geometry.location,s=a.lat,n=a.lng;e.push({latitude:s,longitude:n,name:r.restaurantName})}),(function(e){console.error(e)}))},r=0;r<x.length;r++)t(r);return e}(),v=function(e){Object(n.a)(r,e);var t=Object(c.a)(r);function r(e){var s;return Object(a.a)(this,r),(s=t.call(this,e)).displayMarkers=function(){return s.state.restaurants.map((function(e,t){return Object(i.jsx)(m.Marker,{id:t,position:{lat:e.latitude,lng:e.longitude},onClick:function(){return s.markerClicked(e)}},e.name+"_"+t)}))},s.state={curryList:x||[],restaurants:y||[]},s}return Object(s.a)(r,[{key:"markerClicked",value:function(e){document.getElementById("rest-name").innerHTML=e.name}},{key:"render",value:function(){return Object(i.jsxs)("div",{id:"bootstrap-overrides",children:[Object(i.jsxs)("div",{id:"selected-restaurant",children:["Selected restaurant: ",Object(i.jsx)("span",{id:"rest-name",children:Object(i.jsx)("i",{children:"None selected"})})]}),Object(i.jsx)(m.Map,{google:this.props.google,zoom:13,style:p,initialCenter:{lat:40.4406,lng:-79.9959},children:this.displayMarkers()})]})}}]),r}(l.Component),f=Object(m.GoogleApiWrapper)({apiKey:"AIzaSyAYZ0l37RYVyu6rfb-K6WEP1tbFrPfJmKM"})(v),g=(r(62),function(e){Object(n.a)(r,e);var t=Object(c.a)(r);function r(){return Object(a.a)(this,r),t.apply(this,arguments)}return Object(s.a)(r,[{key:"render",value:function(){return Object(i.jsxs)("nav",{id:"overrides",className:"navbar mb-5 px-0",children:[Object(i.jsx)(u.b,{to:"/",className:"navbar-brand",children:"Custom Curry Index"}),Object(i.jsxs)("div",{className:"navbar-nav flex-row",children:[Object(i.jsx)(u.c,{to:"/",className:"nav-item nav-link px-1 mr-2",children:"Curry Index"}),Object(i.jsx)(u.c,{to:"/map",className:"nav-item nav-link px-1 mx-2",children:"Map"})]})]})}}]),r}(l.Component)),N=r(23),C=r(9),S=r(31),w=r(37),k=r.p+"static/media/noodlehead-red.9cb1acaf.jpg";function L(e){console.log(e," is required.")}function I(e){return Object(i.jsx)(N.a,{id:"bootstrap-overrides",show:e.show,size:"lg","aria-labelledby":"contained-modal-title-vcenter",centered:!0,children:Object(i.jsxs)(C.a,{onSubmit:e.currySetter,children:[Object(i.jsxs)(N.a.Body,{className:"container",children:[Object(i.jsx)("h2",{children:"New Curry Entry"}),Object(i.jsxs)("div",{className:"row",children:[Object(i.jsxs)("div",{className:"col-8",children:[Object(i.jsx)(C.a.Label,{className:"mb-1",children:"Restaurant"}),Object(i.jsx)("br",{}),Object(i.jsx)(C.a.Control,{size:"sm",name:"restaurantName",type:"text",placeholder:"Name of Restaurant"}),Object(i.jsx)("br",{}),Object(i.jsx)(C.a.Label,{className:"mb-1",children:"Full Address of Restaurant"}),Object(i.jsx)(C.a.Control,{size:"sm",name:"restaurantAddress",type:"text",placeholder:'e.g. "123 Thai St, Pittsburgh, PA"'}),Object(i.jsx)("br",{}),Object(i.jsx)("div",{className:"container p-0",children:Object(i.jsxs)("div",{className:"row",children:[Object(i.jsxs)("div",{className:"col-8",children:[Object(i.jsx)(C.a.Label,{className:"mb-0",children:"Curry Name"}),Object(i.jsx)("br",{}),Object(i.jsx)("span",{className:"sublabel",children:'Include "curry" in name'}),Object(i.jsx)(C.a.Control,{size:"sm",name:"curryType",type:"text",placeholder:'e.g. "Red Curry"'})]}),Object(i.jsxs)("div",{className:"col-4",children:[Object(i.jsx)(C.a.Label,{className:"mb-0",children:"Rating"}),Object(i.jsx)("br",{}),Object(i.jsx)("span",{className:"sublabel",children:"1=worst, 5=best"}),Object(i.jsx)(C.a.Control,{size:"sm",name:"curryRating",type:"text",placeholder:"1-5"})]})]})}),Object(i.jsx)("br",{}),Object(i.jsx)(C.a.Label,{className:"mb-1",children:"Taste Notes"}),Object(i.jsx)(C.a.Control,{as:"textarea",name:"tastingNotes",placeholder:"Taste description of curry",rows:3})]}),Object(i.jsx)("div",{className:"col-4",children:Object(i.jsxs)(C.a.Group,{children:[Object(i.jsx)(C.a.Label,{className:"mb-1",children:"Add a Photo"}),Object(i.jsx)(C.a.File,{name:"curryPhoto",id:"exampleFormControlFile1"})]})})]})]}),Object(i.jsxs)(N.a.Footer,{children:[Object(i.jsx)(S.a,{variant:"outline-secondary",size:"sm",onClick:e.onHide,children:"Close"}),Object(i.jsx)(S.a,{variant:"primary",type:"submit",size:"sm",children:"Save"})]})]})})}function A(e){localStorage.setItem("curryList",JSON.stringify(e))}var M=function(){var e=localStorage.getItem("curryList");return e&&JSON.parse(e)}(),z=function(e){Object(n.a)(r,e);var t=Object(c.a)(r);function r(){return Object(a.a)(this,r),t.apply(this,arguments)}return Object(s.a)(r,[{key:"render",value:function(){var e=this;return Object(i.jsx)("div",{className:"col-sm-12 col-md-6 mb-4",children:Object(i.jsx)("div",{className:"mt-4 mt-sm-auto",children:Object(i.jsxs)("div",{className:"row",children:[Object(i.jsx)("div",{className:"col-12 col-md-7 col-lg-6",children:Object(i.jsx)(w.a,{alt:"curry",src:k,className:"card-images"})}),Object(i.jsxs)("div",{className:"col-12 col-md-5 col-lg-6",children:[Object(i.jsx)("h2",{className:"mb-0 mt-2 mt-md-0 curry-card-title",children:this.props.restaurant}),Object(i.jsx)("h3",{children:this.props.curry}),Object(i.jsxs)("p",{children:["Taste notes: ",this.props.tastingNotes,Object(i.jsx)("br",{}),"Rating: ",this.props.rating,"/5"]}),Object(i.jsx)("span",{className:"delete-btn",onClick:function(t){return e.props.deleteItem(t,e.props.i)},children:"Delete"})]})]})})})}}]),r}(o.a.Component),P=function(e){Object(n.a)(r,e);var t=Object(c.a)(r);function r(){var e;Object(a.a)(this,r);for(var s=arguments.length,n=new Array(s),c=0;c<s;c++)n[c]=arguments[c];return(e=t.call.apply(t,[this].concat(n))).state={curryList:M||[],newCurryContent:"",modalShow:!1},e.addItem=function(t){t.preventDefault();for(var r=!1,a=0;a<t.target.elements.length-2;a++)""!==t.target[a].value||"curryPhoto tastingNotes".includes(t.target[a].name)||(L(t.target[a].name),r=!0);if(!0===r)return null;var s=e.state.curryList,n={};for(a=0;a<t.target.elements.length-2;a++)n[t.target.elements[a].name]=t.target[a].value;s.push(n),e.setState({curryList:s}),A(s),e.setModalShow(!1)},e.deleteItem=function(t,r){t.stopPropagation();var a=e.state.curryList;a.splice(r,1),e.setState({curryList:a}),A(a)},e}return Object(s.a)(r,[{key:"renderCurryItem",value:function(e,t,r,a,s){return Object(i.jsx)(z,{restaurant:e,curry:t,tastingNotes:r,rating:a,i:s,deleteItem:this.deleteItem},s)}},{key:"setModalShow",value:function(e){this.setState({modalShow:e})}},{key:"render",value:function(){var e=this,t=[];if(null!=this.state.curryList)for(var r=0;r<this.state.curryList.length;r++){var a=this.state.curryList[r];t.push(this.renderCurryItem(a.restaurantName,a.curryType,a.tastingNotes,a.curryRating,r))}return Object(i.jsxs)("div",{id:"bootstrap-overrides",children:[Object(i.jsxs)("div",{className:"header pb-0 pb-md-3",children:[Object(i.jsx)("h1",{className:"mb-0",children:"Saved Curries"}),Object(i.jsx)("a",{href:"#add",onClick:function(){return e.setModalShow(!0)},children:Object(i.jsx)("u",{children:"+ Add New Curry"})})]}),Object(i.jsx)("div",{className:"row",children:t}),Object(i.jsx)(I,{show:this.state.modalShow,onHide:function(){return e.setModalShow(!1)},currySetter:this.addItem})]})}}]),r}(l.Component),R=function(e){Object(n.a)(r,e);var t=Object(c.a)(r);function r(){return Object(a.a)(this,r),t.apply(this,arguments)}return Object(s.a)(r,[{key:"render",value:function(){return Object(i.jsx)("div",{className:"container",children:Object(i.jsxs)(u.a,{basename:"/",children:[Object(i.jsx)(g,{}),Object(i.jsxs)(b.c,{children:[Object(i.jsx)(b.a,{exact:!0,path:"/",children:Object(i.jsx)(P,{})}),Object(i.jsx)(b.a,{path:"/map",children:Object(i.jsx)(f,{})})]})]})})}}]),r}(l.Component);j.a.render(Object(i.jsx)(R,{}),document.getElementById("root"))}},[[66,1,2]]]);
//# sourceMappingURL=main.2488c27e.chunk.js.map