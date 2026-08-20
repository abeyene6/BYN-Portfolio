import { useEffect, useRef, useState } from "react";
import { HiOutlineDocumentArrowDown } from "react-icons/hi2";

import normal from "../assets/svg/bynbot/normal.png";
import thinking from "../assets/svg/bynbot/Thinking.png";
import happy from "../assets/svg/bynbot/Happy.png";

import glanceRight from "../assets/svg/bynbot/GlanceRight.png";
import lookRightSprite from "../assets/svg/bynbot/LookRight.png";
import sideProfile from "../assets/svg/bynbot/SideProfile.png";
import flyBack from "../assets/svg/bynbot/FlyBack.png";


function About() {

  const aboutRef = useRef(null);
  const inputRef = useRef(null);
  const typewriterTimer = useRef(null);
  const animationTimers = useRef([]);


  // ======================================================
  // SECTION / BOT
  // ======================================================

  const [sectionVisible, setSectionVisible] = useState(false);

  const [botSprite, setBotSprite] = useState(flyBack);
  const [botSettled, setBotSettled] = useState(false);


  // ======================================================
  // CHAT
  // ======================================================

  const [question, setQuestion] = useState("");

  const [responseId, setResponseId] = useState(null);

  const [loading, setLoading] = useState(false);


  // ======================================================
  // TERMINAL
  // ======================================================

  const introMessage =
    "You found the About section. I can probably tell you more than he will.";

  const [displayText, setDisplayText] = useState("");

  /*
      intro
      ready
      question
      thinking
      response
  */
  const [mode, setMode] = useState("intro");

  const [terminalKey, setTerminalKey] = useState(0);


  // ======================================================
  // TIMER HELPER
  // ======================================================

  const schedule = (callback, delay) => {

    const timer = setTimeout(callback, delay);

    animationTimers.current.push(timer);

    return timer;

  };


  // ======================================================
  // TYPEWRITER
  // ======================================================

  const typeText = (
    text,
    speed = 22,
    onComplete = null
  ) => {

    clearInterval(typewriterTimer.current);

    setDisplayText("");

    let index = 0;


    typewriterTimer.current = setInterval(() => {

      index += 1;

      setDisplayText(
        text.slice(0, index)
      );


      if (index >= text.length) {

        clearInterval(typewriterTimer.current);

        if (onComplete) {
          onComplete();
        }

      }

    }, speed);

  };


  // ======================================================
  // CLEANUP
  // ======================================================

  useEffect(() => {

    return () => {

      animationTimers.current.forEach((timer) => {
        clearTimeout(timer);
      });

      clearInterval(typewriterTimer.current);

    };

  }, []);


  // ======================================================
  // WATCH FOR ABOUT SECTION
  // ======================================================

  useEffect(() => {

    const observer = new IntersectionObserver(
      ([entry]) => {

        if (entry.isIntersecting) {

          /*
              This also triggers the BYN glow.

              Because the observer disconnects immediately,
              the glow only starts once.
          */
          setSectionVisible(true);

          observer.disconnect();

        }

      },
      {
        threshold: 0.35
      }
    );


    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }


    return () => {
      observer.disconnect();
    };

  }, []);


  // ======================================================
  // BYN BOT ARRIVES
  // ======================================================

  useEffect(() => {

    if (!sectionVisible) {
      return;
    }


    setBotSprite(flyBack);

    setBotSettled(false);


    // ------------------------------------------------------
    // ARRIVE SIDEWAYS
    // ------------------------------------------------------

    schedule(() => {

      setBotSprite(sideProfile);

    }, 1400);


    // ------------------------------------------------------
    // BEGIN TURNING
    // ------------------------------------------------------

    schedule(() => {

      setBotSprite(lookRightSprite);

    }, 1550);


    schedule(() => {

      setBotSprite(glanceRight);

    }, 1725);


    // ------------------------------------------------------
    // SETTLE FORWARD
    // ------------------------------------------------------

    schedule(() => {

      setBotSprite(normal);

      setBotSettled(true);

    }, 1950);


    // ------------------------------------------------------
    // TERMINAL INTRO
    // ------------------------------------------------------

    schedule(() => {

      setTerminalKey((current) => current + 1);

      setMode("intro");


      typeText(
        introMessage,
        25,
        () => {

          setMode("ready");

        }
      );

    }, 2100);


  }, [sectionVisible]);


  // ======================================================
  // FOCUS INPUT WHEN READY
  // ======================================================

  useEffect(() => {

    if (mode !== "ready") {
      return;
    }


    const focusTimer = setTimeout(() => {

      inputRef.current?.focus();

    }, 100);


    return () => {

      clearTimeout(focusTimer);

    };

  }, [mode]);


  // ======================================================
  // USER TYPES
  // ======================================================

  const handleQuestionChange = (event) => {

    setQuestion(event.target.value);


    if (!loading && botSettled) {

      setBotSprite(happy);

    }

  };


  // ======================================================
  // SEND MESSAGE
  // ======================================================

  const sendMessage = async () => {

    const trimmedQuestion =
      question.trim();


    if (
      !trimmedQuestion ||
      loading
    ) {
      return;
    }


    clearInterval(
      typewriterTimer.current
    );


    // ------------------------------------------------------
    // SHOW USER QUESTION
    // ------------------------------------------------------

    setQuestion("");

    setDisplayText(trimmedQuestion);

    setMode("question");


    await new Promise((resolve) =>
      setTimeout(resolve, 400)
    );


    // ------------------------------------------------------
    // THINKING
    // ------------------------------------------------------

    setLoading(true);

    setDisplayText("Thinking");

    setMode("thinking");

    setBotSprite(thinking);


    try {

      const response =
        await fetch(
          "https://byn-portfolio-api.onrender.com/api/chat",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({

              message:
                trimmedQuestion,

              previousResponseId:
                responseId,

            }),
          }
        );


      if (!response.ok) {

        throw new Error(
          "Failed to get a response from BYN Bot."
        );

      }


      const data =
        await response.json();


      // ------------------------------------------------------
      // SAVE CONVERSATION
      // ------------------------------------------------------

      setResponseId(
        data.responseId
      );


      await new Promise((resolve) =>
        setTimeout(resolve, 300)
      );


      // ------------------------------------------------------
      // BOT RESPONSE
      // ------------------------------------------------------

      setLoading(false);

      setBotSprite(happy);

      setMode("response");


      setTerminalKey(
        (current) => current + 1
      );


      typeText(
        data.message,
        18,
        () => {

          setMode("ready");


          schedule(() => {

            setBotSprite(normal);

          }, 700);

        }
      );


    }

    catch (error) {

      console.error(error);


      setLoading(false);

      setBotSprite(normal);

      setMode("response");


      setTerminalKey(
        (current) => current + 1
      );


      typeText(
        "Something went wrong. BYN Bot might need a minute.",
        20,
        () => {

          setMode("ready");

        }
      );

    }

  };


  // ======================================================
  // ENTER
  // ======================================================

  const handleSubmit = (event) => {

    event.preventDefault();

    sendMessage();

  };


  // ======================================================
  // PAGE
  // ======================================================

  return (

    <section
      id="about"
      ref={aboutRef}
    >

      <div className="about-card">


        {/* ==================================================
            LEFT
        ================================================== */}

        <div className="about-left">

          <p className="about-eyebrow">
            // ABOUT ME
          </p>


          <div className="about-description">


            {/* ==================================================
                NAME + BYN GLOW

                B / Y / N now use the classes your existing
                CSS animation is expecting.
            ================================================== */}

            <p className="about-intro">

              Hi, I'm Aaron{" "}

              <span
                className={
                  `byn-name ${
                    sectionVisible
                      ? "byn-ignite"
                      : ""
                  }`
                }
              >

                <span className="byn-letter">
                  B
                </span>

                e

                <span className="byn-letter">
                  y
                </span>

                e

                <span className="byn-letter">
                  n
                </span>

                e

              </span>

              .

            </p>


            {/* ==================================================
                PARAGRAPH 1

                textIndent gives you the visual equivalent
                of several spaces at the beginning.
            ================================================== */}

            <p
              className="about-paragraph"
              style={{
                textIndent: "2.5rem"
              }}
            >

              I'm a new grad from Georgia Tech. The degree is done,
              but the job's not finished - Kobe. There's a long way to go,
              and there's a lot to learn. But that just means there's
              a lot to build.

            </p>


            {/* ==================================================
                PARAGRAPH 2
            ================================================== */}

            <p
              className="about-paragraph"
              style={{
                textIndent: "2.5rem"
              }}
            >

              Me and BYN Bot don't know what's next, but you don't
              need to know what's next to keep building. If you like
              what you see, feel free to reach out. Maybe we can build your next.

            </p>

          </div>


          {/* ==================================================
              RESUME
          ================================================== */}

          <div className="about-buttons">

            <a
              className="resume-button"
              href="/Aaron_Beyene_Resume.pdf"
              target="_blank"
              rel="noreferrer"
            >

              <HiOutlineDocumentArrowDown />

              <span>
                Resume
              </span>

            </a>

          </div>

        </div>


        {/* ==================================================
            RIGHT
        ================================================== */}

        <div className="about-right">


          {/* ==================================================
              BYN BOT
          ================================================== */}

          {sectionVisible && (

            <div className="about-bynbot-wrap">

              <img
                src={botSprite}
                alt="BYN Bot"
                draggable="false"

                className={
                  botSettled
                    ? "about-bynbot about-bynbot-settled"
                    : "about-bynbot"
                }
              />

            </div>

          )}


          {/* ==================================================
              TERMINAL
          ================================================== */}

          {sectionVisible && (

            <div
              key={terminalKey}
              className="about-byn-terminal"
            >


              {/* ==============================================
                  HEADER
              ============================================== */}

              <div className="about-terminal-header">

                <span
                  className="about-terminal-dot"
                />

                <span>
                  BYN BOT
                </span>

              </div>


              {/* ==============================================
                  SINGLE TERMINAL LINE
              ============================================== */}

              <form
                className="about-terminal-line"
                onSubmit={handleSubmit}
              >


                {/* ONLY ONE > */}

                <span className="about-terminal-prefix">
                  &gt;
                </span>


                {/* ============================================
                    USER MESSAGE
                ============================================ */}

                {mode === "question" && (

                  <span className="about-terminal-user-message">

                    {displayText}

                  </span>

                )}


                {/* ============================================
                    THINKING
                ============================================ */}

                {mode === "thinking" && (

                  <span className="about-terminal-thinking">

                    {displayText}

                    <span className="about-terminal-cursor">
                      ▋
                    </span>

                  </span>

                )}


                {/* ============================================
                    INTRO / RESPONSE / READY
                ============================================ */}

                {(
                  mode === "intro" ||
                  mode === "response" ||
                  mode === "ready"
                ) && (

                  <span className="about-terminal-conversation">


                    {/* BOT TEXT */}

                    <span className="about-terminal-text">

                      {displayText}

                    </span>


                    {/* BOT TYPING CURSOR */}

                    {(
                      mode === "intro" ||
                      mode === "response"
                    ) && (

                      <span className="about-terminal-cursor">
                        ▋
                      </span>

                    )}


                    {/* INLINE INPUT */}

                    {mode === "ready" && (

                      <input
                        ref={inputRef}

                        className="about-terminal-inline-input"

                        type="text"

                        value={question}

                        onChange={handleQuestionChange}

                        placeholder="Type here..."

                        autoComplete="off"

                        aria-label="Ask BYN Bot"
                      />

                    )}

                  </span>

                )}

              </form>

            </div>

          )}

        </div>

      </div>

    </section>

  );

}


export default About;