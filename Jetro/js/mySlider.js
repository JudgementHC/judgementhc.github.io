class MySlider {
	constructor(obj){
		this.images = $(obj.images)
		this.nextBtn = $(obj.nextBtn)
		this.prevBtn = $(obj.prevBtn)
		this.miniImg = $(obj.miniImg)

		this.i = 0
		this.firstActive = this.images.eq(this.i)
		this.firstBordered = this.miniImg.eq(this.i)

		this.firstActive.addClass('active-slider')
		this.firstBordered.addClass('bordered-slider')

		if(this.nextBtn && this.prevBtn){
			this.nextBtn.on('click', (e) => {
				this.next()
			})
			this.prevBtn.on('click', (e) => {
				this.prev()
			})
		}

		this.miniImg.on('click', (e) => {
			this.images.eq(this.i).removeClass('active-slider')
			this.miniImg.eq(this.i).removeClass('bordered-slider')
			this.i = $(e.target).index()
			this.images.eq(this.i).addClass('active-slider')
			this.miniImg.eq(this.i).addClass('bordered-slider')
		})

		$(window).keyup((event) => {
			if(event.which == 39) this.next()
			else if(event.which == 37) this.prev()
		})

	}
	next(){
		this.images.eq(this.i).removeClass('active-slider')
		this.miniImg.eq(this.i).removeClass('bordered-slider')
		this.i++
		if (this.i >= this.images.length) this.i = 0
		this.images.eq(this.i).addClass('active-slider')
		this.miniImg.eq(this.i).addClass('bordered-slider')
	}
	prev(){
		this.images.eq(this.i).removeClass('active-slider')
		this.miniImg.eq(this.i).removeClass('bordered-slider')
		this.i--
		if (this.i < 0) this.i = this.images.length - 1
		this.images.eq(this.i).addClass('active-slider')
		this.miniImg.eq(this.i).addClass('bordered-slider')
	}
}