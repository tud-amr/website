---
title: "Multi-Modal MPPI and Active Inference for Reactive Task and Motion Planning"
authors:
    - name: "Yuezhe Zhang"
      url: "https://yuezhezhang.github.io/"
      superscript: "1"
    - name: "Corrado Pezzato"
      url: "https://www.linkedin.com/in/corrado-pezzato/"
      superscript: "1"
    - name: "Elia Trevisan"
      url: "https://www.linkedin.com/in/eliatrevisan/"
      superscript: "1"
    - name: "Chadi Salmi"
      url: "https://c-salmi.github.io/"
      superscript: "1"
    - name: "Carlos Hernández Corbato"
      url: "https://chcorbato.github.io/"
      superscript: "1"
    - name: "Javier Alonso-Mora"
      url: "https://www.autonomousrobots.nl/"
      superscript: "1"
affiliations:
    # - name: "Equal contribution"
    #   superscript: "*"
    - name: "TU Delft"
      superscript: "1"
      url: "https://tudelft.nl"
    # - name: "Wien Opera House"
    #   superscript: "†"
release_date: 2024-06-18 # publication or relevant date, approximated if not sure. Just for display purposes and ordering.
links: # If you have other website for the project, github repos, datasets, etc. put it here. You can also add an icon from https://icons.getbootstrap.com/
    # - name: IEEE Xplore
    #   icon: bi-file-earmark-pdf
    #   url: "https://doi.org/10.1109/LRA.2024.3397083"
    - name: arXiv
      icon: bi-file-earmark-pdf
      url: "https://arxiv.org/abs/2312.02328"
    # - name: Code
    #   icon: bi-github
    #   url: https://github.com/eliatrevisan/biased-mppi
    - name: Video
      icon: bi-youtube
      url: "https://www.youtube.com/watch?v=y2CTgv6hxVI"
---

<!-- <div class="col">
  <h3 align="center"></h3>
  <div class="teaser-video d-flex justify-content-center">
    <div class="ratio ratio-16x9">
      <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
        <source src="{% include fix_link.html link='/assets/images/papers/m3p2i_aip/video_ral.m4v' %}" type="video/mp4">
      </video>
    </div>
  </div>
  <p align="center">
  </p>
</div> -->

<h2> Abstract </h2>
<p align="justify">
Task and Motion Planning (TAMP) has made strides in complex manipulation tasks, yet the execution robustness of the planned solutions remains overlooked. In this work, we
propose a method for reactive TAMP to cope with runtime uncertainties and disturbances. We combine an Active Inference planner (AIP) for adaptive high-level action selection and a
novel Multi-Modal Model Predictive Path Integral controller (M3P2I) for low-level control. This results in a scheme that simultaneously adapts both high-level actions and low-level motions. 
The AIP generates alternative symbolic plans, each linked to a cost function for M3P2I. The latter employs a physics simulator for diverse trajectory rollouts, deriving optimal control
by weighing the different samples according to their cost. This idea enables blending different robot skills for fluid and reactive plan execution, accommodating plan adjustments at both the
high and low levels to cope, for instance, with dynamic obstacles or disturbances that invalidate the current plan. We have tested our approach in simulations and real-world scenarios.
</p>

<h2> Simulation Results of Push and Pull </h2>

<div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-2">
  <div class="col">
    <h3 align="center">Push only using MPPI</h3>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/m3p2i_aip/sim-push-pull/mppi_1corner_push.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    Middle to corner -- success
    </p>
  </div>
  <div class="col">
    <h3 align="center">Push only using MPPI</h3>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/m3p2i_aip/sim-push-pull/mppi_2corners_push.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    Corner to corner -- fail
    </p>
  </div>
</div>

<div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-2">
  <div class="col">
    <h3 align="center">Pull only using MPPI</h3>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/m3p2i_aip/sim-push-pull/mppi_1corner_pull.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    Middle to corner -- fail
    </p>
  </div>
  <div class="col">
    <h3 align="center">Pull only using MPPI</h3>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/m3p2i_aip/sim-push-pull/mppi_2corners_pull.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    Corner to corner -- fail
    </p>
  </div>
</div>

<div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-2">
  <div class="col">
    <h3 align="center">Multi-modal motion using M3P2I</h3>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/m3p2i_aip/sim-push-pull/m3p2i_1corner.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    Middle to corner -- success
    </p>
  </div>
  <div class="col">
    <h3 align="center">Multi-modal motion using M3P2I</h3>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/m3p2i_aip/sim-push-pull/m3p2i_2corners.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    Corner to corner -- success
    </p>
  </div>
</div>

<h2> Simulation Results of Pick and Place </h2>

<div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-2">
  <div class="col">
    <h3 align="center">Reactive pick using MPPI</h3>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/m3p2i_aip/sim-pick-place/tamp_reactive_pick.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    Pick from top
    </p>
  </div>
  <div class="col">
    <h3 align="center">Multi-modal pick using M3P2I</h3>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/m3p2i_aip/sim-pick-place/m3p2i_pickplace.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    Top pick and side pick
    </p>
  </div>
</div>

<div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-2">
  <div class="col">
    <h3 align="center">Multi-modal motion using M3P2I</h3>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/m3p2i_aip/sim-pick-place/m3p2i_pick_with_obs.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    With collision avoidance
    </p>
  </div>
  <div class="col">
    <h3 align="center">Reactive pick and place using RL</h3>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/m3p2i_aip/sim-pick-place/rl_reactive_16.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    Oscillation occurs when introducing disturbance
    </p>
  </div>
</div>

<!-- <div class="row row-cols-1 row-cols-sm-3 row-cols-md-3 g-2">
  <div class="col">
    <h3 align="center">Switching Controller</h3>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/biased_mppi/pendulum_switching.m4v' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    Uses heuristics to switch between an EBC for swingup, an LQR for stabilization, and an LQI for tracking a reference with the arm when the pendulum is at the top equilibrium.
    </p>
  </div>
  <div class="col">
    <h3 align="center">Classic MPPI</h3>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/biased_mppi/pendulum_nobias.m4v' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    Takes 100 samples around a time shifted version of the previous plan.
    </p>
  </div>
  <div class="col">
    <h3 align="center">Biased-MPPI</h3>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/biased_mppi/pendulum_bias.m4v' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    Samples all the ancillary controllers used by the switching controller once, and takes the remaining samples around the previous plan.
    </p>
  </div>
</div> -->


<h2> Real-World Experiments </h2>
<div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-2">
  <div class="col">
    <h3 align="center">Reactive pick place using MPPI</h3>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-4x3">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/m3p2i_aip/real-world/reactive_pick_compress.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center"> 
    </p>
  </div>
  <div class="col">
    <h3 align="center">Multi-modal pick place using M3P2I</h3>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-4x3">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/m3p2i_aip/real-world/m3p2i_1_compress.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    </p>
  </div>
</div>