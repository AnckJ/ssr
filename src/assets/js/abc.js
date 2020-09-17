console.log('this is abc.js', window, this)

var def = function() {
  var child = document.querySelector('.child')
  if (!child) return
  child.innerHTML = '123333'
}
