---
title: "Biased-MPPI: Informing Sampling-Based Model Predictive Control by Fusing Ancillary Controllers"
authors:
    - name: "Elia Trevisan"
      # url: "https://andreumatoses.github.io/"
      superscript: "1"
    - name: "Javier Alonso-Mora"
      # url: "https://andreumatoses.github.io/"
      superscript: "1"
affiliations:
    # - name: "Equal contribution"
    #   superscript: "*"
    - name: "TU Delft"
      superscript: "1"
      url: "https://tudelft.nl"
    # - name: "Wien Opera House"
    #   superscript: "†"
release_date: 2024-03-18 # publication or relevant date, approximated if not sure. Just for display purposes and ordering.
links: # If you have other website for the project, github repos, datasets, etc. put it here. You can also add an icon from https://icons.getbootstrap.com/
    - name: arXiv
      icon: bi-file-earmark-pdf
      url: "https://arxiv.org/abs/2401.09241"
    - name: Code available after publication
      icon: bi-github
    - name: Video
      icon: bi-youtube
      url: "https://youtu.be/1ZbbcfFgpxc"
---

<div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-2">
  <div class="col">
    <h3 align="center">Classic MPPI</h3>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/biased_mppi/no_bias8_with_samples.m4v' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    MPPI usually only takes samples around a previous plan. Here, the enviroment changes in an unexpected way. This results in all samples being in collision, thus computing a plan that also collides.
    </p>
  </div>
  <div class="col">
    <h3 align="center">Biased-MPPI</h3>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/biased_mppi/bias8_with_samples.m4v' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    Biased-MPPI can sample from multiple ancillary controllers. Here, sampling a zero-velocity reference, the sampling distribution quickly collapses to a braking manoeuvre, avoiding collision.
    </p>
  </div>
</div>

<h2> Abstract </h2>
<p align="justify">
Motion planning for autonomous robots in human-populated environments poses numerous challenges due to uncertainties in the robot's dynamics, environment, and interaction with other agents. Sampling-based MPC approaches, such as Model Predictive Path Integral (MPPI) control, have shown promise in addressing these complex motion planning problems. However, the performance of MPPI relies heavily on the choice of sampling distribution. Existing literature often uses the previously computed input sequence as the mean of a Gaussian distribution for sampling, leading to potential failures and local minima. In this paper, we propose novel derivations of the MPPI method to enhance its efficiency, robustness, and convergence. Our approach includes a mathematical formulation allowing for arbitrary sampling distributions, addressing numerical issues, and alleviating the problem of local minima. We present an efficient importance sampling scheme that combines classical and learning-based ancillary controllers simultaneously, resulting in more informative sampling and control fusion. We demonstrate our proposed scheme's superior efficiency and robustness through experiments by handling model uncertainties and rapid environmental changes and reducing susceptibility to local minima.
</p>

<h2> Illustrative Example: Rotary Inverted Pendulum </h2>
<div class="row row-cols-1 row-cols-sm-3 row-cols-md-3 g-2">
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
</div>


<h2> Experiment: Crossing an Intersection </h2>
<div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-2">
  <div class="col">
    <h3 align="center">Classic MPPI</h3>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-4x3">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/biased_mppi/crossing_no_AC_crop.m4v' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    Classic MPPI gets stuck in a local minima whereby both agents think they should pass first, even when it becomes clear the orange agent should yield, resulting in a collision. 
    </p>
  </div>
  <div class="col">
    <h3 align="center">Biased-MPPI</h3>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-4x3">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/biased_mppi/crossing_AC_crop.m4v' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    Biased-MPPI, sampling from multiple ancillary controllers, results in the orange agent quickly converging to a yielding manoeuvre, avoiding collisions.
    </p>
  </div>
</div>

<h2> Experiment: Multi-Agent Navigation </h2>
<div class="row row-cols-1 row-cols-sm-3 row-cols-md-3 g-2">
  <div class="col">
    <h3 align="center" style="margin-bottom: 0;">Classic MPPI</h3>
    <h5 align="center" style="margin-bottom: 0;">with <span class="amr-color">2000</span> samples</h5>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-4x3">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/biased_mppi/Hg_2000_No_AC_crop.m4v' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    With 2000 samples, IA-MPPI based on the classic MPPI sampling strategy can solve the problem correctly.
    </p>
  </div>
  <div class="col">
    <h3 align="center" style="margin-bottom: 0;">Classic MPPI</h3>
    <h5 align="center" style="margin-bottom: 0;">with <span class="amr-color">200</span> samples</h5>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-4x3">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/biased_mppi/Hg_200_No_AC_crop.m4v' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    With 200 samples, the algorithm using the classic MPPI sampling strategy fails to find a good solution.
    </p>
  </div>
  <div class="col">
    <h3 align="center" style="margin-bottom: 0;">Biased-MPPI</h3>
    <h5 align="center" style="margin-bottom: 0;">with <span class="amr-color">200</span> samples</h5>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-4x3">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/biased_mppi/Hg_200_AC_crop.m4v' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    Biased-MPPI, taking suggestions from several ancillary controllers, can solve the problem correctly using only 200 samples.
    </p>
  </div>
</div>
