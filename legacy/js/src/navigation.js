$(document)
	.ready(
		function ($) {

			// Mobile navigation

			$('.menu-button')
				.click(
					function () {

						// Animate the mobile menu in, if it's
						// not already expanded
						if (!$('body').hasClass('show-menu')) {

							$('body').addClass('show-menu');

							// Hide the scroll-to-top button
							$('#scroll-to-top').hide();

							// Animate the navigation list panel
							$('.navigation-list').velocity(
								"transition.fadeIn");

							// Animate the navigation list items
							$('.navigation-list > li')
								.velocity(
									'transition.slideLeftIn',
									{
										duration: 500,
										stagger: 30,
										drag: true,
										display: 'block',

										complete: function () {
											$(
												'.navigation-list > li')
												.removeAttr(
													'style');
										}
									});
						}

						// If the mobile menu is already
						// expanded, do a fade out animation
						// instead
						else {
							$('body').removeClass('show-menu');
							// Animate the navigation list panel
							$('.navigation-list').velocity(
								'transition.fadeOut');
							// Animate the navigation list items
							$('.navigation-list > li')
								.velocity(
									"transition.slideLeftOut",
									{
										// When the
										// animations
										// above are
										// completed,
										// remove inline
										// styling used
										// for
										// animations
										complete: function () {
											$(
												'.navigation-list, .navigation-list > li')
												.removeAttr(
													'style');
										}
									});
						}
					});

			// Tablet navigation
			$('.main-menu-list-item')
				.click(
					function (e) {
						if (window.innerWidth < 1200) {

							if ($(e.target).closest(
								'.main-menu-list-item').find('.navigation-list-subtree').length == 1 && 
                                !e.target.className.includes("navigation-list-link sublink")&& 
                                !e.target.parentElement.className.includes("navigation-list-link sublink") &&
                                !e.target.className.includes("arrow-sectionpage-container")&&
                                !e.target.className.includes("arrow-sectionpage-link")
                             ) {
								e.preventDefault();
								e.stopPropagation();
								toggleSubmenu($(this)
									.find(
										'.navigation-list-arrow'))
							}
						}
					})

			$('.expand-menu-button')
				.click(
					function () {

						// If the menu is collapsed, do this
						if (!$('.main-navigation').hasClass(
							'expand-menu')
							&& !$('expand-menu-button')
								.hasClass('active')) {
							$('.main-navigation').addClass(
								'expand-menu');
							$('.expand-menu-button').addClass(
								'active');
						}
						// If the menu is expanded, do this
						else {
							$('.main-navigation').removeClass(
								'expand-menu');
							$('.expand-menu-button')
								.removeClass('active');
						}
					});

			// Desktop navigation

			// Toggle the submenu panel when clicking the arrow
			$('.navigation-list-arrow').click(function () {
				toggleSubmenu(this);
			});

			// Toggle the the submenu panel when clicking the back-arrow
			$('.content').click(function () {
				closeSubmenu();
			});

			function closeSubmenu() {
				$('.selected-subtree.instant').removeClass('instant');
				$('.navigation-list-subtree.opening').removeClass(
					'opening');
				var navigationList = $('.navigation-list');
				var subTree = $('.selected-subtree');
				$(subTree).addClass('closing');
				setTimeout(function () {
					$(navigationList).removeClass('show-subtree');
					$(subTree).removeClass('selected-subtree');
					$(subTree).removeClass('closing');
					$(subTree).attr('aria-expanded', false);
				}, 200);
				resetButtonText(subTree)
			}

			var wait;

			function openSubmenu(liElement) {
				var currentElm = $(liElement);
				clearTimeout(wait);
				$('.selected-subtree.instant').removeClass('instant');
				if (!currentElm.hasClass('selected-subtree')) {
					$(currentElm).attr('aria-expanded', true);
					var navigationList = $('.navigation-list');
					var opening = $('.main-menu-list-item.opening').length != 0;
					if (navigationList.hasClass('show-subtree')
						&& !opening) {
						$('.selected-subtree').removeClass(
							'selected-subtree').attr(
								'aria-expanded', 'false');
						;
						currentElm.addClass('instant');
						currentElm.addClass('selected-subtree');
						setButtonText(currentElm);
					} else if (!opening) {
						$('.selected-subtree').removeClass(
							'selected-subtree').attr(
								'aria-expanded', 'false');
						navigationList.addClass('show-subtree');
						currentElm.addClass('opening');
						setTimeout(function () {
							$(currentElm).addClass('selected-subtree');
						}, 50);
						setTimeout(function () {
							currentElm.removeClass('opening');
						}, 200);
						setButtonText(currentElm);
					} else {
						wait = setTimeout(function () {
							openSubmenu(liElement);
						}, 100);
					}
				}
			}

			function toggleSubmenu(arrowElement) {
				var navigationList = $('.navigation-list');
				var subTree = $(arrowElement).parent().parent();
				$('.selected-subtree.instant').removeClass('instant');

				if ($(arrowElement).hasClass('navigation-list-back')) {
					navigationList = $('.navigation-list');
					subTree = $(arrowElement).parent().parent()
						.parent().parent();
				}

				if ($(navigationList).hasClass('show-subtree')
					&& $(subTree).hasClass('selected-subtree')) {
					$(subTree).addClass('closing');
					setTimeout(function () {

						$(navigationList).removeClass('show-subtree');
						$(subTree).removeClass('selected-subtree');
						$(subTree).removeClass('closing');
						$(subTree).attr('aria-expanded', false);
					}, 200);
					resetButtonText(subTree)
				}

				else if ($(navigationList).hasClass('show-subtree')
					&& !$(subTree).hasClass('selected-subtree')) {
					$('.selected-subtree').removeClass(
						'selected-subtree').attr('aria-expanded',
							'false');
					$(subTree).addClass('instant');
					$(subTree).addClass('selected-subtree');
					$(subTree).attr('aria-expanded', true);
					setButtonText(subTree);
					$('.navigation-list').animate(
						{
							scrollTop: $(".selected-subtree")
								.offset().top - 80
						}, 1000);
				}

				else {
					$('.selected-subtree').removeClass(
						'selected-subtree');
					$(navigationList).addClass('show-subtree');
					$(subTree).addClass('selected-subtree').attr('aria-expanded', true);
					setButtonText(subTree)
				}
			}

			function setButtonText(subTree) {
				var button = $(subTree).find(
					".navigation-list-arrow button")
				if (button != null) {
					var buttonText = button.data("label");
					button.attr("aria-label", buttonText
						+ " submenu open")
				}
			}

			function resetButtonText(subTree) {
				var button = $(subTree).find(
					".navigation-list-arrow button")
				if (button != null) {
					var buttonText = button.data("label");
					button.attr("aria-label", buttonText
						+ " submenu closed")
				}
			}

			// Fade in submenu-items on arrow-click
			$('.navigation-list > li > .navigation-list-item').click(
				function () {
					var open = $(this).parent().hasClass(
						'selected-subtree')
					if ($(window).width() > 1199) {
						return;
					}
					var subtree = $(this).siblings(
						'.navigation-list-subtree');
					var menuItems = subtree.children('li')

					// Stop any previous transitions
					menuItems.velocity("stop");

					// Add a new transition event
					if (!open) {
						menuItems.velocity(
							'transition.slideLeftIn', {
							duration: 500,
							stagger: 30,
							drag: true,
							display: 'block',

						});
					} else {
						menuItems.velocity(
							'transition.slideLeftOut', {
							duration: 300,
							stagger: 0,
							drag: true,
							display: 'block',
						});
					}
				});

			// Hover
			var closeTimeout;
			var changeTimeout;
			var prevX;
			$('.main-menu-list-item')
				.hover(
					function (evt) {
						if ($(this).children('ul').length > 0) {
							if (whatInput.ask() === 'mouse'
								&& $(window).width() > 1199) {
								clearTimeout(closeTimeout);
								if (($('.navigation-list.show-subtree').length === 0 || evt.originalEvent.movementX < 3)
									&& evt.originalEvent.movementX) {
									openSubmenu(this);
									clearTimeout(changeTimeout);
								} else {
									var menu = this;
									clearTimeout(changeTimeout);
									changeTimeout = setTimeout(
										function () {
											openSubmenu(menu);
										}, 200);
								}
							}
						}

					},
					function (evt) {
						if ($(window).width() > 1199) {
							clearTimeout(closeTimeout);
							closeTimeout = setTimeout(
								closeSubmenu, 500);
						}
					});

			// When the window is resized, check if the menu is expaded.
			// If yes, remove inline styles.
			$(window).resize(
				function () {
					if ($('.main-navigation').hasClass(
						'expand-menu')) {
						$('.main-navigation, .navigation-list')
							.removeAttr('style');
					}
				});

		});
