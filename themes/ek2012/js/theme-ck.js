yepnope(themedir+"/js/jquery.cookie.js");$(document).ready(function(e){updateCarouselIndicator=function(t){var n=e(this),r=n.find(".item.active").index(),i=n.find(".carousel-indicator li");i.removeClass("active");i.eq(r).addClass("active")};e("#search-toggle").on({click:function(){e("#basic-search").toggleClass("expanded")}});e("#basic-search").on({focus:function(){var t=e(this);t.data("placeholder",t.attr("placeholder")).removeAttr("placeholder")},blur:function(){var t=e(this);t.attr("placeholder",t.data("placeholder"))}},"input");e("#feature .carousel").carousel({interval:1e5}).on({slide:function(t){var n=t.relatedTarget||e(this).find(".item:first").get(0),r=e(e(n).data("description"));r.siblings().removeClass("active");r.addClass("active")},slid:updateCarouselIndicator});e(".carousel-indicator").on({click:function(t){var n=e(t.target),r=n.data("slide_to");n.parents(".carousel").carousel(r)}},"a");e("#category-carousel").carousel({interval:2e4}).on({slid:updateCarouselIndicator});e("ul#carousel-section-nav > li").on({click:function(t){var n=e(this);e("#carousel-section-nav > li").removeClass("active");n.parent("li").addClass("active");e(".carousel-section-content").removeClass("active");e(n.data("section")).addClass("active");e(".carousel-section-content").not(".active").hide();e(".carousel-section-content.active").show();e("#feature .carousel").removeClass("active");e(n.data("carousel")).addClass("active")}},"a");e("#view-controls").on({click:function(t){t.preventDefault();var n=e(t.target),r=n.data("action"),i=n.data("target")||"#post-list";typeof viewControls[r]=="function"&&viewControls[r](i,t)}},"a");e("#cat-filters").on({click:function(t){t.preventDefault();e(t.target).attr("id")=="close-cat-filters"?e("#cat-filters").slideUp():e(this).parent("li").toggleClass("selected")}},"a");var t=e("#related-artists .post-list"),n=t.find(".post:first").outerWidth();e("#related-artists .post").width(n);var r=t.find(".post:first").outerWidth(!0)*3;e(".post-share").length&&e(".post-share li").each(function(t,n){e(this).hover(function(){e(this).addClass("active")},function(){e(this).removeClass("active")})});yepnope({test:e("#cat-filters, #sfw-filter").length,yep:themedir+"/js/spin.min.js",callback:function(t,n,r){e("#main").on({click:filterPosts},"#filter-btn");if(lastFilter.category__in&&lastFilter.category__in.length){e.each(lastFilter.category__in,function(t,n){e("#cat-filters").find('li[data-cat_id="'+n+'"]').addClass("selected")});lastFilter.tag__not_in==e("#sfw-filter").data("nsfw_tagid")&&e("#sfw-filter").addClass("checked");setTimeout(function(){e("#filter-btn").trigger("click")},100)}else lastFilter.sfw&&window.location.href.indexOf("/sfw/")==-1&&e("#sfw-filter a").trigger("click")}});yepnope({test:e("#related-artists").length,yep:themedir+"/js/spin.min.js",callback:function(){e("#related-artists").on({click:function(i){var s=e(i.target),o=t.data("cur_page"),u=t.data("max_page");if(s.hasClass("prev")){t.css("left","+="+r);t.data("cur_page",o-1);o-1==1&&s.css("visibility","hidden")}else if(s.hasClass("next"))if(o==u){var a=(new Spinner(spinnerOpts)).spin(s.parent().get(0));e.post(ajaxurl,{action:"ek_load_posts",nonce:t.data("nonce"),query:{posts_per_page:3,paged:t.data("max_page")+1,category__in:[t.data("cats")]}},function(i){a.stop();t.css({width:"+="+r,left:"-="+r});t.append(e(i).find(".span4").width(n));t.data("max_page",t.data("max_page")+1);t.data("cur_page",t.data("cur_page")+1);t.data("nonce",e(i).filter("#nonce").text());s.prev(".prev").css("visibility","visible")})}else{t.css("left","-="+r);t.data("cur_page",t.data("cur_page")+1);s.prev(".prev").css("visibility","visible")}}},"a.prev, a.next")}});filterPosts=function(){var e=jQuery,t=e(this),n=[],r=e("#sfw-filter").data("nsfw_tagid");e("#cat-filters").find("li.selected").each(function(t,r){n.push(e(r).data("cat_id"))});var i={category__in:n};i=e.extend({},origQuery,i);if(e("#sfw-filter").hasClass("checked")){i.tag__not_in=r;i.sfw=!0}else delete i.sfw;var s=(new Spinner(spinnerOpts)).spin(t.parent().get(0));e("#post-list").load(ajaxurl,{action:"ek_load_posts",nonce:e("#view-controls").data("nonce"),query:i},function(n){e.cookie("lastFilter",JSON.stringify(i),{path:"/"});s.stop();i.category__in.length?e("#cat-filter").addClass("active").find("a").text("Filter By Category [on]"):e("#cat-filter").removeClass("active").find("a").text("Filter By Category");i.sfw?e(".container a[href], #footer a[href]").each(function(t,n){var r=e(this);r.attr("href").indexOf("/sfw/")==-1&&r.attr("href",r.attr("href").replace(siteurl,siteurl+"sfw/"))}):e(".container a[href], #footer a[href]").each(function(t,n){var r=e(this);r.attr("href",r.attr("href").replace("/sfw/","/"))});if(t.attr("id")=="filter-btn"){e("#cat-filters").slideUp();var r=e("#view-controls").offset().top-10;e("#wpadminbar").length&&(r-=e("#wpadminbar").outerHeight());e("#view-controls").data("nonce",e(n).filter("#nonce").text());e("html, body").animate({scrollTop:r},200)}})};e("ul.sub-menu").each(function(t,n){var r=e(this),i=r.closest("li");i.hover(function(){i.addClass("active")},function(){i.removeClass("active")})});e(".widget h4").on({mouseup:function(){e(this).closest(".widget").toggleClass("collapsed")}})});var viewControls={gridView:function(e){$("#grid-view").addClass("active");$("#list-view").removeClass("active");this.switchView("list","grid",e)},listView:function(e){$("#list-view").addClass("active");$("#grid-view").removeClass("active");this.switchView("grid","list",e)},switchView:function(e,t,n){$(n).removeClass(e).addClass(t)},showCatFilters:function(e){$("#cat-filters").slideToggle()},filterSfw:function(e,t){$("#sfw-filter").toggleClass("checked");filterPosts.call(t.target)}};spinnerOpts={lines:15,length:0,width:3,radius:10,corners:1,rotate:90,color:"#00B8EC",speed:1.4,trail:40,shadow:!1,hwaccel:!1,className:"spinner",zIndex:2e9,top:"auto",left:-10};