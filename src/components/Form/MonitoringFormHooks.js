import React, { useState, useEffect } from 'react';

const MonitoringCodeFormHooks = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://d335luupugsy2.cloudfront.net/js/rdstation-forms/stable/rdstation-forms.min.js";
    script.async = true;
    document.body.appendChild(script);
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Integração de formulário RDSM<br />Via código de monitoramento (Sintaxe de Hooks)</p>

        <form onSubmit={handleSubmit}>
          <p>
            <label>
              Nome:&nbsp;
                <input
                onChange={event => setName(event.target.value)}
                value={name}
                type="text"
                name="name" />
            </label>
          </p>
          <p>
            <label>
              Email:&nbsp;&nbsp;
                <input
                onChange={event => setEmail(event.target.value)}
                value={email}
                id="email"
                name="email"
                type="email" />
            </label>
          </p>
          <input type="submit" value="Enviar" />
        </form>
      </header>
    </div>
  );
}

export default MonitoringCodeFormHooks;
