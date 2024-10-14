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
      url: "https://doi.org/10.1109/TRO.2024.3475047"
    - name: arXiv
      icon: bi-file-earmark-pdf
      url: "https://arxiv.org/pdf/2401.06021"
    - name: Code
      icon: bi-github
      url: https://github.com/tud-amr/mpc_planner
    - name: Video
      icon: bi-youtube
      url: "https://www.youtube.com/watch?v=pyx2GUswQ34"
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
<hr/>
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
    <br/>
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
    <br/>
    <b>Topology-driven MPC (T-MPC++)</b> computes several locally optimized trajectories in parallel, each passing the obstacles differently. This leads to higher quality motion plans and makes it more likely that the planner finds a feasible motion plan.
    </p>
  </div>
</div>
<hr/>
<h2 align="left"><u>Abstract</u></h2>
  <div class="row">
    <div class="col-7">
      <p align="justify">
      Ground robots navigating in complex, dynamic environments must compute collision-free trajectories to avoid obstacles safely and efficiently. Nonconvex optimization is a popular method to compute a trajectory in real-time. However, these methods often converge to locally optimal solutions and frequently switch between different local minima, leading to inefficient and unsafe robot motion. In this work, we propose a novel topology-driven trajectory optimization strategy for dynamic environments that plans multiple distinct evasive trajectories to enhance the robot's behavior and efficiency. A global planner iteratively generates trajectories in distinct homotopy classes. These trajectories are then optimized by local planners working in parallel. While each planner shares the same navigation objectives, they are locally constrained to a specific homotopy class, meaning each local planner attempts a different evasive maneuver. The robot then executes the feasible trajectory with the lowest cost in a receding horizon manner. We demonstrate, on a mobile robot navigating among pedestrians, that our approach leads to faster trajectories than existing planners.
      </p>
    </div>
    <div class="col-5">
      <img src="{% include fix_link.html link='/assets/images/projects/probabilistic-planning/t-mpc.jpg' %}" width="100%">
    </div>
</div>
<hr/>
<h2 align="center"><u> Topology-Driven MPC </u></h2>

<div class="row">
  <div class="col-12">
    <img src="{% include fix_link.html link='/assets/images/papers/tmpc/method.png' %}" width="100%">
  </div>
  <p align="justify">
  <br/>
  A schematic explanation of <b>T-MPC</b>. An environment with several obstacles and a robot is visualized in x, y, t (time in the upwards
axis). Obstacle motion predictions are denoted with cylinders. (1) A guidance planner finds P = 4 trajectories
(visualized with colored lines) from the robot initial position to one of the goals. Each of these trajectories is in a distinct
homotopy class in the state space (i.e., each avoids obstacles differently). (2) Each trajectory guides a local planner as initial guess and through a set of homotopy constraints. Four guidance trajectories and optimized trajectories (as occupied regions for each step) are visualized. (3) The optimized trajectories are compared through their objective value (Sec. IV-E) and a single trajectory (in red) is excuted
by the robot.<br/><br/>We observed that adding a non-guided regular MPC in parallel to the guided planners further improves performance. In crowded environments, the regular MPC may occasionally find trajectories that the guidance planner does not find. By combining both strategies we eliminate key weaknesses in both planners. We refer to the combined planner as <b>T-MPC++</b>.
    </p>
</div>

<h2 align="center"><u> Simulation Results </u></h2>
  <hr/>
  <div class="row">
    <div class="col-6">
      <img src="{% include fix_link.html link='/assets/images/papers/tmpc/duration_with_baseline.png' %}" width="100%">
    </div>
    <div class="col-6">
    <p align="justify">
    <b>Deterministic:</b> Our simulation results demonstrate that <b>T-MPC</b> is significantly faster than other methods in crowded environments. We compared several methods (see the paper) in a corridor environment with a varying number of pedestrians following the social forces model. This figure shows the distribution of the task duration over 200 experiments for 4, 8 and 12 pedestrians. The vertical dashed line denotes the task duration <i>without</i> obstacles. Performance of TEB-Planner and LMPCC degrade in more crowded environments. Our previous work Guidance-MPCC can cause high (undesired) speeds leading to faster task durations than without obstacles. The task duration of T-MPC++, however, remains concentrated closest to the case without pedestrians and does so without incurring more collisions than other methods.
    </p>
  </div>
  <hr/>
</div>
  <div class="row">
    <div class="col-6">
    <p align="justify">
    <b>Uncertain:</b> T-MPC++ can additionally handle different collision avoidance constraint formulations. For example, Chance-Constrained MPC (CC-MPC) considers Gaussian uncertainty in the future positions of obstacles. We showed that deploying T-MPC++ with CC-MPC constraints (referred to as TCC-MPC++) reduced the task duration and collisions compared to CC-MPC in isolation.
    </p>
    </div>
    <div class="col-6">
      <img src="{% include fix_link.html link='/assets/images/papers/tmpc/uncertainty.png' %}" width="100%">
    </div>
</div>
<div class="col">
  <h3 align="center"><u>Real-World Experiments</u></h3>
<hr/>
  <div class="row">
      <div class="col-7">
      <div class="teaser-video d-flex justify-content-center">
        <div class="ratio ratio-16x9">
          <img src="https://imgur.com/861MmhI.gif">
        </div>
      </div>
    </div>
    <div class="col-5">
      <p align="left">
      We successfully applied T-MPC++ to navigate in a lab environment among 5 pedestrians, comparing it against LMPCC (i.e., regular MPC) and comparing TCC-MPC++ against CC-MPC. While the order of planners was randomized, participants unanimously preferred T-MPC++ and TCC-MPC++ over LMPCC and CC-MPC. <br/><br/>
      
      We observed that our method almost never became infeasible and that it did not get stuck in fast overtake behaviors which therefore led to safer robot motion.
      </p>
    </div>
  </div>
</div>

<div class="col">
  <h3 align="center"><u>Code</u></h3>
<hr/>
  <p>Our implementation is publicly available, with the MPC and guidance planner being available also as stand-alone packages. We provide:</p>
  <ul>
  <li> A VSCode containerized environment with the MPC, Guidance Planner and simulation: <a href="https://github.com/tud-amr/mpc_planner_ws">mpc_planner_ws</a></li>
  <li> The MPC: <a href="https://github.com/tud-amr/mpc_planner">mpc_planner</a></li>
  <li> The Guidance Planner: <a href="https://github.com/tud-amr/guidance_planner">guidance_planner</a></li>
  </ul>
   <!-- <div class="row">
      <div class="col-7">
      <div class="teaser-video d-flex justify-content-center">
        <div class="ratio ratio-16x9">
          <img src="https://imgur.com/861MmhI.gif">
        </div>
      </div>
    </div>
    <div class="col-5">
      <p align="left">
      </p>
    </div>
  </div> -->
</div>
