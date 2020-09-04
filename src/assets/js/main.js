// classToogle
document.querySelector('.hum__ico').onclick = function () {
	this.classList.toggle('active')
	document.querySelector('.menu__wrapper').classList.toggle('active')
	document.querySelector('body').classList.toggle('lock')
}

