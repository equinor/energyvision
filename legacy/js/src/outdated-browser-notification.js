var $buoop = {
    c: 2,
    l: convertLanguageCode(document.documentElement.lang)
};

function convertLanguageCode(languageCode) {
    if (languageCode == "no") {
        return "nb";
    }

    return languageCode;
}

function $buo_f() {
    var e = document.createElement("script");
    e.src = "//browser-update.org/update.min.js";
    document.body.appendChild(e);
};

try {
    document.addEventListener("DOMContentLoaded", $buo_f, false)
} catch (e) {
    window.attachEvent("onload", $buo_f)
}