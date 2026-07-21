---
title: "Strategizing at Speed: A Learned Model Predictive Game for Multi-Agent Drone Racing"
authors:
  - name: "Andrei-Carlo Papuc"
    url: "https://andreicarlo.com/"
    superscript: "1"
  - name: "Lasse Peters"
    url: "https://lasse-peters.net/"
    superscript: "1"
  - name: "Sihao Sun"
    url: "https://sihaosun.github.io/"
    superscript: "1"
  - name: "Laura Ferranti"
    url: "https://r2clab.com/"
    superscript: "1"
  - name: "Javier Alonso-Mora"
    url: "https://autonomousrobots.nl/people/"
    superscript: "1"
affiliations:
  - name: "TU Delft"
    superscript: "1"
    url: "https://tudelft.nl"
  # - name: "Equal Contributions"
  #   superscript: "*"
release_date: 2026-06-15 # publication or relevant date, approximated if not sure. Just for display purposes and ordering.
links: # If you have other website for the project, github repos, datasets, etc. put it here. You can also add an icon from https://icons.getbootstrap.com/
  - name: Paper
    icon: bi-file-earmark-pdf
    url: "/assets/files/publications/26-papuc-ral.pdf"
  - name: Code
    icon: bi-github
    url: "https://github.com/andrejcarlo/ral26_strategizing_at_speed/"
related_project_id: "secure"
# hidden: true # Only accessible via direct link, not listed or indexed
sitemap: false # Exclude from sitemap
---

<style>
  ol.figure-list {
    list-style-type: none;
    counter-reset: list-counter;
    padding-left: 10px;
  }
  ol.figure-list li::before {
    counter-increment: list-counter;
    content: "(" counter(list-counter, lower-alpha) ")";
    padding-right: 8px;
  }
</style>

<hr/>


<div class="ratio ratio-16x9">
    <iframe src="https://www.youtube.com/embed/JalS5aQ7LWA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>


<h2 align="center"><u>Abstract</u></h2>
  <p align="justify">
    Autonomous drone racing pushes the boundaries of high-speed motion planning and multi-agent strategic decision-making. Success in this domain requires drones not only to navigate at their limits but also to anticipate and counteract competitors' actions. In this letter, we study a fundamental question that arises in this domain: how deeply should an agent strategize before taking an action? To this end, we compare two planning paradigms: the Model Predictive Game (MPG), which finds interaction-aware strategies at the expense of longer computation times, and contouring Model Predictive Control (MPC), which computes strategies rapidly but does not reason about interactions. We perform extensive experiments to study this trade-off, revealing that MPG outperforms MPC at moderate velocities but loses its advantage at higher speeds due to latency. To address this shortcoming, we propose a Learned Model Predictive Game (LMPG) approach that amortizes model predictive gameplay to reduce latency. In both simulation and hardware experiments, we benchmark our approach against MPG and MPC in head-to-head races, finding that LMPG outperforms both baselines.
  </p>



<h2 align="center"><u>Learned Model Predictive Game (LMPG)</u></h2>
<p align="justify">
  To get the strategic benefits of game-theoretic planning without paying its latency cost online, we introduce <b>LMPG</b>. LMPG amortizes the computation of receding-horizon Nash equilibria by training a neural network, for each player, that directly predicts the Nash strategy from the current race state. A differentiable trajectory-optimization layer sits on top of the network to guarantee that predicted strategies remain dynamically feasible, and the whole pipeline is trained end-to-end via simultaneous gradient play, differentiating through the KKT conditions of the underlying game.
</p>
<p align="justify">
  The result is a policy that runs in about <b>3.5&nbsp;ms</b> &mdash; a <b>14&times;</b> speedup over solving the game online &mdash; while retaining (and in our experiments, even exceeding) the quality of the non-amortized MPG solutions it was trained to imitate.
</p>

<!-- <div class="text-center my-4">
  <img src="/assets/images/papers/26-papuc-ral/methodology_lmpg_v10.png" class="img-fluid rounded" alt="LMPG pipeline: observation encoding, neural network with differentiable trajectory optimization layer, and hierarchical low-level control">
  <p class="text-muted mt-2"><small>LMPG pipeline: race-relative observations are fed to a neural network that embeds a differentiable trajectory optimizer as its final layer, predicting a feasible receding-horizon strategy. A linear MPC (simulation) or a geometric + INDI controller (hardware) tracks this strategy at the low level.</small></p>
</div> -->

<div class="text-center my-4">
  <img src="/assets/images/papers/26-papuc-ral/methodology_lmpg_v10.png" class="img-fluid rounded" alt="LMPG pipeline: observation encoding, neural network with differentiable trajectory optimization layer, and hierarchical low-level control">
  <p class="text-muted mt-2"><small><b>(A)</b> Composition of the observations used by the neural network employed by LMPG.
<b>(B)</b> Pipeline overview of LMPG: observations are fed into a neural network that embeds differentiable trajectory optimization as a final layer to predict a receding-horizon strategy. 
<b>(C)</b> A linear MPC tracks the reference strategy via feedback linearization. In simulation, the output of this controller is directly fed into the simulated dynamics.
<b>(D)</b> Hierarchical control scheme employed in hardware experiments: using the Agilicious framework, the drone tracks the receding-horizon strategy by combining a geometric controller with incremental nonlinear dynamic inversion (INDI).</small></p>
</div>



  
<h2 align="center"><u>Results</u></h2>
<p align="justify">
  We benchmark LMPG against MPG and two predict-then-plan MPC variants (constant-velocity and strategy-optimal opponent prediction) in round-robin tournaments across four race tracks, under both idealized (synchronous) and realistic (asynchronous, latency-exposed) execution modes, in simulation and on physical quadrotors.
</p>
<ol class="figure-list">
  <li>With computation time removed from the equation, MPG wins every race against contouring MPC &mdash; game-theoretic reasoning is decisively better when it's free.</li>
  <li>Once solver latency is allowed to affect the race, MPG's edge shrinks at high speed and disappears at high speed: its solve time can spike past 2&nbsp;s in interactive scenarios, causing off-track drifts.</li>
  <li>LMPG matches the solve time of the cheapest MPC baseline while reliably beating <i>all</i> baselines &mdash; MPC (cvel), MPC (sopt), and MPG &mdash; in the challenging high-speed, asynchronous setting.</li>
  <li>A single LMPG policy trained across four tracks generalizes zero-shot to unseen tracks, still outperforming the strategy-optimal MPC baseline.</li>
  <li>These trends transfer from simulation to real hardware: in real flight tournaments, LMPG dominates head-to-head races against MPG and MPC, including zero-shot on an unseen track.</li>
</ol>

<div class="text-center my-4">
  <img src="/assets/images/papers/26-papuc-ral/banner_new_rebuttal_mpc_variants_01.png" class="img-fluid rounded" alt="Head-to-head win-rate results across simulation and real-world flight tournaments, plus latency comparison">
  <p class="text-muted mt-2"><small>Head-to-head racing results in simulation and real-life. <b>(A)</b>, <b>(B)</b> Win rates for <b>MPC</b> (cvel) vs. <b>MPG</b> in a simulated tournament
with synchronous <b>(A)</b> and asynchronous <b>(B)</b> execution modes. <b>(D)</b>, <b>(E)</b> Win rates for <b>LMPG</b> vs. <b>MPC</b>/<b>MPG</b> in a simulated tournament
with synchronous <b>(D)</b> and asynchronous <b>(E)</b> execution modes. <b>(G)</b>, <b>(H)</b> Zero-shot win rates for <b>LMPG</b>-<b>GEN</b> vs. <b>MPC</b> (sopt) in a simulated
tournament with synchronous <b>(G)</b> and asynchronous <b>(H)</b> execution modes. <b>(C)</b>, <b>(F)</b> Win rates for the real-world flight tournament on the
lemniscate track. <b>(I)</b> Zero-shot win rates for the real-world flight tournament on the trefoil track. <b>(J)</b> Trajectory planning time distributions
for all methods. <b>(K)</b> Low level system latencies distributions encountered during real-life experiments. <b>(L)</b> Vizualization of a single real-life
lap of <b>LMPG</b>-<b>GEN</b> deployed zero-shot vs <b>MPC</b> (sopt) on the trefoil track.</small></p>
</div>


<h2 align="center"><u>Acknowledgments</u></h2>
<p align="justify">
  This work was supported by the Office of Naval Research Global under Grant N62909-25-12027 (Project SECURE) and by the Dutch Research Council (NWO) under Grant no. 20256 (Project Accurate Aerial Manipulation).
</p>
