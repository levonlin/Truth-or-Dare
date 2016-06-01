var dataObject = {};

function shuffle(arr) {
	for (var i = 0, len = arr.length; i < len; i++) {
		var j = Math.floor(Math.random() * (len - 1));
		var temp = arr[i];
		arr[i] = arr[j];
		arr[j] = temp;
	}
}

function DataConstructor(data) {
  var question = [];
  var nowIndex = 0;

  return {
    setData: function (type) {
      if (type in data) {
        question = data[type];
      } else {
        for (var key in data) {
          if (data.hasOwnProperty(key)) {
            question = question.concat(data[key]);
          }
        }
        shuffle(question);
      }

      nowIndex = 0;
    },

    getData: function () {
      var len = question.length;
      var hasNext = true;
      var hasPrev = true;

      if (nowIndex >= len || nowIndex < 0) {
      	return [null, false, false];
      } else {
      	if (nowIndex + 1 >= len) {
      		hasNext = false;
      	}

      	if(nowIndex - 1 < 0) {
      		hasPrev = false;
      	}

      	return [question[nowIndex], hasPrev, hasNext];
      }
    },

    getNextData: function () {
    	nowIndex++;
      return this.getData();
    },

    getPrevData: function () {
    	nowIndex--;
      return this.getData();
    }
  };
}

function renderQuestion(data) {
  $('#question-page .content p').text(data[0]);
 	if (data[1]) {
 		$('button.prev-question').removeClass('disabled').html('<span class="glyphicon glyphicon-hand-left"></span>上一个');
 	} else {
 		$('button.prev-question').addClass('disabled').html('<span class="glyphicon glyphicon-ban-circle"></span>木有鸟');
 	}

 	if (data[2]) {
 		$('button.next-question').removeClass('disabled').html('下一个<span class="glyphicon glyphicon-hand-right"></span>');
 	} else {
 		$('button.next-question').addClass('disabled').html('木有鸟<span class="glyphicon glyphicon-ban-circle"></span>');
 	}
}

$('.choice button').click(function () {
  $('#index-page').hide()
  .siblings('#question-page').show();

  var title = $(this).text();
  $('#question-page .page-title').text(title);

  $.getJSON('./data.json', function (data) {
    dataObject = new DataConstructor(data);
    dataObject.setData(title);
    renderQuestion(dataObject.getData());
  });
});

$('.go-back').click(function () {
  $('#question-page').hide()
  .siblings('#index-page').show();
});

$('button.next-question').click(function () {
    renderQuestion(dataObject.getNextData());
});

$('button.prev-question').click(function () {
  renderQuestion(dataObject.getPrevData());
});
