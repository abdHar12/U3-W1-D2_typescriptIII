var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Tasse = /** @class */ (function () {
    function Tasse(_lordo) {
        this.lordo = _lordo;
    }
    return Tasse;
}());
var Lavoratore = /** @class */ (function (_super) {
    __extends(Lavoratore, _super);
    function Lavoratore(_lordo) {
        return _super.call(this, _lordo) || this;
    }
    Lavoratore.prototype.getUtileTasse = function () {
        return this.lordo - (this.lordo / 100) * 22;
    };
    Lavoratore.prototype.getTasseInps = function () { };
    Lavoratore.prototype.getTasseIrpef = function () { };
    Lavoratore.prototype.getReddittoAnnuoNetto = function () {
        return this.getUtileTasse() - this.getTasseInps() - this.getTasseIrpef();
    };
    return Lavoratore;
}(Tasse));
var Professionista = /** @class */ (function (_super) {
    __extends(Professionista, _super);
    function Professionista(_lordo) {
        return _super.call(this, _lordo) || this;
    }
    Professionista.prototype.getTasseIrpef = function () {
        return (this.getUtileTasse() / 100) * 5;
    };
    Professionista.prototype.getTasseInps = function () {
        return (this.getUtileTasse() / 100) * 25;
    };
    return Professionista;
}(Lavoratore));
var Artigiano = /** @class */ (function (_super) {
    __extends(Artigiano, _super);
    function Artigiano(_lordo) {
        return _super.call(this, _lordo) || this;
    }
    Artigiano.prototype.getTasseIrpef = function () {
        return (this.getUtileTasse() / 100) * 15;
    };
    Artigiano.prototype.getTasseInps = function () {
        return (this.getUtileTasse() / 100) * 15;
    };
    return Artigiano;
}(Lavoratore));
var Commerciante = /** @class */ (function (_super) {
    __extends(Commerciante, _super);
    function Commerciante(_lordo) {
        return _super.call(this, _lordo) || this;
    }
    Commerciante.prototype.getTasseIrpef = function () {
        return (this.getUtileTasse() / 100) * 15;
    };
    Commerciante.prototype.getTasseInps = function () {
        return (this.getUtileTasse() / 100) * 35;
    };
    return Commerciante;
}(Lavoratore));
window.addEventListener("DOMContentLoaded", function () {
    var proButton = document.getElementById("pro-button");
    var artisanButton = document.getElementById("artisan-button");
    var dealerButton = document.getElementById("dealer-button");
    proButton.onclick = function (e) {
        artisanButton.setAttribute("disabled", "true");
        dealerButton.setAttribute("disabled", "true");
        continueOperation(e);
    };
    artisanButton.onclick = function (e) {
        proButton.setAttribute("disabled", "true");
        dealerButton.setAttribute("disabled", "true");
        continueOperation(e);
    };
    dealerButton.onclick = function (e) {
        artisanButton.setAttribute("disabled", "true");
        dealerButton.setAttribute("disabled", "true");
        continueOperation(e);
    };
});
var continueOperation = function (e) {
    var divInput = document.getElementById("input-div");
    divInput.style.display = "block";
    var button = divInput.getElementsByTagName("button")[0];
    var input = divInput.getElementsByTagName("input")[0];
    var divResult = document.getElementById("result");
    var gross;
    button.onclick = function () {
        gross = parseInt(input.value);
        input.value = "";
        divResult.style.display = "block";
        if (e.target.outerText === "Professionista") {
            var attivita = new Professionista(gross);
            creationOfDivResult(attivita);
        }
        else if (e.target.outerText === "Artigiano") {
            var attivita = new Artigiano(gross);
            creationOfDivResult(attivita);
        }
        else {
            var attivita = new Commerciante(gross);
            creationOfDivResult(attivita);
        }
    };
};
var creationOfDivResult = function (attivita) {
    var divResult = document.getElementById("result");
    var p1 = document.createElement("p");
    var p2 = document.createElement("p");
    var p3 = document.createElement("p");
    var p4 = document.createElement("p");
    var p5 = document.createElement("p");
    divResult.appendChild(p1);
    divResult.appendChild(p2);
    divResult.appendChild(p3);
    divResult.appendChild(p4);
    divResult.appendChild(p5);
    p1.innerText = "Lordo: ".concat(attivita.lordo);
    p2.innerText = "Utile Tasse: ".concat(attivita.getUtileTasse());
    p3.innerText = "Redditto Tasse Irpef: ".concat(attivita.getTasseIrpef());
    p4.innerText = "Redditto Tasse Inps: ".concat(attivita.getTasseInps());
    p5.innerText = "Redditto netto annuo: ".concat(attivita.getReddittoAnnuoNetto());
};
