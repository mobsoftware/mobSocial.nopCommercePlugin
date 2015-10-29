"use strict";

function isValidCreditCard(value) {
	// accept only digits, dashes or spaces
	if (/[^0-9-\s]+/.test(value)) return false;

	// The Luhn Algorithm.
	var nCheck = 0, nDigit = 0, bEven = false;
	value = value.replace(/\D/g, "");

	for (var n = value.length - 1; n >= 0; n--) {
		var cDigit = value.charAt(n),
			  nDigit = parseInt(cDigit, 10);

		if (bEven) {
			if ((nDigit *= 2) > 9) nDigit -= 9;
		}

		nCheck += nDigit;
		bEven = !bEven;
	}

	return (nCheck % 10) == 0;
}

function getCardType(number) {
	if (!number)
		return "";
	// visa
	var re = new RegExp("^4");
	if (number.match(re) != null)
		return "visa";

	// Mastercard
	re = new RegExp("^5[1-5]");
	if (number.match(re) != null)
		return "mastercard";

	// AMEX
	re = new RegExp("^3[47]");
	if (number.match(re) != null)
		return "amex";

	// Discover
	re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
	if (number.match(re) != null)
		return "discover";

	// Diners
	re = new RegExp("^36");
	if (number.match(re) != null)
		return "diners";

	/*
	// Diners - Carte Blanche
	re = new RegExp("^30[0-5]");
	if (number.match(re) != null)
		return "Diners - Carte Blanche";

	// JCB
	re = new RegExp("^35(2[89]|[3-8][0-9])");
	if (number.match(re) != null)
		return "JCB";

	// Visa Electron
	re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
	if (number.match(re) != null)
		return "Visa Electron";
		*/
	return "";
}