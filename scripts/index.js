import $ from "jquery";

// Form With Steps

$.fn.create_form = function() {
  const sections = this.find(".form-carousel > section").toArray();
  const steps = () => this.find(".form-steps > li").toArray();
  const ctrl = {
    _index: 0,
    onChange() {
      sections.forEach(el => $(el).css("left", `-${100 * this._index}%`));
      steps(this._index).forEach((el, idx) => {
        if (idx < this._index) {
          $(el).addClass("complete");
        } else {
          $(el).removeClass("complete");
        }
      });
    },
    next() {
      this._index = Math.min(this._index + 1, sections.length - 1);
      this.onChange();
    },
    prev() {
      this._index = Math.max(this._index - 1, 0);
      this.onChange();
    }
  };

  this.find(".form-steps").append(
    sections.map(el => `<li>${$(el).data("step")}</li>`).join("")
  );

  this.find(".next-btn").on("click", () => ctrl.next());
  this.find(".prev-btn").on("click", () => ctrl.prev());
};

$(".register-form").create_form();

// Progress Bar

$.fn.create_progress_bar = function(n, msg = `${n * 100}/100`) {
  this.append(`
    <div class="progress-bar-text">${msg}</div>
    <div class="progress-bar-fill" style="width: ${n * 100}%;"></div>
  `);

  this.removeClass("bg-success");
  this.removeClass("bg-warning");
  this.removeClass("bg-danger");

  if (n <= 0.25) {
    this.addClass("bg-success");
  } else if (n <= 0.75) {
    this.addClass("bg-warning");
  } else {
    this.addClass("bg-danger");
  }
};

$("#fat-bar").create_progress_bar(0.2);
$("#carb-bar").create_progress_bar(0.7);
$("#protin-bar").create_progress_bar(0.9);

// Ripple Effect

$(".ripple")
  .toArray()
  .forEach(el => {
    $(el).append(`<span class="ink"></span>`);
    $(el).click(function(e) {
      let parent = $(this).parent();
      let ink = parent.find(".ink");

      //in case of quick double clicks
      //stop the previous animation
      ink.removeClass("animate");

      //set size of .ink
      if (!ink.height() && !ink.width()) {
        //use parent's width or height whichever
        //is larger for the diameter to make a circle
        //which can cover the entire element
        let size = Math.max(parent.outerWidth(), parent.outerHeight());
        ink.css({
          height: size,
          width: size
        });
      }

      //set the position and add class .animate
      ink
        .css({
          top: e.pageY - parent.offset().top - ink.height() / 2 + "px",
          left: e.pageX - parent.offset().left - ink.width() / 2 + "px"
        })
        .addClass("animate");
    });
  });
