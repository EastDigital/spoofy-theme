import { $4, $$4, $id4, formatMoney } from "@theme/utilities";
var newCurrency = null,
  round_currency = themeHDN.settings.currencyRound,
  cartCurrency = Shopify.currency.active,
  shopCurrency = themeHDN.settings.shopCurency,
  t_moneyFormat = themeHDN.settings.currencyFormat,
  selector= ".hdt-popover-currencies",
  dt_cur_shop = 'currency' + cartCurrency.charAt(0) + cartCurrency.slice(1).toLowerCase(),
  dt_base = 'baseCurrency',
  rate = parseFloat(Shopify.currency.rate);
var CurrencyConfigs = {
  currentCurrency: localStorage.getItem('hdt_currency_iso') || null,
  format: themeHDN.settings.currencyCodeEnabled ? 'money_with_currency_format' : 'money_format',
  //cartCurrency: Shopify.currency.active,
  location: null
};
var arrayCurrency = {
    AF: "AFN",
    AX: "EUR",
    AL: "ALL",
    DZ: "DZD",
    AS: "USD",
    AD: "EUR",
    AO: "AOA",
    AI: "XCD",
    AQ: "XCD",
    AG: "XCD",
    AR: "ARS",
    AM: "AMD",
    AW: "AWG",
    AU: "AUD",
    AT: "EUR",
    AZ: "AZN",
    BS: "BSD",
    BH: "BHD",
    BD: "BDT",
    BB: "BBD",
    BY: "BYN",
    T4: "EUR",
    BZ: "BZD",
    BJ: "XOF",
    BM: "BMD",
    BT: "BTN",
    BO: "BOB",
    BA: "BAM",
    BW: "BWP",
    BV: "NOK",
    BR: "BRL",
    IO: "USD",
    BN: "BND",
    BG: "BGN",
    BF: "XOF",
    BI: "BIF",
    KH: "KHR",
    CM: "XAF",
    CA: "CAD",
    CV: "CVE",
    KY: "KYD",
    CF: "XAF",
    TD: "XAF",
    CL: "CLP",
    CN: "CNY",
    CX: "AUD",
    CC: "AUD",
    CO: "COP",
    KM: "KMF",
    CG: "XAF",
    CD: "CDF",
    CK: "NZD",
    CR: "CRC",
    CI: "XOF",
    HR: "HRK",
    CU: "CUP",
    CY: "EUR",
    CZ: "CZK",
    DK: "DKK",
    DJ: "DJF",
    DM: "XCD",
    DO: "DOP",
    EC: "USD",
    EG: "EGP",
    SV: "USD",
    GQ: "XAF",
    ER: "ERN",
    EE: "EUR",
    ET: "ETB",
    FK: "FKP",
    FO: "DKK",
    FJ: "FJD",
    FI: "EUR",
    FR: "EUR",
    GF: "EUR",
    PF: "XPF",
    TF: "EUR",
    GA: "XAF",
    GM: "GMD",
    GE: "GEL",
    DE: "EUR",
    GH: "GHS",
    GI: "GIP",
    GR: "EUR",
    GL: "DKK",
    GD: "XCD",
    GP: "EUR",
    GU: "USD",
    GT: "GTQ",
    GG: "GBP",
    GN: "GNF",
    GW: "XOF",
    GY: "GYD",
    HT: "HTG",
    HM: "AUD",
    VA: "EUR",
    HN: "HNL",
    HK: "HKD",
    HU: "HUF",
    IS: "ISK",
    IN: "INR",
    ID: "IDR",
    IR: "IRR",
    IQ: "IQD",
    IE: "EUR",
    IM: "GBP",
    IL: "ILS",
    IT: "EUR",
    JM: "JMD",
    JP: "JPY",
    JE: "GBP",
    JO: "JOD",
    KZ: "KZT",
    KE: "KES",
    KI: "AUD",
    KR: "KRW",
    KW: "KWD",
    KG: "KGS",
    LA: "LAK",
    LV: "EUR",
    LB: "LBP",
    LS: "LSL",
    LR: "LRD",
    LY: "LYD",
    LI: "CHF",
    LT: "EUR",
    LU: "EUR",
    MO: "MOP",
    MK: "MKD",
    MG: "MGA",
    MW: "MWK",
    MY: "MYR",
    MV: "MVR",
    ML: "XOF",
    MT: "EUR",
    MH: "USD",
    MQ: "EUR",
    MR: "MRU",
    MU: "MUR",
    YT: "EUR",
    MX: "MXN",
    FM: "USD",
    MD: "MDL",
    MC: "EUR",
    MN: "MNT",
    ME: "EUR",
    MS: "XCD",
    MA: "MAD",
    MZ: "MZN",
    MM: "MMK",
    NA: "NAD",
    NR: "AUD",
    NP: "NPR",
    NL: "EUR",
    AN: "",
    NC: "XPF",
    NZ: "NZD",
    NI: "NIO",
    NE: "XOF",
    NG: "NGN",
    NU: "NZD",
    NF: "AUD",
    MP: "USD",
    NO: "NOK",
    OM: "OMR",
    PK: "PKR",
    PW: "USD",
    PS: "ILS",
    PA: "PAB",
    PG: "PGK",
    PY: "PYG",
    PE: "PEN",
    PH: "PHP",
    PN: "NZD",
    PL: "PLN",
    PT: "EUR",
    PR: "USD",
    QA: "QAR",
    RE: "EUR",
    RO: "RON",
    RU: "RUB",
    RW: "RWF",
    BL: "EUR",
    SH: "SHP",
    KN: "XCD",
    LC: "XCD",
    MF: "EUR",
    PM: "EUR",
    VC: "XCD",
    WS: "WST",
    SM: "EUR",
    ST: "STN",
    SA: "SAR",
    SN: "XOF",
    RS: "RSD",
    SC: "SCR",
    SL: "SLL",
    SG: "SGD",
    SK: "EUR",
    SI: "EUR",
    SB: "SBD",
    SO: "SOS",
    ZA: "ZAR",
    GS: "GBP",
    ES: "EUR",
    LK: "LKR",
    SD: "SDG",
    SR: "SRD",
    SJ: "NOK",
    SZ: "SZL",
    SE: "SEK",
    CH: "CHF",
    SY: "SYP",
    TW: "TWD",
    TJ: "TJS",
    TZ: "TZS",
    TH: "THB",
    TL: "USD",
    TG: "XOF",
    TK: "NZD",
    TO: "TOP",
    TT: "TTD",
    TN: "TND",
    TR: "TRY",
    TM: "TMT",
    TC: "USD",
    TV: "AUD",
    UG: "UGX",
    UA: "UAH",
    AE: "AED",
    GB: "GBP",
    US: "USD",
    UM: "USD",
    UY: "UYU",
    UZ: "UZS",
    VU: "VUV",
    VE: "VEF",
    VN: "VND",
    VG: "USD",
    VI: "USD",
    WF: "XPF",
    EH: "MAD",
    YE: "YER",
    ZM: "ZMW",
    ZW: "ZWD"
};
var moneyFormats = {
  "USD": {
    "money_format": "${{amount}}",
    "money_with_currency_format": "${{amount}} USD"
  },
  "EUR": {
    "money_format": "&euro;{{amount}}",
    "money_with_currency_format": "&euro;{{amount}} EUR"
  },
  "GBP": {
    "money_format": "&pound;{{amount}}",
    "money_with_currency_format": "&pound;{{amount}} GBP"
  },
  "CAD": {
    "money_format": "${{amount}}",
    "money_with_currency_format": "${{amount}} CAD"
  },
  "ALL": {
    "money_format": "Lek {{amount}}",
    "money_with_currency_format": "Lek {{amount}} ALL"
  },
  "DZD": {
    "money_format": "DA {{amount}}",
    "money_with_currency_format": "DA {{amount}} DZD"
  },
  "AOA": {
    "money_format": "Kz{{amount}}",
    "money_with_currency_format": "Kz{{amount}} AOA"
  },
  "ARS": {
    "money_format": "${{amount_with_comma_separator}}",
    "money_with_currency_format": "${{amount_with_comma_separator}} ARS"
  },
  "AMD": {
    "money_format": "{{amount}} AMD",
    "money_with_currency_format": "{{amount}} AMD"
  },
  "AWG": {
    "money_format": "Afl{{amount}}",
    "money_with_currency_format": "Afl{{amount}} AWG"
  },
  "AUD": {
    "money_format": "${{amount}}",
    "money_with_currency_format": "${{amount}} AUD"
  },
  "BBD": {
    "money_format": "${{amount}}",
    "money_with_currency_format": "${{amount}} Bds"
  },
  "AZN": {
    "money_format": "m.{{amount}}",
    "money_with_currency_format": "m.{{amount}} AZN"
  },
  "BDT": {
    "money_format": "Tk {{amount}}",
    "money_with_currency_format": "Tk {{amount}} BDT"
  },
  "BSD": {
    "money_format": "BS${{amount}}",
    "money_with_currency_format": "BS${{amount}} BSD"
  },
  "BHD": {
    "money_format": "{{amount}} BD",
    "money_with_currency_format": "{{amount}} BHD"
  },
  "BYR": {
    "money_format": "Br {{amount}}",
    "money_with_currency_format": "Br {{amount}} BYR"
  },
  "BZD": {
    "money_format": "BZ${{amount}}",
    "money_with_currency_format": "BZ${{amount}} BZD"
  },
  "BTN": {
    "money_format": "Nu {{amount}}",
    "money_with_currency_format": "Nu {{amount}} BTN"
  },
  "BAM": {
    "money_format": "KM {{amount_with_comma_separator}}",
    "money_with_currency_format": "KM {{amount_with_comma_separator}} BAM"
  },
  "BRL": {
    "money_format": "R$ {{amount_with_comma_separator}}",
    "money_with_currency_format": "R$ {{amount_with_comma_separator}} BRL"
  },
  "BOB": {
    "money_format": "Bs{{amount_with_comma_separator}}",
    "money_with_currency_format": "Bs{{amount_with_comma_separator}} BOB"
  },
  "BWP": {
    "money_format": "P{{amount}}",
    "money_with_currency_format": "P{{amount}} BWP"
  },
  "BND": {
    "money_format": "${{amount}}",
    "money_with_currency_format": "${{amount}} BND"
  },
  "BGN": {
    "money_format": "{{amount}} Ð»Ð²",
    "money_with_currency_format": "{{amount}} Ð»Ð² BGN"
  },
  "MMK": {
    "money_format": "K{{amount}}",
    "money_with_currency_format": "K{{amount}} MMK"
  },
  "KHR": {
    "money_format": "KHR{{amount}}",
    "money_with_currency_format": "KHR{{amount}}"
  },
  "KYD": {
    "money_format": "${{amount}}",
    "money_with_currency_format": "${{amount}} KYD"
  },
  "XAF": {
    "money_format": "FCFA{{amount}}",
    "money_with_currency_format": "FCFA{{amount}} XAF"
  },
  "CLP": {
    "money_format": "${{amount_no_decimals}}",
    "money_with_currency_format": "${{amount_no_decimals}} CLP"
  },
  "CNY": {
    "money_format": "&#165;{{amount}}",
    "money_with_currency_format": "&#165;{{amount}} CNY"
  },
  "COP": {
    "money_format": "${{amount_with_comma_separator}}",
    "money_with_currency_format": "${{amount_with_comma_separator}} COP"
  },
  "CRC": {
    "money_format": "&#8353; {{amount_with_comma_separator}}",
    "money_with_currency_format": "&#8353; {{amount_with_comma_separator}} CRC"
  },
  "HRK": {
    "money_format": "{{amount_with_comma_separator}} kn",
    "money_with_currency_format": "{{amount_with_comma_separator}} kn HRK"
  },
  "CZK": {
    "money_format": "{{amount_with_comma_separator}} K&#269;",
    "money_with_currency_format": "{{amount_with_comma_separator}} K&#269;"
  },
  "DKK": {
    "money_format": "{{amount_with_comma_separator}}",
    "money_with_currency_format": "kr.{{amount_with_comma_separator}}"
  },
  "DOP": {
    "money_format": "RD$ {{amount}}",
    "money_with_currency_format": "RD$ {{amount}}"
  },
  "XCD": {
    "money_format": "${{amount}}",
    "money_with_currency_format": "EC${{amount}}"
  },
  "EGP": {
    "money_format": "LE {{amount}}",
    "money_with_currency_format": "LE {{amount}} EGP"
  },
  "ETB": {
    "money_format": "Br{{amount}}",
    "money_with_currency_format": "Br{{amount}} ETB"
  },
  "XPF": {
    "money_format": "{{amount_no_decimals_with_comma_separator}} XPF",
    "money_with_currency_format": "{{amount_no_decimals_with_comma_separator}} XPF"
  },
  "FJD": {
    "money_format": "${{amount}}",
    "money_with_currency_format": "FJ${{amount}}"
  },
  "GMD": {
    "money_format": "D {{amount}}",
    "money_with_currency_format": "D {{amount}} GMD"
  },
  "GHS": {
    "money_format": "GH&#8373;{{amount}}",
    "money_with_currency_format": "GH&#8373;{{amount}}"
  },
  "GTQ": {
    "money_format": "Q{{amount}}",
    "money_with_currency_format": "{{amount}} GTQ"
  },
  "GYD": {
    "money_format": "G${{amount}}",
    "money_with_currency_format": "${{amount}} GYD"
  },
  "GEL": {
    "money_format": "{{amount}} GEL",
    "money_with_currency_format": "{{amount}} GEL"
  },
  "HNL": {
    "money_format": "L {{amount}}",
    "money_with_currency_format": "L {{amount}} HNL"
  },
  "HKD": {
    "money_format": "${{amount}}",
    "money_with_currency_format": "HK${{amount}}"
  },
  "HUF": {
    "money_format": "{{amount_no_decimals_with_comma_separator}}",
    "money_with_currency_format": "{{amount_no_decimals_with_comma_separator}} Ft"
  },
  "ISK": {
    "money_format": "{{amount_no_decimals}} kr",
    "money_with_currency_format": "{{amount_no_decimals}} kr ISK"
  },
  "INR": {
    "money_format": "Rs. {{amount}}",
    "money_with_currency_format": "Rs. {{amount}}"
  },
  "IDR": {
    "money_format": "{{amount_with_comma_separator}}",
    "money_with_currency_format": "Rp {{amount_with_comma_separator}}"
  },
  "ILS": {
    "money_format": "{{amount}} NIS",
    "money_with_currency_format": "{{amount}} NIS"
  },
  "JMD": {
    "money_format": "${{amount}}",
    "money_with_currency_format": "${{amount}} JMD"
  },
  "JPY": {
    "money_format": "&#165;{{amount_no_decimals}}",
    "money_with_currency_format": "&#165;{{amount_no_decimals}} JPY"
  },
  "JEP": {
    "money_format": "&pound;{{amount}}",
    "money_with_currency_format": "&pound;{{amount}} JEP"
  },
  "JOD": {
    "money_format": "{{amount}} JD",
    "money_with_currency_format": "{{amount}} JOD"
  },
  "KZT": {
    "money_format": "{{amount}} KZT",
    "money_with_currency_format": "{{amount}} KZT"
  },
  "KES": {
    "money_format": "KSh{{amount}}",
    "money_with_currency_format": "KSh{{amount}}"
  },
  "KWD": {
    "money_format": "{{amount}} KD",
    "money_with_currency_format": "{{amount}} KWD"
  },
  "KGS": {
    "money_format": "Ð»Ð²{{amount}}",
    "money_with_currency_format": "Ð»Ð²{{amount}}"
  },
  "LVL": {
    "money_format": "Ls {{amount}}",
    "money_with_currency_format": "Ls {{amount}} LVL"
  },
  "LBP": {
    "money_format": "L&pound;{{amount}}",
    "money_with_currency_format": "L&pound;{{amount}} LBP"
  },
  "LTL": {
    "money_format": "{{amount}} Lt",
    "money_with_currency_format": "{{amount}} Lt"
  },
  "MGA": {
    "money_format": "Ar {{amount}}",
    "money_with_currency_format": "Ar {{amount}} MGA"
  },
  "MKD": {
    "money_format": "ден {{amount}}",
    "money_with_currency_format": "ден {{amount}} MKD"
  },
  "MOP": {
    "money_format": "MOP${{amount}}",
    "money_with_currency_format": "MOP${{amount}}"
  },
  "MVR": {
    "money_format": "Rf{{amount}}",
    "money_with_currency_format": "Rf{{amount}} MRf"
  },
  "MXN": {
    "money_format": "$ {{amount}}",
    "money_with_currency_format": "$ {{amount}} MXN"
  },
  "MYR": {
    "money_format": "RM{{amount}} MYR",
    "money_with_currency_format": "RM{{amount}} MYR"
  },
  "MUR": {
    "money_format": "Rs {{amount}}",
    "money_with_currency_format": "Rs {{amount}} MUR"
  },
  "MDL": {
    "money_format": "{{amount}} MDL",
    "money_with_currency_format": "{{amount}} MDL"
  },
  "MAD": {
    "money_format": "{{amount}} dh",
    "money_with_currency_format": "Dh {{amount}} MAD"
  },
  "MNT": {
    "money_format": "{{amount_no_decimals}} &#8366",
    "money_with_currency_format": "{{amount_no_decimals}} MNT"
  },
  "MZN": {
    "money_format": "{{amount}} Mt",
    "money_with_currency_format": "Mt {{amount}} MZN"
  },
  "NAD": {
    "money_format": "N${{amount}}",
    "money_with_currency_format": "N${{amount}} NAD"
  },
  "NPR": {
    "money_format": "Rs{{amount}}",
    "money_with_currency_format": "Rs{{amount}} NPR"
  },
  "ANG": {
    "money_format": "&fnof;{{amount}}",
    "money_with_currency_format": "{{amount}} NA&fnof;"
  },
  "NZD": {
    "money_format": "${{amount}}",
    "money_with_currency_format": "${{amount}} NZD"
  },
  "NIO": {
    "money_format": "C${{amount}}",
    "money_with_currency_format": "C${{amount}} NIO"
  },
  "NGN": {
    "money_format": "&#8358;{{amount}}",
    "money_with_currency_format": "&#8358;{{amount}} NGN"
  },
  "NOK": {
    "money_format": "kr {{amount_with_comma_separator}}",
    "money_with_currency_format": "kr {{amount_with_comma_separator}} NOK"
  },
  "OMR": {
    "money_format": "{{amount_with_comma_separator}} OMR",
    "money_with_currency_format": "{{amount_with_comma_separator}} OMR"
  },
  "PKR": {
    "money_format": "Rs.{{amount}}",
    "money_with_currency_format": "Rs.{{amount}} PKR"
  },
  "PGK": {
    "money_format": "K {{amount}}",
    "money_with_currency_format": "K {{amount}} PGK"
  },
  "PYG": {
    "money_format": "Gs. {{amount_no_decimals_with_comma_separator}}",
    "money_with_currency_format": "Gs. {{amount_no_decimals_with_comma_separator}} PYG"
  },
  "PEN": {
    "money_format": "S/. {{amount}}",
    "money_with_currency_format": "S/. {{amount}} PEN"
  },
  "PHP": {
    "money_format": "&#8369;{{amount}}",
    "money_with_currency_format": "&#8369;{{amount}} PHP"
  },
  "PLN": {
    "money_format": "{{amount_with_comma_separator}} zl",
    "money_with_currency_format": "{{amount_with_comma_separator}} zl PLN"
  },
  "QAR": {
    "money_format": "QAR {{amount_with_comma_separator}}",
    "money_with_currency_format": "QAR {{amount_with_comma_separator}}"
  },
  "RON": {
    "money_format": "{{amount_with_comma_separator}} lei",
    "money_with_currency_format": "{{amount_with_comma_separator}} lei RON"
  },
  "RUB": {
    "money_format": "&#1088;&#1091;&#1073;{{amount_with_comma_separator}}",
    "money_with_currency_format": "&#1088;&#1091;&#1073;{{amount_with_comma_separator}} RUB"
  },
  "RWF": {
    "money_format": "{{amount_no_decimals}} RF",
    "money_with_currency_format": "{{amount_no_decimals}} RWF"
  },
  "WST": {
    "money_format": "WS$ {{amount}}",
    "money_with_currency_format": "WS$ {{amount}} WST"
  },
  "SAR": {
    "money_format": "{{amount}} SR",
    "money_with_currency_format": "{{amount}} SAR"
  },
  "STD": {
    "money_format": "Db {{amount}}",
    "money_with_currency_format": "Db {{amount}} STD"
  },
  "RSD": {
    "money_format": "{{amount}} RSD",
    "money_with_currency_format": "{{amount}} RSD"
  },
  "SCR": {
    "money_format": "Rs {{amount}}",
    "money_with_currency_format": "Rs {{amount}} SCR"
  },
  "SGD": {
    "money_format": "${{amount}}",
    "money_with_currency_format": "${{amount}} SGD"
  },
  "SYP": {
    "money_format": "S&pound;{{amount}}",
    "money_with_currency_format": "S&pound;{{amount}} SYP"
  },
  "ZAR": {
    "money_format": "R {{amount}}",
    "money_with_currency_format": "R {{amount}} ZAR"
  },
  "KRW": {
    "money_format": "&#8361;{{amount_no_decimals}}",
    "money_with_currency_format": "&#8361;{{amount_no_decimals}} KRW"
  },
  "LKR": {
    "money_format": "Rs {{amount}}",
    "money_with_currency_format": "Rs {{amount}} LKR"
  },
  "SEK": {
    "money_format": "{{amount_no_decimals}} kr",
    "money_with_currency_format": "{{amount_no_decimals}} kr SEK"
  },
  "CHF": {
    "money_format": "{{amount}} CHF",
    "money_with_currency_format": "{{amount}} CHF"
  },
  "TWD": {
    "money_format": "${{amount}}",
    "money_with_currency_format": "${{amount}} TWD"
  },
  "THB": {
    "money_format": "{{amount}} &#xe3f;",
    "money_with_currency_format": "{{amount}} &#xe3f; THB"
  },
  "TZS": {
    "money_format": "{{amount}} TZS",
    "money_with_currency_format": "{{amount}} TZS"
  },
  "TTD": {
    "money_format": "${{amount}}",
    "money_with_currency_format": "${{amount}} TTD"
  },
  "TND": {
    "money_format": "{{amount}}",
    "money_with_currency_format": "{{amount}} DT"
  },
  "TRY": {
    "money_format": "{{amount}}TL",
    "money_with_currency_format": "{{amount}}TL"
  },
  "UGX": {
    "money_format": "Ush {{amount_no_decimals}}",
    "money_with_currency_format": "Ush {{amount_no_decimals}} UGX"
  },
  "UAH": {
    "money_format": "₴{{amount}}",
    "money_with_currency_format": "{{amount}} UAH"
  },
  "AED": {
    "money_format": "Dhs. {{amount}}",
    "money_with_currency_format": "Dhs. {{amount}} AED"
  },
  "UYU": {
    "money_format": "${{amount_with_comma_separator}}",
    "money_with_currency_format": "${{amount_with_comma_separator}} UYU"
  },
  "VUV": {
    "money_format": "{{amount}} VT",
    "money_with_currency_format": "{{amount}} VT"
  },
  "VEF": {
    "money_format": "Bs. {{amount_with_comma_separator}}",
    "money_with_currency_format": "Bs. {{amount_with_comma_separator}} VEF"
  },
  "VND": {
    "money_format": "{{amount_no_decimals_with_comma_separator}}&#8363;",
    "money_with_currency_format": "{{amount_no_decimals_with_comma_separator}} VND"
  },
  "XBT": {
    "money_format": "{{amount_no_decimals}} BTC",
    "money_with_currency_format": "{{amount_no_decimals}} BTC"
  },
  "XOF": {
    "money_format": "CFA{{amount}}",
    "money_with_currency_format": "CFA{{amount}} XOF"
  },
  "ZMW": {
    "money_format": "K{{amount_no_decimals_with_comma_separator}}",
    "money_with_currency_format": "ZMW{{amount_no_decimals_with_comma_separator}}"
  }
};

/**
 * Format money values based on your shop currency settings
 *
 * @param  {Number|string} cents - value in cents or dollar amount e.g. 300 cents or 3.00 dollars
 * @param  {String} format - shop money_format setting
 * @return {String} value - formatted value
*/

function baseCurrency(el, format) {

  const newFormat = moneyFormats[shopCurrency][format || CurrencyConfigs.format] || '{{amount}}';
  let baseAmount = el.textContent;

  // if(cartCurrency != shopCurrency) {
  // }
  // We have to normalize by replacing dot by comma and comma by dot
  if (t_moneyFormat.indexOf('with_comma_separator') !== -1) {
    baseAmount = baseAmount.replace(/[,.]/g, function (match) {
      // If `,` is matched return `.`, if `.` matched return `,`
      return match === ',' ? '.' : ',';
    });
  }
  //let cents = Currency.convert(parseFloat(baseAmount.replace(/^[^0-9]+|[^0-9.]/g, '', ''), 10) * 100, cartCurrency, shopCurrency);
  let cents = parseFloat(baseAmount.replace(/^[^0-9]+|[^0-9.]/g, '', ''), 10) * 100 / rate;
   // if (round_currency) {
   //  cents = Math.round(cents / 100) * 100;
   // }
    el.dataset[dt_base] = cents;
    el.setAttribute("data-currency-"+shopCurrency.toLowerCase(), formatMoney(cents, newFormat));
    return cents;
}

function CurrencyConvertAll(newCurrency, selector, format) {
  if (!newCurrency) { return false }

  const $selector = (typeof selector === "array") ? selector : $$4(selector || `.hdt-money:not([no-select-money],[data-hdt-currency="${newCurrency}"])`);
  const newFormat = moneyFormats[newCurrency][format || CurrencyConfigs.format] || '{{amount}}';

  $selector.forEach(function (el) {

    if (!el.dataset[dt_cur_shop]) el.dataset[dt_cur_shop] = el.textContent; // save shop curency
    const baseAmount = el.dataset[dt_base] ? parseFloat(el.dataset[dt_base]) : baseCurrency(el, format);

    if (typeof baseAmount === 'undefined') return;

    // If we are converting to a currency that we have saved, we will use the saved amount.
    let newCurrencyData = 'currency' + newCurrency.charAt(0) + newCurrency.slice(1).toLowerCase();
    if (el.dataset[newCurrencyData]) {
      el.innerHTML = el.dataset[newCurrencyData];
    } else {
      let newCents = Currency.convert(baseAmount, shopCurrency, newCurrency);
      if (round_currency) {
        newCents = Math.round(newCents / 100) * 100;
      }
      const newFormattedAmount = formatMoney(newCents, newFormat);
      el.innerHTML = newFormattedAmount;
      el.dataset[newCurrencyData] = newFormattedAmount;
    }

    // END JS
    // We record the new currency locally.
    el.dataset['hdtCurrency'] = newCurrency;
  });
};

function buildFromData(data) {
  const currencyCode = arrayCurrency[data.country] || cartCurrency;
  // check currency shopify support
  if (moneyFormats[currencyCode] && currencyCode) {
    // if currency not exist then add curency

    $$4(selector).forEach(function (el) {
      if (el.querySelector('button[value="'+ currencyCode +'"]') == null) {
        el.querySelector('.hdt-item-auto').setAttribute('value', currencyCode);
        el.querySelector('.hdt-item-auto').setAttribute('data-name', currencyCode);
        if( el.querySelector('.hdt-item-auto img')) {
          el.querySelector('.hdt-item-auto img').setAttribute("src", "//cdn.shopify.com/static/images/flags/"+ currencyCode.slice(0,2).toLowerCase() +".svg");
          el.querySelector('.hdt-item-auto img').setAttribute("alt", currencyCode);
        }
        el.querySelector('.hdt-item-auto span').innerHTML = currencyCode;
        el.querySelector('.hdt-item-auto.wait')?.classList.remove('wait');
      }
      if (el.querySelector('.hdt-item-auto.wait')) {
        el.querySelector('.hdt-item-auto.wait').remove();
      }
    });
    $$4(selector + " hdt-richlist").forEach(function (el) {
      el.setAttribute("selected", CurrencyConfigs.currentCurrency || currencyCode || cartCurrency);
    });
  }
}
function fetchIpinfo() {
  fetch('https://ipinfo.io/json', {  method: 'GET', dataType: "json" })
  .then(function(response){
    return response.json()
  })
  .then(function(data){
    buildFromData(data);
    localStorage.setItem('hdt_currency', JSON.stringify(data));
  }).catch(error => console.error('Error ipinfo:', error));
}

function init() {
  if(!$4(`${selector}`)) return;
  if (!themeHDN.settings.autoCurrencies || navigator.userAgent.match(/bot|spider/i)) {
    if (CurrencyConfigs.currentCurrency && CurrencyConfigs.currentCurrency != cartCurrency) {
      $4(`${selector} button[value="${CurrencyConfigs.currentCurrency}"]`)?.click();
    }
    $4(`${selector} .hdt-item-auto.wait`)?.remove();
    return;
  }

  var nt_currency = localStorage.getItem('hdt_currency');
  if (nt_currency) {
    buildFromData(JSON.parse(nt_currency));
  }
  else {
    // https://ipinfo.io/developers/full-country-names
    // https://ipinfo.io/developers/filtering-bot-traffic
    // https://d1hcrjcdtouu7e.cloudfront.net/users/countryDetection

    fetch(window.Shopify.routes.root + 'browsing_context_suggestions.json', { method: 'GET',dataType: "json" })
      .then(function(response){
        return response.json()
      })
      .then((data) => {
        try {
          const country = data.detected_values.country.handle; // get country code, eg: VN
          data = { country };
          buildFromData(data);
          localStorage.setItem('hdt_currency', JSON.stringify(data));
        } catch (error) {
          fetchIpinfo();
        }
      })
      .catch((error) => {
        console.error('Error:', error)
        fetchIpinfo();
      });
  }

}

document.addEventListener("richlist:change", (e) => {
  if (e.target.name === "country_code" && e.detail.value !== newCurrency) {
    localStorage.setItem('hdt_currency_iso', e.detail.value);
    if($4('[data-flag-current]')) {
      $$4('[data-flag-current]').forEach(function (el) {
        el.setAttribute("src", "//cdn.shopify.com/static/images/flags/"+ e.detail.value.slice(0,2).toLowerCase() +".svg");
        el.setAttribute("srcset", "//cdn.shopify.com/static/images/flags/"+ e.detail.value.slice(0,2).toLowerCase() +".svg?width=32 32w");
        el.setAttribute("alt", e.detail.value);
      })
    }
    $$4('[data-name-current]').forEach(function (el) {
      el.innerHTML = e.detail.value;
    })
    newCurrency = e.detail.value;
    CurrencyConvertAll(e.detail.value);
  }
})
document.addEventListener("currency:update", (e) => CurrencyConvertAll(newCurrency));
document.addEventListener("products:update", (e) => CurrencyConvertAll(newCurrency));

init();
$4('hdt-lazy-html[section-id="popover-currencies"]')?.addEventListener('lazyhtml:added', (e) => {
  init();
});