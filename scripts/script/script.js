var $j = jQuery.noConflict(true);
$j(function() {
  var windowEl = $j(window);

  var init = function() {
    var acNav = new ActiveNav();
    var mngGal = new ManageGallery();
    var adjLay = new AdjustLayout(acNav);
    // var MngPixiv = new ManagePixivImages();

    // for rss
    // @see: https://github.com/sdepold/jquery-rss
    $j("div.about__informationBody").rss(
      "https://bebe-test.tumblr.com/rss",
      // "https://n-kamui-2.tumblr.com/rss",
      {
        limit: 3,
        dateFormat: "YYYY　MM　DD",
        layoutTemplate: '<ul class="cardList">{entries}</ul>',
        entryTemplate:
          '<li class="card"><a href="{url}"><div class="card__image">{teaserImage}</div><div class="card__body"><header class="card__header"><time class="card__bodyDate badge">{date}</time><div class="card__bodyTitle">{title}</div></header><div class="card__bodyDetail">{shortBody}</div><div class="card__bodyAll">{body}</div></div></a></li>',
        dateLocale: "ja",
      },
      function callback() {
        $j("#main").append(
          '<div id="tumblrView"><div class="tumblrView__body"><header class="tumblrView__header"><time class="badge"><span class="card__bodyDate--y">2020</span><span class="card__bodyDate--m">07</span>/<span class="card__bodyDate--d">06</span></time><h2><a href="#">ああああああああああｄふぁふぁｄふぁｆｄふぁｓふぁｄふぁｓふぁｄふぁｆだｓふぁｄｓふぁ</a></h2></header><div class="tumblrView__content"><div class="tumblrView__contentInner"><img src="https://66.media.tumblr.com/0e37aeb937517447d510d4eae36a41b3/4fd0581ae0ea74fd-64/s500x750/a2453432718e89fc1d4388f601ef088d4130d87a.jpg"><br><br><p>あつもりー！てすと投稿〜あつもりー！てすと投稿〜あつもりー！てすと投稿〜あつもりー！てすと投稿〜あつもりー！てすと投稿〜。改行を入れるまでが表示されます。</p><p>ここから先は遷移先でしか確認できません今は。</p></div></div><span class="tumblrView__close">Close</span></div></div>'
        );

        $j("div.about__information").show();

        $j(".about__information .card").each(function () {
          if ($j(this).find("video").length) {
            // 時間抜き出し
            const ms = JSON.parse($j(this).find("video").attr("data-crt-options")).duration;
            $j(this)
              .find(".card__image")
              .append(
                '<div class="card__imageWrap"><div style="background-image:url(' +
                  $j(this).find("video").attr("poster") +
                  ');" class="card__imageBody card__imageBody--video"><time class="card__imageTime">' +
                  toHms(ms) +
                  "</time></div></div>"
              );
          } else if (!$j(this).find(".card__image").find("img").length) {
            $j(this)
              .find(".card__image")
              .append(
                '<div class="card__imageWrap"><div style="background-image:url(./images/Item/noimage.png);" class="card__imageBody card__imageBody--noimage"></div></div>'
              );
          } else {
            $j(this)
              .find(".card__image")
              .append(
                '<div class="card__imageWrap"><div style="background-image:url(' +
                  $j(this).find(".card__image img").attr("src") +
                  ');" class="card__imageBody card__imageBody--image"></div></div>'
              );
          }
        });

        $j(".about__information .card__bodyDate").each(function () {
          var result = $j(this).text().split("　");
          $j(this).html(
            '<span class="card__bodyDate--y">' +
              result[0] +
              '</span><span class="card__bodyDate--m">' +
              result[1] +
              '</span>/<span class="card__bodyDate--d">' +
              result[2] +
              "</span>"
          );
        });
      }
    );
    $j("body").append('<ul id="tumblr__tmp"></ul>');
    $j("#tumblr__tmp").rss(
      "https://n-kamui.tumblr.com/rss",
      {
        // how many entries do you want?
        limit: 20,

        // want to offset results being displayed?
        // default: false
        // valid values: any integer
        offsetStart: false, // offset start point
        offsetEnd: false, // offset end point

        // will request the API via https
        ssl: true,

        // outer template for the html transformation
        // default: "<ul>{entries}</ul>"
        // valid values: any string
        layoutTemplate:
          '{entries}',

        // inner template for each entry
        // default: '<li><a href="{url}">[{author}@{date}] {title}</a><br/>{shortBodyPlain}</li>'
        // '<li><a href="{url}">{title}</a><span>{shortBodyPlain}</span><b>{teaserImage}</b></li>'
        // valid values: any string
        entryTemplate:
          '<li><a href="{url}">{title}</a><span>{shortBodyPlain}</span>{teaserImage}</li>',

        // additional token definition for in-template-usage
        // default: {}
        // valid values: any object/hash
        tokens: {
          foo: "bar",
          bar: function (entry, tokens) {
            return entry.title;
          },
        },

        // localizes the date with moment.js (optional)
        // default: 'en'
        dateLocale: "ja",

        // Defined the order of the feed's entries.
        // Default: undefined (keeps the order of the original feed)
        // valid values: All entry properties; title, link, content, contentSnippet, publishedDate, categories, author, thumbnail
        // Order can be reversed by prefixing a dash (-)
        order: "-publishedDate",

        // formats the date in whatever manner you choose. (optional)
        // this function should return your formatted date.
        // this is useful if you want to format dates without moment.js.
        // if you don't use moment.js and don't define a dateFormatFunction, the dates will
        // not be formatted; they will appear exactly as the RSS feed gives them to you.
        dateFormatFunction: function (date) {},

        // a callback, which gets triggered when an error occurs
        // default: function() { throw new Error("jQuery RSS: url don't link to RSS-Feed") }
        error: function () {},

        // a callback, which gets triggered when everything was loaded successfully
        // this is an alternative to the next parameter (callback function)
        // default: function(){}
        success: function () {},

        // a callback, which gets triggered once data was received but before the rendering.
        // this can be useful when you need to remove a spinner or something similar
        onData: function () {},
      },

      // callback function
      // called after feeds are successfully loaded and after animations are done
      function callback() {
        var imageLength = 10;
        var target = $j("#tumblr__tmp li");
        var imageBaseAry = [];
        var onloadedDataAry = [];
        var finishedCount = 0;
        var listsHTML = "";
        var checkOnloadImage = function () {
          if (finishedCount < imageBaseAry.length) {
            return false;
          } else {
            return true;
          }
        };
        target.each(function (index, el) {
          // console.dir(el);
          // console.log(target.eq(index).find('description')[0].textContent);
          imageBaseAry.push({
            src: $j(el).find("img").attr("src"),
            title: $j(el).find("a").text(),
            detail: $j(el).find("span").text(),
          });
        });
        for (var i = 0; i < imageBaseAry.length; i++) {
          var img = new Image();
          img.onload = function () {
            onloadedDataAry.push({
              src: this.src,
              height: this.height,
              width: this.width,
            });
            finishedCount++;
            if (checkOnloadImage()) {
              for (var i = 0; i < imageBaseAry.length; i++) {
                for (var j = 0; j < onloadedDataAry.length; j++) {
                  if (imageBaseAry[i].src === onloadedDataAry[j].src) {
                    imageBaseAry[i].height = onloadedDataAry[j].height;
                    imageBaseAry[i].width = onloadedDataAry[j].width;
                  }
                }
              }
              for (var k = 0; k < imageLength; k++) {
                listsHTML +=
                  '<li><img src="' +
                  imageBaseAry[k].src +
                  '" data-original="' +
                  imageBaseAry[k].src +
                  '" title="' +
                  imageBaseAry[k].title +
                  '" alt="' +
                  imageBaseAry[k].detail +
                  '" width="' +
                  imageBaseAry[k].width +
                  '" height="' +
                  imageBaseAry[k].height +
                  '"></li> ';
              }
              $j("#gallery > div.gallery__group").append(
                '<section class="gallery__item gallery__item--tumblr"><h2><a href="http://n-kamui.tumblr.com/">Tumblr</a></h2><ul>' +
                  listsHTML +
                  "</ul></section>"
              );
              // $j('#gallery .gallery__item--tumblr img[data-original]').lazyload();
            }
          };
          img.src = imageBaseAry[i].src;
          console.log(img.src)
          }
        setTimeout(function(){
          adjLay.update();
          mngGal.update();
          acNav.update();
          // console.log("update!");
        },1000)
      }
    );

    acNav.init();
    setTimeout(function() {
      adjLay.update();
      acNav.update();
    }, 3000);
    adjLay.init();
    mngGal.init();
    // MngPixiv.init();
    setSlideshow();
    $j(
      "#event img[data-original], #goods img[data-original], #gallery img[data-original]"
    ).lazyload({
      effect: "fadeIn"
    });
    windowEl.on("resize", function(event) {
      adjLay.update();
    });
  };

  // for mobile menu
  $j(".nav__button").on("click", function () {
    if ($j(".nav__menu").hasClass("active")) {
      $j(".nav__menu").removeClass("active");
    } else {
      $j(".nav__menu").addClass("active");
    }
  });

  // for smooth scroll
  $j(".nav__menu a,a.smooth").on("click", function () {
    var speed = 400;
    var href = $j(this).attr("href");
    var target = $j(href == "#" || href == "" ? "html" : href);
    var position = target.offset().top - ($j("#nav").height() /2 );
    $j("body, html").animate({ scrollTop: position }, speed, "swing");
    return false;
  });

  // for fadeInUp
  var fadeInUpEl = $j("#event .event__item > *, main > section > *");
  fadeInUpEl.css("visibility", "hidden");
  var fadeInUpFunc = function(){
    var windowHeight = $j(window).height(),
      topWindow = $j(window).scrollTop();
    fadeInUpEl.each(function () {
      var targetPosition = $j(this).offset().top;
      if (topWindow > targetPosition - windowHeight + 100) {
        $j(this).addClass("fadeInUp");
      }
    });
  }
  fadeInUpFunc()
  $j(window).scroll(function () {
    fadeInUpFunc();
  });

  // for work
  $j("#work h2").on("click", function () {
    if(!$j(this).hasClass("active")){
      $j("#work h2").removeClass("active");
      $j("#work .work__history").slideUp();
      $j(this).addClass("active").next().slideDown();
    }
  });



  var ActiveNav = function() {
    this.nowScrollTop;
    this.sectPos;
    this.navEl = $j("#nav");
    this.navListEl = this.navEl.find("ul.nav__menu li");
    this.sectEl = $j("#main > section:not(#etc)");
  };
  ActiveNav.prototype = {
    init: function() {
      var self = this;
      this.update();
      self.check();
      windowEl.on("scroll", function(event) {
        // console.log('check!')
        self.check();
      });
    },
    update: function() {
      var self = this;
      this.sectPos = [0];
      self.sectEl.each(function(index, el) {
        self.sectPos[index + 1] = $j(this).offset().top - ($j('#nav').height() / 1.2);
      });
    },
    check: function() {
      var self = this;
      self.nowScrollTop = windowEl.scrollTop();
      for (var i = 0; i < self.sectPos.length; i++) {
        if (self.nowScrollTop >= self.sectPos[self.sectPos.length - i] - 5) {
          self.navEl.find(".nav_main").addClass("active");
          self.navListEl
            .removeClass("active")
            .eq(self.sectPos.length - i - 1)
            .addClass("active");
          break;
        } else if (self.nowScrollTop < self.sectPos[1]) {
          self.navEl.find(".nav_main").removeClass("active");
          self.navListEl.removeClass("active");
        }
      }
    }
  };

  var AdjustLayout = function(acNav) {
    $j('<div id="checkHeight"></div>').appendTo("body");
    this.acNav = acNav;
    this.maxIndexOnMobile = 10;
    this.galleryRoot = $j("#gallery");
    this.headerEl = $j("#header");
    this.windowHeight;
  };
  AdjustLayout.prototype = {
    init: function() {
      var self = this,
        myImg,
        newType,
        targetNum,
        targetList,
        diffDate = function(targetDate) {
          var today = new Date();
          targetDate = new Date(targetDate);
          if (targetDate > today) {
            return true;
          } else {
            return false;
          }
        };

      self.galleryRoot.find("section.gallery__item").each(function(index, el) {
        var galleryULs = $j(this).not(".gallery__item--comic");
        galleryULs.each(function(index2, el2) {
          $j(this)
            .on("click", ".gallery__item__more_btn", function(event) {
              targetNum = $j(this).data("parent");
              targetList = galleryULs.find(
                "ul[data-max-length]:eq(" + targetNum + ")"
              );
              targetList
                .find("li.gallery__item-hide")
                .removeClass("gallery__item-hide")
                .addClass("anim__fadeIn");
              targetList
                .find("li.gallery__item-hide-smart")
                .removeClass("gallery__item-hide-smart");
              targetList.find("a.gallery__item__more_btn, a.gallery__item__more_btn-smart").remove();
              targetList.find("a.gallery__item__more_btn, a.gallery__item__more_btn-smart").remove();
              self.acNav.update();
            })
            .on("click", ".gallery__item__more_btn-smart", function(event) {
              targetNum = $j(this).data("parent");
              targetList = galleryULs.find(
                "ul[data-max-length-smart]:eq(" + targetNum + ")"
              );
              targetList
                .find("li.gallery__item-hide-smart")
                .removeClass("gallery__item-hide-smart")
                .addClass("anim__fadeIn");
              targetList
                .find("li.gallery__item-hide")
                .removeClass("gallery__item-hide");
              targetList.find("a.gallery__item__more_btn, a.gallery__item__more_btn-smart").remove();
              targetList.find("a.gallery__item__more_btn, a.gallery__item__more_btn-smart").remove();
              self.acNav.update();
            })
            .find("ul[data-max-length-smart]")
            .each(function(index, el) {
              $j(this).append(
                '<a class="anim__border__btn gallery__item__more_btn-smart" data-parent="' +
                  index +
                  '"><span class="anim__border__btn--inner">もっと見る</span></a>'
              );
            })
            .parent()
            .find("ul[data-max-length]")
            .each(function(index, el) {
              $j(this).append(
                '<a class="anim__border__btn gallery__item__more_btn" data-parent="' +
                  index +
                  '"><span class="anim__border__btn--inner">もっと見る</span></a>'
              );
            });
        });
        galleryULs
          .find("ul[data-max-length-smart]")
          .each(function(index, el) {
            $j(this)
              .find("li:gt(" + $j(this).data("max-length-smart") + ")")
              .each(function(index3, el3) {
                $j(this).addClass("gallery__item-hide-smart");
              });
          })
          .parent()
          .find("ul[data-max-length]")
          .each(function(index, el) {
            $j(this)
              .find("li:gt(" + $j(this).data("max-length") + ")")
              .each(function(index3, el3) {
                $j(this).addClass("gallery__item-hide");
              });
          });
        $j(this)
          .find("img[data-original]")
          .each(function(index4, el4) {
            myImg = $j(this);
            if (diffDate(myImg.data("new-end"))) {
              newType = myImg.data("new-type") ? myImg.data("new-type") : 0;
              myImg
                .after(
                  '<span class="new--info' + newType + '"><b>New!</b></span>'
                )
                .parent()
                .addClass("new--info" + newType);
            }
          });
      });
      self.update();
    },
    update: function() {
      var myImg,
        self = this,
        windowHeight = $j("#checkHeight").outerHeight(),
        // adEl = $j('.adingoFluctOverlay'),
        // adRatio = adEl.css('zoom') ? adEl.css('zoom') : 1,
        // adHeight = adEl.size() ? adEl.height()*adRatio : 0,
        adHeight = 0,
        adjustHeaderHeight =
          windowHeight -
          adHeight -
          self.headerEl.css("margin-top").replace("px", "");
      self.headerEl.height(adjustHeaderHeight);

      self.galleryRoot.find("section.gallery__item").each(function(index, el) {
        var parentName = $j(this)
          .find("h2")
          .text();
        $j(this)
          .find("img[data-original]")
          .each(function(index3, el3) {
            myImg = $j(this);
            myImg.attr("data-parent-name", parentName);
            myImg.width(
              myImg.attr("width") * (myImg.height() / myImg.attr("height"))
            );
          });
      });
    }
  };

  var setSlideshow = function() {
    var randnum,
      activeNum = 0,
      nextNum = activeNum + 1,
      rootEl = $j("#header__hero"),
      startDelay = 500,
      intervalSpan = rootEl.data("slideshow-span")
        ? rootEl.data("slideshow-span") * 1000
        : 4000,
      imagesEl = rootEl.find("div.header__hero__item"),
      imageLength = imagesEl.size(),
      slideShowBlurSpan = rootEl.data("slideshow-blur")
        ? rootEl.data("slideshow-blur") * 1000
        : 10000,
      activeState = true;
    setInterval(function() {
      if (activeState) {
        rootEl.removeClass("blur");
      } else {
        rootEl.addClass("blur");
      }
      activeState = false;
    }, slideShowBlurSpan);
    windowEl.on("mousedown touchstart mousemove", function(event) {
      if (!activeState) {
        rootEl.removeClass("blur");
      }
      activeState = true;
    });

    var slide = function() {
      randnum = Math.floor(Math.random() * 9);
      imagesEl
        .attr("data-origin-type", "")
        .removeClass("next")
        .removeClass("now")
        .eq(activeNum)
        .addClass("now")
        .attr("data-origin-type", randnum);
      imagesEl.eq(nextNum).addClass("next");
      if (activeNum < imageLength - 1) {
        activeNum++;
      } else {
        activeNum = 0;
      }
      if (activeNum + 1 < imageLength) {
        nextNum++;
      } else {
        nextNum = 0;
      }
    };

    rootEl.on(
      "animationend webkitAnimationEnd MSAnimationEnd",
      ".header__hero__item.next",
      function(event) {
        event.preventDefault();
        slide();
      }
    );
    imagesEl.addClass("hide").css({
      "-webkit-animation-duration": intervalSpan + "ms",
      "-moz-animation-duration": intervalSpan + "ms",
      "-ms-animation-duration": intervalSpan + "ms",
      "animation-duration": intervalSpan + "ms"
    });
    setTimeout(function() {
      imagesEl.eq(0).addClass("now");
      slide();
    }, startDelay);
  };

  var ManageGallery = function() {
    this.images = [];
    this.gallerys = [];
    this.galleryEls = $j(
      ".event__items, .goods__items, #gallery .gallery__group"
    );
    this.HTML = function() {
      return '<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true"><div class="pswp__bg"></div><div class="pswp__scroll-wrap"><div class="pswp__container"><div class="pswp__item"></div><div class="pswp__item"></div><div class="pswp__item"></div></div><div class="pswp__ui pswp__ui--hidden"><div class="pswp__top-bar"><div class="pswp__counter"></div><div class="pswp__cat--origin">test</div><button class="pswp__button pswp__button--close" title="Close (Esc)"></button><button class="pswp__button pswp__button--share" title="Share"></button><button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button><button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button><div class="pswp__preloader"><div class="pswp__preloader__icn"><div class="pswp__preloader__cut"><div class="pswp__preloader__donut"></div></div></div></div></div><div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap"><div class="pswp__share-tooltip"></div></div><button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button><button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button><div class="pswp__caption"><div class="pswp__caption__center"></div></div></div></div></div>';
    };
    $j("body")
      .append(this.HTML)
      .on("selectstart contextmenu", ".pswp img", function(event) {
        event.preventDefault();
      });
    this.galleryWindowEl = $j(".pswp")[0];
  };
  ManageGallery.prototype = {
    init: function() {
      var self = this,
        targetImg;

      self.update();
      self.galleryEls.each(function(index, el) {
        self.add($j(this));
      });
      $j("body").on("click", "a[data-gallery-href]", function(event) {
        targetImg = self.galleryEls.find(
          'img[data-original="' + $j(this).data("gallery-href") + '"]'
        );
        self.show(targetImg.data("parent-count"), targetImg.data("count"));
        event.preventDefault();
      });
    },
    add: function(target) {
      var self = this;
      target.on("click", "img", function(event) {
        // parentIndex index
        var parentIndex = $j(this).data("parent-count");
        var myIndex = $j(this).data("count");
        self.show(parentIndex, myIndex);
        event.preventDefault();
      });
    },
    show: function(parentIndex, myIndex) {
      var self = this,
        loopState = parentIndex < 1 ? true : false,
        prevBtnEl = $j(".pswp__button--arrow--left"),
        nextBtnEl = $j(".pswp__button--arrow--right"),
        nowIndex,
        itemLength,
        options = {
          history: false,
          index: myIndex,
          loop: loopState,
          galleryUID: parentIndex + 1
        };
      // console.log(loopState);
      self.gallerys[parentIndex] = new PhotoSwipe(
        self.galleryWindowEl,
        PhotoSwipeUI_Default,
        self.images[parentIndex],
        options
      );
      self.gallerys[parentIndex].listen("afterChange", function() {
        nowIndex = self.gallerys[parentIndex].getCurrentIndex();
        itemLength = self.images[parentIndex].length;
        if (nowIndex === 0 && !self.gallerys[parentIndex].options.loop) {
          prevBtnEl.hide();
        } else {
          prevBtnEl.show();
        }
        if (
          nowIndex === itemLength - 1 &&
          !self.gallerys[parentIndex].options.loop
        ) {
          nextBtnEl.hide();
        } else {
          nextBtnEl.show();
        }
        var imgIndex = self.gallerys[parentIndex].getCurrentIndex();
        var target = self.images[parentIndex][imgIndex];
        $j(".pswp__cat--origin").html(
          '<span class="pswp__cat--origin-cat">' +
            target["parent"] +
            '</span><span class="pswp__cat--origin-title">' +
            target["cat"] +
            "</span>"
        );
      });
      self.gallerys[parentIndex].init();
    },
    update: function() {
      var self = this;
      self.images = [];
      self.galleryEls.each(function(index, el) {
        self.images[index] = [];
        $j(this)
          .find("img")
          .each(function (index2, el2) {
            var myImg = $j(this);
            myImg.attr("data-parent-count", index);
            myImg.attr("data-count", index2);
            self.images[index][index2] = {
              title: myImg.attr("alt"),
              cat: myImg.attr("title") ? myImg.attr("title") : "",
              parent: myImg.data("parent-name")
                ? myImg.data("parent-name")
                : "",
              src: myImg.data("original"),
              w: myImg.attr("width"),
              h: myImg.attr("height"),
            };
          })
          .on("selectstart contextmenu", function (event) {
            event.preventDefault();
          });
      });
    }
  };

  /*
  var ManagePixivImages = function() {};
  ManagePixivImages.prototype = {
    init: function() {
      $j.ajax({
        url: "https://bee22be.000webhostapp.com/gyokuro02/pixiv.php",
        type: "GET",
        dataType: "html"
      }).done(function(data) {
        console.dir($j(data));
        // var targetHTML = $j(data)[0]["query"]["results"]["result"];
        // console.dir($j(targetHTML).find("ul.ui-brick img"));

        // ↓以下を正規表現してID取り出して置き換える
        // https://i.pximg.net/c/600x1200_90/img-master/img/2017/08/07/17/19/57/64275755_p0_master1200.jpg
        // http://embed.pixiv.net/decorate.php?illust_id=64275755

        var imageLength = 10;
        var target = $j(data).find("item");
        var imageBaseAry = [];
        var onloadedDataAry = [];
        var finishedCount = 0;
        var reg = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;
        var match;
        var listsHTML = "";
        1;
        var checkOnloadImage = function() {
          if (finishedCount < imageBaseAry.length) {
            return false;
          } else {
            return true;
          }
        };
        target.each(function(index, el) {
          // console.log(target.eq(index).find('description')[0].textContent);
          while (
            (match = reg.exec(
              target.eq(index).find("description")[0].textContent
            ))
          ) {
            imageBaseAry.push({
              src: match[1],
              title: target
                .eq(index)
                .find("category")
                .eq(0)
                .text(),
              detail: target
                .eq(index)
                .find("title")
                .text()
            });
          }
        });
        for (var i = 0; i < imageBaseAry.length; i++) {
          var img = new Image();
          img.onload = function() {
            onloadedDataAry.push({
              src: this.src,
              height: this.height,
              width: this.width
            });
            finishedCount++;
            if (checkOnloadImage()) {
              for (var i = 0; i < imageBaseAry.length; i++) {
                for (var j = 0; j < onloadedDataAry.length; j++) {
                  if (imageBaseAry[i].src === onloadedDataAry[j].src) {
                    imageBaseAry[i].height = onloadedDataAry[j].height;
                    imageBaseAry[i].width = onloadedDataAry[j].width;
                  }
                }
              }
              for (var k = 0; k < imageLength; k++) {
                listsHTML +=
                  '<li><img src="' +
                  imageBaseAry[k].src +
                  '" data-original="' +
                  imageBaseAry[k].src +
                  '" title="' +
                  imageBaseAry[k].title +
                  '" alt="' +
                  imageBaseAry[k].detail +
                  '" width="' +
                  imageBaseAry[k].width +
                  '" height="' +
                  imageBaseAry[k].height +
                  '"></li> ';
              }
              $j("#gallery > div.gallery__group").append(
                '<section class="gallery__item gallery__item--pixiv"><h2><a href="https://www.pixiv.net/member.php?id=10285477">Pixiv</a></h2><ul>' +
                  listsHTML +
                  "</ul></section>"
              );
              // $j('#gallery .gallery__item--tumblr img[data-original]').lazyload();

              self.callback();
            }
          };
          img.src = imageBaseAry[i].src;
        }
      });
    }
  };
  */
  function toHms(t) {
    var hms = "";
    var h = (t / 3600) | 0;
    var m = ((t % 3600) / 60) | 0;
    var s = t % 60;

    if (h != 0) {
      hms = h + ":" + padZero(m) + ":" + padZero(s) + ":";
    } else if (m != 0) {
      hms = m + ":" + padZero(s) + ":";
    } else {
      hms = "00:" + padZero(s);
    }

    return hms;

    function padZero(v) {
      if (v < 10) {
        return "0" + v;
      } else {
        return v;
      }
    }
  }
  init();
});
