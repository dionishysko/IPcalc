(function ($) {
  'use strict';


  $(window).on('load', function () {
    $('#preloader').fadeOut('slow', function () {
      $(this).remove();
    });
  });


  //Hero Slider
  $('.hero-slider').slick({
    autoplay: true,
    infinite: true,
    arrows: true,
    prevArrow: '<button type=\'button\' class=\'prevArrow\'></button>',
    nextArrow: '<button type=\'button\' class=\'nextArrow\'></button>',
    dots: false,
    autoplaySpeed: 7000,
    pauseOnFocus: false,
    pauseOnHover: false
  });
  $('.hero-slider').slickAnimation();


  /* ========================================================================= */
  /*	Header Scroll Background Change
  /* ========================================================================= */

  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    //console.log(scroll);
    if (scroll > 200) {
      //console.log('a');
      $('.navigation').addClass('sticky-header');
    } else {
      //console.log('a');
      $('.navigation').removeClass('sticky-header');
    }
  });




  /* ========================================================================= */
  /*	On scroll fade/bounce effect
  /* ========================================================================= */
  var scroll = new SmoothScroll('a[href*="#"]');

  // -----------------------------
  //  Count Up
  // -----------------------------
  function counter() {
    if ($('.counter').length !== 0) {
      var oTop = $('.counter').offset().top - window.innerHeight;
    }
    if ($(window).scrollTop() > oTop) {
      $('.counter').each(function () {
        var $this = $(this),
          countTo = $this.attr('data-count');
        $({
          countNum: $this.text()
        }).animate({
          countNum: countTo
        }, {
          duration: 1000,
          easing: 'swing',
          step: function () {
            $this.text(Math.floor(this.countNum));
          },
          complete: function () {
            $this.text(this.countNum);
          }
        });
      });
    }
  }
  // -----------------------------
  //  On Scroll
  // -----------------------------
  $(window).scroll(function () {
    counter();
  });

})(jQuery);

$(document).ready(function () {

  //$('#rezalatet').hide();

  $('#kalkulo').click(function (e) {
      e.preventDefault();
      var firstDigits = parseInt($("#firstDigits").val());
      var firstDigitsOnNetwork = parseInt($("#firstDigits").val());
      var secondDigits = parseInt($("#secondDigits").val());
      var secondDigitsOnNetwork = parseInt($("#secondDigits").val());
      var thirdDigits = parseInt($("#thirdDigits").val());
      var thirdDigitsOnNetwork = parseInt($("#thirdDigits").val());
      var fourthDigits = parseInt($("#fourthDigits").val());
      var fourthDigitsOnNetwork = parseInt($("#fourthDigits").val());
      var prefix = parseInt($('#prefix').val());

      var firstDigitsBinar = [0, 0, 0, 0, 0, 0, 0, 0];
      var secondDigitsBinar = [0, 0, 0, 0, 0, 0, 0, 0];
      var thirdDigitsBinar = [0, 0, 0, 0, 0, 0, 0, 0];
      var fourthDigitsBinar = [0, 0, 0, 0, 0, 0, 0, 0];

      var digits1 = 7;
      var digits2 = 7;
      var digits3 = 7;
      var digits4 = 7;
//Ky rresht fshin te gjitha te dhenat ne queryin e kaluar, ne menyre qe te tregoj vetem queryin aktual


      $('#rezultatet').hide();
      $('#rezultatet').slideDown();
      $('h4').remove();
      $('h5').remove();


      ////////////Konvertim//////////////////////////

      ////////////SHIFRAT E PARA/////////////////////////
      if (firstDigits > 255 || secondDigits > 255 || thirdDigits > 255 || fourthDigits > 255 || prefix > 31) {

          alert("Te dhena te gabuara!!!");
      } else {
          var addressNetwork = firstDigits + "." + secondDigits + "." + thirdDigits + "." + fourthDigits;
          do {
              if (Math.trunc(firstDigits) == 1) {
                  firstDigitsBinar[digits1] = 1;
              } else if (Math.trunc(firstDigits % 2) == 1) {
                  firstDigitsBinar[digits1] = 1;
              }
              digits1--;
              firstDigits /= 2;
          } while (firstDigits >= 1);

          //////////////////////////SHIFRAT E DYTA//////////////////////////


          do {
              if (Math.trunc(secondDigits) == 1) {
                  secondDigitsBinar[digits2] = 1;
              } else if (Math.trunc(secondDigits % 2) == 1) {
                  secondDigitsBinar[digits2] = 1;
              }
              digits2--;
              secondDigits /= 2;
          } while (secondDigits >= 1);


          /////////////////////////SHIFRAT E TRETA///////////////////////////////////////


          do {
              if (Math.trunc(thirdDigits) == 1) {
                  thirdDigitsBinar[digits3] = 1;
              } else if (Math.trunc(thirdDigits % 2) == 1) {
                  thirdDigitsBinar[digits3] = 1;
              }
              digits3--;
              thirdDigits /= 2;
          } while (thirdDigits >= 1);


          ////////////////////////////SHIFRAT E KATERTA//////////////////////////////////////

          do {
              if (Math.trunc(fourthDigits) == 1) {
                  fourthDigitsBinar[digits4] = 1;
              } else if (Math.trunc(fourthDigits % 2) == 1) {
                  fourthDigitsBinar[digits4] = 1;
              }
              digits4--;
              fourthDigits /= 2;
          } while (fourthDigits >= 1);


          ///////////////////////////////////////

          var addressNetworkBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('') + "/" + prefix;
      }

      //////////////////////////KALKULIMI I MASK DHE BROADCAST

      if (prefix == 8) {
          var maskBinar = "11111111.00000000.00000000.00000000";
          var mask = "255.0.0.0";
          var wildcardBinar = "00000000.11111111.11111111.11111111";
          var wildcard = "0.255.255.255";

          secondDigitsBinar = [0, 0, 0, 0, 0, 0, 0, 0];
          thirdDigitsBinar = [0, 0, 0, 0, 0, 0, 0, 0];
          fourthDigitsBinar = [0, 0, 0, 0, 0, 0, 0, 0];
          thirdDigitsOnNetwork = 0;
          fourthDigitsOnNetwork = 0;
          var addressNetworkBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('') + "/" + prefix;
          var secondDigitsOnNetwork = ((secondDigitsBinar [0] * 128) + (secondDigitsBinar [1] * 64) + (secondDigitsBinar [2] * 32) + (secondDigitsBinar[3] * 16) + (secondDigitsBinar [4] * 8) +
              (secondDigitsBinar [5] * 4) + (secondDigitsBinar [6] * 2) + (secondDigitsBinar [7] * 1));
          var addressNetwork = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;

          fourthDigitsBinar = [0, 0, 0, 0, 0, 0, 0, 1];
          var hostPareBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('') + "/" + prefix;
          var hostPare = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + "1";

          secondDigitsBinar = [1, 1, 1, 1, 1, 1, 1, 1];
          thirdDigitsBinar = [1, 1, 1, 1, 1, 1, 1, 1];
          fourthDigitsBinar = [1, 1, 1, 1, 1, 1, 1, 0];
          var hostFunditBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('');
          var secondDigitsOnNetwork = ((secondDigitsBinar [0] * 128) + (secondDigitsBinar [1] * 64) + (secondDigitsBinar [2] * 32) + (secondDigitsBinar[3] * 16) + (secondDigitsBinar [4] * 8) +
              (secondDigitsBinar [5] * 4) + (secondDigitsBinar [6] * 2) + (secondDigitsBinar [7] * 1));
          var thirdDigitsOnNetwork = ((thirdDigitsBinar [0] * 128) + (thirdDigitsBinar [1] * 64) + (thirdDigitsBinar [2] * 32) + (thirdDigitsBinar[3] * 16) + (thirdDigitsBinar [4] * 8) +
              (thirdDigitsBinar [5] * 4) + (thirdDigitsBinar [6] * 2) + (thirdDigitsBinar [7] * 1));
          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));

          var hostFundit = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;

          fourthDigitsBinar = [1, 1, 1, 1, 1, 1, 1, 1];
          var broadcastBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('');

          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));

          var broadcast = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsBinar;
      } else if (prefix == 9) {
          var maskBinar = "11111111.10000000.00000000.00000000";
          var mask = "255.128.0.0";
          var wildcardBinar = "00000000.01111111.11111111.11111111";
          var wildcard = "0.127.255.255";
          secondDigitsBinar [1] = 0;
          secondDigitsBinar [2] = 0;
          secondDigitsBinar [3] = 0;
          secondDigitsBinar [4] = 0;
          secondDigitsBinar [5] = 0;
          secondDigitsBinar [6] = 0;
          secondDigitsBinar [7] = 0;
          thirdDigitsBinar = [0, 0, 0, 0, 0, 0, 0, 0];
          fourthDigitsBinar = [0, 0, 0, 0, 0, 0, 0, 0];
          thirdDigitsOnNetwork = 0;
          fourthDigitsOnNetwork = 0;
          var addressNetworkBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('') + "/" + prefix;
          var secondDigitsOnNetwork = ((secondDigitsBinar [0] * 128) + (secondDigitsBinar [1] * 64) + (secondDigitsBinar [2] * 32) + (secondDigitsBinar[3] * 16) + (secondDigitsBinar [4] * 8) +
              (secondDigitsBinar [5] * 4) + (secondDigitsBinar [6] * 2) + (secondDigitsBinar [7] * 1));
          var addressNetwork = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;

          fourthDigitsBinar = [0, 0, 0, 0, 0, 0, 0, 1];
          var hostPareBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('') + "/" + prefix;
          var hostPare = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + "1";

          secondDigitsBinar [1] = 1;
          secondDigitsBinar [2] = 1;
          secondDigitsBinar [3] = 1;
          secondDigitsBinar [4] = 1;
          secondDigitsBinar [5] = 1;
          secondDigitsBinar [6] = 1;
          secondDigitsBinar [7] = 1;
          thirdDigitsBinar = [1, 1, 1, 1, 1, 1, 1, 1];
          fourthDigitsBinar = [1, 1, 1, 1, 1, 1, 1, 0];
          var hostFunditBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('');
          var secondDigitsOnNetwork = ((secondDigitsBinar [0] * 128) + (secondDigitsBinar [1] * 64) + (secondDigitsBinar [2] * 32) + (secondDigitsBinar[3] * 16) + (secondDigitsBinar [4] * 8) +
              (secondDigitsBinar [5] * 4) + (secondDigitsBinar [6] * 2) + (secondDigitsBinar [7] * 1));
          var thirdDigitsOnNetwork = ((thirdDigitsBinar [0] * 128) + (thirdDigitsBinar [1] * 64) + (thirdDigitsBinar [2] * 32) + (thirdDigitsBinar[3] * 16) + (thirdDigitsBinar [4] * 8) +
              (thirdDigitsBinar [5] * 4) + (thirdDigitsBinar [6] * 2) + (thirdDigitsBinar [7] * 1));
          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));

          var hostFundit = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwrok +
              "." + fourthDigitsOnNetwork;

          fourthDigitsBinar = [1, 1, 1, 1, 1, 1, 1, 1];
          var broadcastBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('');

          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));

          var broadcast = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwrok +
              "." + fourthDigitsOnNetwork;
      } else if (prefix == 10) {
          var maskBinar = "11111111.11000000.00000000.00000000";
          var mask = "255.192.0.0";
          var wildcardBinar = "00000000.00111111.11111111.11111111";
          var wildcard = "0.63.255.255";
          secondDigitsBinar [2] = 0;
          secondDigitsBinar [3] = 0;
          secondDigitsBinar [4] = 0;
          secondDigitsBinar [5] = 0;
          secondDigitsBinar [6] = 0;
          secondDigitsBinar [7] = 0;
          thirdDigitsBinar = [0, 0, 0, 0, 0, 0, 0, 0];
          fourthDigitsBinar = [0, 0, 0, 0, 0, 0, 0, 0];
          thirdDigitsOnNetwork = 0;
          fourthDigitsOnNetwork = 0;
          var addressNetworkBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('') + "/" + prefix;
          var secondDigitsOnNetwork = ((secondDigitsBinar [0] * 128) + (secondDigitsBinar [1] * 64) + (secondDigitsBinar [2] * 32) + (secondDigitsBinar[3] * 16) + (secondDigitsBinar [4] * 8) +
              (secondDigitsBinar [5] * 4) + (secondDigitsBinar [6] * 2) + (secondDigitsBinar [7] * 1));
          var addressNetwork = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwrok +
              "." + fourthDigitsOnNetwork;

          fourthDigitsBinar = [0, 0, 0, 0, 0, 0, 0, 1];
          var hostPareBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('') + "/" + prefix;
          var hostPare = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + "1";

          secondDigitsBinar [2] = 1;
          secondDigitsBinar [3] = 1;
          secondDigitsBinar [4] = 1;
          secondDigitsBinar [5] = 1;
          secondDigitsBinar [6] = 1;
          secondDigitsBinar [7] = 1;
          thirdDigitsBinar = [1, 1, 1, 1, 1, 1, 1, 1];
          fourthDigitsBinar = [1, 1, 1, 1, 1, 1, 1, 0];
          var hostFunditBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('');
          var secondDigitsBinar = ((secondDigitsBinar [0] * 128) + (secondDigitsBinar [1] * 64) + (secondDigitsBinar [2] * 32) + (secondDigitsBinar[3] * 16) + (secondDigitsBinar [4] * 8) +
              (secondDigitsBinar [5] * 4) + (secondDigitsBinar [6] * 2) + (secondDigitsBinar [7] * 1));
          var thirdDigitsOnNetwork = ((thirdDigitsBinar [0] * 128) + (thirdDigitsBinar [1] * 64) + (thirdDigitsBinar [2] * 32) + (thirdDigitsBinar[3] * 16) + (thirdDigitsBinar [4] * 8) +
              (thirdDigitsBinar [5] * 4) + (thirdDigitsBinar [6] * 2) + (thirdDigitsBinar [7] * 1));
          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));

          var hostFundit = firstDigitsOnNetwork + "." + secondDigitsBinar + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;

          fourthDigitsBinar = [1, 1, 1, 1, 1, 1, 1, 1];
          var broadcastBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('');

          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));

          var broadcast = firstDigitsOnNetwork + "." + secondDigitsBinar + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;
      } else if (prefix == 11) {
          var maskBinar = "11111111.11100000.00000000.00000000";
          var mask = "255.224.0.0";
          var wildcardBinar = "00000000.00011111.11111111.11111111";
          var wildcard = "0.31.255.255";
          secondDigitsBinar [3] = 0;
          secondDigitsBinar [4] = 0;
          secondDigitsBinar [5] = 0;
          secondDigitsBinar [6] = 0;
          secondDigitsBinar [7] = 0;
          thirdDigitsBinar = [0, 0, 0, 0, 0, 0, 0, 0];
          fourthDigitsBinar = [0, 0, 0, 0, 0, 0, 0, 0];
          thirdDigitsOnNetwork = 0;
          fourthDigitsOnNetwork = 0;
          var addressNetworkBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('') + "/" + prefix;
          var secondDigitsOnNetwork = ((secondDigitsBinar [0] * 128) + (secondDigitsBinar [1] * 64) + (secondDigitsBinar [2] * 32) + (secondDigitsBinar[3] * 16) + (secondDigitsBinar [4] * 8) +
              (secondDigitsBinar [5] * 4) + (secondDigitsBinar [6] * 2) + (secondDigitsBinar [7] * 1));
          var addressNetwork = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;

          fourthDigitsBinar = [0, 0, 0, 0, 0, 0, 0, 1];
          var hostPareBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('') + "/" + prefix;
          var hostPare = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + "1";

          secondDigitsBinar [3] = 1;
          secondDigitsBinar [4] = 1;
          secondDigitsBinar [5] = 1;
          secondDigitsBinar [6] = 1;
          secondDigitsBinar [7] = 1;
          thirdDigitsBinar = [1, 1, 1, 1, 1, 1, 1, 1];
          fourthDigitsBinar = [1, 1, 1, 1, 1, 1, 1, 0];
          var hostFunditBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('');
          var secondDigitsOnNetwork = ((secondDigitsBinar [0] * 128) + (secondDigitsBinar [1] * 64) + (secondDigitsBinar [2] * 32) + (secondDigitsBinar[3] * 16) + (secondDigitsBinar [4] * 8) +
              (secondDigitsBinar [5] * 4) + (secondDigitsBinar [6] * 2) + (secondDigitsBinar [7] * 1));
          var thirdDigitsOnNetwork = ((thirdDigitsBinar [0] * 128) + (thirdDigitsBinar [1] * 64) + (thirdDigitsBinar [2] * 32) + (thirdDigitsBinar[3] * 16) + (thirdDigitsBinar [4] * 8) +
              (thirdDigitsBinar [5] * 4) + (thirdDigitsBinar [6] * 2) + (thirdDigitsBinar [7] * 1));
          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));

          var hostFundit = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;

          fourthDigitsBinar = [1, 1, 1, 1, 1, 1, 1, 1];
          var broadcastBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('');

          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));

          var broadcast = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;
      } else if (prefix == 12) {
          var maskBinar = "11111111.11110000.00000000.00000000";
          var mask = "255.240.0.0";
          var wildcardBinar = "00000000.00001111.11111111.11111111";
          var wildcard = "0.15.255.255";
          secondDigitsBinar [4] = 0;
          secondDigitsBinar [5] = 0;
          secondDigitsBinar [6] = 0;
          secondDigitsBinar [7] = 0;
          thirdDigitsBinar = [0, 0, 0, 0, 0, 0, 0, 0];
          fourthDigitsBinar = [0, 0, 0, 0, 0, 0, 0, 0];
          thirdDigitsOnNetwork = 0;
          fourthDigitsOnNetwork = 0;
          var addressNetworkBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('') + "/" + prefix;
          var secondDigitsOnNetwork = ((secondDigitsBinar [0] * 128) + (secondDigitsBinar [1] * 64) + (secondDigitsBinar [2] * 32) + (secondDigitsBinar[3] * 16) + (secondDigitsBinar [4] * 8) +
              (secondDigitsBinar [5] * 4) + (secondDigitsBinar [6] * 2) + (secondDigitsBinar [7] * 1));
          var addressNetwork = firstDigitsOnNetwork + "." + segundoOctetoRed + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;

          fourthDigitsBinar = [0, 0, 0, 0, 0, 0, 0, 1];
          var hostPareBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('') + "/" + prefix;
          var hostPare = firstDigitsOnNetwork + "." + segundoOctetoRed + "." + thirdDigitsOnNetwork +
              "." + "1";

          secondDigitsBinar [4] = 1;
          secondDigitsBinar [5] = 1;
          secondDigitsBinar [6] = 1;
          secondDigitsBinar [7] = 1;
          thirdDigitsBinar = [1, 1, 1, 1, 1, 1, 1, 1];
          fourthDigitsBinar = [1, 1, 1, 1, 1, 1, 1, 0];
          var hostFunditBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('');
          var secondDigitsOnNetwork = ((secondDigitsBinar [0] * 128) + (secondDigitsBinar [1] * 64) + (secondDigitsBinar [2] * 32) + (secondDigitsBinar[3] * 16) + (secondDigitsBinar [4] * 8) +
              (secondDigitsBinar [5] * 4) + (secondDigitsBinar [6] * 2) + (secondDigitsBinar [7] * 1));
          var thirdDigitsOnNetwork = ((thirdDigitsBinar [0] * 128) + (thirdDigitsBinar [1] * 64) + (thirdDigitsBinar [2] * 32) + (thirdDigitsBinar[3] * 16) + (thirdDigitsBinar [4] * 8) +
              (thirdDigitsBinar [5] * 4) + (thirdDigitsBinar [6] * 2) + (thirdDigitsBinar [7] * 1));
          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));

          var hostFundit = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;

          fourthDigitsBinar = [1, 1, 1, 1, 1, 1, 1, 1];
          var broadcastBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('');

          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));

          var broadcast = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;
      } else if (prefix == 13) {
          var maskBinar = "11111111.11111000.00000000.00000000";
          var mask = "255.248.0.0";
          var wildcardBinar = "00000000.00000111.11111111.11111111";
          var wildcard = "0.7.255.255";

          secondDigitsBinar [5] = 0;
          secondDigitsBinar [6] = 0;
          secondDigitsBinar [7] = 0;
          thirdDigitsBinar = [0, 0, 0, 0, 0, 0, 0, 0];
          fourthDigitsBinar = [0, 0, 0, 0, 0, 0, 0, 0];
          thirdDigitsOnNetwork = 0;
          fourthDigitsOnNetwork = 0;
          var addressNetworkBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('') + "/" + prefix;
          var secondDigitsOnNetwork = ((secondDigitsBinar [0] * 128) + (secondDigitsBinar [1] * 64) + (secondDigitsBinar [2] * 32) + (secondDigitsBinar[3] * 16) + (secondDigitsBinar [4] * 8) +
              (secondDigitsBinar [5] * 4) + (secondDigitsBinar [6] * 2) + (secondDigitsBinar [7] * 1));
          var addressNetwork = firstDigitsOnNetwork + "." + segundoOctetoRed + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;

          fourthDigitsBinar = [0, 0, 0, 0, 0, 0, 0, 1];
          var hostPareBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('') + "/" + prefix;
          var hostPare = firstDigitsOnNetwork + "." + segundoOctetoRed + "." + thirdDigitsOnNetwork +
              "." + "1";


          secondDigitsBinar [5] = 1;
          secondDigitsBinar [6] = 1;
          secondDigitsBinar [7] = 1;
          thirdDigitsBinar = [1, 1, 1, 1, 1, 1, 1, 1];
          fourthDigitsBinar = [1, 1, 1, 1, 1, 1, 1, 0];
          var hostFunditBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('');
          var secondDigitsOnNetwork = ((secondDigitsBinar [0] * 128) + (secondDigitsBinar [1] * 64) + (secondDigitsBinar [2] * 32) + (secondDigitsBinar[3] * 16) + (secondDigitsBinar [4] * 8) +
              (secondDigitsBinar [5] * 4) + (secondDigitsBinar [6] * 2) + (secondDigitsBinar [7] * 1));
          var thirdDigitsOnNetwork = ((thirdDigitsBinar [0] * 128) + (thirdDigitsBinar [1] * 64) + (thirdDigitsBinar [2] * 32) + (thirdDigitsBinar[3] * 16) + (thirdDigitsBinar [4] * 8) +
              (thirdDigitsBinar [5] * 4) + (thirdDigitsBinar [6] * 2) + (thirdDigitsBinar [7] * 1));
          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));

          var hostFundit = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;

          fourthDigitsBinar = [1, 1, 1, 1, 1, 1, 1, 1];
          var broadcastBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('');

          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));

          var broadcast = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;
      } else if (prefix == 14) {
          var maskBinar = "11111111.11111100.00000000.00000000";
          var mask = "255.252.0.0";
          var wildcardBinar = "00000000.00000011.11111111.11111111";
          var wildcard = "0.3.255.255";


          secondDigitsBinar [6] = 0;
          secondDigitsBinar [7] = 0;
          thirdDigitsBinar = [0, 0, 0, 0, 0, 0, 0, 0];
          fourthDigitsBinar = [0, 0, 0, 0, 0, 0, 0, 0];
          thirdDigitsOnNetwork = 0;
          fourthDigitsOnNetwork = 0;
          var addressNetworkBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('') + "/" + prefix;
          var segundoOctetoRed = ((secondDigitsBinar [0] * 128) + (secondDigitsBinar [1] * 64) + (secondDigitsBinar [2] * 32) + (secondDigitsBinar[3] * 16) + (secondDigitsBinar [4] * 8) +
              (secondDigitsBinar [5] * 4) + (secondDigitsBinar [6] * 2) + (secondDigitsBinar [7] * 1));
          var addressNetwork = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;

          fourthDigitsBinar = [0, 0, 0, 0, 0, 0, 0, 1];
          var hostPareBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('') + "/" + prefix;
          var hostPare = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + "1";


          secondDigitsBinar [6] = 1;
          secondDigitsBinar [7] = 1;
          thirdDigitsBinar = [1, 1, 1, 1, 1, 1, 1, 1];
          fourthDigitsBinar = [1, 1, 1, 1, 1, 1, 1, 0];
          var hostFunditBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('');
          var secondDigitsOnNetwork = ((secondDigitsBinar [0] * 128) + (secondDigitsBinar [1] * 64) + (secondDigitsBinar [2] * 32) + (secondDigitsBinar[3] * 16) + (secondDigitsBinar [4] * 8) +
              (secondDigitsBinar [5] * 4) + (secondDigitsBinar [6] * 2) + (secondDigitsBinar [7] * 1));
          var thirdDigitsOnNetwork = ((thirdDigitsBinar [0] * 128) + (thirdDigitsBinar [1] * 64) + (thirdDigitsBinar [2] * 32) + (thirdDigitsBinar[3] * 16) + (thirdDigitsBinar [4] * 8) +
              (thirdDigitsBinar [5] * 4) + (thirdDigitsBinar [6] * 2) + (thirdDigitsBinar [7] * 1));
          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));

          var hostFundit = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;

          fourthDigitsBinar = [1, 1, 1, 1, 1, 1, 1, 1];
          var broadcastBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('');

          var cuartoOctetoRed = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));

          var broadcast = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;
      } else if (prefix == 15) {
          var maskBinar = "11111111.11111110.00000000.00000000";
          var mask = "255.254.0.0";
          var wildcardBinar = "00000000.00000001.11111111.11111111";
          var wildcard = "0.1.255.255";


          secondDigitsBinar [7] = 0;
          thirdDigitsBinar = [0, 0, 0, 0, 0, 0, 0, 0];
          fourthDigitsBinar = [0, 0, 0, 0, 0, 0, 0, 0];
          thirdDigitsOnNetwork = 0;
          fourthDigitsOnNetwork = 0;
          var addressNetworkBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('') + "/" + prefix;
          var secondDigitsOnNetwork = ((secondDigitsBinar [0] * 128) + (secondDigitsBinar [1] * 64) + (secondDigitsBinar [2] * 32) + (secondDigitsBinar[3] * 16) + (secondDigitsBinar [4] * 8) +
              (secondDigitsBinar [5] * 4) + (secondDigitsBinar [6] * 2) + (secondDigitsBinar [7] * 1));
          var addressNetwork = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;

          fourthDigitsBinar = [0, 0, 0, 0, 0, 0, 0, 1];
          var hostPareBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('') + "/" + prefix;
          var hostPare = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + "1";
          secondDigitsBinar [7] = 1;
          thirdDigitsBinar = [1, 1, 1, 1, 1, 1, 1, 1];
          fourthDigitsBinar = [1, 1, 1, 1, 1, 1, 1, 0];
          var hostFunditBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('');
          var secondDigitsOnNetwork = ((secondDigitsBinar [0] * 128) + (secondDigitsBinar [1] * 64) + (secondDigitsBinar [2] * 32) + (secondDigitsBinar[3] * 16) + (secondDigitsBinar [4] * 8) +
              (secondDigitsBinar [5] * 4) + (secondDigitsBinar [6] * 2) + (secondDigitsBinar [7] * 1));
          var thirdDigitsOnNetwork = ((thirdDigitsBinar [0] * 128) + (thirdDigitsBinar [1] * 64) + (thirdDigitsBinar [2] * 32) + (thirdDigitsBinar[3] * 16) + (thirdDigitsBinar [4] * 8) +
              (thirdDigitsBinar [5] * 4) + (thirdDigitsBinar [6] * 2) + (thirdDigitsBinar [7] * 1));
          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));

          var hostFundit = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;

          fourthDigitsBinar = [1, 1, 1, 1, 1, 1, 1, 1];
          var broadcastBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('');

          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));

          var broadcast = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;
      } else if (prefix == 16) {
          var maskBinar = "11111111.11111111.00000000.00000000";
          var mask = "255.255.0.0";
          var wildcardBinar = "00000000.00000000.11111111.11111111";
          var wildcard = "0.0.255.255";
          thirdDigitsBinar = [0, 0, 0, 0, 0, 0, 0, 0];
          fourthDigitsBinar = [0, 0, 0, 0, 0, 0, 0, 0];
          thirdDigitsOnNetwork = 0;
          fourthDigitsOnNetwork = 0;
          var addressNetworkBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('') + "/" + prefix;
          var secondDigitsOnNetwork = ((secondDigitsBinar [0] * 128) + (secondDigitsBinar [1] * 64) + (secondDigitsBinar [2] * 32) + (secondDigitsBinar[3] * 16) + (secondDigitsBinar [4] * 8) +
              (secondDigitsBinar [5] * 4) + (secondDigitsBinar [6] * 2) + (secondDigitsBinar [7] * 1));
          var addressNetwork = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;

          fourthDigitsBinar = [0, 0, 0, 0, 0, 0, 0, 1];
          var hostPareBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('') + "/" + prefix;
          var hostPare = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + "1";
          thirdDigitsBinar = [1, 1, 1, 1, 1, 1, 1, 1];
          fourthDigitsBinar = [1, 1, 1, 1, 1, 1, 1, 0];
          var hostFunditBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('');
          var secondDigitsOnNetwork = ((secondDigitsBinar [0] * 128) + (secondDigitsBinar [1] * 64) + (secondDigitsBinar [2] * 32) + (secondDigitsBinar[3] * 16) + (secondDigitsBinar [4] * 8) +
              (secondDigitsBinar [5] * 4) + (secondDigitsBinar [6] * 2) + (secondDigitsBinar [7] * 1));
          var thirdDigitsOnNetwork = ((thirdDigitsBinar [0] * 128) + (thirdDigitsBinar [1] * 64) + (thirdDigitsBinar [2] * 32) + (thirdDigitsBinar[3] * 16) + (thirdDigitsBinar [4] * 8) +
              (thirdDigitsBinar [5] * 4) + (thirdDigitsBinar [6] * 2) + (thirdDigitsBinar [7] * 1));
          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));

          var hostFundit = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;

          fourthDigitsBinar = [1, 1, 1, 1, 1, 1, 1, 1];
          var broadcastBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('');

          var cuartoOctetoRed = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsOnNetwork [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));

          var broadcast = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;
      } else if (prefix == 17) {
          var maskBinar = "11111111.11111111.10000000.00000000";
          var mask = "255.255.128.0";
          var wildcardBinar = "00000000.00000000.01111111.11111111";
          var wildcard = "0.0.127.255";
          thirdDigitsBinar [1] = 0;
          thirdDigitsBinar [2] = 0;
          thirdDigitsBinar [3] = 0;
          thirdDigitsBinar [4] = 0;
          thirdDigitsBinar [5] = 0;
          thirdDigitsBinar [6] = 0;
          thirdDigitsBinar [7] = 0;
          fourthDigitsBinar = [0, 0, 0, 0, 0, 0, 0, 0];
          fourthDigitsOnNetwork = 0;
          var addressNetworkBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('') + "/" + prefix;
          var thirdDigitsOnNetwork = ((thirdDigitsBinar [0] * 128) + (thirdDigitsBinar [1] * 64) + (thirdDigitsBinar [2] * 32) + (thirdDigitsBinar[3] * 16) + (thirdDigitsBinar [4] * 8) +
              (thirdDigitsBinar [5] * 4) + (thirdDigitsBinar [6] * 2) + (thirdDigitsBinar [7] * 1));
          var addressNetwork = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;

          fourthDigitsBinar = [0, 0, 0, 0, 0, 0, 0, 1];
          var hostPareBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('') + "/" + prefix;
          var hostPare = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + "1";
          thirdDigitsBinar [1] = 1;
          thirdDigitsBinar [2] = 1;
          thirdDigitsBinar [3] = 1;
          thirdDigitsBinar [4] = 1;
          thirdDigitsBinar [5] = 1;
          thirdDigitsBinar [6] = 1;
          thirdDigitsBinar [7] = 1;
          fourthDigitsBinar = [1, 1, 1, 1, 1, 1, 1, 0];
          var hostFunditBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('');

          var thirdDigitsOnNetwork = ((thirdDigitsBinar [0] * 128) + (thirdDigitsBinar [1] * 64) + (thirdDigitsBinar [2] * 32) + (thirdDigitsBinar[3] * 16) + (thirdDigitsBinar [4] * 8) +
              (thirdDigitsBinar [5] * 4) + (thirdDigitsBinar [6] * 2) + (thirdDigitsBinar [7] * 1));
          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));

          var hostFundit = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;

          fourthDigitsBinar = [1, 1, 1, 1, 1, 1, 1, 1];
          var broadcastBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('');

          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));

          var broadcast = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;
      } else if (prefix == 18) {
          var maskBinar = "11111111.11111111.11000000.00000000";
          var mask = "255.255.192.0";
          var wildcardBinar = "00000000.00000000.00111111.11111111";
          var wildcard = "0.0.63.255";
          thirdDigitsBinar [2] = 0;
          thirdDigitsBinar [3] = 0;
          thirdDigitsBinar [4] = 0;
          thirdDigitsBinar [5] = 0;
          thirdDigitsBinar [6] = 0;
          thirdDigitsBinar [7] = 0;
          fourthDigitsBinar = [0, 0, 0, 0, 0, 0, 0, 0];
          fourthDigitsOnNetwork = 0;
          var addressNetworkBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('') + "/" + prefix;
          var thirdDigitsOnNetwork = ((thirdDigitsBinar [0] * 128) + (thirdDigitsBinar [1] * 64) + (thirdDigitsBinar [2] * 32) + (thirdDigitsBinar[3] * 16) + (thirdDigitsBinar [4] * 8) +
              (thirdDigitsBinar [5] * 4) + (thirdDigitsBinar [6] * 2) + (thirdDigitsBinar [7] * 1));
          var addressNetwork = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;

          fourthDigitsBinar = [0, 0, 0, 0, 0, 0, 0, 1];
          var hostPareBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('') + "/" + prefix;
          var hostPare = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + "1";
          thirdDigitsBinar [2] = 1;
          thirdDigitsBinar [3] = 1;
          thirdDigitsBinar [4] = 1;
          thirdDigitsBinar [5] = 1;
          thirdDigitsBinar [6] = 1;
          thirdDigitsBinar [7] = 1;
          fourthDigitsBinar = [1, 1, 1, 1, 1, 1, 1, 0];
          var hostFunditBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('');

          var thirdDigitsOnNetwork = ((thirdDigitsBinar [0] * 128) + (thirdDigitsBinar [1] * 64) + (thirdDigitsBinar [2] * 32) + (thirdDigitsBinar[3] * 16) + (thirdDigitsBinar [4] * 8) +
              (thirdDigitsBinar [5] * 4) + (thirdDigitsBinar [6] * 2) + (thirdDigitsBinar [7] * 1));
          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));

          var hostFundit = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;

          fourthDigitsBinar = [1, 1, 1, 1, 1, 1, 1, 1];
          var broadcastBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('');

          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));

          var broadcast = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;
      } else if (prefix == 19) {
          var maskBinar = "11111111.11111111.11100000.00000000";
          var mask = "255.255.224.0";
          var wildcardBinar = "00000000.00000000.00011111.11111111";
          var wildcard = "0.0.31.255";
          thirdDigitsBinar [3] = 0;
          thirdDigitsBinar [4] = 0;
          thirdDigitsBinar [5] = 0;
          thirdDigitsBinar [6] = 0;
          thirdDigitsBinar [7] = 0;
          fourthDigitsBinar = [0, 0, 0, 0, 0, 0, 0, 0];
          fourthDigitsOnNetwork = 0;
          var addressNetworkBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('') + "/" + prefix;
          var thirdDigitsOnNetwork = ((thirdDigitsBinar [0] * 128) + (thirdDigitsBinar [1] * 64) + (thirdDigitsBinar [2] * 32) + (thirdDigitsBinar[3] * 16) + (thirdDigitsBinar [4] * 8) +
              (thirdDigitsBinar [5] * 4) + (thirdDigitsBinar [6] * 2) + (thirdDigitsBinar [7] * 1));
          var addressNetwork = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;

          fourthDigitsBinar = [0, 0, 0, 0, 0, 0, 0, 1];
          var hostPareBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('') + "/" + prefix;
          var hostPare = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + "1";

          thirdDigitsBinar [3] = 1;
          thirdDigitsBinar [4] = 1;
          thirdDigitsBinar [5] = 1;
          thirdDigitsBinar [6] = 1;
          thirdDigitsBinar [7] = 1;
          fourthDigitsBinar = [1, 1, 1, 1, 1, 1, 1, 0];
          var hostFunditBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('');

          var thirdDigitsOnNetwork = ((thirdDigitsBinar [0] * 128) + (thirdDigitsBinar [1] * 64) + (thirdDigitsBinar [2] * 32) + (thirdDigitsBinar[3] * 16) + (thirdDigitsBinar [4] * 8) +
              (thirdDigitsBinar [5] * 4) + (thirdDigitsBinar [6] * 2) + (thirdDigitsBinar [7] * 1));
          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));

          var hostFundit = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;

          fourthDigitsBinar = [1, 1, 1, 1, 1, 1, 1, 1];
          var broadcastBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('');

          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));

          var broadcast = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;

      } else if (prefix == 20) {
          var maskBinar = "11111111.11111111.11110000.00000000";
          var mask = "255.255.240.0";
          var wildcardBinar = "00000000.00000000.00001111.11111111";
          var wildcard = "0.0.15.255";
          thirdDigitsBinar [4] = 0;
          thirdDigitsBinar [5] = 0;
          thirdDigitsBinar [6] = 0;
          thirdDigitsBinar [7] = 0;
          fourthDigitsBinar = [0, 0, 0, 0, 0, 0, 0, 0];
          fourthDigitsOnNetwork = 0;
          var addressNetworkBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('') + "/" + prefix;
          var thirdDigitsOnNetwork = ((thirdDigitsBinar [0] * 128) + (thirdDigitsBinar [1] * 64) + (thirdDigitsBinar [2] * 32) + (thirdDigitsBinar[3] * 16) + (thirdDigitsBinar [4] * 8) +
              (thirdDigitsBinar [5] * 4) + (thirdDigitsBinar [6] * 2) + (thirdDigitsBinar [7] * 1));
          var addressNetwork = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;

          fourthDigitsBinar = [0, 0, 0, 0, 0, 0, 0, 1];
          var hostPareBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('') + "/" + prefix;
          var hostPare = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + "1";

          thirdDigitsBinar [4] = 1;
          thirdDigitsBinar [5] = 1;
          thirdDigitsBinar [6] = 1;
          thirdDigitsBinar [7] = 1;
          fourthDigitsBinar = [1, 1, 1, 1, 1, 1, 1, 0];
          var hostFunditBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('');

          var thirdDigitsOnNetwork = ((thirdDigitsBinar [0] * 128) + (thirdDigitsBinar [1] * 64) + (thirdDigitsBinar [2] * 32) + (thirdDigitsBinar[3] * 16) + (thirdDigitsBinar [4] * 8) +
              (thirdDigitsBinar [5] * 4) + (thirdDigitsBinar [6] * 2) + (thirdDigitsBinar [7] * 1));
          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));

          var hostFundit = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;

          fourthDigitsBinar = [1, 1, 1, 1, 1, 1, 1, 1];
          var broadcastBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('');

          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));

          var broadcast = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;
      } else if (prefix == 21) {
          var maskBinar = "11111111.11111111.11111000.00000000";
          var mask = "255.255.248.0";
          var wildcardBinar = "00000000.00000000.00000111.11111111";
          var wildcard = "0.0.7.255";
          thirdDigitsBinar [5] = 0;
          thirdDigitsBinar [6] = 0;
          thirdDigitsBinar [7] = 0;
          fourthDigitsBinar = [0, 0, 0, 0, 0, 0, 0, 0];
          fourthDigitsOnNetwork = 0;
          var addressNetworkBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('') + "/" + prefix;
          var thirdDigitsOnNetwork = ((thirdDigitsBinar [0] * 128) + (thirdDigitsBinar [1] * 64) + (thirdDigitsBinar [2] * 32) + (thirdDigitsBinar[3] * 16) + (thirdDigitsBinar [4] * 8) +
              (thirdDigitsBinar [5] * 4) + (thirdDigitsBinar [6] * 2) + (thirdDigitsBinar [7] * 1));
          var addressNetwork = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;

          fourthDigitsBinar = [0, 0, 0, 0, 0, 0, 0, 1];
          var hostPareBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('') + "/" + prefix;
          var hostPare = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + "1";

          thirdDigitsBinar [5] = 1;
          thirdDigitsBinar [6] = 1;
          thirdDigitsBinar [7] = 1;
          fourthDigitsBinar = [1, 1, 1, 1, 1, 1, 1, 0];
          var hostFunditBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('');

          var thirdDigitsOnNetwork = ((thirdDigitsBinar [0] * 128) + (thirdDigitsBinar [1] * 64) + (thirdDigitsBinar [2] * 32) + (thirdDigitsBinar[3] * 16) + (thirdDigitsBinar [4] * 8) +
              (thirdDigitsBinar [5] * 4) + (thirdDigitsBinar [6] * 2) + (thirdDigitsBinar [7] * 1));
          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));

          var hostFundit = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;

          fourthDigitsBinar = [1, 1, 1, 1, 1, 1, 1, 1];
          var broadcastBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('');

          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));

          var broadcast = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;
      } else if (prefix == 22) {
          var maskBinar = "11111111.11111111.11111100.00000000";
          var mask = "255.255.252.0";
          var wildcardBinar = "00000000.00000000.00000011.11111111";
          var wildcard = "0.0.3.255";

          thirdDigitsBinar [6] = 0;
          thirdDigitsBinar [7] = 0;
          fourthDigitsBinar = [0, 0, 0, 0, 0, 0, 0, 0];
          fourthDigitsOnNetwork = 0;
          var addressNetworkBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('') + "/" + prefix;
          var thirdDigitsOnNetwork = ((thirdDigitsBinar [0] * 128) + (thirdDigitsBinar [1] * 64) + (thirdDigitsBinar [2] * 32) + (thirdDigitsBinar[3] * 16) + (thirdDigitsBinar [4] * 8) +
              (thirdDigitsBinar [5] * 4) + (thirdDigitsBinar [6] * 2) + (thirdDigitsBinar [7] * 1));
          var addressNetwork = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;

          fourthDigitsBinar = [0, 0, 0, 0, 0, 0, 0, 1];
          var hostPareBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('') + "/" + prefix;
          var hostPare = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + "1";


          thirdDigitsBinar [6] = 1;
          thirdDigitsBinar [7] = 1;
          fourthDigitsBinar = [1, 1, 1, 1, 1, 1, 1, 0];
          var hostFunditBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('');

          var thirdDigitsOnNetwork = ((thirdDigitsBinar [0] * 128) + (thirdDigitsBinar [1] * 64) + (thirdDigitsBinar [2] * 32) + (thirdDigitsBinar[3] * 16) + (thirdDigitsBinar [4] * 8) +
              (thirdDigitsBinar [5] * 4) + (thirdDigitsBinar [6] * 2) + (thirdDigitsBinar [7] * 1));
          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));

          var hostFundit = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;

          fourthDigitsBinar = [1, 1, 1, 1, 1, 1, 1, 1];
          var broadcastBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('');

          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));

          var broadcast = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;
      } else if (prefix == 23) {
          var maskBinar = "11111111.11111111.11111110.00000000";
          var mask = "255.255.254.0";
          var wildcardBinar = "00000000.00000000.00000001.11111111";
          var wildcard = "0.0.1.255";
          thirdDigitsBinar [7] = 0;
          fourthDigitsBinar = [0, 0, 0, 0, 0, 0, 0, 0];
          fourthDigitsOnNetwork = 0;
          var addressNetworkBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('') + "/" + prefix;
          var thirdDigitsOnNetwork = ((thirdDigitsBinar [0] * 128) + (thirdDigitsBinar [1] * 64) + (thirdDigitsBinar [2] * 32) + (thirdDigitsBinar[3] * 16) + (thirdDigitsBinar [4] * 8) +
              (thirdDigitsBinar [5] * 4) + (thirdDigitsBinar [6] * 2) + (thirdDigitsBinar [7] * 1));
          var addressNetwork = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;

          fourthDigitsBinar = [0, 0, 0, 0, 0, 0, 0, 1];
          var hostPareBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('') + "/" + prefix;
          var hostPare = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + "1";

          thirdDigitsBinar [7] = 1;
          fourthDigitsBinar = [1, 1, 1, 1, 1, 1, 1, 0];
          var hostFunditBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('');

          var thirdDigitsOnNetwork = ((thirdDigitsBinar [0] * 128) + (thirdDigitsBinar [1] * 64) + (thirdDigitsBinar [2] * 32) + (thirdDigitsBinar[3] * 16) + (thirdDigitsBinar [4] * 8) +
              (thirdDigitsBinar [5] * 4) + (thirdDigitsBinar [6] * 2) + (thirdDigitsBinar [7] * 1));
          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));

          var hostFundit = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;

          fourthDigitsBinar = [1, 1, 1, 1, 1, 1, 1, 1];
          var broadcastBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('');

          var cuartoOctetoRed = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));

          var broadcast = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;
      } else if (prefix == 24) {
          var maskBinar = "11111111.11111111.11111111.00000000";
          var mask = "255.255.2255.0";
          var wildcardBinar = "00000000.00000000.00000000.11111111";
          var wildcard = "0.0.0.255";

          fourthDigitsBinar = [0, 0, 0, 0, 0, 0, 0, 0];
          fourthDigitsOnNetwork = 0;
          var addressNetworkBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('') + "/" + prefix;
          var thirdDigitsOnNetwork = ((thirdDigitsBinar [0] * 128) + (thirdDigitsBinar [1] * 64) + (thirdDigitsBinar [2] * 32) + (thirdDigitsBinar[3] * 16) + (thirdDigitsBinar [4] * 8) +
              (thirdDigitsBinar [5] * 4) + (thirdDigitsBinar [6] * 2) + (thirdDigitsBinar [7] * 1));
          var addressNetwork = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;

          fourthDigitsBinar = [0, 0, 0, 0, 0, 0, 0, 1];
          var hostPareBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('') + "/" + prefix;
          var hostPare = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + "1";

          fourthDigitsBinar = [1, 1, 1, 1, 1, 1, 1, 0];
          var hostFunditBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('');

          var thirdDigitsOnNetwork = ((thirdDigitsBinar [0] * 128) + (thirdDigitsBinar [1] * 64) + (thirdDigitsBinar [2] * 32) + (thirdDigitsBinar[3] * 16) + (thirdDigitsBinar [4] * 8) +
              (thirdDigitsBinar [5] * 4) + (thirdDigitsBinar [6] * 2) + (thirdDigitsBinar [7] * 1));
          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));

          var hostFundit = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;

          fourthDigitsBinar = [1, 1, 1, 1, 1, 1, 1, 1];
          var broadcastBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('');

          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));

          var broadcast = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;
      } else if (prefix == 25) {
          var maskBinar = "11111111.11111111.11111111.10000000";
          var mask = "255.255.224.128";
          var wildcardBinar = "00000000.00000000.00000000.01111111";
          var wildcard = "0.0.0.127";
          fourthDigitsBinar [1] = 0;
          fourthDigitsBinar [2] = 0;
          fourthDigitsBinar [3] = 0;
          fourthDigitsBinar [4] = 0;
          fourthDigitsBinar [5] = 0;
          fourthDigitsBinar [6] = 0;
          fourthDigitsBinar [7] = 0;
          var addressNetworkBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('') + "/" + prefix;
          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));
          var addressNetwork = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;

          fourthDigitsBinar [7] = 1;
          var hostPareBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('') + "/" + prefix;
          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));
          var hostPare = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;
          fourthDigitsBinar [1] = 1;
          fourthDigitsBinar [2] = 1;
          fourthDigitsBinar [3] = 1;
          fourthDigitsBinar [4] = 1;
          fourthDigitsBinar [5] = 1;
          fourthDigitsBinar [6] = 1;
          fourthDigitsBinar [7] = 0;
          var hostFunditBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('');


          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));

          var hostFundit = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;

          fourthDigitsBinar [1] = 1;
          fourthDigitsBinar [2] = 1;
          fourthDigitsBinar [3] = 1;
          fourthDigitsBinar [4] = 1;
          fourthDigitsBinar [5] = 1;
          fourthDigitsBinar [6] = 1;
          fourthDigitsBinar [7] = 1;
          var broadcastBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('');

          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));

          var broadcast = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;
      } else if (prefix == 26) {
          var maskBinar = "11111111.11111111.11111111.11000000";
          var mask = "255.255.255.192";
          var wildcardBinar = "00000000.00000000.00000000.00111111";
          var wildcard = "0.0.0.63";
          fourthDigitsBinar [2] = 0;
          fourthDigitsBinar [3] = 0;
          fourthDigitsBinar [4] = 0;
          fourthDigitsBinar [5] = 0;
          fourthDigitsBinar [6] = 0;
          fourthDigitsBinar [7] = 0;
          var addressNetworkBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('') + "/" + prefix;
          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));
          var addressNetwork = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;

          fourthDigitsBinar [7] = 1;
          var hostPareBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('') + "/" + prefix;
          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));
          var hostPare = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;
          fourthDigitsBinar [2] = 1;
          fourthDigitsBinar [3] = 1;
          fourthDigitsBinar [4] = 1;
          fourthDigitsBinar [5] = 1;
          fourthDigitsBinar [6] = 1;
          fourthDigitsBinar [7] = 0;
          var hostFunditBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('');


          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));

          var hostFundit = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;

          fourthDigitsBinar [2] = 1;
          fourthDigitsBinar [3] = 1;
          fourthDigitsBinar [4] = 1;
          fourthDigitsBinar [5] = 1;
          fourthDigitsBinar [6] = 1;
          fourthDigitsBinar [7] = 1;
          var broadcastBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('');

          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));

          var broadcast = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;
      } else if (prefix == 27) {
          var maskBinar = "11111111.11111111.11111111.11100000";
          var mask = "255.255.255.224";
          var wildcardBinar = "00000000.00000000.00000000.00011111";
          var wildcard = "0.0.0.31";
          fourthDigitsBinar [3] = 0;
          fourthDigitsBinar [4] = 0;
          fourthDigitsBinar [5] = 0;
          fourthDigitsBinar [6] = 0;
          fourthDigitsBinar [7] = 0;
          var addressNetworkBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('') + "/" + prefix;
          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));
          var addressNetwork = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;

          fourthDigitsBinar [7] = 1;
          var hostPareBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('') + "/" + prefix;
          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));
          var hostPare = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;
          fourthDigitsBinar [3] = 1;
          fourthDigitsBinar [4] = 1;
          fourthDigitsBinar [5] = 1;
          fourthDigitsBinar [6] = 1;
          fourthDigitsBinar [7] = 0;
          var hostFunditBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('');


          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));

          var hostFundit = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;

          fourthDigitsBinar [3] = 1;
          fourthDigitsBinar [4] = 1;
          fourthDigitsBinar [5] = 1;
          fourthDigitsBinar [6] = 1;
          fourthDigitsBinar [7] = 1;
          var broadcastBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('');

          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));

          var broadcast = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;
      } else if (prefix == 28) {
          var maskBinar = "11111111.11111111.11111111.11110000";
          var mask = "255.255.255.240";
          var wildcardBinar = "00000000.00000000.00000000.00001111";
          var wildcard = "0.0.0.15";
          fourthDigitsBinar [4] = 0;
          fourthDigitsBinar [5] = 0;
          fourthDigitsBinar [6] = 0;
          fourthDigitsBinar [7] = 0;
          var addressNetworkBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('') + "/" + prefix;
          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));
          var addressNetwork = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;

          fourthDigitsBinar [7] = 1;
          var hostPareBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('') + "/" + prefix;
          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));
          var hostPare = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;
          fourthDigitsBinar [4] = 1;
          fourthDigitsBinar [5] = 1;
          fourthDigitsBinar [6] = 1;
          fourthDigitsBinar [7] = 0;
          var hostFunditBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('');


          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));

          var hostFundit = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;
          fourthDigitsBinar [4] = 1;
          fourthDigitsBinar [5] = 1;
          fourthDigitsBinar [6] = 1;
          fourthDigitsBinar [7] = 1;
          var broadcastBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('');

          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));

          var broadcast = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;
      } else if (prefix == 29) {
          var maskBinar = "11111111.11111111.11111111.11111000";
          var mask = "255.255.255.248";
          var wildcardBinar = "00000000.00000000.00000000.00000111";
          var wildcard = "0.0.0.7";
          fourthDigitsBinar [5] = 0;
          fourthDigitsBinar [6] = 0;
          fourthDigitsBinar [7] = 0;
          var addressNetworkBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('') + "/" + prefix;
          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));
          var addressNetwork = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;

          fourthDigitsBinar [7] = 1;
          var hostPareBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('') + "/" + prefix;
          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));
          var hostPare = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;
          fourthDigitsBinar [5] = 1;
          fourthDigitsBinar [6] = 1;
          fourthDigitsBinar [7] = 0;
          var hostFunditBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('');


          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));

          var hostFundit = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;
          fourthDigitsBinar [5] = 1;
          fourthDigitsBinar [6] = 1;
          fourthDigitsBinar [7] = 1;
          var broadcastBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('');

          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));

          var broadcast = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;
      } else if (prefix == 30) {
          var maskBinar = "11111111.11111111.11111111.11111100";
          var mask = "255.255.224.0";
          var wildcardBinar = "00000000.00000000.00000000.00000011";
          var wildcard = "0.0.0.3";
          fourthDigitsBinar [6] = 0;
          fourthDigitsBinar [7] = 0;
          var addressNetworkBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('') + "/" + prefix;
          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));
          var addressNetwork = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;

          fourthDigitsBinar [7] = 1;
          var hostPareBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('') + "/" + prefix;
          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));
          var hostPare = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;
          fourthDigitsBinar [6] = 1;
          fourthDigitsBinar [7] = 0;
          var hostFunditBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('');


          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));

          var hostFundit = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;
          fourthDigitsBinar [6] = 1;
          fourthDigitsBinar [7] = 1;
          var broadcastBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('');

          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));

          var broadcast = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;
      } else if (prefix == 31) {
          var maskBinar = "11111111.11111111.11111111.11111110";
          var mask = "255.255.255.254";
          var wildcardBinar = "00000000.00000000.00000000.00000001";
          var wildcard = "0.0.0.1";
          fourthDigitsBinar [7] = 0;
          var addressNetworkBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('') + "/" + prefix;
          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));
          var addressNetwork = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;

          fourthDigitsBinar [7] = 1;
          var hostPareBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('') + "/" + prefix;
          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));
          var hostPare = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;
          fourthDigitsBinar [7] = 0;
          var hostFunditBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('');


          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));

          var hostFundit = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;
          fourthDigitsBinar [7] = 1;
          var broadcastBinar = firstDigitsBinar.join('') + "." + secondDigitsBinar.join('') + "." + thirdDigitsBinar.join('') +
              "." + fourthDigitsBinar.join('');

          var fourthDigitsOnNetwork = ((fourthDigitsBinar [0] * 128) + (fourthDigitsBinar [1] * 64) + (fourthDigitsBinar [2] * 32) + (fourthDigitsBinar[3] * 16) + (fourthDigitsBinar [4] * 8) +
              (fourthDigitsBinar [5] * 4) + (fourthDigitsBinar [6] * 2) + (fourthDigitsBinar [7] * 1));

          var broadcast = firstDigitsOnNetwork + "." + secondDigitsOnNetwork + "." + thirdDigitsOnNetwork +
              "." + fourthDigitsOnNetwork;
      }


      $('#address').append('<h4 id = "addressNetwork">' + addressNetwork + '</h4>');
      $('#address').append(`<h5 id = "addressNetworkBinar">${addressNetworkBinar}</h5>`);
      $('#network').append('<h4>' + addressNetwork + '</h4>');
      $('#network').append('<h5>' + addressNetworkBinar + '</h5>');
      $('#mask').append('<h4>' + mask + '</h4');
      $('#mask').append('<h5>' + maskBinar + '</h5');
      $('#hostPareSakte').append('<h4>' + hostPare + '</h4');
      $('#hostPareSakte').append('<h5>' + hostPareBinar + '</h5');
      $('#hostFunditSakte').append('<h4>' + hostFundit + '</h4');
      $('#hostFunditSakte').append('<h5>' + hostFunditBinar + '</h5');
      $('#wilcard').append('<h4>' + wildcard + '</h4');
      $('#wilcard').append('<h5>' + wildcardBinar + '</h5');
      $('#broadcast').append('<h4>' + broadcast + '</h4');
      $('#broadcast').append('<h5>' + broadcastBinar + '</h5');


  });

})     



"use strict";

const $form = document.querySelector("form");

const $ip = document.getElementById("ip");
const $mask = document.getElementById("mask");
const $maskCIDR = document.getElementById("maskCIDR");

$form.addEventListener("submit", function(e) {
  e.preventDefault();

  clearFields();

  try {
    if (!!$maskCIDR.value) {
      $mask.value = notationCIDR($maskCIDR.value);
    }
    const classe = checkClass($ip.value);
    const network = checkNetwork($ip.value, $mask.value);
    const host = checkHost($mask.value);
    const subnetwork = checkSubnetwork(classe, $mask.value);

    /* section result */
      
    const $sectionOfInput = document.querySelector('section');
    $sectionOfInput.insertAdjacentHTML('afterend', `<section class="result"></section>`);
     
    /* card */

    const $sectionOfResults = document.querySelector('.result');

    $sectionOfResults.insertAdjacentHTML('beforeend', createCard('Klasa', classe));
    
    $sectionOfResults.insertAdjacentHTML('beforeend', createCard('IP', ip.value,  convertDecinalToBinarFourthDigits($ip.value)));
    
    $sectionOfResults.insertAdjacentHTML('beforeend', createCard('Sasia e network/subNetwork', subnetwork));

    $sectionOfResults.insertAdjacentHTML('beforeend', createCard('Sasia e hosteve per network/subNetwork', host));
        
  } catch (error) {
    document.querySelector('body').insertAdjacentHTML('beforeend', 
    `<div class="result alert warning">
      <p>Verifikoni vlerat e vendosura!</p>
    </div>`
    )
  }
});

function clearFields(){
  document.querySelector('.result') ? document.querySelector('.result').remove() : "";
}

function createCard(texto, value1, value2) {
  if (!!value2) {
    return `<div class="card">
              <p>${texto}</p>
              <p>${value1}</p>
              <p>${value2}</p>
            </div>`
  } else {
    return `<div class="card">
              <p>${texto}</p>
              <p>${value1}</p>
            </div>`
  }
}








"use strict";

function checkClass(ip) {
  ip = validInput(ip);
  return typeClass(firstDigits(ip));
}

function validInput(value) {
  if (isEmpty(value)) {
    throw new Error("Vendosni nje parameter te sakte!");
  }

  if (!isString(value)) {
    throw new Error(" Parametri duhet te jete String!");
  }

  value = value.trim();

  if (!isValidMaskOrIP(value)) {
    throw new Error(
      "Perdoni pika per te ndare vlerat dhe mos lini hapesira!"
    );
  }

  return value;
}

function isEmpty(value) {
  return !!!value;
}

function isString(value) {
  return typeof value === "string";
}

function isValidMaskOrIP(value) {
  const regExp = /^(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][1-9]|2[0-5][0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][1-9]|2[0-5][0-5])$/;
  return regExp.test(value);
}

function converterDecimalParaBinario(decimal) {
  return (decimal >>> 0).toString(2);
}

function firstDigits(value) {
  value = value.split(".");
  value = converterDecimalParaBinario(value[0]);
  return preencherOcteto(value);
}

function preencherOcteto(value) {
  return "00000000".slice(value.length) + value;
}

function typeClass(octeto) {
  if (octeto.slice(0, 1) === "0") {
    return "A";
  } else if (octeto.slice(0, 2) === "10") {
    return "B";
  } else if (octeto.slice(0, 3) === "110") {
    return "C";
  } else if (octeto.slice(0, 4) === "1110") {
    return "D";
  } else if (octeto.slice(0, 4) === "1111") {
    return "E";
  }
}

function verificarMask(mask, classeIp) {
  mask = validInput(mask);

  if (classeIp === "A") {
    const regExp = /^(((255)\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|2[0-5][0-5]))\.0\.0)|((((255)\.){2}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|2[0-5][0-5]))\.0)|((((255)\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|2[0-5][0-5])))$/;
    return regExp.test(mask);
  }

  if (classeIp === "B") {
    const regExp = /^((((255)\.){2}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|2[0-5][0-5]))\.0)|((((255)\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|2[0-5][0-5])))$/;
    return regExp.test(mask);
  }

  if (classeIp === "C") {
    const regExp = /^((((255)\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|2[0-5][0-5])))$/;
    return regExp.test(mask);
  }

  return false;
}

/* 
   Operação AND entre IP e Máscara
*/
function checkNetwork(ip, mask) {
  ip = convertDecinalToBinarFourthDigits(ip);
  mask = convertDecinalToBinarFourthDigits(mask);

  let network = "";

  for (let i = 0; i < ip.length; i++) {
    let ipBin = ip.charAt(i);
    let maskBin = mask.charAt(i);

    if (ipBin === "." || maskBin === ".") {
      network += ipBin || maskBin;
    } else {
      network += ipBin & maskBin;
    }
  }

  return converteBinarioParaDecimalQuatroNumeros(network);
}

/* 
    Operação OR entre IP e o NOT da Máscara
*/
function verificarBroadcast(ip, mask) {
  ip = convertDecinalToBinarFourthDigits(ip);
  mask = negacaoBinariaQuatroOctetos(
    convertDecinalToBinarFourthDigits(mask)
  );

  let broadcast = "";

  for (let i = 0; i < ip.length; i++) {
    let ipBin = ip.charAt(i);
    let maskBin = mask.charAt(i);

    if (ipBin === "." || maskBin === ".") {
      broadcast += ".";
    } else {
      broadcast += ipBin | maskBin;
    }
  }

  return converteBinarioParaDecimalQuatroNumeros(broadcast);
}

function convertDecinalToBinarFourthDigits(value) {
  value = value.split(".");
  let octetos = preencherOcteto(converterDecimalParaBinario(value[0]));
  octetos += "." + preencherOcteto(converterDecimalParaBinario(value[1]));
  octetos += "." + preencherOcteto(converterDecimalParaBinario(value[2]));
  octetos += "." + preencherOcteto(converterDecimalParaBinario(value[3]));
  return octetos;
}

function converterBinarioParaDecimal(value) {
  return parseInt(value, 2);
}

function converteBinarioParaDecimalQuatroNumeros(value) {
  value = value.split(".");
  let numeros = converterBinarioParaDecimal(value[0]);
  numeros += "." + converterBinarioParaDecimal(value[1]);
  numeros += "." + converterBinarioParaDecimal(value[2]);
  numeros += "." + converterBinarioParaDecimal(value[3]);
  return numeros;
}

function negacaoBinaria(value) {
  return value === "1" ? "0" : "1";
}

function negacaoBinariaQuatroOctetos(value) {
  let valueNegado = "";
  for (let i = 0; i < value.length; i++) {
    let valueBin = value.charAt(i);
    if (valueBin === ".") {
      valueNegado += valueBin;
    } else {
      valueNegado += negacaoBinaria(valueBin);
    }
  }
  return valueNegado;
}

function notationCIDR(value) {
  let maskCIDR = "";

  for (let i = 0; i < 32; i++) {
    if (i < value) {
      maskCIDR += "1";
    } else {
      maskCIDR += "0";
    }
  }

  maskCIDR = converteBinarioParaDecimalQuatroNumeros(
    formatarBinarioQuatroOctetos(maskCIDR)
  );
  return maskCIDR;
}

function formatarBinarioQuatroOctetos(value) {
  let octeto = value.slice(0, 8);
  octeto += "." + value.slice(8, 16);
  octeto += "." + value.slice(16, 24);
  octeto += "." + value.slice(24, 32);
  return octeto;
}

function checkSubnetwork(classeIp, mask) {
  mask = convertDecinalToBinarFourthDigits(mask);
  switch (classeIp) {
    case "A":
      return Math.pow(2, Math.abs(8 - qtdBitsLigado(mask)));
    case "B":
      return Math.pow(2, Math.abs(16 - qtdBitsLigado(mask)));
    case "C":
      return Math.pow(2, Math.abs(24 - qtdBitsLigado(mask)));
    default:
      throw new Error("Nuk eshte i mundur kalkulimi i subnetit!");
  }
}

function checkHost(mask) {
  mask = convertDecinalToBinarFourthDigits(mask);
  return new Number(Math.pow(2, qtdBitsDesligado(mask)) - 2);
}

function qtdBitsLigado(mask) {
  return mask.match(/1/g).length;
}

function qtdBitsDesligado(mask) {
  return mask.match(/0/g).length;
}
