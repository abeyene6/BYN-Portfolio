import { useEffect, useRef, useState } from "react";

import hero from "../assets/hero-bg.png";

// ======================================================
// BYN BOT SPRITES
// ======================================================

import normal from "../assets/svg/bynbot/normal.png";
import blinkSprite from "../assets/svg/bynbot/Blink.png";
import happy from "../assets/svg/bynbot/Happy.png";
import thinking from "../assets/svg/bynbot/Thinking.png";

import glanceLeft from "../assets/svg/bynbot/GlanceLeft.png";
import glanceRight from "../assets/svg/bynbot/GlanceRight.png";

import lookLeftSprite from "../assets/svg/bynbot/LookLeft.png";
import lookRightSprite from "../assets/svg/bynbot/LookRight.png";

import sideProfile from "../assets/svg/bynbot/SideProfile.png";

import fly from "../assets/svg/bynbot/Fly.png";
import flyBack from "../assets/svg/bynbot/FlyBack.png";

import startWave from "../assets/svg/bynbot/StartWave.png";
import halfWave from "../assets/svg/bynbot/HalfWave.png";
import halfWaveHappy from "../assets/svg/bynbot/HalfWaveHappy.png";


function Hero() {

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
    "Hey! I'm BYN Bot. Ask me anything about Aaron, his work, or what he's building.";

  const [displayedText, setDisplayedText] = useState("");
  const [typingResponse, setTypingResponse] = useState(false);

  const typewriterTimer = useRef(null);


  // ======================================================
  // BYN BOT
  // ======================================================

  const [botSprite, setBotSprite] = useState(normal);

  /*
      home
      leaving
      away
      returning
  */
  const [botPosition, setBotPosition] = useState("home");

  /*
      Current side used for wandering.

      left
      right
  */
  const [wanderSide, setWanderSide] = useState("left");

  /*
      Used to mirror directional sprites.
  */
  const [botFlipped, setBotFlipped] = useState(false);

  const [introFinished, setIntroFinished] = useState(false);


  const botPositionRef = useRef("home");
  const wanderSideRef = useRef("left");

  const animationBusy = useRef(false);

  const typingTimer = useRef(null);
  const idleTimer = useRef(null);
  const wanderTimer = useRef(null);
  const awayTimer = useRef(null);

  const animationTimers = useRef([]);


  useEffect(() => {
    botPositionRef.current = botPosition;
  }, [botPosition]);


  useEffect(() => {
    wanderSideRef.current = wanderSide;
  }, [wanderSide]);


  // ======================================================
  // HELPERS
  // ======================================================

  const schedule = (callback, delay) => {

    const timer = setTimeout(callback, delay);

    animationTimers.current.push(timer);

    return timer;
  };


  const clearAnimationTimers = () => {

    animationTimers.current.forEach((timer) => {
      clearTimeout(timer);
    });

    animationTimers.current = [];
  };


  const randomSide = () => {

    return Math.random() < 0.5
      ? "left"
      : "right";
  };


  // ======================================================
  // TYPEWRITER
  // ======================================================

  const typeText = (
    text,
    speed = 28,
    onComplete = null
  ) => {

    clearInterval(typewriterTimer.current);

    setDisplayedText("");
    setTypingResponse(true);

    let index = 0;


    typewriterTimer.current = setInterval(() => {

      index += 1;

      setDisplayedText(
        text.slice(0, index)
      );


      if (index >= text.length) {

        clearInterval(typewriterTimer.current);

        setTypingResponse(false);


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

      clearAnimationTimers();

      clearTimeout(typingTimer.current);
      clearTimeout(idleTimer.current);
      clearTimeout(wanderTimer.current);
      clearTimeout(awayTimer.current);

      clearInterval(typewriterTimer.current);
    };

  }, []);


  // ======================================================
  // INTRO
  // ======================================================

  useEffect(() => {

    animationBusy.current = true;

    setBotSprite(normal);


    schedule(() => {
      setBotSprite(happy);
    }, 700);


    // Raise arm
    schedule(() => {
      setBotSprite(startWave);
    }, 1050);


    schedule(() => {
      setBotSprite(halfWave);
    }, 1275);


    schedule(() => {
      setBotSprite(halfWaveHappy);
    }, 1500);


    // Wave #1
    schedule(() => {
      setBotSprite(halfWave);
    }, 1675);


    schedule(() => {
      setBotSprite(halfWaveHappy);
    }, 1850);


    // Wave #2
    schedule(() => {
      setBotSprite(halfWave);
    }, 2025);


    schedule(() => {
      setBotSprite(halfWaveHappy);
    }, 2200);


    // Lower arm
    schedule(() => {
      setBotSprite(halfWave);
    }, 2425);


    schedule(() => {
      setBotSprite(startWave);
    }, 2650);


    schedule(() => {
      setBotSprite(happy);
    }, 2900);


    // Introduction begins typing
    schedule(() => {

      typeText(
        introMessage,
        25
      );

    }, 3000);


    // Settle
    schedule(() => {

      setBotSprite(normal);

      animationBusy.current = false;

      setIntroFinished(true);

    }, 3350);


  }, []);


  // ======================================================
  // BLINK
  // ======================================================

  const blink = () => {

    animationBusy.current = true;

    setBotSprite(blinkSprite);


    schedule(() => {

      setBotSprite(normal);

      animationBusy.current = false;

    }, 150);
  };


  // ======================================================
  // DOUBLE BLINK
  // ======================================================

  const doubleBlink = () => {

    animationBusy.current = true;

    setBotSprite(blinkSprite);


    schedule(() => {
      setBotSprite(normal);
    }, 110);


    schedule(() => {
      setBotSprite(blinkSprite);
    }, 250);


    schedule(() => {

      setBotSprite(normal);

      animationBusy.current = false;

    }, 380);
  };


  // ======================================================
  // LOOK LEFT
  // ======================================================

  const lookLeft = () => {

    animationBusy.current = true;

    setBotSprite(glanceLeft);


    schedule(() => {
      setBotSprite(lookLeftSprite);
    }, 300);


    schedule(() => {
      setBotSprite(glanceLeft);
    }, 1100);


    schedule(() => {

      setBotSprite(normal);

      animationBusy.current = false;

    }, 1400);
  };


  // ======================================================
  // LOOK RIGHT
  // ======================================================

  const lookRight = () => {

    animationBusy.current = true;

    setBotSprite(glanceRight);


    schedule(() => {
      setBotSprite(lookRightSprite);
    }, 300);


    schedule(() => {
      setBotSprite(glanceRight);
    }, 1100);


    schedule(() => {

      setBotSprite(normal);

      animationBusy.current = false;

    }, 1400);
  };


  // ======================================================
  // QUICK GLANCES
  // ======================================================

  const quickGlanceLeft = () => {

    animationBusy.current = true;

    setBotSprite(glanceLeft);


    schedule(() => {

      setBotSprite(normal);

      animationBusy.current = false;

    }, 500);
  };


  const quickGlanceRight = () => {

    animationBusy.current = true;

    setBotSprite(glanceRight);


    schedule(() => {

      setBotSprite(normal);

      animationBusy.current = false;

    }, 500);
  };


  // ======================================================
  // RANDOM IDLE
  // ======================================================

  useEffect(() => {

    if (!introFinished) {
      return;
    }


    const scheduleNextIdle = () => {

      const delay =
        3000 + Math.random() * 4000;


      idleTimer.current =
        setTimeout(() => {

          if (
            !animationBusy.current &&
            !loading &&
            botPositionRef.current === "home"
          ) {

            const random = Math.random();


            if (random < 0.42) {

              blink();

            }

            else if (random < 0.56) {

              quickGlanceLeft();

            }

            else if (random < 0.70) {

              quickGlanceRight();

            }

            else if (random < 0.82) {

              lookLeft();

            }

            else if (random < 0.94) {

              lookRight();

            }

            else {

              doubleBlink();

            }
          }


          scheduleNextIdle();

        }, delay);
    };


    scheduleNextIdle();


    return () => {

      clearTimeout(
        idleTimer.current
      );
    };

  }, [introFinished, loading]);


  // ======================================================
  // FLY AWAY
  // ======================================================

  const flyAway = () => {

    if (
      animationBusy.current ||
      loading ||
      botPositionRef.current !== "home"
    ) {
      return;
    }


    animationBusy.current = true;


    // Randomly choose left or right.
    const side = randomSide();

    setWanderSide(side);

    wanderSideRef.current = side;


    // ==================================================
    // LEAVING LEFT
    // ==================================================

    if (side === "left") {

      setBotFlipped(false);

      setBotSprite(glanceLeft);


      schedule(() => {

        setBotSprite(
          lookLeftSprite
        );

      }, 300);


      schedule(() => {

        setBotSprite(
          sideProfile
        );

      }, 600);


      schedule(() => {

        // Actual outgoing flight sprite.
        setBotFlipped(false);

        setBotSprite(fly);

        setBotPosition("leaving");

      }, 850);
    }


    // ==================================================
    // LEAVING RIGHT
    // ==================================================

    else {

      setBotFlipped(false);

      setBotSprite(glanceRight);


      schedule(() => {

        setBotSprite(
          lookRightSprite
        );

      }, 300);


      schedule(() => {

        setBotFlipped(true);

        setBotSprite(
          sideProfile
        );

      }, 600);


      schedule(() => {

        // Mirror outgoing Fly.png for right-side travel.
        setBotFlipped(true);

        setBotSprite(fly);

        setBotPosition("leaving");

      }, 850);
    }


    // ==================================================
    // NOW OFFSCREEN
    // ==================================================

    schedule(() => {

      setBotPosition("away");

      animationBusy.current = false;

    }, 1900);
  };


  // ======================================================
  // RETURN HOME
  // ======================================================

  const returnHome = () => {

    const position =
      botPositionRef.current;


    if (
      position === "home" ||
      position === "returning"
    ) {
      return;
    }


    clearTimeout(
      awayTimer.current
    );


    animationBusy.current = true;


    // ==================================================
    // RANDOM RETURN SIDE
    // ==================================================

    /*
      The side he returns from is independent
      of the side he originally left from.

      Examples:

      left -> left
      left -> right
      right -> left
      right -> right
    */

    const returnSide =
      randomSide();


    setWanderSide(returnSide);

    wanderSideRef.current =
      returnSide;


    // ==================================================
    // IMPORTANT:
    // USE FlyBack.png
    // ==================================================

    /*
      This is NOT Fly.png played backward.

      FlyBack.png is the dedicated return-flight
      artwork and remains active during the ENTIRE
      physical flight back onto the screen.
    */

    setBotSprite(flyBack);


    // ==================================================
    // FACE THE CORRECT DIRECTION
    // ==================================================

    /*
      FlyBack.png has one native direction.

      For the opposite side, we mirror the PNG.

      If you notice that the native direction of your
      actual FlyBack artwork is opposite from this,
      simply swap these true/false values.
    */

    if (returnSide === "left") {

      setBotFlipped(false);

    }

    else {

      setBotFlipped(true);

    }


    // ==================================================
    // PLACE HIM OFFSCREEN
    // ==================================================

    /*
      First establish his new random offscreen
      starting position.

      He is already using FlyBack.png here.
    */

    setBotPosition("away");


    /*
      Wait two animation frames.

      This allows the browser to register the
      offscreen position BEFORE we tell him to
      transition home.
    */

    requestAnimationFrame(() => {

      requestAnimationFrame(() => {

        setBotPosition(
          "returning"
        );

      });

    });


    // ==================================================
    // ARRIVES HOME
    // ==================================================

    schedule(() => {

      /*
        Physical flight is now complete.

        Only NOW do we stop using FlyBack.png.
      */

      setBotPosition("home");

      setBotFlipped(false);


      /*
        Start turning toward the user.
      */

      if (returnSide === "left") {

        setBotSprite(
          lookLeftSprite
        );

      }

      else {

        setBotSprite(
          lookRightSprite
        );

      }

    }, 1100);


    // ==================================================
    // FINISH TURN
    // ==================================================

    schedule(() => {

      if (returnSide === "left") {

        setBotSprite(
          glanceLeft
        );

      }

      else {

        setBotSprite(
          glanceRight
        );

      }

    }, 1325);


    // ==================================================
    // HAPPY
    // ==================================================

    schedule(() => {

      setBotSprite(happy);

    }, 1550);


    // ==================================================
    // NEUTRAL
    // ==================================================

    schedule(() => {

      setBotSprite(normal);

      animationBusy.current = false;

    }, 1950);
  };


  // ======================================================
  // RANDOM WANDERING
  // ======================================================

  useEffect(() => {

    if (!introFinished) {
      return;
    }


    const scheduleWander = () => {

      /*
        Roughly every 12–20 seconds,
        BYN Bot gets an opportunity to wander.
      */

      const delay =
        12000 +
        Math.random() * 8000;


      wanderTimer.current =
        setTimeout(() => {

          if (
            !animationBusy.current &&
            !loading &&
            botPositionRef.current === "home"
          ) {

            flyAway();

          }


          scheduleWander();

        }, delay);
    };


    scheduleWander();


    return () => {

      clearTimeout(
        wanderTimer.current
      );
    };

  }, [introFinished, loading]);


  // ======================================================
  // AUTOMATIC RETURN
  // ======================================================

  useEffect(() => {

    if (
      botPosition !== "away"
    ) {
      return;
    }


    /*
      Hang out offscreen for roughly
      5–8 seconds.
    */

    const delay =
      5000 +
      Math.random() * 3000;


    awayTimer.current =
      setTimeout(() => {

        returnHome();

      }, delay);


    return () => {

      clearTimeout(
        awayTimer.current
      );
    };

  }, [botPosition]);


  // ======================================================
  // CHAT FOCUS
  // ======================================================

  const handleFocus = () => {

    /*
      If BYN Bot is currently away,
      summon him.

      returnHome() controls his sprite until
      the return flight is completely finished.
    */

    if (
      botPositionRef.current !== "home"
    ) {

      returnHome();

      return;
    }


    if (loading) {
      return;
    }


    animationBusy.current = true;

    setBotSprite(happy);


    clearTimeout(
      typingTimer.current
    );


    typingTimer.current =
      setTimeout(() => {

        if (
          !loading &&
          botPositionRef.current === "home"
        ) {

          setBotSprite(normal);

          animationBusy.current = false;

        }

      }, 5000);
  };


  // ======================================================
  // USER TYPES
  // ======================================================

  const handleQuestionChange =
    (event) => {

      const value =
        event.target.value;

      setQuestion(value);


      /*
        If he's away, typing summons him.

        IMPORTANT:
        Do not overwrite FlyBack.png while
        he's physically returning.
      */

      if (
        botPositionRef.current !== "home"
      ) {

        returnHome();

        return;
      }


      if (loading) {
        return;
      }


      animationBusy.current = true;

      setBotSprite(happy);


      clearTimeout(
        typingTimer.current
      );


      typingTimer.current =
        setTimeout(() => {

          if (
            !loading &&
            botPositionRef.current === "home"
          ) {

            setBotSprite(normal);

            animationBusy.current = false;

          }

        }, 5000);
    };


  // ======================================================
  // INPUT BLUR
  // ======================================================

  const handleBlur = () => {

    clearTimeout(
      typingTimer.current
    );


    if (
      !loading &&
      botPositionRef.current === "home"
    ) {

      setBotSprite(normal);

      animationBusy.current = false;
    }
  };


  // ======================================================
  // SEND MESSAGE
  // ======================================================

  const sendMessage = async () => {

    if (
      !question.trim() ||
      loading
    ) {
      return;
    }


    /*
      Check whether he's currently away.
    */

    const botWasAway =
      botPositionRef.current !== "home";


    /*
      If he's away, summon him.

      returnHome() keeps FlyBack.png active
      during the flight.
    */

    if (botWasAway) {

      returnHome();

    }


    clearTimeout(
      typingTimer.current
    );

    clearInterval(
      typewriterTimer.current
    );


    setDisplayedText("");

    setLoading(true);


    /*
      Only switch directly into Thinking
      when he's already standing at home.

      If he's flying back, DON'T replace
      FlyBack.png with Thinking.
    */

    if (!botWasAway) {

      animationBusy.current = true;

      setBotSprite(thinking);

    }


    try {

      const response =
        await fetch(
          "http://localhost:8080/api/chat",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              message: question,
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


      setResponseId(
        data.responseId
      );

      setQuestion("");


      /*
        If he's already home when the response
        arrives, show Happy.

        If he's still returning, do NOT interrupt
        the FlyBack animation.
      */

      if (
        botPositionRef.current === "home"
      ) {

        setBotSprite(happy);

      }


      typeText(
        data.message,
        18,
        () => {

          schedule(() => {

            if (
              botPositionRef.current === "home"
            ) {

              setBotSprite(normal);

              animationBusy.current = false;

            }

          }, 700);

        }
      );


    } catch (error) {

      console.error(error);


      const errorMessage =
        "Something went wrong. BYN Bot might need a minute.";


      typeText(
        errorMessage,
        20
      );


      if (
        botPositionRef.current === "home"
      ) {

        setBotSprite(normal);

        animationBusy.current = false;

      }


    } finally {

      setLoading(false);
    }
  };


  // ======================================================
  // ENTER
  // ======================================================

  const handleKeyDown =
    (event) => {

      if (
        event.key === "Enter"
      ) {

        event.preventDefault();

        sendMessage();

      }
    };


  // ======================================================
  // PAGE
  // ======================================================

  return (

    <section id="hero">

      <div className="hero-scene">


        {/* BACKGROUND */}

        <div
          className="hero-workspace"
          style={{
            backgroundImage:
              `url(${hero})`,
          }}
        />


        {/* ==================================================
            BYN BOT
        ================================================== */}

        <div
          className={
            `bynbot ` +
            `bynbot-${botPosition} ` +
            `bynbot-side-${wanderSide}`
          }
        >

          <img
            src={botSprite}
            alt="BYN Bot"

            className={
              `bynbot-sprite ${
                botFlipped
                  ? "bynbot-sprite-flipped"
                  : ""
              }`
            }

            draggable="false"
          />

        </div>


        {/* ==================================================
            TERMINAL + CHAT
        ================================================== */}

        <div className="chat-prompt">


          {/* RESPONSE */}

          {displayedText && (

            <div className="byn-terminal">

              <div className="byn-terminal-header">

                <span className="byn-terminal-name">
                  BYN BOT
                </span>

                <span className="byn-terminal-status">
                  ONLINE
                </span>

              </div>


              <div className="byn-terminal-text">

                <span className="byn-terminal-prefix">
                  &gt;&nbsp;
                </span>

                {displayedText}


                {typingResponse && (

                  <span className="byn-cursor">
                    ▋
                  </span>

                )}

              </div>

            </div>

          )}


          {/* THINKING */}

          {loading &&
            !displayedText && (

            <div className="byn-terminal">

              <div className="byn-terminal-header">

                <span className="byn-terminal-name">
                  BYN BOT
                </span>

                <span className="byn-terminal-status">
                  THINKING
                </span>

              </div>


              <div className="byn-terminal-text">

                <span className="byn-terminal-prefix">
                  &gt;&nbsp;
                </span>

                Thinking

                <span className="byn-cursor">
                  ▋
                </span>

              </div>

            </div>

          )}


          {/* INPUT */}

          <div className="chat-input">

            <input
              type="text"
              placeholder="Ask BYN Bot..."
              value={question}

              onChange={
                handleQuestionChange
              }

              onFocus={
                handleFocus
              }

              onBlur={
                handleBlur
              }

              onKeyDown={
                handleKeyDown
              }

              disabled={loading}
            />


            <button
              onMouseDown={(event) => {
                event.preventDefault();
              }}

              onClick={
                sendMessage
              }

              disabled={loading}

              aria-label="Send message"
            >

              ↑

            </button>

          </div>

        </div>

      </div>

    </section>

  );
}

export default Hero;