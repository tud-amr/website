---
title: "Sampling-based Model Predictive Control Leveraging Parallelizable Physics Simulations"
authors:

    - name: "Corrado Pezzato*"
      url: "https://www.linkedin.com/in/corrado-pezzato/"
      superscript: "1"
    - name: "Chadi Salmi*"
      url: "https://c-salmi.github.io/"
      superscript: "1"
    - name: "Elia Trevisan*"
      url: "https://www.linkedin.com/in/eliatrevisan/"
      superscript: "1"
    - name: "Max Spahn"
      url: "https://github.com/maxspahn"
      superscript: "1"
    - name: "Javier Alonso-Mora"
      url: "https://www.autonomousrobots.nl/"
      superscript: "1"
    - name: "Carlos Hernández Corbato"
      url: "https://chcorbato.github.io/"
      superscript: "1"
    
affiliations:
    - name: "Equal contribution"
      superscript: "*"
    - name: "TU Delft"
      superscript: "1"
      url: "https://tudelft.nl"
    # - name: "Wien Opera House"
    #   superscript: "†"
release_date: 2024-09-30 # publication or relevant date, approximated if not sure. Just for display purposes and ordering.
links: # If you have other website for the project, github repos, datasets, etc. put it here. You can also add an icon from https://icons.getbootstrap.com/
    - name: IEEE Xplore
      icon: bi-file-earmark-pdf
      url: "https://doi.org/10.1109/LRA.2025.3535185"
    - name: arXiv
      icon: bi-file-earmark-pdf
      url: "https://arxiv.org/abs/2307.09105"
    - name: Code
      icon: bi-github
      url: "https://github.com/tud-airlab/mppi-isaac"
    - name: Video
      icon: bi-youtube
      url: "https://www.youtube.com/watch?v=ovLZmSd-XX8"
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
<div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-2">
  <div class="col">
    <h5 align="center">Omnidirectional Push w Disturbances</h5>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/isaac_mppi/omnipush480p.m4v' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center"> 
    </p>
  </div>
  <div class="col">
    <h5 align="center">Manipulator Push w Disturbances</h5>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/isaac_mppi/pandapush480.m4v' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    </p>
  </div>
  <div class="col">
    <h5 align="center">Manipulator Push Left</h5>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/isaac_mppi/media14.m4v' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    </p>
  </div>
  <div class="col">
    <h5 align="center">Manipulator Push Right</h5>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/isaac_mppi/media13.m4v' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    </p>
  </div>
</div>

<h3> Abstract </h3>
<p align="justify">
We present a method for sampling-based model predictive control that makes use of a generic physics simulator as the dynamical model. In particular, we propose a Model Predictive Path Integral controller (MPPI), that uses the GPU-parallelizable IsaacGym simulator to compute the forward dynamics of a problem. By doing so, we eliminate the need for manual encoding of robot dynamics and interactions among objects and allow one to effortlessly solve complex navigation and contact-rich tasks. Since no explicit dynamic modeling is required, the method is easily extendable to different objects and robots. We demonstrate the effectiveness of this method in several simulated and real-world settings, among which mobile navigation with collision avoidance, non-prehensile manipulation, and whole-body control for high-dimensional configuration spaces. This method is a powerful and accessible tool to solve a large variety of contact-rich motion planning tasks. 
</p>

<!-- <h3> Proposed Approach </h3> -->
<div class="image-grid text-center mb-1">
  <div class="row row-cols-1 row-cols-sm-1 row-cols-md-1 g-1">
    <div class="col">
      <img class="img-fluid object-fit-contain" src="{% include fix_link.html link='/assets/images/papers/isaac_mppi/main_idea.png' %}" alt="Image 1" style="max-width: 60%; height: auto;">
    </div>
  </div>
  <p align="justify">
  <strong>Figure 1:</strong> Scheme of the proposed method using IsaacGym as the dynamic model for MPPI. At each time step, IsaacGym is reset to the current world's state $x$, and random input sequences ${V}$ are applied for the horizon $T$, to every environment. The resulting rolled-out trajectories are used by MPPI to approximate the optimal control $u_0^*$ given a cost function $C$.
  </p>
</div>

<!-- <h3> Simulation Results </h3> -->
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
    <!-- <p align="center">
    Middle to corner -- success
    </p> -->
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
    <!-- <p align="center">
    Corner to corner -- fail
    </p> -->
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
</div>
