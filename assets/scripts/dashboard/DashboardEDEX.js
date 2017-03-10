function EdexfillTxHistory(coin) {
	$('#edexcoin_txhistory').data('panel-api').load();
	NProgress.done(true);
	NProgress.configure({
		template: '<div class="bar nprogress-bar-header nprogress-bar-info" role="bar"></div>' +
							'<div class="spinner" role="spinner">' +
								'<div class="spinner-icon"></div>' +
							'</div>'
	});
	NProgress.start();

	var active_edexcoinmodecode = sessionStorage.getItem('edexTmpMode');

	if ( active_edexcoinmodecode === 'Basilisk' ) {
		EdexGetTxList_cache(coin).then(function(result) {
			var edex_txhistory_table = '';
			edex_txhistory_table = $('#edex-tx-history-tbl').DataTable({
				data: result,
				'order': [
					[ 3, 'desc' ]
				],
				select: true,
				retrieve: true
			});

			edex_txhistory_table.destroy();
			edex_txhistory_table = $('#edex-tx-history-tbl').DataTable({
				data: result,
				'order': [
					[ 3, 'desc' ]
				],
				select: true,
				retrieve: true
			});
			$('#edexcoin_txhistory').data('panel-api').done();
			$('.panel-loading').remove();
		});
	}

	if ( active_edexcoinmodecode === 'Full' ) {
		EdexGetTxList(coin).then(function(result){
			var edex_txhistory_table = '';
			edex_txhistory_table = $('#edex-tx-history-tbl').DataTable({
				data: result,
				'order': [
					[ 3, 'desc' ]
				],
				select: true,
				retrieve: true
			});

			edex_txhistory_table.destroy();
			edex_txhistory_table = $('#edex-tx-history-tbl').DataTable({
				data: result,
				'order': [
					[ 3, 'desc' ]
				],
				select: true,
				retrieve: true
			});
			$('#edexcoin_txhistory').data('panel-api').done();
			$('.panel-loading').remove();
		});
	}
}

function refreshEDEXCoinWalletList() {
	var walletDivContent = '',
			AddColumnDiv = 0;

	$.each([
		'native',
		'basilisk',
		'full'
		], function( index, value ) {
			var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
					ajax_data = {
						'userpass': tmpIguanaRPCAuth,
						'agent': 'InstantDEX',
						'method': 'allcoins'
					};

			$.ajax({
				type: 'POST',
				data: JSON.stringify(ajax_data),
				url: 'http://127.0.0.1:' + config.iguanaPort,
				success: function(data, textStatus, jqXHR) {
					var AllcoinsDataOutput = JSON.parse(data);

					$.each(AllcoinsDataOutput[value], function(index) {
						var coinlogo = '',
								coinname = '',
								modecode = '',
								modetip = '',
								modecolor = '';

            switch (value) {
              case 'native':
                modecode = 'Native';
                modetip = 'Native';
                modecolor = 'primary';
                break;
              case 'basilisk':
                modecode = 'Basilisk';
                modetip = 'Basilisk';
                modecolor = 'info';
                break;
              case 'full':
                modecode = 'Full';
                modetip = 'Full';
                modecolor = 'success';
                break;
              case 'virtual':
                modecode = 'Virtual';
                modetip = 'Virtual';
                modecolor = 'danger';
                break;
              case 'notarychains':
                modecode = 'Notarychains';
                modetip = 'Notarychains';
                modecolor = 'dark';
                break;
            }

            switch (AllcoinsDataOutput[value][index]) {
              case 'BTC':
                coinlogo = 'bitcoin';
                coinname = 'Bitcoin';
                break;
              case 'BTCD':
                coinlogo = 'bitcoindark';
                coinname = 'BitcoinDark';
                break;
              case 'LTC':
                coinlogo = 'litecoin';
                coinname = 'Litecoin';
                break;
              case 'VPN':
                coinlogo = 'vpncoin';
                coinname = 'VPNcoin';
                break;
              case 'SYS':
                coinlogo = 'syscoin';
                coinname = 'Syscoin';
                break;
              case 'ZEC':
                coinlogo = 'zcash';
                coinname = 'Zcash';
                break;
              case 'NMC':
                coinlogo = 'namecoin';
                coinname = 'Namecoin';
                break;
              case 'DEX':
                coinlogo = 'dex';
                coinname = 'DEX';
                break;
              case 'DOGE':
                coinlogo = 'dogecoin';
                coinname = 'Dogecoin';
                break;
              case 'DGB':
                coinlogo = 'digibyte';
                coinname = 'Digibyte';
                break;
              case 'MZC':
                coinlogo = 'mazacoin';
                coinname = 'Mazacoin';
                break;
              case 'UNO':
                coinlogo = 'unobtanium';
                coinname = 'Unobtanium';
                break;
              case 'ZET':
                coinlogo = 'zetacoin';
                coinname = 'Zetacoin';
                break;
              case 'KMD':
                coinlogo = 'komodo';
                coinname = 'Komodo';
                break;
              case 'BTM':
                coinlogo = 'bitmark';
                coinname = 'Bitmark';
                break;
              case 'CARB':
                coinlogo = 'carboncoin';
                coinname = 'Carboncoin';
                break;
              case 'ANC':
                coinlogo = 'anoncoin';
                coinname = 'AnonCoin';
                break;
              case 'FRK':
                coinlogo = 'franko';
                coinname = 'Franko';
                break;
              case 'SUPERNET':
                coinlogo = 'SUPERNET';
                coinname = 'SUPERNET';
                break;
              case 'REVS':
                coinlogo = 'REVS';
                coinname = 'REVS';
                break;
              case 'WIRELESS':
                  coinlogo = 'WIRELESS';
                  coinname = 'WIRELESS';
                  break;
               case 'DEX':
                coinlogo = 'DEX';
                coinname = 'DEX';
                break;
              case 'PANGEA':
                coinlogo = 'PANGEA';
                coinname = 'PANGEA';
                break;
              case 'JUMBLR':
                  coinlogo = 'JUMBLR';
                  coinname = 'JUMBLR';
                  break;
              case 'BET':
                coinlogo = 'BET';
                coinname = 'BET';
                break;
              case 'CRYPTO':
                coinlogo = 'CRYPTO';
                coinname = 'CRYPTO';
                break;
              case 'HODL':
                  coinlogo = 'HODL';
                  coinname = 'HODL';
                  break;
              case 'SHARK':
                  coinlogo = 'SHARK';
                  coinname = 'SHARK';
                  break;
               case 'BOTS':
                coinlogo = 'BOTS';
                coinname = 'BOTS';
                break;
              case 'MGW':
                coinlogo = 'MGW';
                coinname = 'MGW';
                break;
              case 'MVP':
                  coinlogo = 'MVP';
                  coinname = 'MVP';
                  break;
              case 'KV':
                coinlogo = 'KV';
                coinname = 'KV';
                break;
              case 'CEAL':
                coinlogo = 'CEAL';
                coinname = 'CEAL';
                break;
              case 'MESH':
                  coinlogo = 'MESH';
                  coinname = 'MESH';
                  break;
              case 'USD':
                coinlogo = 'USD';
                coinname = 'USD';
                break;
            }

						walletDivContent += '<!-- Wallet Widget ' + AllcoinsDataOutput[value][index] + ' -->';
						walletDivContent += '<div class="list-group-item col-xlg-6 col-lg-12 wallet-widgets-info" data-edexcoincode="' + AllcoinsDataOutput[value][index] + '">';
							walletDivContent += '<div class="widget widget-shadow">';
								walletDivContent += '<div class="widget-content text-center bg-white padding-20">';
									walletDivContent += '<a class="avatar margin-bottom-5 edexcoin-logo" href="javascript:void(0)" data-edexcoincode="' + AllcoinsDataOutput[value][index] + '" data-edexcoinmodecode="' + modecode + '" data-edexcoinname="' + coinname + '" id="edexcoin-logo">';
										walletDivContent += '<img class="img-responsive" src="assets/images/cryptologo/' + coinlogo + '.png" alt="' + coinname + '"/>';
										walletDivContent += '<span class="badge up badge-' + modecolor + '" id="basfull" data-edexcoincode="' + AllcoinsDataOutput[value][index] + '" data-toggle="tooltip" data-placement="top" data-original-title="' + modetip + '">' + modecode + '</span>';
									walletDivContent += '</a>';
									walletDivContent += '<div class="coin-name">' + coinname + '</div>';
								walletDivContent += '</div>';
							walletDivContent += '</div>';
						walletDivContent += '</div>';
						walletDivContent += '<!-- End Wallet Widget ' + AllcoinsDataOutput[value][index] + ' -->';

						$('.wallet-widgets-row').html(walletDivContent);
						//getCoinBalance(AllcoinsDataOutput[value][index]);
						//getCoinBalance_altfn('KMD');
						//getCoinBalance('KMD');
						/*if ( modecode == 'Basilisk' ) {
							$('span[data-edexcoincode="' + AllcoinsDataOutput[value][index] + '"][id="edexcoin-balance"]').parent().hide();
							//getBasiliskCoinBalance(AllcoinsDataOutput[value][index])
						}*/

						$('.scrollbar-dynamic').scrollbar(); //Make sure widget-body has scrollbar for transactions history
						$('[data-toggle="tooltip"]').tooltip(); //Make sure tooltips are working for wallet widgets and anywhere else in wallet.
						edexCoinBtnAction();
					});
				},
				error: function(xhr, textStatus, error) {
					console.log('failed starting BitcoinDark.');
					console.log(xhr.statusText);
					if ( xhr.readyState == 0 ) {
						Iguana_ServiceUnavailable();
					}
					console.log(textStatus);
					console.log(error);

					if (xhr.readyState == '0' ) {
						toastr.error(_lang[defaultLang].TOASTR.IGUANA_CONN_ERR, _lang[defaultLang].TOASTR.ACCOUNT_NOTIFICATION);
					}
				}
			});
	});
}

function EdexGetTxList(coin) {
	NProgress.done(true);
	NProgress.configure({
		template: '<div class="bar nprogress-bar-header nprogress-bar-info" role="bar"></div>' +
							'<div class="spinner" role="spinner">' +
								'<div class="spinner-icon"></div>' +
							'</div>'
	});
	NProgress.start();

	return new Promise((resolve) => {
		var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
				ajax_data_2 = {
					'userpass': tmpIguanaRPCAuth,
					'coin': coin,
					'agent': 'bitcoinrpc',
					'method': 'getaddressesbyaccount',
					'account': '*'
				},
				active_edexcoinmodecode = sessionStorage.getItem('edexTmpMode');

		$.ajax({
			data: JSON.stringify(ajax_data_2),
			url: 'http://127.0.0.1:' + config.iguanaPort,
			type: 'POST',
			dataType: 'json'
		}).then(data => {
			var total_utxos = [];
			let params = '';

			Promise.all(data.result.map((coinaddr_value,coinaddr_index) => {
			if ( active_edexcoinmodecode == 'Basilisk' ) {
				if ( coin == 'BTC' ||
						 coin == 'BTCD' ||
						 coin == 'LTC' ||
						 coin == 'DOGE' ||
						 coin == 'DGB' ||
						 coin == 'SYS' ||
						 coin == 'MZC' ||
						 coin == 'UNO' ||
						 coin == 'ZET' ||
						 coin == 'BTM' ||
						 coin == 'CARB' ||
						 coin == 'ANC' ||
						 coin == 'FRK') {
							params = {
								'userpass': tmpIguanaRPCAuth,
								'agent': 'dex',
								'method': 'listtransactions',
								'address': coinaddr_value,
								'count': 100,
								'skip': 0,
								'symbol': coin
							};
						} else {
							params = {
								'userpass': tmpIguanaRPCAuth,
								'agent': 'dex',
								'method': 'listtransactions',
								'address': coinaddr_value,
								'count': 100,
								'skip': 0,
								'symbol': coin
							};
						}
				} else {
						params = {
							'userpass': tmpIguanaRPCAuth,
							'coin': coin,
							'method': 'listtransactions',
							'params': [
								0,
								9999999,
								[]
							]
						};
				}

				return new Promise((resolve, reject) => {
					$.ajax({
						data: JSON.stringify(params),
						url: 'http://127.0.0.1:' + config.iguanaPort,
						type: 'POST',
						dataType: 'json'
					}).then(data => {
						if ( active_edexcoinmodecode == 'Full' ) {
							data = data.result;
						}
						//console.log(data)
						total_utxos = $.merge(total_utxos, data);
						resolve(total_utxos);
					});
				});
			})).then(result => {
				let result_data = result[result.length - 1];
				let compiled_result = [];

				$.each(result_data, function(index, value) {
					if ( active_edexcoinmodecode == 'Full' ||
							( active_edexcoinmodecode == 'Basilisk' && coin == 'BTC') ||
							( active_edexcoinmodecode == 'Basilisk' && coin == 'BTCD' ) ||
							( active_edexcoinmodecode == 'Basilisk' && coin == 'LTC' ) ||
							( active_edexcoinmodecode == 'Basilisk' && coin == 'DOGE' ) ||
							( active_edexcoinmodecode == 'Basilisk' && coin == 'DGB' ) ||
							( active_edexcoinmodecode == 'Basilisk' && coin == 'SYS' ) ||
							( active_edexcoinmodecode == 'Basilisk' && coin == 'MZC' ) ||
							( active_edexcoinmodecode == 'Basilisk' && coin == 'UNO' ) ||
							( active_edexcoinmodecode == 'Basilisk' && coin == 'ZET' ) ||
							( active_edexcoinmodecode == 'Basilisk' && coin == 'BTM' ) ||
							( active_edexcoinmodecode == 'Basilisk' && coin == 'CARB' ) ||
							( active_edexcoinmodecode == 'Basilisk' && coin == 'ANC' ) ||
							( active_edexcoinmodecode == 'Basilisk' && coin == 'FRK' ) ) {

						var tmp_category = '',
								tmp_amount = result_data[index].amount;

						if (!('amount' in result_data[index])) {
							tmp_amount = '<span class="label label-dark">' + _lang[defaultLang].DASHBOARD.UNKNOWN + '</span>';
						}

						var tmp_addr = result_data[index].address;
						if (!('address' in result_data[index])) {
							tmp_addr = '<i class="icon fa-bullseye"></i> <span class="label label-dark">' + _lang[defaultLang].DASHBOARD.ZADDR_NOT_LISTED + '!</span>';
						}

						var tmp_secondsToString = secondsToString(result_data[index].blocktime);

						if ( result_data[index].category == 'send' ) {
							tmp_category = '<i class="icon fa-arrow-circle-left"></i> OUT';
						}
						if ( result_data[index].category == 'receive' ) {
							tmp_category = '<i class="icon fa-arrow-circle-right"></i> IN';
						}
						if ( result_data[index].category == 'generate' ) {
							tmp_category = '<i class="icon fa-cogs"></i> Mined';
						}if ( result_data[index].category == 'immature' ) {
							tmp_category = '<i class="icon fa-clock-o"></i> Immature';
						}
						if ( result_data[index].category == 'unknown' ) {
							tmp_category = '<i class="icon fa-meh-o"></i> Unknown';
						}

						tmplisttransactions = [
							tmp_category,
							result_data[index].confirmations,
							tmp_amount,
							tmp_secondsToString,
							tmp_addr,
							'<button type="button" class="btn btn-xs white btn-info waves-effect waves-light kmd-txid-details-btn" data-edexcoin="' + coin + '" data-txidtype="public" data-txid="' + result_data[index].txid + '">' +
								'<i class="icon fa-search"></i>' +
							'</button>'
						];
						compiled_result.push(tmplisttransactions);
					}

					if ( active_edexcoinmodecode == 'Basilisk' &&
							 coin !== 'BTC' &&
							 coin !== 'BTCD' &&
							 coin !== 'LTC' &&
							 coin !== 'DOGE' &&
							 coin !== 'DGB' &&
							 coin !== 'SYS' &&
							 coin !== 'MZC' &&
							 coin !== 'UNO' &&
							 coin !== 'ZET' &&
							 coin !== 'BTM' &&
							 coin !== 'CARB' &&
							 coin !== 'ANC' &&
							 coin !== 'FRK' ) {
						var tmp_category = '',
								tmp_amount = result_data[index].amount;

						if (!('amount' in result_data[index])) {
							tmp_amount = '<span class="label label-dark">' + _lang[defaultLang].DASHBOARD.UNKNOWN + '</span>';
						}

						var tmp_addr = null
						if (!('paid' in result_data[index])) {
							tmp_addr = '<i class="icon fa-bullseye"></i> <span class="label label-dark">' + _lang[defaultLang].DASHBOARD.ZADDR_NOT_LISTED + '!</span>';
						}
						if (('paid' in result_data[index])) {
							var first_addr = Object.keys(result_data[index].paid['vouts'][0]),
									tmp_addr = first_addr[0];
						}

						var tmp_secondsToString = secondsToString(result_data[index].timestamp);

						if ( result_data[index].type == 'sent' ) {
							tmp_category = '<span class="label label-danger"><i class="icon fa-arrow-circle-left"></i> ' + _lang[defaultLang].DASHBOARD.OUT + '</span>';
						}
						if ( result_data[index].type == 'received' ) {
							tmp_category = '<span class="label label-success"><i class="icon fa-arrow-circle-right"></i> ' + _lang[defaultLang].DASHBOARD.IN + '</span>';
						}
						if ( result_data[index].type == 'generate' ) {
							tmp_category = '<i class="icon fa-cogs"></i> ' + _lang[defaultLang].DASHBOARD.MINED;
						}
						if ( result_data[index].type == 'immature' ) {
							tmp_category = '<i class="icon fa-clock-o"></i> ' + _lang[defaultLang].DASHBOARD.IMMATURE;
						}
						if ( result_data[index].type == 'unknown' ) {
							tmp_category = '<i class="icon fa-meh-o"></i> ' + _lang[defaultLang].DASHBOARD.UNKNOWN;
						}

						if (!('confirmations' in result_data[index])) {
							tmp_confirms = '<i class="icon fa-meh-o"></i> ' + _lang[defaultLang].DASHBOARD.UNKNOWN;
						}
						if (('confirmations' in result_data[index])) {
							tmp_confirms = result_data[index].confirmations;
						}

						tmplisttransactions = [
							tmp_category,
							tmp_confirms,
							tmp_amount,
							tmp_secondsToString,
							tmp_addr,
							'<button type="button" class="btn btn-xs white btn-info waves-effect waves-light kmd-txid-details-btn" data-edexcoin="' + coin + '" data-txidtype="public" data-txid="' + result_data[index].txid + '">' +
								'<i class="icon fa-search"></i>' +
							'</button>'
						];
						compiled_result.push(tmplisttransactions);
					}
				});

				resolve(compiled_result);
				NProgress.done();
			});
		});
	});
}

function EdexGetTxList_cache(coin) {
	NProgress.done(true);
	NProgress.configure({
		template: '<div class="bar nprogress-bar-header nprogress-bar-info" role="bar"></div>' +
							'<div class="spinner" role="spinner">' +
								'<div class="spinner-icon"></div>' +
							'</div>'
	});
	NProgress.start();

	return new Promise((resolve) => {
		Shepherd_GetBasiliskCache().then(function(result) {
			var _data = JSON.parse(result)
					query = _data.result.basilisk,
					active_edexcoinmodecode = sessionStorage.getItem('edexTmpMode'),
					total_utxos = [];

			Promise.all(query[coin].addresses.map((coinaddr_value, coinaddr_index) => {
				return new Promise((resolve, reject) => {
					var data = query[coin][coinaddr_value].listtransactions.data;

					total_utxos = $.merge(total_utxos, data);
					resolve(total_utxos);
				});
			})).then(result => {
				let result_data = result[result.length - 1];
				let compiled_result = [];

				$.each(result_data, function(index, value) {
					if ( active_edexcoinmodecode == 'Basilisk' && coin !== 'BTC' && coin !== 'SYS') {
						var tmp_category = '',
								tmp_amount = result_data[index].amount;

						if (!('amount' in result_data[index])) {
							tmp_amount = '<span class="label label-dark">' + _lang[defaultLang].DASHBOARD.UNKNOWN + '</span>';
						}

						var tmp_addr = null
						if (!('paid' in result_data[index])) {
							tmp_addr = '<i class="icon fa-bullseye"></i> <span class="label label-dark">' + _lang[defaultLang].DASHBOARD.ZADDR_NOT_LISTED + '!</span>';
						}
						if (('paid' in result_data[index])) {
							var first_addr = Object.keys(result_data[index].paid['vouts'][0]),
									tmp_addr = first_addr[0];
						}

						var tmp_secondsToString = secondsToString(result_data[index].timestamp);

						if ( result_data[index].type == 'sent' ) {
							tmp_category = '<span class="label label-danger"><i class="icon fa-arrow-circle-left"></i> ' + _lang[defaultLang].DASHBOARD.OUT + '</span>';
						}
						if ( result_data[index].type == 'received' ) {
							tmp_category = '<span class="label label-success"><i class="icon fa-arrow-circle-right"></i> ' + _lang[defaultLang].DASHBOARD.IN + '</span>';
						}
						if ( result_data[index].type == 'generate' ) {
							tmp_category = '<i class="icon fa-cogs"></i> ' + _lang[defaultLang].DASHBOARD.MINED;
						}
						if ( result_data[index].type == 'immature' ) {
							tmp_category = '<i class="icon fa-clock-o"></i> ' + _lang[defaultLang].DASHBOARD.IMMATURE;
						}
						if ( result_data[index].type == 'unknown' ) {
							tmp_category = '<i class="icon fa-meh-o"></i> ' + _lang[defaultLang].DASHBOARD.UNKNOWN;
						}

						if (!('confirmations' in result_data[index])) {
							tmp_confirms = '<i class="icon fa-meh-o"></i> ' + _lang[defaultLang].DASHBOARD.UNKNOWN;
						}
						if (('confirmations' in result_data[index])) {
							tmp_confirms = result_data[index].confirmations;
						}

						tmplisttransactions = [
							tmp_category,
							tmp_confirms,
							tmp_amount,
							tmp_secondsToString,
							tmp_addr,
							'<button  type="button" class="btn btn-xs white btn-info waves-effect waves-light kmd-txid-details-btn" data-edexcoin="' + coin + '" data-txidtype="public" data-txid="' + result_data[index].txid + '">' +
								'<i class="icon fa-search"></i>' +
							'</button>'
						];
						compiled_result.push(tmplisttransactions);
					}
				})

				resolve(compiled_result);
				NProgress.done();
			});
		});
	});
}

/*function EdexGetTxList(coin) {
	return new Promise((resolve) =>{

		var tmpIguanaRPCAuth = 'tmpIgRPCUser@'+sessionStorage.getItem('IguanaRPCAuth');
		var ajax_data_1 = {'userpass':tmpIguanaRPCAuth,"agent":"SuperNET","method":"activehandle"}
		var tmp_coin_addr = null
		var active_edexcoinmodecode = sessionStorage.getItem('edexTmpMode');

		var ajax_call_1 = $.ajax({
								data: JSON.stringify(ajax_data_1),
					url: 'http://127.0.0.1:' + config.iguanaPort,
					type: 'POST',
					dataType: 'json',
				}),
			ajax_call_2 = ajax_call_1.then(function(data) {
					// .then() returns a new promise
					tmp_coin_addr = data[coin]
					//console.log(tmp_coin_addr);
					if ( active_edexcoinmodecode == 'Basilisk' ) {
						if ( coin == 'BTC'
									|| coin == 'BTCD'
									|| coin == 'LTC'
									|| coin == 'DOGE'
									|| coin == 'DGB'
									|| coin == 'SYS'
									|| coin == 'MZC'
									|| coin == 'UNO'
									|| coin == 'ZET'
									|| coin == 'BTM'
									|| coin == 'CARB'
									|| coin == 'ANC'
									|| coin == 'FRK') {
							var ajax_data_2 = {'userpass':tmpIguanaRPCAuth,"agent":"dex","method":"listtransactions","address":data[coin],"count":100,"skip":0,"symbol":coin}
						} else {
							var ajax_data_2 = {'userpass':tmpIguanaRPCAuth,"agent":"dex","method":"listtransactions","address":data[coin],"count":100,"skip":0,"symbol":coin}
						}
					} else {
						var ajax_data_2 = {'userpass':tmpIguanaRPCAuth,"coin":coin,"method":"listtransactions","params":[0, 9999999, []]}
					}
					console.log(ajax_data_2)
					return $.ajax({
						data: JSON.stringify(ajax_data_2),
						url: 'http://127.0.0.1:' + config.iguanaPort,
						type: 'POST',
						dataType: 'json',
					});
				});

		ajax_call_2.done(function(data) {
			//console.log(tmp_coin_addr);
			//console.log(data);
			if ( active_edexcoinmodecode == 'Full' ) {
				data = data.result;
			}
			var result = [];
			$.each(data, function(index, value) {
				//console.log(value);

				if ( active_edexcoinmodecode == 'Full'
					|| ( active_edexcoinmodecode == 'Basilisk' && coin == 'BTC')
					|| ( active_edexcoinmodecode == 'Basilisk' && coin == 'BTCD' )
					|| ( active_edexcoinmodecode == 'Basilisk' && coin == 'LTC' )
					|| ( active_edexcoinmodecode == 'Basilisk' && coin == 'DOGE' )
					|| ( active_edexcoinmodecode == 'Basilisk' && coin == 'DGB' )
					|| ( active_edexcoinmodecode == 'Basilisk' && coin == 'SYS' )
					|| ( active_edexcoinmodecode == 'Basilisk' && coin == 'MZC' )
					|| ( active_edexcoinmodecode == 'Basilisk' && coin == 'UNO' )
					|| ( active_edexcoinmodecode == 'Basilisk' && coin == 'ZET' )
					|| ( active_edexcoinmodecode == 'Basilisk' && coin == 'BTM' )
					|| ( active_edexcoinmodecode == 'Basilisk' && coin == 'CARB' )
					|| ( active_edexcoinmodecode == 'Basilisk' && coin == 'ANC' )
					|| ( active_edexcoinmodecode == 'Basilisk' && coin == 'FRK' ) ) {
					var tmp_category = '';
					var tmp_amount = data[index].amount;
					if(!("amount" in data[index])) {
						tmp_amount = '<span class="label label-dark">Unknown</span>'
					}
					var tmp_addr = data[index].address;
					if(!("address" in data[index])) {
						tmp_addr = '<i class="icon fa-bullseye"></i> <span class="label label-dark">Z Address not listed by wallet!</span>'
					}

					//tmp_secondsToString = '<i class="icon fa-meh-o"></i> Unknown'
					//if(("blocktime" in data[index])) {
						//console.log('blocktime FOUND');
						//var tmp_secondsToString = secondsToString(data[index].blocktime)
					//}

					var tmp_secondsToString = secondsToString(data[index].blocktime)

					if (isNaN(tmp_secondsToString)) {
						//tmp_secondsToString = 'Unknown';
					}
					if ( data[index].category == 'send' ) {
						tmp_category = '<i class="icon fa-arrow-circle-left"></i> OUT';
					}
					if ( data[index].category == 'receive' ) {
						tmp_category = '<i class="icon fa-arrow-circle-right"></i> IN';
					}
					if ( data[index].category == 'generate' ) {
						tmp_category = '<i class="icon fa-cogs"></i> Mined';
					}if ( data[index].category == 'immature' ) {
						tmp_category = '<i class="icon fa-clock-o"></i> Immature';
					}
					if ( data[index].category == 'unknown' ) {
						tmp_category = '<i class="icon fa-meh-o"></i> Unknown';
					}
					//console.log(tmp_addr);
					//tmplisttransactions = {"category": data[index].category,"confirmations": data[index].confirmations,"amount": data[index].amount,"time": data[index].time,"address": data[index].address,"txid": data[index].txid}
					tmplisttransactions = [tmp_category,data[index].confirmations,tmp_amount,tmp_secondsToString,tmp_addr,'<button  type="button" class="btn btn-xs white btn-info waves-effect waves-light kmd-txid-details-btn" data-edexcoin="' + coin + '" data-txidtype="public" data-txid="'+data[index].txid+'"><i class="icon fa-search"></i></button>']
					//console.log(tmplisttransactions);
					result.push(tmplisttransactions);
				}

				if ( active_edexcoinmodecode == 'Basilisk'
					&& coin !== 'BTC'
					&& coin !== 'BTCD'
					&& coin !== 'LTC'
					&& coin !== 'DOGE'
					&& coin !== 'DGB'
					&& coin !== 'SYS'
					&& coin !== 'MZC'
					&& coin !== 'UNO'
					&& coin !== 'ZET'
					&& coin !== 'BTM'
					&& coin !== 'CARB'
					&& coin !== 'ANC'
					&& coin !== 'FRK' ) {
					var tmp_category = '';
					var tmp_amount = data[index].amount;
					if(!("amount" in data[index])) {
						tmp_amount = '<span class="label label-dark">Unknown</span>'
					}
					var tmp_addr = null
					if(!("paid" in data[index])) {
						tmp_addr = '<i class="icon fa-bullseye"></i> <span class="label label-dark">Z Address not listed by wallet!</span>'
					}
					if(("paid" in data[index])) {
						var first_addr = Object.keys(data[index].paid['vouts'][0]);
						var tmp_addr = first_addr[0];
						//console.log(data[index].paid['vouts'][0])

					}

					//tmp_secondsToString = '<i class="icon fa-meh-o"></i> Unknown'
					//if(("blocktime" in data[index])) {
						//console.log('blocktime FOUND');
						//var tmp_secondsToString = secondsToString(data[index].blocktime)
					//}

					var tmp_secondsToString = secondsToString(data[index].timestamp)

					if (isNaN(tmp_secondsToString)) {
						//tmp_secondsToString = 'Unknown';
					}

					console.log(data[index].type)
					if ( data[index].type == 'sent' ) {
						tmp_category = '<i class="icon fa-arrow-circle-left"></i> OUT';
					}
					if ( data[index].type == 'received' ) {
						tmp_category = '<i class="icon fa-arrow-circle-right"></i> IN';
					}
					if ( data[index].type == 'generate' ) {
						tmp_category = '<i class="icon fa-cogs"></i> Mined';
					}if ( data[index].type == 'immature' ) {
						tmp_category = '<i class="icon fa-clock-o"></i> Immature';
					}
					if ( data[index].type == 'unknown' ) {
						tmp_category = '<i class="icon fa-meh-o"></i> Unknown';
					}


					if(!("confirmations" in data[index])) {
						tmp_confirms = '<i class="icon fa-meh-o"></i> Unknown';
					}
					if(("confirmations" in data[index])) {
						tmp_confirms = data[index].confirmations
					}

					//console.log(tmp_addr);
					//tmplisttransactions = {"category": data[index].category,"confirmations": data[index].confirmations,"amount": data[index].amount,"time": data[index].time,"address": data[index].address,"txid": data[index].txid}
					tmplisttransactions = [tmp_category,tmp_confirms,tmp_amount,tmp_secondsToString,tmp_addr,'<button  type="button" class="btn btn-xs white btn-info waves-effect waves-light kmd-txid-details-btn" data-edexcoin="' + coin + '" data-txidtype="public" data-txid="'+data[index].txid+'"><i class="icon fa-search"></i></button>']
					//console.log(tmplisttransactions);
					result.push(tmplisttransactions);
				}

			});
			//console.log(result)
			resolve(result);
		}).fail(function(xhr, textStatus, error) {
				// handle request failures
				console.log(xhr.statusText);
				if ( xhr.readyState == 0 ) {
						Iguana_ServiceUnavailable();
				}
				console.log(textStatus);
				console.log(error);
		});
	});
}*/

function clearEdexSendFieldData() {
	//$('.showedexcoinaddrs').selectpicker('refresh');
	//$('#edexcoin_sendto').val('');
	//$('#edexcoin_total_value').text('');
	//$('#edexcoin_amount').val('');
}

function EdexListAllAddr(coin) {
	NProgress.done(true);
	NProgress.configure({
			template: '<div class="bar nprogress-bar-header nprogress-bar-info" role="bar"></div>' +
								'<div class="spinner" role="spinner">' +
									'<div class="spinner-icon"></div>' +
								'</div>'
	});
	NProgress.start();

	active_edexcoinmodecode = sessionStorage.getItem('edexTmpMode');

	if (active_edexcoinmodecode == 'Basilisk' && coin !== 'BTC' && coin !== 'SYS') {
		EDEXgetaddrbyaccount_cache(coin).then(function(result) {
			console.log(result);
			var only_reciving_addr_data = [];

			$.each(result, function(index, value) {
				if (value.interest == undefined || coin !== 'KMD') {
					console.log('interest is undefined');
					tmp_interest = 'NA';
				} else {
					tmp_interest = value.interest;
				}
				only_reciving_addr_data.push([
					value.label,
					value.addr,
					value.total,
					tmp_interest
				]);
			});
			console.log(only_reciving_addr_data);

			var edexcoin_recieve_table = '';

			edexcoin_recieve_table = $('#edexcoin-recieve-addr-tbl').DataTable({
				data: only_reciving_addr_data,
				select: false,
				retrieve: true
			});

			edexcoin_recieve_table.destroy();

			edexcoin_recieve_table = $('#edexcoin-recieve-addr-tbl').DataTable({
				data: only_reciving_addr_data,
				select: false,
				retrieve: true
			});

			NProgress.done();
		});
	} else if (active_edexcoinmodecode == 'Basilisk' ) {
		EDEXgetaddrbyaccount(coin).then(function(result){
			console.log(result);
			var only_reciving_addr_data = [];

			$.each(result, function(index, value) {
				if (value.interest == undefined || coin !== 'KMD') {
					console.log('interest is undefined');
					tmp_interest = 'NA';
				} else {
					tmp_interest = value.interest;
				}
				only_reciving_addr_data.push([
					value.label,
					value.addr,
					value.total,
					tmp_interest
				]);
			});
			console.log(only_reciving_addr_data);

			var edexcoin_recieve_table = '';

			edexcoin_recieve_table = $('#edexcoin-recieve-addr-tbl').DataTable({
				data: only_reciving_addr_data,
				select: false,
				retrieve: true
			});

			edexcoin_recieve_table.destroy();

			edexcoin_recieve_table = $('#edexcoin-recieve-addr-tbl').DataTable({
				data: only_reciving_addr_data,
				select: false,
				retrieve: true
			});

			NProgress.done();
		});
	}

	if (active_edexcoinmodecode == 'Full') {
		EDEXgetaddrbyaccount(coin).then(function(result) {
			console.log(result);
			var only_reciving_addr_data = [];

			$.each(result, function(index, value) {
				if (value.interest == undefined || coin !== 'KMD') {
					console.log('interest is undefined');
					tmp_interest = 'NA';
				} else {
					tmp_interest = value.interest;
				}
				only_reciving_addr_data.push([
					value.label,
					value.addr,
					value.total,
					tmp_interest
				]);
			});
			console.log(only_reciving_addr_data);

			var edexcoin_recieve_table = '';

			edexcoin_recieve_table = $('#edexcoin-recieve-addr-tbl').DataTable({
				data: only_reciving_addr_data,
				select: false,
				retrieve: true
			});

			edexcoin_recieve_table.destroy();

			edexcoin_recieve_table = $('#edexcoin-recieve-addr-tbl').DataTable({
				data: only_reciving_addr_data,
				select: false,
				retrieve: true
			});

			NProgress.done();
		});
	}
}

function edexCoinBtnAction() {
	$('.edexcoin-logo').click(function() {
		$( '#edexcoin_send_coins_back_btn' ).trigger( 'click' );
		$('#btn_edexcoin_dashboard').hide();
		$('#btn_edexcoin_send').show();
		$('#btn_edexcoin_recieve').show();

		var selected_coin = $(this).data('edexcoincode'),
				selected_coinmode = $(this).data('edexcoinmodecode'),
				selected_coinname = $(this).data('edexcoinname');

		$('#edexcoin_getbalance_interest').hide();
		$('#edexcoin_getbalance_total_interest').hide();
		$('#edexcoin_getbalance_t').removeClass( 'col-lg-4' ).addClass( 'col-lg-12' );
		$('#edex_interest_balance').text('-');
		$('#edex_total_balance_interest').text('-');
		$('#edex_total_balance').text('-');
		$('#edex_total_balance_coincode').text(selected_coin);

		sessionStorage.setItem('edexTmpMode', selected_coinmode);
		resizeDashboardWindow();

		if ( selected_coinmode == 'Basilisk' ) {
			$('#edex-footer').hide();
			$('#btn_edexcoin_basilisk').show();
			$('#edexcoin-wallet-waitingrt-alert').hide();
			sessionStorage.setItem('edexTmpRefresh', 'start');
		}
		if ( selected_coinmode == 'Full' ) {
			$('#edex-footer').show();
			$('#btn_edexcoin_basilisk').hide();
			sessionStorage.setItem('edexTmpRefresh', 'start');
		}
		if ( selected_coinmode !== 'Native' ) {
			$('#edexcoin_dashoard_section').show();
			$('#header-dashboard').show();
			$('#wallet-widgets').show();
			$('#edexcoin_dashboardinfo').show();
			$('#no_wallet_selected').hide();
			$('#edexcoin_send').hide();
			$('#edexcoin_recieve_section').hide();
			$('#edexcoin_settings').hide();
			$('#currency-progressbars').show();

			// get selected coin's code and populate in easydex wallet widget's html elements
			var coincode = $(this).data('edexcoincode');
			$.each($('[data-edexcoin]'), function(index, value) {
				$('[data-edexcoin]').attr('data-edexcoin', coincode);
				$('[data-edexcoin="' + coincode + '"]');
			});
			$.each($('[data-edexcoinmenu]'), function(index, value) {
				$('[data-edexcoinmenu]').attr('data-edexcoinmenu', coincode);
				$('[data-edexcoinmenu="' + coincode + '"]');
			});

			$('#edexcoin-active').text(selected_coinname);
			$('#edex_total_balance_coincode').text(coincode);
			// populate selected coin's address
			EDEXMainAddr(selected_coin).then(function(result) {
				$('#edexcoin_active_addr').text(result);
				$('#edexcoin_active_addr_clipboard').attr('data-clipboard-text', result);
			})

			$('#edexcoin_active_addr_clipboard').click(function() {
				alertify.success('Address Copied.');
			});

			var clipboard = new Clipboard('.clipboard-edexaddr');
			clipboard.destroy();

			var clipboard = null;
			if ( clipboard != null ) {
				clipboard.destroy();
			}

			var clipboard = new Clipboard('.clipboard-edexaddr');
			clipboard.on('success', function(e) {
				console.info('Action: ', e.action);
				console.info('Text: ', e.text);
				console.info('Trigger: ', e.trigger);

				e.clearSelection();
			});

			clipboard.on('error', function(e) {
				console.error('Action: ', e.action);
				console.error('Trigger: ', e.trigger);
			});

			// populate selected coin's balance
			if ( selected_coinmode == 'Basilisk' &&
					 selected_coin !== 'BTC' &&
					 selected_coin !== 'BTCD' &&
					 selected_coin !== 'LTC' &&
					 selected_coin !== 'DOGE' &&
					 selected_coin !== 'DGB' &&
					 selected_coin !== 'SYS' &&
					 selected_coin !== 'MZC' &&
					 selected_coin !== 'UNO' &&
					 selected_coin !== 'ZET' &&
					 selected_coin !== 'BTM' &&
					 selected_coin !== 'CARB' &&
					 selected_coin !== 'ANC' &&
					 selected_coin !== 'FRK') {
				getDEXGetBalance_cache(selected_coin).then(function(result) {
					if ( result.interest !== undefined && selected_coin == 'KMD') {
						$('#edexcoin_getbalance_interest').show();
						$('#edexcoin_getbalance_total_interest').show();
						$('#edexcoin_getbalance_t').removeClass( 'col-lg-12' ).addClass( 'col-lg-4' );
						$('#edex_interest_balance').text(result.interest);
						$('#edex_total_balance_interest').text(result.totalbalance);
						$('#edex_total_interest_coincode').text(selected_coin);
						$('#edex_total_balance_interest_coincode').text(selected_coin);
					}

					if ( result.interest === undefined || selected_coin !== 'KMD') {
						$('#edexcoin_getbalance_interest').hide();
						$('#edexcoin_getbalance_total_interest').hide();
						$('#edexcoin_getbalance_t').removeClass( 'col-lg-4' ).addClass( 'col-lg-12' );
						$('#edex_interest_balance').text('-');
						$('#edex_total_balance_interest').text('-');
					}

					$('#edex_total_balance').text(result.total);
					$('#edex_total_balance_coincode').text(selected_coin);
				});
			} else if (selected_coinmode == 'Basilisk') {
				getDEXGetBalance2(selected_coin).then(function(result) {
					if ( result.interest !== undefined ) {
						$('#edexcoin_getbalance_interest').show();
						$('#edexcoin_getbalance_total_interest').show();
						$('#edexcoin_getbalance_t').removeClass( 'col-lg-12' ).addClass( 'col-lg-4' );
						$('#edex_interest_balance').text(result.interest);
						$('#edex_total_balance_interest').text(result.totalbalance);
						$('#edex_total_interest_coincode').text(selected_coin);
						$('#edex_total_balance_interest_coincode').text(selected_coin);
					}

					if ( result.interest === undefined || selected_coin !== 'KMD') {
						$('#edexcoin_getbalance_interest').hide();
						$('#edexcoin_getbalance_total_interest').hide();
						$('#edexcoin_getbalance_t').removeClass( 'col-lg-4' ).addClass( 'col-lg-12' );
						$('#edex_interest_balance').text('-');
						$('#edex_total_balance_interest').text('-');
					}

					$('#edex_total_balance').text(result.total);
					$('#edex_total_balance_coincode').text(selected_coin);
				});
			} else {
				EDEXlistunspent(selected_coin).then(function(result) {
					if (result[0] != undefined) {
						if ( result[0].interest !== undefined ) {
							$('#edexcoin_getbalance_interest').show();
							$('#edexcoin_getbalance_total_interest').show();
							$('#edexcoin_getbalance_t').removeClass( 'col-lg-12' ).addClass( 'col-lg-4' );
							$('#edex_interest_balance').text(result[0].interest);
							$('#edex_total_balance_interest').text(result[0].totalbalance);
							$('#edex_total_interest_coincode').text(selected_coin);
							$('#edex_total_balance_interest_coincode').text(selected_coin);
						}

						if ( result[0].interest === undefined ) {
							$('#edexcoin_getbalance_interest').hide();
							$('#edexcoin_getbalance_total_interest').hide();
							$('#edexcoin_getbalance_t').removeClass( 'col-lg-4' ).addClass( 'col-lg-12' );
							$('#edex_interest_balance').text('-');
							$('#edex_total_balance_interest').text('-');
						}

						$('#edex_total_balance').text(result[0].total);
						$('#edex_total_balance_coincode').text(selected_coin);
					} else {
						$('#edex_total_balance').text('0');
					}
				});
			}

			EdexfillTxHistory(coincode);
		} else {
			$('#currency-progressbars').hide();
			if ( selected_coin == 'KMD' ) {
				sessionStorage.setItem('edexTmpMode', selected_coinmode);
				sessionStorage.setItem('edexTmpRefresh', 'start');
				$( '#nav-komodo-wallet' ).trigger( 'click' );
			}
			if ( selected_coin == 'ZEC' ) {
				sessionStorage.setItem('edexTmpMode', selected_coinmode);
				sessionStorage.setItem('edexTmpRefresh', 'start');
				$( '#nav-zcash-wallet' ).trigger( 'click' );
			}
			if ( selected_coin == 'SUPERNET'
				|| selected_coin == 'REVS'
				|| selected_coin == 'WIRELESS'
				|| selected_coin == 'USD' ) {
				sessionStorage.setItem('edexTmpMode', selected_coinmode);
				sessionStorage.setItem('edexTmpRefresh', 'start');
				assetchain_pax_menu_actions(selected_coin)
			}
		}
	});
}