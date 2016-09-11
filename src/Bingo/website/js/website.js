$(function () {

	var Button = function (el, row, col, parent) {
		this.$el = $(el);
		this.state = this.$el.hasClass('active');
		this.row = row;
		this.col = col;
		this.parent = parent;

		this.debounceUpdateStatus = _.debounce(
			_.bind(this.updateStatus,this),
			2000
		);

		this.$el.on('click', _.bind(this.onClick, this));
	};

	Button.prototype = {
		onClick: function () {
			this.$el.toggleClass('active');
			this.debounceUpdateStatus();
		},
		updateStatus: function () {
			var newState = this.$el.hasClass('active');

			if (this.state !== newState) {
				this.state = newState;
				this.parent.updateStatus(this.row, this.col, this.state);
			}
		}
	};

	var ButtonTable = function (el) {
		this.$el = $(el);
		this.$rows = this.$el.find('tr');
		this.buttons = [];

		for (var r = 0; r < 5; r++) {
			var $cols = $(this.$rows[r]).find('.button');
			this.buttons[r] = [];
			for (var c = 0; c < 5; c++) {
				this.buttons[r][c] = new Button($cols[c], r, c, this);
			}
		}
	};

	ButtonTable.prototype = {
		updateStatus: function (row, col, state) {
			console.log(row + " x " + col + " = " + state);
		}
	}



	var table = new ButtonTable('.button-table');

});
