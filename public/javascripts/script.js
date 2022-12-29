const nomeInput = document.getElementById("inputNome");
const sobrenomeInput = document.getElementById("inputSobrenome");
const emailInput = document.getElementById("inputEmail");
const botaoEnviar = document.getElementById("buttonEnviar");
const modal = document.getElementById("modal");
const apiURL = "http://138.68.29.250:8082/";
const createURL = "/create";
botaoEnviar.addEventListener("click", async (evento) => {
  evento.preventDefault();

  if (
    nomeInput.value != "" &&
    sobrenomeInput.value != "" &&
    emailInput.value != ""
  ) {
    const data = {
      nome: nomeInput.value,
      sobrenome: sobrenomeInput.value,
      email: emailInput.value,
    };

    const configuracao = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(data),
    };

    const token = await fetch(apiURL, configuracao).then((response) =>
      response.text()
    );

    const configuracaoBackend = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: nomeInput.value,
        sobrenome: sobrenomeInput.value,
        email: emailInput.value,
        token: token,
      }),
    };
    try {
      const { cor, pais, animal } = await fetch(
        createURL,
        configuracaoBackend
      ).then((response) => {
        if (!response.ok) {
          throw new Error("erro ao tentar enviar as informações.");
        }

        return response.json();
      });

      modal.innerHTML = `
      <div class="ui card ">
      <div class="content">
        
        <div class="header">Seus dados:</div>
        <div class="description">
        <span>Pais: ${pais}</span>
        <span>Cor: ${cor}</span>
        <span>Animal: ${animal}</span>
        
        </div>
      </div>
    
    </div>

      
      `;
    } catch (error) {
      alert(error.message);
    }
  } else {
    alert("Todos os campos devem ser preenchidos para continuar!");
  }
});
