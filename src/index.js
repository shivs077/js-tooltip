import "./main.css";
import "./tooltip.css";

/*
  1. add mouse over & out event listener to document
  2. on mouse over, detect if target dataset has "tooltip" attribute, if not, return, else, remove previous tooltip active if any and call addTooltip(target)
  3. on mouse out, if target has a tooltip attribute, and it was active, call removeTooltip(target), else return
*/
let activeTooltip;

const addTooltip = (target) => {
  activeTooltip = document.createElement("div");
  activeTooltip.classList.add("tooltip");
  activeTooltip.innerHTML = target.dataset["tooltip"];

  activeTooltip.style.left = target.offsetLeft + "px";
  let { top, height } = target.getBoundingClientRect();
  activeTooltip.style.top = top + height + 5 + "px";

  document.body.appendChild(activeTooltip);
  let windowHeight = window.innerHeight;
  let { bottom, height: tipHeight } = activeTooltip.getBoundingClientRect();
  if (bottom > windowHeight + 8) {
    activeTooltip.style.top = top - tipHeight - 5 + "px";
  }
};

const removeTooltip = (el) => {
  if (!activeTooltip) return;
  if (document.body.contains(activeTooltip))
    document.body.removeChild(activeTooltip);
  activeTooltip = null;
};

document.addEventListener("mouseover", (e) => {
  let el = e.target;
  removeTooltip();
  if (!el.dataset["tooltip"]) return;
  addTooltip(el);
});

document.addEventListener("mouseout", () => {
  removeTooltip();
});
