var DATA = {
  '真心话': ['明天就要答辩了，你越看你的 app 越觉得它很挫，你会怎么办？','如果现在有人要包养你，什么价钱最合适？',
  '如果钱包里没钱了，遇见心爱的人你会说什么？','你最可能爱上在坐的谁？','你有没有秘密从来没有跟别人讲过？',
  '如果你有一小时的隐身时间，你最想做什么？','如果看到自己的情敌掉进下水道，你会做什么？','约会碰到前任，你会怎么样？',
  '你约会过的年龄最大的人是几岁？','上大号的时候没有厕纸了，无法和外界联系，你会怎么做？'],

  '大冒险': ['不用数据库写一个 web app 。','蒙着眼睛转三圈，抓到任意一个人亲 2 下！','要房间里任意一个陌生异性的电话号码。',
  '让所有的人对你的耳朵吹气。','向右数第四位异性，一遍摸他的胸一边说：“你好讨厌！”',
  '出题人选择一个号码,让被选中的人打电话表白，表白时间不得少于一分钟。',
  '随便给手机里的一个异性打电话，说：“我..是..猪..”','随便打电话给一个陌生人谈上两分钟。',
  '抱起或被抱起离你右边最近的一位异性深蹲起 3 次。','立刻吹一瓶！']
};

function shuffle(arr) {
	for (var i = 0, len = arr.length; i < len; i++) {
		var j = Math.floor(Math.random() * (len - 1));
		var temp = arr[i];
		arr[i] = arr[j];
		arr[j] = temp;
	}
}

var DataHandle = function () {
  var question = [];
  var nowIndex = 0;

  return {
    setData: function (type) {
      if (type in DATA) {
        question = DATA[type];
      } else {
        for (var key in DATA) {
          if (DATA.hasOwnProperty(key)) {
            question = question.concat(DATA[key]);
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
}();

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
  DataHandle.setData(title);
  $('#question-page .page-title').text(title);

  renderQuestion(DataHandle.getData());
});

$('.go-back').click(function () {
  $('#question-page').hide()
  .siblings('#index-page').show();
});

$('button.next-question').click(function () {
    renderQuestion(DataHandle.getNextData());
});

$('button.prev-question').click(function () {
  renderQuestion(DataHandle.getPrevData());
});
