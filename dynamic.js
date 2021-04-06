class Insect {
	constructor() {
		this.challange= 'Catch me if you can, Ready, GO!!'
		this.conter= 0
		this.point=0
		this.interval= null
		this.body= document.querySelector('body')
		this.p= document.querySelector('.header')
		this.div= document.querySelector('h1')
		this.divGame= document.querySelector('.game')
		this.message= document.querySelector('.boxMessage')
		this.bonus= parseInt(Math.random().toString(10).slice(2,4)) >= 20 ? 15 : parseInt(Math.random().toString(10).slice(2,4))
	}
	textChanlange() {
		clearInterval(this.interval)
		let t_chanlange= this.challange.split(',')
		this.p.innerHTML= t_chanlange[this.conter]
		this.p.style.animation = "transf 2s 2"
		this.interval= setInterval(() =>
			this.conter < 3 ? 
				(this.textChanlange() & this.conter++ ) : 
				(this.setConter(0) & this.intoBody() & this.showInsect('visible'))
		, 1000)
	}
	clearBody(img) {
		let separat= img.split('.')
		if(separat.length == 1 ) {
			this.body.style.backgroundColor= img
		} else {
			this.body.style.backgroundImage = "url('"+img+"')";
		}
	}
	intoBody() {
		if(this.conter%this.bonus == 0 && this.conter != 0) {
			document.getElementById('getBonusPoint').removeAttribute('style')
			this.moveBonusItems()
		}
		clearInterval(this.interval)
		this.clearBody('gazon.png')
		this.p.style.opacity= '0'
		let aid_=parseInt((this.point/10)+1)
		this.div.innerHTML= this.point+' in '+this.conter+' seconds'
		document.querySelector('.content').style.opacity= '1'
		this.interval= setInterval(() =>
			this.conter <= 60 ? 
				(this.moveInsect() & this.intoBody() & this.conter++) : 
				(clearInterval(this.interval) & this.showResult())
		, parseInt(1500/aid_))
	}
	async moveBonusItems() {
		let a
		do {
			a= Math.random().toString(10).slice(2, 4)
		}while(parseInt(a) > 65 || parseInt(a) < 10)
		let tr= new Promise((resolve, reject) => {
			setTimeout(() => {
				document.getElementById('getBonusPoint').style.left= a+'%'
				document.getElementById('getBonusPoint').style.animation= 'bonuspointget 5s 1'
			},5000)
		})
		return await tr
	}
	showInsect(op) {
		document.querySelector('img').style.visibility= op
	}
	showResult() {
		this.body.style.backgroundImage = ""
		this.showInsect('hidden')
		document.getElementById('getBonusPoint').style.visibility= 'hidden'
		document.querySelector('.btn').style.opacity= '0'
		document.querySelector('.resBonus').style.opacity= '1'
		document.getElementById('comment').innerHTML= this.commentScore()
	}
	commentScore() {
		let _score= eval(100*this.point/60).toFixed(2) > 100 ? 100 : eval(100*this.point/60).toFixed(2)
		let comment= _score > 80 ? 'Good  job' : _score > 60 ? 'Nice, you can do better than this bonus' : 'Be attention, try again!!'
		document.getElementById('scoreTag').style.backgroundSize= _score+'% 100%'
		if(localStorage.getItem('score') == null)
			localStorage.setItem('score', this.point)
		else {
			if(eval(this.point - localStorage.getItem('score')) > 0) {
				localStorage.setItem('score', this.point)
				document.getElementById('spanResBonus').innerHTML= 'Oh! we have new score '+localStorage.getItem('score')
			}
		} 
		return _score+'% '+comment
	}
	setConter(conter) {
		return this.conter= conter
	}
	moveInsect() {
		let items= [4, 3, 9, 6, 7, 8, 5]
		let rdx
		let rdy
		do {
			rdx= parseInt(Math.random().toString(10).slice(2, items[Math.floor(Math.random()*items.length)]))
			rdy= parseInt(Math.random().toString(10).slice(2, items[Math.floor(Math.random()*(items.length))]))
		} while(rdx >= this.divGame.offsetWidth || eval(rdy+parseInt(this.divGame.offsetHeight/5)) >= this.divGame.offsetHeight)
		let change= document.querySelector('img')
		change.style.position='absolute'
		change.style.top= rdy+'px'
		change.style.left= rdx+'px'
	}
	winPoint() {
		var bleep= new Audio()
		bleep.src= 'insect.mp3'
		bleep.play()
		this.point++
		if(this.point % 10 == 0) {
			this.bonusPoint((this.point/10)+1)
			this.message.removeAttribute('style')
		}
	}
	winBonus() {
		var win= new Audio()
		this.point+=2
		win.src= 'bonus.mp3'
		win.play()
		document.getElementById('getBonusPoint').style.visibility= 'hidden'
	}
	async bonusPoint(speed) {
		let tr= new Promise((resolve, reject) => {
			resolve(setTimeout(() => {
				document.getElementById('spanBoxMessage').innerHTML= 'Good job (speed)x'+speed
				this.message.style.animation= 'moveins 6s ease'
			}, 50))
		})
		return await tr
	}
	setPoint(point) {
		return this.point= point
	}
}
const I= new Insect()