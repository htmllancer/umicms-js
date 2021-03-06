﻿"use strict";
var UMIT = (function(m){
	//format number 
	var formatNumber = function(_number, _cfg) {	
		var _cfg_default = {
			before: '',
			after: '',
			decimals: 0,
			dec_point: '.',
			thousands_sep: ' '
		};
		if (_cfg && typeof _cfg === 'object'){
			_cfg = obj_merge(_cfg_default, _cfg);
		} else {
			_cfg = _cfg_default;
		}	
	
		function obj_merge(obj_first, obj_second){
			var obj_return = {};
			for (key in obj_first){
				if (typeof obj_second[key] !== 'undefined') obj_return[key] = obj_second[key];
				else obj_return[key] = obj_first[key];
			}
			return obj_return;
		}
		function thousands_sep(_num, _sep){
			if (_num.length <= 3) return _num;
			var _count = _num.length;
			var _num_parser = '';
			var _count_digits = 0;
			for (var _p = (_count - 1); _p >= 0; _p--){
				var _num_digit = _num.substr(_p, 1);
				if (_count_digits % 3 == 0 && _count_digits != 0 && !isNaN(parseFloat(_num_digit))) _num_parser = _sep + _num_parser;
				_num_parser = _num_digit + _num_parser;
				_count_digits++;
			}
			return _num_parser;
		}
		
		if (typeof _number !== 'number'){
			_number = parseFloat(_number);
			if (isNaN(_number)) return false;
		}

		_number = _number.toFixed(_cfg.decimals);
		
		if(_number.indexOf('.') != -1){
			var _number_arr = _number.split('.');
			var _number = thousands_sep(_number_arr[0], _cfg.thousands_sep) + _cfg.dec_point + _number_arr[1];
		}
		else var _number = thousands_sep(_number, _cfg.thousands_sep);
		return _cfg.before + _number + _cfg.after;	
	};

	m.formatNumber = formatNumber;


return m;
}(UMIT || {}))