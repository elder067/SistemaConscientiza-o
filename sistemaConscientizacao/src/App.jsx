
import { useState } from "react";
import "./App.css";

const temas = [
  {
    numero: "01",
    titulo: "Phishing e golpes virtuais",
    descricao: "Aprenda a reconhecer mensagens falsas, links suspeitos e tentativas de golpe.",
    link: "#phishing",
    icone: "🎣"
  },
  {
    numero: "02",
    titulo: "Senhas seguras",
    descricao: "Descubra como criar senhas fortes e proteger suas contas.",
    link: "#senhas",
    icone: "🔐"
  },
  {
    numero: "03",
    titulo: "Proteção de dados",
    descricao: "Entenda a importância da privacidade e dos dados pessoais.",
    link: "#dados",
    icone: "🛡️"
  }
];

const perguntas = [
  {
    pergunta: "O que é phishing?",
    alternativas: [
      "Um tipo de antivírus",
      "Uma tentativa de enganar pessoas para roubar informações",
      "Um aplicativo de mensagens",
      "Uma atualização do computador"
    ],
    correta: 1,
    explicacao: "Phishing é uma tentativa de enganar pessoas por meio de mensagens ou sites falsos para obter informações pessoais."
  },
  {
    pergunta: "Qual atitude ajuda a proteger suas senhas?",
    alternativas: [
      "Usar a mesma senha em todos os sites",
      "Compartilhar a senha com amigos",
      "Criar senhas diferentes e difíceis de adivinhar",
      "Usar apenas números"
    ],
    correta: 2,
    explicacao: "Utilizar senhas diferentes dificulta que o acesso indevido a uma conta comprometa outras contas."
  },
  {
    pergunta: "O que fazer ao receber um link suspeito?",
    alternativas: [
      "Clicar imediatamente",
      "Compartilhar com amigos",
      "Informar seus dados",
      "Não clicar e verificar a origem"
    ],
    correta: 3,
    explicacao: "Verificar a origem do link ajuda a evitar páginas falsas e possíveis golpes virtuais."
  },
  {
    pergunta: "Qual destas informações deve ser protegida?",
    alternativas: [
      "Senha pessoal",
      "Nome de um personagem fictício",
      "Cor favorita",
      "Nome de um jogo"
    ],
    correta: 0,
    explicacao: "Senhas são informações privadas e não devem ser compartilhadas com outras pessoas."
  },
  {
    pergunta: "Para que serve a autenticação em dois fatores?",
    alternativas: [
      "Deixar a internet mais rápida",
      "Adicionar uma camada extra de segurança",
      "Excluir vírus automaticamente",
      "Compartilhar contas"
    ],
    correta: 1,
    explicacao: "A autenticação em dois fatores adiciona uma etapa extra de verificação para proteger o acesso à conta."
  }
];

function Quiz() {
  const [numero, setNumero] = useState(0);
  const [respostas, setRespostas] = useState([]);
  const [finalizado, setFinalizado] = useState(false);

  const perguntaAtual = perguntas[numero];
  const respostaAtual = respostas[numero];

  const pontuacao = respostas.filter(
    (resposta, indice) => resposta === perguntas[indice].correta
  ).length;

  function responder(alternativa) {
    if (respostaAtual !== undefined) return;

    const novasRespostas = [...respostas];
    novasRespostas[numero] = alternativa;
    setRespostas(novasRespostas);
  }

  function proximaPergunta() {
    if (numero < perguntas.length - 1) {
      setNumero(numero + 1);
    } else {
      setFinalizado(true);
    }
  }

  function reiniciar() {
    setNumero(0);
    setRespostas([]);
    setFinalizado(false);
  }

  return (
    <section className="quiz secao" id="quiz">
      <div className="quiz-container">
        <span className="etiqueta">TESTE SEU CONHECIMENTO</span>
        <h2>Quiz de segurança digital</h2>
        <p className="quiz-intro">
          Responda às perguntas e descubra o quanto você sabe sobre segurança na internet.
        </p>

        {finalizado ? (
          <div className="resultado">
            <div className="resultado-icone">🏆</div>
            <h3>Quiz concluído!</h3>
            <p className="pontuacao">
              Você acertou <strong>{pontuacao}</strong> de {perguntas.length} perguntas.
            </p>

            <p>
              {pontuacao === 5
                ? "Excelente! Você demonstrou ótimo conhecimento sobre segurança digital."
                : pontuacao >= 3
                ? "Muito bem! Você já conhece pontos importantes sobre segurança digital."
                : "Continue aprendendo! Conhecer os riscos da internet ajuda a navegar com mais segurança."}
            </p>

            <button className="botao-principal" onClick={reiniciar}>
              Tentar novamente
            </button>
          </div>
        ) : (
          <div className="quiz-perguntas">
            <div className="quiz-topo">
              <span>Pergunta {numero + 1} de {perguntas.length}</span>
              <span>{Math.round(((numero + 1) / perguntas.length) * 100)}%</span>
            </div>

            <div className="barra-progresso">
              <div
                className="barra-preenchida"
                style={{ width: `${((numero + 1) / perguntas.length) * 100}%` }}
              />
            </div>

            <h3>{perguntaAtual.pergunta}</h3>

            <div className="quiz-alternativas">
              {perguntaAtual.alternativas.map((alternativa, indice) => {
                let classe = "";

                if (respostaAtual !== undefined) {
                  if (indice === perguntaAtual.correta) {
                    classe = "correta";
                  } else if (indice === respostaAtual) {
                    classe = "incorreta";
                  }
                }

                return (
                  <button
                    key={indice}
                    className={`alternativa ${classe}`}
                    onClick={() => responder(indice)}
                    disabled={respostaAtual !== undefined}
                  >
                    <span className="letra-alternativa">
                      {String.fromCharCode(65 + indice)}
                    </span>
                    {alternativa}
                  </button>
                );
              })}
            </div>

            {respostaAtual !== undefined && (
              <>
                <div className={`quiz-feedback ${respostaAtual === perguntaAtual.correta ? "acertou" : "errou"}`}>
                  <strong>
                    {respostaAtual === perguntaAtual.correta
                      ? "Resposta correta!"
                      : "Resposta incorreta!"}
                  </strong>
                  <p>{perguntaAtual.explicacao}</p>
                </div>

                <button className="botao-principal" onClick={proximaPergunta}>
                  {numero === perguntas.length - 1
                    ? "Ver resultado"
                    : "Próxima pergunta"}
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function App() {
  const [menuAberto, setMenuAberto] = useState(false);

  function fecharMenu() {
    setMenuAberto(false);
  }

  return (
    <>
      <header className="cabecalho">
        <div className="cabecalho-conteudo">
          <a href="#inicio" className="logo" onClick={fecharMenu}>
            <span className="logo-icone">🛡️</span>
            Conecta<span>Seguro</span>
          </a>

          <button
            className="menu-mobile"
            onClick={() => setMenuAberto(!menuAberto)}
            aria-label="Abrir menu"
          >
            {menuAberto ? "✕" : "☰"}
          </button>

          <nav className={menuAberto ? "navegacao aberta" : "navegacao"}>
            <a href="#inicio" onClick={fecharMenu}>Início</a>
            <a href="#conteudos" onClick={fecharMenu}>Conteúdos</a>
            <a href="#dicas" onClick={fecharMenu}>Dicas</a>
            <a href="#quiz" onClick={fecharMenu}>Quiz</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-conteudo">
            <span className="etiqueta">SEGURANÇA DIGITAL PARA JOVENS</span>
            <h1>Conecte-se ao mundo. <span>Proteja-se na internet.</span></h1>
            <p>
              Aprenda a identificar ameaças digitais, proteger suas informações
              e navegar pela internet com mais consciência e segurança.
            </p>

            <div className="hero-botoes">
              <a href="#conteudos" className="botao-principal">
                Explorar conteúdos
              </a>
              <a href="#quiz" className="botao-secundario">
                Fazer o quiz
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="escudo-grande">🛡️</div>
            <div className="visual-legenda">
              <span className="status-ponto" />
              Sua segurança importa
            </div>
          </div>
        </section>

        <section className="secao introducao">
          <div className="titulo-secao">
            <span className="etiqueta">NOSSO OBJETIVO</span>
            <h2>Conhecimento é uma forma de proteção</h2>
            <p>
              A internet oferece inúmeras oportunidades, mas também apresenta
              riscos. A informação é essencial para reconhecer ameaças e tomar
              decisões mais seguras no ambiente digital.
            </p>
          </div>
        </section>

        <section className="secao conteudos" id="conteudos">
          <div className="titulo-secao">
            <span className="etiqueta">APRENDA E PROTEJA-SE</span>
            <h2>Explore nossos conteúdos</h2>
            <p>Conheça três temas importantes para sua segurança digital.</p>
          </div>

          <div className="temas-grid">
            {temas.map((tema) => (
              <a href={tema.link} className="tema-card" key={tema.numero}>
                <span className="tema-numero">{tema.numero}</span>
                <span className="tema-icone">{tema.icone}</span>
                <h3>{tema.titulo}</h3>
                <p>{tema.descricao}</p>
                <span className="tema-link">Aprender mais →</span>
              </a>
            ))}
          </div>
        </section>

        <section className="secao educacional" id="phishing">
          <div className="titulo-secao">
            <span className="etiqueta">01 • AMEAÇAS DIGITAIS</span>
            <h2>Phishing e golpes virtuais</h2>
            <p>Aprenda a reconhecer mensagens falsas e evitar golpes na internet.</p>
          </div>

          <div className="conteudo-educativo">
            <h3>O que é phishing?</h3>
            <p>
              Phishing é uma técnica utilizada por criminosos para enganar
              pessoas, geralmente por meio de mensagens, e-mails ou sites falsos,
              com o objetivo de obter informações pessoais, senhas e dados bancários.
            </p>

            <h3>Como identificar uma tentativa de phishing?</h3>
            <ul>
              <li>Mensagens que prometem prêmios ou vantagens exageradas.</li>
              <li>Links com endereços estranhos ou diferentes dos sites oficiais.</li>
              <li>Solicitações inesperadas de senhas ou informações pessoais.</li>
              <li>Mensagens que criam urgência para você clicar rapidamente.</li>
            </ul>

            <h3>Como se proteger?</h3>
            <ul>
              <li>Não clique em links de remetentes desconhecidos.</li>
              <li>Confira o endereço do site antes de informar seus dados.</li>
              <li>Não compartilhe senhas ou códigos de verificação.</li>
              <li>Em caso de dúvida, procure o canal oficial da empresa.</li>
            </ul>

            <div className="aviso-educativo">
              <strong>Fique atento!</strong>
              <p>Desconfie de mensagens que oferecem vantagens muito boas ou exigem uma ação imediata.</p>
            </div>
          </div>
        </section>

        <section className="secao educacional" id="senhas">
          <div className="titulo-secao">
            <span className="etiqueta">02 • CONTAS E ACESSOS</span>
            <h2>Senhas seguras</h2>
            <p>Entenda como criar senhas mais fortes e proteger suas contas.</p>
          </div>

          <div className="conteudo-educativo">
            <h3>Por que as senhas são importantes?</h3>
            <p>
              As senhas funcionam como uma barreira de proteção para nossas contas.
              Quando são fracas ou repetidas em vários serviços, outras pessoas
              podem conseguir acessar informações pessoais.
            </p>

            <h3>O que evitar?</h3>
            <ul>
              <li>Usar datas de nascimento ou nomes fáceis de descobrir.</li>
              <li>Utilizar a mesma senha em diferentes contas.</li>
              <li>Compartilhar senhas com outras pessoas.</li>
              <li>Usar combinações muito curtas ou previsíveis.</li>
            </ul>

            <h3>Como criar uma senha mais segura?</h3>
            <ul>
              <li>Prefira senhas longas e difíceis de adivinhar.</li>
              <li>Use combinações pouco previsíveis.</li>
              <li>Tenha senhas diferentes para cada conta.</li>
              <li>Ative a autenticação em dois fatores quando disponível.</li>
            </ul>

            <div className="aviso-educativo">
              <strong>Dica de segurança!</strong>
              <p>Um gerenciador de senhas pode ajudar a criar e guardar senhas diferentes com segurança.</p>
            </div>
          </div>
        </section>

        <section className="secao educacional" id="dados">
          <div className="titulo-secao">
            <span className="etiqueta">03 • PRIVACIDADE</span>
            <h2>Proteção de dados pessoais</h2>
            <p>Saiba como preservar suas informações e sua privacidade na internet.</p>
          </div>

          <div className="conteudo-educativo">
            <h3>O que são dados pessoais?</h3>
            <p>
              Dados pessoais são informações que permitem identificar uma pessoa,
              como nome completo, endereço, telefone, CPF, localização e fotografias.
              Essas informações precisam ser protegidas para evitar usos indevidos.
            </p>

            <h3>Quais cuidados devemos ter?</h3>
            <ul>
              <li>Evite publicar endereço, telefone e documentos nas redes sociais.</li>
              <li>Não compartilhe sua localização com desconhecidos.</li>
              <li>Verifique as permissões solicitadas pelos aplicativos.</li>
              <li>Desconfie de formulários que pedem informações desnecessárias.</li>
            </ul>

            <h3>Como proteger sua privacidade?</h3>
            <ul>
              <li>Configure a privacidade das suas redes sociais.</li>
              <li>Compartilhe informações apenas com pessoas de confiança.</li>
              <li>Utilize aplicativos e sites confiáveis.</li>
              <li>Mantenha seus dispositivos e aplicativos atualizados.</li>
            </ul>

            <div className="aviso-educativo">
              <strong>Proteja sua privacidade!</strong>
              <p>Pense antes de publicar. Uma informação compartilhada na internet pode circular muito além do público que você imaginou.</p>
            </div>
          </div>
        </section>

        <section className="secao dicas" id="dicas">
          <div className="titulo-secao">
            <span className="etiqueta">PEQUENAS ATITUDES, GRANDE PROTEÇÃO</span>
            <h2>Dicas para navegar com segurança</h2>
            <p>Alguns hábitos simples ajudam a manter sua vida digital mais protegida.</p>
          </div>

          <div className="dicas-grid">
            <article className="dica">
              <span>🔗</span>
              <h3>Confira os links</h3>
              <p>Verifique o endereço dos sites antes de clicar ou informar qualquer dado.</p>
            </article>

            <article className="dica">
              <span>🔑</span>
              <h3>Proteja suas contas</h3>
              <p>Utilize senhas diferentes e autenticação em dois fatores.</p>
            </article>

            <article className="dica">
              <span>👤</span>
              <h3>Cuide da privacidade</h3>
              <p>Evite compartilhar informações pessoais com desconhecidos.</p>
            </article>

            <article className="dica">
              <span>📲</span>
              <h3>Mantenha tudo atualizado</h3>
              <p>Atualize seus aplicativos e dispositivos para receber melhorias de segurança.</p>
            </article>

            <article className="dica">
              <span>📩</span>
              <h3>Desconfie de mensagens</h3>
              <p>Não confie automaticamente em mensagens que prometem prêmios ou vantagens.</p>
            </article>

            <article className="dica">
              <span>🔒</span>
              <h3>Use sites confiáveis</h3>
              <p>Verifique se está acessando o endereço oficial do serviço desejado.</p>
            </article>
          </div>
        </section>

        <Quiz />

        <section className="chamada-final">
          <h2>Sua segurança começa com a informação.</h2>
          <p>Compartilhe conhecimento e ajude a construir uma internet mais segura.</p>
          <a href="#inicio" className="botao-principal">Voltar ao início ↑</a>
        </section>
      </main>

      <footer className="rodape">
        <a href="#inicio" className="logo">
          <span className="logo-icone">🛡️</span>
          Conecta<span>Seguro</span>
        </a>
        <p>Projeto de conscientização sobre segurança digital para jovens na Internet.</p>
        <span>© 2026 ConectaSeguro</span>
      </footer>
    </>
  );
}

export default App;
