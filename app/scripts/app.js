'use strict';

$(function() {
	stickyFooter();

	$(window).on('resize', stickyFooter);

});

// Функции
// Прижимаем подвал к низу экрана
function stickyFooter() {
	var $footer = $('.footer');
	$footer.siblings('.spacer').remove();
	var contentHeight = $('body').height(),
		windowHeight = $(window).height();
	if(contentHeight < windowHeight) {
		$footer.before('<div class="spacer" style="height: ' + (windowHeight - contentHeight) + 'px;"></div>');
	}
}

// Находим ширину скроллбара страницы
function findScrollWidth() {
	var div = document.createElement('div');
	div.style.overflowY = 'scroll';
	div.style.width =  '50px';
	div.style.height = '50px';
	div.style.visibility = 'hidden';
	document.body.appendChild(div);
	scrollWidth = div.offsetWidth - div.clientWidth;
	document.body.removeChild(div);
	return scrollWidth
}

// растянутость полей с текстом
autosize(document.querySelectorAll('textarea'))

let app = new Vue({
	el: '#app',
	data:{
		table:[],

	},
	mounted() {
		if (localStorage.getItem('table')) {
			try {
			  this.table = JSON.parse(localStorage.getItem('table'));
			} catch(e) {
			  localStorage.removeItem('table');
			}
		  }
	},
	methods:{
		addRow(submitEvent) {

			let self = this,
				formData = new FormData(submitEvent.target);

			this.table.push({
				name: self.validateElement(formData.get('name')),
				address: self.validateElement(formData.get('address')),
				ogrn: self.validateElement(formData.get('ogrn')),
				inn: self.validateElement(formData.get('inn')),
				date: self.validateElement(formData.get('date')),
			})

			this.saveOurTable();
			this.resetForm(submitEvent.target);

		},

		resetForm(form) {
			$(form).find('input').val('')
		},

		deleteRow(index) {
			this.table.splice(index, 1);
			this.saveOurTable();
		},
		validateElement(value) {
			if (value === '' ) return '-'
			else return value
		},

		saveOurTable() {
			const parsedTable = JSON.stringify(this.table);
			localStorage.setItem('table', parsedTable);
		}
	},

})