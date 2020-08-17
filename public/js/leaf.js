var leaves = [];

var nextLeaf = 0;

const createLeaf = gifUrl => {
  const leaf = document.createElement("div");
  leaf.classList.add("leaf");
  leaf.innerHTML = `<img src=${gifUrl} />`;
  leaf.id = nextLeaf++;
  document.body.appendChild(leaf);
  leaf.addEventListener("click", e => {
    const leaf =
      leaves[leaves.findIndex(leaf => leaf.id === e.target.parentNode.id)];
    leaf.phys.running = !leaf.phys.running;
  });
  leaf.addEventListener("touch", e => {
    const leaf =
      leaves[leaves.findIndex(leaf => leaf.id === e.target.parentNode.id)];
    leaf.phys.running = !leaf.phys.running;
  });
  leaves.push({
    id: leaf.id.toString(),
    elem: leaf,
    phys: new Leaf(window.innerWidth / 2 - 100, 0)
  });
};

const update = () => {
  for (leaf of leaves) {
    if (leaf.phys.running) {
      leaf.phys.update();

      if (
        leaf.phys.x < 0 ||
        leaf.phys.x + leaf.elem.offsetWidth > window.innerWidth
      ) {
        leaf.phys.dx *= -0.85;
      }
      if (leaf.phys.y + leaf.elem.offsetHeight >= window.innerHeight) {
        document.body.removeChild(leaf.elem);
        leaves = leaves.filter(item => item.elem.id !== leaf.elem.id);
      }

      leaf.elem.style.top = leaf.phys.y + "px";
      leaf.elem.style.left = leaf.phys.x + "px";
    }
  }
  requestAnimationFrame(update);
};
update();
