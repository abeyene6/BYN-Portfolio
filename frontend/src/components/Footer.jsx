import {
    useEffect,
    useRef,
    useState
} from "react";

import {
    FaLinkedinIn,
    FaGithub
} from "react-icons/fa";

import { MdEmail } from "react-icons/md";

import {
    SiSpringboot,
    SiReact,
    SiPostgresql
} from "react-icons/si";

import Logo from "../assets/Logo.png";


/* ======================================================
   BYN BOT SPRITES
====================================================== */

import normal from "../assets/svg/bynbot/normal.png";
import blink from "../assets/svg/bynbot/Blink.png";

import glanceLeft from "../assets/svg/bynbot/GlanceLeft.png";
import glanceRight from "../assets/svg/bynbot/GlanceRight.png";

import happy from "../assets/svg/bynbot/Happy.png";

import startWave from "../assets/svg/bynbot/StartWave.png";
import halfWave from "../assets/svg/bynbot/HalfWave.png";
import fullWaveHappy from "../assets/svg/bynbot/FullWaveHappy.png";
import halfWaveHappy from "../assets/svg/bynbot/HalfWaveHappy.png";


export default function Footer() {

    /* ==================================================
       REFS
    ================================================== */

    const finaleRef = useRef(null);

    const timersRef = useRef([]);

    const idleLoopRef = useRef(null);


    /* ==================================================
       STATE
    ================================================== */

    const [finaleStarted, setFinaleStarted] =
        useState(false);

    const [botSprite, setBotSprite] =
        useState(happy);

    const [bynIgnited, setBynIgnited] =
        useState(false);


    /* ==================================================
       TIMER HELPERS
    ================================================== */

    const schedule = (callback, delay) => {

        const timer =
            setTimeout(callback, delay);

        timersRef.current.push(timer);

        return timer;
    };


    const clearScheduledTimers = () => {

        timersRef.current.forEach(
            (timer) => clearTimeout(timer)
        );

        timersRef.current = [];
    };


    /* ==================================================
       START ONLY ONCE
    ================================================== */

    useEffect(() => {

        const observer =
            new IntersectionObserver(
                ([entry]) => {

                    if (
                        entry.isIntersecting &&
                        !finaleStarted
                    ) {

                        setFinaleStarted(true);

                        observer.disconnect();
                    }

                },
                {
                    threshold: 0.3
                }
            );


        if (finaleRef.current) {

            observer.observe(
                finaleRef.current
            );
        }


        return () => {

            observer.disconnect();
        };

    }, [finaleStarted]);


    /* ==================================================
       IDLE GOODBYE CYCLE
    ================================================== */

    useEffect(() => {

        if (!finaleStarted) {
            return;
        }


        const runBotCycle = () => {

            setBotSprite(happy);


            /* BLINK #1 */

            schedule(() => {
                setBotSprite(blink);
            }, 700);


            schedule(() => {
                setBotSprite(happy);
            }, 850);


            /* BLINK #2 */

            schedule(() => {
                setBotSprite(blink);
            }, 1450);


            schedule(() => {
                setBotSprite(happy);
            }, 1600);


            /* LOOK AROUND */

            schedule(() => {

                const lookLeft =
                    Math.random() < 0.5;

                setBotSprite(
                    lookLeft
                        ? glanceLeft
                        : glanceRight
                );

            }, 2350);


            schedule(() => {
                setBotSprite(happy);
            }, 3000);


            /* BEGIN WAVE */

            schedule(() => {
                setBotSprite(startWave);
            }, 3700);


            schedule(() => {
                setBotSprite(halfWave);
            }, 3900);


            /* WAVE #1 */

            schedule(() => {
                setBotSprite(fullWaveHappy);
            }, 4150);


            schedule(() => {
                setBotSprite(halfWaveHappy);
            }, 4400);


            /* WAVE #2 */

            schedule(() => {
                setBotSprite(fullWaveHappy);
            }, 4650);


            schedule(() => {
                setBotSprite(halfWaveHappy);
            }, 4900);


            /* LOWER ARM / HAPPY */

            schedule(() => {
                setBotSprite(startWave);
            }, 5150);


            schedule(() => {
                setBotSprite(happy);
            }, 5400);

        };


        runBotCycle();


        /* ONE-TIME BYN IGNITION */

        schedule(() => {
            setBynIgnited(true);
        }, 2500);


        /* KEEP BOT ALIVE */

        idleLoopRef.current =
            setInterval(() => {

                clearScheduledTimers();

                runBotCycle();

            }, 9000);


        return () => {

            clearScheduledTimers();


            if (idleLoopRef.current) {

                clearInterval(
                    idleLoopRef.current
                );

            }

        };

    }, [finaleStarted]);


    return (

        <>

            {/* ==================================================
                FINAL SECTION
            ================================================== */}

            <section
                className="footer-finale"
                ref={finaleRef}
            >

                <div className="footer-finale-inner">


                    {/* TEXT */}

                    <div className="footer-finale-message">


                        <h2 className="footer-whats-next">
                            What Now?
                        </h2>


                        <h2 className="footer-build-next">

                            Let's{" "}

                            <span
                                className={
                                    `footer-byn ${
                                        bynIgnited
                                            ? "footer-byn-ignite"
                                            : ""
                                    }`
                                }
                            >

                                <span className="footer-byn-letter">
                                    B
                                </span>

                                uild{" "}

                                <span className="footer-byn-letter">
                                    Y
                                </span>

                                our{" "}

                                <span className="footer-byn-letter">
                                    N
                                </span>

                                ext

                            </span>

                            .

                        </h2>


                    </div>


                    {/* BYN BOT */}

                    <div className="footer-bynbot">

                        <img
                            src={botSprite}
                            alt="BYN Bot"
                            draggable="false"
                        />

                    </div>


                </div>

            </section>


            {/* ==================================================
                ACTUAL FOOTER BAR
            ================================================== */}

            <footer className="footer">


                {/* LEFT */}

                <div className="footer-left">

                    © 2026 Aaron Beyene

                </div>


                {/* CENTER */}

                <div className="footer-center">


                    <span className="footer-designed">

                        Designed & built by

                        <img
                            src={Logo}
                            alt="AB Logo"
                            className="footer-logo"
                        />

                    </span>


                    <span className="footer-divider">
                        •
                    </span>


                    <span className="footer-tech">

                        <SiSpringboot />

                        <span>
                            Spring Boot
                        </span>

                    </span>


                    <span className="footer-tech">

                        <SiReact />

                        <span>
                            React
                        </span>

                    </span>


                    <span className="footer-tech">

                        <SiPostgresql />

                        <span>
                            PostgreSQL
                        </span>

                    </span>


                </div>


                {/* RIGHT — SOCIAL LINKS */}

                <div className="footer-right">


                    <a
                        className="footer-icon"
                        href="https://github.com/abeyene6"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        title="GitHub"
                    >

                        <FaGithub />

                    </a>


                    <a
                        className="footer-icon"
                        href="https://www.linkedin.com/in/aaron-beyene-b23197271/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        title="LinkedIn"
                    >

                        <FaLinkedinIn />

                    </a>


                    <a
                        className="footer-icon"
                        href="mailto:abeyene6@gatech.edu"
                        aria-label="Email Aaron"
                        title="Email"
                    >

                        <MdEmail />

                    </a>


                </div>


            </footer>

        </>

    );

}