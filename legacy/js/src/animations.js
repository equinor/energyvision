(function(){
  // keep a instance of jquery so i can´t be tampered with;
  var $ = window.jQuery;
  $(document).ready(function () {
    // Scale up items with class of .animate on mouseenter
    $('.animate').mouseenter(function () {

      $(this).addClass('hover');
      $('.hover').velocity({
        translateZ: 0, // Force HA by animating a 3D property
        scale: 1.15,
      },{
        duration: 150,
        easing: "easeInSine"
      });
    });

    // Scale down items with class of .animate on mouseleave
    $('.animate').mouseleave(function () {

      // Stop any current animation
      $('.hover').velocity("stop");

      // Scale down
      $('.hover').velocity({
        translateZ: 0, // Force HA by animating a 3D property
        scale: 1,
      },{
        duration: 150,
        easing: "easeOutSine"
      });

      $(this).removeClass('hover');
    });

    // Register custom UI-effects for perspective animations
    $.Velocity.RegisterEffect("transition.perspectiveLeftIn", {
      defaultDuration: 950,
      calls: [
        [ {
          opacity: [ 1, 1 ],
          transformPerspective: [ 2000, 2000 ],
          transformOriginX: [ 0, 0 ],
          transformOriginY: [ 0, 0 ],
          rotateY: [ 0, -180 ]
        } ]
      ],
      reset: { transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%" }
    });

    $.Velocity.RegisterEffect("transition.perspectiveLeftOut", {
      defaultDuration: 950,
      calls: [
        [ {
          opacity: [ 1, 1 ],
          transformPerspective: [ 2000, 2000 ],
          transformOriginX: [ 0, 0 ],
          transformOriginY: [ 0, 0 ],
          rotateY: -180
        } ]
      ],
      reset: { transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%", rotateY: 0 }
    });

  });
})();
