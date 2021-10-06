export default function handleCheckBoxChange(target) {
  const { parentNode } = target;
  // console.log(parentNode.className);
  if (parentNode.className === 'checked') {
    parentNode.classList.remove('checked');
  } else {
    parentNode.classList.add('checked');
  }
}
