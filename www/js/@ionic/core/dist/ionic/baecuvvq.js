/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
Ionic.loadComponents("baecuvvq",function(t,e,n,a,i){var o=function(){function t(){this.isSelected=!1,this.enabled=!0,this.shown=!0,this.tabsHideOnSubPages=!1}return t.prototype.hostData=function(){return{style:{display:!this.isSelected&&"none"||""},attrs:{role:"tabpanel"},class:{}}},t.prototype.componentDidLoad=function(){var t=this;setTimeout(function(){t.ionTabDidLoad.emit({tab:t})},0)},t.prototype.componentDidUnload=function(){this.ionTabDidLoad.emit({tab:this})},t.prototype.render=function(){var t=this.root;return[e(t,0),e("div",{c:{"nav-decor":!0}})]},t}(),s=function(){return function(){this.selectedIndex=0,this.tabsLayout="icon-top"}}(),d=function(){function t(){}return t.prototype.hostData=function(){var t=this.tab;if(!t)return{};var e=!!t.tabTitle,n=!!t.tabIcon&&"icon-hide"!==this.layout,a=e&&!n,i=n&&!e,o=!!t.tabBadge;return{attrs:{"aria-selected":this.selectedIndex===this.index},class:{"has-title":e,"has-icon":n,"has-title-only":a,"has-icon-only":i,"has-badge":o}}},t.prototype.render=function(){if(!this.tab)return null;var t=this.tab,n=[];return t.tabIcon&&n.push(e("ion-icon",{c:{"tab-button-icon":!0},p:{name:t.tabIcon}})),t.tabTitle&&n.push(e("span",{c:{"tab-button-text":!0}},t.tabTitle)),t.tabBadge&&n.push(e("ion-badge",{c:{"tab-badge":!0},p:{color:t.tabBadgeStyle}},t.tabBadge)),n.push(e("div",{c:{"button-effect":!0}})),n},t}(),c=function(){function t(){}return t.prototype.render=function(){return e("div",0)},t}(),b=function(){function t(){this.selectedIndex=0,this.tabsLayout="icon-top",this.tabsPlacement="bottom",this.tabsHighlight=!1}return t.prototype.handleSelectedIndexChanged=function(){this.selectedTab=this.tabs[this.selectedIndex]},t.prototype.tabDidLoad=function(t){var e=t.detail.tab;0===this.tabs.length&&this.handleOnTabSelected(e,0),this.tabs=this.tabs.concat([e])},t.prototype.tabDidUnload=function(t){this.tabs=this.tabs.filter(function(e){return e!==t.detail.tab})},t.prototype.handleOnTabSelected=function(t,e){this.tabs.forEach(function(t){return t.isSelected=!1}),t.isSelected=!0,this.selectedTab=t,this.selectedIndex=e,this.ionChange&&this.ionChange(t)},t.prototype.render=function(){return[e("ion-tab-bar",{p:{tabs:this.tabs,onTabSelected:this.handleOnTabSelected.bind(this),selectedIndex:this.selectedIndex}}),e(0,0)]},t}();t["ION-TAB"]=o,t["ION-TAB-BAR"]=s,t["ION-TAB-BUTTON"]=d,t["ION-TAB-HIGHLIGHT"]=c,t["ION-TABS"]=b},["ION-TAB",[["enabled",1,1],["isSelected",5],["onSelected",1],["root",1],["rootParams",1],["shown",1,1],["tabBadge",1],["tabBadgeStyle",1],["tabIcon",1],["tabsHideOnSubPages",1,1],["tabTitle",1]],{theme:"tab"},[["ionTabDidLoad"]]],["ION-TAB-BAR",[["onTabSelected",1],["selectedIndex",1,2],["tabs",1],["tabsLayout",1]],{theme:"tabbar"}],["ION-TAB-BUTTON",[["index",1,2],["layout",1],["selectedIndex",1,2],["tab",1]],{theme:"tab-button"}],["ION-TAB-HIGHLIGHT",0,{}],["ION-TABS",[["ionChange",1],["selectedIndex",5],["selectedTab",5],["tabs",5],["tabsHighlight",1,1],["tabsLayout",1],["tabsPlacement",1]],{theme:"tabs"},0,0,[["selectedIndex","handleSelectedIndexChanged"]]]);