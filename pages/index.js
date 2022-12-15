import Head from "next/head";
import { useState } from "react";

const Home = () => {
  const [userInput, setUserInput] = useState("");

  const [apiOutput, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAi..");
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAi replied..", output.text);

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  };

  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };

  return (
    <div className="root">
      <Head>
        <title>Proposalify - Get Cool AI Generated Proposals</title>
      </Head>
      <div id="navbar">
        <p className="logotext">Proposalify.</p>
        <div id="links">
          <ul>
            <li><a href="www.google.com" target="_blank">Extension Soon &#128293;</a></li>
          </ul>
        </div>
      </div>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Level Up 🚀 the Freelancing</h1>
          </div>
          <div className="header-subtitle">
            <h2>Generate Professional & Unique Proposals For Free!</h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea
            placeholder="Just Paste here the Description of the Project OR the Title of Project - The one who provide more detail about project! Then the Magic Happen :D"
            className="prompt-box"
            value={userInput}
            onChange={onUserChangedText}
          />
        </div>
        <div className="prompt-buttons">
          <a
            className={
              isGenerating ? "generate-button loading" : "generate-button"
            }
            onClick={callGenerateEndpoint}
          >
            <div className="generate">
              {isGenerating ? (
                <span className="loader"></span>
              ) : (
                <p>Generate</p>
              )}
            </div>
          </a>
        </div>
      </div>
      {apiOutput && (
        <div className="output">
          <div className="output-header-container">
            <div className="output-header">
              <h3>Output</h3>
            </div>
          </div>
          <div className="output-content">
            <p>{apiOutput}</p>
          </div>
        </div>
      )}
      <div className="footer">
        <p className="creditbs">Made With Buildspace &#10084;</p>
      </div>
    </div>
  );
};

export default Home;
