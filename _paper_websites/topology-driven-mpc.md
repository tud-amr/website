---
title: "Topology-Driven Parallel Trajectory Optimization in Dynamic Environments"
authors:
    - name: "Oscar de Groot"
      superscript: "1"
    - name: "Laura Ferranti"
      superscript: "1"
    - name: "Dariu M. Gavrila"
      superscript: "1"
    - name: "Javier Alonso-Mora"
      superscript: "1"
affiliations:
    - name: "TU Delft"
      superscript: "1"
      url: "https://tudelft.nl"
release_date: 2024-09-27 # publication or relevant date, approximated if not sure. Just for display purposes and ordering.
links: # If you have other website for the project, github repos, datasets, etc. put it here. You can also add an icon from https://icons.getbootstrap.com/
    - name: IEEE Xplore
      icon: bi-file-earmark-pdf
      url: "https://doi.org/10.1109/LRA.2024.3397083"
    - name: arXiv
      icon: bi-file-earmark-pdf
      url: "https://arxiv.org/pdf/2401.06021"
    - name: Code
      icon: bi-github
      url: https://github.com/tud-amr/mpc_planner
    - name: Video
      icon: bi-youtube
      url: "https://www.youtube.com/watch?v=kXUAldQXrNk&t=2s"
    - name: Related Publications
      icon: bi-file-text
      url: "#related-publications"
related_project_id: "probabilistic-planning"
---
<!-- Simulated Mobile Robot | Real-World Mobile Robot | -->
<!-- | ------------- | ------------- | -->
<!-- | <img src="https://imgur.com/YZNLaww.gif" width="100%"> | <img src="https://imgur.com/861MmhI.gif" width=100%> | -->
<!-- | **Static and Dynamic Obstacles** |  | -->
<!-- | <img src="https://imgur.com/QgYDTRq.gif" width="100%"> |  | -->
<div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-2">
  <div class="col">
    <h3 align="center"><u>Regular MPC</u></h3>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-1x1">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/tmpc/lmpcc_cut_compressed.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    <b>Model Predictive Control (MPC)</b> is a local planning method that usually locally optimizes a single trajectory. When its initial guess or current behavior is poor, it tends to get stuck in that behavior. This can lead to poor motion plans or even failure to find a motion plan.
    </p>
  </div>
  <div class="col">
    <h3 align="center"><u>Topology-Driven MPC</u></h3>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-1x1">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/tmpc/tmpc_cut_compressed.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    <b>Topology-driven MPC (T-MPC++)</b> computes several locally optimized trajectories in parallel, each passing the obstacles differently. This leads to higher quality motion plans and makes it more likely that the planner finds a feasible motion plan.
    </p>
  </div>
</div>

<h2 align="left"> Abstract </h2>
  <div class="row">
  <div class="col-8">
    <p align="justify">
    Ground robots navigating in complex, dynamic environments must compute collision-free trajectories to avoid obstacles safely and efficiently. Nonconvex optimization is a popular method to compute a trajectory in real-time. However, these methods often converge to locally optimal solutions and frequently switch between different local minima, leading to inefficient and unsafe robot motion. In this work, we propose a novel topology-driven trajectory optimization strategy for dynamic environments that plans multiple distinct evasive trajectories to enhance the robot's behavior and efficiency. A global planner iteratively generates trajectories in distinct homotopy classes. These trajectories are then optimized by local planners working in parallel. While each planner shares the same navigation objectives, they are locally constrained to a specific homotopy class, meaning each local planner attempts a different evasive maneuver. The robot then executes the feasible trajectory with the lowest cost in a receding horizon manner. We demonstrate, on a mobile robot navigating among pedestrians, that our approach leads to faster trajectories than existing planners.
    </p>
  </div>
  <div class="col-4">
    <img src="{% include fix_link.html link='/assets/images/projects/probabilistic-planning/t-mpc.jpg' %}" width="100%">
  </div>
</div>

<div class="col">
  <h3 align="center"><u>Real-World Experiments</u></h3>
  <p align="center">
  We successfully used T-MPC++ to navigate in a lab environment among pedestrians.
  </p>
  <div class="teaser-video d-flex justify-content-center">
    <div class="ratio ratio-16x9">
      <img src="https://imgur.com/861MmhI.gif">
    </div>
  </div>
</div>
