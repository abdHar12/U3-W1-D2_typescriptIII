abstract class Tasse {
  lordo: number;
  constructor(_lordo: number) {
    this.lordo = _lordo;
  }
  abstract getUtileTasse(): number;
  abstract getTasseInps(): number;
  abstract getTasseIrpef(): number;
  abstract getReddittoAnnuoNetto(): number;
}

class Lavoratore extends Tasse {
  constructor(_lordo: number) {
    super(_lordo);
  }
  getUtileTasse(): number {
    return this.lordo - (this.lordo / 100) * 22;
  }
  getTasseInps(): any {}
  getTasseIrpef(): any {}

  getReddittoAnnuoNetto(): number {
    return this.getUtileTasse() - this.getTasseInps() - this.getTasseIrpef();
  }
}

class Professionista extends Lavoratore {
  constructor(_lordo: number) {
    super(_lordo);
  }
  getTasseIrpef(): number {
    return (this.getUtileTasse() / 100) * 5;
  }
  getTasseInps() {
    return (this.getUtileTasse() / 100) * 25;
  }
}
class Artigiano extends Lavoratore {
  constructor(_lordo: number) {
    super(_lordo);
  }
  getTasseIrpef(): number {
    return (this.getUtileTasse() / 100) * 15;
  }
  getTasseInps() {
    return (this.getUtileTasse() / 100) * 15;
  }
}
class Commerciante extends Lavoratore {
  constructor(_lordo: number) {
    super(_lordo);
  }
  getTasseIrpef(): number {
    return (this.getUtileTasse() / 100) * 15;
  }
  getTasseInps() {
    return (this.getUtileTasse() / 100) * 35;
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const proButton = document.getElementById("pro-button") as HTMLButtonElement;
  const artisanButton = document.getElementById(
    "artisan-button"
  ) as HTMLButtonElement;
  const dealerButton = document.getElementById(
    "dealer-button"
  ) as HTMLButtonElement;
  proButton.onclick = (e) => {
    artisanButton.setAttribute("disabled", "true");
    dealerButton.setAttribute("disabled", "true");
    continueOperation(e);
  };
  artisanButton.onclick = (e) => {
    proButton.setAttribute("disabled", "true");
    dealerButton.setAttribute("disabled", "true");
    continueOperation(e);
  };
  dealerButton.onclick = (e) => {
    artisanButton.setAttribute("disabled", "true");
    dealerButton.setAttribute("disabled", "true");
    continueOperation(e);
  };
});
const continueOperation = (e: any): void => {
  const divInput = document.getElementById("input-div") as HTMLDivElement;
  divInput.style.display = "block";
  const button = divInput.getElementsByTagName(
    "button"
  )[0] as HTMLButtonElement;

  const input = divInput.getElementsByTagName("input")[0] as HTMLInputElement;
  const divResult = document.getElementById("result") as HTMLDivElement;

  let gross: number;
  button.onclick = () => {
    gross = parseInt(input.value);
    input.value = "";
    divResult.style.display = "block";

    if (e.target.outerText === "Professionista") {
      const attivita = new Professionista(gross!);
      creationOfDivResult(attivita);
    } else if (e.target.outerText === "Artigiano") {
      const attivita = new Artigiano(gross!);
      creationOfDivResult(attivita);
    } else {
      const attivita = new Commerciante(gross!);
      creationOfDivResult(attivita);
    }
  };
};
const creationOfDivResult = (attivita: any) => {
  const divResult = document.getElementById("result") as HTMLDivElement;
  const p1 = document.createElement("p") as HTMLParagraphElement;
  const p2 = document.createElement("p") as HTMLParagraphElement;
  const p3 = document.createElement("p") as HTMLParagraphElement;
  const p4 = document.createElement("p") as HTMLParagraphElement;
  const p5 = document.createElement("p") as HTMLParagraphElement;
  divResult.appendChild(p1);
  divResult.appendChild(p2);
  divResult.appendChild(p3);
  divResult.appendChild(p4);
  divResult.appendChild(p5);
  p1.innerText = `Lordo: ${attivita.lordo}`;
  p2.innerText = `Utile Tasse: ${attivita.getUtileTasse()}`;
  p3.innerText = `Redditto Tasse Irpef: ${attivita.getTasseIrpef()}`;
  p4.innerText = `Redditto Tasse Inps: ${attivita.getTasseInps()}`;
  p5.innerText = `Redditto netto annuo: ${attivita.getReddittoAnnuoNetto()}`;
};
