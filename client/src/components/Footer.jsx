import classes from "./Footer.module.css";

export default function Footer() {
  return (
    <footer>
      <div className={classes.sources}>
        <p>
          Background image by{" "}
          <a href="https://unsplash.com/photos/black-and-gray-escalator-inside-building-MsCgmHuirDo">
            Sven Mieke
          </a>{" "}
          from <a href="https://unsplash.com/">Unsplash</a>
        </p>
        <p>
          Icons from <a href="https://pictogrammers.com/">Pictogrammers</a>
        </p>
      </div>
      <a href="https://github.com/Andrij-Kolomijec">
        <img
          className={classes.github}
          src="/github.svg"
          alt="GitHub Icon"
          title="More of my work"
        />
      </a>
    </footer>
  );
}
