---
title: "Interaction-Aware Model Predictive Path Integral Control for Motion Planning in Urban Settings"
authors:

    - name: "Elia Trevisan"
      url: "https://www.eliatrevisan.com"
      superscript: "1"
    - name: "Alejandro Gonzalez-Garcia"
      url: "https://scholar.google.com/citations?user=j5zC8uMAAAAJ&hl=en"
      superscript: "2"
    - name: "Jan Swevers"
      url: "https://scholar.google.com/citations?user=X_fnO1YAAAAJ&hl=en"
      superscript: "2"
    - name: "Javier Alonso-Mora"
      url: "https://www.autonomousrobots.nl/"
      superscript: "1"
    
affiliations:
    - name: "TU Delft"
      superscript: "1"
      url: "https://tudelft.nl"
    - name: "KU Leuven"
      superscript: "2"
      url: "https://www.kuleuven.be"
    # - name: "Wien Opera House"
    #   superscript: "†"
release_date: 2025-07-11 # publication or relevant date, approximated if not sure. Just for display purposes and ordering.
links: # If you have other website for the project, github repos, datasets, etc. put it here. You can also add an icon from https://icons.getbootstrap.com/
    # - name: IEEE Xplore
    #   icon: bi-file-earmark-pdf
      # url: "https://doi.org/10.1109/LRA.2025.3535185"
    - name: arXiv (coming soon)
      icon: bi-file-earmark-pdf
      # url: "https://arxiv.org/abs/2307.09105"
    - name: PyTorch Code
      icon: bi-github
      url: "https://github.com/tud-amr/interaction_aware_mppi"
    # - name: Video
    #   icon: bi-youtube
    #   url: "https://www.youtube.com/watch?v=ovLZmSd-XX8"
    - name: Related Publications
      icon: bi-file-text
      url: "#related-publications"
related_project_id: "trilogy"
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

<!-- <h3> Real Robot Experiments </h3> -->

<h3>Onboard IA-MPPI in the Real-World</h3>
<p align="justify">
The videos below show head-on and crossing scenarios onboard two quarterscale Roboat vessels. Localization and planning is computed <span class="amr-color">onboard</span>, with IA-MPPI performing <span class="amr-color">simultaneous prediction and planning</span> at <span class="amr-color">10Hz</span> with <span class="amr-color">100 steps ahead horizons</span> (10 seconds). The conflicts are resolves according to navigation rules, i.e. passing head-on on the right-side, and giving right-of-way to the right. 
</p>
<div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-2">
  <div class="col">
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/ia_mppi/headon2.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center"> 
    </p>
  </div>
  <div class="col">
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/ia_mppi/headon3.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    </p>
  </div>
  <div class="col">
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/ia_mppi/crossing4.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    </p>
  </div>
  <div class="col">
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/ia_mppi/crossing5.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    </p>
  </div>
</div>

<h3> Abstract </h3>
<p align="justify">
Autonomous vehicles that operate in urban environments shall comply with existing rules and reason about the interactions with other decision-making agents.  
In this paper, we introduce a decentralized and communication-free interaction-aware motion planner and apply it to Autonomous Surface Vessels (ASVs) in urban canals.
We build upon a sampling-based method, namely Model Predictive Path Integral control (MPPI), and employ it to, in each time instance, compute both a collision-free trajectory for the vehicle and a prediction of other agents' trajectories, thus modeling interactions. To improve the method's efficiency in multi-agent scenarios, we introduce a two-stage sample evaluation strategy and define an appropriate cost function to achieve rule compliance. We evaluate this decentralized approach in simulations with multiple vessels in real scenarios extracted from Amsterdam's canals, showing superior performance than a state-of-the-art trajectory optimization framework and robustness when encountering different types of agents.
</p>
<!-- 
<h3> Proposed Approach </h3>
<div class="image-grid text-center mb-1">
  <div class="row row-cols-1 row-cols-sm-1 row-cols-md-1 g-1">
    <div class="col">
      <img class="img-fluid object-fit-contain" src="{% include fix_link.html link='/assets/images/papers/isaac_mppi/main_idea.png' %}" alt="Image 1" style="max-width: 60%; height: auto;">
    </div>
  </div>
  <p align="justify">
  <strong>Figure 1:</strong> Scheme of the proposed method using IsaacGym as the dynamic model for MPPI. At each time step, IsaacGym is reset to the current world's state $x$, and random input sequences ${V}$ are applied for the horizon $T$, to every environment. The resulting rolled-out trajectories are used by MPPI to approximate the optimal control $u_0^*$ given a cost function $C$.
  </p>
</div> -->

<!-- <h3> Simulation Results </h3> -->
<!--
<div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-2">
  <div class="col">
    <h5 align="center">Omidirectional Motion Planning</h5>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/isaac_mppi/media2.m4v' %}" type="video/mp4">
        </video>
      </div>
    </div>
    &nbsp;
  </div>
  <div class="col">
    <h5 align="center">Manipulator Motion Planning</h5>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/isaac_mppi/media1.m4v' %}" type="video/mp4">
        </video>
      </div>
    </div>
    &nbsp;
  </div>
</div>

<div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-2">
  <div class="col">
    <h5 align="center">Omnidirectional Box Push</h5>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/isaac_mppi/media3.m4v' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    Collision avoidance with the obstacles
    </p>
  </div>
  <div class="col">
    <h5 align="center">Omnidirectional Box Push</h5>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/isaac_mppi/media4.m4v' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    Collision avoidance with the obstacles
    </p>
  </div>
</div>

<div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-2">
  <div class="col">
    <h5 align="center">Omnidirectional Ball Roll</h5>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/isaac_mppi/media5.m4v' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    Change object: roll against obstacles
    </p>
  </div>
  <div class="col">
    <h5 align="center">Omnidirectional Ball Roll</h5>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/isaac_mppi/media6.m4v' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    Change object: roll against obstacles
    </p>
  </div>
</div>

<div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-2">
  <div class="col">
    <h5 align="center">Differential Drive Box Push</h5>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/isaac_mppi/media7.m4v' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    Change robot: just change the URDF!
    </p>
  </div>
  <div class="col">
    <h5 align="center">12-DOF Pick and Delivery</h5>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/isaac_mppi/media12.m4v' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    Control velocity of all joints, including fingers.
    </p>
  </div>
</div>

<div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-2">
  <div class="col">
    <h5 align="center">Manipulator Push</h5>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/isaac_mppi/media9.m4v' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    Keep the same orientation
    </p>
  </div>
  <div class="col">
    <h5 align="center">Manipulator Push</h5>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/isaac_mppi/media8.m4v' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    Rotatate $90^\circ$
    </p>
  </div>
</div>

<div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-2">
  <div class="col">
    <h5 align="center">Manipulator Push</h5>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/isaac_mppi/media10.m4v' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    Keep the same orientation
    </p>
  </div>
  <div class="col">
    <h5 align="center">Manipulator Push</h5>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/isaac_mppi/media11.m4v' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    Rotatate $30^\circ$
    </p>
  </div>
</div> -->
