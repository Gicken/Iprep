import React from "react";
import Navbar from "../components/navbar/navbar";

function homepage() {
  return (
    <div class="hero is-primary is-fullheight">
      <header className="hero-head">
        <Navbar />
      </header>
      <section class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">iPrep</h1>
          <h2 class="subtitle">FDM's AI powered interviewer!</h2>
        </div>
      </section>
    </div>
  );
}

export default homepage;
