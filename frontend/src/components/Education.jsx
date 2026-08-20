import { useEffect, useRef, useState } from "react";

function Education() {
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  const [hasStarted, setHasStarted] = useState(false);

  const [command, setCommand] = useState("");
  const [lines, setLines] = useState([]);

  const [isFinished, setIsFinished] = useState(false);

  // ======================================================
  // BYN BOT CHAT
  // ======================================================

  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const [loading, setLoading] = useState(false);

  /*
      Keeps follow-up questions connected
      to the same BYN Bot conversation.
  */
  const [responseId, setResponseId] = useState(null);

  /*
      Little terminal hint before the visitor types.
  */
  const terminalHint =
    "Let's chat..";


  // ======================================================
  // WATCH FOR EDUCATION SECTION
  // ======================================================

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          !hasStarted
        ) {
          setHasStarted(true);

          observer.disconnect();
        }
      },
      {
        threshold: 0.35,
      }
    );

    if (terminalRef.current) {
      observer.observe(
        terminalRef.current
      );
    }

    return () =>
      observer.disconnect();

  }, [hasStarted]);


  // ======================================================
  // ORIGINAL TERMINAL BOOT SEQUENCE
  // ======================================================

  useEffect(() => {
    if (!hasStarted) return;

    let cancelled = false;


    const sleep = (ms) =>
      new Promise((resolve) =>
        setTimeout(resolve, ms)
      );


    const typeText = async (
      text,
      setter,
      minSpeed = 45,
      maxSpeed = 85
    ) => {
      for (
        let i = 0;
        i < text.length;
        i++
      ) {
        if (cancelled) return;

        setter(
          (current) =>
            current + text[i]
        );

        const randomSpeed =
          Math.floor(
            Math.random() *
              (
                maxSpeed -
                minSpeed +
                1
              )
          ) + minSpeed;

        await sleep(randomSpeed);
      }
    };


    const addTerminalLine =
      async (
        text,
        className = "",
        speed = 18
      ) => {
        const id =
          `${Date.now()}-${Math.random()}`;

        setLines((current) => [
          ...current,
          {
            id,
            text: "",
            className,
          },
        ]);


        for (
          let i = 0;
          i < text.length;
          i++
        ) {
          if (cancelled) return;

          setLines((current) =>
            current.map((line) =>
              line.id === id
                ? {
                    ...line,

                    text:
                      line.text +
                      text[i],
                  }
                : line
            )
          );

          await sleep(speed);
        }
      };


    const runTerminal =
      async () => {
        await sleep(500);


        await typeText(
          "./education.profile",
          setCommand,
          55,
          105
        );


        await sleep(500);


        await addTerminalLine(
          "[1/3] Initializing profile...",
          "",
          12
        );


        await sleep(180);


        await addTerminalLine(
          "[2/3] Loading education records...",
          "",
          10
        );


        await sleep(120);


        await addTerminalLine(
          "[3/3] Verifying status...",
          "",
          9
        );


        await sleep(350);


        await addTerminalLine(
          "[✓] Profile loaded successfully",
          "terminal-success",
          16
        );


        await sleep(450);


        setLines((current) => [
          ...current,

          {
            id: "divider",
            type: "divider",
          },
        ]);


        await sleep(250);


        setLines((current) => [
          ...current,

          {
            id: "institution",
            type: "data",
            key: "Institution",
            value:
              "Georgia Institute of Technology",
          },

          {
            id: "degree",
            type: "data",
            key: "Degree",
            value:
              "B.S. Computer Science",
          },

          {
            id: "status",
            type: "data",
            key: "Status",
            value: "Completed ✓",

            valueClass:
              "terminal-success",
          },

          {
            id: "years",
            type: "data",
            key: "Years",
            value: "2022 – 2026",
          },

          {
            id: "build",
            type: "data",
            key: "Current Build",
            value: "BYN Bot v1.0",
          },

          {
            id: "bot-status",
            type: "data",
            key: "BYN Bot",
            value: "ONLINE",

            valueClass:
              "terminal-success",
          },
        ]);


        await sleep(500);


        if (!cancelled) {
          setIsFinished(true);
        }
      };


    runTerminal();


    return () => {
      cancelled = true;
    };

  }, [hasStarted]);


  // ======================================================
  // AUTO FOCUS
  // ======================================================

  useEffect(() => {
    if (
      !isFinished ||
      loading
    ) {
      return;
    }


    const timer =
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);


    return () =>
      clearTimeout(timer);

  }, [
    isFinished,
    loading,
  ]);


  // ======================================================
  // SEND MESSAGE
  // ======================================================

  const sendMessage =
    async () => {
      const trimmedQuestion =
        question.trim();


      if (
        !trimmedQuestion ||
        loading
      ) {
        return;
      }


      // ==================================================
      // USER MESSAGE
      // ==================================================

      const userMessage = {
        id:
          `user-${Date.now()}`,

        role: "user",

        text:
          trimmedQuestion,
      };


      setChatHistory(
        (current) => [
          ...current,
          userMessage,
        ]
      );


      setQuestion("");

      setLoading(true);


      try {
        // ================================================
        // REAL BYN BOT API
        // ================================================

        const response =
          await fetch(
            "https://byn-portfolio-api.onrender.com/api/chat",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify({
                  message:
                    trimmedQuestion,

                  previousResponseId:
                    responseId,
                }),
            }
          );


        if (!response.ok) {
          throw new Error(
            "Failed to get BYN Bot response."
          );
        }


        const data =
          await response.json();


        // ================================================
        // PRESERVE CONVERSATION MEMORY
        // ================================================

        setResponseId(
          data.responseId
        );


        // ================================================
        // BYN BOT RESPONSE
        // ================================================

        const botMessage = {
          id:
            `bot-${Date.now()}`,

          role: "bot",

          text:
            data.message,
        };


        setChatHistory(
          (current) => [
            ...current,
            botMessage,
          ]
        );

      }

      catch (error) {
        console.error(error);


        setChatHistory(
          (current) => [
            ...current,

            {
              id:
                `error-${Date.now()}`,

              role: "bot",

              text:
                "Something went wrong. Try asking me again.",
            },
          ]
        );

      }

      finally {
        setLoading(false);
      }
    };


  // ======================================================
  // ENTER
  // ======================================================

  const handleSubmit =
    (event) => {
      event.preventDefault();

      sendMessage();
    };


  // ======================================================
  // FOCUS TERMINAL WHEN PROMPT IS CLICKED
  // ======================================================

  const focusTerminalInput =
    () => {
      if (loading) return;

      inputRef.current?.focus();
    };


  // ======================================================
  // PAGE
  // ======================================================

  return (
    <section id="education">

      <h2 className="education-label">
        // E D U C A T I O N
      </h2>


      <div
        className="education-terminal"
        ref={terminalRef}
      >

        {/* ==================================================
            TERMINAL HEADER
        ================================================== */}

        <div className="terminal-header">

          <div className="terminal-buttons">

            <span className="terminal-dot red" />

            <span className="terminal-dot yellow" />

            <span className="terminal-dot green" />

          </div>

        </div>


        {/* ==================================================
            TERMINAL BODY
        ================================================== */}

        <div className="terminal-body">

          {hasStarted && (
            <>

              {/* ==============================================
                  INITIAL COMMAND
              ============================================== */}

              <p className="terminal-command-line">

                <span className="terminal-user">
                  aaron@byn:~$
                </span>

                {" "}

                <span>
                  {command}
                </span>


                {!isFinished &&
                  lines.length === 0 && (

                    <span className="terminal-live-cursor" />

                  )}

              </p>


              {/* ==============================================
                  BOOT OUTPUT
              ============================================== */}

              {lines.map((line) => {

                if (
                  line.type ===
                  "divider"
                ) {
                  return (
                    <hr
                      key={line.id}
                    />
                  );
                }


                if (
                  line.type ===
                  "data"
                ) {
                  return (

                    <p key={line.id}>

                      <span className="terminal-key">
                        {line.key}
                      </span>

                      <span className="terminal-colon">
                        :
                      </span>

                      <span
                        className={
                          line.valueClass ||
                          ""
                        }
                      >
                        {line.value}
                      </span>

                    </p>

                  );
                }


                return (

                  <p
                    key={line.id}

                    className={
                      line.className ||
                      ""
                    }
                  >

                    {line.text}


                    {!isFinished &&
                      line.id ===
                        lines[
                          lines.length -
                          1
                        ]?.id && (

                        <span className="terminal-live-cursor" />

                      )}

                  </p>

                );
              })}


              {/* ==============================================
                  CHAT MODE
              ============================================== */}

              {isFinished && (
                <>

                  <br />


                  <hr className="terminal-chat-divider" />


                  {/* ==========================================
                      CHAT HISTORY
                  ========================================== */}

                  <div className="terminal-chat-history">

                    {chatHistory.map(
                      (message) => (

                        <div
                          key={
                            message.id
                          }

                          className={
                            message.role ===
                            "user"

                              ? "terminal-chat-message terminal-chat-message-user"

                              : "terminal-chat-message terminal-chat-message-bot"
                          }
                        >

                          {message.role ===
                            "user" ? (

                            <>
                              <span className="terminal-user">
                                aaron@byn:~$
                              </span>

                              {" "}

                              <span className="terminal-user-text">
                                {
                                  message.text
                                }
                              </span>
                            </>

                          ) : (

                            <>
                              <span className="terminal-bot-name">
                                BYN Bot:
                              </span>

                              {" "}

                              <span className="terminal-bot-text">
                                {
                                  message.text
                                }
                              </span>
                            </>

                          )}

                        </div>

                      )
                    )}


                    {/* ========================================
                        THINKING
                    ======================================== */}

                    {loading && (

                      <div className="terminal-chat-message terminal-chat-message-bot">

                        <span className="terminal-bot-name">
                          BYN Bot:
                        </span>

                        {" "}

                        <span className="terminal-thinking-text">
                          Thinking
                        </span>

                        <span className="terminal-live-cursor" />

                      </div>

                    )}

                  </div>


                  {/* ==========================================
                      LIVE TERMINAL PROMPT

                      Browser caret is invisible.
                      Our custom thick cursor is the ONLY
                      visible typing cursor.
                  ========================================== */}

                  {!loading && (

                    <form
                      className="terminal-chat-input-line"

                      onSubmit={
                        handleSubmit
                      }

                      onClick={
                        focusTerminalInput
                      }
                    >

                      <span className="terminal-user">
                        aaron@byn:~$
                      </span>


                      <span
                        className="terminal-chat-input-shell"

                        style={{
                          position:
                            "relative",

                          display:
                            "inline-flex",

                          alignItems:
                            "center",

                          flex: 1,

                          minWidth: 0,

                          marginLeft:
                            "8px",

                          cursor:
                            "text",
                        }}
                      >

                        {/* ====================================
                            REAL INPUT

                            Invisible text/caret.
                            Still handles all keyboard input.
                        ==================================== */}

                        <input
                          ref={inputRef}

                          type="text"

                          value={
                            question
                          }

                          onChange={
                            (event) =>
                              setQuestion(
                                event.target
                                  .value
                              )
                          }

                          autoComplete="off"

                          aria-label="Ask BYN Bot"

                          style={{
                            position:
                              "absolute",

                            inset: 0,

                            width: "100%",

                            height:
                              "100%",

                            opacity: 0,

                            caretColor:
                              "transparent",

                            cursor:
                              "text",
                          }}
                        />


                        {/* ====================================
                            VISUAL TERMINAL TEXT

                            This is what visitor actually sees.
                        ==================================== */}

                        {question ? (

                          <span
                            className="terminal-user-text"
                            style={{
                              whiteSpace:
                                "pre-wrap",

                              overflowWrap:
                                "anywhere",
                            }}
                          >
                            {question}
                          </span>

                        ) : (

                          <span
                            className="terminal-input-hint"

                            style={{
                              color:
                                "rgba(255,255,255,.38)",
                            }}
                          >
                            {terminalHint}
                          </span>

                        )}


                        {/* ====================================
                            THE ONE CUSTOM TERMINAL CURSOR
                        ==================================== */}

                        <span
                          className="terminal-cursor"

                          aria-hidden="true"
                        />

                      </span>

                    </form>

                  )}

                </>
              )}

            </>
          )}

        </div>

      </div>

    </section>
  );
}


export default Education;