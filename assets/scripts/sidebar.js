// DOM Ready =============================================================
$(document).ready(function() {
  $('#section-dashboard').show();
	$('#section-easydex').hide();
	$('#section-jumblr').hide();
	$('#section-extcoin').hide();
	$('#section-zcash').hide();
	$('#section-iguana-atomic-explorer').hide();
	$('#section-iguana-wallet-settings').hide();
	$('#section-about-iguana').hide();
	$('#nav-dashboard').removeClass( '' ).addClass( 'active open' );
	$('#nav-easydex').removeClass( 'active open' ).addClass( '' );
	$('#nav-jumblr').removeClass( 'active open' ).addClass( '' );
	$('#nav-komodo-wallet').removeClass( 'active open' ).addClass( '' );
	$('#nav-zcash-wallet').removeClass( 'active open' ).addClass( '' );
	$('#nav-iguana-atomic-explorer').removeClass( 'active open' ).addClass( '' );
	$('#nav-iguana-wallet-settings').removeClass( 'active open' ).addClass( '' );
	$('#nav-about-iguana').removeClass( 'active open' ).addClass( '' );
	$(".header-easydex-section").text(_lang[defaultLang].INDEX.DASHBOARD);

	removeKMDWalletStyle();
	removeZECWalletStyle();
	removeJumblrStyle();
	CommonSidebarActionsSet01();
	applyDashboardStyle();
});

$('#nav-dashboard').on('click', function() {
	$('#section-dashboard').show();
	var active_edexcoin = $('[data-edexcoin]').attr('data-edexcoin');
	if (active_edexcoin !== 'COIN') {
		$('#header-dashboard').show();
	}
	$('#section-easydex').hide();
	$('#section-jumblr').hide();
	$('#section-extcoin').hide();
	$('#section-zcash').hide();
	$('#section-iguana-atomic-explorer').hide();
	$('#section-iguana-wallet-settings').hide();
	$('#section-about-iguana').hide();
	$('#nav-dashboard').removeClass( '' ).addClass( 'active open' );
	$('#nav-easydex').removeClass( 'active open' ).addClass( '' );
	$('#nav-jumblr').removeClass( 'active open' ).addClass( '' );
	$('#nav-komodo-wallet').removeClass( 'active open' ).addClass( '' );
	$('#nav-zcash-wallet').removeClass( 'active open' ).addClass( '' );
	$('#nav-iguana-atomic-explorer').removeClass( 'active open' ).addClass( '' );
	$('#nav-iguana-wallet-settings').removeClass( 'active open' ).addClass( '' );
	$('#nav-about-iguana').removeClass( 'active open' ).addClass( '' );
	$(".header-easydex-section").text(_lang[defaultLang].INDEX.DASHBOARD);
	$.each($('.nav-top-menu'), function(index, value) { $(value).removeClass('active'); });
	$(this.parentElement).addClass('active');
	removeKMDWalletStyle();
	removeZECWalletStyle();
	removeJumblrStyle();
	CommonSidebarActionsSet011();
	applyDashboardStyle();
});

$('#nav-easydex').on('click', function() {
	$('#section-dashboard').hide();
	$('#header-dashboard').hide();
	$('#section-easydex').show();
	$('#section-jumblr').hide();
	$('#section-extcoin').hide();
	$('#section-zcash').hide();
	$('#section-about-iguana').hide();
	$('#section-iguana-atomic-explorer').hide();
	$('#section-iguana-wallet-settings').hide();
	$('#nav-dashboard').removeClass( 'active open' ).addClass( '' );
	$('#nav-easydex').removeClass( '' ).addClass( 'active open' );
	$('#nav-komodo-wallet').removeClass( 'active open' ).addClass( '' );
	$('#nav-zcash-wallet').removeClass( 'active open' ).addClass( '' );
	$('#nav-iguana-atomic-explorer').removeClass( 'active open' ).addClass( '' );
	$('#nav-iguana-wallet-settings').removeClass( 'active open' ).addClass( '' );
	$('#nav-about-iguana').removeClass( 'active open' ).addClass( '' );
	$('.page-header-bordered h1').text('EasyDEX');
	$(".header-easydex-section").text(_lang[defaultLang].SIDEBAR.EDEX_MOTTO);
	$.each($('.nav-top-menu'), function(index, value) { $(value).removeClass('active'); });
	$(this.parentElement).addClass('active')
	removeKMDWalletStyle();
	removeZECWalletStyle();
	removeJumblrStyle();
	CommonSidebarActionsSet02();
	removeDashboardStyle();
});

$('#nav-jumblr').on('click', function() {
	$('#section-dashboard').hide();
	$('#header-dashboard').hide();
	$('#section-easydex').hide();
	$('#section-jumblr').show();
	$('#section-extcoin').hide();
	$('#section-zcash').hide();
	$('#section-about-iguana').hide();
	$('#section-iguana-atomic-explorer').hide();
	$('#section-iguana-wallet-settings').hide();
	$('#nav-dashboard').removeClass( 'active open' ).addClass( '' );
	$('#nav-easydex').removeClass( 'active open' ).addClass( '' );
	$('#nav-jumblr').removeClass( '' ).addClass( 'active open' );
	$('#nav-komodo-wallet').removeClass( 'active open' ).addClass( '' );
	$('#nav-zcash-wallet').removeClass( 'active open' ).addClass( '' );
	$('#nav-iguana-atomic-explorer').removeClass( 'active open' ).addClass( '' );
	$('#nav-iguana-wallet-settings').removeClass( 'active open' ).addClass( '' );
	$('#nav-about-iguana').removeClass( 'active open' ).addClass( '' );
	$('.page-header-bordered h1').text('Jumblr')
	//$(".header-easydex-section").text('Secure, Native and Decentralised Coin Shuffling');
	$.each($('.nav-top-menu'), function(index, value) { $(value).removeClass('active'); });
	$(this.parentElement).addClass('active')
	removeKMDWalletStyle();
	removeZECWalletStyle();
	CommonSidebarActionsSet02();
	removeDashboardStyle();
	applyJumblrStyle()
});

$('#nav-komodo-wallet').on('click', function() {
	$('#section-dashboard').hide();
	$('#header-dashboard').hide();
	$('#section-easydex').hide();
	$('#section-jumblr').hide();
	$('#section-extcoin').show();
	$('#section-zcash').hide();
	$('#section-about-iguana').hide();
	$('#section-iguana-atomic-explorer').hide();
	$('#section-iguana-wallet-settings').hide();
	$('#nav-dashboard').removeClass( 'active open' ).addClass( '' );
	$('#nav-easydex').removeClass( 'active open' ).addClass( '' );
	$('#nav-jumblr').removeClass( 'active open' ).addClass( '' );
	$('#nav-komodo-wallet').removeClass( '' ).addClass( 'active open' );
	$('#nav-zcash-wallet').removeClass( 'active open' ).addClass( '' );
	$('#nav-iguana-atomic-explorer').removeClass( 'active open' ).addClass( '' );
	$('#nav-iguana-wallet-settings').removeClass( 'active open' ).addClass( '' );
	$('#nav-about-iguana').removeClass( 'active open' ).addClass( '' );

	$.each($('[data-extcoin]'), function(index, value) {
		$('[data-extcoin]').attr('data-extcoin', 'KMD');
		$('[data-extcoin="KMD"]');
	});
	$.each($('[data-extcoinname]'), function(index, value) {
		$('[data-extcoinname]').text('KMD');
		$('[data-extcoinname="KMD"]');
	});
	$.each($('[data-extcointitle]'), function(index, value) {
		$('[data-extcointitle]').text('Komodo');
		$('[data-extcointitle="Komodo"]');
	});
	KMDWalletDashboard.init(); // Initiate Komodo Dashboard sript
	RunKMDInitFunctions();
	removeJumblrStyle();
	// removeZECWalletStyle();
	applyKMDWalletStyle();
	CommonSidebarActionsSet02();
	removeDashboardStyle();
});

$('#nav-zcash-wallet').on('click', function() {
	NProgress.done(true);
	NProgress.configure({
		template: '<div class="bar nprogress-bar-header nprogress-bar-info" role="bar"></div>' +
							'<div class="spinner" role="spinner">' +
								'<div class="spinner-icon"></div>' +
							'</div>'
	});
	NProgress.start();
	$('#section-dashboard').hide();
	$('#header-dashboard').hide();
	$('#section-easydex').hide();
	$('#section-jumblr').hide();
	$('#section-extcoin').hide();
	// $('#section-zcash').show();
	$('#section-extcoin').show();
	$('#section-about-iguana').hide();
	$('#section-iguana-atomic-explorer').hide();
	$('#section-iguana-wallet-settings').hide();
	$('#nav-dashboard').removeClass( 'active open' ).addClass( '' );
	$('#nav-easydex').removeClass( 'active open' ).addClass( '' );
	$('#nav-jumblr').removeClass( 'active open' ).addClass( '' );
	$('#nav-komodo-wallet').removeClass( 'active open' ).addClass( '' );
	$('#nav-zcash-wallet').removeClass( '' ).addClass( 'active open' );
	$('#nav-iguana-atomic-explorer').removeClass( 'active open' ).addClass( '' );
	$('#nav-iguana-wallet-settings').removeClass( 'active open' ).addClass( '' );
	$('#nav-about-iguana').removeClass( 'active open' ).addClass( '' );
	$(".header-easydex-section").text(_lang[defaultLang].INDEX.ZC_WALLET);

	$.each($('[data-extcoin]'), function(index, value) {
		$('[data-extcoin]').attr('data-extcoin', 'ZEC');
		$('[data-extcoin="ZEC"]');
	});
	$.each($('[data-extcoinname]'), function(index, value) {
		$('[data-extcoinname]').text('ZEC');
		$('[data-extcoinname="ZEC"]');
	});
	$.each($('[data-extcointitle]'), function(index, value) {
		$('[data-extcointitle]').text('Zcash');
		$('[data-extcointitle="Zcash"]');
	});
	
	KMDWalletDashboard.init(); // Initiate Komodo Dashbaord sript
	RunKMDInitFunctions();
	//removeKMDWalletStyle();
	applyZECWalletStyle();
	CommonSidebarActionsSet02();
	removeDashboardStyle();
	NProgress.done();
});

$('#nav-iguana-atomic-explorer').on('click', function() {
	$('#section-dashboard').hide();
	$('#header-dashboard').hide();
	$('#section-easydex').hide();
	$('#section-jumblr').hide();
	$('#section-extcoin').hide();
	$('#section-zcash').hide();
	$('#section-iguana-atomic-explorer').show();
	$('#section-iguana-wallet-settings').hide();
	$('#section-about-iguana').hide();
	$('#nav-dashboard').removeClass( 'active open' ).addClass( '' );
	$('#nav-easydex').removeClass( 'active open' ).addClass( '' );
	$('#nav-jumblr').removeClass( 'active open' ).addClass( '' );
	$('#nav-komodo-wallet').removeClass( 'active open' ).addClass( '' );
	$('#nav-zcash-wallet').removeClass( 'active open' ).addClass( '' );
	$('#nav-about-iguana').removeClass( 'active open' ).addClass( '' );
	$('#nav-iguana-wallet-settings').removeClass( 'active open' ).addClass( '' );
	$('#nav-iguana-atomic-explorer').removeClass( '' ).addClass( 'active open' );
	$(".header-easydex-section").text('Atomic Explorer');
	$.each($('.nav-top-menu'), function(index, value) { $(value).removeClass('active'); });
	$(this.parentElement).addClass('active');
	removeKMDWalletStyle();
	removeZECWalletStyle();
	removeJumblrStyle();
	CommonSidebarActionsSet02();
	removeDashboardStyle();
	$('#easydex-header-div').hide();
});

$('#nav-iguana-wallet-settings').on('click', function() {
	$('#section-dashboard').hide();
	$('#header-dashboard').hide();
	$('#section-easydex').hide();
	$('#section-jumblr').hide();
	$('#section-extcoin').hide();
	$('#section-zcash').hide();
	$('#section-iguana-atomic-explorer').hide();
	$('#section-iguana-wallet-settings').show();
	$('#section-about-iguana').hide();
	$('#nav-dashboard').removeClass( 'active open' ).addClass( '' );
	$('#nav-easydex').removeClass( 'active open' ).addClass( '' );
	$('#nav-jumblr').removeClass( 'active open' ).addClass( '' );
	$('#nav-komodo-wallet').removeClass( 'active open' ).addClass( '' );
	$('#nav-zcash-wallet').removeClass( 'active open' ).addClass( '' );
	$('#nav-about-iguana').removeClass( 'active open' ).addClass( '' );
	$('#nav-iguana-atomic-explorer').removeClass( 'active open' ).addClass( '' );
	$('#nav-iguana-wallet-settings').removeClass( '' ).addClass( 'active open' );
	// $(".header-easydex-section").text("Wallet Settings");
	removeKMDWalletStyle();
	removeZECWalletStyle();
	removeJumblrStyle();
	Settings_ShowWalletInfo(); // Execute this function from walletsettings.js file
	CommonSidebarActionsSet02();
	removeDashboardStyle();
	$('#easydex-header-div').hide();
});

$('#nav-about-iguana').on('click', function() {
	$('#section-dashboard').hide();
	$('#header-dashboard').hide();
	$('#section-easydex').hide();
	$('#section-jumblr').hide();
	$('#section-extcoin').hide();
	$('#section-zcash').hide();
	$('#section-iguana-atomic-explorer').hide();
	$('#section-iguana-wallet-settings').hide();
	$('#section-about-iguana').show();
	$('#nav-dashboard').removeClass( 'active open' ).addClass( '' );
	$('#nav-easydex').removeClass( 'active open' ).addClass( '' );
	$('#nav-jumblr').removeClass( 'active open' ).addClass( '' );
	$('#nav-komodo-wallet').removeClass( 'active open' ).addClass( '' );
	$('#nav-zcash-wallet').removeClass( 'active open' ).addClass( '' );
	$('#nav-iguana-atomic-explorer').removeClass( 'active open' ).addClass( '' );
	$('#nav-iguana-wallet-settings').removeClass( 'active open' ).addClass( '' );
	$('#nav-about-iguana').removeClass( '' ).addClass( 'active open' );
	$(".header-easydex-section").text('About Iguana');
	removeKMDWalletStyle();
	removeZECWalletStyle();
	removeJumblrStyle();
	CommonSidebarActionsSet02();
	removeDashboardStyle();
	$('#easydex-header-div').hide();
});

function CommonSidebarActionsSet01() {
	sessionStorage.setItem('DashboardActions', 'start');
	sessionStorage.setItem('NativeWalletActions', 'stop');
	// $(document).ready(function() { Dashboard.init(); });
	$("#wifkeys_passphrase").val('');
	$('#wif-priv-keys').html('');
}

function CommonSidebarActionsSet011() {
	sessionStorage.setItem('DashboardActions', 'start');
	sessionStorage.setItem('NativeWalletActions', 'stop');
	// location.reload();
	$("#wifkeys_passphrase").val('');
	$('#wif-priv-keys').html('');
}

function CommonSidebarActionsSet02() {
	sessionStorage.setItem('DashboardActions', 'stop');
	$("#wifkeys_passphrase").val('');
	$('#wif-priv-keys').html('');
}

function applyKMDWalletStyle() {
	$('.header-easydex-section').html('<img src="assets/images/kmd_header_title_logo.png">');
	$('.page-title').hide();
	$('#easydex-header-div').css('background-image', 'url("assets/images/bg/kmd_transparent_header_bg.png")');
	$('#easydex-header-div').css('background-repeat', 'no-repeat');
	$('#easydex-header-div').css('background-position', '0%');
	$('#easydex_kmd_wallet_actions_header').show();
	$('#easydex_zec_wallet_actions_header').hide();
	$('#jumblr_actions_header').hide();
	$('#easydex_btc_btcd_balances_header').hide();
	sessionStorage.setItem('NativeWalletActions', 'start');
}

function removeKMDWalletStyle() {
	$('.page-title').show();
	$('#easydex-header-div').removeAttr( 'style' );
	$('#easydex_kmd_wallet_actions_header').hide();
	$('#easydex_zec_wallet_actions_header').hide();
	$('#jumblr_actions_header').hide();
	$('#easydex_btc_btcd_balances_header').hide();
	sessionStorage.setItem('NativeWalletActions', 'stop');
}

function applyZECWalletStyle() {
	$('.header-easydex-section').html('<img src="assets/images/zec_header_title_logo.png">');
	$('.page-title').hide();
	$('#easydex-header-div').css('background-image', 'url("assets/images/bg/zec_transparent_header_bg.png")');
	$('#easydex-header-div').css('background-repeat', 'no-repeat');
	$('#easydex-header-div').css('background-position', '0%');
	$('#easydex_kmd_wallet_actions_header').hide();
	$('#easydex_zec_wallet_actions_header').show();
	$('#jumblr_actions_header').hide();
	$('#easydex_btc_btcd_balances_header').hide();
	sessionStorage.setItem('NativeWalletActions', 'start');
}

function removeZECWalletStyle() {
	$('.page-title').show();
	$('#easydex-header-div').removeAttr( 'style' );
	$('#easydex_kmd_wallet_actions_header').hide();
	$('#easydex_zec_wallet_actions_header').hide();
	$('#jumblr_actions_header').hide();
	$('#easydex_btc_btcd_balances_header').hide();
	sessionStorage.setItem('NativeWalletActions', 'stop');
}

function applyJumblrStyle() {
	$('.header-easydex-section').html('<img src="assets/images/jumblr_header_title_logo.png"><br>' + _lang[defaultLang].SIDEBAR.JUMBLR_MOTTO);
	$('.page-title').hide();
	$('#easydex-header-div').css('background-image', 'url("assets/images/bg/jumblr_transparent_header_bg.png")');
	$('#easydex-header-div').css('background-repeat', 'no-repeat');
	$('#easydex-header-div').css('background-position', '0%');
	$('#easydex_kmd_wallet_actions_header').hide();
	$('#easydex_zec_wallet_actions_header').hide();
	$('#jumblr_actions_header').show();
	$('#easydex_btc_btcd_balances_header').hide();
	sessionStorage.setItem('NativeWalletActions', 'start');
}

function removeJumblrStyle() {
	$('.page-title').show();
	$('#easydex-header-div').removeAttr( 'style' );
	$('#easydex_kmd_wallet_actions_header').hide();
	$('#easydex_zec_wallet_actions_header').hide();
	$('#jumblr_actions_header').hide();
	$('#easydex_btc_btcd_balances_header').hide();
	sessionStorage.setItem('NativeWalletActions', 'stop');
}

function applyDashboardStyle() {
	$('.page-aside').show();
	$('.page-main').show();
	/* set default map height */
	var navbarH = $('.site-navbar').outerHeight(),
			footerH = $('.site-footer').outerHeight(),
			mapH = $(window).height() - navbarH - footerH;
	$('.page-main').outerHeight(mapH);
	$('#easydex-header-div').hide();
	var active_edexcoinmodecode = sessionStorage.getItem('edexTmpMode');
	console.log(active_edexcoinmodecode);
	if (active_edexcoinmodecode == 'Basilisk') {
		$('#edex-footer').hide();
	} else {
		$('#edex-footer').show();
	}

	setTimeout(function() {
		var active_edexcoin = $('[data-edexcoin]').attr('data-edexcoin');
		console.log(active_edexcoin)
		if (active_edexcoin == 'COIN') {
			$('.page-aside .wallet-widgets-list .list-group .list-group-item a')[0].click();
		}
	}, 1000);
}

function removeDashboardStyle() {
	$('.page-aside').hide();
	$(".page-main").hide();
	$('#easydex-header-div').show();
	$('#edex-footer').hide();
}