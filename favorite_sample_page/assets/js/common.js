'use strict';

var interval = '';

var replaceAll = function ( str, searchStr, replaceStr ) {
  return str.split( searchStr ).join( replaceStr );
}

var setAttributes = function ( el, attrs ) {
  for ( var key in attrs ) {
    el.setAttribute( key, attrs[ key ] );
  }
}

var itemListView = function ( item ) {
	var getTable = document.getElementById( 'itemTable' );

	for ( var i in item ) {
		var tableRow = document.createElement( 'div' );
		setAttributes( tableRow, { 'class': 'apm_content-item-table-row', 'data-index': i } );
		getTable.appendChild( tableRow );

		for ( var cnt=0 ; cnt < Object.keys( item[ i ] ).length ; cnt++ ) {
			var tableCell      = document.createElement( 'div' );
			var tableCellImg   = document.createElement( 'img' );
			var tableCellSpan  = document.createElement( 'span' );
			var tableCellA     = document.createElement( 'a' );
			var tableCellBtn   = document.createElement( 'button' );

			setAttributes( tableCell, { 'class': 'apm_content-item-table-cell vertical-middle' } );
			tableRow.appendChild( tableCell );

			if ( Object.keys(item[ i ])[ cnt ] === 'src' ) {
				setAttributes( tableCellImg, { 'src': item[ i ].src, 'alt': '상품이미지' } );
				tableCell.appendChild( tableCellImg );
			} 
			else if ( Object.keys(item[ i ])[ cnt ] === 'vendor' ) {
				tableCellSpan.appendChild( document.createTextNode( item[ i ].vendor.title ) );
				tableCell.appendChild( tableCellSpan );
				    switch ( item[ i ].vendor.cat ) {
				      case '미송' :
				      	tableCellSpan.classList.add( 'reservation' );
				        break;
				      case 'SET' :
				      	tableCellSpan.classList.add( 'set' );
				        break;
				      case 'NEW' :
				      	tableCellSpan.classList.add( 'new' );
				        break;				        
				    }
			}
			else if ( Object.keys(item[ i ])[ cnt ] === 'colorSet' ) {
				for ( var j in item ) {
					var tableCellLabel = document.createElement( 'Label' );
					if ( String(item[ i ].colorSet[ j ]) !== 'undefined' ) {
						tableCellLabel.appendChild( document.createTextNode( item[ i ].colorSet[ j ] ) );
						setAttributes( tableCellLabel, { 'class': String( item[ i ].colorSet[ j ] ) } );
						tableCell.appendChild( tableCellLabel );
					}
				}
			}
			else if ( Object.keys(item[ i ])[ cnt ] === 'product' ) {
				tableCellSpan.appendChild( document.createTextNode( item[ i ].product ) );
				setAttributes( tableCellA, { 'href': '#', 'class': 'question-btn' } );
				tableCellA.appendChild( document.createTextNode( '상품 문의하기' ) );
				tableCell.appendChild( tableCellSpan );
				tableCell.appendChild( tableCellA );
			}
			else if ( Object.keys(item[ i ])[ cnt ] === 'price' ) {
				tableCell.appendChild( document.createTextNode( item[ i ].price ) );
				setAttributes( tableCellA, { 'href': '#', 'class': 'close', 'data-close-index': i } );
				tableCell.appendChild( tableCellA );
			}
		}
	}
}

var itemGet = function () {
	var itemArr = [
		{
			src: './assets/images/item__01__img.jpg',
			vendor: {
				title: 'DSQUARED 2',
				cat: '미송',
			},
			colorSet: ['skin','grey','skyblue'],
			product: 'B boyfit Denim PT+',
			price: '120,000 KRW',

		},
		{
			src: './assets/images/item__02__img.jpg',
			vendor: {
				title: 'DSQUARED 2',
				cat: '',
			},
			colorSet: ['skin','grey','skyblue'],
			product: 'B boyfit Denim PT+',
			price: '120,000 KRW',
		},
		{
			src: './assets/images/item__03__img.jpg',
			vendor: {
				title: 'DSQUARED 2',
				cat: 'SET',
			},
			colorSet: ['skin','grey','skyblue'],
			product: 'B boyfit Denim PT+',
			price: '120,000 KRW',
		},
		{
			src: './assets/images/item__04__img.jpg',
			vendor: {
				title: 'DSQUARED 2',
				cat: '',
			},
			colorSet: ['skin','grey','skyblue'],
			product: 'B boyfit Denim PT+',
			price: '120,000 KRW',
		},
		{
			src: './assets/images/item__05__img.jpg',
			vendor: {
				title: 'DSQUARED 2',
				cat: 'NEW',
			},
			colorSet: ['skin','grey','skyblue'],
			product: 'B boyfit Denim PT+',
			price: '120,000 KRW',
		},						
	];

	if ( itemArr !== undefined || itemArr !== '' || itemArr !== null ) {
		itemListView( itemArr );
	}
}
itemGet();


var scrollTopFn = function ( top ) {
	var headerHeight = $( '.apm_header' ).height();

	if ( headerHeight < top ) {
		$( '.scroll-wrap' ).css( { visibility: 'visible' } ).stop().animate( { opacity: 1 }, 100 );
		$( '.live-chat-wrap' ).css( { visibility: 'visible' } ).stop().animate( { opacity: 1 }, 100 );
	} else {
		$( '.scroll-wrap' ).css( { visibility: 'hidden' } ).stop().animate( { opacity: 0 }, 100 );
		$( '.live-chat-wrap' ).css( { visibility: 'hidden' } ).stop().animate( { opacity: 0 }, 100 );
	}
}

var scrollStep = function () {
	if ( window.pageXOffset !== undefined ) { // All browsers, except IE9 and earlier
	    if ( window.pageYOffset === 0 ) {
	        clearInterval( interval );
	    } else {
	      window.scroll( 0, window.pageYOffset - 40 );
	    }
	} else { // IE9 and earlier
	    if ( window.pageYOffset === 0 ) {
	        clearInterval( interval );
	    } else {
	      window.scroll( 0, document.documentElement.scrollTop - 40 );
	    }	  
	}	
}

var scrollToTop = function () {
	var intervalId = setInterval( scrollStep, 10 );
	interval       = intervalId;
}

$( document ).ready( function () {
	'use strict';

	$( window ).scroll( function() {
		var scrollTop = $( window ).scrollTop();
		scrollTopFn( scrollTop );
	});

	$( '.scroll-btn' ).bind({
		click: function ( e ) {
			scrollToTop ();
		},
	});	

	$( '#languageSelectBox' ).msDropDown().data( 'dd' ).set( 'selectedIndex', 0 );
	$('.apm_header-gnb-left-menu>li:first-child').bind({
		mouseenter: function ( e ) {
			//var isHovered = $('#elem').find(':hover');
			
			$( this ).addClass( 'on' );
			$( '.apm_header-gnb-sub-menu' ).removeClass( 'hide' );
			$( '.bg-hide' ).css({
				'display': 'block',
			});
		},
		mouseleave: function ( e ) {
			$( this ).removeClass( 'on' );
			$( '.apm_header-gnb-sub-menu' ).addClass( 'hide' );
			$( '.bg-hide' ).css({
				'display': 'none',
			});
		},
	});

	$( '.apm_header-gnb-sub-category ul li' ).bind({
		mouseenter: function ( e ) {
			$( this ).addClass( 'on' );
			$( this ).children().children().removeClass( 'hide' );
		},
		mouseleave: function ( e ) {
			$( this ).removeClass( 'on' );
			$( this ).children().children().addClass( 'hide' );
		},
	});	

	$( '.close' ).bind( 'click', function ( event ) {
		event.preventDefault();
		// if ( Number($(this).parents('div')[1].dataset.index) === Number($(this)[0].dataset.closeIndex) ) {
		if ( Number($( this ).parents( 'div' )[ 1 ].getAttribute( 'data-index' ) ) === Number( $( this )[ 0 ].getAttribute( 'data-close-index' ) ) ) {
			var delConfirm = confirm( '상품을 삭제하시겠습니까?' );
			if ( delConfirm === true ) {
				$( this ).parents( 'div' ).eq( 1 ).remove();
			}
			else { return false; }
		}
	});	
});