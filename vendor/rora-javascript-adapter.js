var a,i,r;async function s(t){let o=t.target.href,n=window.location.origin;if(t.target.tagName==="A"&&o.startsWith(n)){t.preventDefault();let e=o.replace(n,"");history.pushState(void 0,void 0,e),t.preventDefault(),await a(o)}t.target.tagName==="BUTTON"&&t.target.type==="submit"||t.preventDefault()}async function d(t){let o=new FormData(t.target),n=new URLSearchParams(o).toString(),e=t.target.action,c=t.target.method;t.preventDefault(),await i(e,c,n,t.target.encoding)}function u(t){a=t.onAnchorClicked,i=t.onFormSubmission,r||(document.addEventListener("click",s),window.addEventListener("popstate",t.onPopState),r=!0),document.querySelectorAll("form").forEach(o=>o.addEventListener("submit",d))}export{u as initialize};
