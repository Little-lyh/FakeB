function Carousel($ct) {
    this.$ct = $ct;
    this.init();
    this.bind();
    this.autoPlay();
}

Carousel.prototype.init = function () { //初始化函数
    var $imgList = this.$imgList = this.$ct.find('.slide'),
        $dot = this.$dot = this.$ct.find('.dot'),
        $dotChild = this.$dotChild = this.$ct.find('.dot li'),
        $firstImg = $imgList.find('div').first(),
        $lastImg = $imgList.find('div').last(),
        $imgWidth = this.$imgWidth = $firstImg.width();

    this.imgLength = $imgList.children().length; //在clone()之前定义
    this.curPageIndex = 0;
    this.isAnimate = false;

    $imgList.prepend($lastImg.clone()); //在第一张前放最后一张图的克隆
    $imgList.append($firstImg.clone()); //在最后一张后放第一张图的克隆

    $imgList.width($firstImg.width() * $imgList.children().length); //容器宽度自适应
    $imgList.css({'left': -$imgWidth}); //显示第一张图片
}

Carousel.prototype.bind = function () {

    var _this = this;
    this.$dotChild.on('click', function () {
        var dotIndex = $(this).index();
        if (dotIndex > _this.curPageIndex) {
            _this.playNext(dotIndex - _this.curPageIndex);
        } else if (dotIndex < _this.curPageIndex) {
            _this.playPre(_this.curPageIndex - dotIndex);
        }
    })
}

Carousel.prototype.playPre = function (n) {
    var _this = this;
    var n = n || 1;
    if (this.isAnimate) return; //状态锁，防止重复点击
    this.isAnimate = true;
    this.$imgList.animate({
        left: '+=' + this.$imgWidth * n //不相邻的图片距离
    }, function () {
        _this.curPageIndex -= n;
        if (_this.curPageIndex < 0) { //当滚到第一张之前
            _this.$imgList.css({'left': -(_this.imgLength * _this.$imgWidth)}); //回到最后一张图片
            _this.curPageIndex = _this.imgLength - 1;
        }
        _this.playDot();
    })
    this.isAnimate = false;
}

Carousel.prototype.playNext = function (n) {
    var _this = this;
    var n = n || 1;
    if (this.isAnimate) return; //状态锁，防止重复点击
    this.isAnimate = true;
    this.$imgList.animate({
        left: '-=' + this.$imgWidth * n //不相邻的图片距离
    }, function () {
        _this.curPageIndex += n;
        if (_this.curPageIndex === _this.imgLength) { //当滚到最后一张之后
            _this.$imgList.css({'left': -_this.$imgWidth}); //回到第一张图片
            _this.curPageIndex = 0;
        }
        _this.playDot();
    })
    this.isAnimate = false;
}

Carousel.prototype.playDot = function () {
    this.$dot.children().removeClass('active')
        .eq(this.curPageIndex).addClass('active') //链式调用
}

Carousel.prototype.autoPlay = function () {
    var _this = this;
    setInterval(function () {
        _this.playNext(1);
    }, 3000);
}


var _Carousel;
_Carousel = (function () {
    return {
        init: function ($ct) {
            $ct.each(function (index, node) {
                new Carousel($(node));
            })
        }
    }
})()
//header二级菜单
const $ = require('jquery')

function secNav($node) {
    this.$node = $node;
    this.init();
    this.bind();
}

secNav.prototype.init = function () {
    var $navItem = this.$navItem = this.$node.find('.nav >li');
}
secNav.prototype.bind = function () {
    this.$navItem.on('mouseenter', function (e) {
        var $secNav = $(e.currentTarget).find('ul');
        $secNav.css({
            'display': 'flex'
        })
    })
    this.$navItem.on('mouseleave', function (e) {
        var $secNav = $(e.currentTarget).find('ul');
        $secNav.css({
            'display': 'none'
        })
    })
}
export var SecNav = (function () {
    return {
        init: function ($itemList) {
            $.each($itemList, function (index, node) {
                new secNav($(node));
            })
        }
    }
})()
// 鼠标移入展示视频信息
const $ = require('jquery')

function infoCard($node) {
    this.$node = $node;
    this.init();
    this.bind();
}

infoCard.prototype.init = function () {
    var $itemList = this.$itemList = this.$node.find('.rec-item');
}
infoCard.prototype.bind = function () {
    //分区热点标题
    this.$itemList.on('mouseenter', function (e) {
        var $item = $(e.currentTarget).find('.info-card'),
            $text = $(e.currentTarget).find('.info');
        $item.css({
            'top': '0',
            'overflow': 'visible',
            'height': '100%',
            'background': 'rgba(0,0,0,.8)'
        })
        $text.css({
            'opacity': '1',
            'transition': 'opacity .5s linear'
        })
    })
    this.$itemList.on('mouseleave', function (e) {
        var $item = $(e.currentTarget).find('.info-card'),
            $text = $(e.currentTarget).find('.info');
        $item.css({
            'top': '68px',
            'height': '40px',
            'overflow': 'hidden',
            'background': 'linear-gradient(transparent,rgba(0,0,0,.1) 20%,rgba(0,0,0,.2) 35%,rgba(0,0,0,.6) 65%,rgba(0,0,0,.9))'
        })
        $text.css({
            'opacity': '0'
        })
    })

}
export var InfoCard = (function () {
    return {
        init: function ($itemList) {
            $.each($itemList, function (index, node) {
                new infoCard($(node));
            })
        }
    }
})()
//番剧更新表 tab切换
const $ = require('jquery')

function tabChange($ct) {
    this.$ct = $ct;
    this.init();
    this.bind();
}

tabChange.prototype.init = function () { //初始化函数
    var $tabList = this.$tabList = this.$ct.find('.bangumi-title >.item >.w-item'),
        $item = this.$item = this.$ct.find('.schedule >.sch-item');
}

tabChange.prototype.bind = function () {
    var _this = this;
    this.$tabList.on('click', function () {
        var index = $(this).index();
        _this.$tabList.siblings().removeClass('on')
            .eq(index).addClass('on')
        _this.showItem(index)
    })
}

tabChange.prototype.showItem = function (index) {
    this.$item.siblings().removeClass('on')
        .eq(index).addClass('on')
}

export var TabChange = (function () {
    return {
        init: function ($nodeList) {
            $.each($nodeList, function (index, node) {
                new tabChange($(node));
            })
        }
    }
})()
(function (module, exports, __webpack_require__) {

    "use strict";

    var _Carousel = __webpack_require__(1);

    var _TabSwitch = __webpack_require__(6);

    var _HoverColorChange = __webpack_require__(2);

    var _Infocard = __webpack_require__(3);

    var _SecNav = __webpack_require__(4);

    var _TabChange = __webpack_require__(5);

    var $ = __webpack_require__(0);

// 滚动轮播
    _Carousel.Carousel.init([$('.rec-carousel'), $('.live >.live-right >.tab-item >.carousel-outside >.recommend >.carousel-inside'), $('.bangumi >.bangumi-right >.carousel-inside')]);
//导航切换轮播
    _TabSwitch.TabSwitch.init([$('.live >.live-right'), $('.anime >.anime-right'), $('.music >.music-right'), $('.dance >.dance-right'), $('.game >.game-right'), $('.tech >.tech-right'), $('.life >.life-right'), $('.moive >.moive-right')]
//其他鼠标移入事件
    );
    _HoverColorChange.HoverColorChange.init([$('.header >.nav-guide >.guide-wrapper >ul'), $('.push'), $('.live'), $('.anime'), $('.bangumi-schedule'), $('.bangumi'), $('.music'), $('.dance'), $('.game'), $('.tech'), $('.life'), $('.moive')]
//视频鼠标移入事件
    );
    _Infocard.InfoCard.init([$('.recommend >.rec-ct')]
//header二级菜单
    );
    _SecNav.SecNav.init([$('.header >.nav-guide >.guide-wrapper')]);
    /***/
});
