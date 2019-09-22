
console.log("hello");
var HexGrid = {
    
      $container: $('.hex-container'),
    
      $gridItems: $('.hex-grid__item:not(.no-refresh)'),
    
     
    
      animation: {
    
        duration: 0.5,
    
     
    
        visible: {
    
          autoAlpha: 1,
    
          delay: 0.05,
    
          scale: 1
    
        },
    
     
    
        hidden: {
    
          autoAlpha: 0,
    
          scale: 0.8
    
        }
    
      },
    
     
    
      init:function() {
    
        this.$refreshGrid;
    
      },
    
     
    
      calculate:function() {
    
        var w =this.$container.width(),
    
            rowCount = 6,
    
            $newRow = $('.hex-grid__item:nth-child(n+7):nth-child(-n+13)');
    
     
    
        $('.hex-grid__item').css('width', w / rowCount);
    
     
    
        $newRow.css({
    
          'left': w / -(rowCount * 2),
    
          'top': w / -(rowCount * 4),
    
          'margin-bottom': w / -(rowCount * 2)
    
        });
    
      },
    
     
    
      refreshGrid:function(e) {
    
        var _ = HexGrid,
    
            i = 0;
    
     
    
        e.preventDefault();
    
     
    
        _.animation.visible.delay = 0.3;
    
     
    
        TweenLite.to(_.$gridItems, _.animation.duration, _.animation.hidden);
    
     
    
        for (i; i < _.$gridItems.length; i++) {
    
          _.animation.visible.delay += 0.05;
    
          TweenLite.to(_.$gridItems[i], _.animation.duration, _.animation.visible);
    
        }
    
      }
    
    };
   
    
    
    HexGrid.init();
    